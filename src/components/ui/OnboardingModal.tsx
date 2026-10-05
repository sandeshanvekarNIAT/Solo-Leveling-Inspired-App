'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemButton } from './SystemButton';
import { Sparkles, Activity, Dumbbell, Clock } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const OnboardingModal: React.FC = () => {
  const { player, setActiveModal } = useSystem();
  const [step, setStep] = useState(0);
  const [hunterName, setHunterName] = useState(player.name);
  const [pushupTier, setPushupTier] = useState('10-25 reps');
  const [squatTier, setSquatTier] = useState('20-40 reps');
  const [runTier, setRunTier] = useState('5-7 min / km');
  const [equipment, setEquipment] = useState('Bodyweight & Dumbbells');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleNext = () => {
    soundManager.playTick();
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      // Final calculation
      setIsCalculating(true);
      soundManager.playBassRumble();
      setTimeout(() => {
        soundManager.playLevelUp();
        setIsCalculating(false);
        setActiveModal(null);
      }, 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-step-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4"
    >
      <div className="relative max-w-lg w-full bg-[#040c1c] border-2 border-[#1EA7FF] p-6 sm:p-8 chamfer-lg glow-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1EA7FF]/30 pb-3 mb-6">
          <div className="text-[11px] font-mono text-[#7FD4FF] tracking-widest uppercase">
            [AWAKENING CALIBRATION PROTOCOL]
          </div>
          <div className="text-xs font-mono text-slate-400">
            PHASE {step + 1} / 4
          </div>
        </div>

        {isCalculating ? (
          <div className="py-12 text-center space-y-4" aria-live="polite">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-t-[#1EA7FF] border-r-transparent border-b-[#7FD4FF] border-l-transparent animate-spin" aria-hidden="true" />
            <h3 className="font-orbitron font-bold text-xl text-white glow-text">
              [CALIBRATING BIOMETRIC MATRIX…]
            </h3>
            <p className="font-mono text-xs text-slate-400 max-w-xs mx-auto">
              Scanning muscle fiber recruitment, cardiovascular threshold, and disciplinary resolve.
            </p>
          </div>
        ) : (
          <div>
            {/* Step 0: Name entry */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#7FD4FF]">
                  [STEP 1: IDENTITY REGISTRATION]
                </div>
                <h3 id="onboarding-step-title" className="font-orbitron font-bold text-xl sm:text-2xl text-white">
                  STATE YOUR HUNTER CALLSIGN
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  [The System requires a designated moniker for the Global Hunter Roster.]
                </p>
                <div className="pt-2">
                  <label htmlFor="hunterName" className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                    Hunter Moniker / Callsign:
                  </label>
                  <input
                    id="hunterName"
                    name="hunterName"
                    type="text"
                    value={hunterName}
                    onChange={(e) => setHunterName(e.target.value.toUpperCase())}
                    placeholder="ENTER HUNTER NAME…"
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full bg-black/80 border border-[#1EA7FF] px-4 py-3 text-white font-orbitron tracking-wider text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black chamfer-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Calisthenics Baseline */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#7FD4FF]">
                  [STEP 2: PHYSICAL POWER BASELINE]
                </div>
                <h3 id="onboarding-step-title" className="font-orbitron font-bold text-lg sm:text-xl text-white">
                  MAX CONSECUTIVE PUSH-UPS
                </h3>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {['< 10 reps (Novice)', '10-25 reps (Standard)', '25-50 reps (Veteran)', '50+ reps (Elite)'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={pushupTier === opt}
                      onClick={() => setPushupTier(opt)}
                      className={`p-3 text-left font-mono text-xs border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EA7FF] ${
                        pushupTier === opt
                          ? 'border-[#1EA7FF] bg-[#1EA7FF]/20 text-white shadow-[0_0_10px_#1EA7FF]'
                          : 'border-white/10 bg-black/50 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Cardio & Endurance */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#7FD4FF]">
                  [STEP 3: AEROBIC CAPACITY]
                </div>
                <h3 id="onboarding-step-title" className="font-orbitron font-bold text-lg sm:text-xl text-white">
                  1 KM SPRINT / RUN TIME
                </h3>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {['> 7 mins (Endurance Zero)', '5 - 7 mins (Combat Ready)', '4 - 5 mins (Speedster)', '< 4 mins (Apex Phantom)'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={runTier === opt}
                      onClick={() => setRunTier(opt)}
                      className={`p-3 text-left font-mono text-xs border rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38FF9A] ${
                        runTier === opt
                          ? 'border-[#38FF9A] bg-[#38FF9A]/20 text-[#38FF9A] shadow-[0_0_10px_#38FF9A]'
                          : 'border-white/10 bg-black/50 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Equipment & Setup */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#7FD4FF]">
                  [STEP 4: OPERATIONAL ARSENAL]
                </div>
                <h3 id="onboarding-step-title" className="font-orbitron font-bold text-lg sm:text-xl text-white">
                  EQUIPMENT ACCESS
                </h3>
                <div className="space-y-2 pt-2">
                  {['Bodyweight & Street Workout', 'Home Gym (Dumbbells / Pull-up bar)', 'Commercial Iron Gym'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={equipment === opt}
                      onClick={() => setEquipment(opt)}
                      className={`w-full p-3 text-left font-mono text-xs border rounded transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D43BFF] ${
                        equipment === opt
                          ? 'border-[#D43BFF] bg-[#8B2CFF]/25 text-white shadow-[0_0_12px_#D43BFF]'
                          : 'border-white/10 bg-black/50 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      <span>{opt}</span>
                      {equipment === opt && <Sparkles className="w-4 h-4 text-[#D43BFF]" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
              {step > 0 ? (
                <SystemButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep((s) => s - 1)}
                >
                  [ BACK ]
                </SystemButton>
              ) : (
                <div />
              )}

              <SystemButton
                variant="blue"
                size="md"
                onClick={handleNext}
              >
                {step === 3 ? '[ COMPLETE AWAKENING ]' : '[ PROCEED ]'}
              </SystemButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
