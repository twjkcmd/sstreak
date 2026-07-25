import type { Habit } from "./habits";
import { currentStreak, longestStreak, totalDays, todayKey, addDays } from "./habits";
import { Star, Flame, Trophy, Sparkles, Layers, Target } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  hue: string;
  isUnlocked: (habits: Habit[]) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: "first-spark",
    title: "First spark",
    description: "Logged your first day.",
    icon: Star,
    hue: "bg-flame/15 text-flame",
    isUnlocked: (habits) => habits.some((h) => h.completions.length > 0),
  },
  {
    id: "7-day-streak",
    title: "7-day streak",
    description: "Any habit reaches a 7-day current or longest streak.",
    icon: Flame,
    hue: "bg-flame/15 text-flame",
    isUnlocked: (habits) =>
      habits.some((h) => currentStreak(h) >= 7 || longestStreak(h) >= 7),
  },
  {
    id: "30-day-streak",
    title: "30-day streak",
    description: "Any habit reaches a 30-day current or longest streak.",
    icon: Trophy,
    hue: "bg-violet-bright/20 text-violet-bright",
    isUnlocked: (habits) =>
      habits.some((h) => currentStreak(h) >= 30 || longestStreak(h) >= 30),
  },
  {
    id: "century",
    title: "Century",
    description: "100 total completions across all habits combined.",
    icon: Sparkles,
    hue: "bg-violet-bright/20 text-violet-bright",
    isUnlocked: (habits) => habits.reduce((sum, h) => sum + totalDays(h), 0) >= 100,
  },
  {
    id: "multi-tasker",
    title: "Multi-tasker",
    description: "3 or more habits tracked simultaneously.",
    icon: Layers,
    hue: "bg-flame/15 text-flame",
    isUnlocked: (habits) => habits.length >= 3,
  },
  {
    id: "perfect-week",
    title: "Perfect week",
    description: "All currently-tracked habits completed on all 7 of the last 7 days.",
    icon: Target,
    hue: "bg-violet-bright/20 text-violet-bright",
    isUnlocked: (habits) => {
      if (habits.length === 0) return false;
      const today = todayKey();
      const last7Days = new Set<string>();
      for (let i = 0; i < 7; i++) {
        last7Days.add(addDays(today, -i));
      }
      return habits.every((h) =>
        Array.from(last7Days).every((day) => h.completions.includes(day)),
      );
    },
  },
];
