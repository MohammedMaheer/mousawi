import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Header";
import { Lines, Reveal } from "./Motion";
import { RibbonWave } from "./RibbonWave";
import { scrollToHash } from "@/lib/lenis";

export const Cta = ({ onContact }) => (
  <section className="cta-section" id="contact">
    <div className="cta-ribbon" aria-hidden="true"><RibbonWave animate={false} id="cta-grad" /></div>
    <div className="container cta-layout">
      <div className="cta-content">
        <Reveal as="p" className="eyebrow">Let's build what's next</Reveal>
        <Lines lines={["Make your next", <em key="e">move with confidence.</em>]} />
        <Reveal as="p" delay={0.15}>Talk to our team about your next engineering, reliability, industrial, or infrastructure requirement. Let the Almousawi heritage be the key to your future success.</Reveal>
        <Reveal delay={0.25}><button className="button button-light" onClick={onContact} data-testid="footer-contact-button">Contact our team <ArrowUpRight size={16} /></button></Reveal>
      </div>
      <Reveal className="cta-card" delay={0.2} y={40} data-testid="cta-contact-card">
        <p className="eyebrow">Head office</p>
        <a href="tel:+97126271203" data-testid="cta-phone-link"><Phone size={16} /><span>+971 2 627 1203</span></a>
        <a href="mailto:mosawe@almosawe.ae" data-testid="cta-email-link"><Mail size={16} /><span>mosawe@almosawe.ae</span></a>
        <div><MapPin size={16} /><span>1412, 14th Floor, Addax Tower<br />Al Reem Island, Abu Dhabi, U.A.E.</span></div>
        <small>Sunday – Thursday · 08:00 – 17:00 GST</small>
      </Reveal>
    </div>
  </section>
);

const footerLinks = [["#about", "About us", "footer-about-link"], ["#solutions", "Solutions", "footer-capabilities-link"], ["#why-us", "Why Almousawi", "footer-why-link"], ["#projects", "Applications", "footer-projects-link"], ["#coverage", "Coverage", "footer-coverage-link"]];

export const Footer = () => (
  <footer id="careers">
    <div className="container footer-grid">
      <div>
        <Logo light />
        <p className="footer-summary">One of Abu Dhabi's first oil and gas product and service providers — family-owned since 1974, serving the Oil & Gas, Power, Marine and Industrial sectors.</p>
        <span className="footer-est">ISO 9001 · ISO 14001 · OHSAS 18001 · TRACE</span>
      </div>
      <div>
        <p className="footer-label">Explore</p>
        {footerLinks.map(([href, label, tid]) => <a key={href} href={href} onClick={(e) => { e.preventDefault(); scrollToHash(href); }} data-testid={tid}>{label}</a>)}
      </div>
      <div>
        <p className="footer-label">Reach us</p>
        <a href="tel:+97126271203" data-testid="footer-phone-link"><Phone size={14} /> +971 2 627 1203</a>
        <a href="mailto:mosawe@almosawe.ae" data-testid="footer-email-link">mosawe@almosawe.ae</a>
        <span>1412, 14th Floor<br />Addax Tower, Al Reem Island<br />Abu Dhabi, UAE</span>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} Almousawi Trading Co. LLC. All rights reserved.</span>
      <a href="https://ae.linkedin.com/company/al-mousawi-trading-co-llc" target="_blank" rel="noreferrer" data-testid="footer-linkedin-link">LinkedIn <ArrowUpRight size={14} /></a>
    </div>
  </footer>
);
