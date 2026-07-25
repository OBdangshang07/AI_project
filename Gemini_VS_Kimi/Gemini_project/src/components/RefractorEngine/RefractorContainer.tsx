import React, { useState, useEffect } from 'react';
import { CanvasDevice } from './CanvasDevice';
import { FallbackDevice } from './FallbackDevice';

interface RefractorContainerProps {
  scrollProgress: number;
  mousePos: { normX: number; normY: number };
  latencyMs: number;
  activeModalIndex: number;
  refractorEnergy: number;
  reducedMotion: boolean;
}

export const RefractorContainer: React.FC<RefractorContainerProps> = (props) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const useFallback = !webglSupported || props.reducedMotion;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {useFallback ? (
        <FallbackDevice
          scrollProgress={props.scrollProgress}
          mousePos={props.mousePos}
          activeModalIndex={props.activeModalIndex}
          refractorEnergy={props.refractorEnergy}
        />
      ) : (
        <CanvasDevice {...props} />
      )}
    </div>
  );
};
