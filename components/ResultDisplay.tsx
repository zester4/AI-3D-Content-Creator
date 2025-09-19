import React, { useState } from 'react';
import type { Content } from '../types';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

interface ResultDisplayProps {
  content: Content;
  imageUrl: string;
  editPrompt: string;
  setEditPrompt: (prompt: string) => void;
  onEditSubmit: () => void;
  isEditing: boolean;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/60 p-5 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-teal-700 mb-3">{title}</h3>
        {children}
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, imageUrl, editPrompt, setEditPrompt, onEditSubmit, isEditing }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Details');
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      onEditSubmit();
    }
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const fileName = `${content.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpeg`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    const textToCopy = `Title: ${content.title}\n\nDescription: ${content.description}\n\nTags: ${content.tags.join(', ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy Details'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="mt-10 p-4 sm:p-6 bg-white/50 rounded-xl border border-gray-200/80 shadow-lg animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-3xl font-bold text-teal-800 mb-3 sm:mb-0">{content.title}</h2>
            <div className="flex gap-3">
                 <button onClick={handleCopy} className="flex items-center px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-300 transition-colors duration-200">
                    {copyButtonText === 'Copied!' ? <CheckIcon /> : <CopyIcon />}
                    {copyButtonText}
                </button>
                <button onClick={handleDownload} className="flex items-center px-4 py-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300">
                    <DownloadIcon/>
                    Download Art
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <InfoCard title="Description">
                     <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{content.description}</p>
                </InfoCard>
                <InfoCard title="Tags">
                    <div className="flex flex-wrap gap-2">
                        {content.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </InfoCard>
            </div>
            
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="relative flex items-center justify-center bg-black/5 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                  <img 
                      src={imageUrl} 
                      alt={content.title} 
                      className="w-full h-full object-cover aspect-square transition-opacity duration-300"
                      style={{ opacity: isEditing ? 0.5 : 1 }}
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-white"></div>
                      <p className="mt-3 text-white">Applying edit...</p>
                    </div>
                  )}
              </div>
              <div className="bg-white/60 p-5 rounded-lg border border-gray-200 shadow-sm">
                <form onSubmit={handleEditSubmit}>
                  <label htmlFor="edit-prompt-input" className="block text-lg font-semibold text-teal-700 mb-2">
                    Refine Your Concept Art
                  </label>
                  <textarea
                    id="edit-prompt-input"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="e.g., 'change the background to a forest', 'make the sword blue', 'add a helmet'..."
                    className="w-full h-20 p-3 bg-white border border-gray-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow duration-200 resize-none"
                    disabled={isEditing}
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={isEditing || !editPrompt.trim()}
                      className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      {isEditing ? 'Applying...' : 'Apply Edit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </div>
  );
};