import React from "react";

/** Logo: amber ledger tile with ascending violet bars — numbers that grow. */
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Logo Consultant Fiscal Gebaila Livia">
      <defs>
        <linearGradient id="logo-au" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#logo-au)" />
      {/* ledger lines */}
      <rect x="9" y="10" width="14" height="2.6" rx="1.3" fill="#2e1065" opacity="0.55" />
      <rect x="9" y="16" width="10" height="2.6" rx="1.3" fill="#2e1065" opacity="0.35" />
      {/* ascending bars */}
      <rect x="10" y="30" width="6" height="9" rx="3" fill="#2e1065" />
      <rect x="20" y="24" width="6" height="15" rx="3" fill="#2e1065" />
      <rect x="30" y="17" width="6" height="22" rx="3" fill="#2e1065" />
      {/* growth tick */}
      <path d="M29 13 L35 9 L36.5 16" fill="none" stroke="#b01fd4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Logo />
      <span className="leading-tight">
        <span className={`block font-display text-lg font-bold ${light ? "text-white" : "text-ink"}`}>
          Gebaila Livia
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.22em] ${light ? "text-amber-400" : "text-violet-700"}`}>
          Consultant Fiscal
        </span>
      </span>
    </span>
  );
}

/* Brand background streaks — the diagonal "comets" from the original artwork, in code. */
const STREAKS: Array<[number, number, number, number, string, number]> = [
  // [x, y, width, height, color, opacity]
  [60, -80, 26, 340, "#ffffff", 0.85],
  [150, 120, 34, 260, "#a855f7", 0.5],
  [230, -40, 16, 420, "#be185d", 0.45],
  [330, 60, 44, 300, "#c084fc", 0.35],
  [430, -100, 22, 380, "#ffffff", 0.5],
  [520, 180, 30, 240, "#9333ea", 0.6],
  [610, -20, 14, 300, "#be123c", 0.4],
  [690, 90, 38, 340, "#d8b4fe", 0.3],
  [790, -60, 24, 280, "#ffffff", 0.75],
  [880, 140, 30, 320, "#a21caf", 0.5],
  [960, -30, 16, 240, "#e879f9", 0.45],
  [1050, 80, 40, 360, "#7e22ce", 0.55],
  [1140, -90, 22, 300, "#ffffff", 0.6],
  [1230, 130, 28, 260, "#be185d", 0.35],
  [1320, 0, 34, 380, "#c084fc", 0.4],
  [1420, 90, 18, 280, "#ffffff", 0.8],
];

export function Streaks() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute -inset-[20%] h-[140%] w-[140%] animate-streak motion-reduce:animate-none"
        viewBox="0 0 1500 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* soft translucent discs */}
        <circle cx="380" cy="560" r="230" fill="#a855f7" opacity="0.18" />
        <circle cx="900" cy="640" r="280" fill="#c026d3" opacity="0.14" />
        <circle cx="1180" cy="300" r="180" fill="#8b5cf6" opacity="0.16" />
        <g transform="rotate(38 750 450)">
          {STREAKS.map(([x, y, w, h, fill, o], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx={w / 2} fill={fill} opacity={o} />
          ))}
        </g>
      </svg>
    </div>
  );
}

/** TikTok mark — lucide has no TikTok icon. */
export function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="TikTok">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.9-2.9c.28 0 .56.04.83.12V9.4a6.34 6.34 0 0 0-.83-.05 6.33 6.33 0 1 0 6.33 6.33V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75c-.34 0-.66-.02-.98-.06Z" />
    </svg>
  );
}
