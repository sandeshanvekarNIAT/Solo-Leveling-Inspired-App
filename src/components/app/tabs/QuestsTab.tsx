'use client';

import React, { useState, useEffect } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from '@/components/ui/SystemWindow';
import { SystemButton } from '@/components/ui/SystemButton';
import { 
  Flame, 
  Check, 
  AlertTriangle, 
  Clock, 
  Trophy, 
  Play, 
  Plus, 
  HeartHandshake, 
  Gift 
} from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const QuestsTab: React.FC = () => {
  const { 
    dailyQuest, 
    toggleQuestTask, 
    claimDailyQuestReward, 
    logRep, 
    setActiveModal,
    triggerPenalty,
    player
  } = useSystem();

  // Countdown timer to midnight
  const [secondsRemaining, setSecondsRemaining] = useState(dailyQuest.timeRemainingSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCriticalTime = secondsRemaining < 7200; // Under 2 hours turns red

  return (
    <div className="space-y-6">
      {/* Daily Quest Core System Window */}
      <SystemWindow
        title="QUEST INFO"
        subtitle="DAILY CONDITIONING"
        icon={<Flame className="w-4 h-4 text-[#1EA7FF]" />}
        variant="blue"
        headerRight={
          <div className={`flex items-center gap-1.5 font-orbitron text-xs px-2.5 py-1 border rounded ${
            isCriticalTime
              ? 'border-[#FF2D4B] bg-[#FF2D4B]/20 text-[#FF2D4B] animate-pulse glow-border-red'
              : 'border-[#1EA7FF]/50 bg-black/60 text-[#7FD4FF]'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums font-bold">{formatCountdown(secondsRemaining)}</span>
          </div>
        }
      >
        {/* Warning Alert if near midnight */}
        {isCriticalTime && (
          <div className="p-3 mb-4 bg-[#FF2D4B]/15 border border-[#FF2D4B] rounded text-xs font-mono text-red-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF2D4B] animate-pulse" aria-hidden="true" />
              <span>[CRITICAL WARNING: LESS THAN 2 HOURS REMAIN BEFORE PENALTY EXECUTION]</span>
            </span>
            <button
              type="button"
              onClick={triggerPenalty}
              aria-label="Preview Penalty Zone trial"
              className="text-[10px] text-red-400 hover:text-white underline uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D4B] rounded px-1"
            >
              [Preview Penalty Zone]
            </button>
          </div>
        )}

        <div className="border-b-2 border-double border-white/20 pb-2 mb-4">
          <h2 className="font-orbitron font-extrabold text-base sm:text-lg text-white tracking-widest uppercase">
            {dailyQuest.title}
          </h2>
          <p className="font-mono text-xs text-slate-300 mt-1">
            {dailyQuest.description}
          </p>
        </div>

        {/* Action Button: Start Workout Mode */}
        <div className="mb-6 flex gap-3">
          <SystemButton
            variant="blue"
            size="md"
            fullWidth
            onClick={() => setActiveModal('workout')}
            className="flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            <span>[ START FULLSCREEN WORKOUT MODE ]</span>
          </SystemButton>
        </div>

        {/* Tasks List */}
        <div className="space-y-3 mb-6" role="group" aria-label="Daily Conditioning Tasks">
          {dailyQuest.tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 border rounded transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                task.completed
                  ? 'border-[#38FF9A]/70 bg-[#38FF9A]/15 text-white'
                  : 'border-white/10 bg-black/50 text-slate-300 hover:border-[#1EA7FF]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Hollow checkbox toggle */}
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={task.completed}
                  onClick={() => toggleQuestTask(task.id)}
                  aria-label={`Mark ${task.name} as ${task.completed ? 'incomplete' : 'complete'}`}
                  className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A] ${
                    task.completed
                      ? 'border-[#38FF9A] bg-[#38FF9A] text-black shadow-[0_0_10px_#38FF9A]'
                      : 'border-slate-500 bg-transparent hover:border-[#1EA7FF]'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />}
                </button>

                <div>
                  <div className={`font-orbitron text-sm font-semibold tracking-wider ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {task.name}
                  </div>
                  <div className="font-mono text-xs text-slate-400 tabular-nums">
                    TARGET: {task.target} {task.unit.toUpperCase()} • EXP: +{task.expReward}
                  </div>
                </div>
              </div>

              {/* Rep Logging Quick Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="font-mono text-xs text-slate-400 mr-2 tabular-nums">
                  [{task.current} / {task.target}]
                </span>

                <button
                  type="button"
                  aria-label={`Log 5 reps for ${task.name}`}
                  onClick={() => logRep(task.id, 5)}
                  className="px-2 py-1 bg-[#1EA7FF]/20 border border-[#1EA7FF]/60 hover:bg-[#1EA7FF]/40 text-xs font-orbitron font-bold text-white rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF]"
                >
                  +5
                </button>

                <button
                  type="button"
                  aria-label={`Log 10 reps for ${task.name}`}
                  onClick={() => logRep(task.id, 10)}
                  className="px-2 py-1 bg-[#38FF9A]/20 border border-[#38FF9A]/60 hover:bg-[#38FF9A]/40 text-xs font-orbitron font-bold text-[#38FF9A] rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A]"
                >
                  +10
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Claim Rewards Banner when All Completed */}
        {dailyQuest.allCompleted && !dailyQuest.claimed && (
          <div className="p-4 mb-6 bg-gradient-to-r from-[#1EA7FF]/25 via-[#38FF9A]/25 to-[#1EA7FF]/25 border-2 border-[#38FF9A] rounded text-center animate-materialize">
            <Trophy className="w-8 h-8 text-[#38FF9A] mx-auto mb-2 animate-bounce" aria-hidden="true" />
            <div className="font-orbitron font-extrabold text-base text-white glow-text-green">
              [ALL DAILY OBJECTIVES ACHIEVED]
            </div>
            <div className="text-xs font-mono text-slate-300 mt-1 mb-3">
              Rewards ready for ingestion: +250 EXP, +250 Gold, +1 Streak Day.
            </div>

            <SystemButton
              variant="green"
              size="md"
              fullWidth
              onClick={claimDailyQuestReward}
              className="flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" aria-hidden="true" />
              <span>[ CLAIM QUEST REWARDS ]</span>
            </SystemButton>
          </div>
        )}

        {dailyQuest.claimed && (
          <div className="p-3 mb-6 bg-black/60 border border-[#38FF9A]/40 rounded text-center font-mono text-xs text-[#38FF9A]">
            [Daily Quest rewards claimed. Return tomorrow at 00:00 for the next trial.]
          </div>
        )}

        {/* Humane Safety Note: Rest Token */}
        <div className="p-3 bg-white/[0.02] border border-white/10 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <HeartHandshake className="w-4 h-4 text-[#38FF9A]" aria-hidden="true" />
            <span>Injury or Illness? Rest Tokens safeguard your streak.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#38FF9A] font-bold font-orbitron tabular-nums">{player.restTokens} TOKENS</span>
            <button
              type="button"
              onClick={() => setActiveModal('penalty')}
              aria-label="Use Rest Token in Penalty Zone"
              className="text-[10px] text-[#7FD4FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] rounded px-1"
            >
              [USE TOKEN]
            </button>
          </div>
        </div>
      </SystemWindow>
    </div>
  );
};
