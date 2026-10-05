'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { StatBar } from '@/components/ui/StatBar';
import { RankBadge } from '@/components/ui/RankBadge';
import { ParticleCanvas } from '@/components/ui/ParticleCanvas';
import { 
  Shield, 
  Swords, 
  Flame, 
  Sparkles, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Zap, 
  Check, 
  HeartHandshake,
  Activity,
  Moon,
  Droplet,
  Compass,
  ArrowRight
} from 'lucide-react';
import { soundManager } from '@/lib/sound';
import { HunterRank } from '@/types/system';

export const LandingPage: React.FC = () => {
  const { enterApp, audioMuted, toggleAudio, setRankTheme } = useSystem();

  // Section 0: Boot sequence state
  const [booted, setBooted] = useState(false);
  const [bootLineIndex, setBootLineIndex] = useState(0);
  const [screenFlashed, setScreenFlashed] = useState(false);

  // Section 1: Hero decline reaction
  const [declineGlitch, setDeclineGlitch] = useState(false);
  const [acceptPulsing, setAcceptPulsing] = useState(false);

  // Section 2: Demo Stats allocation
  const [demoPoints, setDemoPoints] = useState(3);
  const [demoStats, setDemoStats] = useState({ str: 10, agi: 10, vit: 10, int: 10, per: 10 });
  const [allocationDone, setAllocationDone] = useState(false);

  // Section 3: Demo Quest checkboxes
  const [demoTasks, setDemoTasks] = useState([
    { id: 't1', name: 'Push-ups', target: 20, done: false, exp: 60 },
    { id: 't2', name: 'Sit-ups', target: 20, done: false, exp: 60 },
    { id: 't3', name: 'Squats', target: 20, done: false, exp: 60 },
    { id: 't4', name: 'Endurance Run', target: '2 km', done: false, exp: 70 },
  ]);
  const [questFinished, setQuestFinished] = useState(false);

  // Section 4: Rank progression
  const [selectedRank, setSelectedRank] = useState<HunterRank>('E');

  // Section 5: Jobs selection (Interactive focused showcase)
  const [activeJobIndex, setActiveJobIndex] = useState(0);

  // Section 6: Shadow Army Extraction demo
  const [extractedSoldiers, setExtractedSoldiers] = useState<string[]>(['Shadow Runner']);
  const [ariseEffect, setAriseEffect] = useState(false);

  // Section 11: Final CTA Decline
  const [finalDenied, setFinalDenied] = useState(false);

  // Boot sequence timer
  useEffect(() => {
    const timer1 = setTimeout(() => setBootLineIndex(1), 700);
    const timer2 = setTimeout(() => setBootLineIndex(2), 1700);
    const timer3 = setTimeout(() => setBootLineIndex(3), 2700);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleBootEnter = () => {
    setScreenFlashed(true);
    soundManager.unlockAudio();
    soundManager.playLevelUp();
    if (audioMuted) {
      toggleAudio();
    }
    setTimeout(() => {
      setBooted(true);
      setScreenFlashed(false);
    }, 350);
  };

  const handleDeclineClick = () => {
    soundManager.playGlitch();
    setDeclineGlitch(true);
    setAcceptPulsing(true);
    setTimeout(() => setDeclineGlitch(false), 2400);
  };

  const handleSpendDemoPoint = (stat: keyof typeof demoStats) => {
    if (demoPoints <= 0) return;
    soundManager.playStatGain();
    setDemoStats((prev) => ({ ...prev, [stat]: prev[stat] + 1 }));
    setDemoPoints((prev) => prev - 1);

    if (demoPoints - 1 === 0) {
      soundManager.playChime();
      setAllocationDone(true);
    }
  };

  const handleToggleDemoTask = (id: string) => {
    soundManager.playTick();
    setDemoTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      const allDone = next.every((t) => t.done);
      if (allDone && !questFinished) {
        soundManager.playLevelUp();
        setQuestFinished(true);
      }
      return next;
    });
  };

  const jobsList = [
    {
      name: 'Void Assassin',
      bonus: 'AGI +8, PER +5',
      focus: 'High-speed interval sprints & reactive agility',
      desc: 'Swift, silent kinetic power. Specializes in short rest intervals and maximal sprint velocity.',
      quote: '[Before the strike is registered, the distance is closed.]',
    },
    {
      name: 'Dreadnought Berserker',
      bonus: 'STR +10, VIT +6',
      focus: 'Heavy compound calisthenics & volume overload',
      desc: 'Forged in unrelenting iron resistance. The higher the muscular fatigue, the greater the adaptation surge.',
      quote: '[Pain is mere biological telemetry. Drive through.]',
    },
    {
      name: 'Aegis Knight',
      bonus: 'VIT +12, INT +4',
      focus: 'Isometric core stability, posture & joint integrity',
      desc: 'An immovable mountain. Form cannot buckle or yield under gravitational tension.',
      quote: '[The spine remains unbending against any load.]',
    },
    {
      name: 'Phantom Ranger',
      bonus: 'AGI +6, PER +8',
      focus: 'Sub-maximal aerobic pace & endurance running',
      desc: 'Paces cardiovascular output with mechanical precision across punishing terrains.',
      quote: '[Endless kilometers dissolve beneath steady cadence.]',
    },
    {
      name: 'Iron Monk',
      bonus: 'INT +8, VIT +8',
      focus: 'Breath control, cold exposure & habit adherence',
      desc: 'Master of psychological sovereignty. No distraction breaches their daily discipline.',
      quote: '[Discipline commands the vessel. The mind does not falter.]',
    },
    {
      name: 'Shadow Monarch',
      bonus: 'ALL STATS +15',
      focus: 'Total lifestyle sovereignty & legion command',
      desc: 'The Sovereign entity. Transforms every daily discipline into an eternal supernatural shadow soldier.',
      quote: '[ARISE. The world yields to our consistency.]',
    },
  ];

  const rankData: Record<
    HunterRank,
    { title: string; req: string; perks: string }
  > = {
    E: {
      title: 'Novice Awakening',
      req: 'Day 1–7 of physical calibration.',
      perks: 'Basic daily quests, push/pull baseline tracking.',
    },
    D: {
      title: 'Conditioned Aspirant',
      req: '14-Day Streak. 50 push-ups / 3 km run.',
      perks: 'D-Rank Dungeon access, Recovery Essence craft.',
    },
    C: {
      title: 'Combat Ready Hunter',
      req: '30-Day Streak. 100 push-ups / 5 km run.',
      perks: 'C-Rank gates, Guild raids unlocked, 1st Shadow slot.',
    },
    B: {
      title: 'Elite Striker',
      req: '60-Day Streak. Zone 4 aerobic mastery.',
      perks: 'B-Rank gates, 3 Shadow extract slots, Rest Token alchemy.',
    },
    A: {
      title: 'Apex Sovereign',
      req: '90-Day Streak. Complete physical transformation.',
      perks: 'A-Rank boss raids, custom title, leaderboard insignia.',
    },
    S: {
      title: 'Monarch of Discipline',
      req: '180-Day Streak. Top 1% Global consistency.',
      perks: 'Unlimited shadow army, purple celestial HUD theme.',
    },
    National: {
      title: 'National Level Hunter',
      req: '365-Day Unbroken Matrix Compliance.',
      perks: 'Global hall of fame, Sovereign status worldwide.',
    },
  };

  const handleRankClick = (rk: HunterRank) => {
    soundManager.playTick();
    setSelectedRank(rk);
    setRankTheme(rk);
  };

  const handleExtractShadowDemo = () => {
    soundManager.playArise();
    setAriseEffect(true);
    setTimeout(() => {
      setAriseEffect(false);
      setExtractedSoldiers((prev) => {
        if (!prev.includes('Shadow Sleeper')) return [...prev, 'Shadow Sleeper'];
        if (!prev.includes('Shadow Hydrator')) return [...prev, 'Shadow Hydrator'];
        return prev;
      });
    }, 1200);
  };

  const handleFinalNo = () => {
    soundManager.playGlitch();
    setFinalDenied(true);
    setTimeout(() => setFinalDenied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#02040A] text-[#E8F6FF] overflow-hidden selection:bg-[#1EA7FF]/30">
      <ParticleCanvas particleCount={30} />

      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1EA7FF] focus:text-black font-orbitron text-xs font-bold shadow-[0_0_15px_#1EA7FF] chamfer-sm"
      >
        Skip to main content
      </a>

      {/* Floating Minimalist Header */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between bg-[#02040A]/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#1EA7FF] shadow-[0_0_8px_#1EA7FF] animate-pulse" aria-hidden="true" />
          <span className="font-orbitron font-extrabold text-xs sm:text-sm tracking-[0.22em] text-white">
            SYSTEM <span className="text-[#1EA7FF]">AWAKEN</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={audioMuted ? "Unmute audio" : "Mute audio"}
            className="p-1.5 rounded border border-white/10 hover:border-[#1EA7FF] text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            {audioMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#38FF9A]" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{audioMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
          </button>

          <SystemButton
            variant="blue"
            size="sm"
            onClick={enterApp}
          >
            [ ENTER APP ]
          </SystemButton>
        </div>
      </header>

      {/* SECTION 0: BOOT / ENTRY GATE */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#02040A] p-4 ${
              screenFlashed ? 'bg-white' : ''
            }`}
          >
            <div className="relative max-w-md w-full">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="h-[1.5px] bg-[#1EA7FF] shadow-[0_0_12px_#1EA7FF] mx-auto mb-6"
              />

              <div className="bg-[#040c1c]/95 border border-[#1EA7FF]/80 p-6 sm:p-8 chamfer-md shadow-[0_0_30px_rgba(30,167,255,0.2)]">
                <div className="font-mono text-xs text-[#7FD4FF] mb-5 space-y-1.5">
                  {bootLineIndex >= 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      [System connection detected.]
                    </motion.div>
                  )}
                  {bootLineIndex >= 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      [Scanning biological signature…]
                    </motion.div>
                  )}
                  {bootLineIndex >= 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#38FF9A] font-bold">
                      [A Player has been found.]
                    </motion.div>
                  )}
                </div>

                {bootLineIndex >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-2 flex flex-col items-center gap-2.5"
                  >
                    <SystemButton
                      variant="blue"
                      size="lg"
                      pulsing
                      fullWidth
                      onClick={handleBootEnter}
                    >
                      [ ENTER THE SYSTEM ]
                    </SystemButton>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      Sound Recommended • Tap to awaken
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CINEMATIC SCROLL CONTENT */}
      <main id="main-content" className="relative pt-28 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-32 sm:space-y-44">

        {/* SECTION 1: HERO - THE AWAKENING */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center relative py-10 sm:py-16">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-b from-[#1EA7FF]/12 via-[#8B2CFF]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Eyebrow Directive Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-[#1EA7FF]/10 border border-[#1EA7FF]/30 text-[#7FD4FF] font-mono text-[11px] tracking-[0.22em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1EA7FF] shadow-[0_0_8px_#1EA7FF] animate-pulse" aria-hidden="true" />
            <span>[ SYSTEM PROTOCOL: AWAKENING DIRECTIVE ]</span>
          </motion.div>

          {/* Main Cinematic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <h1 className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-[0.12em] uppercase leading-[1.08] text-balance">
              LEVEL UP.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EA7FF] via-[#7FD4FF] to-[#38FF9A] drop-shadow-[0_0_25px_rgba(30,167,255,0.4)]">
                IN REAL LIFE.
              </span>
            </h1>
            <p className="font-exo text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
              A cold, sovereign fitness matrix inspired by dark-fantasy hunter lore. Your daily physical discipline converted into supernatural combat power.
            </p>
          </motion.div>

          {/* The Holographic Awakening Quest Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl mx-auto"
          >
            <SystemWindow
              title="EMERGENCY QUEST"
              subtitle="DIRECTIVE #001"
              icon="!"
              variant="blue"
              className={declineGlitch ? 'animate-glitch-shake' : ''}
              headerRight={
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#38FF9A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38FF9A] animate-ping" aria-hidden="true" />
                  <span className="hidden sm:inline">LIVE TELEMETRY</span>
                </div>
              }
            >
              {/* Telemetry Micro Grid */}
              <div className="grid grid-cols-3 gap-2 p-2.5 mb-5 bg-black/60 border border-white/10 rounded font-mono text-[10px] sm:text-xs">
                <div>
                  <div className="text-slate-500 uppercase text-[9px]">RECIPIENT</div>
                  <div className="text-white font-orbitron font-bold truncate">UNRANKED ASPIRANT</div>
                </div>
                <div>
                  <div className="text-slate-500 uppercase text-[9px]">DIFFICULTY</div>
                  <div className="text-[#1EA7FF] font-orbitron font-bold">E-RANK (INITIAL)</div>
                </div>
                <div>
                  <div className="text-slate-500 uppercase text-[9px]">PENALTY</div>
                  <div className="text-[#FF2D4B] font-orbitron font-bold">TELEPORTATION</div>
                </div>
              </div>

              {/* Quest Mission Brief */}
              <div className="p-4 bg-black/60 border border-[#1EA7FF]/25 rounded text-left font-mono text-xs sm:text-sm space-y-2 mb-6">
                <div className="text-[10px] text-[#7FD4FF] tracking-wider uppercase border-b border-white/10 pb-1.5 mb-2 flex items-center justify-between">
                  <span>[SYSTEM DIRECTIVE: RECIPIENT AWAKENING]</span>
                  <span className="text-slate-500 font-mono">ID: 000-01-AWK</span>
                </div>
                <p className="text-slate-300">
                  [The System has detected latent biological potential in your vessel.]
                </p>
                <p className="text-slate-300">
                  [You are weak. You are not yet a Hunter. The System offers you a path to sovereign strength.]
                </p>
                <p className="text-[#38FF9A] font-semibold">
                  [Will you accept the Awakening Directive?]
                </p>
              </div>

              {/* Decline Glitch Message */}
              {declineGlitch && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="alert"
                  className="p-3 mb-6 bg-[#FF2D4B]/20 border border-[#FF2D4B] text-[#FF2D4B] font-mono text-xs font-bold flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>[DECLINING IS NOT PERMITTED. THE PLAYER MUST PROCEED.]</span>
                </motion.div>
              )}

              {/* Dual Choice Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <SystemButton
                  variant="blue"
                  size="lg"
                  pulsing={acceptPulsing}
                  onClick={enterApp}
                  className="w-full sm:w-auto min-w-[220px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    [ ACCEPT THE SYSTEM ]
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </SystemButton>

                <SystemButton
                  variant="ghost"
                  size="lg"
                  onClick={handleDeclineClick}
                  className="w-full sm:w-auto min-w-[140px]"
                >
                  [ DECLINE ]
                </SystemButton>
              </div>

              <div className="mt-4 text-[10px] font-mono text-slate-500 tracking-wider">
                Sound Recommended • No Account Required For Awakening
              </div>
            </SystemWindow>
          </motion.div>
        </section>

        {/* SECTION 2: "YOUR STATUS" (Unified, Uncluttered Dashboard) */}
        <section className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.3em] uppercase">
              [01 • TELEMETRY CALIBRATION]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-widest mt-1 text-balance">
              YOUR STATUS WINDOW
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-sm mx-auto">
              Allocate your 3 ability points below to calibrate starting baseline attributes.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SystemWindow
              title="STATUS"
              subtitle="PLAYER MATRIX"
              variant="blue"
            >
              {/* Header Profile info */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 font-mono text-xs">
                <div>
                  <div className="text-sm font-orbitron font-bold text-white tracking-wider">
                    KAIEN JIN
                  </div>
                  <div className="text-[#7FD4FF] text-[11px]">
                    TITLE: &quot;The Weakest Hunter&quot;
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-orbitron text-white">LEVEL 1</div>
                  <div className="text-slate-400 text-[11px]">E-RANK NOVICE</div>
                </div>
              </div>

              {/* Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <StatBar label="HP" current={240} max={240} type="hp" height="sm" />
                <StatBar label="MP" current={120} max={120} type="mp" height="sm" />
                <StatBar label="FATIGUE" current={15} max={100} type="fatigue" height="sm" />
              </div>

              {/* Available Points Badge */}
              <div className="flex items-center justify-between p-3 bg-black/50 border border-[#1EA7FF]/30 rounded mb-5 font-orbitron text-xs">
                <span className="text-[#7FD4FF] tracking-wider font-semibold">
                  AVAILABLE ABILITY POINTS:
                </span>
                <span className={`font-extrabold text-sm ${demoPoints > 0 ? 'text-[#38FF9A] animate-pulse' : 'text-slate-500'}`}>
                  {demoPoints} PTS
                </span>
              </div>

              {/* 5 Stats Deck */}
              <div className="space-y-2.5 font-orbitron">
                {[
                  { key: 'str', label: 'STR', name: 'Strength', desc: 'Power output & heavy compound lifts' },
                  { key: 'agi', label: 'AGI', name: 'Agility', desc: 'Speed, mobility & reaction velocity' },
                  { key: 'vit', label: 'VIT', name: 'Vitality', desc: 'Endurance, stamina & tissue repair' },
                  { key: 'int', label: 'INT', name: 'Intelligence', desc: 'Mental focus & streak discipline' },
                  { key: 'per', label: 'PER', name: 'Perception', desc: 'Body awareness & exercise cadence' },
                ].map((st) => (
                  <div
                    key={st.key}
                    className="flex items-center justify-between p-2.5 bg-black/40 border border-white/5 hover:border-[#1EA7FF]/40 rounded transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 font-bold text-xs text-white tracking-wider">
                        {st.label}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {st.desc}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-white tabular-nums w-6 text-right">
                        {demoStats[st.key as keyof typeof demoStats]}
                      </span>
                      <button
                        type="button"
                        disabled={demoPoints <= 0}
                        aria-label={`Allocate ability point to ${st.name}`}
                        onClick={() => handleSpendDemoPoint(st.key as keyof typeof demoStats)}
                        className={`w-7 h-7 flex items-center justify-center border font-bold text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A] ${
                          demoPoints > 0
                            ? 'border-[#38FF9A] bg-[#38FF9A]/20 text-[#38FF9A] hover:bg-[#38FF9A] hover:text-black shadow-[0_0_8px_#38FF9A]'
                            : 'border-slate-800 text-slate-700 cursor-not-allowed'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {allocationDone && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="mt-4 p-3 bg-[#38FF9A]/15 border border-[#38FF9A] text-[#38FF9A] font-mono text-xs text-center font-bold"
                >
                  [Allocation complete. Physical density calibrated.]
                </motion.div>
              )}
            </SystemWindow>
          </div>
        </section>

        {/* SECTION 3: "THE DAILY QUEST" (Clean, spacious checklist) */}
        <section className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.3em] uppercase">
              [02 • DISCIPLINE PROTOCOL]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-widest mt-1 text-balance">
              THE DAILY QUEST
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-sm mx-auto">
              Delivered at 00:00 every day. Tap tasks below to test real-time completion.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SystemWindow
              title="QUEST INFO"
              subtitle="DAILY PROTOCOL"
              variant="blue"
            >
              <div className="font-mono text-xs text-[#7FD4FF] mb-2">
                [Daily Quest: Strength Training has arrived.]
              </div>

              <div className="border-b border-white/10 pb-3 mb-5">
                <div className="font-orbitron font-extrabold text-base tracking-widest text-white">
                  GOAL: PREPARATIONS FOR STRENGTH
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5 mb-6" role="group" aria-label="Daily Workout Objectives">
                {demoTasks.map((task) => (
                  <button
                    type="button"
                    key={task.id}
                    role="checkbox"
                    aria-checked={task.done}
                    aria-label={`Mark ${task.name} as ${task.done ? 'incomplete' : 'complete'}`}
                    onClick={() => handleToggleDemoTask(task.id)}
                    className={`w-full p-3.5 border rounded transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] flex items-center justify-between ${
                      task.done
                        ? 'border-[#38FF9A]/60 bg-[#38FF9A]/10 text-white'
                        : 'border-white/10 bg-black/40 text-slate-300 hover:border-[#1EA7FF]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          task.done
                            ? 'border-[#38FF9A] bg-[#38FF9A] text-black shadow-[0_0_8px_#38FF9A]'
                            : 'border-slate-500 bg-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
                      </div>

                      <span className={`font-orbitron text-xs sm:text-sm tracking-wider ${task.done ? 'line-through text-slate-500' : ''}`}>
                        {task.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
                      <span className="text-slate-400">
                        [{task.done ? task.target : '0'} / {task.target}]
                      </span>
                      <span className="text-[#38FF9A] font-semibold">
                        +{task.exp} EXP
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quest Completed Banner */}
              {questFinished && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  role="status"
                  aria-live="polite"
                  className="p-3.5 mb-4 bg-black/70 border border-[#38FF9A] text-center"
                >
                  <div className="font-orbitron font-bold text-xs text-[#38FF9A] glow-text-green">
                    [QUEST COMPLETE. +250 EXP AWARDED]
                  </div>
                </motion.div>
              )}

              {/* Warning & Humane Rest Token in single clean bar */}
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-red-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#FF2D4B] shrink-0" aria-hidden="true" />
                  <span>Penalty zone teleportation upon midnight failure.</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#38FF9A]">
                  <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Rest Tokens safeguard injury / illness.</span>
                </div>
              </div>
            </SystemWindow>
          </div>
        </section>

        {/* SECTION 4: "RANK UP" (Clean Timeline) */}
        <section className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.3em] uppercase">
              [03 • ASCENSION HIERARCHY]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-widest mt-1">
              THE ASCENSION PATH
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-sm mx-auto">
              Select any rank to inspect qualification standards.
            </p>
          </div>

          {/* Interactive Rank Track */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-6" role="group" aria-label="Hunter rank criteria">
            {(['E', 'D', 'C', 'B', 'A', 'S', 'National'] as HunterRank[]).map((rk) => (
              <button
                key={rk}
                type="button"
                aria-pressed={selectedRank === rk}
                aria-label={`Inspect ${rk === 'National' ? 'National' : rk}-Rank requirements`}
                onClick={() => handleRankClick(rk)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
                  selectedRank === rk ? 'scale-110' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <RankBadge rank={rk} size="md" />
                <span className="font-orbitron text-[9px] text-slate-300 font-semibold tracking-wider">
                  {rk === 'National' ? 'NAT' : rk}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Rank Card */}
          <div className="max-w-xl mx-auto">
            <SystemWindow
              title={`${selectedRank}-RANK EVALUATION`}
              subtitle={rankData[selectedRank].title}
              variant={selectedRank === 'S' || selectedRank === 'National' ? 'purple' : 'blue'}
            >
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">CRITERIA</div>
                  <div className="text-white font-semibold text-sm font-orbitron mt-0.5">
                    {rankData[selectedRank].req}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">UNLOCKED PRIVILEGES</div>
                  <div className="text-[#38FF9A] mt-0.5">
                    {rankData[selectedRank].perks}
                  </div>
                </div>
              </div>
            </SystemWindow>
          </div>
        </section>

        {/* SECTION 5: "CHOOSE YOUR JOB" (Interactive Class Terminal, 70% Less Noise) */}
        <section className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.3em] uppercase">
              [04 • CLASS SPECIALIZATION]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-widest mt-1">
              CHOOSE YOUR JOB
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-sm mx-auto">
              Your physiological strengths unlock specialized daily quest parameters.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Class Switcher Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4" role="tablist" aria-label="Job Classes">
              {jobsList.map((job, idx) => (
                <button
                  key={job.name}
                  type="button"
                  role="tab"
                  aria-selected={activeJobIndex === idx}
                  aria-controls={`job-panel-${idx}`}
                  onClick={() => {
                    soundManager.playTick();
                    setActiveJobIndex(idx);
                  }}
                  className={`py-2 px-1 text-center font-orbitron text-[10px] tracking-wider rounded transition-colors truncate border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
                    activeJobIndex === idx
                      ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 text-white font-bold shadow-[0_0_10px_rgba(30,167,255,0.4)]'
                      : 'border-white/10 bg-black/40 text-slate-400 hover:text-white'
                  }`}
                >
                  {job.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Focused Showcase Window for Selected Job */}
            <SystemWindow
              title={jobsList[activeJobIndex].name}
              subtitle="CLASS DOSSIER"
              variant="blue"
            >
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 bg-black/60 border border-[#1EA7FF]/30 rounded text-center italic text-[#7FD4FF]">
                  {jobsList[activeJobIndex].quote}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white/[0.02] border border-white/10 rounded">
                    <span className="text-[10px] text-slate-400 uppercase">STAT BONUSES</span>
                    <div className="font-orbitron font-bold text-sm text-[#38FF9A] mt-0.5">
                      {jobsList[activeJobIndex].bonus}
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/10 rounded">
                    <span className="text-[10px] text-slate-400 uppercase">TRAINING FOCUS</span>
                    <div className="font-bold text-white text-xs mt-0.5">
                      {jobsList[activeJobIndex].focus}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed text-xs">
                  {jobsList[activeJobIndex].desc}
                </p>
              </div>
            </SystemWindow>
          </div>
        </section>

        {/* SECTION 6: "ARISE: YOUR SHADOW ARMY" */}
        <section className="scroll-mt-24 max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 border border-[#8B2CFF]/80 bg-[#050614]/90 chamfer-lg glow-border-purple text-center">
            <span className="text-[10px] font-mono text-[#D43BFF] tracking-[0.3em] uppercase">
              [05 • HABIT CONVERSION]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase glow-text-purple mt-1 mb-3">
              ARISE: YOUR SHADOW ARMY
            </h2>
            <p className="font-mono text-xs sm:text-sm text-purple-200/90 leading-relaxed mb-6 max-w-md mx-auto">
              Every habit you master becomes a loyal soldier in your army. Unbroken streaks compound into raw supernatural power.
            </p>

            {/* Soldiers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
              {[
                { name: 'Shadow Runner', habit: '5km Morning Run', power: '840 CP' },
                { name: 'Shadow Sleeper', habit: '8hr Deep Recovery', power: '1250 CP' },
                { name: 'Shadow Hydrator', habit: '3.5L Pure Water', power: '1800 CP' },
              ].map((s) => {
                const isUnlocked = extractedSoldiers.includes(s.name);
                return (
                  <div
                    key={s.name}
                    className={`p-3.5 border rounded transition-all ${
                      isUnlocked
                        ? 'border-[#D43BFF] bg-[#8B2CFF]/15'
                        : 'border-white/10 bg-black/60 opacity-40'
                    }`}
                  >
                    <div className="font-orbitron font-bold text-xs text-white">
                      {s.name}
                    </div>
                    <div className="text-[10px] font-mono text-purple-300 mt-1">
                      {s.habit}
                    </div>
                    <div className="text-[10px] font-mono text-[#38FF9A] font-semibold mt-1">
                      +{s.power}
                    </div>
                  </div>
                );
              })}
            </div>

            <SystemButton
              variant="purple"
              size="lg"
              pulsing={ariseEffect}
              onClick={handleExtractShadowDemo}
            >
              [ EXTRACT SHADOW: ARISE ]
            </SystemButton>
          </div>
        </section>

        {/* SECTION 7: "DUNGEONS & BOSSES" */}
        <section className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.3em] uppercase">
              [06 • HIGH-INTENSITY GATES]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-widest mt-1">
              GATES & DUNGEON RAIDS
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-sm mx-auto">
              High-intensity interval workouts stylized as lethal boss trials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 border border-[#1EA7FF]/50 bg-[#040c1c] rounded chamfer-sm">
              <div className="text-xs font-orbitron font-bold text-[#1EA7FF] mb-1">
                E-RANK GATE
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm mb-2">
                Goblin Outpost
              </h3>
              <p className="text-xs font-mono text-slate-400 mb-3">
                15-Min sprint. 100 Push-ups + 50 Squats.
              </p>
              <div className="text-xs font-mono text-[#38FF9A]">
                REWARD: +120 EXP
              </div>
            </div>

            <div className="p-5 border border-[#8B2CFF]/60 bg-[#060824] rounded chamfer-sm">
              <div className="text-xs font-orbitron font-bold text-[#D43BFF] mb-1">
                B-RANK DUNGEON
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm mb-2">
                Cerberus Chasm
              </h3>
              <p className="text-xs font-mono text-slate-400 mb-3">
                Zone 4 Aerobic threshold. 5km hill run.
              </p>
              <div className="text-xs font-mono text-[#38FF9A]">
                REWARD: +2,400 EXP
              </div>
            </div>

            <div className="p-5 border border-[#FF2D4B]/70 bg-[#120206] rounded chamfer-sm">
              <div className="text-xs font-orbitron font-bold text-[#FF2D4B] mb-1">
                S-RANK APEX BOSS
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm mb-2">
                Architect of Abyss
              </h3>
              <p className="text-xs font-mono text-slate-400 mb-3">
                Comprehensive muscular endurance trial.
              </p>
              <div className="text-xs font-mono text-[#FF2D4B] font-bold">
                REWARD: +25,000 EXP
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 & 9: LEADERBOARD & SYSTEM LOGS (Side by side clean integration) */}
        <section className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Leaderboard */}
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.2em] uppercase">
                [07 • GLOBAL ROSTER]
              </span>
              <h3 className="font-orbitron font-bold text-xl text-white tracking-wider mt-0.5">
                TOP HUNTERS
              </h3>
            </div>

            <div className="space-y-2 font-mono text-xs tabular-nums">
              {[
                { pos: 1, name: 'THOMAS_ANDREWS', rank: 'National' as HunterRank, cp: '84,200 CP' },
                { pos: 2, name: 'LIU_ZHIGANG', rank: 'National' as HunterRank, cp: '79,500 CP' },
                { pos: 3, name: 'CHA_HAE_IN', rank: 'S' as HunterRank, cp: '58,900 CP' },
                { pos: 1420, name: 'KAIEN JIN (YOU)', rank: 'E' as HunterRank, cp: '145 CP' },
              ].map((h) => (
                <div
                  key={h.name}
                  className={`p-3 border rounded flex items-center justify-between ${
                    h.name.includes('YOU')
                      ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 text-white font-bold'
                      : 'border-white/5 bg-black/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400 w-6">#{h.pos}</span>
                    <RankBadge rank={h.rank} size="sm" />
                    <span className="font-orbitron text-xs text-white truncate max-w-[120px]">
                      {h.name}
                    </span>
                  </div>
                  <span className="text-[#38FF9A] font-orbitron">{h.cp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Logs */}
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.2em] uppercase">
                [08 • FIELD LOGS]
              </span>
              <h3 className="font-orbitron font-bold text-xl text-white tracking-wider mt-0.5">
                TRANSMISSIONS
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 border-l-2 border-[#1EA7FF] bg-black/40 text-slate-300">
                <p className="italic mb-2">
                  &quot;[Hunter_Arjun reached Level 24.] In 90 days I shed 12kg of fat and logged 8,000 push-ups. When the System commands, you train.&quot;
                </p>
                <span className="text-[10px] text-slate-500">— ARJUN M.</span>
              </div>

              <div className="p-3.5 border-l-2 border-[#D43BFF] bg-black/40 text-slate-300">
                <p className="italic mb-2">
                  &quot;[Hunter_Marcus extracted Shadow Sleeper.] Knowing my 8 hours of sleep boosts my combat power stopped late-night scrolling.&quot;
                </p>
                <span className="text-[10px] text-slate-500">— MARCUS V.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: HUNTER LICENSES (Clean 3-Card Grid) */}
        <section className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#7FD4FF] tracking-[0.3em] uppercase">
              [09 • SYSTEM ACCESS]
            </span>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-widest mt-1">
              HUNTER LICENSES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Free */}
            <div className="p-6 border border-white/15 bg-black/50 rounded flex flex-col justify-between">
              <div>
                <div className="font-orbitron font-bold text-white text-xs mb-1">E-RANK APPRENTICE</div>
                <div className="font-orbitron text-2xl font-extrabold text-white mb-4 tabular-nums">$0</div>
                <ul className="space-y-2 text-xs font-mono text-slate-400 mb-6">
                  <li>• Daily Quests (Strength & Run)</li>
                  <li>• Live Stat Allocation</li>
                  <li>• 1 Shadow Habit Slot</li>
                </ul>
              </div>
              <SystemButton variant="ghost" fullWidth onClick={enterApp}>
                [ AWAKEN FREE ]
              </SystemButton>
            </div>

            {/* Pro */}
            <div className="p-6 border border-[#1EA7FF] bg-[#040c1c] rounded glow-border flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#1EA7FF] font-bold uppercase mb-1">RECOMMENDED</div>
                <div className="font-orbitron font-bold text-white text-xs mb-1">A-RANK PRO</div>
                <div className="font-orbitron text-2xl font-extrabold text-white mb-4 tabular-nums">$9.99<span className="text-xs font-normal text-slate-400">/mo</span></div>
                <ul className="space-y-2 text-xs font-mono text-slate-300 mb-6">
                  <li className="text-white font-semibold">• Unlimited Shadow Army</li>
                  <li className="text-white font-semibold">• Boss Fight Workout Mode</li>
                  <li>• 3 Monthly Rest Tokens</li>
                  <li>• Global Leaderboard Access</li>
                </ul>
              </div>
              <SystemButton variant="blue" fullWidth onClick={enterApp}>
                [ ACQUIRE LICENSE ]
              </SystemButton>
            </div>

            {/* Monarch */}
            <div className="p-6 border border-[#8B2CFF] bg-[#060824] rounded flex flex-col justify-between">
              <div>
                <div className="font-orbitron font-bold text-[#D43BFF] text-xs mb-1">S-RANK MONARCH</div>
                <div className="font-orbitron text-2xl font-extrabold text-white mb-4 tabular-nums">$19.99<span className="text-xs font-normal text-slate-400">/mo</span></div>
                <ul className="space-y-2 text-xs font-mono text-slate-400 mb-6">
                  <li>• Custom Monarch Violet HUD</li>
                  <li>• 1-on-1 AI Training Architect</li>
                  <li>• Infinite Rest Token Alchemy</li>
                </ul>
              </div>
              <SystemButton variant="purple" fullWidth onClick={enterApp}>
                [ BECOME SOVEREIGN ]
              </SystemButton>
            </div>
          </div>
        </section>

        {/* SECTION 11: FINAL CTA */}
        <section className="scroll-mt-24 pt-8 pb-12">
          <div className="max-w-lg mx-auto text-center">
            <SystemWindow
              title="THE CHOICE"
              subtitle="FINAL DIRECTIVE"
              variant="blue"
            >
              <div className="my-5">
                <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-[0.2em] uppercase glow-text mb-2">
                  DO YOU WISH TO BEGIN?
                </h2>
                <p className="font-mono text-xs text-slate-400">
                  [The System does not guarantee comfort. It guarantees results.]
                </p>
              </div>

              {finalDenied && (
                <div
                  role="alert"
                  className="p-3 mb-4 bg-[#FF2D4B]/20 border border-[#FF2D4B] text-[#FF2D4B] font-mono text-xs font-bold animate-glitch-shake"
                >
                  [Request denied. The Sovereign cannot retreat.]
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-6">
                <SystemButton
                  variant="blue"
                  size="lg"
                  fullWidth
                  onClick={enterApp}
                >
                  [ YES ]
                </SystemButton>
                <SystemButton
                  variant="ghost"
                  size="lg"
                  fullWidth
                  onClick={handleFinalNo}
                >
                  [ NO ]
                </SystemButton>
              </div>
            </SystemWindow>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            SYSTEM AWAKEN • SOVEREIGN PROTOCOL
          </div>
          <div className="text-[#1EA7FF] tracking-widest text-[11px]">
            [The System is watching.]
          </div>
        </div>
      </footer>
    </div>
  );
};
