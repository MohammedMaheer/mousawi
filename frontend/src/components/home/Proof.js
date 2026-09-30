import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Motion";
import { caseStudies, relationships } from "@/data/home";

export const Projects = ({ onOpenStudy, onContact }) => (
  <section className="projects" id="projects">
    <div className="container">
      <SectionHeading
        eyebrow="06 / Applications"
        lines={["Engineered for", <em key="e">the real world.</em>]}
        aside={<Reveal delay={0.2}><button className="text-link" onClick={onContact} data-testid="projects-contact-link">Discuss a project <ArrowUpRight size={16} /></button></Reveal>}
      />
      <div className="project-grid">
        {caseStudies.map((study, i) => (
          <Reveal as="button" className="project-card" key={study.title} delay={i * 0.1} y={40} onClick={() => onOpenStudy(study)} data-testid={`case-study-card-${i + 1}`}>
            <img src={study.image} alt={study.sector} loading="lazy" />
            <span className="project-index">0{i + 1}</span>
            <div className="project-overlay">
              <span>{study.sector}</span>
              <h3>{study.title}</h3>
              <em>View application <ArrowUpRight size={15} /></em>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Partners = ({ onOpenRelationship }) => (
  <section className="partners" id="partners">
    <div className="container">
      <SectionHeading eyebrow="07 / Trusted relationships" lines={["Trusted across", <em key="e">critical infrastructure.</em>]} copy="Long-standing relationships with the operators and engineering groups behind the region's most demanding assets." />
      <div className="partner-list">
        {relationships.map((rel, i) => (
          <Reveal as="button" className="relationship-mark" key={rel.name} delay={i * 0.07} onClick={() => onOpenRelationship(rel)} data-testid={`relationship-${rel.name.toLowerCase().replace(/[^a-z]+/g, "-")}-button`}>
            <img src={rel.logo} alt={rel.name} loading="lazy" />
            <span>{rel.category}<ArrowUpRight size={13} /></span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
