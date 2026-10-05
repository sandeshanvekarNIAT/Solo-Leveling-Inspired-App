'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { 
  Sparkles, 
  FlaskConical, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  Flame, 
  Droplets, 
  Zap, 
  Crown,
  Activity
} from 'lucide-react';
import { CraftItem } from '@/types/system';
import { soundManager } from '@/lib/sound';
import { SystemInfoToggle } from '@/components/ui/SystemInfoToggle';

export const CraftTab: React.FC = () => {
  const { craftItems, craftItem, player } = useSystem();
  const [selectedItem, setSelectedItem] = useState<CraftItem>(craftItems[0]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleCraft = (item: CraftItem) => {
    setIsSynthesizing(true);
    soundManager.playBassRumble();

    setTimeout(() => {
      soundManager.playLevelUp();
      craftItem(item.id);
      setIsSynthesizing(false);
    }, 1200);
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-[#FFC94A] border-[#FFC94A] bg-[#FFC94A]/15 shadow-[0_0_8px_#FFC94A]';
      case 'Epic':
        return 'text-[#D43BFF] border-[#D43BFF] bg-[#8B2CFF]/20 shadow-[0_0_8px_#D43BFF]';
      case 'Rare':
        return 'text-[#1EA7FF] border-[#1EA7FF] bg-[#1EA7FF]/20 shadow-[0_0_8px_#1EA7FF]';
      default:
        return 'text-[#38FF9A] border-[#38FF9A] bg-[#38FF9A]/15';
    }
  };

  return (
    <div className="space-y-6">
      <SystemWindow
        title="SYSTEM ALCHEMY"
        subtitle="RUNE SYNTHESIS"
        icon={<FlaskConical className="w-4 h-4 text-[#1EA7FF]" />}
        variant="blue"
      >
        <div className="border-b border-white/10 pb-3 mb-6">
          <SystemInfoToggle
            info="[Combine elemental willpower shards harvested from completed quests to synthesize consumable recovery artifacts.]"
            title="ALCHEMY SYNTHESIS DIRECTIVE"
            variant="blue"
            headerLabel={
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SYNTHESIS MATRIX
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Recipe List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
              SELECTABLE RECIPES
            </div>
            {craftItems.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-pressed={selectedItem.id === item.id}
                aria-label={`Select recipe: ${item.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                onClick={() => setSelectedItem(item)}
                className={`p-3.5 border rounded cursor-pointer transition-colors chamfer-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
                  selectedItem.id === item.id
                    ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 shadow-[0_0_12px_rgba(30,167,255,0.3)]'
                    : 'border-white/10 bg-black/40 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-orbitron font-bold text-sm text-white">
                    {item.name}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 border rounded ${getRarityBadge(
                      item.rarity
                    )}`}
                  >
                    {item.rarity}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Signature 3-Node Circular Alchemy Rune Layout */}
          <div className="lg:col-span-7 bg-black/70 border border-white/10 p-6 rounded-lg chamfer-md relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[360px]">
            {/* Ambient Alchemy Rune Circle in Background */}
            <div className="w-64 h-64 rounded-full border border-[#1EA7FF]/25 border-dashed absolute animate-[spin_40s_linear_infinite] motion-reduce:animate-none pointer-events-none" aria-hidden="true" />
            <div className="w-48 h-48 rounded-full border border-[#8B2CFF]/25 absolute pointer-events-none" aria-hidden="true" />

            {/* Central Target Item Silhouette */}
            <div
              className={`w-24 h-24 rounded-full border-2 border-[#1EA7FF] bg-black/90 flex flex-col items-center justify-center relative z-20 shadow-[0_0_25px_rgba(30,167,255,0.4)] my-12 transition-transform ${
                isSynthesizing ? 'scale-125 animate-pulse' : ''
              }`}
            >
              <FlaskConical className="w-8 h-8 text-[#1EA7FF] animate-pulse" aria-hidden="true" />
              <span className="text-[9px] font-mono text-slate-300 mt-1">SYNTHESIZE</span>
            </div>

            {/* 3 Converging Ingredient Nodes arranged in a triangle around center */}
            {selectedItem.ingredients.map((ing, idx) => {
              // Angles: top (270 deg), bottom-left (150 deg), bottom-right (30 deg)
              const positions = [
                'top-4 left-1/2 -translate-x-1/2',
                'bottom-6 left-6',
                'bottom-6 right-6',
              ];

              return (
                <div
                  key={ing.id}
                  className={`absolute ${positions[idx]} z-20 p-2.5 bg-[#040c1c] border border-[#7FD4FF]/60 rounded-lg shadow-[0_0_12px_rgba(127,212,255,0.3)] font-mono text-xs w-28 text-center transition-all ${
                    isSynthesizing ? 'scale-90 opacity-60' : ''
                  }`}
                >
                  <div className="text-[10px] text-[#7FD4FF] truncate font-semibold">
                    {ing.name}
                  </div>
                  <div className="font-orbitron font-bold text-white text-xs mt-0.5 tabular-nums">
                    {ing.count} / {ing.required}
                  </div>
                </div>
              );
            })}

            {/* Craft Button */}
            <div className="w-full mt-4 z-20">
              <SystemButton
                variant="blue"
                size="md"
                fullWidth
                disabled={!selectedItem.readyToCraft || isSynthesizing}
                aria-label={
                  isSynthesizing
                    ? 'Synthesizing rune…'
                    : selectedItem.readyToCraft
                    ? `Craft ${selectedItem.name}`
                    : 'Insufficient willpower shards'
                }
                onClick={() => handleCraft(selectedItem)}
              >
                {isSynthesizing
                  ? '[ SYNTHESIZING RUNE… ]'
                  : selectedItem.readyToCraft
                  ? `[ CRAFT ${selectedItem.name.toUpperCase()} ]`
                  : '[ INSUFFICIENT WILLPOWER SHARDS ]'}
              </SystemButton>
            </div>
          </div>
        </div>
      </SystemWindow>
    </div>
  );
};
