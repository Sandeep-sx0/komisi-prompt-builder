import React, { lazy, Suspense } from 'react';

const LineWaves = lazy(() => import('@/components/LineWaves'));
const Aurora = lazy(() => import('@/components/backgrounds/Aurora'));
const Iridescence = lazy(() => import('@/components/backgrounds/Iridescence'));
const Threads = lazy(() => import('@/components/backgrounds/Threads'));
const Particles = lazy(() => import('@/components/backgrounds/Particles'));
const Waves = lazy(() => import('@/components/backgrounds/Waves'));
const Silk = lazy(() => import('@/components/backgrounds/Silk'));

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
  {
    name: 'Line Waves',
    element: <Wrap><LineWaves speed={0.15} brightness={0.15} color1="#ffffff" color2="#ffffff" color3="#ffffff" enableMouseInteraction={false} /></Wrap>,
  },
  {
    name: 'Aurora',
    element: <Wrap><Aurora colorStops={['#0C1C28', '#1a5c3a', '#0C1C28']} speed={0.4} amplitude={1.2} blend={0.6} /></Wrap>,
  },
  {
    name: 'Iridescence',
    element: <Wrap><Iridescence speed={0.3} color={[0.2, 0.4, 0.6]} mouseReact={false} /></Wrap>,
  },
  {
    name: 'Threads',
    element: <Wrap><Threads amplitude={1} distance={0} enableMouseInteraction={false} /></Wrap>,
  },
  {
    name: 'Particles',
    element: <Wrap><Particles particleCount={150} speed={0.05} particleColors={['#ffffff', '#94a3b8', '#64748b']} alphaParticles={true} particleBaseSize={80} /></Wrap>,
  },
  {
    name: 'Waves',
    element: <Wrap><Waves lineColor="rgba(255,255,255,0.15)" backgroundColor="transparent" waveAmpX={40} waveAmpY={20} xGap={12} yGap={36} /></Wrap>,
  },
  {
    name: 'Silk',
    element: <Wrap><Silk speed={3} scale={1} color="#0C1C28" noiseIntensity={1.5} rotation={0} /></Wrap>,
  },
];
