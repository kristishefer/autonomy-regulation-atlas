import type { LearningConceptId } from "@/app/explore/learning-concepts";
import type { CompareFieldId } from "@/app/explore/regulatory-data";

export type NodeType =
  | "standard"
  | "concept"
  | "regulation"
  | "institution"
  | "framework"
  | "methodology"
  | "national_law";

export type CoreClusterId =
  | "automation"
  | "functional"
  | "intended"
  | "cyber"
  | "assurance"
  | "unece";

export type JurisdictionKey =
  | "eu"
  | "nl"
  | "de"
  | "fr"
  | "es"
  | "it"
  | "at"
  | "uk"
  | "ru"
  | "us"
  | "ca"
  | "cn";

export type LearningNote = {
  plain: string;
  why: string;
  confusion: string;
};

export type SystemNode = {
  id: string;
  name: string;
  nodeType: NodeType;
  cluster?: CoreClusterId;
  jurisdiction?: JurisdictionKey;
  issuingBody: string;
  whatItIs: string;
  geography: string;
  legalEffect: string;
  relevance: {
    EU: string;
    US: string;
    China: string;
  };
  takeaway: string;
  source?: string;
  learning?: LearningNote;
  learningConceptId?: LearningConceptId;
};

export type SystemEdge = {
  from: string;
  to: string;
  kind: "structural" | "framework" | "related";
  label?: string;
};

export type RegulatoryConceptId =
  | "road-access"
  | "vehicle-approval"
  | "operating-domain"
  | "human-roles"
  | "traffic-rules"
  | "safety-assurance"
  | "operations"
  | "data-incidents"
  | "liability-insurance";

export type SystemMapContextJurisdiction = "netherlands" | "germany";

export type RegulatoryConcept = {
  id: RegulatoryConceptId;
  title: string;
  description: string;
};

export type JurisdictionContextBinding = {
  conceptId: RegulatoryConceptId;
  fieldId: CompareFieldId;
  sectionId: string;
  learningConceptId?: LearningConceptId;
};

export const CLUSTERS: {
  id: CoreClusterId;
  title: string;
  shortTitle: string;
  description: string;
}[] = [
  {
    id: "automation",
    title: "Automation language",
    shortTitle: "Automation",
    description: "The shared terminology used to describe driving automation.",
  },
  {
    id: "functional",
    title: "Functional safety",
    shortTitle: "Functional safety",
    description: "Hazards associated with malfunctioning electrical/electronic systems.",
  },
  {
    id: "intended",
    title: "Intended functionality & AI safety",
    shortTitle: "SOTIF / AI safety",
    description: "Safety risks that can exist even when the system has not malfunctioned.",
  },
  {
    id: "cyber",
    title: "Cybersecurity & software updates",
    shortTitle: "Cyber & software",
    description: "Engineering and regulatory layers for cybersecurity and software updates.",
  },
  {
    id: "assurance",
    title: "Safety assurance",
    shortTitle: "Assurance",
    description: "Ways to structure and evidence an argument that an autonomous system is acceptably safe.",
  },
  {
    id: "unece",
    title: "International vehicle regulation",
    shortTitle: "UNECE",
    description: "WP.29's distinct treaty branches: the 1958 Agreement and UN Regulations, and the 1998 Agreement and UN Global Technical Regulations.",
  },
];

export const REGULATORY_CONCEPTS: RegulatoryConcept[] = [
  {
    id: "road-access",
    title: "Road access",
    description:
      "The legal route that permits testing or operation on public roads. Product approval alone does not answer this question.",
  },
  {
    id: "vehicle-approval",
    title: "Vehicle / ADS approval",
    description:
      "The technical approval gate for the vehicle, ADS or vehicle type, kept distinct from permission to operate in a place or service.",
  },
  {
    id: "operating-domain",
    title: "Operating domain",
    description:
      "The relationship between the ADS technical ODD and any route, area or conditions separately authorized by law.",
  },
  {
    id: "human-roles",
    title: "Human roles",
    description:
      "The legally assigned functions of a driver, supervisor, remote operator or other responsible person in the operating model.",
  },
  {
    id: "traffic-rules",
    title: "Traffic rules",
    description:
      "How ordinary road rules apply, whether targeted exemptions exist, and who or what must perform driving-rule compliance.",
  },
  {
    id: "safety-assurance",
    title: "Safety assurance",
    description:
      "The regime-specific reasoning, evidence, testing and assessment used to demonstrate acceptable safety.",
  },
  {
    id: "operations",
    title: "Operations",
    description:
      "Continuing duties for the holder or operator, including maintenance, qualified personnel and organizational controls.",
  },
  {
    id: "data-incidents",
    title: "Data & incidents",
    description:
      "Operational-data recording, incident or event reporting, and regulator access are related but legally distinct questions.",
  },
  {
    id: "liability-insurance",
    title: "Liability & insurance",
    description:
      "The allocation of loss and compulsory insurance, including whether ordinary frameworks are adapted for autonomous operation.",
  },
];

export const JURISDICTION_CONTEXT_BINDINGS: Record<
  SystemMapContextJurisdiction,
  JurisdictionContextBinding[]
> = {
  netherlands: [
    { conceptId: "road-access", fieldId: "testing_regime", sectionId: "testing", learningConceptId: "experimental-permit" },
    { conceptId: "vehicle-approval", fieldId: "separate_operational_authorization", sectionId: "approval", learningConceptId: "type-approval" },
    { conceptId: "operating-domain", fieldId: "odd_legal_relevance", sectionId: "odd", learningConceptId: "odd" },
    { conceptId: "human-roles", fieldId: "primary_human_role", sectionId: "driver", learningConceptId: "driver-outside-vehicle" },
    { conceptId: "traffic-rules", fieldId: "traffic_rules_model", sectionId: "traffic-rules", learningConceptId: "rvv-1990" },
    { conceptId: "safety-assurance", fieldId: "safety_assurance_model", sectionId: "safety", learningConceptId: "iso-26262" },
    { conceptId: "operations", fieldId: "holder_operator_duties", sectionId: "monitoring" },
    { conceptId: "data-incidents", fieldId: "incident_event_reporting", sectionId: "monitoring" },
    { conceptId: "liability-insurance", fieldId: "av_liability_model", sectionId: "liability" },
  ],
  germany: [
    { conceptId: "road-access", fieldId: "deployment_regime", sectionId: "approval-path", learningConceptId: "testing-vs-deployment" },
    { conceptId: "vehicle-approval", fieldId: "approval_routes", sectionId: "approval-path", learningConceptId: "type-approval" },
    { conceptId: "operating-domain", fieldId: "separate_operating_area_approval", sectionId: "operating-area", learningConceptId: "betriebsbereich" },
    { conceptId: "human-roles", fieldId: "primary_human_role", sectionId: "supervisor", learningConceptId: "technical-supervisor" },
    { conceptId: "traffic-rules", fieldId: "ads_rule_compliance", sectionId: "traffic-rules", learningConceptId: "minimum-risk-condition" },
    { conceptId: "safety-assurance", fieldId: "safety_assurance_model", sectionId: "safety", learningConceptId: "iso-26262" },
    { conceptId: "operations", fieldId: "holder_operator_duties", sectionId: "holder", learningConceptId: "holder-obligations" },
    { conceptId: "data-incidents", fieldId: "incident_event_reporting", sectionId: "data" },
    { conceptId: "liability-insurance", fieldId: "av_liability_model", sectionId: "liability" },
  ],
};

export const JURISDICTIONS: {
  key: JurisdictionKey;
  label: string;
  level: "supranational" | "national" | "subnational";
  parent?: JurisdictionKey;
  status: "seeded" | "scaffolded";
  sourceHints?: string[];
  sourceNote?: string;
}[] = [
  { key: "eu", label: "EU", level: "supranational", status: "scaffolded" },
  { key: "nl", label: "Netherlands", level: "national", parent: "eu", status: "scaffolded" },
  { key: "de", label: "Germany", level: "national", parent: "eu", status: "scaffolded" },
  { key: "fr", label: "France", level: "national", parent: "eu", status: "scaffolded" },
  { key: "es", label: "Spain", level: "national", parent: "eu", status: "scaffolded" },
  { key: "it", label: "Italy", level: "national", parent: "eu", status: "scaffolded" },
  { key: "at", label: "Austria", level: "national", parent: "eu", status: "scaffolded" },
  {
    key: "uk",
    label: "United Kingdom",
    level: "national",
    status: "scaffolded",
    sourceHints: [
      "Automated Vehicles Act 2024",
      "Automated and Electric Vehicles Act 2018",
    ],
    sourceNote:
      "These UK acts were already present on the workbook Sources sheet, but were not mapped into the AV Safety Map node layer.",
  },
  {
    key: "ru",
    label: "Russia",
    level: "national",
    status: "scaffolded",
    sourceNote:
      "Russia was not present in the original workbook and needs a new source corpus before legal nodes are mapped.",
  },
  { key: "us", label: "United States", level: "national", status: "seeded" },
  { key: "ca", label: "California", level: "subnational", parent: "us", status: "scaffolded" },
  { key: "cn", label: "China", level: "national", status: "seeded" },
];

export const NODES: SystemNode[] = [
  {
    id: "sae-j3016",
    name: "SAE J3016",
    cluster: "automation",
    nodeType: "standard",
    issuingBody: "SAE International",
    whatItIs: "Taxonomy and terminology for driving automation systems",
    geography: "Cross-jurisdictional; developed by a US-based standards organization",
    legalEffect: "Voluntary standard; not itself a vehicle market-access authorization",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "L0–L5 and DDT provide a shared language for automation. The levels do not themselves determine legal authorization.",
    source: "https://www.sae.org/standards/j3016-taxonomy-definitions-terms-related-driving-automation-systems-road-motor-vehicles",
    learning: {
      plain: "SAE J3016 is the vocabulary behind Levels 0–5 of driving automation and terms such as the Dynamic Driving Task (DDT).",
      why: "It gives engineers, regulators and lawyers a common language for describing what the automated driving system does and what human role remains.",
      confusion: "A SAE automation level is a technical classification, not permission to deploy or operate on public roads.",
    },
  },
  {
    id: "odd",
    name: "Operational Design Domain (ODD)",
    cluster: "automation",
    nodeType: "concept",
    issuingBody: "Cross-cutting ADS concept defined in SAE J3016 and further specified in standards such as ISO 34503",
    whatItIs: "The operating conditions in which a given ADS or feature is specifically designed to function, including relevant environmental, geographic, roadway, traffic and time-of-day conditions",
    geography: "Cross-jurisdictional technical concept",
    legalEffect: "A technical design boundary; it is not automatically the same as the legally authorized operating area, route or operating conditions",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "ODD says where and under what conditions the ADS is designed to operate. A regulator or road authority may authorize a narrower, different or separately defined operating domain.",
    source: "https://www.sae.org/standards/j3016-taxonomy-definitions-terms-related-driving-automation-systems-road-motor-vehicles",
    learningConceptId: "odd",
  },
  {
    id: "iso-26262",
    name: "ISO 26262",
    cluster: "functional",
    nodeType: "standard",
    issuingBody: "ISO — International Organization for Standardization",
    whatItIs: "Technical standard for functional safety of road-vehicle electrical/electronic systems",
    geography: "International",
    legalEffect: "Voluntary standard; it may acquire regulatory, contractual or evidentiary relevance in a specific regime",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "Functional Safety addresses hazards associated with malfunctioning behaviour of E/E systems.",
    source: "https://www.iso.org/standard/68383.html",
    learningConceptId: "iso-26262",
  },
  {
    id: "hara",
    name: "HARA",
    cluster: "functional",
    nodeType: "methodology",
    issuingBody: "Method within ISO 26262",
    whatItIs: "Hazard Analysis and Risk Assessment",
    geography: "Part of the ISO 26262 functional-safety framework",
    legalEffect: "Methodology used within ISO 26262",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "HARA identifies hazardous events and evaluates them using Severity, Exposure and Controllability.",
    source: "https://www.iso.org/standard/68383.html",
    learning: {
      plain: "HARA is the risk-analysis method used inside ISO 26262.",
      why: "You identify a hazardous event, then assess Severity, Exposure and Controllability. That assessment feeds the ASIL classification.",
      confusion: "HARA is not a standard and not a safety level. It is a method of analysis.",
    },
  },
  {
    id: "sec",
    name: "S / E / C inputs",
    cluster: "functional",
    nodeType: "concept",
    issuingBody: "Criteria used in HARA under ISO 26262",
    whatItIs: "Severity, Exposure and Controllability",
    geography: "Part of HARA",
    legalEffect: "Assessment parameters used within the ISO 26262 methodology",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "Severity, Exposure and Controllability are supporting HARA inputs; HARA uses them to derive the functional-safety classification.",
    source: "https://www.iso.org/standard/68383.html",
    learning: {
      plain: "S/E/C means Severity, Exposure and Controllability.",
      why: "Together they describe how serious the harm could be, how often the relevant operational situation may occur, and how controllable the event is.",
      confusion: "These are classification dimensions, not direct probabilities of an accident.",
    },
  },
  {
    id: "asil",
    name: "ASIL",
    cluster: "functional",
    nodeType: "concept",
    issuingBody: "Classification within ISO 26262",
    whatItIs: "Automotive Safety Integrity Level",
    geography: "Part of ISO 26262",
    legalEffect: "Classification used within the ISO 26262 functional-safety process",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "QM and ASIL A–D indicate increasing levels of functional-safety rigor.",
    source: "https://www.iso.org/standard/68383.html",
    learning: {
      plain: "ASIL is the functional-safety integrity classification produced by the ISO 26262 risk-classification process.",
      why: "A higher ASIL means a more rigorous set of functional-safety activities and requirements.",
      confusion: "ASIL is not an accident probability score. It is a safety-integrity classification derived from HARA.",
    },
  },
  {
    id: "sotif",
    name: "ISO 21448 / SOTIF",
    cluster: "intended",
    nodeType: "standard",
    issuingBody: "ISO — International Organization for Standardization",
    whatItIs: "Technical standard addressing Safety of the Intended Functionality",
    geography: "International",
    legalEffect: "Voluntary ISO standard",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "A hazardous situation can arise even when the system is functioning as designed, because its capabilities may be insufficient for the situation.",
    source: "https://www.iso.org/standard/77490.html",
    learning: {
      plain: "SOTIF deals with safety problems that do not require a component or system failure.",
      why: "An automated system may operate exactly as designed and still misunderstand or inadequately handle a real-world situation.",
      confusion: "ISO 26262 asks about malfunctioning behaviour; SOTIF can matter even when nothing has technically failed.",
    },
  },
  {
    id: "iso-pas-8800",
    name: "ISO/PAS 8800",
    cluster: "intended",
    nodeType: "standard",
    issuingBody: "ISO — International Organization for Standardization",
    whatItIs: "Road-vehicle safety and artificial-intelligence standard",
    geography: "International",
    legalEffect: "Voluntary standard",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "Addresses safety-related risks arising from the use of AI in road-vehicle functions.",
    source: "https://www.iso.org/standard/83303.html",
    learning: {
      plain: "ISO/PAS 8800 is a road-vehicle safety standard focused on safety-related risks created by the use of artificial intelligence.",
      why: "It adds an AI-specific safety lens to a landscape that already includes functional safety and SOTIF.",
      confusion: "It is a voluntary technical standard, not the EU AI Act and not by itself a vehicle-approval rule.",
    },
  },
  {
    id: "iso-sae-21434",
    name: "ISO/SAE 21434",
    cluster: "cyber",
    nodeType: "standard",
    issuingBody: "ISO + SAE International",
    whatItIs: "Cybersecurity engineering standard for road vehicles",
    geography: "International",
    legalEffect: "Voluntary standard",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "Provides an engineering framework for managing automotive cybersecurity risks across the vehicle lifecycle.",
    source: "https://www.iso.org/standard/70918.html",
    learning: {
      plain: "ISO/SAE 21434 is an engineering standard for managing cybersecurity risk across the road-vehicle lifecycle.",
      why: "Connected and software-defined vehicles need a systematic cybersecurity process from design through operation and maintenance.",
      confusion: "ISO/SAE 21434 is a standard; UN R155 is a regulation. They concern the same domain but are not the same legal instrument.",
    },
  },
  {
    id: "un-r155",
    name: "UN R155",
    cluster: "cyber",
    nodeType: "regulation",
    issuingBody: "UNECE WP.29",
    whatItIs: "UN Regulation on cyber security and cyber security management systems",
    geography: "International — 1958 Agreement system",
    legalEffect: "UN Regulation under the 1958 Agreement; legally operative through the applicable Contracting Party/type-approval framework.",
    relevance: { EU: "◐", US: "—", China: "—" },
    takeaway: "A core concept is the CSMS — Cyber Security Management System.",
    source: "https://unece.org/transport/documents/2021/03/standards/un-regulation-no-155-cyber-security-and-cyber-security",
    learning: {
      plain: "UN R155 is a UN vehicle regulation on automotive cybersecurity and the Cyber Security Management System (CSMS).",
      why: "Where it applies, cybersecurity becomes part of the regulatory and type-approval architecture rather than only an internal engineering concern.",
      confusion: "UN R155 does not make ISO/SAE 21434 the same thing as a regulation; the two are related but have different legal roles.",
    },
  },
  {
    id: "iso-24089",
    name: "ISO 24089",
    cluster: "cyber",
    nodeType: "standard",
    issuingBody: "ISO — International Organization for Standardization",
    whatItIs: "Software-update engineering standard for road vehicles",
    geography: "International",
    legalEffect: "Voluntary standard",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "Provides engineering processes for vehicle software-update management.",
    source: "https://www.iso.org/standard/77796.html",
    learning: {
      plain: "ISO 24089 is an engineering standard for managing software updates in road vehicles.",
      why: "Modern vehicles change after production, so the update process itself needs controlled engineering, documentation and risk management.",
      confusion: "ISO 24089 is an engineering standard; UN R156 is the related regulatory layer for software updates where that Regulation applies.",
    },
  },
  {
    id: "un-r156",
    name: "UN R156",
    cluster: "cyber",
    nodeType: "regulation",
    issuingBody: "UNECE WP.29",
    whatItIs: "UN Regulation on software updates and software-update management systems",
    geography: "International — 1958 Agreement system",
    legalEffect: "UN Regulation under the 1958 Agreement; legally operative through the applicable Contracting Party/type-approval framework.",
    relevance: { EU: "◐", US: "—", China: "—" },
    takeaway: "A core concept is the SUMS — Software Update Management System.",
    source: "https://unece.org/transport/documents/2021/03/standards/un-regulation-no-156-software-update-and-software-update",
    learning: {
      plain: "UN R156 is a UN vehicle regulation on software updates and Software Update Management Systems (SUMS).",
      why: "Where it applies, manufacturers must deal with software-update capability through a formal regulatory management-system framework.",
      confusion: "UN R156 and ISO 24089 sit in the same software-update domain, but one is a regulation and the other is a voluntary engineering standard.",
    },
  },
  {
    id: "safety-case",
    name: "Safety assurance argumentation",
    cluster: "assurance",
    nodeType: "concept",
    issuingBody: "Cross-cutting assurance concept; terminology and requirements vary by regime",
    whatItIs: "Structured reasoning and evidence used to demonstrate that an ADS is acceptably safe in a defined operational context",
    geography: "Cross-jurisdictional concept; regulatory implementation is regime-specific",
    legalEffect: "Not a standalone universal legal requirement; specific assurance documentation and evidence may be required under an applicable approval or regulatory regime",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "Safety assurance is broader than a generic 'safety case': regulators may require safety concepts, argumentation, validation evidence, audits and testing without using one universal safety-case format. A generic safety case may organize claims and arguments supported by evidence; EU ADS type approval, for example, specifies its own safety-concept, documentation, validation and authority-assessment requirements.",
    source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R1426",
    learning: {
      plain: "Safety assurance is the structured reasoning and evidence used to show why an automated driving system is acceptably safe in a defined context.",
      why: "For complex ADS, safety is usually demonstrated through a combination of engineering argumentation, scenario-based validation, simulation, physical testing, process evidence and in-service data rather than one test or certificate.",
      confusion: "A 'safety case' is one assurance approach, not a single globally defined AV permit or certification document. Different regimes use different terminology and evidence requirements.",
    },
  },
  {
    id: "ul-4600",
    name: "UL 4600",
    cluster: "assurance",
    nodeType: "standard",
    issuingBody: "UL Standards & Engagement",
    whatItIs: "Safety standard for autonomous products",
    geography: "US-origin; potentially relevant beyond the US",
    legalEffect: "Voluntary standard",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "A safety-case-oriented standard for autonomous products, including systems without a human fallback.",
    source: "https://ulse.org/focus-areas/travel-safety/autonomous-vehicles/",
    learning: {
      plain: "UL 4600 is a safety standard designed for autonomous products and strongly oriented around safety-case reasoning.",
      why: "It is useful when the system must make a convincing safety argument without relying on a human driver as the default fallback.",
      confusion: "UL 4600 is not a generally binding AV law; its legal or evidentiary weight depends on the regime in which it is used.",
    },
  },
  {
    id: "iso-3450x",
    name: "ISO 3450x — scenario-based ADS safety evaluation",
    cluster: "assurance",
    nodeType: "standard",
    issuingBody: "ISO — International Organization for Standardization",
    whatItIs: "A family covering vocabulary (ISO 34501), a scenario-based safety evaluation framework (ISO 34502), ODD specification (ISO 34503), scenario categorization (ISO 34504), and scenario evaluation and test-case generation (ISO 34505)",
    geography: "International",
    legalEffect: "Voluntary ISO standards; use and evidentiary weight depend on the applicable assurance, approval or regulatory regime",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "ISO 34501–34505 structure scenario-based ADS evaluation. As of August 2026, ISO/DPAS 34506 on qualification of virtual test environments is under development and is not a final published standard.",
    source: "https://www.iso.org/committee/5383785/x/catalogue/p/0/u/1/",
    learning: {
      plain: "The ISO 3450x family supplies shared vocabulary and methods for defining ODDs, organizing scenarios, evaluating them and generating ADS test cases.",
      why: "Scenario-based evaluation helps connect the system's ODD to a traceable body of virtual and physical test evidence across many relevant situations.",
      confusion: "The family is not one global approval rule. ISO 34501–34505 are published standards, while ISO 34506 remains under development as of August 2026.",
    },
  },
  {
    id: "natm",
    name: "NATM / multi-pillar ADS assessment",
    cluster: "assurance",
    nodeType: "framework",
    issuingBody: "UNECE WP.29 / Working Party on Automated/Autonomous and Connected Vehicles (GRVA)",
    whatItIs: "The UNECE New Assessment/Test Method for ADS validation, combining evidence pillars including audit/assessment, simulation or virtual testing, track testing and real-world testing",
    geography: "International UNECE vehicle-regulation context",
    legalEffect: "UNECE assessment framework; legal effect arises through a UN Regulation or other applicable approval regime that implements its elements",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "NATM treats ADS safety assessment as a multi-pillar exercise: no single test environment is expected to supply the complete evidence base.",
    source: "https://unece.org/transport/documents/2021/04/working-documents/grva-new-assessmenttest-method-automated-driving-natm",
    learning: {
      plain: "NATM is UNECE's multi-pillar approach to assessing automated driving systems through documentation and audit, simulation, track tests and real-world tests.",
      why: "Each pillar exposes different strengths and limitations, so the combined evidence can support a more complete assessment of ADS behavior and safety.",
      confusion: "NATM is an assessment framework developed within WP.29, not by itself a globally binding approval or a substitute for the legal instrument that applies it.",
    },
  },
  {
    id: "wp29",
    name: "UNECE WP.29",
    cluster: "unece",
    nodeType: "institution",
    issuingBody: "UNECE — United Nations Economic Commission for Europe",
    whatItIs: "World Forum for Harmonization of Vehicle Regulations",
    geography: "International",
    legalEffect: "Institutional forum; not itself an individual vehicle requirement",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "WP.29 is the forum for distinct legal architectures, including UN Regulations under the 1958 Agreement and UN Global Technical Regulations under the 1998 Agreement.",
    source: "https://unece.org/wp29-introduction",
    learning: {
      plain: "WP.29 is a UN forum for international vehicle regulation. It is not one single vehicle rule.",
      why: "It is the institutional setting in which Contracting Parties develop instruments under separate agreements with different legal mechanisms.",
      confusion: "WP.29, the 1958 Agreement, the 1998 Agreement, a UN Regulation and a UN GTR are distinct layers of the architecture.",
    },
  },
  {
    id: "agreement-1958",
    name: "1958 Agreement",
    cluster: "unece",
    nodeType: "framework",
    issuingBody: "UNECE / Contracting Parties",
    whatItIs: "International agreement establishing a system for UN Regulations and reciprocal recognition of approvals",
    geography: "Contracting Parties",
    legalEffect: "International treaty framework; practical effect depends on participation and the relevant UN Regulation",
    relevance: { EU: "◐", US: "—", China: "—" },
    takeaway: "Provides the legal framework for UN Regulations and reciprocal recognition of type approvals among participating Contracting Parties.",
    source: "https://unece.org/trans/main/wp29/wp29regs",
    learning: {
      plain: "The 1958 Agreement is the legal framework behind a system of UN vehicle regulations and type-approval recognition.",
      why: "It explains how individual UN Regulations can operate across participating Contracting Parties.",
      confusion: "The Agreement is not itself the same thing as UN R155, UN R156 or UN R157.",
    },
  },
  {
    id: "un-regulations",
    name: "UN Regulations",
    cluster: "unece",
    nodeType: "framework",
    issuingBody: "UNECE WP.29",
    whatItIs: "Individual international technical regulations for vehicles, systems and components",
    geography: "Contracting Parties applying the relevant Regulation",
    legalEffect: "Legally operative through the applicable 1958 Agreement Contracting Party and type-approval framework; applicability is Regulation- and jurisdiction-specific",
    relevance: { EU: "◐", US: "—", China: "—" },
    takeaway: "UN Regulations form a regulatory / type-approval layer and should not be treated as equivalent to voluntary ISO or SAE standards.",
    source: "https://unece.org/un-regulations-addenda-1958-agreement",
    learning: {
      plain: "UN Regulations are individual technical rules within the international vehicle-regulation system.",
      why: "A particular Regulation can become part of a binding approval regime where it is applicable.",
      confusion: "“UNECE”, “WP.29”, “1958 Agreement” and “UN Regulation” are not interchangeable labels.",
    },
  },
  {
    id: "un-r157",
    name: "Example: UN R157 (ALKS)",
    cluster: "unece",
    nodeType: "regulation",
    issuingBody: "UNECE WP.29",
    whatItIs: "UN Regulation on Automated Lane Keeping Systems (ALKS)",
    geography: "1958 Agreement system",
    legalEffect: "UN Regulation under the 1958 Agreement; legally operative through the applicable Contracting Party/type-approval framework",
    relevance: { EU: "◐", US: "—", China: "—" },
    takeaway: "UN R157 is one specific UN Regulation for ALKS. It is an example within the UN Regulation architecture, not a general autonomous-vehicle law.",
    source: "https://unece.org/transport/vehicle-regulations-wp29/standards/addenda-1958-agreement-regulations-141-160",
    learning: {
      plain: "UN R157 is the UN Regulation for Automated Lane Keeping Systems (ALKS), an automated-driving function with a defined regulatory scope.",
      why: "It is a concrete example of how an automated-driving function can be addressed through an individual UN Regulation.",
      confusion: "UN R157 is one specific UN Regulation, not a general autonomous-vehicle law or a universal framework for all Level 3 systems.",
    },
  },
  {
    id: "agreement-1998",
    name: "1998 Agreement",
    cluster: "unece",
    nodeType: "framework",
    issuingBody: "UNECE / Contracting Parties",
    whatItIs: "International agreement establishing a process for developing and placing UN Global Technical Regulations in a Global Registry",
    geography: "Contracting Parties",
    legalEffect: "International treaty framework without reciprocal recognition of approvals; a UN GTR does not become directly applicable domestic law merely because it is established in the Global Registry",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "The 1998 Agreement runs parallel to the 1958 Agreement and produces UN GTRs, not UN Regulations or mutual type-approval recognition.",
    source: "https://unece.org/transport/road-transport/status-1998-agreement",
    learning: {
      plain: "The 1998 Agreement is the WP.29 treaty framework for developing UN Global Technical Regulations.",
      why: "It allows Contracting Parties with different regulatory systems to collaborate on globally harmonized technical provisions.",
      confusion: "A UN GTR under the 1998 Agreement is not the same as a UN Regulation under the 1958 Agreement and does not automatically create reciprocal approvals or direct domestic legal effect.",
    },
  },
  {
    id: "un-gtrs",
    name: "UN Global Technical Regulations (UN GTRs)",
    cluster: "unece",
    nodeType: "framework",
    issuingBody: "UNECE WP.29 under the 1998 Agreement",
    whatItIs: "Globally developed technical regulations established in the 1998 Agreement's Global Registry",
    geography: "1998 Agreement Contracting Parties and other jurisdictions choosing to implement them",
    legalEffect: "No automatic direct or globally uniform legal applicability; domestic or regional legal effect depends on implementation by the relevant Contracting Party",
    relevance: { EU: "◐", US: "◐", China: "◐" },
    takeaway: "UN GTRs support global technical harmonization, but they are legally distinct from the type-approval UN Regulations annexed to the 1958 Agreement.",
    source: "https://unece.org/transport/standards/transport/vehicle-regulations-wp29/global-technical-regulations-gtrs",
    learning: {
      plain: "UN GTRs are technical regulations developed through the 1998 Agreement and recorded in its Global Registry.",
      why: "They provide a common technical basis that participating jurisdictions can take through their own implementation processes.",
      confusion: "Being listed as a UN GTR does not by itself make the text directly applicable law in every Contracting Party or create mutual recognition of approvals.",
    },
  },

  // Jurisdiction overlays: these are intentionally kept out of the core system map.
  {
    id: "prc-traffic-art76",
    name: "PRC Road Traffic Safety Law — Art. 76",
    jurisdiction: "cn",
    nodeType: "national_law",
    issuingBody: "National People's Congress / Standing Committee",
    whatItIs: "Motor-vehicle accident compensation rule",
    geography: "China — national",
    legalEffect: "Binding national law",
    relevance: { EU: "—", US: "—", China: "✓" },
    takeaway: "A general accident-liability layer, not a dedicated ADS liability regime.",
    source: "https://www.npc.gov.cn/zgrdw/npc/zfjc/zfjcelys/2016-12/13/content_2003512.htm",
  },
  {
    id: "prc-product-liability",
    name: "PRC Civil Code — Arts. 1202–1206",
    jurisdiction: "cn",
    nodeType: "national_law",
    issuingBody: "National People's Congress",
    whatItIs: "Product-liability rules",
    geography: "China — national",
    legalEffect: "Binding national law",
    relevance: { EU: "—", US: "—", China: "✓" },
    takeaway: "A general product-liability layer relevant to defective products, not a dedicated AV rule.",
    source: "https://fjca.miit.gov.cn/zwgk/zcwj/wjfb/art/2020/art_9f0ef44677164c5eb3a5585bf82a07cb.html",
  },
  {
    id: "prc-criminal-art133",
    name: "PRC Criminal Law — Art. 133",
    jurisdiction: "cn",
    nodeType: "national_law",
    issuingBody: "National People's Congress / Standing Committee",
    whatItIs: "Traffic-accident criminal offence",
    geography: "China — national",
    legalEffect: "Binding criminal law",
    relevance: { EU: "—", US: "—", China: "✓" },
    takeaway: "A general criminal-law layer. It should not be simplified into a universal proposition about all AV criminal liability.",
    source: "https://www.npc.gov.cn/npc/c1773/c1848/c21114/c25714/c25716/201905/t20190522_46193.html",
  },
  {
    id: "us-defects-remedies",
    name: "49 U.S.C. §§ 30118–30120",
    jurisdiction: "us",
    nodeType: "national_law",
    issuingBody: "U.S. Congress / NHTSA enforcement",
    whatItIs: "Federal defect notification and remedy framework",
    geography: "United States — federal",
    legalEffect: "Binding federal law",
    relevance: { EU: "—", US: "✓", China: "—" },
    takeaway: "Illustrates the federal safety-defect, notification and remedy / recall layer; it is not a complete federal civil-liability regime for AV crashes.",
    source: "https://uscode.house.gov/view.xhtml?path=/prelim@title49/subtitle6/partA/chapter301&edition=prelim",
  },
];

export const EDGES: SystemEdge[] = [
  { from: "sae-j3016", to: "odd", kind: "structural", label: "defines" },
  { from: "odd", to: "iso-3450x", kind: "related", label: "bounds scenario evaluation" },

  { from: "iso-26262", to: "hara", kind: "structural", label: "uses" },
  { from: "hara", to: "sec", kind: "related", label: "uses as inputs" },
  { from: "sec", to: "asil", kind: "related", label: "supports classification" },
  { from: "hara", to: "asil", kind: "structural", label: "derives classification" },

  { from: "sotif", to: "iso-pas-8800", kind: "related", label: "complementary safety domains" },
  { from: "sotif", to: "safety-case", kind: "related", label: "supports assurance" },
  { from: "iso-pas-8800", to: "safety-case", kind: "related", label: "supports assurance" },

  { from: "iso-sae-21434", to: "un-r155", kind: "related", label: "same cyber domain" },
  { from: "iso-24089", to: "un-r156", kind: "related", label: "same software-update domain" },

  { from: "iso-3450x", to: "safety-case", kind: "related", label: "scenario-based evidence" },
  { from: "natm", to: "safety-case", kind: "related", label: "multi-pillar assessment" },
  { from: "natm", to: "wp29", kind: "framework", label: "developed within" },
  { from: "safety-case", to: "ul-4600", kind: "related", label: "safety-case-oriented example" },

  { from: "wp29", to: "agreement-1958", kind: "framework", label: "institutional context" },
  { from: "agreement-1958", to: "un-regulations", kind: "framework", label: "legal framework" },
  { from: "un-regulations", to: "un-r157", kind: "framework", label: "includes" },
  { from: "un-regulations", to: "un-r155", kind: "framework", label: "includes" },
  { from: "un-regulations", to: "un-r156", kind: "framework", label: "includes" },

  { from: "wp29", to: "agreement-1998", kind: "framework", label: "institutional context" },
  { from: "agreement-1998", to: "un-gtrs", kind: "framework", label: "establishes" },
];

export const NODE_TYPE_LABELS: Record<NodeType, string> = {
  standard: "Standard",
  concept: "Concept",
  regulation: "Regulation",
  institution: "Institution",
  framework: "Framework",
  methodology: "Methodology",
  national_law: "National law",
};
