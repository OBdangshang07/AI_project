export type ThinkingState = 'dormant' | 'tension' | 'dialectic' | 'resonance';

export interface DimensionVector {
  entropy: number;   // 0 - 100: Intuition, chaos, fluid drift
  rigor: number;     // 0 - 100: Structural integrity, geometry, grid tension
  empathy: number;   // 0 - 100: Warmth, harmonic resonance, color heat
  velocity: number;  // 0 - 100: Momentum, kinetic frequency, rotation
}

export interface ArchetypeProfile {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  vector: DimensionVector;
  color: string;
  iconName: string;
}

export interface CognitiveArchetype {
  name: string;
  subtitle: string;
  vector: DimensionVector;
  state: ThinkingState;
}

export interface InteractiveArtifact {
  id: string;
  title: string;
  category: string;
  year: string;
  statement: string;
  dialecticDuality: {
    thesis: string;
    antithesis: string;
    synthesis: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  interactiveType: 'waves' | 'tensegrity' | 'typography' | 'attractor';
}

export interface HarmonicPulse {
  id: string;
  timestamp: number;
  pitch: number;
  intensity: number;
  originX: number;
  originY: number;
  label: string;
}

export interface AudioEngineStatus {
  isMuted: boolean;
  isPlayingDrone: boolean;
  activeFrequency: number;
  currentHarmonic: string;
}
