import React, { useEffect, useRef } from 'react';

export const NoiseOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 128;
    canvas.width = size;
    canvas.height = size;

    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 16;  // Very subtle Alpha
    }

    ctx.putImageData(imgData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="noise-overlay"
      style={{
        backgroundImage: 'repeat',
        backgroundSize: '128px 128px',
      }}
      aria-hidden="true"
    />
  );
};
