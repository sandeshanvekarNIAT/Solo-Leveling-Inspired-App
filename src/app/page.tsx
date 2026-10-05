'use client';

import React from 'react';
import { SystemProvider, useSystem } from '@/context/SystemContext';
import { LandingPage } from '@/components/landing/LandingPage';
import { AppShell } from '@/components/app/AppShell';
import { AwakeningCinematic } from '@/components/ui/AwakeningCinematic';

function MainRouter() {
  const { 
    viewMode, 
    awakeningPhase, 
    setAwakeningPhase, 
    completeAwakening, 
    skipAwakening 
  } = useSystem();

  return (
    <>
      {/* CRT Scanline & Atmospheric Vignette Overlays */}
      <div className="crt-overlay" />
      <div className="vignette-overlay" />

      {/* Awakening Cinematic Flow (Glitch -> Dark Void -> Loading Matrix) */}
      <AwakeningCinematic
        phase={awakeningPhase}
        onPhaseChange={setAwakeningPhase}
        onComplete={completeAwakening}
        onSkip={skipAwakening}
      />

      {viewMode === 'landing' ? <LandingPage /> : <AppShell />}
    </>
  );
}

export default function Page() {
  return (
    <SystemProvider>
      <MainRouter />
    </SystemProvider>
  );
}
