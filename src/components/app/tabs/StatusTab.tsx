'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { StatBar } from '@/components/ui/StatBar';
import { RankBadge } from '@/components/ui/RankBadge';
import { 
  Crown, 
  Sparkles, 
  CreditCard, 
  TrendingUp, 
  ChevronRight
} from 'lucide-react';
import { PlayerStats } from '@/types/system';

export const StatusTab: React.FC = () => {
  const { player, allocatePoint, setActiveModal, triggerLevelUp, triggerRankUp } = useSystem();
  const [selectedStatHistory, setSelectedStatHistory] = useState<keyof PlayerStats>('str');

  // Stat history mock data points for neon chart
  const historyPoints = [
    { day: 'Mon', str: 8, agi: 8, vit: 8, int: 9, per: 9 },
    { day: 'Tue', str: 8, agi: 9, vit: 8, int: 9, per: 10 },
    { day: 'Wed', str: 9, agi: 9, vit: 9, int: 10, per: 10 },
    { day: 'Thu', str: 9, agi: 10, vit: 9, int: 10, per: 10 },
    { day: 'Fri', str: 10, agi: 10, vit: 10, int: 10, per: 10 },
    { day: 'Sat', str: player.stats.str, agi: player.stats.agi, vit: player.stats.vit, int: player.stats.int, per: player.stats.per },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Main Status Window */}
      <SystemWindow
        title="HUNTER STATUS"
        subtitle={`LVL ${player.level} • ${player.rank}-RANK`}
        icon={<Crown className="w-4 h-4 text-[#1EA7FF]" />}
        variant={player.rank === 'S' || player.rank === 'National' ? 'purple' : 'blue'}
        headerRight={
          <div className="flex items-center gap-2">
            <SystemButton
              variant="ghost"
              size="sm"
              onClick={triggerLevelUp}
              className="text-[11px] hidden sm:inline-flex"
            >
              [ +LVL UP ]
            </SystemButton>
            <SystemButton
              variant="blue"
              size="sm"
              aria-label="View Awakened Hunter License"
              onClick={() => setActiveModal('license')}
              className="flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
              <span>[ LICENSE ]</span>
            </SystemButton>
          </div>
        }
      >
        {/* Hunter Identity Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3.5">
            <RankBadge rank={player.rank} size="lg" />
            <div>
              <div className="font-orbitron font-extrabold text-lg sm:text-xl text-white tracking-wider">
                {player.name}
              </div>
              <div className="text-xs font-mono text-[#7FD4FF] font-semibold">
                [{player.title}]
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                JOB: <span className="text-white">{player.job}</span>
              </div>
            </div>
          </div>

          {/* Combat Power & Shadows Count */}
          <div className="flex gap-2.5">
            <div className="px-3.5 py-2.5 bg-black/50 border border-[#38FF9A]/30 rounded text-right">
              <div className="text-[9px] font-mono text-slate-400 uppercase">COMBAT POWER</div>
              <div className="font-orbitron font-extrabold text-sm sm:text-base text-[#38FF9A] tabular-nums">
                {player.combatPower} CP
              </div>
            </div>
            <div className="px-3.5 py-2.5 bg-black/50 border border-[#8B2CFF]/30 rounded text-right">
              <div className="text-[9px] font-mono text-slate-400 uppercase">SHADOW LEGION</div>
              <div className="font-orbitron font-extrabold text-sm sm:text-base text-[#D43BFF] tabular-nums">
                {player.shadowCount} UNITS
              </div>
            </div>
          </div>
        </div>

        {/* Vital Resource Gauges (HP, MP, Fatigue, EXP) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatBar label="HP" current={player.hp} max={player.maxHp} type="hp" height="sm" />
          <StatBar label="MP" current={player.mp} max={player.maxMp} type="mp" height="sm" />
          <StatBar label="FATIGUE" current={player.fatigue} max={player.maxFatigue} type="fatigue" height="sm" />
          <StatBar label="NEXT LEVEL EXP" current={player.exp} max={player.maxExp} type="exp" height="sm" />
        </div>

        {/* Available Ability Points Banner */}
        <div className="flex items-center justify-between p-3 bg-black/40 border border-[#1EA7FF]/30 rounded mb-5 font-orbitron">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1EA7FF]" aria-hidden="true" />
            <span className="text-xs text-white tracking-wider">
              UNALLOCATED ABILITY POINTS:
            </span>
          </div>
          <span className={`font-extrabold text-sm tabular-nums ${player.availablePoints > 0 ? 'text-[#38FF9A] animate-pulse' : 'text-slate-500'}`}>
            {player.availablePoints} POINTS
          </span>
        </div>

        {/* 5 Core Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 font-orbitron">
          {[
            { key: 'str', label: 'STR', name: 'Strength', desc: 'Power output' },
            { key: 'agi', label: 'AGI', name: 'Agility', desc: 'Speed & mobility' },
            { key: 'vit', label: 'VIT', name: 'Vitality', desc: 'Tissue recovery' },
            { key: 'int', label: 'INT', name: 'Intelligence', desc: 'Discipline & MP' },
            { key: 'per', label: 'PER', name: 'Perception', desc: 'Body awareness' },
          ].map((st) => (
            <div
              key={st.key}
              className="p-3 bg-black/40 border border-white/5 hover:border-[#1EA7FF]/40 rounded flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="text-[10px] text-slate-400 font-mono">{st.name}</div>
                <div className="font-extrabold text-xl text-white my-1 tabular-nums">
                  {player.stats[st.key as keyof PlayerStats]}
                </div>
                <div className="text-[9px] font-mono text-slate-500 truncate">{st.desc}</div>
              </div>

              <button
                type="button"
                disabled={player.availablePoints <= 0}
                aria-label={`Allocate 1 ability point to ${st.name}`}
                onClick={() => allocatePoint(st.key as keyof PlayerStats)}
                className={`mt-3 py-1.5 w-full flex items-center justify-center font-bold text-xs border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A] ${
                  player.availablePoints > 0
                    ? 'border-[#38FF9A] bg-[#38FF9A]/20 text-[#38FF9A] hover:bg-[#38FF9A] hover:text-black shadow-[0_0_8px_#38FF9A]'
                    : 'border-slate-800 text-slate-700 cursor-not-allowed'
                }`}
              >
                +1 POINT
              </button>
            </div>
          ))}
        </div>
      </SystemWindow>

      {/* Neon Stat Progression Chart */}
      <SystemWindow
        title="STAT HISTOGRAM & PROGRESSION"
        subtitle="BIOMETRIC RADAR"
        icon={<TrendingUp className="w-4 h-4 text-[#38FF9A]" aria-hidden="true" />}
        variant="blue"
      >
        <div className="flex items-center justify-between gap-2 mb-5 font-mono text-xs">
          <span className="text-slate-400 text-[11px]">METRIC:</span>
          <div className="flex gap-1.5">
            {(['str', 'agi', 'vit', 'int', 'per'] as (keyof PlayerStats)[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={selectedStatHistory === key}
                onClick={() => setSelectedStatHistory(key)}
                className={`px-2.5 py-1 uppercase text-[10px] font-orbitron border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
                  selectedStatHistory === key
                    ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 text-white font-bold'
                    : 'border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Neon Bar Graph */}
        <div className="h-40 flex items-end justify-between gap-2 pt-6 pb-2 px-3 border-b border-l border-white/10 bg-black/40 rounded">
          {historyPoints.map((pt, i) => {
            const val = pt[selectedStatHistory];
            const heightPercent = Math.min(100, Math.max(20, (val / 15) * 100));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-mono text-[#38FF9A] opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </span>
                <div
                  className="w-full max-w-[28px] bg-gradient-to-t from-[#1EA7FF]/30 to-[#1EA7FF] border-t-2 border-[#E8F6FF] rounded-t shadow-[0_0_8px_rgba(30,167,255,0.4)] transition-all duration-300"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  {pt.day}
                </span>
              </div>
            );
          })}
        </div>
      </SystemWindow>
    </div>
  );
};
