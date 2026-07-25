import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as cn, i as addDays, n as Card, r as ContributionGrid, t as Button, u as todayKey } from "./ContributionGrid-ZOANfUYX.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles, g as ArrowRight, i as Star, l as Flame, m as Check, n as Trophy, p as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BAaiPMWf.js
var import_jsx_runtime = require_jsx_runtime();
var demoCompletions = (() => {
	const t = todayKey();
	const days = [];
	for (let i = 0; i < 91; i++) {
		const d = addDays(t, -i);
		if (!(i * 2654435761 % 5 === 0 || i * 40503 % 7 === 6)) days.push(d);
	}
	if (!days.includes(t)) days.unshift(t);
	return days;
})();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background grain",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-6 pb-24 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BelowHero, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "mx-auto max-w-7xl px-6 pt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl text-ink",
					children: "ShipStreak"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app",
						children: ["Start tracking free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
					})
				})
			})]
		})
	});
}
function LogoMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex h-8 w-8 items-center justify-center rounded-lg bg-flame text-flame-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
			className: "h-4 w-4",
			fill: "currentColor"
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hero-glow mt-16 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-mono text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-flame animate-pulse" }), "Track. Build. Share."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-6 font-display text-6xl leading-[0.95] tracking-tight text-ink md:text-7xl",
				children: [
					"Track streaks. ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-flame",
						children: "Show them off."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-lg text-lg text-muted-foreground",
				children: "A daily-habit tracker built for indie makers. Log your streaks in one click, watch the contribution grid fill up, and embed badges anywhere your readers can see them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app",
						children: ["Start tracking free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					variant: "ghost",
					className: "rounded-full border border-border bg-background/60 backdrop-blur hover:bg-secondary",
					children: "See how it works"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex -space-x-2",
					children: [
						"from-flame to-amber-300",
						"from-violet-bright to-indigo-400",
						"from-purple-400 to-pink-400",
						"from-blue-400 to-cyan-300"
					].map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-9 w-9 rounded-full bg-gradient-to-br ring-2 ring-background", g) }, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 text-flame",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							className: "h-3.5 w-3.5",
							fill: "currentColor"
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground",
						children: ["Trusted by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink font-medium",
							children: "500+ makers"
						})]
					})]
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:max-w-[520px] lg:justify-self-end w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDemoCard, {})
		})]
	});
}
function HeroDemoCard() {
	const completion = 78;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "paper-card p-6 lg:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-2xl",
						children: "📚"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl text-ink leading-tight",
						children: "Reading"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-sm text-flame font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							className: "h-3.5 w-3.5",
							fill: "currentColor"
						}), " 24 day streak"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-flame/10 px-2.5 py-1 text-xs font-mono text-flame",
					children: "on fire"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributionGrid, {
					habit: { completions: demoCompletions },
					monthLabels: [
						"Mar",
						"Apr",
						"May",
						"Jun",
						"Jul"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-4 gap-3 border-t border-border pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							className: "h-3.5 w-3.5 text-flame",
							fill: "currentColor"
						}),
						label: "Current",
						value: "24d"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-muted-foreground" }),
						label: "Longest",
						value: "41d"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoStat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-mint" }),
						label: "Total",
						value: "71d"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground",
						children: "Complete"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { value: completion }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-2xl text-ink leading-none",
							children: [completion, "%"]
						})]
					})] })
				]
			})
		]
	});
}
function DemoStat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground",
		children: [
			icon,
			" ",
			label
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 font-display text-2xl text-ink leading-none",
		children: value
	})] });
}
function CircularProgress({ value }) {
	const r = 12;
	const c = 2 * Math.PI * r;
	const offset = c - value / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "30",
		height: "30",
		viewBox: "0 0 30 30",
		className: "-rotate-90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "15",
			cy: "15",
			r,
			fill: "none",
			stroke: "var(--cell-0)",
			strokeWidth: "3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "15",
			cy: "15",
			r,
			fill: "none",
			stroke: "var(--violet-bright)",
			strokeWidth: "3",
			strokeDasharray: c,
			strokeDashoffset: offset,
			strokeLinecap: "round"
		})]
	});
}
function BelowHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-20 grid gap-6 lg:grid-cols-[1.7fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveHabitsPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgesPanel, {})]
	});
}
var demoHabits = [
	{
		emoji: "💻",
		name: "Ship code",
		streak: 42,
		pct: 88
	},
	{
		emoji: "✍️",
		name: "Write daily",
		streak: 18,
		pct: 62
	},
	{
		emoji: "🏃",
		name: "Morning run",
		streak: 7,
		pct: 34
	}
];
function ActiveHabitsPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "paper-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl text-ink",
				children: "Active habits"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "One click a day. Watch the momentum build."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-secondary px-3 py-1 text-xs font-mono text-muted-foreground",
				children: "3 tracked"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-border",
			children: demoHabits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-xl",
						children: h.emoji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg text-ink",
								children: h.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-sm text-flame font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
										className: "h-3.5 w-3.5",
										fill: "currentColor"
									}),
									h.streak,
									"d"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedBar, { pct: h.pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 text-right font-mono text-xs text-muted-foreground",
								children: [h.pct, "%"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
				]
			}, h.name))
		})]
	});
}
function SegmentedBar({ pct }) {
	const segs = 20;
	const filled = Math.round(pct / 100 * segs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 gap-[3px]",
		children: Array.from({ length: segs }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-2 flex-1 rounded-sm", i < filled ? "bg-violet-bright" : "bg-cell-0") }, i))
	});
}
var demoBadges = [
	{
		icon: Star,
		title: "First spark",
		desc: "Logged your first day.",
		hue: "bg-flame/15 text-flame"
	},
	{
		icon: Flame,
		title: "7-day streak",
		desc: "A full week without breaking.",
		hue: "bg-flame/15 text-flame"
	},
	{
		icon: Trophy,
		title: "Consistency king",
		desc: "30 days of showing up.",
		hue: "bg-violet-bright/20 text-violet-bright"
	}
];
function BadgesPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "paper-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl text-ink",
				children: "Badges"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Earn as you ship."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "text-sm text-flame hover:underline font-mono",
				href: "#",
				children: "View all"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-4",
			children: demoBadges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", b.hue),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, {
						className: "h-5 w-5",
						fill: "currentColor"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-ink",
					children: b.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: b.desc
				})] })]
			}, b.title))
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg text-ink",
					children: "ShipStreak"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 font-mono text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Built for makers who ship."]
			})]
		})
	});
}
//#endregion
export { Landing as component };
