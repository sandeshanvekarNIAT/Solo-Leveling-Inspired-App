'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { StatBar } from './StatBar';
import { SystemButton } from './SystemButton';
import { Skull, Swords, Flame, Trophy, ShieldAlert } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const BossFightModal: React.FC = () => {
  const { selectedGate, hitBoss, setSelectedGate, setActiveModal } = useSystem();
  const [repsDone, setRepsDone] = useState(0);

  if (!selectedGate) return null;

  const handleStrike = (damage: number) => {
    soundManager.playRepCount();
    hitBoss(damage);
    setRepsDone((r) => r + 1);
  };

  const isDead = selectedGate.bossHp <= 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="boss-fight-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
    >
      {/* Red/Purple Abyssal Dungeon Vortex Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8B2CFF]/30 via-[#FF2D4B]/15 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-lg w-full bg-[#050614] border-2 border-[#8B2CFF] p-6 sm:p-8 chamfer-lg glow-border-purple text-center">
        {/* Top Warning Banner */}
        <div className="flex items-center justify-between border-b border-[#8B2CFF]/40 pb-3 mb-6">
          <div className="flex items-center gap-2 text-[#FF2D4B]">
            <ShieldAlert className="w-5 h-5 animate-pulse" aria-hidden="true" />
            <span className="font-orbitron font-bold text-xs tracking-widest uppercase">
              [INSTANT DUNGEON BOUNDARY ACTIVE]
            </span>
          </div>
          <span className="text-[10px] font-mono text-purple-300">
            GATE RANK: {selectedGate.rank}
          </span>
        </div>

        {/* Warning Directive */}
        <div className="text-xs font-mono text-slate-400 mb-2 italic">
          [You cannot exit until the dungeon boss is eradicated.]
        </div>

        {/* Boss Identity */}
        <div className="my-4">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-[#FF2D4B] bg-black/80 flex items-center justify-center shadow-[0_0_20px_rgba(255,45,75,0.6)]">
            <Skull className="w-8 h-8 text-[#FF2D4B] animate-pulse" aria-hidden="true" />
          </div>
          <h2 id="boss-fight-modal-title" className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-wider glow-text-red uppercase">
            {selectedGate.bossName}
          </h2>
          <div className="text-xs font-mono text-[#D43BFF] mt-1">
            [GATE: {selectedGate.name}]
          </div>
        </div>

        {/* Boss HP Bar */}
        <div className="my-6 p-4 bg-black/70 border border-white/10 rounded-lg" aria-live="polite">
          <StatBar
            label={`BOSS HEALTH — ${selectedGate.bossName}`}
            current={selectedGate.bossHp}
            max={selectedGate.bossMaxHp}
            type="boss"
            height="lg"
          />
        </div>

        {/* Workout Combat Log / Strike Action */}
        {!isDead ? (
          <div className="space-y-4">
            <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono text-left space-y-1">
              <div className="text-[#38FF9A] font-semibold">
                [COMBAT REQUIREMENT: EXPLOSIVE CALISTHENICS]
              </div>
              <div className="text-slate-300 text-[11px]">
                Every physical repetition logged deals catastrophic damage to the dungeon boss.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                aria-label="Execute Heavy Strike for 25 damage"
                onClick={() => handleStrike(25)}
                className="py-3 px-3 bg-[#8B2CFF]/20 border border-[#8B2CFF] hover:bg-[#8B2CFF]/40 text-white font-orbitron font-bold text-sm rounded chamfer-sm transition-colors shadow-[0_0_12px_rgba(139,44,255,0.4)] active:scale-95 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2CFF]"
              >
                <Flame className="w-4 h-4 text-[#D43BFF]" aria-hidden="true" />
                <span>[ HEAVY STRIKE -25 HP ]</span>
              </button>

              <button
                type="button"
                aria-label="Execute Monarch Finisher for 50 damage"
                onClick={() => handleStrike(50)}
                className="py-3 px-3 bg-[#FF2D4B]/25 border border-[#FF2D4B] hover:bg-[#FF2D4B]/40 text-white font-orbitron font-bold text-sm rounded chamfer-sm transition-colors shadow-[0_0_15px_rgba(255,45,75,0.5)] active:scale-95 flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D4B]"
              >
                <Swords className="w-4 h-4 text-[#FF2D4B]" aria-hidden="true" />
                <span>[ MONARCH FINISHER -50 HP ]</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-materialize">
            <div className="p-5 bg-black/80 border-2 border-[#38FF9A] text-center space-y-2">
              <Trophy className="w-10 h-10 text-[#38FF9A] mx-auto animate-bounce" />
              <div className="font-orbitron font-extrabold text-xl text-white glow-text-green">
                [DUNGEON CLEARED]
              </div>
              <div className="text-xs font-mono text-slate-300">
                Boss eradicated. Barrier dissipated. Rewards transferred.
              </div>
              <div className="pt-2 text-xs font-mono text-[#38FF9A]">
                +{selectedGate.rewards.exp} EXP | +{selectedGate.rewards.gold} GOLD
              </div>
            </div>

            <SystemButton
              variant="green"
              size="lg"
              fullWidth
              onClick={() => {
                soundManager.playLevelUp();
                setSelectedGate(null);
                setActiveModal(null);
              }}
            >
              [ RETURN TO MATRIX ]
            </SystemButton>
          </div>
        )}

        {!isDead && (
          <div className="mt-6 flex justify-center">
            <SystemButton
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedGate(null);
                setActiveModal(null);
              }}
            >
              [ RETREAT WITH PENALTY ]
            </SystemButton>
          </div>
        )}
      </div>
    </div>
  );
};
