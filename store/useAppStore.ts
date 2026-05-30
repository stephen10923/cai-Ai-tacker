import { create } from 'zustand';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface FoodLog {
  id: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: MealType;
  image_url?: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  target_calories: number;
  target_protein: number;
  target_carbs: number;
  target_fat: number;
  current_streak: number;
  avatar_url?: string;
}

interface AppState {
  user: UserProfile;
  todayLogs: FoodLog[];
  isOnboarded: boolean;

  // Computed helpers
  getTotals: () => { calories: number; protein: number; carbs: number; fat: number };
  addFoodLog: (log: FoodLog) => void;
  removeFoodLog: (id: string) => void;
  setOnboarded: (v: boolean) => void;
}

// ── Dummy seed data ──────────────────────────────────────────────
const DUMMY_USER: UserProfile = {
  id: 'demo-user-1',
  email: 'alex@example.com',
  name: 'Alex',
  target_calories: 2500,
  target_protein: 150,
  target_carbs: 280,
  target_fat: 80,
  current_streak: 7,
};

const DUMMY_LOGS: FoodLog[] = [
  {
    id: '1',
    food_name: 'Avocado Toast',
    calories: 320,
    protein: 8,
    carbs: 32,
    fat: 18,
    meal_type: 'breakfast',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    food_name: 'Greek Yogurt & Berries',
    calories: 180,
    protein: 14,
    carbs: 22,
    fat: 3,
    meal_type: 'breakfast',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    food_name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 42,
    carbs: 18,
    fat: 22,
    meal_type: 'lunch',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    food_name: 'Protein Shake',
    calories: 220,
    protein: 30,
    carbs: 12,
    fat: 4,
    meal_type: 'snacks',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    food_name: 'Salmon & Rice',
    calories: 580,
    protein: 45,
    carbs: 55,
    fat: 16,
    meal_type: 'dinner',
    created_at: new Date().toISOString(),
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  user: DUMMY_USER,
  todayLogs: DUMMY_LOGS,
  isOnboarded: true,

  getTotals: () => {
    const logs = get().todayLogs;
    return logs.reduce(
      (acc, log) => ({
        calories: acc.calories + log.calories,
        protein: acc.protein + log.protein,
        carbs: acc.carbs + log.carbs,
        fat: acc.fat + log.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  },

  addFoodLog: (log) =>
    set((state) => ({ todayLogs: [...state.todayLogs, log] })),

  removeFoodLog: (id) =>
    set((state) => ({
      todayLogs: state.todayLogs.filter((l) => l.id !== id),
    })),

  setOnboarded: (v) => set({ isOnboarded: v }),
}));
