import { ClipboardCheck, ClipboardList, Factory, Gauge, Network, Package, PencilRuler, RadioTower, RefreshCw, Ship, Wrench, Zap } from "lucide-react";

export const logoMark = "/logo-mark-navy.png";
export const logoFull = "/logo-navy.png";
export const logoFullWhite = "/logo-white.png";

export const navItems = [["About", "#about"], ["Industries", "#industries"], ["Solutions", "#solutions"], ["Why us", "#why-us"], ["Projects", "#projects"], ["Partners", "#partners"], ["Coverage", "#coverage"]];

export const tagline = { en: "Shared heritage. Shared future.", ar: "تـراث مشتــرك · مستقبــل مشتــرك" };

export const certifications = ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001:2007", "TRACE certified"];

export const marqueeItems = ["Shared heritage · Shared future", "Oil & Gas", "Utilities & Power", "Marine", "Industrial", "Family-owned since 1974", "Abu Dhabi, U.A.E.", "ISO 9001 · 14001 · OHSAS 18001"];

export const industries = [
  { name: "Oil & Gas", icon: Gauge, copy: "Systems built for demanding upstream and downstream environments." },
  { name: "Power & Utilities", icon: Zap, copy: "Reliable electrical and control solutions for essential networks." },
  { name: "Marine", icon: Ship, copy: "Specialist equipment and support for marine operations." },
  { name: "Industrial", icon: Factory, copy: "Practical engineering for continuous, complex production." },
  { name: "Infrastructure", icon: Network, copy: "Connected solutions that keep critical assets moving." },
  { name: "Manufacturing", icon: RadioTower, copy: "Smarter automation and reliability for modern plants." },
];

export const capabilities = [
  { no: "01", name: "Customized technical solutions", copy: "Engineered packages sourced and specified for the exact duty, from process heat to material handling.", items: ["Heat transfer solutions", "Process equipment and valves", "Skid packages", "Bulk material handling solutions"] },
  { no: "02", name: "Electrical products & accessories", copy: "Power, protection, and distribution equipment for critical networks — supplied with the technical depth to support it.", items: ["Industrial UPS", "Transformers", "Bus transfer systems and protective relays", "Power skids", "MV, HV and MCC switchboards"] },
  { no: "03", name: "Asset integrity & condition monitoring", copy: "Non-intrusive insight that protects uptime, extends asset life, and turns inspection into confident decisions.", items: ["Non-interventional well and conductor integrity", "Partial discharge monitoring systems and services", "Transformer oil analysis", "Flare tip design, inspection and refurbishment"] },
  { no: "04", name: "After-market support", copy: "Local teams that stay with the asset — from first energisation through shutdowns and long-term maintenance.", items: ["Installation and commissioning", "Repair and refurbishment", "Spare parts support", "Maintenance contracts", "Shutdown support"] },
];

export const caseStudies = [
  { sector: "Energy infrastructure", title: "Reliability at industrial scale.", image: "https://images.unsplash.com/photo-1611581372056-30cf28a7bd2e?crop=entropy&cs=srgb&fm=jpg&q=85", outcome: "Make critical power systems more dependable under demanding operating conditions.", systems: ["MV / HV distribution", "Protection & control", "Field commissioning"] },
  { sector: "Automation & control", title: "Clarity in complex systems.", image: "https://images.unsplash.com/photo-1782945217386-300f33f22069?crop=entropy&cs=srgb&fm=jpg&q=85", outcome: "Turn operational data into clearer decisions, faster interventions, and more confident teams.", systems: ["PLC / SCADA", "Instrumentation", "System integration"] },
  { sector: "Industrial solutions", title: "Performance that keeps moving.", image: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a?crop=entropy&cs=srgb&fm=jpg&q=85", outcome: "Support complex process environments with practical equipment, technical depth, and lifecycle care.", systems: ["Process equipment", "Asset integrity", "After-sales support"] },
];

export const heritageImage = "https://images.unsplash.com/photo-1758101755915-462eddc23f57?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";
export const ecosystemImage = "https://images.unsplash.com/photo-1615774925655-a0e97fc85c14?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

export const relationships = [
  { name: "ADNOC", category: "Energy", logo: "https://almousawi.ae/images/client/adnoc1.png", support: "Local engineering support across electrical, mechanical, and reliability requirements for critical energy operations.", link: "https://www.adnoc.ae/" },
  { name: "TotalEnergies", category: "Energy", logo: "https://almousawi.ae/images/client/total1.jpg", support: "Technical products and field support for demanding oil and gas environments, from equipment to lifecycle care.", link: "https://www.totalenergies.com/" },
  { name: "Borouge", category: "Materials", logo: "https://almousawi.ae/images/client/borouge1.png", support: "Industrial systems, process equipment, and technical support for high-continuity manufacturing environments.", link: "https://www.borouge.com/" },
  { name: "Dubai Airports", category: "Infrastructure", logo: "https://almousawi.ae/images/client/dubai%20airport1.png", support: "Dependable electrical and infrastructure solutions where uptime and operational continuity are essential.", link: "https://www.dubaiairports.ae/" },
  { name: "Petrofac", category: "Engineering", logo: "https://almousawi.ae/admin/images/client/petrofac1.png", support: "Engineering products and specialist support that connect procurement, installation, commissioning, and service.", link: "https://www.petrofac.com/" },
];

export const whyUs = [
  { no: "01", title: "Family-owned since 1974", copy: "100% owned by the Almousawi family, who first began trading in the 1960s — one of Abu Dhabi's first oil and gas product and service providers.", stat: "1974", label: "Established" },
  { no: "02", title: "Managed by Emiratis", copy: "A multinational team of technical sales engineers with deep knowledge of the local market and the products and services it demands.", stat: "UAE", label: "Led locally" },
  { no: "03", title: "Certified quality", copy: "Operations underpinned by ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007 and TRACE — with regular internal audits to keep improving.", stat: "04", label: "Certifications" },
  { no: "04", title: "Global principals", copy: "Long-standing relationships with prestigious suppliers from around the globe, sourced to give the most appropriate, best-value solution.", stat: "50+", label: "Years of partnerships" },
];

export const vision = "We aim to be the partner of choice for clients, principals, employees and suppliers — by committing to a relationship that is fair, mutually rewarding and never complacent.";

export const timeline = [["1960s", "The Almousawi family begins trading in the region"], ["1974", "Almousawi Trading Co. LLC established in Abu Dhabi"], ["100%", "Family-owned to this day"], ["Today", "Serving Oil & Gas, Power, Marine and Industrial sectors"]];

export const storyStages = ["Client requirement", "Engineering", "Procurement", "Installation", "Testing", "Commissioning", "Lifecycle support"];

export const ecosystemStages = [
  { no: "01", name: "Client requirement", icon: ClipboardList, copy: "We begin with your operating environment, constraints, and the outcome you need." },
  { no: "02", name: "Engineering", icon: PencilRuler, copy: "Solutions specified, designed, and validated by specialist engineers." },
  { no: "03", name: "Procurement", icon: Package, copy: "Genuine products through long-standing global technology partners." },
  { no: "04", name: "Installation", icon: Wrench, copy: "Safe, precise delivery on site by experienced field teams." },
  { no: "05", name: "Testing", icon: Gauge, copy: "Systems verified against performance and compliance benchmarks." },
  { no: "06", name: "Commissioning", icon: ClipboardCheck, copy: "Controlled handover into live operation, documented and supported." },
  { no: "07", name: "Lifecycle support", icon: RefreshCw, copy: "Local after-sales, spares, and technical support for the long run." },
];

export const coverageLocations = [
  { id: "abu-dhabi", name: "Abu Dhabi", role: "Headquarters", x: 300, y: 262, coords: "24°28' N · 54°22' E", sectors: ["Oil & Gas", "Power"], note: "Head office at Addax Tower, Al Reem Island — engineering, procurement, and project coordination for critical energy operations.", capabilities: ["Electrical engineering", "Automation & control", "Asset reliability"], study: 0 },
  { id: "al-dhafra", name: "Ruwais / Al Dhafra", role: "Service territory", x: 96, y: 330, coords: "24°06' N · 52°43' E", sectors: ["Industrial", "Oil & Gas"], note: "Support for downstream and materials complexes along the western industrial corridor.", capabilities: ["Process equipment", "Condition monitoring", "Field services"], study: 2 },
  { id: "dubai", name: "Dubai", role: "Service territory", x: 470, y: 172, coords: "25°12' N · 55°16' E", sectors: ["Infrastructure", "Power"], note: "Electrical and infrastructure solutions where uptime and operational continuity are essential.", capabilities: ["Power distribution", "Testing & commissioning", "Lifecycle support"], study: 1 },
  { id: "northern-emirates", name: "Sharjah & N. Emirates", role: "Service territory", x: 556, y: 66, coords: "25°33' N · 55°36' E", sectors: ["Marine", "Industrial"], note: "Engineering products and specialist support connecting procurement, installation, and commissioning.", capabilities: ["Marine systems", "Valves & instrumentation", "After-sales support"], study: 2 },
  { id: "offshore", name: "Offshore / Arabian Gulf", role: "Service territory", labelLeft: true, x: 236, y: 98, coords: "25°18' N · 54°33' E", sectors: ["Marine", "Oil & Gas"], note: "Marine engineering products and field support for vessel and offshore operations.", capabilities: ["Marine engineering", "Instrumentation", "Field service"], study: 0 },
];
