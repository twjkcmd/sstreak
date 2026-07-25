import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ContributionGrid } from "@/components/ContributionGrid";
import { Card } from "@/components/ui/card";
import {
  Flame,
  Check,
  ChevronRight,
  Star,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { addDays, todayKey } from "@/lib/habits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShipStreak — Track streaks. Show them off." },
      {
        name: "description",
        content:
          "A habit-streak tracker for indie makers. GitHub-style heatmaps, live streak badges you can drop into any README.",
      },
      { property: "og:title", content: "ShipStreak — Track streaks. Show them off." },
      {
        property: "og:description",
        content:
          "Track daily coding, writing, and shipping habits. Share live streak badges anywhere.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

// Deterministic demo completion set: today, and various past days for a realistic heatmap.
const demoCompletions = (() => {
  const t = todayKey();
  const days: string[] = [];
  // pattern: skip about 20% randomly using deterministic seed
  for (let i = 0; i < 91; i++) {
    const d = addDays(t, -i);
    // seed based on i
    const skip = (i * 2654435761) % 5 === 0 || (i * 40503) % 7 === 6;
    if (!skip) days.push(d);
  }
  // ensure today included
  if (!days.includes(t)) days.unshift(t);
  return days;
})();

function Landing() {
  return (
    <div className="min-h-screen bg-background grain">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <Hero />
        <BelowHero />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <LogoMark />
          <span className="font-display text-2xl text-ink">ShipStreak</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/app">
              Start tracking free <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flame text-flame-foreground">
      <Flame className="h-4 w-4" fill="currentColor" />
    </span>
  );
}

function Hero() {
  return (
    <section className="hero-glow mt-16 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-mono text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-flame animate-pulse" />
          Track. Build. Share.
        </div>
        <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight text-ink md:text-7xl">
          Track streaks. <br />
          <span className="italic text-flame">Show them off.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          A daily-habit tracker built for indie makers. Log your streaks in one
          click, watch the contribution grid fill up, and embed live badges
          anywhere your readers can see them.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/app">
              Start tracking free <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full border border-border bg-background/60 backdrop-blur hover:bg-secondary"
          >
            See how it works
          </Button>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <div className="flex -space-x-2">
            {[
              "from-flame to-amber-300",
              "from-violet-bright to-indigo-400",
              "from-purple-400 to-pink-400",
              "from-blue-400 to-cyan-300",
            ].map((g, i) => (
              <div
                key={i}
                className={cn(
                  "h-9 w-9 rounded-full bg-gradient-to-br ring-2 ring-background",
                  g,
                )}
              />
            ))}
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-1 text-flame">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
              ))}
            </div>
            <div className="text-muted-foreground">
              Trusted by <span className="text-ink font-medium">500+ makers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:max-w-[520px] lg:justify-self-end w-full">
        <HeroDemoCard />
      </div>
    </section>
  );
}

function HeroDemoCard() {
  const completion = 78;
  return (
    <Card className="paper-card p-6 lg:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-2xl">
            📚
          </div>
          <div>
            <div className="font-display text-2xl text-ink leading-tight">
              Reading
            </div>
            <div className="flex items-center gap-1 text-sm text-flame font-mono">
              <Flame className="h-3.5 w-3.5" fill="currentColor" /> 24 day streak
            </div>
          </div>
        </div>
        <span className="rounded-full bg-flame/10 px-2.5 py-1 text-xs font-mono text-flame">
          on fire
        </span>
      </div>
      <div className="mt-6">
        <ContributionGrid
          habit={{ completions: demoCompletions }}
          monthLabels={["Mar", "Apr", "May", "Jun", "Jul"]}
        />
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3 border-t border-border pt-5">
        <DemoStat
          icon={<Flame className="h-3.5 w-3.5 text-flame" fill="currentColor" />}
          label="Current"
          value="24d"
        />
        <DemoStat
          icon={<Flame className="h-3.5 w-3.5 text-muted-foreground" />}
          label="Longest"
          value="41d"
        />
        <DemoStat
          icon={<Check className="h-3.5 w-3.5 text-mint" />}
          label="Total"
          value="71d"
        />
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Complete
          </div>
          <div className="mt-1 flex items-center gap-2">
            <CircularProgress value={completion} />
            <span className="font-display text-2xl text-ink leading-none">
              {completion}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function DemoStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1 font-display text-2xl text-ink leading-none">{value}</div>
    </div>
  );
}

function CircularProgress({ value }: { value: number }) {
  const r = 12;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" className="-rotate-90">
      <circle cx="15" cy="15" r={r} fill="none" stroke="var(--cell-0)" strokeWidth="3" />
      <circle
        cx="15"
        cy="15"
        r={r}
        fill="none"
        stroke="var(--violet-bright)"
        strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

function BelowHero() {
  return (
    <section className="mt-20 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
      <ActiveHabitsPanel />
      <BadgesPanel />
    </section>
  );
}

const demoHabits = [
  { emoji: "💻", name: "Ship code", streak: 42, pct: 88 },
  { emoji: "✍️", name: "Write daily", streak: 18, pct: 62 },
  { emoji: "🏃", name: "Morning run", streak: 7, pct: 34 },
];

function ActiveHabitsPanel() {
  return (
    <Card className="paper-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl text-ink">Active habits</h3>
          <p className="text-sm text-muted-foreground">
            One click a day. Watch the momentum build.
          </p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-mono text-muted-foreground">
          3 tracked
        </span>
      </div>
      <ul className="mt-6 divide-y divide-border">
        {demoHabits.map((h) => (
          <li key={h.name} className="flex items-center gap-4 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-xl">
              {h.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-display text-lg text-ink">{h.name}</div>
                <div className="flex items-center gap-1 text-sm text-flame font-mono">
                  <Flame className="h-3.5 w-3.5" fill="currentColor" />
                  {h.streak}d
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <SegmentedBar pct={h.pct} />
                <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                  {h.pct}%
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function SegmentedBar({ pct }: { pct: number }) {
  const segs = 20;
  const filled = Math.round((pct / 100) * segs);
  return (
    <div className="flex flex-1 gap-[3px]">
      {Array.from({ length: segs }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 flex-1 rounded-sm",
            i < filled ? "bg-violet-bright" : "bg-cell-0",
          )}
        />
      ))}
    </div>
  );
}

const demoBadges = [
  {
    icon: Star,
    title: "First spark",
    desc: "Logged your first day.",
    hue: "bg-flame/15 text-flame",
  },
  {
    icon: Flame,
    title: "7-day streak",
    desc: "A full week without breaking.",
    hue: "bg-flame/15 text-flame",
  },
  {
    icon: Trophy,
    title: "Consistency king",
    desc: "30 days of showing up.",
    hue: "bg-violet-bright/20 text-violet-bright",
  },
];

function BadgesPanel() {
  return (
    <Card className="paper-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl text-ink">Badges</h3>
          <p className="text-sm text-muted-foreground">Earn as you ship.</p>
        </div>
        <a className="text-sm text-flame hover:underline font-mono" href="#">
          View all
        </a>
      </div>
      <ul className="mt-6 space-y-4">
        {demoBadges.map((b) => (
          <li key={b.title} className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                b.hue,
              )}
            >
              <b.icon className="h-5 w-5" fill="currentColor" />
            </div>
            <div>
              <div className="font-medium text-ink">{b.title}</div>
              <div className="text-sm text-muted-foreground">{b.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-lg text-ink">ShipStreak</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-xs">
          <Sparkles className="h-3 w-3" /> Built for makers who ship.
        </div>
      </div>
    </footer>
  );
}
