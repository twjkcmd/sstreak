import { buildGrid, type Habit } from "@/lib/habits";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  habit: Pick<Habit, "completions">;
  onToggle?: (dateKey: string) => void;
  showLabels?: boolean;
  size?: "sm" | "md";
  interactive?: boolean;
  showLegend?: boolean;
};

export function ContributionGrid({
  habit,
  onToggle,
  showLabels = true,
  size = "md",
  interactive = true,
  showLegend = true,
}: Props) {
  const { grid, monthLabels, todayCol, todayRow } = buildGrid(habit);
  const cols = grid[0]?.length ?? 0;
  const gapPx = size === "sm" ? 4 : 6;

  const formatDate = (dateKey: string) => {
    const [y, m, d] = dateKey.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <TooltipProvider>
      <div className="flex w-full min-w-0 flex-col">
        <div
          className="grid w-full min-w-0"
          style={{
            gridTemplateColumns: showLabels
              ? `auto repeat(${cols}, minmax(0, 1fr))`
              : `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(7, auto)`,
            gap: `${gapPx}px`,
          }}
        >
          {showLabels &&
            DAY_LABELS.map((d, i) => (
              <div
                key={d}
                className="flex items-center pr-2 font-mono text-[10px] leading-none text-muted-foreground/80"
                style={{ gridColumn: 1, gridRow: i + 1 }}
              >
                {d}
              </div>
            ))}
          {grid.map((row, rIdx) =>
            row.map((c, cIdx) => {
              const isEmpty = c.date === "";
              const isToday = c.isToday;
              const isFuture = c.isFuture;

              return (
                <Tooltip key={c.key}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      disabled={isEmpty || !interactive || isFuture}
                      onClick={() => c.date && onToggle?.(c.date)}
                      aria-label={
                        isToday
                          ? "Today - click to log habit"
                          : c.date
                            ? `${formatDate(c.date)} - ${c.done ? "Completed" : "Missed"}`
                            : "empty"
                      }
                      style={{
                        gridColumn: (showLabels ? 2 : 1) + cIdx,
                        gridRow: rIdx + 1,
                      }}
                      className={cn(
                        "aspect-square min-w-0 rounded-[4px] transition-all duration-150",
                        isEmpty
                          ? "bg-transparent"
                          : isFuture
                            ? "bg-cell-0 opacity-30"
                            : c.done
                              ? "bg-violet-bright ring-1 ring-inset ring-white/10"
                              : "bg-cell-0 hover:bg-cell-1",
                        isToday &&
                          "ring-2 ring-inset ring-flame shadow-[0_0_8px_rgba(251,146,60,0.4)]",
                        interactive && !isEmpty && !isFuture && "cursor-pointer hover:brightness-110",
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {isToday ? (
                      <p className="font-medium">Today - Click to log habit</p>
                    ) : c.date ? (
                      <div className="space-y-0.5">
                        <p className="font-medium">{formatDate(c.date)}</p>
                        <p className="text-xs opacity-80">
                          {c.done ? "✓ Completed" : "✗ Missed"}
                        </p>
                      </div>
                    ) : (
                      <p>Empty</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }),
          )}
        </div>
        
        {/* Month labels aligned with columns */}
        <div className="mt-2 relative h-4 pl-8">
          {monthLabels.map(({ label, colIndex }) => (
            <span
              key={label}
              className="absolute font-mono text-[11px] font-medium text-muted-foreground/80"
              style={{
                left: `${(colIndex / cols) * 100}%`,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="mt-4 flex items-center gap-4 pl-8">
            <LegendItem color="bg-violet-bright" label="Completed" />
            <LegendItem color="bg-cell-0" label="Missed" />
            <LegendItem color="bg-cell-0 ring-2 ring-flame ring-offset-2 ring-offset-background" label="Today" />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-3 w-3 rounded-[3px]", color)} />
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
