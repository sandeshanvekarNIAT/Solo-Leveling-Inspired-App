'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { StatusTab } from './tabs/StatusTab';
import { QuestsTab } from './tabs/QuestsTab';
import { DungeonsTab } from './tabs/DungeonsTab';
import { ShadowArmyTab } from './tabs/ShadowArmyTab';
import { CraftTab } from './tabs/CraftTab';
import { ShopTab } from './tabs/ShopTab';
import { GuildTab } from './tabs/GuildTab';

import { WorkoutActiveModal } from '@/components/ui/WorkoutActiveModal';
import { BossFightModal } from '@/components/ui/BossFightModal';
import { PenaltyModal } from '@/components/ui/PenaltyModal';
import { HunterLicenseModal } from '@/components/ui/HunterLicenseModal';
import { OnboardingModal } from '@/components/ui/OnboardingModal';
import { LevelUpCinematic } from '@/components/ui/LevelUpCinematic';
import { RankUpCinematic } from '@/components/ui/RankUpCinematic';
import { NotificationDrawer } from '@/components/ui/NotificationDrawer';
import { ParticleCanvas } from '@/components/ui/ParticleCanvas';
import { TacticalBackground } from '@/components/ui/TacticalBackground';
import { RankBadge } from '@/components/ui/RankBadge';

import { 
  User, 
  Flame, 
  Swords, 
  Sparkles, 
  Coins, 
  Bell, 
  Volume2, 
  VolumeX, 
  FlaskConical, 
  Users, 
  Compass, 
  AlertTriangle,
  FileCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const AppShell: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    activeModal, 
    setActiveModal, 
    player, 
    notifications, 
    audioMuted, 
    toggleAudio,
    setViewMode,
    awakeningPhase 
  } = useSystem();

  const [extraTab, setExtraTab] = useState<'craft' | 'guild' | null>(null);

  // Play procedural mechanical sounds sequentially during the unfolding phase
  useEffect(() => {
    if (awakeningPhase === 'unfolding') {
      // 1. Initial mechanical servo and window open from the horizontal middle
      soundManager.playMechanicalServo();
      soundManager.playWindowOpen();

      // 2. Window fully expanded from center to top & bottom, top HUD locks in
      const t1 = setTimeout(() => {
        soundManager.playTick();
      }, 700);

      // 3. Main System panels calibrate and render
      const t2 = setTimeout(() => {
        soundManager.playTick();
      }, 900);

      // 4. Bottom nav dock locks into place
      const t3 = setTimeout(() => {
        soundManager.playMechanicalServo();
      }, 1100);

      // 5. System fully operational
      const t4 = setTimeout(() => {
        soundManager.playChime();
      }, 1350);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [awakeningPhase]);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const [tabDirection, setTabDirection] = useState<number>(1);
  const touchStartX = useRef<number>(0);
  const tabOrder = ['status', 'quests', 'dungeons', 'army', 'shop'];

  const handleTabSwitch = (tab: any) => {
    const oldIdx = tabOrder.indexOf(currentTab);
    const newIdx = tabOrder.indexOf(tab);
    setTabDirection(newIdx >= oldIdx ? 1 : -1);
    soundManager.playBarrelSwipe();
    setExtraTab(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExtraTabSwitch = (tab: 'craft' | 'guild') => {
    const isClosing = extraTab === tab;
    setTabDirection(isClosing ? -1 : 1);
    soundManager.playBarrelSwipe();
    setExtraTab(isClosing ? null : tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 65) {
      const currentIdx = tabOrder.indexOf(currentTab);
      if (deltaX > 0 && currentIdx < tabOrder.length - 1) {
        // Swiped finger left -> advance to next tab on the right
        handleTabSwitch(tabOrder[currentIdx + 1]);
      } else if (deltaX < 0 && currentIdx > 0) {
        // Swiped finger right -> retreat to previous tab on the left
        handleTabSwitch(tabOrder[currentIdx - 1]);
      }
    }
  };

  // Keyboard navigation: Left/Right arrows to roll between tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        const currentIdx = tabOrder.indexOf(currentTab);
        if (currentIdx < tabOrder.length - 1 && !extraTab) {
          e.preventDefault();
          handleTabSwitch(tabOrder[currentIdx + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIdx = tabOrder.indexOf(currentTab);
        if (currentIdx > 0 && !extraTab) {
          e.preventDefault();
          handleTabSwitch(tabOrder[currentIdx - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTab, extraTab]);

  // 3D Left-to-Right Cylindrical Barrel Roll
  // When swiping right (direction > 0): active panel rolls away left along cylinder (-50deg), incoming panel rolls in from right (+50deg).
  // When swiping left (direction < 0): active panel rolls away right along cylinder (+50deg), incoming panel rolls in from left (-50deg).
  const barrelTabVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 50 : -50,
      x: direction > 0 ? '60%' : '-60%',
      translateZ: -240,
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      rotateY: 0,
      x: 0,
      translateZ: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -50 : 50,
      x: direction > 0 ? '-60%' : '60%',
      translateZ: -240,
      opacity: 0,
      scale: 0.88,
      transition: {
        duration: 0.28,
        ease: [0.32, 0, 0.67, 0] as const,
      },
    }),
  };

  const navItems = [
    { id: 'status', label: 'STATUS', icon: User },
    { id: 'quests', label: 'QUESTS', icon: Flame },
    { id: 'dungeons', label: 'DUNGEONS', icon: Swords },
    { id: 'army', label: 'ARMY', icon: Sparkles },
    { id: 'shop', label: 'SHOP', icon: Coins },
  ];

  return (
    <motion.div
      initial={
        awakeningPhase === 'unfolding'
          ? {
              clipPath: 'inset(50% 0% 50% 0%)',
              opacity: 0,
            }
          : false
      }
      animate={{
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
      }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative min-h-screen text-[#E8F6FF] flex flex-col pb-24 selection:bg-[#1EA7FF]/30 overflow-x-hidden"
    >
      {/* Tactical Dark Stealth Background: Matte carbon hex-mesh & faint telemetry crosshairs */}
      <TacticalBackground />
      <ParticleCanvas color="rgba(30, 167, 255, " particleCount={30} />

      {/* Holographic Center-Split Mechanical Laser Beams (expanding from middle to top & bottom) */}
      {awakeningPhase === 'unfolding' && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Top expanding laser line (moving from 50% up to 0%) */}
          <motion.div
            initial={{ top: '50%', opacity: 1, scaleX: 0 }}
            animate={{ top: '0%', opacity: [1, 1, 0], scaleX: [0, 1, 1] }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 h-[2px] bg-[#1EA7FF] shadow-[0_0_15px_#1EA7FF]"
          />

          {/* Bottom expanding laser line (moving from 50% down to 100%) */}
          <motion.div
            initial={{ top: '50%', opacity: 1, scaleX: 0 }}
            animate={{ top: '100%', opacity: [1, 1, 0], scaleX: [0, 1, 1] }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 h-[2px] bg-[#1EA7FF] shadow-[0_0_15px_#1EA7FF]"
          />

          {/* Initial central ignition flash line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] bg-white shadow-[0_0_25px_#38FF9A]"
          />
        </div>
      )}

      {/* Skip to Main Protocol Link for Keyboard Accessibility */}
      <a
        href="#app-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1EA7FF] focus:text-black font-orbitron text-xs font-bold shadow-[0_0_15px_#1EA7FF] chamfer-sm"
      >
        Skip to main protocol
      </a>

      {/* TOP SYSTEM HUD */}
      <motion.header
        initial={awakeningPhase === 'unfolding' ? { opacity: 0, scale: 0.98 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.68, ease: 'easeOut' }}
        className="sticky top-0 z-40 px-3 sm:px-6 py-2.5 bg-[#030814]/90 backdrop-blur-md border-b border-[#1EA7FF]/20 flex items-center justify-between gap-3 shadow-[0_4px_20px_rgba(2,4,10,0.8)]"
      >
        {/* Left: Player identity & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('landing')}
            aria-label="Return to System Landing Page"
            className="flex items-center gap-2 group text-left p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#1EA7FF] shadow-[0_0_8px_#1EA7FF] animate-pulse" aria-hidden="true" />
            <div>
              <div className="font-orbitron font-extrabold text-xs sm:text-sm tracking-[0.2em] text-white group-hover:text-[#1EA7FF] transition-colors">
                SYSTEM <span className="text-[#1EA7FF]">AWAKEN</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 hidden sm:block">
                [TAP TO VIEW LANDING]
              </div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10">
            <RankBadge rank={player.rank} size="sm" />
            <span className="font-mono text-xs text-[#7FD4FF] font-semibold tabular-nums">
              LVL {player.level} {player.name}
            </span>
          </div>
        </div>

        {/* Center: Quick modules switcher (Alchemy & Guild) */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            aria-pressed={extraTab === 'craft'}
            aria-label="Toggle Alchemy and Rune Crafting module"
            onClick={() => handleExtraTabSwitch('craft')}
            className={`px-3 py-1 border rounded transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
              extraTab === 'craft'
                ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 text-[#1EA7FF] font-bold shadow-[0_0_8px_#1EA7FF]'
                : 'border-white/10 hover:border-white/30 text-slate-300'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
            [ ALCHEMY / CRAFT ]
          </button>

          <button
            type="button"
            aria-pressed={extraTab === 'guild'}
            aria-label="Toggle Guild Syndicate Raid module"
            onClick={() => handleExtraTabSwitch('guild')}
            className={`px-3 py-1 border rounded transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D4B] ${
              extraTab === 'guild'
                ? 'border-[#FF2D4B] bg-[#FF2D4B]/20 text-[#FF2D4B] font-bold shadow-[0_0_8px_#FF2D4B]'
                : 'border-white/10 hover:border-white/30 text-slate-300'
            }`}
          >
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            [ GUILD RAID ]
          </button>

          <button
            type="button"
            aria-label="Re-calibrate hunter biometric baseline"
            onClick={() => setActiveModal('onboarding')}
            className="px-2.5 py-1 border border-white/10 hover:border-[#38FF9A] text-slate-400 hover:text-[#38FF9A] rounded transition-colors text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A]"
          >
            [ RE-CALIBRATE ]
          </button>

          <button
            type="button"
            aria-label="Inspect Penalty Zone warning"
            onClick={() => setActiveModal('penalty')}
            className="px-2.5 py-1 border border-white/10 hover:border-[#FF2D4B] text-slate-400 hover:text-[#FF2D4B] rounded transition-colors text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D4B]"
          >
            [ PENALTY ZONE ]
          </button>
        </div>

        {/* Right: Sound & Notifications */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={audioMuted ? 'Unmute system audio synthesizer' : 'Mute system audio synthesizer'}
            className="p-2 border border-white/10 hover:border-[#1EA7FF] text-slate-300 hover:text-white rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            {audioMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#38FF9A]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('notifications')}
            aria-label={`System transmissions (${unreadNotifs} unread)`}
            aria-expanded={activeModal === 'notifications'}
            className="relative p-2 border border-white/10 hover:border-[#1EA7FF] text-slate-300 hover:text-white rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            <Bell className="w-4 h-4" aria-hidden="true" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF2D4B] text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse tabular-nums">
                {unreadNotifs}
              </span>
            )}
          </button>
        </div>
      </motion.header>

      {/* MAIN VIEW CONTENT CONTAINER WITH 3D BARREL PERSPECTIVE */}
      <motion.main
        initial={awakeningPhase === 'unfolding' ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.88, ease: 'easeOut' }}
        id="app-content"
        tabIndex={-1}
        role="tabpanel"
        id-panel={`panel-${extraTab || currentTab}`}
        aria-labelledby={`tab-${extraTab || currentTab}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="barrel-perspective-container relative z-10 flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 pt-6 focus:outline-none overflow-x-hidden"
      >
        {/* Left Barrel Swipe Trigger Button (Desktop/Tablet) */}
        {tabOrder.indexOf(currentTab) > 0 && !extraTab && (
          <button
            type="button"
            onClick={() => handleTabSwitch(tabOrder[tabOrder.indexOf(currentTab) - 1])}
            aria-label={`Barrel roll left to ${tabOrder[tabOrder.indexOf(currentTab) - 1]}`}
            className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#040c1c]/90 border border-[#1EA7FF]/30 text-slate-400 hover:text-[#1EA7FF] hover:border-[#1EA7FF] hover:shadow-[0_0_15px_rgba(30,167,255,0.35)] transition-all items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Barrel Swipe Trigger Button (Desktop/Tablet) */}
        {tabOrder.indexOf(currentTab) < tabOrder.length - 1 && !extraTab && (
          <button
            type="button"
            onClick={() => handleTabSwitch(tabOrder[tabOrder.indexOf(currentTab) + 1])}
            aria-label={`Barrel roll right to ${tabOrder[tabOrder.indexOf(currentTab) + 1]}`}
            className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#040c1c]/90 border border-[#1EA7FF]/30 text-slate-400 hover:text-[#1EA7FF] hover:border-[#1EA7FF] hover:shadow-[0_0_15px_rgba(30,167,255,0.35)] transition-all items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait" custom={tabDirection}>
          <motion.div
            key={extraTab || currentTab}
            custom={tabDirection}
            variants={barrelTabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="barrel-surface w-full"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            {extraTab === 'craft' ? (
              <CraftTab />
            ) : extraTab === 'guild' ? (
              <GuildTab />
            ) : (
              <>
                {currentTab === 'status' && <StatusTab />}
                {currentTab === 'quests' && <QuestsTab />}
                {currentTab === 'dungeons' && <DungeonsTab />}
                {currentTab === 'army' && <ShadowArmyTab />}
                {currentTab === 'shop' && <ShopTab />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* FLOATING HOLOGRAPHIC BOTTOM NAVIGATION */}
      <motion.nav
        initial={awakeningPhase === 'unfolding' ? { opacity: 0, scale: 0.92 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.38, delay: 1.08, ease: 'easeOut' }}
        aria-label="System navigation protocol"
        className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[500px] z-40 bg-[#040c1c]/95 backdrop-blur-xl border border-[#1EA7FF]/60 p-1.5 chamfer-md shadow-[0_0_25px_rgba(30,167,255,0.35)]"
      >
        <div role="tablist" aria-label="System Protocol Modules" className="grid grid-cols-5 gap-1 text-center font-orbitron">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id && !extraTab;

            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`panel-${item.id}`}
                onClick={() => handleTabSwitch(item.id)}
                className={`py-2 px-1 rounded flex flex-col items-center justify-center gap-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
                  isActive
                    ? 'text-white bg-[#1EA7FF]/20 shadow-[0_0_12px_rgba(30,167,255,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <span className="absolute top-0 inset-x-3 h-[2px] bg-[#1EA7FF] shadow-[0_0_6px_#1EA7FF]" aria-hidden="true" />
                )}

                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1EA7FF] animate-pulse' : ''}`} aria-hidden="true" />
                <span className="text-[10px] tracking-wider font-semibold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* MODAL DIALOGS */}
      {activeModal === 'workout' && <WorkoutActiveModal />}
      {activeModal === 'bossFight' && <BossFightModal />}
      {activeModal === 'penalty' && <PenaltyModal />}
      {activeModal === 'license' && <HunterLicenseModal />}
      {activeModal === 'onboarding' && <OnboardingModal />}
      {activeModal === 'levelUp' && <LevelUpCinematic />}
      {activeModal === 'rankUp' && <RankUpCinematic />}
      {activeModal === 'notifications' && <NotificationDrawer />}
    </motion.div>
  );
};
