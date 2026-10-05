'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { RankBadge } from '@/components/ui/RankBadge';
import { 
  Sparkles, 
  Eye, 
  Flame, 
  Activity, 
  Moon, 
  Droplet, 
  Shield, 
  Brain,
  Swords 
} from 'lucide-react';
import { ShadowSoldier } from '@/types/system';

export const ShadowArmyTab: React.FC = () => {
  const { shadowArmy, extractShadow, selectedShadow, setSelectedShadow } = useSystem();
  const [extractingId, setExtractingId] = useState<string | null>(null);

  const handleExtract = (id: string) => {
    setExtractingId(id);
    extractShadow(id);
    setTimeout(() => setExtractingId(null), 1500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'speed':
        return <Activity className="w-5 h-5 text-[#38FF9A]" />;
      case 'sleep':
        return <Moon className="w-5 h-5 text-[#7FD4FF]" />;
      case 'water':
        return <Droplet className="w-5 h-5 text-[#1EA7FF]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#FFC94A]" />;
      case 'mind':
        return <Brain className="w-5 h-5 text-[#D43BFF]" />;
      default:
        return <Swords className="w-5 h-5 text-[#8B2CFF]" />;
    }
  };

  return (
    <div className="space-y-6">
      <SystemWindow
        title="SHADOW ARMY CORPS"
        subtitle="SOVEREIGN LEGION"
        icon={<Sparkles className="w-4 h-4 text-[#D43BFF]" />}
        variant="purple"
      >
        <div className="border-b border-white/10 pb-3 mb-5 font-mono text-xs text-purple-200">
          <p className="leading-relaxed">
            [The Shadow Extraction protocol manifests completed habitual discipline into eternal supernatural soldiers. Each unbroken habit adds permanent combat power to your aura.]
          </p>
        </div>

        {/* Soldiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shadowArmy.map((soldier) => {
            const isExtracting = extractingId === soldier.id;

            return (
              <div
                key={soldier.id}
                role="button"
                tabIndex={0}
                aria-label={`View shadow soldier details for ${soldier.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedShadow(soldier);
                  }
                }}
                onClick={() => setSelectedShadow(soldier)}
                className={`p-4 border rounded chamfer-md transition-colors cursor-pointer relative overflow-hidden flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2CFF] ${
                  soldier.unlocked
                    ? 'border-[#8B2CFF] bg-[#07051a] hover:border-[#D43BFF] shadow-[0_0_15px_rgba(139,44,255,0.25)]'
                    : 'border-white/10 bg-black/70 opacity-60 hover:opacity-90'
                } ${isExtracting ? 'animate-glitch-shake bg-[#8B2CFF]/40' : ''}`}
              >
                {/* Silhouette Avatar with Glowing Purple Eyes */}
                <div className="relative w-full h-32 bg-black/90 border border-white/10 rounded mb-3 flex items-center justify-center overflow-hidden">
                  {/* Subtle dark fog wisp */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B2CFF]/20 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

                  {/* Silhouette Figure */}
                  <div className="relative flex flex-col items-center" aria-hidden="true">
                    <div className="w-12 h-14 bg-[#140b2e] rounded-t-full border border-[#8B2CFF]/40 relative flex items-center justify-center">
                      {/* Glowing Purple Eyes */}
                      <div className="flex gap-2.5 mb-1">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            soldier.unlocked
                              ? 'bg-[#D43BFF] shadow-[0_0_8px_#D43BFF] animate-pulse'
                              : 'bg-slate-700'
                          }`}
                        />
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            soldier.unlocked
                              ? 'bg-[#D43BFF] shadow-[0_0_8px_#D43BFF] animate-pulse'
                              : 'bg-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="w-16 h-8 bg-[#140b2e] rounded-t-lg border-t border-[#8B2CFF]/30" />
                  </div>

                  {/* Corner Icon & Rank */}
                  <div className="absolute top-2 left-2 p-1 bg-black/60 rounded" aria-hidden="true">
                    {getIcon(soldier.iconType)}
                  </div>
                  <div className="absolute top-2 right-2">
                    <RankBadge rank={soldier.rank} size="sm" />
                  </div>
                </div>

                {/* Soldier Info */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-orbitron font-bold text-sm text-white tracking-wider">
                      {soldier.name}
                    </h4>
                    <span className="font-orbitron text-xs text-[#38FF9A] font-bold tabular-nums">
                      +{soldier.power} CP
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#D43BFF] font-semibold mb-2">
                    {soldier.title}
                  </div>

                  <div className="p-2 bg-black/60 border border-white/5 rounded text-[10px] font-mono text-slate-300 mb-3">
                    <div>HABIT: {soldier.habit}</div>
                    <div className="text-slate-400 mt-0.5">
                      STREAK: <span className="text-white font-bold tabular-nums">{soldier.streak} DAYS</span>
                    </div>
                  </div>
                </div>

                {/* Extraction action */}
                {!soldier.unlocked ? (
                  <SystemButton
                    variant="purple"
                    size="sm"
                    fullWidth
                    aria-label={`Extract shadow soldier ${soldier.name}: Arise`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExtract(soldier.id);
                    }}
                  >
                    [ EXTRACT: ARISE ]
                  </SystemButton>
                ) : (
                  <div className="text-center font-mono text-[10px] text-[#38FF9A] py-1 border border-[#38FF9A]/30 bg-[#38FF9A]/5 rounded">
                    ACTIVE IN SOVEREIGN LEGION
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SystemWindow>

      {/* Selected Soldier Detail Modal */}
      {selectedShadow && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shadow-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        >
          <div className="max-w-md w-full">
            <SystemWindow
              title={selectedShadow.name}
              subtitle={selectedShadow.title}
              onClose={() => setSelectedShadow(null)}
              variant="purple"
            >
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-black/60 border border-[#8B2CFF]/40 rounded italic text-purple-200 text-center text-sm">
                  {selectedShadow.quote}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <div className="text-[10px] text-slate-400 uppercase">BINDING HABIT</div>
                    <div className="font-bold text-white mt-1">{selectedShadow.habit}</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded">
                    <div className="text-[10px] text-slate-400 uppercase">COMBAT POWER</div>
                    <div className="font-bold text-[#38FF9A] mt-1">+{selectedShadow.power} CP</div>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-white/10">
                  <SystemButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedShadow(null)}
                  >
                    [ DISMISS ]
                  </SystemButton>
                </div>
              </div>
            </SystemWindow>
          </div>
        </div>
      )}
    </div>
  );
};
