import { ArrowUpRight } from "lucide-react";
import { Lines, Reveal, SectionHeading } from "./Motion";
import { heritageImage, industries, logoFull, tagline, timeline } from "@/data/home";
import { scrollToHash } from "@/lib/lenis";

export const Heritage = () => (
  <section className="heritage" id="about">
    <div className="container heritage-layout">
      <div className="heritage-text">
        <Reveal as="p" className="eyebrow">01 / Our foundation</Reveal>
        <Lines lines={["Built on trust.", <em key="e">Proven over time.</em>]} />
        <Reveal as="p" className="lead" delay={0.15}>Established in 1974 by the Almousawi family, who first began trading in the 1960s, Almousawi was one of Abu Dhabi's first oil and gas product and service providers.</Reveal>
        <Reveal as="p" delay={0.22}>Today the company remains 100% family-owned and is one of the region's leading suppliers of products and services to the Oil & Gas, Power, Marine and Industrial sectors — with a succession of long-standing relationships with both customers and principals.</Reveal>
        <Reveal className="heritage-tagline" delay={0.26}><span lang="ar" dir="rtl">{tagline.ar}</span><em>{tagline.en}</em></Reveal>
        <Reveal delay={0.3}>
          <a className="text-link" href="#ecosystem" onClick={(e) => { e.preventDefault(); scrollToHash("#ecosystem"); }} data-testid="heritage-journey-link">How we deliver <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>
      <Reveal className="heritage-frame" delay={0.12} y={48}>
        <div className="clip-frame">
          <img src={heritageImage} alt="Almousawi engineer testing an electrical panel" loading="lazy" />
        </div>
        <div className="frame-tag"><img src={logoFull} alt="Almousawi Trading Co. LLC seal" /></div>
        <div className="frame-corner" aria-hidden="true" />
      </Reveal>
    </div>
    <div className="container timeline">
      {timeline.map(([b, s], i) => (
        <Reveal className="timeline-item" key={b} delay={i * 0.08}><b>{b}</b><span>{s}</span></Reveal>
      ))}
    </div>
  </section>
);

export const Industries = () => (
  <section className="industries" id="industries">
    <div className="container">
      <SectionHeading eyebrow="02 / Where we work" lines={["Critical industries.", <em key="e">Real-world impact.</em>]} copy="We bring specialist knowledge to the environments where performance, safety, and continuity are non-negotiable." />
      <div className="industry-grid">
        {industries.map(({ name, icon: Icon, copy }, i) => (
          <Reveal as="a" className="industry-item" href="#solutions" key={name} delay={i * 0.06} onClick={(e) => { e.preventDefault(); scrollToHash("#solutions"); }} data-testid={`industry-${i + 1}-item`}>
            <span className="industry-index">0{i + 1}</span>
            <span className="industry-icon"><Icon size={26} strokeWidth={1.4} /></span>
            <h3>{name}</h3>
            <p>{copy}</p>
            <ArrowUpRight className="industry-arrow" size={18} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
