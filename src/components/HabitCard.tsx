import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContributionGrid } from "./ContributionGrid";
import { StreakBadge } from "./StreakBadge";
import {
  currentStreak,
  longestStreak,
  totalDays,
  type Habit,
} from "@/lib/habits";
import { Copy, Flame, MoreVertical, Trash2, Pencil, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  habit: Habit;
  onToggleDay: (dateKey: string) => void;
  onDelete: () => void;
  onRename: (name: string) => void;
};

export function HabitCard({ habit, onToggleDay, onDelete, onRename }: Props) {
  const cs = currentStreak(habit);
  const ls = longestStreak(habit);
  const td = totalDays(habit);
  const completion = Math.round((td / 91) * 100);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(habit.name);

  const embed = `![ShipStreak](${window.location.origin}/api/badge.svg?streak=${cs}&name=${encodeURIComponent(
    habit.name,
  )})`;

  function copyEmbed() {
    navigator.clipboard.writeText(embed).then(() => {
      toast.success("Badge copied", {
        description: "Paste it into your README or blog. Re-copy to update streak.",
      });
    });
  }

  return (
    <Card className="paper-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
            {habit.emoji}
          </div>
          <div>
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRename(name.trim() || habit.name);
                      setEditing(false);
                    }
                    if (e.key === "Escape") setEditing(false);
                  }}
                  className="border-b border-flame bg-transparent text-xl font-display outline-none"
                />
                <button
                  onClick={() => {
                    onRename(name.trim() || habit.name);
                    setEditing(false);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <h3 className="font-display text-2xl text-ink leading-tight">
                {habit.name}
              </h3>
            )}
            <div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
              <Flame
                className={cn("h-3.5 w-3.5", cs > 0 ? "text-flame" : "text-muted-foreground")}
                fill={cs > 0 ? "currentColor" : "none"}
              />
              <span className={cn("font-mono", cs > 0 && "text-flame font-medium")}>
                {cs} day{cs === 1 ? "" : "s"}
              </span>
              <span className="text-muted-foreground/50">·</span>
              <span className="font-mono">best {ls}</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <ContributionGrid habit={habit} onToggle={onToggleDay} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
        <Stat label="Current" value={cs} suffix="d" accent />
        <Stat label="Longest" value={ls} suffix="d" />
        <Stat label="Total" value={td} suffix="d" />
      </div>

      <div className="mt-5 rounded-xl bg-secondary/60 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Badge · {completion}% complete
          </span>
          <Button
            onClick={copyEmbed}
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <Copy className="mr-1 h-3 w-3" /> Copy embed
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <StreakBadge name={habit.name} streak={cs} />
          <code className="hidden truncate text-[10px] text-muted-foreground/70 md:block">
            {embed}
          </code>
        </div>
      </div>
    </Card>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 flex items-baseline gap-0.5">
        <span
          className={cn(
            "font-display text-3xl leading-none",
            accent ? "text-flame" : "text-ink",
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xs text-muted-foreground font-mono">{suffix}</span>
        )}
      </div>
    </div>
  );
}
