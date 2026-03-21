import React, { lazy, Suspense } from 'react';

// OGL-based backgrounds
const LineWaves = lazy(() => import('@/components/LineWaves'));
const Aurora = lazy(() => import('@/components/backgrounds/Aurora'));
const Iridescence = lazy(() => import('@/components/backgrounds/Iridescence'));
const Threads = lazy(() => import('@/components/backgrounds/Threads'));
const Particles = lazy(() => import('@/components/backgrounds/Particles'));
const Waves = lazy(() => import('@/components/backgrounds/Waves'));
const Silk = lazy(() => import('@/components/backgrounds/Silk'));
const Balatro = lazy(() => import('@/components/backgrounds/Balatro'));
const DarkVeil = lazy(() => import('@/components/backgrounds/DarkVeil'));
const EvilEye = lazy(() => import('@/components/backgrounds/EvilEye'));
const FaultyTerminal = lazy(() => import('@/components/backgrounds/FaultyTerminal'));
const Galaxy = lazy(() => import('@/components/backgrounds/Galaxy'));
const GradientBlinds = lazy(() => import('@/components/backgrounds/GradientBlinds'));
const Grainient = lazy(() => import('@/components/backgrounds/Grainient'));
const LightRays = lazy(() => import('@/components/backgrounds/LightRays'));
const LiquidChrome = lazy(() => import('@/components/backgrounds/LiquidChrome'));
const Orb = lazy(() => import('@/components/backgrounds/Orb'));
const Plasma = lazy(() => import('@/components/backgrounds/Plasma'));
const Prism = lazy(() => import('@/components/backgrounds/Prism'));
const PrismaticBurst = lazy(() => import('@/components/backgrounds/PrismaticBurst'));
const Radar = lazy(() => import('@/components/backgrounds/Radar'));
const RippleGrid = lazy(() => import('@/components/backgrounds/RippleGrid'));
const SoftAurora = lazy(() => import('@/components/backgrounds/SoftAurora'));

// Three.js based backgrounds
const Beams = lazy(() => import('@/components/backgrounds/Beams'));
const ColorBends = lazy(() => import('@/components/backgrounds/ColorBends'));
const FloatingLines = lazy(() => import('@/components/backgrounds/FloatingLines'));
const LightPillar = lazy(() => import('@/components/backgrounds/LightPillar'));
const LiquidEther = lazy(() => import('@/components/backgrounds/LiquidEther'));
const PixelSnow = lazy(() => import('@/components/backgrounds/PixelSnow'));

// Pure canvas/React backgrounds
const LetterGlitch = lazy(() => import('@/components/backgrounds/LetterGlitch'));
const Lightning = lazy(() => import('@/components/backgrounds/Lightning'));
const ShapeGrid = lazy(() => import('@/components/backgrounds/ShapeGrid'));

export interface BackgroundEntry {
  name: string;
  element: React.ReactNode;
}

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="w-full h-full bg-black" />}>
    {children}
  </Suspense>
);

export const backgrounds: BackgroundEntry[] = [
  { name: 'Line Waves', element: <Wrap><LineWaves speed={0.15} brightness={0.15} color1="#ffffff" color2="#ffffff" color3="#ffffff" enableMouseInteraction={false} /></Wrap> },
  { name: 'Aurora', element: <Wrap><Aurora colorStops={['#0C1C28', '#1a5c3a', '#0C1C28']} speed={0.4} amplitude={1.2} blend={0.6} /></Wrap> },
  { name: 'Silk', element: <Wrap><Silk speed={3} scale={1} color="#0C1C28" noiseIntensity={1.5} rotation={0} /></Wrap> },
  { name: 'Threads', element: <Wrap><Threads amplitude={1} distance={0} enableMouseInteraction={false} /></Wrap> },
  { name: 'Iridescence', element: <Wrap><Iridescence speed={0.3} color={[0.2, 0.4, 0.6]} mouseReact={false} /></Wrap> },
  { name: 'Particles', element: <Wrap><Particles particleCount={150} speed={0.05} particleColors={['#ffffff', '#94a3b8', '#64748b']} alphaParticles={true} particleBaseSize={80} /></Wrap> },
  { name: 'Waves', element: <Wrap><Waves lineColor="rgba(255,255,255,0.15)" backgroundColor="transparent" waveAmpX={40} waveAmpY={20} xGap={12} yGap={36} /></Wrap> },
  { name: 'Soft Aurora', element: <Wrap><SoftAurora /></Wrap> },
  { name: 'Prism', element: <Wrap><Prism /></Wrap> },
  { name: 'Dark Veil', element: <Wrap><DarkVeil /></Wrap> },
  { name: 'Plasma', element: <Wrap><Plasma /></Wrap> },
  { name: 'Galaxy', element: <Wrap><Galaxy /></Wrap> },
  { name: 'Liquid Chrome', element: <Wrap><LiquidChrome /></Wrap> },
  { name: 'Liquid Ether', element: <Wrap><LiquidEther /></Wrap> },
  { name: 'Balatro', element: <Wrap><Balatro /></Wrap> },
  { name: 'Evil Eye', element: <Wrap><EvilEye /></Wrap> },
  { name: 'Gradient Blinds', element: <Wrap><GradientBlinds /></Wrap> },
  { name: 'Grainient', element: <Wrap><Grainient /></Wrap> },
  { name: 'Light Rays', element: <Wrap><LightRays /></Wrap> },
  { name: 'Orb', element: <Wrap><Orb /></Wrap> },
  { name: 'Prismatic Burst', element: <Wrap><PrismaticBurst /></Wrap> },
  { name: 'Radar', element: <Wrap><Radar /></Wrap> },
  { name: 'Ripple Grid', element: <Wrap><RippleGrid /></Wrap> },
  { name: 'Faulty Terminal', element: <Wrap><FaultyTerminal /></Wrap> },
  { name: 'Beams', element: <Wrap><Beams /></Wrap> },
  { name: 'Color Bends', element: <Wrap><ColorBends /></Wrap> },
  { name: 'Floating Lines', element: <Wrap><FloatingLines /></Wrap> },
  { name: 'Light Pillar', element: <Wrap><LightPillar /></Wrap> },
  { name: 'Pixel Snow', element: <Wrap><PixelSnow /></Wrap> },
  { name: 'Lightning', element: <Wrap><Lightning /></Wrap> },
  { name: 'Letter Glitch', element: <Wrap><LetterGlitch /></Wrap> },
  { name: 'Shape Grid', element: <Wrap><ShapeGrid /></Wrap> },
];
