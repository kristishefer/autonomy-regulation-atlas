import seedJson from "@/app/explore/learning-safety-standards-seed-v1.json";
import {
  getRegulatorySource,
  type SourceId,
} from "@/app/explore/regulatory-data";

export type KnowledgeConceptId =
  | "safety-assurance"
  | "functional-safety"
  | "sotif"
  | "odd"
  | "scenario-based-assessment"
  | "safety-case-evidence";

export type LearningPath = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coreQuestion: string;
  order: number;
  conceptIds: KnowledgeConceptId[];
  status: string;
  lastVerified: string;
};

type CommonConfusion = { title: string; body: string };
type SourceReference = { sourceId: string; context: string };
type RegulatoryExample = {
  title: string;
  sourceIds: string[];
  takeaway: string;
};
type KnowledgeCheck = { question: string; answer: string };

export type KnowledgeConcept = {
  id: KnowledgeConceptId;
  slug: string;
  title: string;
  coreQuestion: string;
  atlasDefinition: string;
  plainEnglish: string;
  whyItMatters: string[];
  commonConfusions: CommonConfusion[];
  levels: {
    essentials: { summary: string; keyPoints: string[] };
    applied: {
      howItWorks: string[];
      regulatoryRelevance: string[];
      regulatoryExamples: RegulatoryExample[];
      jurisdictionOverlayIds: string[];
      caseIds: string[];
      caseDisplayNote?: string;
      checkYourUnderstanding: KnowledgeCheck[];
    };
    deepDive: { summary: string; topics: string[]; sourceIds: string[] };
  };
  standardIds: string[];
  relatedConceptIds: KnowledgeConceptId[];
  glossary: boolean;
  sourceIds: string[];
  lastVerified: string;
};

export type KnowledgeTerm = {
  id: string;
  term: string;
  expandedName?: string;
  glossary: boolean;
  atlasDefinition: string;
  officialDefinitionRefs: SourceReference[];
  commonConfusions: string[];
  relatedConceptIds: KnowledgeConceptId[];
  sourceIds: string[];
  lastVerified: string;
};

export type KnowledgeStandard = {
  id: string;
  name: string;
  fullTitle: string;
  publisher: string;
  currentEdition: string;
  status: "published" | "published_to_be_revised";
  scope: string;
  whatItDoes: string[];
  whatItDoesNotDo: string[];
  avRelevance: string;
  relatedConceptIds: KnowledgeConceptId[];
  officialSourceId: string;
  watchIds: string[];
  lastVerified: string;
};

export type RealCase = {
  id: string;
  title: string;
  date: string;
  jurisdiction: string;
  authority: string;
  documentType: string;
  officiallyEstablished: boolean;
  establishedFacts: string[];
  authorityFindings: string[];
  atlasRelevance: string[];
  notToConclude: string[];
  primaryConceptIds: KnowledgeConceptId[];
  secondaryConceptIds: KnowledgeConceptId[];
  mvpDisplay: boolean;
  sourceIds: string[];
  lastVerified: string;
};

type OverlayBase = {
  id: string;
  conceptId: KnowledgeConceptId;
  jurisdictionId: "netherlands" | "germany";
  summary: string;
  legalContext: string;
  whatIsDifferentHere: string;
  instrumentRefs: string[];
  sourceIds: string[];
  lastVerified: string;
};

export type JurisdictionOverlay =
  | (OverlayBase & { confidenceStatus: "established" })
  | (OverlayBase & {
      confidenceStatus: "unclear";
      uncertaintyReason: string;
    })
  | (OverlayBase & {
      confidenceStatus: "not_identified";
      searchScope: string;
    });

export type StandardsWatchItem = {
  id: string;
  title: string;
  status: string;
  displayRule: string;
  sourceIds: string[];
  lastVerified: string;
};

export type PortableSource = {
  id: string;
  title: string;
  authority: string;
  type:
    | "standard"
    | "draft_standard"
    | "publicly_available_specification"
    | "draft_specification"
    | "guideline"
    | "binding_law"
    | "binding_regulation"
    | "final_investigation_report"
    | "regulatory_decision_statement"
    | "consent_order";
  status: string;
  url: string;
  lastVerified: string;
};

type LearningSeed = {
  schemaVersion: string;
  generatedFor: string;
  lastVerified: string;
  learningPaths: LearningPath[];
  concepts: KnowledgeConcept[];
  terms: KnowledgeTerm[];
  standards: KnowledgeStandard[];
  realCases: RealCase[];
  jurisdictionOverlays: JurisdictionOverlay[];
  standardsWatch: StandardsWatchItem[];
  sources: PortableSource[];
  contentRules: Record<string, boolean>;
};

export type LearningSource = {
  id: string;
  title: string;
  shortTitle: string;
  authority: string;
  category:
    | "Binding law"
    | "Technical standard"
    | "Draft technical work"
    | "UNECE guidance"
    | "Official investigation"
    | "Regulatory action";
  status: string;
  url: string;
  lastVerified: string;
};

export type GlossaryEntry =
  | { kind: "concept"; id: string; label: string; item: KnowledgeConcept }
  | { kind: "term"; id: string; label: string; item: KnowledgeTerm };

const seed = seedJson as unknown as LearningSeed;

const explorerSourceAdapter: Partial<Record<string, SourceId>> = {
  "src-eu-2022-1426-consolidated": "eu-2022-1426",
  "src-eu-2026-481": "eu-2026-481",
  "src-nl-wvw-1994": "nl-wvw",
  "src-nl-experiment-regulation": "nl-experiment-regulation",
  "src-de-stvg": "de-stvg",
  "src-de-afgbv": "de-afgbv",
};

const conceptById = new Map(seed.concepts.map((item) => [item.id, item]));
const standardById = new Map(seed.standards.map((item) => [item.id, item]));
const caseById = new Map(seed.realCases.map((item) => [item.id, item]));
const overlayById = new Map(seed.jurisdictionOverlays.map((item) => [item.id, item]));
const watchById = new Map(seed.standardsWatch.map((item) => [item.id, item]));
const portableSourceById = new Map(seed.sources.map((item) => [item.id, item]));

export const LEARNING_SEED_META = {
  schemaVersion: seed.schemaVersion,
  lastVerified: seed.lastVerified,
};

export const LEARNING_PATHS = seed.learningPaths;
export const KNOWLEDGE_CONCEPTS = seed.concepts;
export const KNOWLEDGE_TERMS = seed.terms;
export const KNOWLEDGE_STANDARDS = seed.standards;
export const REAL_CASE_LIBRARY = seed.realCases;
export const JURISDICTION_OVERLAYS = seed.jurisdictionOverlays;
export const STANDARDS_WATCH = seed.standardsWatch;

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  ...seed.concepts
    .filter((item) => item.glossary)
    .map((item) => ({
      kind: "concept" as const,
      id: item.id,
      label: item.title,
      item,
    })),
  ...seed.terms
    .filter((item) => item.glossary)
    .map((item) => ({
      kind: "term" as const,
      id: item.id,
      label: item.expandedName
        ? `${item.term} — ${item.expandedName}`
        : item.term,
      item,
    })),
].sort((a, b) => a.label.localeCompare(b.label));

export function getLearningPath(slug: string) {
  return LEARNING_PATHS.find((item) => item.slug === slug) ?? null;
}

export function getKnowledgeConcept(id: KnowledgeConceptId) {
  const concept = conceptById.get(id);
  if (!concept) throw new Error(`Missing Learning concept: ${id}`);
  return concept;
}

export function getKnowledgeConceptBySlug(slug: string) {
  return KNOWLEDGE_CONCEPTS.find((item) => item.slug === slug) ?? null;
}

export function getKnowledgeStandard(id: string) {
  const standard = standardById.get(id);
  if (!standard) throw new Error(`Missing Learning standard: ${id}`);
  return standard;
}

export function getRealCase(id: string) {
  const realCase = caseById.get(id);
  if (!realCase) throw new Error(`Missing Learning real case: ${id}`);
  return realCase;
}

export function getJurisdictionOverlay(id: string) {
  const overlay = overlayById.get(id);
  if (!overlay) throw new Error(`Missing jurisdiction overlay: ${id}`);
  return overlay;
}

export function getStandardsWatchItem(id: string) {
  const item = watchById.get(id);
  if (!item) throw new Error(`Missing Standards Watch item: ${id}`);
  return item;
}

export function resolveLearningSource(id: string): LearningSource {
  const explorerId = explorerSourceAdapter[id];
  if (explorerId) {
    const source = getRegulatorySource(explorerId);
    return {
      id,
      title: source.title,
      shortTitle: source.shortTitle,
      authority: source.authority,
      category: "Binding law",
      status: source.statusLabel,
      url: source.url,
      lastVerified: source.lastChecked,
    };
  }

  const source = portableSourceById.get(id);
  if (!source) throw new Error(`Missing Learning source: ${id}`);

  return {
    id: source.id,
    title: source.title,
    shortTitle: shortSourceTitle(source),
    authority: source.authority,
    category: sourceCategory(source.type),
    status: source.status,
    url: source.url,
    lastVerified: source.lastVerified,
  };
}

function shortSourceTitle(source: PortableSource) {
  if (source.authority === "ISO") return source.title.split(" — ")[0];
  if (source.id === "src-iso-sae-22736-2021") return "ISO/SAE PAS 22736:2021";
  if (source.id === "src-iso-sae-cd-ts-22736") return "ISO/SAE CD TS 22736";
  if (source.id === "src-unece-natm-2023") return "UNECE NATM";
  if (source.id === "src-unece-ads-guidelines-2025") return "UNECE ADS guidelines";
  if (source.id.startsWith("src-ntsb")) return "NTSB investigation";
  if (source.id.startsWith("src-ca-dmv")) return "California DMV action";
  if (source.id.startsWith("src-nhtsa")) return "NHTSA consent order";
  return source.title;
}

function sourceCategory(type: PortableSource["type"]): LearningSource["category"] {
  if (type === "binding_law" || type === "binding_regulation") {
    return "Binding law";
  }
  if (type === "standard" || type === "publicly_available_specification") {
    return "Technical standard";
  }
  if (type === "draft_standard" || type === "draft_specification") {
    return "Draft technical work";
  }
  if (type === "guideline") return "UNECE guidance";
  if (type === "final_investigation_report") return "Official investigation";
  return "Regulatory action";
}

function validateSeed() {
  const errors: string[] = [];
  const sourceIds = new Set([
    ...seed.sources.map((item) => item.id),
    ...Object.keys(explorerSourceAdapter),
  ]);

  const checkSources = (owner: string, ids: string[]) => {
    for (const id of ids) {
      if (!sourceIds.has(id)) errors.push(`${owner}: missing source ${id}`);
    }
  };

  for (const path of seed.learningPaths) {
    for (const id of path.conceptIds) {
      if (!conceptById.has(id)) errors.push(`${path.id}: missing concept ${id}`);
    }
  }

  for (const concept of seed.concepts) {
    checkSources(concept.id, concept.sourceIds);
    checkSources(concept.id, concept.levels.deepDive.sourceIds);
    for (const example of concept.levels.applied.regulatoryExamples) {
      checkSources(`${concept.id}/${example.title}`, example.sourceIds);
    }
    for (const id of concept.standardIds) {
      if (!standardById.has(id)) errors.push(`${concept.id}: missing standard ${id}`);
    }
    for (const id of concept.levels.applied.jurisdictionOverlayIds) {
      if (!overlayById.has(id)) errors.push(`${concept.id}: missing overlay ${id}`);
    }
    for (const id of concept.levels.applied.caseIds) {
      if (!caseById.has(id)) errors.push(`${concept.id}: missing case ${id}`);
    }
  }

  for (const term of seed.terms) {
    checkSources(term.id, term.sourceIds);
    checkSources(
      `${term.id}/official-definition`,
      term.officialDefinitionRefs.map((item) => item.sourceId),
    );
  }

  for (const standard of seed.standards) {
    checkSources(standard.id, [standard.officialSourceId]);
    for (const id of standard.watchIds) {
      if (!watchById.has(id)) errors.push(`${standard.id}: missing watch item ${id}`);
    }
  }

  for (const realCase of seed.realCases) {
    checkSources(realCase.id, realCase.sourceIds);
    for (const id of [...realCase.primaryConceptIds, ...realCase.secondaryConceptIds]) {
      if (!conceptById.has(id)) errors.push(`${realCase.id}: missing concept ${id}`);
    }
  }

  for (const overlay of seed.jurisdictionOverlays) {
    checkSources(overlay.id, overlay.sourceIds);
    if (!conceptById.has(overlay.conceptId)) {
      errors.push(`${overlay.id}: missing concept ${overlay.conceptId}`);
    }
    if (overlay.confidenceStatus === "not_identified" && !overlay.searchScope) {
      errors.push(`${overlay.id}: Not identified requires search scope`);
    }
    if (overlay.confidenceStatus === "unclear" && !overlay.uncertaintyReason) {
      errors.push(`${overlay.id}: Unclear requires uncertainty reason`);
    }
  }

  for (const item of seed.standardsWatch) {
    checkSources(item.id, item.sourceIds);
  }

  if (errors.length) {
    throw new Error(`Invalid Learning seed:\n${errors.join("\n")}`);
  }
}

validateSeed();
