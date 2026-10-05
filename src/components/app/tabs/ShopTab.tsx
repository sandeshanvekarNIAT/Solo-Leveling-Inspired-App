'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { Coins, Sparkles, Palette, Shield, Music, Check } from 'lucide-react';
import { ShopItem } from '@/types/system';
import { SystemInfoToggle } from '@/components/ui/SystemInfoToggle';

export const ShopTab: React.FC = () => {
  const { shopItems, buyShopItem, player } = useSystem();
  const [filter, setFilter] = useState<'All' | 'Theme' | 'Frame' | 'Title' | 'Soundpack'>('All');

  const filteredItems = filter === 'All'
    ? shopItems
    : shopItems.filter((i) => i.category === filter);

  return (
    <div className="space-y-6">
      <SystemWindow
        title="SYSTEM ARMORY"
        subtitle="COSMETIC RECONFIG"
        icon={<Coins className="w-4 h-4 text-[#FFC94A]" />}
        variant="gold"
        headerRight={
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-[#FFC94A] rounded text-[#FFC94A] font-orbitron font-bold text-xs glow-text-gold">
            <Coins className="w-4 h-4" />
            <span className="tabular-nums">{player.gold} GOLD</span>
          </div>
        }
      >
        <div className="border-b border-white/10 pb-3 mb-5">
          <SystemInfoToggle
            info="[Cosmetic HUD overhauls, holographic frames, and vocal synthesizers. Earn gold solely through physical daily quest completions.]"
            title="ARMORY PROCUREMENT RULES"
            variant="gold"
            headerLabel={
              <div className="text-xs font-mono text-amber-300 uppercase tracking-wider">
                ARMORY REQUISITIONS
              </div>
            }
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Armory Category Filter">
          {(['All', 'Theme', 'Frame', 'Title', 'Soundpack'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs font-mono border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC94A] ${
                filter === cat
                  ? 'border-[#FFC94A] bg-[#FFC94A]/20 text-[#FFC94A] font-bold'
                  : 'border-white/10 text-slate-400 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded chamfer-sm transition-colors flex flex-col justify-between ${
                item.owned
                  ? 'border-[#38FF9A]/50 bg-[#02140a]/40'
                  : 'border-white/10 bg-black/60 hover:border-[#FFC94A]/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#FFC94A] uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.previewColor && (
                    <div
                      className="w-4 h-4 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: item.previewColor, color: item.previewColor }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h4 className="font-orbitron font-bold text-sm text-white mb-1">
                  {item.name}
                </h4>

                <p className="text-mono text-xs text-slate-400 mb-4 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between font-mono text-xs border-t border-white/10 pt-3 mb-3">
                  <span className="text-slate-400">PRICE:</span>
                  <span className="font-orbitron font-bold text-[#FFC94A] tabular-nums">
                    {item.price} GOLD
                  </span>
                </div>

                {item.owned ? (
                  <div className="py-2 text-center text-xs font-mono text-[#38FF9A] border border-[#38FF9A]/40 bg-[#38FF9A]/10 rounded flex items-center justify-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>[ EQUIPPED ]</span>
                  </div>
                ) : (
                  <SystemButton
                    variant="gold"
                    size="sm"
                    fullWidth
                    disabled={player.gold < item.price}
                    aria-label={player.gold < item.price ? `Insufficient gold to purchase ${item.name}` : `Purchase ${item.name} for ${item.price} gold`}
                    onClick={() => buyShopItem(item.id)}
                  >
                    [ PURCHASE ITEM ]
                  </SystemButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </SystemWindow>
    </div>
  );
};
