import React from 'react';

interface LoadingSpinnerProps {
  message: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center my-12">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
    <p className="mt-4 text-lg text-slate-600">{message}</p>
  </div>
);