'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { StatBar } from '@/components/ui/StatBar';
import { RankBadge } from '@/components/ui/RankBadge';
import { Users, Swords, Shield, Trophy, Flame } from 'lucide-react';

export const GuildTab: React.FC = () => {
  const { leaderboard, player } = useSystem();

  return (
    <div className="space-y-6">
      {/* Global Guild Raid Window */}
      <SystemWindow
        title="GUILD SYNDICATE RAID"
        subtitle="SECTOR 04 RAID BOSS"
        icon={<Flame className="w-4 h-4 text-[#FF2D4B]" />}
        variant="red"
      >
        <div className="border-b border-white/10 pb-3 mb-4 font-mono text-xs text-red-200">
          <p>
            [WORLD EVENT: The Dread Abyssal Drake has spawned. All Hunter Guilds are combining daily workout calories to deplete its dimensional barrier.]
          </p>
        </div>

        <div className="p-4 bg-black/70 border border-red-900 rounded mb-4">
          <StatBar
            label="COLLECTIVE BARRIER INTEGRITY"
            current={452000}
            max={1000000}
            type="boss"
            height="lg"
          />
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 tabular-nums">
            <span>RAID PARTICIPANTS: 14,820 HUNTERS</span>
            <span className="text-[#38FF9A]">TIME REMAINING: 4D 12H</span>
          </div>
        </div>

        {/* Rival Matchup Card */}
        <div className="p-4 border border-[#1EA7FF]/40 bg-[#040c1c] rounded chamfer-sm mb-4">
          <div className="text-[10px] font-mono text-[#7FD4FF] uppercase tracking-wider mb-2">
            WEEKLY RIVAL MATCHUP
          </div>
          <div className="flex items-center justify-between gap-4 font-orbitron text-xs">
            <div className="text-left">
              <div className="font-bold text-white">KAIEN JIN (YOU)</div>
              <div className="text-slate-400 text-[10px] font-mono tabular-nums">STREAK: {player.streakDays} DAYS</div>
            </div>
            <div className="text-[#FF2D4B] font-bold text-sm" aria-hidden="true">VS</div>
            <div className="text-right">
              <div className="font-bold text-slate-300">HUNTER_VALKYRIE</div>
              <div className="text-slate-400 text-[10px] font-mono tabular-nums">STREAK: 5 DAYS</div>
            </div>
          </div>
        </div>
      </SystemWindow>

      {/* Guild Roster & Weekly Standings */}
      <SystemWindow
        title="HUNTER GUILD ROSTER"
        subtitle="RANKED STANDINGS"
        icon={<Users className="w-4 h-4 text-[#1EA7FF]" aria-hidden="true" />}
        variant="blue"
      >
        <div className="space-y-2 font-mono text-xs">
          {leaderboard.map((hunter, idx) => (
            <div
              key={hunter.id}
              className={`p-3 border rounded flex items-center justify-between transition-colors ${
                hunter.name.includes('YOU')
                  ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 text-white font-bold'
                  : 'border-white/10 bg-black/40 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-orbitron text-xs text-slate-400 w-6 tabular-nums">
                  #{idx + 1}
                </span>
                <RankBadge rank={hunter.rank} size="sm" />
                <div>
                  <div className="font-orbitron text-white text-xs">{hunter.name}</div>
                  <div className="text-[10px] text-slate-400">
                    CLASS: {hunter.job} • GUILD: {hunter.guild}
                  </div>
                </div>
              </div>

              <div className="text-right tabular-nums">
                <div className="font-orbitron font-bold text-[#38FF9A]">
                  {hunter.combatPower.toLocaleString()} CP
                </div>
                <div className="text-[9px] text-slate-500">LVL {hunter.level}</div>
              </div>
            </div>
          ))}
        </div>
      </SystemWindow>
    </div>
  );
};
