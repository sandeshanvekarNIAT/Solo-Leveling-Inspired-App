'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { RankBadge } from './RankBadge';
import { SystemButton } from './SystemButton';
import { Shield, QrCode, Copy, Check } from 'lucide-react';

export const HunterLicenseModal: React.FC = () => {
  const { player, setActiveModal } = useSystem();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `HUNTER ASSOCIATION IDENTIFICATION
NAME: ${player.name}
RANK: ${player.rank}
LEVEL: ${player.level}
JOB: ${player.job}
TITLE: ${player.title}
COMBAT POWER: ${player.combatPower} CP
STATS: STR ${player.stats.str} | AGI ${player.stats.agi} | VIT ${player.stats.vit} | INT ${player.stats.int} | PER ${player.stats.per}
ISSUED: ${player.awakenedAt}
[VERIFIED BY THE SYSTEM]`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hunter-license-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative max-w-md w-full">
        {/* Holographic ID Card */}
        <div
          className="relative bg-gradient-to-b from-[#06142e] via-[#040c1c] to-[#020612] border-2 border-[#1EA7FF] p-6 chamfer-lg shadow-[0_0_30px_rgba(30,167,255,0.4)] overflow-hidden"
        >
          {/* Holographic angled sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#7FD4FF]/10 to-transparent pointer-events-none" aria-hidden="true" />

          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#1EA7FF]/40 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1EA7FF]" aria-hidden="true" />
              <div className="leading-tight">
                <div className="text-[10px] font-mono tracking-widest text-[#7FD4FF]">
                  GLOBAL HUNTER ASSOCIATION
                </div>
                <h2 id="hunter-license-title" className="text-xs font-orbitron font-bold tracking-wider text-white">
                  AWAKENED HUNTER LICENSE
                </h2>
              </div>
            </div>
            <RankBadge rank={player.rank} size="md" />
          </div>

          {/* Hunter Details & Visual Avatar */}
          <div className="flex gap-4 items-center mb-5">
            {/* Holographic Portrait Avatar */}
            <div className="w-20 h-24 shrink-0 bg-black/80 border border-[#7FD4FF]/60 flex flex-col items-center justify-center relative overflow-hidden chamfer-sm">
              <div className="w-12 h-12 rounded-full border border-[#1EA7FF] bg-[#1EA7FF]/10 flex items-center justify-center text-xl font-bold font-orbitron text-[#1EA7FF] glow-text">
                {player.name.charAt(0)}
              </div>
              <span className="text-[9px] font-mono text-[#7FD4FF] mt-1 tabular-nums">LVL {player.level}</span>
              {/* Scanline line */}
              <div className="absolute inset-0 scanline-sweep bg-gradient-to-b from-transparent via-[#1EA7FF]/20 to-transparent pointer-events-none" aria-hidden="true" />
            </div>

            {/* Core Info */}
            <div className="flex-1 min-w-0 font-mono text-xs space-y-1">
              <div className="text-sm font-orbitron font-bold text-white tracking-wider truncate">
                {player.name}
              </div>
              <div className="text-[11px] text-[#7FD4FF] font-semibold">
                [{player.title}]
              </div>
              <div className="text-[10px] text-slate-400">
                JOB: <span className="text-slate-200">{player.job}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                COMBAT POWER: <span className="text-[#38FF9A] font-bold font-orbitron tabular-nums">{player.combatPower} CP</span>
              </div>
              <div className="text-[9px] text-slate-500">
                ID: {player.id.toUpperCase()}-7749
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-5 gap-1.5 p-2.5 bg-black/60 border border-white/10 rounded font-orbitron text-center mb-4 tabular-nums">
            <div>
              <div className="text-[9px] text-slate-400">STR</div>
              <div className="text-xs font-bold text-[#1EA7FF]">{player.stats.str}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400">AGI</div>
              <div className="text-xs font-bold text-[#1EA7FF]">{player.stats.agi}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400">VIT</div>
              <div className="text-xs font-bold text-[#1EA7FF]">{player.stats.vit}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400">INT</div>
              <div className="text-xs font-bold text-[#1EA7FF]">{player.stats.int}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-400">PER</div>
              <div className="text-xs font-bold text-[#1EA7FF]">{player.stats.per}</div>
            </div>
          </div>

          {/* Bottom Security Verification Stamp & QR */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px] text-slate-400">
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-[#7FD4FF]" aria-hidden="true" />
              <div>
                <div className="text-[#38FF9A] font-bold">[VERIFIED SOVEREIGN]</div>
                <div>SEC: 849-AK-920</div>
              </div>
            </div>
            <div className="text-right">
              <div>AUTH: SYSTEM ARCHITECT</div>
              <div>STATUS: ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 mt-4">
          <SystemButton
            variant="blue"
            fullWidth
            onClick={handleCopy}
            aria-label={copied ? "License details copied to clipboard" : "Copy license details to clipboard"}
            className="flex items-center justify-center gap-2"
          >
            <span aria-live="polite" className="flex items-center gap-2">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#38FF9A]" aria-hidden="true" />
                  <span>[ COPIED TO CLIPBOARD ]</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>[ SHARE LICENSE ]</span>
                </>
              )}
            </span>
          </SystemButton>
          <SystemButton
            variant="ghost"
            aria-label="Close license window"
            onClick={() => setActiveModal(null)}
          >
            [ CLOSE ]
          </SystemButton>
        </div>
      </div>
    </div>
  );
};
