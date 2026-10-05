'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { soundManager } from '@/lib/sound';

export interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'blue' | 'purple' | 'red' | 'green' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  pulsing?: boolean;
}

export const SystemButton: React.FC<SystemButtonProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  fullWidth = false,
  pulsing = false,
  disabled,
  className = '',
  onClick,
  onMouseEnter,
  ...props
}) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      soundManager.playTick();
    }
    onMouseEnter?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      soundManager.playTick();
    }
    onClick?.(e);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs tracking-[0.14em]',
    md: 'px-5 py-2.5 text-xs sm:text-sm tracking-[0.18em]',
    lg: 'px-7 py-3.5 text-sm sm:text-base tracking-[0.2em]',
  }[size];

  const variantMap = {
    blue: {
      border: 'border-[#1EA7FF]',
      glow: 'shadow-[0_0_12px_rgba(30,167,255,0.4)] hover:shadow-[0_0_22px_rgba(30,167,255,0.8)]',
      textColor: 'text-[#E8F6FF] group-hover:text-white',
      sweepBg: 'bg-gradient-to-r from-[#1EA7FF]/20 via-[#1EA7FF]/40 to-[#1EA7FF]/60',
      activeFlash: 'active:bg-[#1EA7FF]/80',
      ringColor: 'focus-visible:ring-[#1EA7FF]',
    },
    purple: {
      border: 'border-[#8B2CFF]',
      glow: 'shadow-[0_0_14px_rgba(139,44,255,0.5)] hover:shadow-[0_0_25px_rgba(139,44,255,0.9)]',
      textColor: 'text-[#E8F6FF] group-hover:text-white',
      sweepBg: 'bg-gradient-to-r from-[#8B2CFF]/20 via-[#8B2CFF]/45 to-[#D43BFF]/60',
      activeFlash: 'active:bg-[#8B2CFF]/80',
      ringColor: 'focus-visible:ring-[#8B2CFF]',
    },
    red: {
      border: 'border-[#FF2D4B]',
      glow: 'shadow-[0_0_14px_rgba(255,45,75,0.5)] hover:shadow-[0_0_25px_rgba(255,45,75,0.9)]',
      textColor: 'text-white',
      sweepBg: 'bg-gradient-to-r from-[#FF2D4B]/20 via-[#FF2D4B]/40 to-[#FF2D4B]/60',
      activeFlash: 'active:bg-[#FF2D4B]/80',
      ringColor: 'focus-visible:ring-[#FF2D4B]',
    },
    green: {
      border: 'border-[#38FF9A]',
      glow: 'shadow-[0_0_12px_rgba(56,255,154,0.4)] hover:shadow-[0_0_22px_rgba(56,255,154,0.8)]',
      textColor: 'text-[#38FF9A] group-hover:text-black',
      sweepBg: 'bg-gradient-to-r from-[#38FF9A]/20 via-[#38FF9A]/60 to-[#38FF9A]',
      activeFlash: 'active:bg-[#38FF9A]',
      ringColor: 'focus-visible:ring-[#38FF9A]',
    },
    gold: {
      border: 'border-[#FFC94A]',
      glow: 'shadow-[0_0_12px_rgba(255,201,74,0.4)] hover:shadow-[0_0_22px_rgba(255,201,74,0.8)]',
      textColor: 'text-[#FFC94A] group-hover:text-black',
      sweepBg: 'bg-gradient-to-r from-[#FFC94A]/20 via-[#FFC94A]/60 to-[#FFC94A]',
      activeFlash: 'active:bg-[#FFC94A]',
      ringColor: 'focus-visible:ring-[#FFC94A]',
    },
    ghost: {
      border: 'border-white/20',
      glow: 'hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]',
      textColor: 'text-slate-300 hover:text-white',
      sweepBg: 'bg-white/10',
      activeFlash: 'active:bg-white/20',
      ringColor: 'focus-visible:ring-white/80',
    },
  }[variant];

  return (
    <button
      {...props}
      type={props.type || 'button'}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`group relative overflow-hidden font-orbitron uppercase font-semibold whitespace-nowrap transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 ${variantMap.ringColor} focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040A] ${
        fullWidth ? 'w-full' : 'inline-flex'
      } items-center justify-center ${sizeClasses} ${
        disabled
          ? 'opacity-40 cursor-not-allowed border border-dashed border-slate-600 text-slate-500 bg-transparent'
          : `border ${variantMap.border} ${variantMap.glow} bg-black/60 backdrop-blur-sm ${variantMap.textColor} ${variantMap.activeFlash} cursor-pointer`
      } ${pulsing ? 'animate-pulse' : ''} ${className}`}
      style={{
        clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
      }}
    >
      {/* Background sweep fill on hover */}
      {!disabled && (
        <span
          className={`absolute inset-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none ${variantMap.sweepBg}`}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Corner notch accents */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/60 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/60 pointer-events-none" />
    </button>
  );
};
