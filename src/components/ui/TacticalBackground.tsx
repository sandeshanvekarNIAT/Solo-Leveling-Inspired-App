'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const TacticalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 1. Base Dark Cyber-Abyss Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030918] via-[#040e24] to-[#02040a]" />

      {/* 2. Central Volumetric Mana Radial Bloom */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(30,167,255,0.16)_0%,rgba(139,44,255,0.08)_45%,transparent_75%)] blur-2xl" />

      {/* 3. Precision Carbon Hex-Mesh & Cyber Matrix Grid (Sharp, High-Definition SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Carbon Hexagon Lattice Pattern */}
          <pattern
            id="sys-hex-grid"
            width="36"
            height="62.35"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 18 10.39 L 0 0 L 0 20.78 L 18 31.18 L 36 20.78 Z M 0 31.18 L 18 41.57 L 0 51.96 M 36 31.18 L 18 41.57 L 36 51.96 L 18 62.35 L 0 51.96"
              fill="none"
              stroke="rgba(30, 167, 255, 0.12)"
              strokeWidth="1"
            />
          </pattern>

          {/* Secondary 72px Tactical Grid with Crosshair Nodes */}
          <pattern
            id="sys-tactical-matrix"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            {/* Subtle square gridlines */}
            <path
              d="M 72 0 L 0 0 0 72"
              fill="none"
              stroke="rgba(148, 163, 184, 0.08)"
              strokeWidth="0.75"
            />
            {/* Corner intersection tick crosses */}
            <path
              d="M -4 0 L 4 0 M 0 -4 L 0 4 M 68 0 L 76 0 M 72 -4 L 72 4 M 0 68 L 0 76 M -4 72 L 4 72 M 68 72 L 76 72 M 72 68 L 72 76"
              fill="none"
              stroke="rgba(30, 167, 255, 0.35)"
              strokeWidth="1"
            />
            {/* Center micro dot */}
            <circle cx="36" cy="36" r="1" fill="rgba(56, 255, 154, 0.35)" />
          </pattern>

          {/* Linear gradient for animated energy beam */}
          <linearGradient id="scanline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(30, 167, 255, 0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Layer 1: Hex mesh pattern */}
        <rect width="100%" height="100%" fill="url(#sys-hex-grid)" opacity="0.8" />
        {/* Layer 2: Tactical crosshair grid */}
        <rect width="100%" height="100%" fill="url(#sys-tactical-matrix)" opacity="0.9" />
      </svg>

      {/* 4. Ambient Sweeping Horizontal Scanning Conduit */}
      <motion.div
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#1EA7FF]/10 to-transparent blur-sm pointer-events-none"
      />

      {/* 5. Deep Perimeter Shadow Vignette to focus attention on active windows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,5,14,0.7)_70%,#02040a_100%)]" />

      {/* 6. Tactical Telemetry Corner Brackets & System Annotations */}
      <div className="absolute inset-3 sm:inset-6 pointer-events-none font-mono text-[9px] text-[#7FD4FF] select-none">
        {/* Top-Left Tactical Bracket */}
        <div className="absolute top-14 left-2 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[#1EA7FF] font-bold text-sm leading-none">┌</span>
            <span className="tracking-[0.25em] text-[#1EA7FF] font-bold drop-shadow-[0_0_8px_#1EA7FF]">
              SYS.MATRIX // RECON_01
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38FF9A] animate-ping" />
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-[#1EA7FF]/70 via-[#1EA7FF]/20 to-transparent" />
          <span className="text-[8px] text-slate-400 tracking-wider">
            KERNEL: DUAL-CORE AWAKENED
          </span>
        </div>

        {/* Top-Right Tactical Bracket */}
        <div className="absolute top-14 right-2 flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="tracking-[0.25em] text-[#1EA7FF] font-bold drop-shadow-[0_0_8px_#1EA7FF]">
              SECTOR: 07-ALPHA
            </span>
            <span className="text-[#1EA7FF] font-bold text-sm leading-none">┐</span>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-l from-[#1EA7FF]/70 via-[#1EA7FF]/20 to-transparent" />
          <span className="text-[8px] text-slate-400 tracking-wider">
            MANA DENSITY: 99.8% STABLE
          </span>
        </div>

        {/* Bottom-Left Tactical Coordinates */}
        <div className="absolute bottom-20 sm:bottom-8 left-2 flex flex-col gap-1">
          <div className="w-24 h-[1px] bg-gradient-to-r from-slate-500/50 to-transparent" />
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[#1EA7FF] font-bold text-sm leading-none">└</span>
            <span className="tracking-[0.2em] font-mono text-[8px] text-slate-300">
              LOC: 37°33&apos;N 126°58&apos;E • ELEV: +42M
            </span>
          </div>
        </div>

        {/* Bottom-Right Status Telemetry */}
        <div className="absolute bottom-20 sm:bottom-8 right-2 flex flex-col items-end gap-1">
          <div className="w-24 h-[1px] bg-gradient-to-l from-slate-500/50 to-transparent" />
          <div className="flex items-center gap-2 text-slate-400">
            <span className="tracking-[0.2em] font-mono text-[8px] text-[#38FF9A]">
              TELEMETRY: SYNCHRONIZED
            </span>
            <span className="text-[#1EA7FF] font-bold text-sm leading-none">┘</span>
          </div>
        </div>

        {/* Center-Left & Center-Right Orientation Reticles */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 flex items-center gap-1.5 opacity-50">
          <span className="text-[#1EA7FF] font-bold text-xs">+</span>
          <div className="w-3 h-[1px] bg-[#1EA7FF]" />
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1.5 opacity-50">
          <div className="w-3 h-[1px] bg-[#1EA7FF]" />
          <span className="text-[#1EA7FF] font-bold text-xs">+</span>
        </div>
      </div>
    </div>
  );
};
