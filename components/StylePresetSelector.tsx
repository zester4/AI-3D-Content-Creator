import React from 'react';

const styles = [
  { name: 'Default', value: 'default' },
  { name: 'Photorealistic', value: 'photorealistic' },
  { name: 'Anime', value: 'cel shaded anime style' },
  { name: 'Low Poly', value: 'low poly, vibrant colors' },
  { name: 'Steampunk', value: 'steampunk, intricate gears, brass and copper' },
  { name: 'Cyberpunk', value: 'cyberpunk, neon lighting, futuristic' },
];

interface StylePresetSelectorProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  isLoading: boolean;
}

export const StylePresetSelector: React.FC<StylePresetSelectorProps> = ({ selectedStyle, setSelectedStyle, isLoading }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-teal-700 mb-3">
        First, choose an art style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => setSelectedStyle(style.value)}
            disabled={isLoading}
            className={`p-3 text-center rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              ${selectedStyle === style.value
                ? 'bg-teal-500 border-teal-600 text-white shadow-lg scale-105'
                : 'bg-white/70 border-gray-300 hover:border-teal-400 hover:bg-white'
              }
            `}
          >
            <span className="font-semibold text-sm">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};