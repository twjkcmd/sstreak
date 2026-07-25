import { formatStreakText } from "@/lib/badge-svg";

type Props = {
  name: string;
  streak: number;
};

/** Shields.io-style inline SVG badge */
export function StreakBadge({ name, streak }: Props) {
  const label = `ShipStreak: ${name}`;
  const value = `🔥 ${formatStreakText(streak)}`;

  // approximate widths via char count
  const labelW = Math.max(72, label.length * 6.5 + 16);
  const valueW = Math.max(64, value.length * 7 + 16);
  const totalW = labelW + valueW;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={totalW}
      height={22}
      viewBox={`0 0 ${totalW} 22`}
      role="img"
      aria-label={`${label} ${value}`}
      className="rounded"
    >
      <linearGradient id="ss-b" x2="0" y2="100%">
        <stop offset="0" stopColor="#fff" stopOpacity=".2" />
        <stop offset="1" stopOpacity=".15" />
      </linearGradient>
      <clipPath id="ss-c">
        <rect width={totalW} height="22" rx="4" fill="#fff" />
      </clipPath>
      <g clipPath="url(#ss-c)">
        <rect width={labelW} height="22" fill="#2b2118" />
        <rect x={labelW} width={valueW} height="22" fill="#e5622a" />
        <rect width={totalW} height="22" fill="url(#ss-b)" />
      </g>
      <g
        fill="#fff"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', Consolas, monospace"
        fontSize="11"
      >
        <text x={labelW / 2} y="15">
          {label}
        </text>
        <text x={labelW + valueW / 2} y="15">
          {value}
        </text>
      </g>
    </svg>
  );
}
