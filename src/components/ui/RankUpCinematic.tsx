'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { RankBadge } from './RankBadge';
import { SystemButton } from './SystemButton';
import confetti from 'canvas-confetti';

export const RankUpCinematic: React.FC = () => {
  const { player, setActiveModal } = useSystem();

  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#8B2CFF', '#D43BFF', '#FF2D4B', '#FFC94A'],
      });
    } catch {}
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rankup-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 animate-glitch-shake"
    >
      {/* Background Radial Sovereign Pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8B2CFF]/25 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="relative max-w-lg w-full text-center border-2 border-[#D43BFF] p-6 sm:p-10 bg-[#050614]/95 chamfer-lg glow-border-purple"
      >
        <div className="text-[11px] font-mono tracking-[0.3em] text-[#D43BFF] uppercase mb-3">
          [CRITICAL SYSTEM EVALUATION: COMPLETE]
        </div>

        <motion.h2
          id="rankup-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-[0.2em] glow-text-purple mb-6"
        >
          RANK ADVANCEMENT
        </motion.h2>

        {/* Slamming Rank Badge */}
        <motion.div
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
          className="flex justify-center my-6"
        >
          <RankBadge rank={player.rank} size="xl" showLabel />
        </motion.div>

        {/* System Congratulatory Directive */}
        <div className="bg-black/70 border border-[#8B2CFF]/40 p-4 mb-6 text-left space-y-2 font-mono text-xs text-[#E8F6FF]">
          <div className="text-[#D43BFF] font-semibold text-center uppercase tracking-widest text-sm mb-1">
            [TITLE: {player.title}]
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1">
            <span>[HUNTER RANK TIER]</span>
            <span className="font-orbitron text-white">{player.rank}-RANK SOVEREIGN</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1">
            <span>[COMBAT POWER MULTIPLIER]</span>
            <span className="font-orbitron text-[#38FF9A]">+{player.combatPower} CP</span>
          </div>
          <div className="flex justify-between">
            <span>[SYSTEM AUTHORIZATION]</span>
            <span className="text-[#38FF9A]">HIGHER GATES UNLOCKED</span>
          </div>
        </div>

        <p className="text-xs font-mono text-slate-400 mb-6 italic">
          [Your presence warps the atmospheric pressure. The weak instinctively kneel.]
        </p>

        <SystemButton
          variant="purple"
          size="lg"
          fullWidth
          onClick={() => setActiveModal(null)}
        >
          [ EMBRACE NEW RANK ]
        </SystemButton>
      </motion.div>
    </div>
  );
};
