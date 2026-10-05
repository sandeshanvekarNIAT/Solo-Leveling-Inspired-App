'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PlayerProfile, 
  PlayerStats, 
  DailyQuest, 
  DungeonGate, 
  ShadowSoldier, 
  CraftItem, 
  ShopItem, 
  LeaderboardHunter, 
  SystemNotification,
  HunterRank,
  AwakeningPhase
} from '@/types/system';
import { 
  initialPlayerProfile, 
  initialDailyQuest, 
  initialDungeons, 
  initialShadowArmy, 
  initialCraftItems, 
  initialShopItems, 
  initialLeaderboard, 
  initialNotifications 
} from '@/lib/initialData';
import { soundManager } from '@/lib/sound';

type ViewMode = 'landing' | 'app';
type AppTab = 'status' | 'quests' | 'dungeons' | 'army' | 'shop';
type ActiveModalType = 
  | null 
  | 'workout' 
  | 'bossFight' 
  | 'penalty' 
  | 'license' 
  | 'onboarding' 
  | 'levelUp' 
  | 'rankUp' 
  | 'notifications';

interface SystemContextType {
  player: PlayerProfile;
  dailyQuest: DailyQuest;
  dungeons: DungeonGate[];
  shadowArmy: ShadowSoldier[];
  craftItems: CraftItem[];
  shopItems: ShopItem[];
  leaderboard: LeaderboardHunter[];
  notifications: SystemNotification[];
  viewMode: ViewMode;
  awakeningPhase: AwakeningPhase;
  currentTab: AppTab;
  activeModal: ActiveModalType;
  selectedGate: DungeonGate | null;
  selectedShadow: ShadowSoldier | null;
  audioMuted: boolean;
  activeThemeColor: string;
  // Actions
  setViewMode: (mode: ViewMode) => void;
  setAwakeningPhase: (phase: AwakeningPhase) => void;
  startAwakening: () => void;
  completeAwakening: () => void;
  skipAwakening: () => void;
  setCurrentTab: (tab: AppTab) => void;
  setActiveModal: (modal: ActiveModalType) => void;
  setSelectedGate: (gate: DungeonGate | null) => void;
  setSelectedShadow: (shadow: ShadowSoldier | null) => void;
  toggleAudio: () => void;
  setRankTheme: (rank: HunterRank) => void;
  allocatePoint: (stat: keyof PlayerStats) => void;
  toggleQuestTask: (taskId: string) => void;
  claimDailyQuestReward: () => void;
  logRep: (taskId: string, reps: number) => void;
  hitBoss: (damage: number) => void;
  extractShadow: (shadowId: string) => void;
  craftItem: (itemId: string) => void;
  buyShopItem: (itemId: string) => void;
  useRestToken: () => void;
  triggerLevelUp: () => void;
  triggerRankUp: (nextRank: HunterRank) => void;
  triggerPenalty: () => void;
  dismissPenalty: () => void;
  dismissNotification: (id: string) => void;
  enterApp: () => void;
  resetProgress: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

const RANK_COLORS: Record<HunterRank, string> = {
  E: '#1EA7FF',
  D: '#1EA7FF',
  C: '#1EA7FF',
  B: '#5E60FF',
  A: '#8B2CFF',
  S: '#A83BFF',
  National: '#D43BFF',
};

const NEXT_RANK: Record<HunterRank, HunterRank> = {
  E: 'D',
  D: 'C',
  C: 'B',
  B: 'A',
  A: 'S',
  S: 'National',
  National: 'National',
};

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerProfile>(initialPlayerProfile);
  const [dailyQuest, setDailyQuest] = useState<DailyQuest>(initialDailyQuest);
  const [dungeons, setDungeons] = useState<DungeonGate[]>(initialDungeons);
  const [shadowArmy, setShadowArmy] = useState<ShadowSoldier[]>(initialShadowArmy);
  const [craftItems, setCraftItems] = useState<CraftItem[]>(initialCraftItems);
  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems);
  const [leaderboard, setLeaderboard] = useState<LeaderboardHunter[]>(initialLeaderboard);
  const [notifications, setNotifications] = useState<SystemNotification[]>(initialNotifications);
  
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [awakeningPhase, setAwakeningPhase] = useState<AwakeningPhase>('idle');
  const [currentTab, setCurrentTab] = useState<AppTab>('status');
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [selectedGate, setSelectedGate] = useState<DungeonGate | null>(null);
  const [selectedShadow, setSelectedShadow] = useState<ShadowSoldier | null>(null);
  const [audioMuted, setAudioMuted] = useState<boolean>(true);
  const [activeThemeColor, setActiveThemeColor] = useState<string>(RANK_COLORS['E']);

  // Hydrate from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('system_player_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPlayer(parsed);
        setActiveThemeColor(RANK_COLORS[parsed.rank as HunterRank] || RANK_COLORS['E']);
      }
    } catch {}
  }, []);

  // Sync player profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('system_player_profile', JSON.stringify(player));
    } catch {}
  }, [player]);

  const toggleAudio = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.unlockAudio();
      soundManager.playTick();
    }
  };

  const setRankTheme = (rank: HunterRank) => {
    const color = RANK_COLORS[rank];
    setActiveThemeColor(color);
    document.documentElement.style.setProperty('--rank-accent', color);
  };

  const allocatePoint = (stat: keyof PlayerStats) => {
    if (player.availablePoints <= 0) return;
    soundManager.playStatGain();

    setPlayer((prev) => {
      const newStats = {
        ...prev.stats,
        [stat]: prev.stats[stat] + 1,
      };
      const newCp = prev.combatPower + 12;
      return {
        ...prev,
        stats: newStats,
        availablePoints: prev.availablePoints - 1,
        combatPower: newCp,
        hp: stat === 'vit' ? prev.hp + 20 : prev.hp,
        maxHp: stat === 'vit' ? prev.maxHp + 20 : prev.maxHp,
        mp: stat === 'int' ? prev.mp + 15 : prev.mp,
        maxMp: stat === 'int' ? prev.maxMp + 15 : prev.maxMp,
      };
    });
  };

  const toggleQuestTask = (taskId: string) => {
    soundManager.playTick();
    if (navigator?.vibrate) {
      navigator.vibrate(20);
    }

    setDailyQuest((prev) => {
      const updatedTasks = prev.tasks.map((task) => {
        if (task.id === taskId) {
          const nextCompleted = !task.completed;
          return {
            ...task,
            completed: nextCompleted,
            current: nextCompleted ? task.target : 0,
          };
        }
        return task;
      });

      const allDone = updatedTasks.every((t) => t.completed);
      if (allDone && !prev.allCompleted) {
        soundManager.playChime();
      }

      return {
        ...prev,
        tasks: updatedTasks,
        allCompleted: allDone,
      };
    });
  };

  const logRep = (taskId: string, amount: number) => {
    soundManager.playRepCount();
    setDailyQuest((prev) => {
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          const newCurrent = Math.min(t.target, t.current + amount);
          return {
            ...t,
            current: newCurrent,
            completed: newCurrent >= t.target,
          };
        }
        return t;
      });
      const allDone = updatedTasks.every((t) => t.completed);
      return {
        ...prev,
        tasks: updatedTasks,
        allCompleted: allDone,
      };
    });
  };

  const claimDailyQuestReward = () => {
    if (!dailyQuest.allCompleted || dailyQuest.claimed) return;
    soundManager.playLevelUp();
    setDailyQuest((prev) => ({ ...prev, claimed: true }));

    // Add EXP & Gold
    const totalExp = dailyQuest.tasks.reduce((acc, t) => acc + t.expReward, 0);
    const goldEarned = 250;

    setPlayer((prev) => {
      const nextExp = prev.exp + totalExp;
      let newLevel = prev.level;
      let availablePoints = prev.availablePoints;
      let maxExp = prev.maxExp;

      if (nextExp >= maxExp) {
        newLevel += 1;
        availablePoints += 3;
        maxExp = Math.floor(maxExp * 1.3);
      }

      return {
        ...prev,
        exp: nextExp % maxExp,
        maxExp,
        level: newLevel,
        availablePoints,
        gold: prev.gold + goldEarned,
        streakDays: prev.streakDays + 1,
        fatigue: Math.min(100, prev.fatigue + 15),
      };
    });

    // Notify
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '[DAILY QUEST CLEARED]',
        message: `+${totalExp} EXP and +${goldEarned} Gold credited to player balance. Streak increased to ${player.streakDays + 1} days.`,
        type: 'success',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const hitBoss = (damage: number) => {
    if (!selectedGate) return;
    soundManager.playRepCount();

    setSelectedGate((prev) => {
      if (!prev) return null;
      const nextHp = Math.max(0, prev.bossHp - damage);
      if (nextHp === 0 && !prev.cleared) {
        soundManager.playLevelUp();
        // Clear gate
        setDungeons((all) =>
          all.map((d) => (d.id === prev.id ? { ...d, cleared: true, bossHp: 0 } : d))
        );
        // Reward player
        setPlayer((pl) => ({
          ...pl,
          exp: pl.exp + prev.rewards.exp,
          gold: pl.gold + prev.rewards.gold,
        }));
      }
      return { ...prev, bossHp: nextHp, cleared: nextHp === 0 };
    });
  };

  const extractShadow = (shadowId: string) => {
    soundManager.playArise();
    if (navigator?.vibrate) {
      navigator.vibrate([100, 50, 200]);
    }

    setShadowArmy((prev) =>
      prev.map((s) => {
        if (s.id === shadowId) {
          return { ...s, unlocked: true };
        }
        return s;
      })
    );

    setPlayer((prev) => ({
      ...prev,
      shadowCount: prev.shadowCount + 1,
      combatPower: prev.combatPower + 650,
    }));

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '[SHADOW EXTRACTION: SUCCESSFUL]',
        message: 'A habit soldier has joined the Sovereign Legion. [ARISE]',
        type: 'rank',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const craftItem = (itemId: string) => {
    soundManager.playWindowOpen();
    setCraftItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, readyToCraft: false };
        }
        return item;
      })
    );

    if (itemId === 'craft-rest-token') {
      setPlayer((prev) => ({ ...prev, restTokens: prev.restTokens + 1 }));
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '[ALCHEMY COMPLETE]',
        message: 'Item has been synthesized and transferred to player inventory.',
        type: 'info',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const buyShopItem = (itemId: string) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item || player.gold < item.price || item.owned) return;

    soundManager.playStatGain();
    setPlayer((prev) => ({ ...prev, gold: prev.gold - item.price }));
    setShopItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, owned: true, equipped: true } : i))
    );

    if (item.previewColor) {
      setActiveThemeColor(item.previewColor);
    }
  };

  const useRestToken = () => {
    if (player.restTokens <= 0) return;
    soundManager.playChime();
    setPlayer((prev) => ({
      ...prev,
      restTokens: prev.restTokens - 1,
      penaltyActive: false,
      fatigue: Math.max(0, prev.fatigue - 30),
    }));
    setActiveModal(null);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '[REST TOKEN CONSUMED]',
        message: 'Daily punitive countdown negated. Muscular fatigue subsided.',
        type: 'info',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const triggerLevelUp = () => {
    soundManager.playLevelUp();
    setPlayer((prev) => ({
      ...prev,
      level: prev.level + 1,
      availablePoints: prev.availablePoints + 3,
      combatPower: prev.combatPower + 85,
      hp: prev.maxHp,
      mp: prev.maxMp,
    }));
    setActiveModal('levelUp');
  };

  const triggerRankUp = (nextRank: HunterRank) => {
    soundManager.playLevelUp();
    setRankTheme(nextRank);
    setPlayer((prev) => ({
      ...prev,
      rank: nextRank,
      title: nextRank === 'S' || nextRank === 'National' ? 'The Sovereign Monarch' : prev.title,
      combatPower: prev.combatPower + 2500,
      availablePoints: prev.availablePoints + 10,
    }));
    setActiveModal('rankUp');
  };

  const triggerPenalty = () => {
    soundManager.playGlitch();
    soundManager.playBassRumble();
    setPlayer((prev) => ({
      ...prev,
      penaltyActive: true,
      penaltiesIssued: prev.penaltiesIssued + 1,
      penaltyTimeRemaining: 14400, // 4 hours in penalty zone
    }));
    setActiveModal('penalty');
  };

  const dismissPenalty = () => {
    soundManager.playTick();
    setPlayer((prev) => ({ ...prev, penaltyActive: false }));
    setActiveModal(null);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const startAwakening = () => {
    soundManager.unlockAudio();
    setAudioMuted(false);
    setAwakeningPhase('glitch');
  };

  const completeAwakening = () => {
    setViewMode('app');
    setAwakeningPhase('unfolding');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setAwakeningPhase('done');
    }, 2200);
  };

  const skipAwakening = () => {
    soundManager.unlockAudio();
    soundManager.playWindowOpen();
    setViewMode('app');
    setAwakeningPhase('done');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enterApp = () => {
    startAwakening();
  };

  const resetProgress = () => {
    setPlayer(initialPlayerProfile);
    setDailyQuest(initialDailyQuest);
    setDungeons(initialDungeons);
    setShadowArmy(initialShadowArmy);
    setRankTheme('E');
    try {
      localStorage.removeItem('system_player_profile');
    } catch {}
  };

  return (
    <SystemContext.Provider
      value={{
        player,
        dailyQuest,
        dungeons,
        shadowArmy,
        craftItems,
        shopItems,
        leaderboard,
        notifications,
        viewMode,
        awakeningPhase,
        currentTab,
        activeModal,
        selectedGate,
        selectedShadow,
        audioMuted,
        activeThemeColor,
        setViewMode,
        setAwakeningPhase,
        startAwakening,
        completeAwakening,
        skipAwakening,
        setCurrentTab,
        setActiveModal,
        setSelectedGate,
        setSelectedShadow,
        toggleAudio,
        setRankTheme,
        allocatePoint,
        toggleQuestTask,
        claimDailyQuestReward,
        logRep,
        hitBoss,
        extractShadow,
        craftItem,
        buyShopItem,
        useRestToken,
        triggerLevelUp,
        triggerRankUp,
        triggerPenalty,
        dismissPenalty,
        dismissNotification,
        enterApp,
        resetProgress,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
