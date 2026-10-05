'use client';

import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '@/lib/sound';

export interface SystemInfoToggleProps {
  info: string;
  title?: string;
  variant?: 'blue' | 'purple' | 'red' | 'green' | 'gold';
  className?: string;
  label?: string;
  align?: 'left' | 'right';
  headerLabel?: React.ReactNode;
  children?: React.ReactNode;
}

export const SystemInfoToggle: React.FC<SystemInfoToggleProps> = ({
  info,
  title = 'SYSTEM DIRECTIVE',
  variant = 'blue',
  className = '',
  label,
  align = 'right',
  headerLabel,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const theme = {
    blue: {
      btnBase: 'border-white/10 hover:border-[#1EA7FF]/60 text-slate-400 hover:text-white bg-black/40',
      btnActive: 'border-[#1EA7FF] bg-[#1EA7FF]/25 text-[#1EA7FF] shadow-[0_0_12px_#1EA7FF]',
      focusRing: 'focus-visible:ring-[#1EA7FF]',
      boxBg: 'bg-[#040c1c]/95 border-[#1EA7FF]/50 shadow-[0_0_15px_rgba(30,167,255,0.2)]',
      iconColor: 'text-[#1EA7FF]',
      titleColor: 'text-[#1EA7FF]',
      textColor: 'text-slate-200',
    },
    purple: {
      btnBase: 'border-white/10 hover:border-[#D43BFF]/60 text-slate-400 hover:text-white bg-black/40',
      btnActive: 'border-[#D43BFF] bg-[#8B2CFF]/25 text-[#D43BFF] shadow-[0_0_12px_#D43BFF]',
      focusRing: 'focus-visible:ring-[#D43BFF]',
      boxBg: 'bg-[#0c041c]/95 border-[#D43BFF]/50 shadow-[0_0_15px_rgba(212,59,255,0.2)]',
      iconColor: 'text-[#D43BFF]',
      titleColor: 'text-[#D43BFF]',
      textColor: 'text-purple-100',
    },
    red: {
      btnBase: 'border-white/10 hover:border-[#FF2D4B]/60 text-slate-400 hover:text-white bg-black/40',
      btnActive: 'border-[#FF2D4B] bg-[#FF2D4B]/25 text-[#FF2D4B] shadow-[0_0_12px_#FF2D4B]',
      focusRing: 'focus-visible:ring-[#FF2D4B]',
      boxBg: 'bg-[#1c0406]/95 border-[#FF2D4B]/50 shadow-[0_0_15px_rgba(255,45,75,0.2)]',
      iconColor: 'text-[#FF2D4B]',
      titleColor: 'text-[#FF2D4B]',
      textColor: 'text-red-100',
    },
    green: {
      btnBase: 'border-white/10 hover:border-[#38FF9A]/60 text-slate-400 hover:text-white bg-black/40',
      btnActive: 'border-[#38FF9A] bg-[#38FF9A]/25 text-[#38FF9A] shadow-[0_0_12px_#38FF9A]',
      focusRing: 'focus-visible:ring-[#38FF9A]',
      boxBg: 'bg-[#041c10]/95 border-[#38FF9A]/50 shadow-[0_0_15px_rgba(56,255,154,0.2)]',
      iconColor: 'text-[#38FF9A]',
      titleColor: 'text-[#38FF9A]',
      textColor: 'text-emerald-100',
    },
    gold: {
      btnBase: 'border-white/10 hover:border-[#FFC94A]/60 text-slate-400 hover:text-white bg-black/40',
      btnActive: 'border-[#FFC94A] bg-[#FFC94A]/25 text-[#FFC94A] shadow-[0_0_12px_#FFC94A]',
      focusRing: 'focus-visible:ring-[#FFC94A]',
      boxBg: 'bg-[#1c1604]/95 border-[#FFC94A]/50 shadow-[0_0_15px_rgba(255,201,74,0.2)]',
      iconColor: 'text-[#FFC94A]',
      titleColor: 'text-[#FFC94A]',
      textColor: 'text-amber-100',
    },
  }[variant];

  return (
    <div className={`relative w-full ${className}`}>
      {headerLabel || children ? (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            {headerLabel || children}
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playTick();
              setIsOpen(!isOpen);
            }}
            title={isOpen ? `Hide ${title}` : `View ${title}`}
            aria-label={isOpen ? `Hide ${title}` : `View ${title}`}
            aria-expanded={isOpen}
            className={`p-1.5 rounded border transition-all flex items-center gap-1.5 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 shrink-0 ${theme.focusRing} ${
              isOpen ? theme.btnActive : theme.btnBase
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            {label && <span className="text-[10px] tracking-wider uppercase font-semibold">{label}</span>}
          </button>
        </div>
      ) : (
        <div className={`flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <button
            type="button"
            onClick={() => {
              soundManager.playTick();
              setIsOpen(!isOpen);
            }}
            title={isOpen ? `Hide ${title}` : `View ${title}`}
            aria-label={isOpen ? `Hide ${title}` : `View ${title}`}
            aria-expanded={isOpen}
            className={`p-1.5 rounded border transition-all flex items-center gap-1.5 text-xs font-mono focus-visible:outline-none focus-visible:ring-2 ${theme.focusRing} ${
              isOpen ? theme.btnActive : theme.btnBase
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            {label && <span className="text-[10px] tracking-wider uppercase font-semibold">{label}</span>}
          </button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className={`p-3 border rounded text-xs font-mono flex items-start justify-between gap-3 chamfer-sm ${theme.boxBg}`}>
              <div className="flex items-start gap-2.5">
                <Info className={`w-4 h-4 shrink-0 mt-0.5 ${theme.iconColor}`} aria-hidden="true" />
                <div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${theme.titleColor}`}>
                    {title}
                  </div>
                  <p className={`leading-relaxed ${theme.textColor}`}>
                    {info}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTick();
                  setIsOpen(false);
                }}
                aria-label="Dismiss info"
                className="text-slate-400 hover:text-white p-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
