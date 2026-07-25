import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as TooltipTrigger$1, i as TooltipProvider$1, n as TooltipContent$1, r as TooltipPortal, t as Tooltip$1 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ContributionGrid-ZOANfUYX.js
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
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
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
var TooltipProvider = TooltipProvider$1;
var Tooltip = Tooltip$1;
var TooltipTrigger = TooltipTrigger$1;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent$1, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = TooltipContent$1.displayName;
var DAY_LABELS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
function ContributionGrid({ habit, onToggle, showLabels = true, size = "md", interactive = true, showLegend = true }) {
	const { grid, monthLabels, todayCol, todayRow } = buildGrid(habit);
	const cols = grid[0]?.length ?? 0;
	const gapPx = size === "sm" ? 4 : 6;
	const formatDate = (dateKey) => {
		const [y, m, d] = dateKey.split("-").map(Number);
		return new Date(y, m - 1, d).toLocaleDateString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid w-full",
				style: {
					gridTemplateColumns: showLabels ? `auto repeat(${cols}, minmax(0, 1fr))` : `repeat(${cols}, minmax(0, 1fr))`,
					gridTemplateRows: `repeat(7, auto)`,
					gap: `${gapPx}px`
				},
				children: [showLabels && DAY_LABELS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center pr-2 font-mono text-[10px] leading-none text-muted-foreground/80",
					style: {
						gridColumn: 1,
						gridRow: i + 1
					},
					children: d
				}, d)), grid.map((row, rIdx) => row.map((c, cIdx) => {
					const isEmpty = c.date === "";
					const isToday = c.isToday;
					const isFuture = c.isFuture;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: isEmpty || !interactive || isFuture,
							onClick: () => c.date && onToggle?.(c.date),
							"aria-label": isToday ? "Today - click to log habit" : c.date ? `${formatDate(c.date)} - ${c.done ? "Completed" : "Missed"}` : "empty",
							style: {
								gridColumn: (showLabels ? 2 : 1) + cIdx,
								gridRow: rIdx + 1
							},
							className: cn("aspect-square min-w-0 rounded-[4px] transition-all duration-150", isEmpty ? "bg-transparent" : isFuture ? "bg-cell-0 opacity-30" : c.done ? "bg-violet-bright ring-1 ring-inset ring-white/10" : "bg-cell-0 hover:bg-cell-1", isToday && "ring-2 ring-flame ring-offset-2 ring-offset-background shadow-[0_0_8px_rgba(251,146,60,0.4)]", interactive && !isEmpty && !isFuture && "cursor-pointer hover:brightness-110")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Today - Click to log habit"
					}) : c.date ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: formatDate(c.date)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-80",
							children: c.done ? "✓ Completed" : "✗ Missed"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Empty" }) })] }, c.key);
				}))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 relative h-4 pl-8",
				children: monthLabels.map(({ label, colIndex }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute font-mono text-[11px] font-medium text-muted-foreground/80",
					style: { left: `${colIndex / cols * 100}%` },
					children: label
				}, label))
			}),
			showLegend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-4 pl-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						color: "bg-violet-bright",
						label: "Completed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						color: "bg-cell-0",
						label: "Missed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
						color: "bg-cell-0 ring-2 ring-flame ring-offset-2 ring-offset-background",
						label: "Today"
					})
				]
			})
		]
	}) });
}
function LegendItem({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-3 w-3 rounded-[3px]", color) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { cn as a, longestStreak as c, toggleCompletion as d, totalDays as f, addDays as i, saveHabits as l, Card as n, currentStreak as o, uid as p, ContributionGrid as r, loadHabits as s, Button as t, todayKey as u };
