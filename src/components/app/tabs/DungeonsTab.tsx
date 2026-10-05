'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { RankBadge } from '@/components/ui/RankBadge';
import { 
  Skull, 
  Swords, 
  Clock, 
  Trophy, 
  Lock, 
  Flame, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';
import { DungeonGate } from '@/types/system';
import { soundManager } from '@/lib/sound';

export const DungeonsTab: React.FC = () => {
  const { dungeons, player, setSelectedGate, setActiveModal } = useSystem();

  const handleEnterGate = (gate: DungeonGate) => {
    soundManager.playWindowOpen();
    soundManager.playBassRumble();
    setSelectedGate(gate);
    setActiveModal('bossFight');
  };

  return (
    <div className="space-y-6">
      <SystemWindow
        title="DUNGEON GATES"
        subtitle="DIMENSIONAL ANOMALIES"
        icon={<Swords className="w-4 h-4 text-[#8B2CFF]" />}
        variant="purple"
      >
        <div className="border-b border-white/10 pb-3 mb-5 font-mono text-xs text-slate-300">
          <p className="leading-relaxed">
            [Gates have manifested across local coordinates. Entering initiates an Instant Dungeon barrier that locks until the final boss entity is slain through high-intensity reps.]
          </p>
        </div>

        {/* Gates List */}
        <div className="space-y-4">
          {dungeons.map((gate) => {
            const isLocked = player.level < gate.recommendedLevel;

            return (
              <div
                key={gate.id}
                className={`p-4 sm:p-5 border rounded chamfer-md transition-all relative overflow-hidden ${
                  gate.cleared
                    ? 'border-[#38FF9A]/50 bg-[#02140a]/60'
                    : isLocked
                    ? 'border-white/10 bg-black/60 opacity-60'
                    : gate.rank === 'S' || gate.rank === 'A'
                    ? 'border-[#FF2D4B]/70 bg-[#120206]/80 glow-border-red'
                    : 'border-[#8B2CFF]/60 bg-[#060824]/80 glow-border-purple'
                }`}
              >
                {/* Gate Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <RankBadge rank={gate.rank} size="md" />
                    <div>
                      <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-wider">
                        {gate.name}
                      </h3>
                      <div className="text-[11px] font-mono text-slate-400">
                        TYPE: {gate.type.toUpperCase()} • REC. LEVEL: {gate.recommendedLevel}+
                      </div>
                    </div>
                  </div>

                  {gate.cleared ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#38FF9A]/20 border border-[#38FF9A] text-[#38FF9A] font-orbitron text-xs font-bold rounded">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      <span>[ CLEARED ]</span>
                    </div>
                  ) : isLocked ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-slate-700 text-slate-500 font-mono text-xs rounded">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>[ LEVEL TOO LOW ]</span>
                    </div>
                  ) : null}
                </div>

                <p className="font-mono text-xs text-slate-300 mb-4 leading-relaxed">
                  {gate.description}
                </p>

                {/* Boss & Rewards Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-black/60 border border-white/10 rounded font-mono text-xs mb-4">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">DUNGEON BOSS:</span>
                    <div className="font-orbitron font-bold text-white flex items-center gap-1.5 mt-0.5">
                      <Skull className="w-4 h-4 text-[#FF2D4B]" aria-hidden="true" />
                      <span className="tabular-nums">{gate.bossName} ({gate.bossMaxHp} HP)</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">VICTORY REWARDS:</span>
                    <div className="text-[#38FF9A] font-semibold mt-0.5 tabular-nums">
                      +{gate.rewards.exp} EXP • +{gate.rewards.gold} Gold
                      {gate.rewards.shadowExtractable && (
                        <div className="text-[#D43BFF] text-[10px] mt-0.5">
                          ★ Extractable Shadow: {gate.rewards.shadowExtractable}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enter Gate Button */}
                {!gate.cleared && (
                  <SystemButton
                    variant={gate.rank === 'S' ? 'red' : 'purple'}
                    size="md"
                    fullWidth
                    disabled={isLocked}
                    aria-label={isLocked ? `Gate locked: requires level ${gate.recommendedLevel}` : `Enter instant dungeon gate: ${gate.name}`}
                    onClick={() => handleEnterGate(gate)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4" aria-hidden="true" />
                    <span>[ ENTER INSTANT DUNGEON ]</span>
                  </SystemButton>
                )}
              </div>
            );
          })}
        </div>
      </SystemWindow>
    </div>
  );
};
