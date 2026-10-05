'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface StatBarProps {
  label: string;
  current: number;
  max: number;
  type?: 'hp' | 'mp' | 'exp' | 'fatigue' | 'boss';
  showValues?: boolean;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  current,
  max,
  type = 'hp',
  showValues = true,
  className = '',
  height = 'md',
}) => {
  const percentage = Math.min(100, Math.max(0, (current / (max || 1)) * 100));

  const config = {
    hp: {
      barGradient: 'from-[#1EA7FF] to-[#E8F6FF]',
      glow: 'shadow-[0_0_10px_#1EA7FF]',
      headColor: 'bg-white shadow-[0_0_12px_#ffffff]',
      border: 'border-[#1EA7FF]/70',
      labelColor: 'text-[#7FD4FF]',
    },
    mp: {
      barGradient: 'from-[#1EA7FF] via-[#5E60FF] to-[#8B2CFF]',
      glow: 'shadow-[0_0_10px_#5E60FF]',
      headColor: 'bg-[#D43BFF] shadow-[0_0_12px_#D43BFF]',
      border: 'border-[#5E60FF]/70',
      labelColor: 'text-[#B495FF]',
    },
    exp: {
      barGradient: 'from-[#1EA7FF] via-[#38FF9A] to-[#E8F6FF]',
      glow: 'shadow-[0_0_12px_rgba(56,255,154,0.6)]',
      headColor: 'bg-white shadow-[0_0_14px_#38FF9A]',
      border: 'border-[#38FF9A]/70',
      labelColor: 'text-[#38FF9A]',
    },
    fatigue: {
      barGradient: 'from-[#FFC94A] to-[#FF2D4B]',
      glow: 'shadow-[0_0_10px_#FF2D4B]',
      headColor: 'bg-[#FF2D4B] shadow-[0_0_12px_#FF2D4B]',
      border: 'border-[#FFC94A]/70',
      labelColor: 'text-[#FFC94A]',
    },
    boss: {
      barGradient: 'from-[#8B2CFF] via-[#FF2D4B] to-[#FF7A8E]',
      glow: 'shadow-[0_0_14px_#FF2D4B]',
      headColor: 'bg-white shadow-[0_0_16px_#FF2D4B]',
      border: 'border-[#FF2D4B]',
      labelColor: 'text-[#FF2D4B]',
    },
  }[type];

  const heightClass = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5',
  }[height];

  return (
    <div className={`w-full ${className}`}>
      {/* Label and numbers header */}
      <div className="flex items-center justify-between text-xs font-orbitron mb-1">
        <span className={`font-semibold tracking-[0.16em] uppercase ${config.labelColor}`}>
          {label}
        </span>
        {showValues && (
          <span className="font-mono tabular-nums text-slate-300 tracking-wider text-[11px]">
            <span className="text-white font-bold">{Math.round(current)}</span>
            <span className="opacity-50"> / </span>
            <span>{max}</span>
            <span className="text-[10px] text-slate-400 ml-1.5">
              ({percentage.toFixed(0)}%)
            </span>
          </span>
        )}
      </div>

      {/* Pill-shaped Bar track */}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(current)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${label}: ${Math.round(current)} of ${max} (${percentage.toFixed(0)}%)`}
        className={`w-full ${heightClass} rounded-full bg-black/80 border ${config.border} p-[1.5px] overflow-hidden relative shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]`}
      >
        {/* Animated Fill Bar */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${config.barGradient} ${config.glow} relative flex items-center justify-end`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Bright leading head */}
          {percentage > 1 && (
            <div
              className={`w-2 h-full rounded-full ${config.headColor} animate-pulse`}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
