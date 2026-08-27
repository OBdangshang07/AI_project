/// <reference types="vite/client" />

declare module 'lucide-react' {
  import * as React from 'react';
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }
  export type Icon = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  export const Activity: Icon;
  export const ArrowDown: Icon;
  export const ArrowUpRight: Icon;
  export const Code: Icon;
  export const Compass: Icon;
  export const Cpu: Icon;
  export const Eye: Icon;
  export const GitCompare: Icon;
  export const HeartHandshake: Icon;
  export const HelpCircle: Icon;
  export const Info: Icon;
  export const Keyboard: Icon;
  export const Layers: Icon;
  export const MessageSquare: Icon;
  export const MousePointerClick: Icon;
  export const Radio: Icon;
  export const RotateCcw: Icon;
  export const Send: Icon;
  export const ShieldCheck: Icon;
  export const Sliders: Icon;
  export const Sparkles: Icon;
  export const Terminal: Icon;
  export const Volume2: Icon;
  export const VolumeX: Icon;
  export const X: Icon;
  export const Zap: Icon;
}
