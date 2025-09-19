
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-10">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
    <p className="mt-4 text-lg text-slate-400">Generating your 3D concept...</p>
  </div>
);
