import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import "lenis/dist/lenis.css";
import "@/styles/home.css";
import { initLenis } from "@/lib/lenis";
import { Header } from "@/components/home/Header";
import { Hero, Marquee } from "@/components/home/Hero";
import { Heritage, Industries } from "@/components/home/Story";
import { Capabilities, Ecosystem, WhyUs } from "@/components/home/Work";
import { Partners, Projects } from "@/components/home/Proof";
import { Coverage } from "@/components/home/Coverage";
import { Cta, Footer } from "@/components/home/Closing";
import { CaseStudyModal, ContactModal, RelationshipPanel } from "@/components/home/Modals";

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [study, setStudy] = useState(null);
  const [relationship, setRelationship] = useState(null);

  useEffect(() => { initLenis(); }, []);

  const openContact = () => { setStudy(null); setContactOpen(true); };

  return (
    <div className="site">
      <Toaster position="top-right" richColors />
      <Header onContact={openContact} />
      <main>
        <Hero onContact={openContact} />
        <Marquee />
        <Heritage />
        <Industries />
        <Capabilities onContact={openContact} />
        <WhyUs />
        <Ecosystem />
        <Projects onOpenStudy={setStudy} onContact={openContact} />
        <Partners onOpenRelationship={setRelationship} />
        <Coverage onOpenStudy={setStudy} />
        <Cta onContact={openContact} />
      </main>
      <Footer />
      <AnimatePresence>
        {study && <CaseStudyModal key="study" study={study} onClose={() => setStudy(null)} onContact={openContact} />}
        {relationship && <RelationshipPanel key="rel" relationship={relationship} onClose={() => setRelationship(null)} />}
        {contactOpen && <ContactModal key="contact" onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
