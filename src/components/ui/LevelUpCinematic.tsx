'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { SystemButton } from './SystemButton';
import confetti from 'canvas-confetti';

export const LevelUpCinematic: React.FC = () => {
  const { player, setActiveModal } = useSystem();

  useEffect(() => {
    // Cinematic particle burst
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#1EA7FF', '#7FD4FF', '#E8F6FF', '#38FF9A'],
      });
    } catch {}
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="levelup-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
    >
      {/* Vertical light beam in background */}
      <div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#1EA7FF]/20 to-transparent blur-2xl animate-pulse pointer-events-none" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-md w-full text-center border-2 border-[#1EA7FF] p-6 sm:p-8 bg-[#040c1c]/95 chamfer-lg glow-border"
      >
        {/* Top system node tag */}
        <div className="text-[10px] font-mono tracking-widest text-[#7FD4FF] uppercase mb-2">
          [SYSTEM NOTIFICATION: MATRIX SURGE]
        </div>

        {/* Level Up Title */}
        <motion.h2
          id="levelup-title"
          initial={{ scale: 0.8, filter: 'blur(8px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-[0.25em] glow-text mb-3"
        >
          LEVEL UP
        </motion.h2>

        {/* Rolling Level Display */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="p-3 border border-white/20 bg-white/5 font-orbitron text-xl sm:text-2xl text-slate-400">
            LVL {Math.max(1, player.level - 1)}
          </div>
          <span className="text-[#1EA7FF] font-orbitron text-2xl font-bold">➔</span>
          <motion.div
            initial={{ scale: 1.4, color: '#38FF9A' }}
            animate={{ scale: 1, color: '#1EA7FF' }}
            transition={{ duration: 0.6 }}
            className="p-3.5 border-2 border-[#1EA7FF] bg-[#1EA7FF]/20 font-orbitron text-2xl sm:text-4xl font-extrabold glow-text"
          >
            LVL {player.level}
          </motion.div>
        </div>

        {/* Rewards and Stat Points Awarded */}
        <div className="bg-black/60 border border-[#7FD4FF]/30 p-3.5 mb-6 text-left space-y-1.5 font-mono text-xs text-[#E8F6FF]">
          <div className="flex justify-between items-center text-[#38FF9A] font-semibold">
            <span>[AVAILABLE STAT POINTS]</span>
            <span className="font-orbitron text-sm">+3 POINTS</span>
          </div>
          <div className="flex justify-between items-center text-[#7FD4FF]">
            <span>[HP & MP RESTORATION]</span>
            <span>100% RECOVERED</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>[COMBAT POWER SURGE]</span>
            <span className="font-orbitron text-white">+{85} CP</span>
          </div>
        </div>

        <p className="text-xs font-mono text-slate-400 mb-6 italic">
          [Your mortal shell adapts to accommodate increased magical density.]
        </p>

        <SystemButton
          variant="blue"
          size="lg"
          fullWidth
          onClick={() => setActiveModal(null)}
        >
          [ CLAIM POWER ]
        </SystemButton>
      </motion.div>
    </div>
  );
};
