import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RibbonWave } from "./RibbonWave";
import { Lines } from "./Motion";
import { certifications, marqueeItems } from "@/data/home";
import { scrollToHash } from "@/lib/lenis";

const ease = [0.22, 1, 0.36, 1];
const fade = (delay) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } });

export const Hero = ({ onContact }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 60, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 60, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section className="hero" id="top" ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} aria-labelledby="hero-title">
      <motion.div className="hero-ribbon" style={{ y: ribbonY, rotateX, rotateY }} aria-hidden="true">
        <RibbonWave />
      </motion.div>

      <motion.div className="container hero-content" style={{ y: contentY }}>
        <motion.p className="eyebrow hero-eyebrow" {...fade(0.1)}><span /> Since 1974 · Abu Dhabi, U.A.E.</motion.p>
        <Lines as="h1" id="hero-title" inView={false} delay={0.25} lines={["Engineering", <em key="e">reliability.</em>, "Powering what matters."]} />
        <motion.p className="hero-copy" {...fade(0.75)}>One of Abu Dhabi's first oil and gas product and service providers — family-owned since 1974, supplying engineered products, technical depth, and local support to the Oil & Gas, Power, Marine, and Industrial sectors.</motion.p>
        <motion.div className="hero-buttons" {...fade(0.9)}>
          <a className="button button-blue" href="#solutions" onClick={(e) => { e.preventDefault(); scrollToHash("#solutions"); }} data-testid="hero-explore-button">Explore solutions <ArrowUpRight size={16} /></a>
          <button className="button button-ghost" onClick={onContact} data-testid="hero-contact-button">Talk to our team <ArrowUpRight size={16} /></button>
        </motion.div>
        <motion.div className="hero-stats" {...fade(1.05)} data-testid="hero-stats">
          <div><strong>50<span>+</span></strong><small>Years in the UAE</small></div>
          <div><strong>100<span>%</span></strong><small>Family-owned</small></div>
          <div><strong>04</strong><small>Sectors served</small></div>
          <div className="hero-certs"><small>Certified</small>{certifications.map((c) => <span key={c}>{c}</span>)}</div>
        </motion.div>
      </motion.div>

      <motion.div className="hero-meta" {...fade(1.2)} aria-hidden="true">
        <span className="hero-meta-ar">تـراث مشتــرك · مستقبــل مشتــرك</span>
        <span>Shared heritage · Shared future</span>
        <span>24°28' N · 54°22' E — Abu Dhabi</span>
      </motion.div>
    </section>
  );
};

export const Marquee = () => {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee" aria-hidden="true" data-testid="marquee">
      <div className="marquee-track">
        {items.map((item, i) => <span key={i}>{item}<i /></span>)}
      </div>
    </div>
  );
};
