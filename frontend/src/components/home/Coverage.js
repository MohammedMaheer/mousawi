import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, MapPin } from "lucide-react";
import { Lines, Reveal } from "./Motion";
import { caseStudies, coverageLocations } from "@/data/home";

const hq = coverageLocations[0];
const link = (n) => {
  const cx = (hq.x + n.x) / 2 + (n.y - hq.y) * 0.22;
  const cy = (hq.y + n.y) / 2 - (n.x - hq.x) * 0.22;
  return `M ${hq.x} ${hq.y} Q ${cx} ${cy} ${n.x} ${n.y}`;
};

const Schematic = ({ selected, onSelect }) => (
  <svg className="schematic" viewBox="0 0 640 420" role="group" aria-label="Almousawi operating footprint" data-testid="coverage-schematic">
    <defs>
      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#c9d6e6" /></pattern>
      <linearGradient id="link-grad" x1="0" x2="1"><stop offset="0" stopColor="#1b3ed8" /><stop offset="1" stopColor="#3ed3f0" /></linearGradient>
    </defs>
    <rect width="640" height="420" fill="url(#dots)" />
    {[70, 140, 210].map((r) => <circle key={r} cx={hq.x} cy={hq.y} r={r} className="range-ring" />)}
    <line x1={hq.x - 240} y1={hq.y} x2={hq.x + 300} y2={hq.y} className="axis" />
    <line x1={hq.x} y1={hq.y - 240} x2={hq.x} y2={hq.y + 150} className="axis" />

    {coverageLocations.slice(1).map((n) => (
      <g key={n.id} className={`link ${selected === n.id ? "active" : ""}`}>
        <path d={link(n)} className="link-base" />
        <path d={link(n)} className="link-flow" />
      </g>
    ))}

    {coverageLocations.map((n) => {
      const isHq = n.id === hq.id;
      const active = selected === n.id;
      const labelRight = n.x < 420 && !n.labelLeft;
      return (
        <g key={n.id} className={`node ${isHq ? "node-hq" : ""} ${active ? "active" : ""}`} onClick={() => onSelect(n.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onSelect(n.id)} aria-label={n.name} data-testid={`schematic-node-${n.id}`}>
          <circle cx={n.x} cy={n.y} r={isHq ? 30 : 22} className="node-hit" />
          {active && <circle cx={n.x} cy={n.y} r={isHq ? 16 : 12} className="node-pulse" />}
          <circle cx={n.x} cy={n.y} r={isHq ? 11 : 7} className="node-ring" />
          <circle cx={n.x} cy={n.y} r={isHq ? 4.5 : 3} className="node-core" />
          <text x={labelRight ? n.x + (isHq ? 20 : 15) : n.x - (isHq ? 20 : 15)} y={n.y - 2} textAnchor={labelRight ? "start" : "end"} className="node-label">{n.name}</text>
          <text x={labelRight ? n.x + (isHq ? 20 : 15) : n.x - (isHq ? 20 : 15)} y={n.y + 12} textAnchor={labelRight ? "start" : "end"} className="node-sub">{isHq ? "HQ · " : ""}{n.coords}</text>
        </g>
      );
    })}
    <text x="18" y="404" className="schematic-note">ALMOUSAWI / OPERATING FOOTPRINT — SCHEMATIC, NOT TO SCALE</text>
  </svg>
);

export const Coverage = ({ onOpenStudy }) => {
  const [id, setId] = useState(hq.id);
  const location = coverageLocations.find((l) => l.id === id);
  return (
    <section className="coverage" id="coverage">
      <div className="container coverage-layout">
        <div className="coverage-copy">
          <Reveal as="p" className="eyebrow">08 / Coverage</Reveal>
          <Lines lines={["Local insight.", <em key="e">Verified reach.</em>]} />
          <Reveal as="p" delay={0.15}>Headquartered in Abu Dhabi since 1974, Almousawi serves critical operations across the Emirates — backed by a global network of technology partners. Select a location to explore sector coverage.</Reveal>
          <Reveal className="location-list" delay={0.2}>
            {coverageLocations.map((item) => (
              <button key={item.id} className={id === item.id ? "active" : ""} onClick={() => setId(item.id)} data-testid={`location-${item.id}-button`}>
                <MapPin size={13} /><span>{item.name}</span><em>{item.role}</em>
              </button>
            ))}
          </Reveal>
        </div>
        <Reveal className="coverage-stage" y={40} delay={0.1} data-testid="coverage-map">
          <Schematic selected={id} onSelect={setId} />
          <AnimatePresence mode="wait">
            <motion.div className="location-panel" key={id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} data-testid="location-panel">
              <span className="location-role">{location.role}</span>
              <h3>{location.name}</h3>
              <div className="tag-row">{location.sectors.map((s) => <span key={s}>{s}</span>)}</div>
              <p>{location.note}</p>
              <ul>{location.capabilities.map((c) => <li key={c}><ChevronRight size={13} />{c}</li>)}</ul>
              <button className="text-link" onClick={() => onOpenStudy(caseStudies[location.study])} data-testid="location-case-study-button">View related application <ArrowUpRight size={15} /></button>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
};
