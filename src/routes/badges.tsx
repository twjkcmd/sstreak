import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadHabits, type Habit } from "@/lib/habits";
import { achievements } from "@/lib/achievements";
import { Card } from "@/components/ui/card";
import { Flame, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/badges")({
  head: () => ({
    meta: [
      { title: "Badges · ShipStreak" },
      {
        name: "description",
        content: "View your achievements and badges earned through habit tracking.",
      },
      { property: "og:title", content: "Badges · ShipStreak" },
      {
        property: "og:description",
        content: "View your achievements and badges earned through habit tracking.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BadgesPage,
});

function BadgesPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHabits(loadHabits());
    setHydrated(true);
  }, []);

  const unlockedCount = achievements.filter((a) => a.isUnlocked(habits)).length;

  return (
    <div className="min-h-screen bg-background grain">
      <AppNav />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-6">
        <div className="mb-8">
          <h1 className="font-display text-4xl text-ink">Badges</h1>
          <p className="mt-1 text-muted-foreground">
            {hydrated
              ? `${unlockedCount} of ${achievements.length} achievements unlocked`
              : "Loading your achievements…"}
          </p>
        </div>

        {hydrated && habits.length === 0 ? (
          <Card className="paper-card flex flex-col items-center gap-4 p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-flame/10 text-flame">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink">No habits yet</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Add your first habit to start earning badges. One tiny action a day
                is all it takes.
              </p>
            </div>
            <Link
              to="/app"
              className="rounded-full bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Start tracking
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {achievements.map((achievement) => {
              const unlocked = achievement.isUnlocked(habits);
              return (
                <Card
                  key={achievement.id}
                  className={cn(
                    "paper-card p-6 transition-colors",
                    unlocked ? "" : "opacity-60",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                        unlocked ? achievement.hue : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {unlocked ? (
                        <achievement.icon className="h-5 w-5" />
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={cn(
                            "font-medium",
                            unlocked ? "text-ink" : "text-muted-foreground",
                          )}
                        >
                          {achievement.title}
                        </h3>
                        {unlocked && (
                          <span className="rounded-full bg-flame/10 px-2 py-0.5 text-xs font-mono text-flame">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-sm",
                          unlocked ? "text-muted-foreground" : "text-muted-foreground/70",
                        )}
                      >
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function AppNav() {
  const location = useLocation();
  const isHabitsActive = location.pathname === "/app";
  const isBadgesActive = location.pathname === "/badges";

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flame text-flame-foreground">
              <Flame className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-display text-2xl text-ink">ShipStreak</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link to="/app">
              <NavTab active={isHabitsActive}>Habits</NavTab>
            </Link>
            <Link to="/badges">
              <NavTab active={isBadgesActive}>Badges</NavTab>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavTab({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </div>
  );
}
