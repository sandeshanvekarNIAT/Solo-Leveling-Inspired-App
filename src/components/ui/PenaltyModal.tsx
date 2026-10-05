'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemButton } from './SystemButton';
import { AlertOctagon, HeartHandshake, Skull, Flame } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const PenaltyModal: React.FC = () => {
  const { player, useRestToken, dismissPenalty } = useSystem();
  const [clearingReps, setClearingReps] = useState(0);
  const targetReps = 30; // 30 survival burpees to break out

  const handleRep = () => {
    soundManager.playRepCount();
    const next = clearingReps + 5;
    setClearingReps(next);
    if (next >= targetReps) {
      soundManager.playLevelUp();
      dismissPenalty();
    }
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="penalty-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070002]/95 backdrop-blur-xl p-4 animate-glitch-shake"
    >
      {/* Cracked Glass Edge Borders */}
      <div className="absolute inset-0 pointer-events-none border-8 border-[#FF2D4B]/40 shadow-[inset_0_0_80px_rgba(255,45,75,0.4)]" aria-hidden="true" />

      {/* Red ambient warning pulses */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF2D4B]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-lg w-full bg-[#0d0205] border-2 border-[#FF2D4B] p-6 sm:p-8 chamfer-lg glow-border-red">
        {/* Warning Badge Header */}
        <div className="flex items-center justify-between border-b border-[#FF2D4B]/40 pb-3 mb-5">
          <div className="flex items-center gap-2 text-[#FF2D4B]">
            <AlertOctagon className="w-6 h-6 animate-pulse" aria-hidden="true" />
            <span className="font-orbitron font-extrabold tracking-widest text-sm">
              [PENALTY ZONE ACTIVE]
            </span>
          </div>
          <span className="text-[10px] font-mono text-red-400 bg-red-950/80 px-2 py-1 border border-red-800">
            DANGER::LVL_EXTREME
          </span>
        </div>

        {/* Ominous Directive */}
        <div className="space-y-2 mb-6">
          <h2 id="penalty-modal-title" className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wider glow-text-red">
            PUNISHMENT QUEST: SURVIVAL
          </h2>
          <p className="font-mono text-xs sm:text-sm text-red-200/90 leading-relaxed">
            [You failed to complete the Daily Quest before midnight.]
            <br />
            [The System has transported your coordinates to the Abyssal Desert. Giant Sand Centipedes have detected your presence.]
          </p>
        </div>

        {/* Survival Reps Tracker */}
        <div className="bg-black/80 border border-[#FF2D4B]/60 p-4 mb-6">
          <div className="flex justify-between items-center text-xs font-orbitron text-red-300 mb-2" aria-live="polite">
            <span>ESCAPE PROGRESS (SURVIVAL BURPEES)</span>
            <span className="font-mono font-bold text-white tabular-nums text-sm">
              {clearingReps} / {targetReps} REPS
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Survival escape burpee progress"
            aria-valuenow={clearingReps}
            aria-valuemin={0}
            aria-valuemax={targetReps}
            aria-valuetext={`${clearingReps} of ${targetReps} burpees completed`}
            className="w-full h-3 bg-red-950 rounded-full overflow-hidden border border-red-800"
          >
            <div
              className="h-full bg-gradient-to-r from-red-600 to-[#FF2D4B] transition-all duration-300 shadow-[0_0_10px_#FF2D4B]"
              style={{ width: `${Math.min(100, (clearingReps / targetReps) * 100)}%` }}
            />
          </div>

          <div className="mt-4 flex gap-2">
            <SystemButton
              variant="red"
              size="md"
              fullWidth
              aria-label="Log 5 survival burpee repetitions"
              onClick={handleRep}
              className="flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4" aria-hidden="true" />
              <span>[ LOG +5 SURVIVAL REPS ]</span>
            </SystemButton>
          </div>
        </div>

        {/* Humane Rest Token Rescue */}
        <div className="border border-white/10 bg-white/[0.03] p-4 mb-6">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#38FF9A] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs font-mono space-y-1">
              <div className="text-[#38FF9A] font-orbitron font-semibold">
                HUMANE SAFETY OVERRIDE: REST TOKEN
              </div>
              <div className="text-slate-300 text-[11px] leading-relaxed">
                Sick, injured, or traveling? Consume a Rest Token to negate this penalty instantly without penalty or loss of streak.
              </div>
              <div className="text-[10px] text-slate-400 pt-1">
                AVAILABLE REST TOKENS: <span className="font-bold text-white tabular-nums">{player.restTokens}</span>
              </div>
            </div>
          </div>

          {player.restTokens > 0 ? (
            <SystemButton
              variant="green"
              size="sm"
              fullWidth
              aria-label="Consume a Rest Token to excuse penalty and preserve streak"
              onClick={useRestToken}
              className="mt-3"
            >
              [ USE REST TOKEN (EXCUSE TODAY) ]
            </SystemButton>
          ) : (
            <div className="text-[11px] font-mono text-amber-400 mt-2 italic">
              [No Rest Tokens available in inventory. Craft them in the Alchemy tab using Discipline Shards.]
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <SystemButton
            variant="ghost"
            size="sm"
            aria-label="Dismiss penalty warning"
            onClick={dismissPenalty}
          >
            [ DISMISS WARNING ]
          </SystemButton>
        </div>
      </div>
    </div>
  );
};
