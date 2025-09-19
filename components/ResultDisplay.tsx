
import React from 'react';
import type { Content } from '../types';

interface ResultDisplayProps {
  content: Content;
  imageUrl: string;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-cyan-300 mb-2">{title}</h3>
        {children}
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, imageUrl }) => {
  return (
    <div className="mt-8 p-4 sm:p-6 bg-slate-800/20 rounded-xl border border-slate-700/50 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-400">{content.title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
                <InfoCard title="Description">
                     <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{content.description}</p>
                </InfoCard>
                <InfoCard title="Tags">
                    <div className="flex flex-wrap gap-2">
                        {content.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-slate-700 text-cyan-200 text-sm rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </InfoCard>
            </div>
            
            <div className="flex items-center justify-center bg-black/20 rounded-lg overflow-hidden border border-slate-700">
                <img 
                    src={imageUrl} 
                    alt={content.title} 
                    className="w-full h-full object-cover aspect-square" 
                />
            </div>
        </div>
    </div>
  );
};
