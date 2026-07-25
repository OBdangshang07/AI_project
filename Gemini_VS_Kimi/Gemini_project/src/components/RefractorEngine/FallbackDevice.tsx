import React from 'react';

interface FallbackDeviceProps {
  scrollProgress: number;
  mousePos: { normX: number; normY: number };
  activeModalIndex: number;
  refractorEnergy: number;
}

export const FallbackDevice: React.FC<FallbackDeviceProps> = ({
  scrollProgress,
  mousePos,
  activeModalIndex,
  refractorEnergy,
}) => {
  const rotation = mousePos.normX * 15;
  const scale = 1 + refractorEnergy * 0.1;

  const modalColors = [
    '#00F0FF', // Text - Cyan
    '#0066FF', // Vision - Blue
    '#8A2BE2', // Audio - Violet
    '#FFB800', // Code - Gold
  ];

  const activeColor = modalColors[activeModalIndex] || '#00F0FF';

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none p-8">
      <svg
        viewBox="0 0 500 500"
        className="w-72 h-72 md:w-96 md:h-96 transition-transform duration-500 ease-out"
        style={{
          transform: `rotate(${rotation}deg) scale(${scale})`,
        }}
        aria-label="Latent Refractor Graphic Device"
      >
        <defs>
          <linearGradient id="refractorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="50%" stopColor={activeColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbit Lattice */}
        <circle
          cx="250"
          cy="250"
          r="210"
          fill="none"
          stroke={activeColor}
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.4"
        />

        <circle
          cx="250"
          cy="250"
          r="160"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.15"
        />

        {/* Core Refractor Polyhedron Facets */}
        <polygon
          points="250,80 370,180 340,350 160,350 130,180"
          fill="url(#refractorGrad)"
          opacity="0.35"
          filter="url(#glow)"
        />

        <polygon
          points="250,80 370,180 250,250"
          fill="none"
          stroke={activeColor}
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon
          points="370,180 340,350 250,250"
          fill="none"
          stroke="#0066FF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon
          points="340,350 160,350 250,250"
          fill="none"
          stroke="#8A2BE2"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon
          points="160,350 130,180 250,250"
          fill="none"
          stroke="#FFB800"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon
          points="130,180 250,80 250,250"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Central Spark */}
        <circle
          cx="250"
          cy="250"
          r="12"
          fill="#ffffff"
          filter="url(#glow)"
          opacity={0.8 + scrollProgress * 0.2}
        />
      </svg>
    </div>
  );
};
