import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className, as = "div", ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.85, delay, ease }} {...rest}>
      {children}
    </Tag>
  );
};

const lineVariants = { hidden: { y: "112%" }, visible: (i) => ({ y: 0, transition: { duration: 1, delay: i, ease } }) };

// The mask (not the clipped inner span) is what the viewport observer watches.
export const Lines = ({ lines, as = "h2", delay = 0, className, id, inView = true }) => {
  const Tag = motion[as];
  const trigger = inView ? { whileInView: "visible", viewport: { once: true, margin: "-40px" } } : { animate: "visible" };
  return (
    <Tag className={className} id={id} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span className="line-inner" variants={lineVariants} custom={delay + i * 0.11}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export const SectionHeading = ({ eyebrow, lines, copy, aside, light = false }) => (
  <div className={`section-heading ${light ? "heading-light" : ""}`}>
    <div>
      <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
      <Lines lines={lines} delay={0.05} />
    </div>
    {copy && <Reveal as="p" className="section-copy" delay={0.15}>{copy}</Reveal>}
    {aside}
  </div>
);
