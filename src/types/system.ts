export type HunterRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National';

export type HunterJob = 
  | 'None'
  | 'Shadow Monarch'
  | 'Void Assassin'
  | 'Dreadnought Berserker'
  | 'Aegis Knight'
  | 'Phantom Ranger'
  | 'Iron Monk'
  | 'Astral Healer';

export type AwakeningPhase = 'idle' | 'glitch' | 'void' | 'loading' | 'unfolding' | 'done';

export interface PlayerStats {
  str: number; // Strength
  agi: number; // Agility
  vit: number; // Vitality
  int: number; // Intelligence
  per: number; // Perception
}

export interface PlayerProfile {
  id: string;
  name: string;
  rank: HunterRank;
  level: number;
  job: HunterJob;
  title: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  fatigue: number;
  maxFatigue: number;
  exp: number;
  maxExp: number;
  stats: PlayerStats;
  availablePoints: number;
  combatPower: number;
  gold: number;
  restTokens: number;
  streakDays: number;
  shadowCount: number;
  penaltiesIssued: number;
  penaltyActive: boolean;
  penaltyTimeRemaining: number; // in seconds
  awakenedAt: string;
}

export interface QuestTask {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
  expReward: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  timeRemainingSeconds: number;
  tasks: QuestTask[];
  allCompleted: boolean;
  claimed: boolean;
}

export interface DungeonGate {
  id: string;
  name: string;
  rank: HunterRank;
  type: 'gate' | 'dungeon' | 'boss';
  description: string;
  recommendedLevel: number;
  bossName: string;
  bossHp: number;
  bossMaxHp: number;
  timeLimitSeconds: number;
  rewards: {
    exp: number;
    gold: number;
    shadowExtractable?: string;
  };
  cleared: boolean;
}

export interface ShadowSoldier {
  id: string;
  name: string;
  title: string;
  habit: string;
  streak: number;
  power: number;
  rank: HunterRank;
  unlocked: boolean;
  quote: string;
  iconType: 'blade' | 'speed' | 'sleep' | 'water' | 'shield' | 'mind';
}

export interface CraftIngredient {
  id: string;
  name: string;
  count: number;
  required: number;
  icon: string;
}

export interface CraftItem {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Monarch';
  ingredients: CraftIngredient[];
  readyToCraft: boolean;
  resultIcon: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'Theme' | 'Frame' | 'Title' | 'Soundpack';
  price: number;
  description: string;
  previewColor?: string;
  owned: boolean;
  equipped: boolean;
}

export interface LeaderboardHunter {
  id: string;
  name: string;
  rank: HunterRank;
  level: number;
  combatPower: number;
  title: string;
  job: string;
  guild: string;
  change: 'up' | 'down' | 'same';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger' | 'success' | 'rank';
  timestamp: string;
  read: boolean;
}
