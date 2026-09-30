import { motion } from "framer-motion";

// Signature brand graphic: a converging ribbon of royal / electric / cyan bands
// sweeping from bottom-left to top-right, drawn in on load.
const band = (o, k = 0) =>
  `M -120 ${660 + o} C ${340 + k} ${600 + o * 0.92}, ${600 - k} ${230 + o * 0.72} 900 ${150 + o * 0.56} S 1170 ${170 + o * 0.5} 1340 ${290 + o * 0.46}`;

const bands = [
  { o: -96, w: 2, c: "cyan", op: 0.55 },
  { o: -74, w: 12, c: "electric", op: 0.9, k: 18 },
  { o: -52, w: 3, c: "white", op: 0.95 },
  { o: -38, w: 30, c: "royal", op: 1, k: -10 },
  { o: -4, w: 5, c: "sky", op: 0.95 },
  { o: 16, w: 46, c: "grad", op: 0.98, k: 12 },
  { o: 58, w: 8, c: "cyan", op: 0.85 },
  { o: 82, w: 22, c: "royal", op: 0.8, k: -16 },
  { o: 112, w: 3, c: "sky", op: 0.7 },
  { o: 134, w: 14, c: "electric", op: 0.5, k: 8 },
  { o: 164, w: 2, c: "royal", op: 0.35 },
];

const colors = { cyan: "#3ed3f0", electric: "#1f6bff", royal: "#1b3ed8", sky: "#7db8ff", white: "#ffffff", grad: "url(#ribbon-grad)" };

export const RibbonWave = ({ className = "", animate = true, id = "ribbon-grad" }) => (
  <svg className={`ribbon ${className}`} viewBox="0 0 1200 700" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#1b3ed8" />
        <stop offset="0.55" stopColor="#1f6bff" />
        <stop offset="1" stopColor="#3ed3f0" />
      </linearGradient>
      <filter id={`${id}-glow`} x="-10%" y="-40%" width="120%" height="180%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
    </defs>
    <path d={band(20, 10)} stroke={`url(#${id})`} strokeWidth="90" fill="none" opacity="0.22" filter={`url(#${id}-glow)`} />
    {bands.map((b, i) => (
      <motion.path
        key={i}
        d={band(b.o, b.k)}
        fill="none"
        stroke={b.c === "grad" ? `url(#${id})` : colors[b.c]}
        strokeWidth={b.w}
        strokeLinecap="round"
        opacity={b.op}
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: b.op } : undefined}
        transition={{ duration: 1.9, delay: 0.15 + i * 0.07, ease: [0.65, 0, 0.2, 1] }}
      />
    ))}
  </svg>
);
