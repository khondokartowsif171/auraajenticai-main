// Inline SVG icons — single stroke, 1.5px, sized 1em via currentColor
const Icon = ({ d, size = 16, fill, stroke = "currentColor", strokeWidth = 1.5, children, viewBox = "0 0 24 24", style }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill={fill || "none"}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></Icon>,
  Moon: (p) => <Icon {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></Icon>,
  Command: (p) => <Icon {...p}><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></Icon>,
  Arrow: (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7" /></Icon>,
  ArrowUpRight: (p) => <Icon {...p}><path d="M7 17 17 7M8 7h9v9" /></Icon>,
  Github: (p) => <Icon {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Icon>,
  LinkedIn: (p) => <Icon {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></Icon>,
  Twitter: (p) => <Icon {...p}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></Icon>,
  Mail: (p) => <Icon {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></Icon>,
  Sparkles: (p) => <Icon {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></Icon>,
  Bolt: (p) => <Icon {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></Icon>,
  Code: (p) => <Icon {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Icon>,
  Cube: (p) => <Icon {...p}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22.08V12" /></Icon>,
  Cpu: (p) => <Icon {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></Icon>,
  Server: (p) => <Icon {...p}><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" /></Icon>,
  Database: (p) => <Icon {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></Icon>,
  Cloud: (p) => <Icon {...p}><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78 7 7 0 1 0-12.05 5.78" /></Icon>,
  Box: (p) => <Icon {...p}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM7.5 4.21l9 5.19M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" /></Icon>,
  Wallet: (p) => <Icon {...p}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></Icon>,
  Zap: (p) => <Icon {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></Icon>,
  Layers: (p) => <Icon {...p}><path d="m12 2 10 6.5-10 6.5L2 8.5 12 2z" /><path d="m2 17.5 10 6.5 10-6.5M2 13l10 6.5L22 13" /></Icon>,
  Check: (p) => <Icon {...p}><path d="m20 6-11 11-5-5" /></Icon>,
  Dot: (p) => <Icon {...p}><circle cx="12" cy="12" r="3" fill="currentColor" /></Icon>,
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon>,
  Send: (p) => <Icon {...p}><path d="m22 2-7 20-4-9-9-4 20-7z" /></Icon>,
  Globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Icon>,
  Terminal: (p) => <Icon {...p}><path d="m4 17 6-6-6-6M12 19h8" /></Icon>,
  Logo: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logoG" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="none" stroke="url(#logoG)" strokeWidth="1.5" />
      <path d="M10 22 L16 8 L22 22 M12.5 17 H19.5" stroke="url(#logoG)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

window.Icons = Icons;
