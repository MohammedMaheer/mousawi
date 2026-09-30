import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { Lines, Reveal, SectionHeading } from "./Motion";
import { capabilities, certifications, ecosystemImage, ecosystemStages, vision, whyUs } from "@/data/home";

export const Capabilities = ({ onContact }) => {
  const [active, setActive] = useState(0);
  const item = capabilities[active];
  return (
    <section className="capabilities" id="solutions">
      <div className="container capability-layout">
        <div className="capability-intro">
          <Reveal as="p" className="eyebrow">03 / What we supply</Reveal>
          <Lines lines={["Depth where", <em key="e">it counts.</em>]} />
          <Reveal as="p" delay={0.15}>Four connected solution groups — engineered products, electrical systems, asset integrity, and the after-market support that keeps them running.</Reveal>
          <Reveal className="capability-mark" delay={0.25} aria-hidden="true">A<span>/</span>T</Reveal>
        </div>
        <Reveal className="capability-panel" delay={0.1} y={40}>
          <div className="capability-tabs" role="tablist">
            {capabilities.map((cap, i) => (
              <button key={cap.no} role="tab" aria-selected={active === i} className={`capability-tab ${active === i ? "active" : ""}`} onClick={() => setActive(i)} data-testid={`capability-tab-${i + 1}`}>
                <span>{cap.no}</span><strong>{cap.name}</strong><ChevronRight size={18} />
              </button>
            ))}
          </div>
          <div className="capability-detail" data-testid="capability-detail">
            <AnimatePresence mode="wait">
              <motion.div key={item.no} className="capability-detail-inner" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <div>
                  <p className="eyebrow">Solution group / {item.no}</p>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                  <button className="text-link" onClick={onContact} data-testid="capability-enquire-link">Enquire about this solution <ArrowUpRight size={15} /></button>
                </div>
                <ul className="capability-items">
                  {item.items.map((line) => <li key={line}><Check size={14} />{line}</li>)}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const WhyUs = () => (
  <section className="why-us" id="why-us">
    <div className="container">
      <SectionHeading eyebrow="04 / Why Almousawi" lines={["A dependable source,", <em key="e">by design.</em>]} copy="Our professional approach, coupled with reliable and efficient service, has made Almousawi a dependable source of equipment — and a partner to prestigious suppliers around the globe." />
      <div className="bento">
        <Reveal className="bento-card bento-vision" y={40}>
          <Quote size={28} strokeWidth={1.4} />
          <p className="bento-quote">{vision}</p>
          <span className="bento-source">Our vision — Almousawi Trading Co. LLC</span>
        </Reveal>
        {whyUs.map((w, i) => (
          <Reveal className="bento-card" key={w.no} delay={0.08 + i * 0.07} y={32} data-testid={`why-us-card-${i + 1}`}>
            <div className="bento-stat"><strong>{w.stat}</strong><small>{w.label}</small></div>
            <h3>{w.title}</h3>
            <p>{w.copy}</p>
          </Reveal>
        ))}
        <Reveal className="bento-card bento-certs" delay={0.4} y={32}>
          <ShieldCheck size={22} strokeWidth={1.5} />
          <div>
            <strong>Quality, safety and compliance</strong>
            <div className="tag-row">{certifications.map((c) => <span key={c}>{c}</span>)}</div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Ecosystem = () => (
  <section className="ecosystem" id="ecosystem">
    <div className="container">
      <SectionHeading
        eyebrow="05 / The Almousawi way"
        lines={["One integrated", <em key="e">engineering ecosystem.</em>]}
        copy="From the first brief to long-term support, every stage is delivered by one accountable team — so nothing is lost between disciplines."
      />
      <div className="ecosystem-layout">
        <Reveal className="ecosystem-visual" y={40}>
          <div className="clip-frame clip-frame-tall">
            <img src={ecosystemImage} alt="Almousawi field engineer commissioning a control panel" loading="lazy" />
          </div>
          <div className="ecosystem-note"><ShieldCheck size={16} /><span>Every engagement is documented, tested, and supported locally from Abu Dhabi.</span></div>
        </Reveal>
        <div className="ecosystem-flow">
          <div className="eco-spine" aria-hidden="true" />
          {ecosystemStages.map(({ no, name, icon: Icon, copy }, i) => (
            <Reveal className="eco-stage" key={no} delay={i * 0.07} y={24} data-testid={`ecosystem-step-${i + 1}`}>
              <span className="eco-stage-icon"><Icon size={20} strokeWidth={1.5} /></span>
              <div className="eco-stage-copy">
                <span className="eco-stage-no">{no}</span>
                <strong>{name}</strong>
                <p>{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
