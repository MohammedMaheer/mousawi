import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { caseStudies, storyStages } from "@/data/home";
import { lockScroll } from "@/lib/lenis";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Shell = ({ children, label, onClose, className = "", testId, closeTestId, onScroll }) => {
  useEffect(() => {
    lockScroll(true);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { lockScroll(false); window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <motion.div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose} data-testid={testId}>
      <motion.div className={`modal-panel ${className}`} data-lenis-prevent onClick={(e) => e.stopPropagation()} onScroll={onScroll} initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close" data-testid={closeTestId}><X size={20} /></button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export const CaseStudyModal = ({ study, onClose, onContact }) => {
  const [stage, setStage] = useState(0);
  const onScroll = (e) => {
    const max = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
    const progress = max > 0 ? e.currentTarget.scrollTop / max : 0;
    setStage(Math.min(storyStages.length - 1, Math.round(progress * (storyStages.length - 1))));
  };
  return (
    <Shell label={study.title} onClose={onClose} className="case-study-panel" testId="case-study-modal" closeTestId="case-study-close" onScroll={onScroll}>
      <div className="case-study-image">
        <img src={study.image} alt={study.sector} />
        <span>ALMOUSAWI / APPLICATION {String(caseStudies.indexOf(study) + 1).padStart(2, "0")}</span>
      </div>
      <div className="case-study-body">
        <p className="eyebrow">Application / {study.sector}</p>
        <h2>{study.title}</h2>
        <p className="case-study-outcome">{study.outcome}</p>
        <p className="eyebrow">Systems involved</p>
        <div className="tag-row">{study.systems.map((s) => <span key={s}>{s}</span>)}</div>
        <div className="story-diagram" data-testid="story-diagram">
          <div className="story-dial"><i style={{ "--p": (stage + 1) / storyStages.length }} /><span>{String(stage + 1).padStart(2, "0")}</span></div>
          <div className="story-stage-list">
            {storyStages.map((item, i) => <div className={i <= stage ? "story-stage active" : "story-stage"} key={item}><i />{item}</div>)}
          </div>
        </div>
        <p className="story-hint">Scroll to follow the delivery stages.</p>
        <button className="button button-blue" onClick={onContact} data-testid="case-study-contact-button">Discuss a similar requirement <ArrowUpRight size={16} /></button>
      </div>
    </Shell>
  );
};

export const RelationshipPanel = ({ relationship, onClose }) => (
  <Shell label={`${relationship.name} relationship`} onClose={onClose} className="relationship-panel" testId="relationship-panel" closeTestId="relationship-panel-close">
    <div className="relationship-logo"><img src={relationship.logo} alt={relationship.name} /></div>
    <p className="eyebrow">Relationship / {relationship.category}</p>
    <h2>{relationship.name}</h2>
    <p>{relationship.support}</p>
    <div className="relationship-grid"><span>01 / Local delivery</span><span>02 / Technical depth</span><span>03 / Lifecycle support</span></div>
    <a className="text-link" href={relationship.link} target="_blank" rel="noreferrer" data-testid="relationship-source-link">Visit official site <ArrowUpRight size={15} /></a>
  </Shell>
);

export const ContactModal = ({ onClose }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    const body = JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)));
    try {
      const res = await fetch(`${API}/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      if (!res.ok) throw new Error("Contact request failed");
      setSent(true);
      toast.success("Thank you — our team will be in touch shortly.");
    } catch {
      toast.error("We could not send your message. Please call our Abu Dhabi office.");
    }
    setSending(false);
  };
  return (
    <Shell label="Contact Almousawi" onClose={onClose} className="contact-panel" testId="contact-modal" closeTestId="contact-modal-close">
      {sent ? (
        <div className="success-state" data-testid="contact-success">
          <div className="success-mark"><ShieldCheck /></div>
          <p className="eyebrow">Message received</p>
          <h2>We'll take it from here.</h2>
          <p>Our team will review your enquiry and respond using the details you shared.</p>
          <button className="button button-blue" onClick={onClose} data-testid="contact-success-close">Back to the site <ArrowUpRight size={16} /></button>
        </div>
      ) : (
        <>
          <p className="eyebrow">Start a conversation</p>
          <h2>Tell us what you're solving.</h2>
          <p className="modal-intro">Share a little about your requirement and the right Almousawi specialist will follow up.</p>
          <form onSubmit={submit} data-testid="contact-form">
            <div className="form-grid">
              <label>Full name<input name="name" required placeholder="Your name" data-testid="contact-name-input" /></label>
              <label>Work email<input name="email" type="email" required placeholder="you@company.com" data-testid="contact-email-input" /></label>
            </div>
            <label>Company<input name="company" placeholder="Your organisation" data-testid="contact-company-input" /></label>
            <label>How can we help?<textarea name="message" required rows="4" placeholder="Tell us about your project or requirement" data-testid="contact-message-input" /></label>
            <button className="button button-blue form-submit" disabled={sending} data-testid="contact-form-submit">{sending ? "Sending…" : "Send enquiry"}<ArrowUpRight size={16} /></button>
          </form>
        </>
      )}
    </Shell>
  );
};
