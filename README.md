# 🔥 ShipStreak

A dead-simple, no-signup habit tracker for makers — log your streaks with one click, watch a GitHub-style contribution grid fill up, and embed a live badge of your streak right in your README.

**Live app:** [sstreak.vercel.app](https://sstreak.vercel.app)

## Why

Most habit trackers are mobile apps that lock your streak away in a private dashboard. ShipStreak is built for people who already live on GitHub — track your habit in the browser, no account needed, and show it off where your work already lives.

## Features

- 📊 GitHub-style contribution grid — click a square to log the day
- 🔥 Automatic current / longest / total streak calculation
- 🏆 Unlockable achievement badges (7-day streak, 30-day streak, and more)
- 🖼️ Embeddable streak badge for your own README or blog
- 💾 Fully local — your data stays in your browser, no account required

## Embed your streak badge

Open your habit in the app and hit **Copy embed** to get a Markdown snippet like this:

```md
![ShipStreak](https://sstreak.vercel.app/api/badge.svg?name=YourHabit&streak=7)
```

Example:

![ShipStreak](https://sstreak.vercel.app/api/badge.svg?streak=6&name=Vibe%20Coding)

The badge is a snapshot of your streak at copy-time (not a live-updating widget) — just re-copy it whenever you want to show an updated number.

## Running locally

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- Deployed on Vercel
