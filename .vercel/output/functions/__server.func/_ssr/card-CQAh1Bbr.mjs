import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-CQAh1Bbr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "shipstreak.habits.v1";
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addDays(dateKey, delta) {
	const [y, m, d] = dateKey.split("-").map(Number);
	const dt = new Date(y, m - 1, d);
	dt.setDate(dt.getDate() + delta);
	return todayKey(dt);
}
function loadHabits() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function saveHabits(habits) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(KEY, JSON.stringify(habits));
}
function toggleCompletion(habit, dayKey) {
	const set = new Set(habit.completions);
	if (set.has(dayKey)) set.delete(dayKey);
	else set.add(dayKey);
	return {
		...habit,
		completions: [...set].sort()
	};
}
/**
* Current streak: counts consecutive days backward from today.
* A gap breaks it, but today ALWAYS counts as at least 1 if completed today.
* If today is completed, walk back day-by-day while completions exist.
* If today is NOT completed, streak = 0.
*/
function currentStreak(habit, today = todayKey()) {
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
function longestStreak(habit) {
	if (habit.completions.length === 0) return 0;
	const sorted = [...habit.completions].sort();
	let best = 1;
	let run = 1;
	for (let i = 1; i < sorted.length; i++) if (addDays(sorted[i - 1], 1) === sorted[i]) {
		run++;
		best = Math.max(best, run);
	} else run = 1;
	return best;
}
function totalDays(habit) {
	return habit.completions.length;
}
/** Build a 7 rows x 13 cols grid ending today (last 91 days). Each column is a calendar week (Mon-Sun). */
function buildGrid(habit, today = todayKey()) {
	const cols = 13;
	const rows = 7;
	const set = new Set(habit.completions);
	const [ty, tm, td] = today.split("-").map(Number);
	const todayDate = new Date(ty, tm - 1, td);
	(todayDate.getDay() + 6) % 7;
	const daysAgo = 90;
	const firstDate = new Date(todayDate);
	firstDate.setDate(firstDate.getDate() - daysAgo);
	const firstDow = (firstDate.getDay() + 6) % 7;
	const startDate = new Date(firstDate);
	startDate.setDate(startDate.getDate() - firstDow);
	const grid = Array.from({ length: rows }, () => new Array(cols).fill(null).map(() => ({
		key: "",
		done: false,
		date: "",
		isToday: false,
		isFuture: true
	})));
	let currentDate = new Date(startDate);
	let todayCol = -1;
	let todayRow = -1;
	for (let col = 0; col < cols; col++) for (let row = 0; row < rows; row++) {
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
			isFuture
		};
		currentDate.setDate(currentDate.getDate() + 1);
	}
	const monthLabels = [];
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	let lastMonth = -1;
	for (let col = 0; col < cols; col++) {
		const cell = grid[0][col];
		if (cell.date) {
			const [y, m, d] = cell.date.split("-").map(Number);
			const monthIndex = m - 1;
			if (monthIndex !== lastMonth) {
				monthLabels.push({
					label: monthNames[monthIndex],
					colIndex: col
				});
				lastMonth = monthIndex;
			}
		}
	}
	return {
		grid,
		monthLabels,
		todayCol,
		todayRow
	};
}
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
export { currentStreak as a, saveHabits as c, totalDays as d, uid as f, cn as i, todayKey as l, addDays as n, loadHabits as o, buildGrid as r, longestStreak as s, Card as t, toggleCompletion as u };
