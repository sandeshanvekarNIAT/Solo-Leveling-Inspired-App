'use client';

import React, { useState, useEffect } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemButton } from './SystemButton';
import { Play, Pause, RotateCcw, CheckCircle, Zap } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const WorkoutActiveModal: React.FC = () => {
  const { dailyQuest, logRep, setActiveModal } = useSystem();
  
  // Default to first incomplete task or first task
  const activeTask = dailyQuest.tasks.find((t) => !t.completed) || dailyQuest.tasks[0];
  const [currentReps, setCurrentReps] = useState(activeTask ? activeTask.current : 0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Sync state if activeTask changes
  useEffect(() => {
    if (activeTask) {
      setCurrentReps(activeTask.current);
    }
  }, [activeTask]);

  // Workout stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleAddReps = (amount: number) => {
    if (!activeTask) return;
    soundManager.playRepCount();
    const next = Math.min(activeTask.target, currentReps + amount);
    setCurrentReps(next);
    logRep(activeTask.id, amount);
  };

  const percentage = activeTask ? Math.min(100, (currentReps / activeTask.target) * 100) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="workout-active-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4"
    >
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1EA7FF]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-lg w-full bg-[#040c1c] border-2 border-[#1EA7FF] p-6 sm:p-8 chamfer-lg glow-border text-center">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#1EA7FF]/30 pb-3 mb-6">
          <div className="text-[11px] font-mono text-[#7FD4FF] tracking-widest uppercase">
            [LIVE WORKOUT PROTOCOL]
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#38FF9A] animate-ping" aria-hidden="true" />
            <span>SESSION RUNNING</span>
          </div>
        </div>

        {/* Exercise Name */}
        <h2 id="workout-active-title" className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-[0.2em] uppercase glow-text mb-2">
          {activeTask ? activeTask.name : 'STRENGTH EXERCISE'}
        </h2>
        <div className="text-xs font-mono text-[#7FD4FF] mb-6 tabular-nums">
          [TARGET: {activeTask?.target} {activeTask?.unit.toUpperCase()}]
        </div>

        {/* Stopwatch Timer */}
        <div className="p-4 bg-black/60 border border-white/10 rounded-lg inline-block mb-6">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
            ELAPSED TIME
          </div>
          <div className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-widest tabular-nums">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Giant Rep Counter */}
        <div className="relative my-4 flex flex-col items-center justify-center" aria-live="polite">
          <div className="w-44 h-44 rounded-full border-4 border-[#1EA7FF]/30 flex flex-col items-center justify-center relative p-2 shadow-[0_0_20px_rgba(30,167,255,0.2)]">
            <div className="font-orbitron font-extrabold text-5xl sm:text-6xl text-white tabular-nums tracking-tight glow-text">
              {currentReps}
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tabular-nums">
              / {activeTask?.target} {activeTask?.unit}
            </div>

            {/* Circular completion ring indicator */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-4 border-[#38FF9A] pointer-events-none transition-all duration-300"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${
                  percentage > 25 ? '100% 0%, ' : ''
                }${percentage > 50 ? '100% 100%, ' : ''}${
                  percentage > 75 ? '0% 100%, ' : ''
                }0% 0%)`,
                opacity: percentage > 0 ? 1 : 0,
              }}
            />
          </div>
        </div>

        {/* Big Glowing Rep Increment Buttons */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <button
            type="button"
            aria-label="Add 1 repetition"
            onClick={() => handleAddReps(1)}
            className="py-3 px-2 bg-[#1EA7FF]/15 border border-[#1EA7FF] hover:bg-[#1EA7FF]/30 text-white font-orbitron font-bold text-lg rounded chamfer-sm transition-colors shadow-[0_0_10px_rgba(30,167,255,0.3)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            +1 REP
          </button>
          <button
            type="button"
            aria-label="Add 5 repetitions"
            onClick={() => handleAddReps(5)}
            className="py-3 px-2 bg-[#1EA7FF]/25 border-2 border-[#1EA7FF] hover:bg-[#1EA7FF]/40 text-white font-orbitron font-extrabold text-lg rounded chamfer-sm transition-colors shadow-[0_0_15px_rgba(30,167,255,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
          >
            +5 REPS
          </button>
          <button
            type="button"
            aria-label="Add 10 repetitions"
            onClick={() => handleAddReps(10)}
            className="py-3 px-2 bg-[#38FF9A]/20 border border-[#38FF9A] hover:bg-[#38FF9A]/35 text-[#38FF9A] font-orbitron font-extrabold text-lg rounded chamfer-sm transition-colors shadow-[0_0_15px_rgba(56,255,154,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A]"
          >
            +10 REPS
          </button>
        </div>

        {/* Stopwatch & Action Controls */}
        <div className="flex gap-2">
          <SystemButton
            variant="ghost"
            size="sm"
            aria-label={isRunning ? 'Pause workout stopwatch' : 'Resume workout stopwatch'}
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 flex items-center justify-center gap-1.5"
          >
            {isRunning ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
            <span>[{isRunning ? 'PAUSE' : 'RESUME'}]</span>
          </SystemButton>

          <SystemButton
            variant="blue"
            size="sm"
            fullWidth
            onClick={() => {
              soundManager.playLevelUp();
              setActiveModal(null);
            }}
            className="flex-1"
          >
            [ FINISH WORKOUT ]
          </SystemButton>
        </div>
      </div>
    </div>
  );
};
