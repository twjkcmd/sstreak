import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  loadHabits,
  saveHabits,
  toggleCompletion,
  currentStreak,
  todayKey,
  addDays,
  uid,
  type Habit,
} from "@/lib/habits";
import { AppNav } from "@/components/AppNav";
import { AddHabitDialog } from "@/components/AddHabitDialog";
import { HabitCard } from "@/components/HabitCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Calendar, Layers, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Your habits · ShipStreak" },
      {
        name: "description",
        content: "Track your daily habits, streaks, and share badges.",
      },
      { property: "og:title", content: "Your habits · ShipStreak" },
      {
        property: "og:description",
        content: "Track your daily habits, streaks, and share badges.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHabits(loadHabits());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveHabits(habits);
  }, [habits, hydrated]);

  function addHabit({ name, emoji }: { name: string; emoji: string }) {
    setHabits((prev) => [
      ...prev,
      {
        id: uid(),
        name,
        emoji,
        createdAt: new Date().toISOString(),
        completions: [todayKey()],
      },
    ]);
  }

  function toggleDay(id: string, day: string) {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? toggleCompletion(h, day) : h)),
    );
  }

  function removeHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function renameHabit(id: string, name: string) {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, name } : h)));
  }

  const totalHabits = habits.length;
  const bestStreak = habits.reduce(
    (max, h) => Math.max(max, currentStreak(h)),
    0,
  );
  const daysThisWeek = (() => {
    const t = todayKey();
    const week = new Set<string>();
    for (let i = 0; i < 7; i++) {
      const d = addDays(t, -i);
      if (habits.some((h) => h.completions.includes(d))) week.add(d);
    }
    return week.size;
  })();

  return (
    <div className="min-h-screen bg-background grain">
      <AppNav onCreate={addHabit} />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-6">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-ink">Your habits</h1>
          <p className="mt-1 text-muted-foreground">
            {hydrated
              ? "Click a square to log the day. Missed days break the streak — today always counts fresh."
              : "Loading your streaks…"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Layers className="h-4 w-4" />}
            label="Total habits"
            value={totalHabits}
          />
          <StatCard
            icon={<Flame className="h-4 w-4" fill="currentColor" />}
            label="Best current streak"
            value={bestStreak}
            suffix="d"
            accent
          />
          <StatCard
            icon={<Calendar className="h-4 w-4" />}
            label="Days tracked this week"
            value={daysThisWeek}
            suffix="/ 7"
          />
        </div>

        <div className="mt-8 space-y-5">
          {hydrated && habits.length === 0 ? (
            <EmptyState onCreate={addHabit} />
          ) : (
            habits.map((h) => (
              <HabitCard
                key={h.id}
                habit={h}
                onToggleDay={(d) => toggleDay(h.id, d)}
                onDelete={() => removeHabit(h.id)}
                onRename={(n) => renameHabit(h.id, n)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <Card className="paper-card p-5">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <span className={accent ? "text-flame" : undefined}>{icon}</span>
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className={cn(
            "font-display text-4xl leading-none",
            accent ? "text-flame" : "text-ink",
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-sm text-muted-foreground font-mono">{suffix}</span>
        )}
      </div>
    </Card>
  );
}

function EmptyState({
  onCreate,
}: {
  onCreate: (h: { name: string; emoji: string }) => void;
}) {
  return (
    <Card className="paper-card flex flex-col items-center gap-4 p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-flame/10 text-flame">
        <Sparkles className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display text-2xl text-ink">No habits yet</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Add your first habit to start a streak. One tiny action a day is all
          it takes.
        </p>
      </div>
      <AddHabitDialog
        onCreate={onCreate}
        trigger={
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Add first habit <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        }
      />
    </Card>
  );
}
