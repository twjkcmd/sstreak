import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as currentStreak, d as totalDays, i as cn, l as todayKey, n as addDays, o as loadHabits, s as longestStreak, t as Card } from "./card-CQAh1Bbr.mjs";
import { g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star, d as Flame, i as Target, l as Lock, n as Trophy, o as Sparkles, u as Layers } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.badges-BUtrGDS1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var achievements = [
	{
		id: "first-spark",
		title: "First spark",
		description: "Logged your first day.",
		icon: Star,
		hue: "bg-flame/15 text-flame",
		isUnlocked: (habits) => habits.some((h) => h.completions.length > 0)
	},
	{
		id: "7-day-streak",
		title: "7-day streak",
		description: "Any habit reaches a 7-day current or longest streak.",
		icon: Flame,
		hue: "bg-flame/15 text-flame",
		isUnlocked: (habits) => habits.some((h) => currentStreak(h) >= 7 || longestStreak(h) >= 7)
	},
	{
		id: "30-day-streak",
		title: "30-day streak",
		description: "Any habit reaches a 30-day current or longest streak.",
		icon: Trophy,
		hue: "bg-violet-bright/20 text-violet-bright",
		isUnlocked: (habits) => habits.some((h) => currentStreak(h) >= 30 || longestStreak(h) >= 30)
	},
	{
		id: "century",
		title: "Century",
		description: "100 total completions across all habits combined.",
		icon: Sparkles,
		hue: "bg-violet-bright/20 text-violet-bright",
		isUnlocked: (habits) => habits.reduce((sum, h) => sum + totalDays(h), 0) >= 100
	},
	{
		id: "multi-tasker",
		title: "Multi-tasker",
		description: "3 or more habits tracked simultaneously.",
		icon: Layers,
		hue: "bg-flame/15 text-flame",
		isUnlocked: (habits) => habits.length >= 3
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
			const last7Days = /* @__PURE__ */ new Set();
			for (let i = 0; i < 7; i++) last7Days.add(addDays(today, -i));
			return habits.every((h) => Array.from(last7Days).every((day) => h.completions.includes(day)));
		}
	}
];
function BadgesPage() {
	const [habits, setHabits] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHabits(loadHabits());
		setHydrated(true);
	}, []);
	const unlockedCount = achievements.filter((a) => a.isUnlocked(habits)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background grain",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-4xl px-6 pb-24 pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl text-ink",
					children: "Badges"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: hydrated ? `${unlockedCount} of ${achievements.length} achievements unlocked` : "Loading your achievements…"
				})]
			}), hydrated && habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "paper-card flex flex-col items-center gap-4 p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-flame/10 text-flame",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl text-ink",
						children: "No habits yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-sm text-sm text-muted-foreground",
						children: "Add your first habit to start earning badges. One tiny action a day is all it takes."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app",
						className: "rounded-full bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90",
						children: "Start tracking"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: achievements.map((achievement) => {
					const unlocked = achievement.isUnlocked(habits);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: cn("paper-card p-6 transition-colors", unlocked ? "" : "opacity-60"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", unlocked ? achievement.hue : "bg-secondary text-muted-foreground"),
								children: unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(achievement.icon, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: cn("font-medium", unlocked ? "text-ink" : "text-muted-foreground"),
										children: achievement.title
									}), unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-flame/10 px-2 py-0.5 text-xs font-mono text-flame",
										children: "Unlocked"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-sm", unlocked ? "text-muted-foreground" : "text-muted-foreground/70"),
									children: achievement.description
								})]
							})]
						})
					}, achievement.id);
				})
			})]
		})]
	});
}
function AppNav() {
	const location = useLocation();
	const isHabitsActive = location.pathname === "/app";
	const isBadgesActive = location.pathname === "/app/badges";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-border bg-background/80 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-flame text-flame-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							className: "h-4 w-4",
							fill: "currentColor"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-ink",
						children: "ShipStreak"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavTab, {
							active: isHabitsActive,
							children: "Habits"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/badges",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavTab, {
							active: isBadgesActive,
							children: "Badges"
						})
					})]
				})]
			})
		})
	});
}
function NavTab({ children, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-full px-3.5 py-1.5 text-sm transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
		children
	});
}
//#endregion
export { BadgesPage as component };
