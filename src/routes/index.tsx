import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShipStreak — Track streaks. Show them off." },
      {
        name: "description",
        content:
          "A habit-streak tracker for indie makers. GitHub-style heatmaps, streak badges you can drop into any README.",
      },
      { property: "og:title", content: "ShipStreak — Track streaks. Show them off." },
      {
        property: "og:description",
        content:
          "Track daily coding, writing, and shipping habits. Share streak badges anywhere.",
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
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background grain">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <Hero onOpenHowItWorks={() => setHowItWorksOpen(true)} />
        <BelowHero />
      </main>
      <Footer />
      <HowItWorksDialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen} />
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
          <ThemeToggle />
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
  return <img src="/favicon.svg" alt="ShipStreak" className="h-8 w-8" />;
}

function Hero({ onOpenHowItWorks }: { onOpenHowItWorks: () => void }) {
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
          click, watch the contribution grid fill up, and embed badges
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
            onClick={onOpenHowItWorks}
          >
            See how it works
          </Button>
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
        <ContributionGrid habit={{ completions: demoCompletions }} />
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
        <Link to="/badges" className="text-sm text-flame hover:underline font-mono">
          View all
        </Link>
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

function HowItWorksDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md paper-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">How ShipStreak works</DialogTitle>
          <DialogDescription>
            Build streaks, show them off.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flame/10 text-flame">
              <span className="text-sm font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-ink">Add a habit</p>
              <p className="text-sm text-muted-foreground">Pick a name and emoji — takes 10 seconds.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flame/10 text-flame">
              <span className="text-sm font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-ink">Log daily</p>
              <p className="text-sm text-muted-foreground">Tap a day's square to mark it done. Miss a day and the streak resets.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flame/10 text-flame">
              <span className="text-sm font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-ink">Watch it grow</p>
              <p className="text-sm text-muted-foreground">Your contribution grid fills up as you build momentum.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flame/10 text-flame">
              <span className="text-sm font-bold">4</span>
            </div>
            <div>
              <p className="font-medium text-ink">Share your badge</p>
              <p className="text-sm text-muted-foreground">Generate a streak badge for your README once you've built a streak.</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-secondary/50 p-4">
            <p className="text-sm font-medium text-ink mb-2">Why ShipStreak?</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Simple, no-signup local tracking</li>
              <li>• GitHub-style contribution grid</li>
              <li>• Embeddable streak badges</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
