import { useEffect, useRef, useState } from "react";
import "@/AppFixed.css";
import "@/AppEnhancements.css";
import "@/AppPolish.css";
import { ArrowUpRight, ChevronDown, ChevronRight, CircleDot, Factory, Gauge, Globe2, Menu, Network, Phone, RadioTower, Ship, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { Toaster, toast } from "sonner";

const logo = "https://customer-assets-m6fa6gv7.emergentagent.net/job_028edafd-ffa7-4ae9-a87d-519452bf15ee/artifacts/muv89ecq_image.png";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function usePageAnchors() {
  useEffect(() => {
    document.querySelector(".partners")?.setAttribute("id", "partners");
    document.querySelector("footer")?.setAttribute("id", "careers");
  }, []);
}

const industries = [
  { name: "Oil & Gas", icon: Gauge, copy: "Systems built for demanding upstream and downstream environments." },
  { name: "Power & Utilities", icon: Zap, copy: "Reliable electrical and control solutions for essential networks." },
  { name: "Marine", icon: Ship, copy: "Specialist equipment and support for marine operations." },
  { name: "Industrial", icon: Factory, copy: "Practical engineering for continuous, complex production." },
  { name: "Infrastructure", icon: Network, copy: "Connected solutions that keep critical assets moving." },
  { name: "Manufacturing", icon: RadioTower, copy: "Smarter automation and reliability for modern plants." },
];

const capabilities = [
  { no: "01", name: "Electrical Engineering", copy: "From power distribution to protection and control, we bring dependable electrical performance to critical operations.", tags: ["Switchgear", "Protection", "Power quality"] },
  { no: "02", name: "Automation & Control", copy: "Intelligent control architectures that make industrial systems more visible, responsive, and efficient.", tags: ["PLC / SCADA", "Instrumentation", "Integration"] },
  { no: "03", name: "Asset Reliability", copy: "Condition-led insight and field expertise that help teams protect uptime and extend asset life.", tags: ["Monitoring", "Diagnostics", "Lifecycle support"] },
  { no: "04", name: "Marine Engineering", copy: "Specialized products and technical support for vessel systems and offshore requirements.", tags: ["Marine systems", "Valves", "Field service"] },
];

const caseStudies = [
  { sector: "Energy infrastructure", title: "Reliability at industrial scale.", image: "https://images.unsplash.com/photo-1611581372056-30cf28a7bd2e?crop=entropy&cs=srgb&fm=jpg&q=85", outcome: "Make critical power systems more dependable under demanding operating conditions.", systems: ["MV / HV distribution", "Protection & control", "Field commissioning"] },
  { sector: "Automation & control", title: "Clarity in complex systems.", image: "https://images.unsplash.com/photo-1782945217386-300f33f22069?crop=entropy&cs=srgb&fm=jpg&q=85", outcome: "Turn operational data into clearer decisions, faster interventions, and more confident teams.", systems: ["PLC / SCADA", "Instrumentation", "System integration"] },
  { sector: "Industrial solutions", title: "Performance that keeps moving.", image: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=srgb&fm=jpg&q=85", outcome: "Support complex process environments with practical equipment, technical depth, and lifecycle care.", systems: ["Process equipment", "Asset integrity", "After-sales support"] },
];

const relationships = [
  { name: "ADNOC", category: "Energy", support: "Local engineering support across electrical, mechanical, and reliability requirements for critical energy operations.", link: "https://www.adnoc.ae/" },
  { name: "TotalEnergies", category: "Energy", support: "Technical products and field support for demanding oil and gas environments, from equipment to lifecycle care.", link: "https://www.totalenergies.com/" },
  { name: "Borouge", category: "Materials", support: "Industrial systems, process equipment, and technical support for high-continuity manufacturing environments.", link: "https://www.borouge.com/" },
  { name: "Dubai Airports", category: "Infrastructure", support: "Dependable electrical and infrastructure solutions where uptime and operational continuity are essential.", link: "https://www.dubaiairports.ae/" },
  { name: "Petrofac", category: "Engineering", support: "Engineering products and specialist support that connect procurement, installation, commissioning, and service.", link: "https://www.petrofac.com/" },
];

const storyStages = ["Client requirement", "Engineering", "Procurement", "Installation", "Testing", "Commissioning", "Lifecycle support"];

function CaseStudyModal({ study, onClose, onContact }) {
  const [stage, setStage] = useState(0); const panelRef = useRef(null);
  const onStoryScroll = (event) => setStage(Math.min(storyStages.length - 1, Math.floor(event.currentTarget.scrollTop / 95)));
  return <div className="modal-backdrop case-study-backdrop" role="dialog" aria-modal="true" aria-label={study.title} data-testid="case-study-modal"><div className="case-study-panel" ref={panelRef} onScroll={onStoryScroll}><button className="icon-button modal-close" onClick={onClose} aria-label="Close case study" data-testid="case-study-close"><X size={20} /></button><div className="case-study-image"><img src={study.image} alt={study.sector} /><div className="case-study-image-label">ALMOUSAWI / APPLICATION {String(caseStudies.indexOf(study) + 1).padStart(2, "0")}</div></div><div className="case-study-body"><p className="eyebrow">Application / {study.sector}</p><h2>{study.title}</h2><p className="case-study-outcome">{study.outcome}</p><div className="case-study-systems"><p className="eyebrow">Systems involved</p>{study.systems.map((system) => <span key={system}>{system}</span>)}</div><div className="story-diagram" data-testid="story-diagram"><div className="story-diagram-visual"><div className="story-ring ring-one" /><div className="story-ring ring-two" /><span>{String(stage + 1).padStart(2, "0")}</span></div><div className="story-stage-list">{storyStages.map((item, index) => <div className={index <= stage ? "story-stage active" : "story-stage"} key={item}><i />{item}</div>)}</div></div><button className="button button-blue" onClick={onContact} data-testid="case-study-contact-button">Discuss a similar requirement <ArrowUpRight size={16} /></button></div></div></div>;
}

function RelationshipPanel({ relationship, onClose }) {
  return <div className="modal-backdrop relationship-backdrop" role="dialog" aria-modal="true" aria-label={`${relationship.name} relationship`} data-testid="relationship-panel"><div className="relationship-panel"><button className="icon-button modal-close" onClick={onClose} aria-label="Close relationship panel" data-testid="relationship-panel-close"><X size={20} /></button><p className="eyebrow">Relationship / {relationship.category}</p><h2>{relationship.name}</h2><p>{relationship.support}</p><div className="relationship-grid"><span>01 / Local delivery</span><span>02 / Technical depth</span><span>03 / Lifecycle support</span></div><a className="text-link" href={relationship.link} target="_blank" rel="noreferrer" data-testid="relationship-source-link">Visit official site <ArrowUpRight size={15} /></a></div></div>;
}

function Logo({ light = false }) {
  return <a href="#top" className={`brand ${light ? "brand-light" : ""}`} data-testid="brand-logo-link"><img src={logo} alt="Almousawi Trading Co. LLC" /><span>ALMOUSAWI<small>TRADING CO. LLC</small></span></a>;
}

function ContactModal({ onClose }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setSending(true);
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${API}/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      if (!response.ok) throw new Error("Contact request failed");
      setSent(true); toast.success("Thank you — our team will be in touch shortly.");
    } catch { toast.error("We could not send your message. Please call our Abu Dhabi office."); }
    setSending(false);
  };
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Contact Almousawi" data-testid="contact-modal">
    <div className="modal-panel"><button className="icon-button modal-close" onClick={onClose} aria-label="Close contact form" data-testid="contact-modal-close"><X size={20} /></button>
      {sent ? <div className="success-state"><div className="success-mark"><ShieldCheck /></div><p className="eyebrow">Message received</p><h2>We’ll take it from here.</h2><p>Our team will review your enquiry and respond using the details you shared.</p><button className="button button-blue" onClick={onClose} data-testid="contact-success-close">Back to the site <ArrowUpRight size={16} /></button></div> : <><p className="eyebrow">Start a conversation</p><h2>Tell us what you’re solving.</h2><p className="modal-intro">Share a little about your requirement and the right Almousawi specialist will follow up.</p>
        <form onSubmit={submit} data-testid="contact-form"><div className="form-grid"><label>Full name<input name="name" required placeholder="Your name" data-testid="contact-name-input" /></label><label>Work email<input name="email" type="email" required placeholder="you@company.com" data-testid="contact-email-input" /></label></div><label>Company<input name="company" placeholder="Your organisation" data-testid="contact-company-input" /></label><label>How can we help?<textarea name="message" required rows="4" placeholder="Tell us about your project or requirement" data-testid="contact-message-input" /></label><button className="button button-blue form-submit" disabled={sending} data-testid="contact-form-submit">{sending ? "Sending…" : "Send enquiry"}<ArrowUpRight size={16} /></button></form></>}
    </div>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false); const [modal, setModal] = useState(false); const [active, setActive] = useState(0); const [scrolled, setScrolled] = useState(false); const [selectedStudy, setSelectedStudy] = useState(null); const [selectedRelationship, setSelectedRelationship] = useState(null);
  usePageAnchors();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const openContact = () => { setModal(true); setMenuOpen(false); };
  const openStudy = (study) => setSelectedStudy(study);
  const openRelationship = (relationship) => setSelectedRelationship(relationship);
  return <div className="site" id="top"><Toaster position="top-right" richColors />
    <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}><div className="header-inner"><Logo /><nav className={menuOpen ? "nav-open" : ""} data-testid="main-navigation">{["About", "Industries", "Capabilities", "Projects", "Partners", "Careers"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} data-testid={`nav-${item.toLowerCase()}-link`}>{item}</a>)}<button className="mobile-contact" onClick={openContact} data-testid="mobile-contact-button">Contact us <ArrowUpRight size={15} /></button></nav><div className="header-actions"><span className="uae-mark"><Globe2 size={14} /> UAE / GLOBAL</span><button className="button button-small" onClick={openContact} data-testid="header-contact-button">Contact us <ArrowUpRight size={15} /></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button></div></div></header>
    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="hero-art"><div className="hero-gridlines" /><div className="orb orb-one" /><div className="orb orb-two" /><div className="flow flow-one" /><div className="flow flow-two" /><div className="hero-crosshair"><CircleDot size={26} /><span>ENGINEERED IN THE UAE</span></div><div className="hero-coordinates">24°28' N&nbsp;&nbsp; 54°22' E<br /><span>ABU DHABI / U.A.E.</span></div></div><div className="container hero-content"><p className="eyebrow hero-eyebrow"><span /> Since 1974 · Abu Dhabi</p><h1 id="hero-title">Engineering<br /><em>reliability.</em><br />Powering what matters.</h1><p className="hero-copy">For over five decades, Almousawi has helped critical industries operate with confidence — through engineering, technology, and field expertise.</p><div className="hero-buttons"><a className="button button-blue" href="#capabilities" data-testid="hero-explore-button">Explore capabilities <ArrowUpRight size={16} /></a><button className="button button-ghost" onClick={openContact} data-testid="hero-contact-button">Talk to our team <ArrowUpRight size={16} /></button></div><div className="hero-stats"><div><strong>50<span>+</span></strong><small>Years of experience</small></div><div><strong>UAE</strong><small>Based expertise</small></div><div><strong>360°</strong><small>Project support</small></div></div></div><div className="scroll-cue"><span>Scroll to explore</span><ChevronDown size={17} /></div></section>
      <section className="heritage section-light" id="about"><div className="container heritage-layout"><div><p className="eyebrow">01 / Our foundation</p><h2>Built on trust.<br /><em>Proven over time.</em></h2></div><div className="heritage-copy"><p className="lead">Almousawi Trading Co. LLC is an established UAE engineering and industrial solutions company serving the systems that keep economies moving.</p><p>From our beginnings in 1974 to today, our approach has stayed clear: bring dependable technology, technical depth, and responsive local support to every relationship.</p><a className="text-link" href="#ecosystem" data-testid="heritage-journey-link">Our journey <ArrowUpRight size={16} /></a></div></div><div className="container timeline"><div className="timeline-line" /><div className="timeline-item"><b>1974</b><span>Founded in the UAE</span></div><div className="timeline-item"><b>01</b><span>Long-term partnerships</span></div><div className="timeline-item"><b>Today</b><span>Engineering what’s next</span></div></div></section>
      <section className="industries" id="industries"><div className="container"><div className="section-heading heading-light"><div><p className="eyebrow">02 / Where we work</p><h2>Critical industries.<br /><em>Real-world impact.</em></h2></div><p>We bring specialist knowledge to the environments where performance, safety, and continuity are non-negotiable.</p></div><div className="industry-rail">{industries.map(({ name, icon: Icon, copy }, i) => <a className="industry-item" href="#capabilities" key={name} data-testid={`industry-${i + 1}-item`}><Icon size={28} strokeWidth={1.2} /><span className="industry-index">0{i + 1}</span><h3>{name}</h3><p>{copy}</p><ArrowUpRight className="industry-arrow" size={18} /></a>)}</div></div></section>
      <section className="capabilities section-light" id="capabilities"><div className="container capability-layout"><div className="capability-intro"><p className="eyebrow">03 / What we do</p><h2>Depth where<br /><em>it counts.</em></h2><p>One connected team across engineering disciplines, products, and lifecycle support.</p><div className="capability-mark">A<span>/</span>T</div></div><div className="capability-list">{capabilities.map((item, i) => <button key={item.no} className={`capability-tab ${active === i ? "active" : ""}`} onClick={() => setActive(i)} data-testid={`capability-tab-${i + 1}`}><span>{item.no}</span><strong>{item.name}</strong><ChevronRight size={19} /></button>)}<div className="capability-detail" data-testid="capability-detail"><p className="eyebrow">Capability / {capabilities[active].no}</p><h3>{capabilities[active].name}</h3><p>{capabilities[active].copy}</p><div className="capability-tags">{capabilities[active].tags.map(t => <span key={t}>{t}</span>)}</div><a className="text-link" href="#contact" onClick={(e) => { e.preventDefault(); openContact(); }} data-testid="capability-enquire-link">Enquire about this capability <ArrowUpRight size={15} /></a></div></div></div></section>
      <section className="ecosystem" id="ecosystem"><div className="container"><div className="section-heading heading-light"><div><p className="eyebrow">04 / The Almousawi way</p><h2>One integrated<br /><em>engineering ecosystem.</em></h2></div><p>From the first brief to lifecycle support, every stage is connected by accountability.</p></div><div className="ecosystem-track">{["Client requirement", "Engineering", "Procurement", "Installation", "Testing", "Commissioning", "Lifecycle support"].map((step, i) => <div className="eco-step" key={step} data-testid={`ecosystem-step-${i + 1}`}><span>{String(i + 1).padStart(2, "0")}</span><div className="eco-node" /><strong>{step}</strong></div>)}</div></div></section>
      <section className="projects section-light" id="projects"><div className="container"><div className="section-heading"><div><p className="eyebrow">05 / Applications</p><h2>Engineered for<br /><em>the real world.</em></h2></div><a className="text-link" href="#contact" onClick={(e) => { e.preventDefault(); openContact(); }} data-testid="projects-contact-link">Discuss a project <ArrowUpRight size={16} /></a></div><div className="project-grid">{caseStudies.map((study, i) => <button className={`project-card ${i === 0 ? "project-wide" : ""}`} key={study.title} onClick={() => openStudy(study)} data-testid={`case-study-card-${i + 1}`}><img src={study.image} alt={study.sector} /><div className="project-overlay"><span>{study.sector}</span><h3>{study.title}</h3><ArrowUpRight /></div></button>)}</div></div></section>
      <section className="partners"><div className="container partners-row"><p className="eyebrow">06 / Trusted relationships</p><h2>Trusted across<br /><em>critical infrastructure.</em></h2><div className="partner-list">{relationships.map((relationship) => <button className="relationship-mark" key={relationship.name} onClick={() => openRelationship(relationship)} data-testid={`relationship-${relationship.name.toLowerCase().replace(/[^a-z]+/g, "-")}-button`}><img src={relationship.name === "ADNOC" ? "https://almousawi.ae/images/client/adnoc1.png" : relationship.name === "TotalEnergies" ? "https://almousawi.ae/images/client/total1.jpg" : relationship.name === "Borouge" ? "https://almousawi.ae/images/client/borouge1.png" : relationship.name === "Dubai Airports" ? "https://almousawi.ae/images/client/dubai%20airport1.png" : "https://almousawi.ae/admin/images/client/petrofac1.png"} alt={relationship.name} /><span>{relationship.category}</span></button>)}</div></div></section>
      <section className="cta-section" id="contact"><div className="cta-wave" /><div className="container cta-content"><p className="eyebrow">Let’s build what’s next</p><h2>Make your next<br /><em>move with confidence.</em></h2><p>Talk to our team about your next engineering, reliability, industrial, or infrastructure requirement.</p><button className="button button-light" onClick={openContact} data-testid="footer-contact-button">Contact our team <ArrowUpRight size={16} /></button></div></section>
    </main>
    <footer><div className="container footer-grid"><div><Logo light /><p className="footer-summary">UAE-based engineering and industrial solutions for the systems that matter most.</p><span className="footer-est">Established 1974 · Abu Dhabi</span></div><div><p className="footer-label">Explore</p><a href="#about" data-testid="footer-about-link">About us</a><a href="#capabilities" data-testid="footer-capabilities-link">Capabilities</a><a href="#projects" data-testid="footer-projects-link">Applications</a><a href="#contact" data-testid="footer-contact-link">Contact</a></div><div><p className="footer-label">Reach us</p><a href="tel:+97126271203" data-testid="footer-phone-link"><Phone size={14} /> +971 2 627 1203</a><a href="mailto:mosawe@almosawe.ae" data-testid="footer-email-link">mosawe@almosawe.ae</a><span>1412, 14th Floor<br />Addax Tower, Al Reem Island<br />Abu Dhabi, UAE</span></div></div><div className="container footer-bottom"><span>© 2025 Almousawi Trading Co. LLC. All rights reserved.</span><a href="https://ae.linkedin.com/company/al-mousawi-trading-co-llc" target="_blank" rel="noreferrer" data-testid="footer-linkedin-link">LinkedIn <ArrowUpRight size={14} /></a></div></footer>
    {selectedStudy && <CaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} onContact={() => { setSelectedStudy(null); openContact(); }} />}{selectedRelationship && <RelationshipPanel relationship={selectedRelationship} onClose={() => setSelectedRelationship(null)} />}{modal && <ContactModal onClose={() => setModal(false)} />}
  </div>;
}
export default App;