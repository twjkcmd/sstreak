/**
 * Generate SVG badge markup for ShipStreak badges
 * Shared between client-side React component and server-side API route
 */

export interface BadgeSvgOptions {
  name: string;
  streak: number;
}

/**
 * Escape XML/SVG special characters to prevent injection
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Sanitize and validate badge parameters
 */
export function sanitizeBadgeParams(name: string, streak: string | number): BadgeSvgOptions {
  // Validate streak
  const streakNum = typeof streak === 'number' ? streak : parseInt(streak, 10);
  const validStreak = isNaN(streakNum) || streakNum < 0 ? 0 : streakNum;
  
  // Validate and sanitize name
  const sanitizedName = (name || 'Habit')
    .trim()
    .slice(0, 50); // Cap length to prevent SVG layout breaking
  
  return {
    name: escapeXml(sanitizedName),
    streak: validStreak,
  };
}

/**
 * Generate SVG badge string
 */
export function generateBadgeSvg({ name, streak }: BadgeSvgOptions): string {
  const label = `ShipStreak: ${name}`;
  const value = `🔥 ${streak} days`;

  // approximate widths via char count (same logic as StreakBadge.tsx)
  const labelW = Math.max(72, label.length * 6.5 + 16);
  const valueW = Math.max(64, value.length * 7 + 16);
  const totalW = labelW + valueW;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="22" viewBox="0 0 ${totalW} 22" role="img" aria-label="${label} ${value}">
  <linearGradient id="ss-b" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".2" />
    <stop offset="1" stop-opacity=".15" />
  </linearGradient>
  <clipPath id="ss-c">
    <rect width="${totalW}" height="22" rx="4" fill="#fff" />
  </clipPath>
  <g clip-path="url(#ss-c)">
    <rect width="${labelW}" height="22" fill="#2b2118" />
    <rect x="${labelW}" width="${valueW}" height="22" fill="#e5622a" />
    <rect width="${totalW}" height="22" fill="url(#ss-b)" />
  </g>
  <g fill="#fff" text-anchor="middle" font-family="'JetBrains Mono', Consolas, monospace" font-size="11">
    <text x="${labelW / 2}" y="15">${label}</text>
    <text x="${labelW + valueW / 2}" y="15">${value}</text>
  </g>
</svg>`;
}
