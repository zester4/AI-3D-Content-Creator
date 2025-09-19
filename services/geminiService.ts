import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Content } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const contentGenerationSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A creative and fitting title for the 3D model.',
    },
    description: {
      type: Type.STRING,
      description: 'A detailed, multi-paragraph description of the 3D model, covering its appearance, materials, potential history, and unique features. Should be at least 100 words.',
    },
    tags: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'An array of 5-10 relevant keywords or tags for this model, such as "sci-fi", "weapon", "character", "armor", "low-poly", etc.',
    },
  },
  required: ['title', 'description', 'tags'],
};

export const generate3DModelContent = async (prompt: string): Promise<Content> => {
  const userPrompt = `Based on the following user idea, generate detailed content for a 3D model. User idea: "${prompt}"`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contentGenerationSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedContent = JSON.parse(jsonText);
    
    if (!parsedContent.title || !parsedContent.description || !Array.isArray(parsedContent.tags)) {
        throw new Error("Invalid content structure received from API.");
    }

    return parsedContent as Content;

  } catch (error) {
    console.error("Error generating 3D model content:", error);
    throw new Error("Failed to generate content from the AI. Please try again.");
  }
};

export const generateConceptImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating concept image:", error);
        throw new Error("Failed to generate the concept image. The generation service might be unavailable.");
    }
};

export const editConceptImage = async (base64ImageDataUrl: string, prompt: string): Promise<string> => {
  try {
    const match = base64ImageDataUrl.match(/^data:(image\/.+);base64,(.+)$/);
    if (!match) {
      throw new Error("Invalid base64 image data URL format.");
    }
    const mimeType = match[1];
    const base64ImageData = match[2];
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("No image was returned from the edit operation.");

  } catch (error) {
    console.error("Error editing concept image:", error);
    throw new Error("Failed to edit the concept image. Please try a different prompt.");
  }
};