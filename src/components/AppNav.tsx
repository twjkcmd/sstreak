import { Link, useLocation } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddHabitDialog } from "./AddHabitDialog";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  onCreate?: (h: { name: string; emoji: string }) => void;
};

export function AppNav({ onCreate }: Props) {
  const location = useLocation();
  const isHabitsActive = location.pathname === "/app";
  const isBadgesActive = location.pathname === "/badges";

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="ShipStreak" className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="font-display text-xl text-ink sm:text-2xl">ShipStreak</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/app">
              <NavTab active={isHabitsActive}>Habits</NavTab>
            </Link>
            <Link to="/badges">
              <NavTab active={isBadgesActive}>Badges</NavTab>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {onCreate && <AddHabitDialog onCreate={onCreate} />}
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
