
import React from 'react';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt-input" className="block text-lg font-medium text-cyan-300 mb-2">
          Describe your 3D model idea
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a glowing crystal sword, a sci-fi exploration helmet, a cute stylized creature..."
          className="w-full h-28 p-3 bg-slate-900 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-none"
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-md hover:from-cyan-600 hover:to-violet-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400"
          >
            {isLoading ? 'Generating...' : 'Generate Content'}
          </button>
        </div>
      </form>
    </div>
  );
};
