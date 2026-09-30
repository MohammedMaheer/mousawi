import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { logoFullWhite, logoMark, navItems } from "@/data/home";
import { scrollToHash } from "@/lib/lenis";

export const Logo = ({ light = false }) => (
  <a href="#top" className={`brand ${light ? "brand-light" : ""}`} onClick={(e) => { e.preventDefault(); scrollToHash("#top"); }} data-testid="brand-logo-link">
    {light ? <img className="brand-full" src={logoFullWhite} alt="Almousawi Trading Co. LLC — Established 1974" /> : (
      <>
        <img className="brand-mark" src={logoMark} alt="" />
        <span>Almousawi<small>Trading Co. LLC · Est. 1974</small></span>
      </>
    )}
  </a>
);

export const Header = ({ onContact }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (e, hash) => { e.preventDefault(); setMenuOpen(false); scrollToHash(hash); };

  return (
    <header className={`site-header ${scrolled ? "header-solid" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="header-inner">
        <Logo />
        <nav className={menuOpen ? "nav-open" : ""} data-testid="main-navigation">
          {navItems.map(([label, hash]) => (
            <a key={hash} href={hash} onClick={(e) => go(e, hash)} data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}-link`}>{label}</a>
          ))}
          <button className="button button-blue mobile-contact" onClick={() => { setMenuOpen(false); onContact(); }} data-testid="mobile-contact-button">Contact us <ArrowUpRight size={15} /></button>
        </nav>
        <div className="header-actions">
          <span className="uae-mark"><i /> Abu Dhabi · U.A.E.</span>
          <button className="button button-blue button-small" onClick={onContact} data-testid="header-contact-button">Contact us <ArrowUpRight size={15} /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
};
