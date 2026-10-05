'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface SystemWindowProps {
  title: string;
  subtitle?: string;
  icon?: string | ReactNode;
  variant?: 'blue' | 'purple' | 'red' | 'green' | 'gold';
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  headerRight?: ReactNode;
  cornerCut?: 'sm' | 'md' | 'lg';
  showScanline?: boolean;
  showFooterStatus?: boolean;
}

export const SystemWindow: React.FC<SystemWindowProps> = ({
  title,
  subtitle,
  icon = '!',
  variant = 'blue',
  children,
  className = '',
  onClose,
  headerRight,
  cornerCut = 'md',
  showScanline = false,
  showFooterStatus = false,
}) => {
  // Theme styling based on variant
  const themeMap = {
    blue: {
      border: 'border-[#1EA7FF]/80',
      borderSoft: 'border-[#7FD4FF]/40',
      bgGlow: 'shadow-[0_0_20px_rgba(30,167,255,0.25)]',
      textGlow: 'glow-text text-[#7FD4FF]',
      titleColor: 'text-[#1EA7FF]',
      conduitColor: 'bg-[#1EA7FF]',
      conduitGlow: 'shadow-[0_0_8px_#1EA7FF]',
      headerPlate: 'bg-[#1EA7FF]/10 border-[#1EA7FF]/60',
      iconBox: 'border-[#1EA7FF] text-[#1EA7FF] bg-[#1EA7FF]/15',
      innerBorder: 'border-[#7FD4FF]/20',
      sweepGradient: 'from-transparent via-[#1EA7FF]/15 to-transparent',
    },
    purple: {
      border: 'border-[#8B2CFF]/80',
      borderSoft: 'border-[#D43BFF]/40',
      bgGlow: 'shadow-[0_0_22px_rgba(139,44,255,0.25)]',
      textGlow: 'glow-text-purple text-[#D43BFF]',
      titleColor: 'text-[#D43BFF]',
      conduitColor: 'bg-[#D43BFF]',
      conduitGlow: 'shadow-[0_0_8px_#D43BFF]',
      headerPlate: 'bg-[#8B2CFF]/15 border-[#8B2CFF]/60',
      iconBox: 'border-[#D43BFF] text-[#D43BFF] bg-[#8B2CFF]/20',
      innerBorder: 'border-[#D43BFF]/25',
      sweepGradient: 'from-transparent via-[#8B2CFF]/20 to-transparent',
    },
    red: {
      border: 'border-[#FF2D4B]/90',
      borderSoft: 'border-[#FF7A8E]/40',
      bgGlow: 'shadow-[0_0_25px_rgba(255,45,75,0.3)]',
      textGlow: 'glow-text-red text-[#FF2D4B]',
      titleColor: 'text-[#FF2D4B]',
      conduitColor: 'bg-[#FF2D4B]',
      conduitGlow: 'shadow-[0_0_8px_#FF2D4B]',
      headerPlate: 'bg-[#FF2D4B]/15 border-[#FF2D4B]/60',
      iconBox: 'border-[#FF2D4B] text-[#FF2D4B] bg-[#FF2D4B]/20',
      innerBorder: 'border-[#FF2D4B]/30',
      sweepGradient: 'from-transparent via-[#FF2D4B]/20 to-transparent',
    },
    green: {
      border: 'border-[#38FF9A]/80',
      borderSoft: 'border-[#94FFC8]/40',
      bgGlow: 'shadow-[0_0_20px_rgba(56,255,154,0.2)]',
      textGlow: 'glow-text-green text-[#38FF9A]',
      titleColor: 'text-[#38FF9A]',
      conduitColor: 'bg-[#38FF9A]',
      conduitGlow: 'shadow-[0_0_8px_#38FF9A]',
      headerPlate: 'bg-[#38FF9A]/15 border-[#38FF9A]/60',
      iconBox: 'border-[#38FF9A] text-[#38FF9A] bg-[#38FF9A]/20',
      innerBorder: 'border-[#38FF9A]/25',
      sweepGradient: 'from-transparent via-[#38FF9A]/20 to-transparent',
    },
    gold: {
      border: 'border-[#FFC94A]/80',
      borderSoft: 'border-[#FFE394]/40',
      bgGlow: 'shadow-[0_0_20px_rgba(255,201,74,0.2)]',
      textGlow: 'glow-text-gold text-[#FFC94A]',
      titleColor: 'text-[#FFC94A]',
      conduitColor: 'bg-[#FFC94A]',
      conduitGlow: 'shadow-[0_0_8px_#FFC94A]',
      headerPlate: 'bg-[#FFC94A]/15 border-[#FFC94A]/60',
      iconBox: 'border-[#FFC94A] text-[#FFC94A] bg-[#FFC94A]/20',
      innerBorder: 'border-[#FFC94A]/25',
      sweepGradient: 'from-transparent via-[#FFC94A]/20 to-transparent',
    },
  }[variant];

  const chamferClass = {
    sm: 'chamfer-sm',
    md: 'chamfer-md',
    lg: 'chamfer-lg',
  }[cornerCut];

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.97, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group ${className}`}
    >
      {/* Outer Holographic Container with Chamfered Corners */}
      <div
        className={`relative ${chamferClass} ${themeMap.border} ${themeMap.bgGlow} border p-[1px] transition-all duration-300`}
        style={{
          backgroundColor: 'rgba(30, 167, 255, 0.02)',
        }}
      >
        {/* Precision HUD Corner Reticle Accents */}
        <div className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l ${themeMap.border} pointer-events-none z-20 opacity-80`} />
        <div className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r ${themeMap.border} pointer-events-none z-20 opacity-80`} />
        <div className={`absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l ${themeMap.border} pointer-events-none z-20 opacity-80`} />
        <div className={`absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r ${themeMap.border} pointer-events-none z-20 opacity-80`} />

        {/* Inner Panel Window */}
        <div
          className={`relative ${chamferClass} bg-[#040c1c]/95 backdrop-blur-xl border ${themeMap.innerBorder} p-5 sm:p-7 md:p-8 overflow-hidden`}
        >
          {/* Optional Scanline Sweep */}
          {showScanline && (
            <div
              className={`absolute left-0 right-0 h-16 pointer-events-none z-10 scanline-sweep bg-gradient-to-b ${themeMap.sweepGradient}`}
            />
          )}

          {/* Ambient Energy Gradient */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#1EA7FF]/5 rounded-full blur-3xl pointer-events-none" />

          {/* HEADER BAR */}
          <div className="relative z-20 flex items-center justify-between gap-3 mb-5 pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              {/* Square Icon Box */}
              <div
                className={`w-7 h-7 shrink-0 flex items-center justify-center font-orbitron font-bold text-xs border ${themeMap.iconBox}`}
                style={{
                  clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                }}
              >
                {typeof icon === 'string' ? (
                  <span>{icon}</span>
                ) : (
                  icon
                )}
              </div>

              {/* Wide Title Plate */}
              <div
                className={`px-3 py-1 border ${themeMap.headerPlate} flex items-baseline gap-2 min-w-0`}
                style={{
                  clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                }}
              >
                <h3
                  className={`font-orbitron font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase truncate ${themeMap.textGlow}`}
                >
                  {title}
                </h3>
                {subtitle && (
                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline uppercase tracking-widest">
                    [{subtitle}]
                  </span>
                )}
              </div>
            </div>

            {/* Optional Header Right or Close Button */}
            <div className="flex items-center gap-2 shrink-0">
              {headerRight}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close window"
                  className="w-7 h-7 flex items-center justify-center border border-white/20 hover:border-[#FF2D4B] text-slate-400 hover:text-[#FF2D4B] hover:bg-[#FF2D4B]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D4B] transition-colors text-xs font-mono"
                  style={{
                    clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* WINDOW CONTENT */}
          <div className="relative z-20 text-[#E8F6FF]">
            {children}
          </div>

          {/* Optional Bottom Status Line */}
          {showFooterStatus && (
            <div className="relative z-20 mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${themeMap.conduitColor} animate-ping`} />
                <span>SYSTEM::ONLINE</span>
              </span>
              <span>SEC_LEVEL: ALPHA</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
