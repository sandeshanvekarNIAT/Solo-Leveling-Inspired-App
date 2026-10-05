'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/lib/sound';
import { AwakeningPhase } from '@/types/system';

interface AwakeningCinematicProps {
  phase: AwakeningPhase;
  onPhaseChange: (nextPhase: AwakeningPhase) => void;
  onComplete: () => void;
  onSkip?: () => void;
}

export const AwakeningCinematic: React.FC<AwakeningCinematicProps> = ({
  phase,
  onPhaseChange,
  onComplete,
  onSkip,
}) => {
  // Loading progress percentage (0 - 100)
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Phase 1: Red Glitch Out (~1.2s)
  useEffect(() => {
    if (phase === 'glitch') {
      soundManager.unlockAudio();
      soundManager.playHeavyGlitch();

      const timer = setTimeout(() => {
        onPhaseChange('void');
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [phase, onPhaseChange]);

  // Phase 2: Dark Screen / Void (~2.6s)
  useEffect(() => {
    if (phase === 'void') {
      // First heartbeat
      const beat1 = setTimeout(() => {
        soundManager.playHeartbeat();
      }, 400);

      // Second heartbeat
      const beat2 = setTimeout(() => {
        soundManager.playHeartbeat();
      }, 1500);

      // Transition to Loading Screen
      const transitionTimer = setTimeout(() => {
        onPhaseChange('loading');
      }, 2600);

      return () => {
        clearTimeout(beat1);
        clearTimeout(beat2);
        clearTimeout(transitionTimer);
      };
    }
  }, [phase, onPhaseChange]);

  // Phase 3: Loading Screen (~3.8s)
  useEffect(() => {
    if (phase === 'loading') {
      setProgress(0);
      setLogIndex(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Increment with organic speed
          const step = Math.floor(Math.random() * 4) + 2;
          const next = Math.min(prev + step, 100);

          // Trigger audio blips on milestone percentages
          if (next % 20 < 4) {
            soundManager.playDataStream();
          }

          return next;
        });
      }, 70);

      // Step through system logs
      const t1 = setTimeout(() => setLogIndex(1), 600);
      const t2 = setTimeout(() => setLogIndex(2), 1300);
      const t3 = setTimeout(() => setLogIndex(3), 2000);
      const t4 = setTimeout(() => setLogIndex(4), 2700);
      const t5 = setTimeout(() => setLogIndex(5), 3300);

      // Finish loading
      const finishTimer = setTimeout(() => {
        soundManager.playLevelUp();
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 3700);

      return () => {
        clearInterval(interval);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t5);
        clearTimeout(finishTimer);
      };
    }
  }, [phase, onComplete]);

  // Keyboard shortcut to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onSkip) {
        onSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSkip]);

  if (phase === 'idle' || phase === 'done' || phase === 'unfolding') {
    return null;
  }

  const logs = [
    '[01/05] REPAIRING CELLULAR & MUSCULAR TISSUE…',
    '[02/05] AWAKENING LATENT MANA CHANNELS…',
    '[03/05] BINDING SYSTEM INTERFACE TO PLAYER: KAIEN JIN…',
    '[04/05] CALIBRATING QUEST DIRECTIVE MATRIX…',
    '[05/05] SOVEREIGN SYSTEM REPOSITORIES ONLINE.',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Awakening Protocol"
      className="fixed inset-0 z-50 overflow-hidden bg-black select-none"
    >
      {/* Optional Skip Button in corner */}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          aria-label="Skip awakening sequence"
          className="absolute top-4 right-4 z-50 px-3 py-1 font-mono text-[10px] text-slate-500 hover:text-white border border-white/10 hover:border-white/30 rounded bg-black/40 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
        >
          [ SKIP ESC ]
        </button>
      )}

      {/* PHASE 1: RED GLITCH OUT */}
      {phase === 'glitch' && (
        <div className="absolute inset-0 bg-[#FF2D4B]/20 flex items-center justify-center overflow-hidden">
          {/* Violent Red Flashing Background */}
          <div className="absolute inset-0 bg-[#120206] animate-pulse" />

          {/* Glitch Slices */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-8 bg-[#FF2D4B]/40 translate-x-3 my-12 animate-glitch-shake" />
            <div className="w-full h-16 bg-white/20 -translate-x-4 my-24 animate-glitch-shake" />
            <div className="w-full h-6 bg-[#FF2D4B]/60 translate-x-6 my-8 animate-glitch-shake" />
            <div className="w-full h-12 bg-black/80 -translate-x-2 my-16 animate-glitch-shake" />
          </div>

          {/* Red CRT Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 45, 75, 0.25) 0px, transparent 2px, transparent 4px)',
            }}
          />

          {/* Catastrophic Glitch Text */}
          <div className="relative z-10 text-center font-orbitron px-4 space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [1, 1.05, 0.98, 1.02], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className="text-[#FF2D4B] font-black text-2xl sm:text-5xl md:text-6xl tracking-[0.25em] uppercase glow-text-red"
            >
              [ SYSTEM OVERRIDE ]
            </motion.div>

            <div className="font-mono text-xs sm:text-sm text-red-200 tracking-widest space-y-1">
              <p>[ERROR: BIOLOGICAL SYNC SURGE]</p>
              <p className="text-white font-bold">[RECIPIENT CONSCIOUSNESS TERMINATING]</p>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: DARK SCREEN / VOID (2-3 seconds of darkness) */}
      {phase === 'void' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-[#000000] flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Subtle Biological Pulse in the Dead Center */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                scale: [1, 1.4, 1, 1.3, 1],
                opacity: [0.3, 0.9, 0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-3 h-3 rounded-full bg-[#FF2D4B] shadow-[0_0_15px_#FF2D4B]"
            />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#1EA7FF] opacity-30 blur-sm" />
          </div>

          {/* Minimalist Fading Telemetry */}
          <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-500 tracking-[0.25em]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-slate-400"
            >
              [Biological heart rate: 0 BPM]
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-slate-600"
            >
              [Consciousness suspended in the Void]
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-[#7FD4FF] font-semibold"
            >
              [The System has intervened.]
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* PHASE 3: SLOW SYSTEM LOADING SCREEN */}
      {phase === 'loading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[#02040A] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Subtle Ambient Matrix Grid */}
          <div className="absolute inset-0 bg-circuit-grid opacity-30 pointer-events-none" />

          {/* Background Radial Glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#1EA7FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Loading Container */}
          <div className="relative max-w-xl w-full mx-auto p-6 sm:p-8 bg-[#040c1c]/90 border border-[#1EA7FF]/80 rounded chamfer-lg shadow-[0_0_40px_rgba(30,167,255,0.25)] text-center">
            {/* Holographic Spinning Rune Crest */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              {/* Outer rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#1EA7FF]/50"
              />

              {/* Inner counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-dotted border-[#38FF9A]/60"
              />

              {/* Center Core Glyph */}
              <div className="w-10 h-10 rounded-full bg-[#1EA7FF]/20 border border-[#1EA7FF] flex items-center justify-center shadow-[0_0_15px_#1EA7FF]">
                <span className="font-orbitron font-extrabold text-xs text-[#1EA7FF] animate-pulse">
                  AWK
                </span>
              </div>
            </div>

            {/* Header Badge */}
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[#1EA7FF]/10 border border-[#1EA7FF]/40 text-[#7FD4FF] font-mono text-[10px] tracking-[0.25em] uppercase">
              [SYSTEM KERNEL: PLAYER RECONSTRUCTION]
            </div>

            {/* Percentage Display */}
            <div className="font-orbitron font-black text-4xl sm:text-5xl text-white tracking-widest my-2 tabular-nums drop-shadow-[0_0_20px_rgba(30,167,255,0.5)]">
              {progress}%
            </div>

            {/* Chamfered Progress Bar */}
            <div className="w-full h-3 bg-black/70 border border-[#1EA7FF]/60 rounded-sm p-[2px] mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1EA7FF] via-[#7FD4FF] to-[#38FF9A] shadow-[0_0_12px_#1EA7FF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Terminal Status Output Stream */}
            <div className="p-4 bg-black/60 border border-white/10 rounded font-mono text-xs text-left min-h-[110px] space-y-1.5 overflow-hidden">
              <div className="text-[10px] text-slate-500 border-b border-white/10 pb-1 mb-2 flex justify-between">
                <span>TERMINAL BROADCAST</span>
                <span className="text-[#38FF9A]">KERNEL: READY</span>
              </div>

              {logs.slice(0, logIndex + 1).map((log, i) => (
                <motion.div
                  key={log}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs ${
                    i === logIndex ? 'text-[#38FF9A] font-bold' : 'text-slate-400'
                  }`}
                >
                  {log}
                </motion.div>
              ))}
            </div>

            {/* Footer Notice */}
            <div className="mt-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Neural Calibration In Progress • Do Not Disconnect
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
