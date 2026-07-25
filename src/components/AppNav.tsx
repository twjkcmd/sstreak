import { Link, useLocation } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddHabitDialog } from "./AddHabitDialog";

type Props = {
  onCreate?: (h: { name: string; emoji: string }) => void;
};

export function AppNav({ onCreate }: Props) {
  const location = useLocation();
  const isHabitsActive = location.pathname === "/app";
  const isBadgesActive = location.pathname === "/badges";

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="ShipStreak" className="h-8 w-8" />
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
        {onCreate && <AddHabitDialog onCreate={onCreate} />}
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
    <button
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
