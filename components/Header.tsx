import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center py-6 md:py-10">
    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-teal-600">
      AI 3D Content Creator
    </h1>
    <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
      Bring your 3D concepts to life. Describe an asset, and get a detailed description and inspiring concept art instantly.
    </p>
  </header>
);