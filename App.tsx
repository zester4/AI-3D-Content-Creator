
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generate3DModelContent, generateConceptImage } from './services/geminiService';
import type { Content } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<Content | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your 3D model.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setGeneratedImage(null);

    try {
      // Step 1: Generate detailed text content
      const content = await generate3DModelContent(prompt);
      setGeneratedContent(content);

      // Step 2: Use the detailed description to generate an image
      const imagePrompt = `High-quality 3D concept art of ${content.title}. ${content.description}. Cinematic lighting, hyper-detailed, trending on ArtStation.`;
      const imageUrl = await generateConceptImage(imagePrompt);
      setGeneratedImage(imageUrl);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl">
        <Header />
        <main>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && generatedContent && generatedImage && (
            <ResultDisplay content={generatedContent} imageUrl={generatedImage} />
          )}

          {!isLoading && !generatedContent && (
             <div className="text-center mt-12 text-slate-500">
              <p>Your generated content and image will appear here.</p>
              <p>Describe your 3D model idea to get started!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
