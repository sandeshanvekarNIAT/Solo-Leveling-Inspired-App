'use client';

import React from 'react';
import { HunterRank } from '@/types/system';

interface RankBadgeProps {
  rank: HunterRank;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
}

export const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = 'md',
  showLabel = false,
  className = '',
  onClick,
}) => {
  const rankConfigs: Record<
    HunterRank,
    {
      label: string;
      color: string;
      border: string;
      bg: string;
      glow: string;
      textColor: string;
    }
  > = {
    E: {
      label: 'E-Rank',
      color: '#1EA7FF',
      border: 'border-[#1EA7FF]',
      bg: 'bg-[#1EA7FF]/15',
      glow: 'shadow-[0_0_10px_rgba(30,167,255,0.5)]',
      textColor: 'text-[#1EA7FF]',
    },
    D: {
      label: 'D-Rank',
      color: '#3BA0FF',
      border: 'border-[#3BA0FF]',
      bg: 'bg-[#3BA0FF]/15',
      glow: 'shadow-[0_0_10px_rgba(59,160,255,0.5)]',
      textColor: 'text-[#3BA0FF]',
    },
    C: {
      label: 'C-Rank',
      color: '#5599FF',
      border: 'border-[#5599FF]',
      bg: 'bg-[#5599FF]/15',
      glow: 'shadow-[0_0_12px_rgba(85,153,255,0.6)]',
      textColor: 'text-[#5599FF]',
    },
    B: {
      label: 'B-Rank',
      color: '#5E60FF',
      border: 'border-[#5E60FF]',
      bg: 'bg-[#5E60FF]/20',
      glow: 'shadow-[0_0_14px_rgba(94,96,255,0.7)]',
      textColor: 'text-[#5E60FF]',
    },
    A: {
      label: 'A-Rank',
      color: '#8B2CFF',
      border: 'border-[#8B2CFF]',
      bg: 'bg-[#8B2CFF]/20',
      glow: 'shadow-[0_0_16px_rgba(139,44,255,0.75)]',
      textColor: 'text-[#B865FF]',
    },
    S: {
      label: 'S-Rank',
      color: '#D43BFF',
      border: 'border-[#D43BFF]',
      bg: 'bg-[#D43BFF]/25',
      glow: 'shadow-[0_0_20px_rgba(212,59,255,0.9)] animate-pulse',
      textColor: 'text-[#F1A2FF]',
    },
    National: {
      label: 'National Level',
      color: '#FF2D4B',
      border: 'border-[#FF2D4B]',
      bg: 'bg-gradient-to-br from-[#8B2CFF]/40 to-[#FF2D4B]/40',
      glow: 'shadow-[0_0_25px_rgba(255,45,75,0.9)] animate-pulse',
      textColor: 'text-white',
    },
  };

  const currentConfig = rankConfigs[rank] || rankConfigs['E'];

  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-16 h-16 text-xl font-bold',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 select-none ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      } ${className}`}
    >
      <div
        className={`relative flex items-center justify-center font-orbitron font-extrabold border-2 ${currentConfig.border} ${currentConfig.bg} ${currentConfig.glow} ${currentConfig.textColor} ${sizeClasses}`}
        style={{
          clipPath:
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      >
        <span className="relative z-10">{rank === 'National' ? 'NAT' : rank}</span>
      </div>

      {showLabel && (
        <span
          className={`font-orbitron font-semibold tracking-widest text-xs uppercase ${currentConfig.textColor}`}
        >
          {currentConfig.label}
        </span>
      )}
    </div>
  );
};
