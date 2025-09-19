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
    <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-200 pt-6">
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-teal-700 mb-2">
        Then, describe your idea in detail
      </label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., a glowing crystal sword, a sci-fi exploration helmet, a cute stylized creature..."
        className="w-full h-28 p-3 bg-white border border-gray-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow duration-200 resize-none"
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-100 focus:ring-teal-500"
        >
          {isLoading ? 'Generating...' : '✨ Generate Content & Art'}
        </button>
      </div>
    </form>
  );
};