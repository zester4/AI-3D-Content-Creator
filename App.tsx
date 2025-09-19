import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { StylePresetSelector } from './components/StylePresetSelector';
import { generate3DModelContent, generateConceptImage, editConceptImage } from './services/geminiService';
import type { Content } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('default');
  const [generatedContent, setGeneratedContent] = useState<Content | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
    setEditPrompt('');

    try {
      const content = await generate3DModelContent(prompt);
      setGeneratedContent(content);

      const stylePrompt = selectedStyle === 'default' ? '' : `, in a ${selectedStyle} style`;
      const imagePrompt = `High-quality 3D concept art of ${content.title}. ${content.description}${stylePrompt}. Cinematic lighting, hyper-detailed, trending on ArtStation.`;
      
      const imageUrl = await generateConceptImage(imagePrompt);
      setGeneratedImage(imageUrl);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedStyle]);

  const handleEditImage = useCallback(async () => {
    if (!editPrompt.trim() || !generatedImage) {
      setError('Please enter an edit instruction.');
      return;
    }

    setIsEditing(true);
    setError(null);

    try {
      const editedImageUrl = await editConceptImage(generatedImage, editPrompt);
      setGeneratedImage(editedImageUrl);
      setEditPrompt('');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while editing the image.');
    } finally {
      setIsEditing(false);
    }
  }, [editPrompt, generatedImage]);

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <Header />
        <main>
          <div className="bg-white/70 p-6 rounded-xl shadow-md border border-gray-200">
            <StylePresetSelector
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              isLoading={isLoading}
            />
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          
          {isLoading && <LoadingSpinner message="Generating your 3D concept..." />}
          
          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && generatedContent && generatedImage && (
            <ResultDisplay 
              content={generatedContent} 
              imageUrl={generatedImage}
              editPrompt={editPrompt}
              setEditPrompt={setEditPrompt}
              onEditSubmit={handleEditImage}
              isEditing={isEditing}
            />
          )}

          {!isLoading && !generatedContent && (
             <div className="text-center mt-16 text-slate-500">
              <p className="text-lg">Your generated content and concept art will appear here.</p>
              <p>Describe your 3D model idea to get started!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;