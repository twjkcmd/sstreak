export type Habit = {
  id: string;
  name: string;
  emoji: string;
  createdAt: string; // ISO date
  completions: string[]; // list of YYYY-MM-DD (deduped, sorted asc)
};

const KEY = "shipstreak.habits.v1";

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(dateKey: string, delta: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return todayKey(dt);
}

export function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Habit[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(habits));
}

export function toggleCompletion(habit: Habit, dayKey: string): Habit {
  const set = new Set(habit.completions);
  if (set.has(dayKey)) set.delete(dayKey);
  else set.add(dayKey);
  return { ...habit, completions: [...set].sort() };
}

/**
 * Current streak: counts consecutive days backward from today.
 * A gap breaks it, but today ALWAYS counts as at least 1 if completed today.
 * If today is completed, walk back day-by-day while completions exist.
 * If today is NOT completed, streak = 0.
 */
export function currentStreak(habit: Habit, today = todayKey()): number {
  const set = new Set(habit.completions);
  if (!set.has(today)) return 0;
  let count = 0;
  let cursor = today;
  while (set.has(cursor)) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return count;
}

export function longestStreak(habit: Habit): number {
  if (habit.completions.length === 0) return 0;
  const sorted = [...habit.completions].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (addDays(sorted[i - 1], 1) === sorted[i]) {
      run++;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }
  return best;
}

export function totalDays(habit: Habit): number {
  return habit.completions.length;
}

export type GridCell = {
  key: string;
  done: boolean;
  date: string;
  isToday: boolean;
  isFuture: boolean;
};

export type GridData = {
  grid: GridCell[][];
  monthLabels: { label: string; colIndex: number }[];
  todayCol: number;
  todayRow: number;
};

/** Build a 7 rows x 13 cols grid ending today (last 91 days). Each column is a calendar week (Mon-Sun). */
export function buildGrid(
  habit: Habit | { completions: string[] },
  today = todayKey(),
): GridData {
  const cols = 13;
  const rows = 7;
  const set = new Set(habit.completions);
  
  // Parse today's date
  const [ty, tm, td] = today.split("-").map(Number);
  const todayDate = new Date(ty, tm - 1, td);
  const todayDow = (todayDate.getDay() + 6) % 7; // Mon=0..Sun=6
  
  // Calculate end boundary: Sunday of the week containing today
  const endDate = new Date(todayDate);
  endDate.setDate(endDate.getDate() + (6 - todayDow)); // Move to Sunday
  
  // Calculate start: 13 full weeks (91 days) before the end Sunday
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (cols * rows - 1)); // 91 days back
  
  // Initialize grid
  const grid: GridCell[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(null).map(() => ({
      key: "",
      done: false,
      date: "",
      isToday: false,
      isFuture: true,
    }))
  );
  
  // Fill grid with actual dates
  let currentDate = new Date(startDate);
  let todayCol = -1;
  let todayRow = -1;
  
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const dateKey = todayKey(currentDate);
      const isToday = dateKey === today;
      const isFuture = currentDate > todayDate;
      
      if (isToday) {
        todayCol = col;
        todayRow = row;
      }
      
      grid[row][col] = {
        key: dateKey,
        done: !isFuture && set.has(dateKey),
        date: dateKey,
        isToday,
        isFuture,
      };
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  // Generate month labels - place label at the first column where the month changes
  const monthLabels: { label: string; colIndex: number }[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  let lastMonth = -1;
  for (let col = 0; col < cols; col++) {
    // Use the Monday of each week (row 0) to determine the month
    const cell = grid[0][col];
    if (cell.date) {
      const [y, m, d] = cell.date.split("-").map(Number);
      const monthIndex = m - 1;
      
      if (monthIndex !== lastMonth) {
        monthLabels.push({ label: monthNames[monthIndex], colIndex: col });
        lastMonth = monthIndex;
      }
    }
  }
  
  return {
    grid,
    monthLabels,
    todayCol,
    todayRow,
  };
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
