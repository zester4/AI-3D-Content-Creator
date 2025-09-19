
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center py-6 md:py-10">
    <div className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        AI 3D Content Creator
        </h1>
    </div>
    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
      Bring your 3D concepts to life. Describe an asset, and get a detailed description and inspiring concept art instantly.
    </p>
  </header>
);
