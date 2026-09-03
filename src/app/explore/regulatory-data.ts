import type { LearningConceptId } from "@/app/explore/learning-concepts";
import expansionSeed from "@/app/explore/jurisdiction-expansion-seed-v1.json";
import {
  assertQuarantinedSourcesNotExposed,
  validateConclusionRecord,
  validateProfileScope,
  validateStagedSource,
  type RegimeComponentStatus,
  type ResearchCoverage,
  type ReviewMetadata,
  type SelectedScenario,
} from "@/app/explore/regulatory-model";

export type {
  OperatingEnvironment,
  RegimeComponentStatus,
  RegulatoryUseCase,
  ResearchCoverage,
  ReviewMetadata,
  ReviewMethod,
  ReviewStatus,
  SelectedScenario,
  SystemClass,
  VehicleCategory,
} from "@/app/explore/regulatory-model";

export type JurisdictionSlug =
  | "netherlands"
  | "germany"
  | "united-states"
  | "russia"
  | "united-kingdom";

export type ConfidenceStatus = "established" | "unclear" | "not_identified";

export type LegalStatus =
  | "in_force"
  | "adopted_not_yet_effective"
  | "proposed"
  | "draft"
  | "guidance"
  | "legislative_history"
  | "case_law"
  | "mixed";

export type SourceType =
  | "official_legislation"
  | "official_regulation"
  | "official_guidance"
  | "regulator_material"
  | "legislative_history"
  | "court_decision"
  | "eu_legislation";

export type StatusTone = "positive" | "conditional" | "neutral" | "watch";

export type RegulatoryScope = {
  vehicleType?: string;
  automation?: string;
  roadType?: string;
  useCase?: string;
  humanRole?: string;
  geographicScope?: string;
};

export type SourceReference = {
  sourceId: SourceId;
  provision?: string;
  legalStatus?: Exclude<LegalStatus, "mixed">;
  effectiveFrom?: string;
  effectiveTo?: string;
  regimeComponent?: string;
};

export type RegulatoryConclusion = {
  key: CompareFieldId;
  label: string;
  status: string;
  tone: StatusTone;
  confidenceStatus: ConfidenceStatus;
  scope: RegulatoryScope;
  scopeLabel: string;
  summary: string;
  legalBasis: SourceReference[];
  legalStatus: LegalStatus;
  lastVerified: string;
  review: ReviewMetadata;
  regimeComponents?: RegimeComponentStatus[];
  atlasAnalysis?: string;
  uncertaintyReason?: string;
  searchScope?: string;
};

export type RegulatorySource = {
  id: SourceId;
  title: string;
  shortTitle: string;
  authority: string;
  url: string;
  type: SourceType;
  legalStatus: LegalStatus;
  statusLabel: string;
  lastChecked: string;
  jurisdiction: string;
  review?: ReviewMetadata;
  stagedCommencement?: boolean;
  regimeComponents?: RegimeComponentStatus[];
};

export type JurisdictionSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  flow?: string[];
  takeaway?: string;
  explain?: LearningConceptId[];
  sources: SourceReference[];
};

export type SnapshotItem = {
  label: string;
  status: string;
  tone: StatusTone;
  scope?: string;
};

export type DeploymentAnswerItem = {
  label: string;
  answer: string;
  detail: string;
  tone: StatusTone;
};

export type ScenarioScopeItem = {
  label: string;
  value: string;
};

export type PageNavigationItem = {
  label: string;
  href: `#${string}`;
};

export type JurisdictionProfile = {
  slug: JurisdictionSlug;
  name: string;
  code: string;
  scopeNote?: string;
  localizedNames?: Partial<Record<"en" | "de" | "nl" | "ru", string>>;
  scenario: string;
  scenarioScope: ScenarioScopeItem[];
  selectedScenario: SelectedScenario;
  researchCoverage: ResearchCoverage;
  verifiedLabel: string;
  primaryMessage: string;
  deploymentAnswers: DeploymentAnswerItem[];
  snapshot: SnapshotItem[];
  pageNavigation: PageNavigationItem[];
  architectureLayers: {
    label: string;
    body: string;
  }[];
  architectureConclusion: string;
  sections: JurisdictionSection[];
  deploymentConclusion: string[];
  practicalQuestions: string[];
  conclusions: Record<CompareFieldId, RegulatoryConclusion>;
  sourceIds: SourceId[];
};

export type CompareFieldId =
  | "general_no_driver_operation"
  | "testing_regime"
  | "deployment_regime"
  | "commercial_use"
  | "primary_human_role"
  | "human_performs_driving_task"
  | "continuous_human_monitoring"
  | "remote_driving_framework"
  | "operating_scope_model"
  | "separate_operating_area_approval"
  | "odd_legal_relevance"
  | "traffic_rules_model"
  | "traffic_rule_exemptions"
  | "ads_rule_compliance"
  | "approval_routes"
  | "eu_ads_type_approval"
  | "separate_operational_authorization"
  | "safety_assurance_model"
  | "technical_standards"
  | "holder_operator_duties"
  | "maintenance_inspection"
  | "qualified_personnel"
  | "operational_data_recording"
  | "incident_event_reporting"
  | "regulator_data_access"
  | "av_liability_model"
  | "holder_liability"
  | "motor_insurance"
  | "av_insurance_adaptation"
  | "competent_authorities"
  | "principal_instruments";

export const COMPARE_GROUPS: {
  id: string;
  title: string;
  description: string;
  fields: { id: CompareFieldId; label: string }[];
}[] = [
  {
    id: "access",
    title: "Access & deployment",
    description: "Whether the scenario reaches the road through testing, a deployment regime or another route.",
    fields: [
      { id: "general_no_driver_operation", label: "General no-driver road operation" },
      { id: "testing_regime", label: "Testing regime" },
      { id: "deployment_regime", label: "Deployment regime" },
      { id: "commercial_use", label: "Commercial use" },
    ],
  },
  {
    id: "human",
    title: "Human role",
    description: "Who remains legally relevant and whether that person performs or monitors the driving task.",
    fields: [
      { id: "primary_human_role", label: "Primary human role" },
      { id: "human_performs_driving_task", label: "Human performs driving task" },
      { id: "continuous_human_monitoring", label: "Continuous human monitoring" },
      { id: "remote_driving_framework", label: "Remote driving framework" },
    ],
  },
  {
    id: "domain",
    title: "Operating domain",
    description: "How technical operating conditions connect to the legally approved place or route.",
    fields: [
      { id: "operating_scope_model", label: "Operating scope model" },
      { id: "separate_operating_area_approval", label: "Separate operating-area approval" },
      { id: "odd_legal_relevance", label: "ODD legal relevance" },
    ],
  },
  {
    id: "traffic",
    title: "Traffic rules",
    description: "How ordinary road rules apply and where the framework assigns compliance.",
    fields: [
      { id: "traffic_rules_model", label: "Traffic-rules model" },
      { id: "traffic_rule_exemptions", label: "Availability of exemptions" },
      { id: "ads_rule_compliance", label: "ADS responsibility for compliance" },
    ],
  },
  {
    id: "approval",
    title: "Approval & safety",
    description: "Product approval, operational permission and the evidence used to demonstrate safety.",
    fields: [
      { id: "approval_routes", label: "Vehicle / ADS approval routes" },
      { id: "eu_ads_type_approval", label: "EU ADS type approval" },
      { id: "separate_operational_authorization", label: "Separate operational authorization" },
      { id: "safety_assurance_model", label: "Safety-assurance model" },
      { id: "technical_standards", label: "Technical standards" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    description: "Continuing duties placed on the operating organization and its people.",
    fields: [
      { id: "holder_operator_duties", label: "Holder / operator duties" },
      { id: "maintenance_inspection", label: "Maintenance / inspection" },
      { id: "qualified_personnel", label: "Qualified personnel" },
    ],
  },
  {
    id: "data",
    title: "Data & incidents",
    description: "Recording, event triggers and access by the competent authority remain distinct questions.",
    fields: [
      { id: "operational_data_recording", label: "Operational-data recording" },
      { id: "incident_event_reporting", label: "Incident / event reporting" },
      { id: "regulator_data_access", label: "Regulator data access" },
    ],
  },
  {
    id: "liability",
    title: "Liability & insurance",
    description: "The underlying liability architecture and any AV-specific adaptations.",
    fields: [
      { id: "av_liability_model", label: "AV liability model" },
      { id: "holder_liability", label: "Holder liability" },
      { id: "motor_insurance", label: "Compulsory motor insurance" },
      { id: "av_insurance_adaptation", label: "AV-specific insurance adaptation" },
    ],
  },
  {
    id: "architecture",
    title: "Legal architecture",
    description: "The authorities and principal instruments supporting the conclusion.",
    fields: [
      { id: "competent_authorities", label: "Competent authorities" },
      { id: "principal_instruments", label: "Principal instruments" },
    ],
  },
];

export type SourceId =
  | "eu-2018-858"
  | "eu-2019-2144"
  | "eu-2022-1426"
  | "eu-2026-481"
  | "nl-wvw"
  | "nl-rvv"
  | "nl-experiment-regulation"
  | "nl-wam"
  | "nl-civil-code-6"
  | "nl-history-34838-3"
  | "nl-history-34838-4"
  | "de-stvg"
  | "de-afgbv"
  | "de-stvo"
  | "de-pflvg"
  | "us-title49-ch301"
  | "us-49cfr-555"
  | "us-nhtsa-sgo"
  | "us-ca-veh-38750"
  | "us-ca-dmv-av-regulations"
  | "us-ca-dmv-2026-summary"
  | "us-ca-dmv-permits"
  | "us-ca-dmv-incidents"
  | "us-ca-cpuc-programs"
  | "us-ca-cpuc-permits"
  | "us-ca-cpuc-rulemaking-2025"
  | "ru-258fz"
  | "ru-2495"
  | "ru-1955"
  | "ru-347"
  | "ru-mintrans-draft-vats"
  | "uk-aeva-2018"
  | "uk-av-act-2024"
  | "uk-vca-pilot"
  | "uk-pilot-guidance"
  | "uk-listed-vehicles"
  | "uk-aps-regs-2026"
  | "uk-commencement2-2026"
  | "uk-aps-local-guidance"
  | "uk-sosp-consultation"
  | "uk-highway-code"
  | "uk-commencement3-2026"
  | "uk-marketing-regs-2026";

const BASE_REGULATORY_SOURCES = {
  "eu-2018-858": {
    id: "eu-2018-858",
    title: "Regulation (EU) 2018/858",
    shortTitle: "EU 2018/858",
    authority: "European Parliament and Council",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02018R0858-20240701",
    type: "eu_legislation",
    legalStatus: "in_force",
    statusLabel: "Current consolidated text",
    lastChecked: "2026-08-31",
    jurisdiction: "EU",
  },
  "eu-2019-2144": {
    id: "eu-2019-2144",
    title: "Regulation (EU) 2019/2144",
    shortTitle: "EU 2019/2144",
    authority: "European Parliament and Council",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R2144",
    type: "eu_legislation",
    legalStatus: "in_force",
    statusLabel: "In force",
    lastChecked: "2026-08-31",
    jurisdiction: "EU",
  },
  "eu-2022-1426": {
    id: "eu-2022-1426",
    title: "Commission Implementing Regulation (EU) 2022/1426",
    shortTitle: "EU 2022/1426",
    authority: "European Commission",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02022R1426-20260324",
    type: "eu_legislation",
    legalStatus: "in_force",
    statusLabel: "Current consolidated text · 24 Mar 2026",
    lastChecked: "2026-08-31",
    jurisdiction: "EU",
  },
  "eu-2026-481": {
    id: "eu-2026-481",
    title: "Commission Implementing Regulation (EU) 2026/481",
    shortTitle: "EU 2026/481",
    authority: "European Commission",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0481",
    type: "eu_legislation",
    legalStatus: "in_force",
    statusLabel: "In force · amends EU 2022/1426",
    lastChecked: "2026-08-31",
    jurisdiction: "EU",
  },
  "nl-wvw": {
    id: "nl-wvw",
    title: "Wegenverkeerswet 1994",
    shortTitle: "WVW 1994",
    authority: "Government of the Netherlands",
    url: "https://wetten.overheid.nl/BWBR0006622/",
    type: "official_legislation",
    legalStatus: "in_force",
    statusLabel: "Current law",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "nl-rvv": {
    id: "nl-rvv",
    title: "Reglement verkeersregels en verkeerstekens 1990",
    shortTitle: "RVV 1990",
    authority: "Government of the Netherlands",
    url: "https://wetten.overheid.nl/BWBR0004825/",
    type: "official_regulation",
    legalStatus: "in_force",
    statusLabel: "Current law",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "nl-experiment-regulation": {
    id: "nl-experiment-regulation",
    title: "Regeling vergunningverlening experimenten zelfrijdende auto",
    shortTitle: "Experimental permit regulation",
    authority: "Minister for Infrastructure and Water Management",
    url: "https://wetten.overheid.nl/BWBR0042343/",
    type: "official_regulation",
    legalStatus: "in_force",
    statusLabel: "In force since 1 Jul 2019",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "nl-wam": {
    id: "nl-wam",
    title: "Wet aansprakelijkheidsverzekering motorrijtuigen",
    shortTitle: "WAM",
    authority: "Government of the Netherlands",
    url: "https://wetten.overheid.nl/BWBR0002415/",
    type: "official_legislation",
    legalStatus: "in_force",
    statusLabel: "Current law",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "nl-civil-code-6": {
    id: "nl-civil-code-6",
    title: "Burgerlijk Wetboek Boek 6",
    shortTitle: "Civil Code Book 6",
    authority: "Government of the Netherlands",
    url: "https://wetten.overheid.nl/BWBR0005289/",
    type: "official_legislation",
    legalStatus: "in_force",
    statusLabel: "Current law",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "nl-history-34838-3": {
    id: "nl-history-34838-3",
    title: "Kamerstuk 34 838, nr. 3 — Memorie van toelichting",
    shortTitle: "Legislative history 34 838, nr. 3",
    authority: "Tweede Kamer der Staten-Generaal",
    url: "https://zoek.officielebekendmakingen.nl/kst-34838-3.html",
    type: "legislative_history",
    legalStatus: "legislative_history",
    statusLabel: "Legislative history · not binding law",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "nl-history-34838-4": {
    id: "nl-history-34838-4",
    title: "Kamerstuk 34 838, nr. 4 — Advice and response",
    shortTitle: "Legislative history 34 838, nr. 4",
    authority: "Council of State / Tweede Kamer",
    url: "https://zoek.officielebekendmakingen.nl/kst-34838-4.html",
    type: "legislative_history",
    legalStatus: "legislative_history",
    statusLabel: "Legislative history · not binding law",
    lastChecked: "2026-08-31",
    jurisdiction: "Netherlands",
  },
  "de-stvg": {
    id: "de-stvg",
    title: "Straßenverkehrsgesetz",
    shortTitle: "StVG",
    authority: "Federal Republic of Germany",
    url: "https://www.gesetze-im-internet.de/stvg/",
    type: "official_legislation",
    legalStatus: "in_force",
    statusLabel: "Current consolidated text",
    lastChecked: "2026-08-31",
    jurisdiction: "Germany",
  },
  "de-afgbv": {
    id: "de-afgbv",
    title: "Autonome-Fahrzeuge-Genehmigungs-und-Betriebs-Verordnung",
    shortTitle: "AFGBV",
    authority: "Federal Republic of Germany",
    url: "https://www.gesetze-im-internet.de/afgbv/",
    type: "official_regulation",
    legalStatus: "in_force",
    statusLabel: "Current text · amended 12 May 2026",
    lastChecked: "2026-08-31",
    jurisdiction: "Germany",
  },
  "de-stvo": {
    id: "de-stvo",
    title: "Straßenverkehrs-Ordnung",
    shortTitle: "StVO",
    authority: "Federal Republic of Germany",
    url: "https://www.gesetze-im-internet.de/stvo_2013/",
    type: "official_regulation",
    legalStatus: "in_force",
    statusLabel: "Current consolidated text",
    lastChecked: "2026-08-31",
    jurisdiction: "Germany",
  },
  "de-pflvg": {
    id: "de-pflvg",
    title: "Pflichtversicherungsgesetz",
    shortTitle: "PflVG",
    authority: "Federal Republic of Germany",
    url: "https://www.gesetze-im-internet.de/pflvg/",
    type: "official_legislation",
    legalStatus: "in_force",
    statusLabel: "Current law",
    lastChecked: "2026-08-31",
    jurisdiction: "Germany",
  },
} as const satisfies Record<string, RegulatorySource>;

type ExpansionSourceInput = Omit<RegulatorySource, "id"> & {
  id: SourceId;
  exposeOnlyAfterValidation?: boolean;
};

const validatedConditionalSourceIds = new Set<SourceId>([
  "ru-1955",
]);

const withheldSourceIds = new Set<SourceId>([
  "ru-347",
  "uk-commencement3-2026",
  "uk-marketing-regs-2026",
]);

const expansionSourceCorrections: Partial<
  Record<SourceId, Partial<RegulatorySource>>
> = {
  "us-ca-dmv-av-regulations": {
    statusLabel:
      "In force · effective 28 Apr 2026; specified reporting duties operative 26 Aug 2026",
    regimeComponents: [
      {
        component: "Articles 3.7 and 3.8 generally",
        legalStatus: "in_force",
        effectiveFrom: "2026-04-28",
        provision: "13 CCR Articles 3.7 and 3.8",
      },
      {
        component: "Specified testing-data reporting duties",
        legalStatus: "in_force",
        effectiveFrom: "2026-08-26",
        provision: "13 CCR §§ 227.56–227.60 and 227.66",
        note: "The adopted text made these duties operative 120 days after 28 April 2026.",
      },
    ],
  },
  "uk-av-act-2024": {
    legalStatus: "mixed",
    statusLabel:
      "Enacted framework · limited provisions commenced; full authorisation regime not yet operational",
    stagedCommencement: true,
    regimeComponents: [
      {
        component: "Automated passenger-services pilot provisions",
        legalStatus: "in_force",
        effectiveFrom: "2026-05-15",
        sourceId: "uk-commencement2-2026",
      },
      {
        component: "Full vehicle-authorisation and in-use regulatory framework",
        legalStatus: "adopted_not_yet_effective",
        note: "Commencement remains provision-specific; do not treat the complete Act as operational.",
      },
    ],
  },
  "uk-aps-regs-2026": {
    title: "The Automated Vehicles (Permits for Automated Passenger Services) Regulations 2026",
    shortTitle: "APS permit regulations 2026",
  },
};

function isSourceExposed(source: ExpansionSourceInput) {
  if (withheldSourceIds.has(source.id)) return false;
  return (
    !source.exposeOnlyAfterValidation ||
    validatedConditionalSourceIds.has(source.id)
  );
}

const EXPANSION_REGULATORY_SOURCES = Object.fromEntries(
  (expansionSeed.sources as ExpansionSourceInput[])
    .filter(isSourceExposed)
    .map((source) => [
      source.id,
      {
        ...source,
        ...expansionSourceCorrections[source.id],
      } satisfies RegulatorySource,
    ]),
) as Partial<Record<SourceId, RegulatorySource>>;

export const REGULATORY_SOURCES: Partial<
  Record<SourceId, RegulatorySource>
> = {
  ...BASE_REGULATORY_SOURCES,
  ...EXPANSION_REGULATORY_SOURCES,
};

Object.values(REGULATORY_SOURCES).forEach((source) => {
  if (source) validateStagedSource(source);
});

const DEFAULT_NEXT_REVIEW = "2026-10-01";

function claimReview(
  reviewedAt: string,
  reviewMethod: ReviewMetadata["reviewMethod"] = "official_public_text",
  stale = false,
): ReviewMetadata {
  return {
    reviewedAt,
    nextReviewAt: DEFAULT_NEXT_REVIEW,
    reviewer: "Atlas regulatory audit",
    reviewMethod,
    stale,
  };
}

type ConclusionInput = Omit<RegulatoryConclusion, "lastVerified" | "review"> & {
  review?: ReviewMetadata;
};

function conclusion(input: ConclusionInput): RegulatoryConclusion {
  const record: RegulatoryConclusion = {
    ...input,
    lastVerified: "2026-09-03",
    review: input.review ?? claimReview("2026-09-03"),
  };
  validateConclusionRecord(record);
  return record;
}

const passengerRoadScope: RegulatoryScope = {
  vehicleType: "Passenger vehicle",
  automation: "ADS operation without a person performing the driving task",
  roadType: "Public roads",
  useCase: "Testing or operational deployment",
};

type EstablishedInput = {
  key: CompareFieldId;
  label: string;
  status: string;
  summary: string;
  legalBasis: SourceReference[];
  tone?: StatusTone;
  scope?: RegulatoryScope;
  scopeLabel?: string;
  atlasAnalysis?: string;
  legalStatus?: LegalStatus;
  review?: ReviewMetadata;
  regimeComponents?: RegimeComponentStatus[];
};

function established(input: EstablishedInput) {
  return conclusion({
    ...input,
    tone: input.tone ?? "conditional",
    confidenceStatus: "established",
    scope: input.scope ?? passengerRoadScope,
    scopeLabel:
      input.scopeLabel ?? "Driverless passenger vehicles · public roads",
    legalStatus: input.legalStatus ?? "in_force",
  });
}

function notIdentified(
  input: EstablishedInput & { searchScope: string },
) {
  return conclusion({
    ...input,
    tone: input.tone ?? "neutral",
    confidenceStatus: "not_identified",
    scope: input.scope ?? passengerRoadScope,
    scopeLabel:
      input.scopeLabel ?? "Driverless passenger vehicles · public roads",
    legalStatus: input.legalStatus ?? "in_force",
  });
}

function unclear(
  input: EstablishedInput & { uncertaintyReason: string },
) {
  return conclusion({
    ...input,
    tone: input.tone ?? "watch",
    confidenceStatus: "unclear",
    scope: input.scope ?? passengerRoadScope,
    scopeLabel:
      input.scopeLabel ?? "Driverless passenger vehicles · public roads",
    legalStatus: input.legalStatus ?? "in_force",
  });
}

const NL_CONCLUSIONS: Record<CompareFieldId, RegulatoryConclusion> = {
  general_no_driver_operation: notIdentified({
    key: "general_no_driver_operation",
    label: "General no-driver road operation",
    status: "Not identified",
    summary:
      "A dedicated experiment route exists, but no general Dutch public-road regime for operation without a legally relevant human driver has been identified.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-experiment-regulation", provision: "Articles 1–6" },
    ],
    searchScope:
      "Current WVW 1994, RVV 1990, the out-of-vehicle-driver experimental regime and current EU ADS approval instruments were reviewed through 31 August 2026.",
  }),
  testing_regime: established({
    key: "testing_regime",
    label: "Testing regime",
    status: "Permitted with specific vergunning",
    tone: "positive",
    summary:
      "Experiments with a bestuurder outside the vehicle may be authorized through the Article 149aa vergunning route.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-experiment-regulation", provision: "Articles 2–6" },
    ],
    scopeLabel: "Article 149aa vergunning · bestuurder outside vehicle",
  }),
  deployment_regime: established({
    key: "deployment_regime",
    label: "Deployment regime",
    status: "Experimental framework",
    summary:
      "The dedicated national route is structured around a defined experiment rather than unrestricted ordinary deployment.",
    legalBasis: [{ sourceId: "nl-wvw", provision: "Articles 149aa–149ab" }],
    scopeLabel: "Experiment-specific vergunning",
  }),
  commercial_use: unclear({
    key: "commercial_use",
    label: "Commercial use",
    status: "Unclear",
    summary:
      "The permit application records whether passengers are carried for payment or on a timetable, but that does not establish a general commercial driverless regime.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a)(6)" },
    ],
    uncertaintyReason:
      "Commercial transport permissions depend on the service model and additional sector-specific law outside the general experimental authorization question.",
    scopeLabel: "Commercial passenger operation within or beyond an experiment",
  }),
  primary_human_role: established({
    key: "primary_human_role",
    label: "Primary human role",
    status: "Bestuurder",
    summary:
      "The relevant Dutch experiment retains a bestuurder even when that person is physically outside the vehicle.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-history-34838-3", provision: "General explanation and Article 149aa notes" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    scopeLabel: "Article 149aa out-of-vehicle-driver experiment",
    scope: {
      ...passengerRoadScope,
      humanRole: "bestuurder buiten het motorrijtuig",
    },
  }),
  human_performs_driving_task: unclear({
    key: "human_performs_driving_task",
    label: "Human performs driving task",
    status: "Role-specific / unclear",
    summary:
      "The experiment framework retains a legally relevant bestuurder outside the vehicle and permit-specific control/intervention arrangements. The reviewed sources do not establish that this person continuously performs the entire dynamic driving task.",
    legalBasis: [
      { sourceId: "nl-history-34838-3", provision: "Driver discussion" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    uncertaintyReason:
      "The sources describe the legal driver role and intervention capability, but do not map that role cleanly onto every element of the technical dynamic driving task.",
    scopeLabel: "Article 149aa out-of-vehicle-driver experiment",
    legalStatus: "legislative_history",
  }),
  continuous_human_monitoring: unclear({
    key: "continuous_human_monitoring",
    label: "Continuous human monitoring",
    status: "Experiment / permit specific",
    summary:
      "Legislative history describes an out-of-vehicle driver who continuously monitors and can intervene immediately, but the precise operational arrangement remains experiment- and permit-specific.",
    legalBasis: [{ sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" }],
    uncertaintyReason:
      "The proposition comes from legislative history and must not be generalized into one uniform in-force monitoring rule for every Dutch automated-driving operation.",
    scopeLabel: "Article 149aa model · legislative-history and permit context",
    legalStatus: "legislative_history",
  }),
  remote_driving_framework: established({
    key: "remote_driving_framework",
    label: "Remote driving framework",
    status: "Vergunning-specific",
    summary:
      "The experimental vergunning addresses the location of the bestuurder, the number of vehicles controlled and the proposed monitoring arrangements; those elements do not create one generic remote-operator role.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a)(5), (c) and (i)" },
    ],
    scopeLabel: "Out-of-vehicle-driver experiment",
  }),
  operating_scope_model: established({
    key: "operating_scope_model",
    label: "Operating scope model",
    status: "Vergunning-defined route / Operationeel Domein",
    summary:
      "The application identifies route, dates, times, duration, operating environment and risks relating to the Operationeel Domein.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a), (c) and (d)" }],
    scopeLabel: "Individual experimental permit",
  }),
  separate_operating_area_approval: established({
    key: "separate_operating_area_approval",
    label: "Separate operating-area approval",
    status: "Route assessed in permit",
    summary:
      "The proposed route and Operationeel Domein are assessed within the experimental vergunning; this is not a German-style standalone Betriebsbereich regime.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a)(4) and (d)" }],
    scopeLabel: "Permit-defined experiment route",
  }),
  odd_legal_relevance: established({
    key: "odd_legal_relevance",
    label: "ODD legal relevance",
    status: "Part of permit assessment",
    summary:
      "Operationeel Domein information and environmental/route risk analysis form part of the required application package. Atlas relates this source term to ODD without treating the two as literal equivalents.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(d)" }],
    scopeLabel: "Dutch experimental authorization",
  }),
  traffic_rules_model: established({
    key: "traffic_rules_model",
    label: "Traffic-rules model",
    status: "Ordinary rules + targeted ontheffing",
    summary:
      "WVW 1994 and RVV 1990 remain the starting point, with only legally available experiment-specific departures.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa(3)" },
      { sourceId: "nl-rvv" },
    ],
    scopeLabel: "Public-road experiment",
  }),
  traffic_rule_exemptions: established({
    key: "traffic_rule_exemptions",
    label: "Availability of exemptions",
    status: "Targeted and permit-specific",
    summary:
      "The vergunning may include a targeted ontheffing where the statute allows it; vergunning, ontheffing and vrijstelling are distinct mechanisms, and WVW Articles 5 and 6 cannot be displaced through Article 149aa.",
    legalBasis: [{ sourceId: "nl-wvw", provision: "Article 149aa(3)" }],
    scopeLabel: "Only requirements within the statutory exemption power",
  }),
  ads_rule_compliance: notIdentified({
    key: "ads_rule_compliance",
    label: "ADS responsibility for compliance",
    status: "General transfer to ADS not identified",
    summary:
      "The experimental regime retains a legally relevant bestuurder. A general Dutch rule transferring conventional driver duties to the ADS for this scenario has not been identified.",
    legalBasis: [
      { sourceId: "nl-history-34838-3", provision: "Driver discussion" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    searchScope:
      "WVW 1994, RVV 1990, the Article 149aa experiment framework and the reviewed legislative history were checked for a general transfer of driver duties to the ADS.",
    scopeLabel: "General ADS responsibility beyond permit-specific conditions",
  }),
  approval_routes: established({
    key: "approval_routes",
    label: "Vehicle / ADS approval routes",
    status: "EU technical approval available",
    summary:
      "The EU vehicle/type-approval architecture includes ADS approval for fully automated vehicles within Regulation 2022/1426's scope.",
    legalBasis: [
      { sourceId: "eu-2018-858" },
      { sourceId: "eu-2019-2144", provision: "Article 11" },
      { sourceId: "eu-2022-1426", provision: "Article 1 and annexes" },
      { sourceId: "eu-2026-481" },
    ],
    scopeLabel: "Qualifying M and N category fully automated vehicles",
  }),
  eu_ads_type_approval: established({
    key: "eu_ads_type_approval",
    label: "EU ADS type approval",
    status: "Available",
    tone: "positive",
    summary:
      "Regulation 2022/1426, as amended, provides uniform procedures and technical specifications for ADS type approval—typegoedkeuring in the official Dutch text—within its stated use cases.",
    legalBasis: [
      { sourceId: "eu-2022-1426", provision: "Article 1 and annexes" },
      { sourceId: "eu-2026-481" },
    ],
    scopeLabel: "Use cases within current EU 2022/1426",
  }),
  separate_operational_authorization: established({
    key: "separate_operational_authorization",
    label: "Separate operational authorization",
    status: "Required for the experiment",
    summary:
      "Technical typegoedkeuring does not replace the Dutch vergunning required for a bestuurder-outside-the-vehicle public-road experiment.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "eu-2022-1426" },
    ],
    scopeLabel: "Out-of-vehicle-driver public-road experiment",
  }),
  safety_assurance_model: established({
    key: "safety_assurance_model",
    label: "Safety-assurance model",
    status: "Permit-based / mixed",
    summary:
      "The application combines functional description, risk analysis, safety evidence, insurance, monitoring and evaluation information.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4" }],
    scopeLabel: "Experimental permit application",
  }),
  technical_standards: established({
    key: "technical_standards",
    label: "Technical standards",
    status: "Referenced compliance method",
    summary:
      "Specified ISO 26262 processes are expressly referenced, while a demonstrably equivalent method may be accepted.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(c)(2)" }],
    scopeLabel: "Safety evidence for experimental authorization",
    atlasAnalysis: "ISO 26262 is not universally mandatory in the Netherlands.",
  }),
  holder_operator_duties: established({
    key: "holder_operator_duties",
    label: "Applicant / permit duties",
    status: "Permit-specific",
    summary:
      "The applicant must describe the operating system, control of risks, driver arrangements, monitoring and evaluation for the proposed experiment.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4" }],
    scopeLabel: "Authorized experiment and permit conditions",
  }),
  maintenance_inspection: unclear({
    key: "maintenance_inspection",
    label: "Maintenance / inspection",
    status: "Permit and ordinary-law dependent",
    summary:
      "The safety package must address the system and risks, but no one universal Dutch AV-specific inspection interval for every autonomous vehicle has been identified.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4" }],
    uncertaintyReason:
      "Detailed maintenance and inspection obligations depend on the vehicle, ordinary vehicle law and the conditions imposed for the individual experiment.",
    scopeLabel: "Across all Dutch autonomous-vehicle operations",
  }),
  qualified_personnel: notIdentified({
    key: "qualified_personnel",
    label: "Qualified personnel",
    status: "Universal qualification not identified",
    summary:
      "Personnel arrangements and competence evidence can be addressed for a particular experiment, but a universal Dutch statutory qualification for all comparable operations has not been identified.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4" }],
    searchScope:
      "The Article 149aa framework and ministerial application requirements were reviewed for a generally applicable formal personnel qualification.",
    scopeLabel: "Experiment-specific personnel arrangements",
  }),
  operational_data_recording: notIdentified({
    key: "operational_data_recording",
    label: "Operational-data recording",
    status: "No universal national regime identified",
    summary:
      "Data recording and monitoring arise through the experimental permit and EU approval layers, not one Dutch AV data regime applying to every vehicle.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(g), (f) and (i)" },
      { sourceId: "eu-2022-1426", provision: "In-use reporting and monitoring requirements" },
    ],
    searchScope:
      "The Dutch experimental framework and current EU ADS type-approval layer were reviewed for a cross-cutting national duty applicable to every autonomous vehicle.",
    scopeLabel: "All autonomous vehicles and operating models",
  }),
  incident_event_reporting: notIdentified({
    key: "incident_event_reporting",
    label: "Incident / event reporting",
    status: "Universal duty not identified",
    summary:
      "Monitoring, evaluation and knowledge-sharing can arise through permit conditions, while EU approval has separate in-use mechanisms. Those propositions do not establish one universal Dutch incident-reporting duty for every operation.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(f) and (i)" },
      { sourceId: "eu-2022-1426", provision: "In-use reporting and monitoring requirements" },
    ],
    searchScope:
      "The Dutch experiment regulation and current EU ADS type-approval materials were reviewed for a single Dutch incident-reporting obligation applying across the selected scenario.",
    scopeLabel: "Applicable permit or type-approval layer",
  }),
  regulator_data_access: notIdentified({
    key: "regulator_data_access",
    label: "Regulator data access",
    status: "Universal access right not identified",
    summary:
      "Data recording, monitoring and information flows are shaped by the specific permit and applicable EU approval requirements. A universal regulator-access right across all Dutch ADS operations has not been identified.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4" },
      { sourceId: "eu-2022-1426" },
    ],
    searchScope:
      "The Dutch experiment regulation and current EU ADS approval materials were reviewed for a generally applicable Dutch regulator right to obtain operational data across the selected scenario.",
    scopeLabel: "Experiment or approved ADS, as applicable",
  }),
  av_liability_model: notIdentified({
    key: "av_liability_model",
    label: "AV liability model",
    status: "No dedicated comprehensive regime identified",
    summary:
      "Ordinary motor-vehicle, tort and product-liability frameworks remain relevant rather than a standalone comprehensive Dutch AV liability code.",
    legalBasis: [
      { sourceId: "nl-wam" },
      { sourceId: "nl-civil-code-6" },
    ],
    searchScope:
      "Current Dutch motor-insurance and general civil-liability instruments, together with the experimental AV legislation, were reviewed for a comprehensive dedicated AV allocation regime.",
    scopeLabel: "Civil liability for autonomous-vehicle operation",
  }),
  holder_liability: established({
    key: "holder_liability",
    label: "Ordinary liability allocation",
    status: "General framework remains relevant",
    summary:
      "Liability allocation remains fact- and claim-specific under the ordinary Dutch motor-vehicle and civil-liability architecture.",
    legalBasis: [
      { sourceId: "nl-wam" },
      { sourceId: "nl-civil-code-6" },
    ],
    scopeLabel: "Subject to facts and the applicable cause of action",
  }),
  motor_insurance: established({
    key: "motor_insurance",
    label: "Compulsory motor insurance",
    status: "Compulsory + experiment evidence",
    summary:
      "WAM provides the general compulsory motor-liability layer, and adequate insurance evidence is required for the experiment application.",
    legalBasis: [
      { sourceId: "nl-wam" },
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(e)" },
    ],
    scopeLabel: "Vehicle insurance and the proposed experiment",
  }),
  av_insurance_adaptation: notIdentified({
    key: "av_insurance_adaptation",
    label: "AV-specific insurance adaptation",
    status: "No comprehensive adaptation identified",
    summary:
      "The experimental regime requires evidence of adequate insurance but does not create a comprehensive standalone AV insurance code.",
    legalBasis: [
      { sourceId: "nl-wam" },
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(e)" },
    ],
    searchScope:
      "WAM and the experimental permit legislation were reviewed for a comprehensive AV-specific insurance allocation comparable to a dedicated statutory regime.",
    scopeLabel: "Autonomous-vehicle civil liability insurance",
  }),
  competent_authorities: established({
    key: "competent_authorities",
    label: "Competent authorities",
    status: "Minister + RDW vergunning process",
    summary:
      "The ministerial permit follows consultation required by Article 149aa, with the application submitted through RDW under the ministerial regulation.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-experiment-regulation", provision: "Article 2" },
    ],
    scopeLabel: "Out-of-vehicle-driver experiment",
  }),
  principal_instruments: established({
    key: "principal_instruments",
    label: "Principal instruments",
    status: "EU approval + Dutch road-use law",
    summary:
      "EU approval rules sit alongside WVW 1994, RVV 1990 and the Dutch experimental permit regulation.",
    legalBasis: [
      { sourceId: "eu-2022-1426" },
      { sourceId: "nl-wvw" },
      { sourceId: "nl-rvv" },
      { sourceId: "nl-experiment-regulation" },
    ],
    scopeLabel: "Current technical approval and public-road authorization architecture",
  }),
};

const DE_CONCLUSIONS: Record<CompareFieldId, RegulatoryConclusion> = {
  general_no_driver_operation: established({
    key: "general_no_driver_operation",
    label: "General no-driver road operation",
    status: "Permitted",
    tone: "positive",
    summary:
      "German law permits autonomous operation without a vehicle-driving person when the statutory conditions are satisfied within an approved defined operating area.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§§ 1d–1e" }],
    scopeLabel: "Approved defined operating area · statutory conditions",
  }),
  testing_regime: established({
    key: "testing_regime",
    label: "Testing regime",
    status: "Separate KBA authorization",
    summary:
      "Testing and development on public roads use the separate § 1i StVG and § 16 AFGBV authorization route with additional monitoring requirements.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1i" },
      { sourceId: "de-afgbv", provision: "§ 16" },
    ],
    scopeLabel: "Testing or development of automated/autonomous functions",
  }),
  deployment_regime: established({
    key: "deployment_regime",
    label: "Deployment regime",
    status: "Limited operational framework",
    tone: "positive",
    summary:
      "StVG and AFGBV provide a dedicated operational architecture, but operation is confined to approved defined operating areas and the applicable approvals.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§§ 1d–1g" },
      { sourceId: "de-afgbv", provision: "§§ 2–15" },
    ],
    scopeLabel: "Approved defined operating area",
  }),
  commercial_use: unclear({
    key: "commercial_use",
    label: "Commercial use",
    status: "Conditional",
    summary:
      "The autonomous-operation framework does not itself replace any transport-service permissions that apply to the proposed commercial use case.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e" },
      { sourceId: "de-afgbv", provision: "§§ 7–11" },
    ],
    scopeLabel: "Operational approval plus any use-case-specific transport law",
    atlasAnalysis:
      "The existence of the autonomous-operation route should not be read as a blanket commercial-transport authorization.",
    uncertaintyReason:
      "Commercial permissibility depends on the transport service, operator and additional sector-specific law not resolved by the StVG/AFGBV autonomous-operation route alone.",
  }),
  primary_human_role: established({
    key: "primary_human_role",
    label: "Primary human role",
    status: "Technische Aufsicht",
    tone: "positive",
    summary:
      "The autonomous system performs the driving task; the legally defined human role is the Technische Aufsicht.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1d(3), § 1f(2)" }],
    scopeLabel: "Ordinary operation under §§ 1d–1g StVG",
    scope: { ...passengerRoadScope, humanRole: "Technische Aufsicht" },
  }),
  human_performs_driving_task: established({
    key: "human_performs_driving_task",
    label: "Human performs driving task",
    status: "No",
    tone: "positive",
    summary:
      "The vehicle must perform the driving task independently without intervention by a vehicle-driving person.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1d(1), § 1e(2)(1)" }],
    scopeLabel: "Autonomous operation in approved defined operating area",
  }),
  continuous_human_monitoring: established({
    key: "continuous_human_monitoring",
    label: "Continuous human monitoring",
    status: "Not required in ordinary operation",
    tone: "positive",
    summary:
      "The autonomous function must operate without the journey being permanently monitored by the Technische Aufsicht.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1e(2)(1)" }],
    scopeLabel: "Ordinary operational regime · not § 1i testing",
  }),
  remote_driving_framework: established({
    key: "remote_driving_framework",
    label: "Remote driving framework",
    status: "Not the role in this regime",
    summary:
      "The Technische Aufsicht may release or deactivate defined functions but is not a generic remote operator or the remote driver performing the dynamic driving task.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1d(3), § 1e(2)–(3), § 1f(2)" }],
    scopeLabel: "Autonomous operation under §§ 1d–1g StVG",
    atlasAnalysis: "Technical supervision is not remote driving.",
  }),
  operating_scope_model: established({
    key: "operating_scope_model",
    label: "Operating scope model",
    status: "Approved defined operating area",
    tone: "positive",
    summary:
      "Operation is tied to a geographically and spatially defined part of public road space approved for the vehicle and operating organization.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1d(2), § 1e(1)(3)" },
      { sourceId: "de-afgbv", provision: "§§ 7–10" },
    ],
    scopeLabel: "Authority-approved Betriebsbereich",
  }),
  separate_operating_area_approval: established({
    key: "separate_operating_area_approval",
    label: "Separate operating-area approval",
    status: "Required",
    tone: "positive",
    summary:
      "The Halter defines the proposed Betriebsbereich, and the competent authority decides on the Genehmigung des festgelegten Betriebsbereichs after assessing vehicle capability, infrastructure, safety and public interests.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(1)(3)" },
      { sourceId: "de-afgbv", provision: "§§ 7–9" },
    ],
    scopeLabel: "Each festgelegter Betriebsbereich",
  }),
  odd_legal_relevance: established({
    key: "odd_legal_relevance",
    label: "ODD legal relevance",
    status: "Technically relevant; legally distinct",
    summary:
      "The ADS capability and technical operating conditions inform suitability, but the legally approved Betriebsbereich is a separate authorization object.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1d(2), § 1e" },
      { sourceId: "de-afgbv", provision: "§ 9(2)" },
    ],
    scopeLabel: "Technical capability compared with approved public-road area",
    atlasAnalysis: "Technical ODD is not the approved Betriebsbereich.",
  }),
  traffic_rules_model: established({
    key: "traffic_rules_model",
    label: "Traffic-rules model",
    status: "ADS directly responsible for driving-rule compliance",
    tone: "positive",
    summary:
      "StVO remains the general road-traffic framework, while § 1e requires the ADS to comply independently with traffic rules directed at vehicle control.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(2)(2)–(3)" },
      { sourceId: "de-stvo" },
    ],
    scopeLabel: "Traffic rules directed at vehicle control",
  }),
  traffic_rule_exemptions: unclear({
    key: "traffic_rule_exemptions",
    label: "Availability of exemptions",
    status: "Regime-specific / unclear",
    summary:
      "Ordinary autonomous operation is designed around ADS compliance. The separate § 1i testing route may involve additional authorizations, but the cited provisions do not establish one broad autonomous-driving exemption power.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(2), § 1i" },
      { sourceId: "de-afgbv", provision: "§ 16" },
    ],
    scopeLabel: "Ordinary operation distinguished from testing",
    uncertaintyReason:
      "Any departure from ordinary traffic requirements must be traced to the exact authority applicable to the test or operation; it cannot be inferred from § 1i and § 16 alone.",
    atlasAnalysis:
      "Atlas distinguishes the ordinary §§ 1d–1g compliance model from the separate § 1i testing route; it does not infer a general exemption from that distinction.",
  }),
  ads_rule_compliance: established({
    key: "ads_rule_compliance",
    label: "ADS responsibility for compliance",
    status: "Express statutory duty",
    tone: "positive",
    summary:
      "The autonomous vehicle must independently comply with driving-directed traffic rules and enter the minimum-risk condition if lawful continuation is impossible.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1e(2)(2)–(3)" }],
    scopeLabel: "Within the approved defined operating area",
  }),
  approval_routes: established({
    key: "approval_routes",
    label: "Vehicle / ADS approval routes",
    status: "National, EU or comparable route",
    summary:
      "Current § 1e separately recognizes a German Betriebserlaubnis, an EU Typgenehmigung under Regulation 2022/1426, or another comparable approval under applicable law.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1e(1)(2), § 1e(4)" }],
    scopeLabel: "Eligible vehicle / ADS approval",
  }),
  eu_ads_type_approval: established({
    key: "eu_ads_type_approval",
    label: "EU ADS type approval",
    status: "Expressly recognized",
    tone: "positive",
    summary:
      "The current German statute expressly names Regulation 2022/1426 as an eligible approval route.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(1)(2)" },
      { sourceId: "eu-2022-1426" },
      { sourceId: "eu-2026-481" },
    ],
    scopeLabel: "Vehicles within the applicable EU approval scope",
  }),
  separate_operational_authorization: established({
    key: "separate_operational_authorization",
    label: "Separate operational authorization",
    status: "Required",
    tone: "positive",
    summary:
      "An eligible vehicle approval is followed by the Genehmigung des festgelegten Betriebsbereichs and the vehicle's Zulassung before autonomous public-road operation.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(1)" },
      { sourceId: "de-afgbv", provision: "§§ 7–11" },
    ],
    scopeLabel: "Approved vehicle in a particular public-road environment",
  }),
  safety_assurance_model: established({
    key: "safety_assurance_model",
    label: "Safety-assurance model",
    status: "Statutory / approval-based",
    tone: "positive",
    summary:
      "StVG and AFGBV require a functional-safety concept, hazard analysis, safety evidence, test scenarios, cybersecurity and supporting documentation.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§§ 1e–1f" },
      { sourceId: "de-afgbv", provision: "§ 12 and Annexes 1–3" },
    ],
    scopeLabel: "Vehicle approval and manufacturer duties",
  }),
  technical_standards: established({
    key: "technical_standards",
    label: "Technical standards",
    status: "Recognized compliance construction",
    summary:
      "AFGBV Annex 1 references ISO 26262:2018 and ISO/PAS 21448:2019 in particular state-of-the-art presumptions and evidence pathways. The current ISO 21448:2022 publication is a separate standards object.",
    legalBasis: [{ sourceId: "de-afgbv", provision: "Annex 1, especially 7.2.1–7.2.2 and 10" }],
    scopeLabel: "Specific AFGBV safety and evidence requirements",
    atlasAnalysis:
      "The standards have regulatory significance in the cited constructions; they should not be described as universally mandatory for every purpose.",
  }),
  holder_operator_duties: established({
    key: "holder_operator_duties",
    label: "Halter duties",
    status: "Dedicated statutory duties",
    tone: "positive",
    summary:
      "The Halter must maintain road safety and environmental compliance, maintain systems, ensure non-driving obligations and ensure that the functions of the Technische Aufsicht are performed.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1f(1)" },
      { sourceId: "de-afgbv", provision: "§ 13" },
    ],
    scopeLabel: "Operating organization for the autonomous vehicle",
  }),
  maintenance_inspection: established({
    key: "maintenance_inspection",
    label: "Maintenance / inspection",
    status: "Daily, 90-day and six-month controls",
    tone: "positive",
    summary:
      "AFGBV requires an expanded pre-operation check, a comprehensive inspection every 90 days and a six-month main vehicle inspection interval.",
    legalBasis: [{ sourceId: "de-afgbv", provision: "§ 13(1), (7) and (8)" }],
    scopeLabel: "Vehicles operating under the AFGBV regime",
  }),
  qualified_personnel: established({
    key: "qualified_personnel",
    label: "Qualified personnel",
    status: "Statutorily specified",
    tone: "positive",
    summary:
      "AFGBV specifies qualifications, manufacturer training, reliability and licence requirements for relevant operational roles.",
    legalBasis: [{ sourceId: "de-afgbv", provision: "§§ 13–14" }],
    scopeLabel: "Halter personnel and Technische Aufsicht",
  }),
  operational_data_recording: established({
    key: "operational_data_recording",
    label: "Operational-data recording",
    status: "AV-specific",
    tone: "positive",
    summary:
      "StVG § 1g specifies categories including identification, position, activation, manoeuvre releases, system status, environment, connectivity, speed and external commands.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1g" },
      { sourceId: "de-afgbv", provision: "§ 15 and Annex 2" },
    ],
    scopeLabel: "Operation with the autonomous function",
  }),
  incident_event_reporting: notIdentified({
    key: "incident_event_reporting",
    label: "Incident / event reporting",
    status: "Reporting duty not established by § 1g alone",
    summary:
      "Section 1g establishes event-triggered data storage for intervention, accidents or near-accidents, unplanned lane changes/evasive manoeuvres and operational disruptions. That recording duty is not itself a general incident-reporting duty.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1g(2)" }],
    searchScope:
      "StVG § 1g and the associated AFGBV data provisions were reviewed for a distinct general incident-reporting obligation; the cited text establishes storage and authority-access duties instead.",
    scopeLabel: "Specified operational events under § 1g",
    atlasAnalysis:
      "Event-triggered data recording should not be collapsed into a generic incident-reporting label.",
  }),
  regulator_data_access: established({
    key: "regulator_data_access",
    label: "Regulator data access",
    status: "Express statutory access",
    tone: "positive",
    summary:
      "KBA and the operating-area authority may obtain relevant data where necessary for their statutory supervision and assessment functions.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1g(1), (4) and (6)" }],
    scopeLabel: "Data necessary for the authority's statutory task",
  }),
  av_liability_model: established({
    key: "av_liability_model",
    label: "AV liability model",
    status: "General regime with explicit AV adaptations",
    tone: "positive",
    summary:
      "Germany retains the general motor-liability architecture while expressly adapting liability caps and insurance coverage for autonomous operation.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§§ 7 and 12" },
      { sourceId: "de-pflvg", provision: "§§ 1 and 4" },
    ],
    scopeLabel: "Automated or autonomous operation causing harm",
  }),
  holder_liability: established({
    key: "holder_liability",
    label: "Halter liability",
    status: "Remains applicable",
    summary:
      "Statutory Halter liability under § 7 StVG remains part of the liability architecture; Halter is retained as the source-native role rather than treated as a synonym for owner or operator.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 7" }],
    scopeLabel: "Subject to the statutory conditions and defences",
  }),
  motor_insurance: established({
    key: "motor_insurance",
    label: "Compulsory motor insurance",
    status: "Compulsory",
    tone: "positive",
    summary:
      "PflVG requires motor-liability insurance and AFGBV makes insurance part of vehicle registration for autonomous operation.",
    legalBasis: [
      { sourceId: "de-pflvg", provision: "§ 1" },
      { sourceId: "de-afgbv", provision: "§ 11(2)(3)" },
    ],
    scopeLabel: "Vehicle participation in public-road traffic",
  }),
  av_insurance_adaptation: established({
    key: "av_insurance_adaptation",
    label: "AV-specific insurance adaptation",
    status: "Technische Aufsicht expressly covered",
    tone: "positive",
    summary:
      "Current PflVG expressly includes the person acting as Technische Aufsicht within the required liability coverage.",
    legalBasis: [{ sourceId: "de-pflvg", provision: "§ 4(3)(4)" }],
    scopeLabel: "Autonomous vehicle within § 1d StVG",
  }),
  competent_authorities: established({
    key: "competent_authorities",
    label: "Competent authorities",
    status: "KBA + operating-area authority",
    summary:
      "KBA handles the German vehicle approval route, while the competent federal/state authority approves the defined operating area.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e" },
      { sourceId: "de-afgbv", provision: "§ 1(3), §§ 2–9" },
    ],
    scopeLabel: "Approval function at issue",
  }),
  principal_instruments: established({
    key: "principal_instruments",
    label: "Principal instruments",
    status: "EU approval + dedicated German operation law",
    summary:
      "Regulation 2022/1426 interfaces with StVG §§ 1d–1g, AFGBV and the ordinary StVO/PflVG layers.",
    legalBasis: [
      { sourceId: "eu-2022-1426" },
      { sourceId: "de-stvg" },
      { sourceId: "de-afgbv" },
      { sourceId: "de-stvo" },
      { sourceId: "de-pflvg" },
    ],
    scopeLabel: "Current technical, operational, traffic and insurance architecture",
  }),
};

const BASE_JURISDICTION_PROFILES: JurisdictionProfile[] = [
  {
    slug: "netherlands",
    name: "Netherlands",
    code: "NL",
    scenario: "Driverless passenger vehicles · public roads",
    scenarioScope: [
      { label: "Vehicle", value: "Passenger vehicle" },
      { label: "Road environment", value: "Public roads" },
      { label: "Automation target", value: "Driverless target scenario" },
    ],
    selectedScenario: {
      label: "Driverless passenger vehicles · public roads",
      details: [
        { label: "Vehicle", value: "Passenger vehicle" },
        { label: "Road environment", value: "Public roads" },
        { label: "Automation target", value: "Driverless target scenario" },
      ],
      systemClass: "automated_driving_system",
      vehicleCategories: ["passenger_vehicle"],
      useCases: ["testing", "operational_deployment", "passenger_service"],
      operatingEnvironments: ["public_roads", "permit_defined_route"],
      geographicScope: "Netherlands public-road framework and applicable EU approval layer",
    },
    researchCoverage: {
      systemClasses: ["automated_driving_system"],
      vehicleCategories: ["passenger_vehicle", "passenger_shuttle"],
      useCases: ["testing", "operational_deployment", "passenger_service"],
      operatingEnvironments: ["public_roads", "permit_defined_route"],
      geographicScope: "Dutch national law plus applicable EU vehicle-approval instruments",
      reviewStatus: "verified",
      basis: "audited_source_inventory",
      independentOfSelectedScenario: true,
      note: "Coverage describes the researched source inventory; the selected Compare scenario is only one analytical slice of that inventory.",
    },
    verifiedLabel: "Substantive legal verification · 31 Aug 2026",
    primaryMessage:
      "Testing with a bestuurder buiten het motorrijtuig is expressly supported under Dutch law. A general Dutch road-use regime for operation without a legally relevant human driver has not been identified.",
    deploymentAnswers: [
      {
        label: "General driverless deployment",
        answer: "No general regime identified",
        detail:
          "No general Dutch public-road regime has been identified for this scenario without a legally relevant human driver.",
        tone: "neutral",
      },
      {
        label: "Testing / experimental route",
        answer: "Available with specific vergunning",
        detail:
          "Article 149aa supports a defined public-road experiment, including where the legally relevant bestuurder is outside the vehicle.",
        tone: "positive",
      },
    ],
    snapshot: [
      {
        label: "Road access",
        status: "Vergunning-specific",
        tone: "positive",
        scope: "Article 149aa experimental vergunning route",
      },
      {
        label: "Human role",
        status: "Required",
        tone: "conditional",
        scope: "A legally relevant bestuurder remains part of the Article 149aa model",
      },
      {
        label: "General driverless deployment",
        status: "Not identified",
        tone: "neutral",
        scope: "Dutch public-road operation beyond the experimental model",
      },
      {
        label: "EU ADS type approval · typegoedkeuring",
        status: "Available",
        tone: "positive",
        scope: "Within the use cases covered by EU 2022/1426",
      },
    ],
    pageNavigation: [
      { label: "Access & testing", href: "#testing" },
      { label: "Human role", href: "#driver" },
      { label: "Traffic & ODD", href: "#traffic-rules" },
      { label: "Approval & safety", href: "#approval" },
      { label: "Liability & data", href: "#liability" },
      { label: "Deployment reality", href: "#deployment-reality" },
      { label: "Sources", href: "#official-sources" },
    ],
    architectureLayers: [
      {
        label: "EU layer",
        body: "Vehicle and ADS technical/type approval—typegoedkeuring in the official Dutch EU text—including the current Regulation 2022/1426 framework within its scope.",
      },
      {
        label: "Dutch layer",
        body: "Public-road use, ordinary traffic law and the experiment-specific vergunning under WVW 1994 and the ministerial regulation.",
      },
    ],
    architectureConclusion:
      "The Netherlands does not regulate automated driving through one autonomous-vehicle statute. EU typegoedkeuring and the Dutch experimental vergunning answer different regulatory questions.",
    sections: [
      {
        id: "testing",
        eyebrow: "Testing & authorization",
        title: "A vergunning for the experiment, not merely the technology",
        paragraphs: [
          "Article 149aa Wegenverkeerswet 1994 expressly provides for public-road experiments with a bestuurder buiten het motorrijtuig. A specific ministerial vergunning is required, and the application is submitted through RDW under the ministerial regulation.",
          "The application concerns the proposed operating system and experiment: route, dates and duration, location of the bestuurder, number of vehicles controlled, functional description, risks, safety evidence, insurance and monitoring/evaluation information all form part of the package.",
        ],
        flow: [
          "Defined experiment and route",
          "RDW application and evidence package",
          "Ministerial vergunning and conditions",
          "Operation within the authorization",
        ],
        takeaway:
          "The vergunning is permission for the defined experiment, not a general authorization for unrestricted driverless deployment.",
        explain: ["experimental-permit"],
        sources: [
          { sourceId: "nl-wvw", provision: "Article 149aa" },
          { sourceId: "nl-experiment-regulation", provision: "Articles 2–6" },
        ],
      },
      {
        id: "driver",
        eyebrow: "Bestuurder & remote operation",
        title: "Bestuurder buiten het motorrijtuig ≠ no driver",
        paragraphs: [
          "The experimental framework allows the bestuurder to be physically outside the vehicle; it does not eliminate the legal driver role. Vergunning materials address where the bestuurder is located and how many vehicles that person controls.",
          "Official legislative history explains that the existing statutory concept of bestuurder was considered capable of covering a person outside the vehicle who retains control and can intervene immediately. That explanation of the out-of-vehicle configuration is interpretative legislative material, not itself the binding statutory text.",
        ],
        takeaway:
          "The Dutch experiment is legally different from an operating model in which no human performs the driving role.",
        explain: ["driver-outside-vehicle"],
        sources: [
          { sourceId: "nl-wvw", provision: "Article 149aa" },
          { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a)(5)" },
          { sourceId: "nl-history-34838-3", provision: "Driver discussion" },
          { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
        ],
      },
      {
        id: "traffic-rules",
        eyebrow: "Road traffic rules",
        title: "Ordinary rules remain the starting point",
        paragraphs: [
          "WVW 1994 and RVV 1990 remain the principal statutory and detailed traffic-rule layers. The Netherlands has not replaced them with a comprehensive standalone AV road code.",
          "The experimental vergunning can include a targeted ontheffing where legally available and necessary. Vergunning, ontheffing and vrijstelling are not interchangeable; the permit does not automatically disapply the whole RVV, and WVW Articles 5 and 6 sit outside the Article 149aa exemption power.",
        ],
        flow: [
          "Ordinary WVW / RVV rules",
          "Experiment-specific assessment",
          "Targeted ontheffing where legally available and necessary",
        ],
        takeaway:
          "The Dutch model adapts conventional traffic law around a specific experiment rather than replacing it with a separate AV traffic code.",
        explain: ["rvv-1990", "targeted-exemptions"],
        sources: [
          { sourceId: "nl-wvw", provision: "Article 149aa(3)" },
          { sourceId: "nl-rvv" },
        ],
      },
      {
        id: "odd",
        eyebrow: "ODD & operating conditions",
        title: "Operationeel Domein enters the vergunning assessment",
        paragraphs: [
          "The ministerial experimental regulation expressly uses the Dutch term Operationeel Domein. The application must address environmental factors and the route of the Operationeel Domein, alongside timing and system-specific risks.",
          "This source term gives operating-domain information legal relevance within the vergunning assessment, but Atlas does not treat Operationeel Domein as a literal synonym for ODD or as a free-standing road-use permission.",
        ],
        takeaway:
          "Operationeel Domein information forms part of the Dutch authorization assessment; that does not make it legally identical to ODD.",
        explain: ["odd"],
        sources: [
          { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a), (c) and (d)" },
        ],
      },
      {
        id: "approval",
        eyebrow: "Vehicle & ADS approval",
        title: "Technical approval and road-use permission remain separate",
        paragraphs: [
          "Regulations 2018/858 and 2019/2144 provide the wider EU vehicle-approval architecture. Regulation 2022/1426, in its current consolidated form after Regulation 2026/481, provides ADS type-approval procedures—typegoedkeuring in the official Dutch text—and technical specifications for fully automated vehicles within its defined scope.",
          "That product-level typegoedkeuring does not itself supply the Dutch experimental vergunning or establish a general right to operate on public roads without a legally relevant human driver.",
        ],
        takeaway:
          "Typegoedkeuring of the vehicle or ADS should not be confused with the national vergunning required for the defined public-road experiment.",
        explain: ["type-approval"],
        sources: [
          { sourceId: "eu-2018-858" },
          { sourceId: "eu-2019-2144", provision: "Article 11" },
          { sourceId: "eu-2022-1426", provision: "Article 1 and annexes" },
          { sourceId: "eu-2026-481" },
          { sourceId: "nl-wvw", provision: "Article 149aa" },
        ],
      },
      {
        id: "safety",
        eyebrow: "Safety assurance",
        title: "A mixed evidence package, not one universal certificate",
        paragraphs: [
          "Safety and risk assessment form part of the experimental application. The regulation calls for a functional description, risk analysis, operational and environmental risk material, insurance and monitoring/evaluation information.",
          "Specified ISO 26262 processes are expressly referenced as one accepted approach, while a demonstrably equivalent method is allowed.",
        ],
        takeaway:
          "The Dutch framework references specified ISO 26262 processes; it does not make ISO 26262 universally mandatory in the Netherlands.",
        explain: ["iso-26262"],
        sources: [
          { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(b)–(f)" },
        ],
      },
      {
        id: "liability",
        eyebrow: "Liability & insurance",
        title: "Existing liability architecture carries the experiment",
        paragraphs: [
          "No comprehensive standalone Dutch AV civil-liability regime has been identified. Ordinary motor-vehicle, tort and product-liability frameworks remain relevant, with the legal result depending on the facts and claim.",
          "WAM supplies the compulsory motor-liability insurance layer. The experimental permit application also expressly requires evidence of adequate insurance for the experiment.",
        ],
        takeaway:
          "Automated-driving experimentation is integrated into the existing Dutch liability and motor-insurance architecture rather than governed by a separate comprehensive AV liability code.",
        sources: [
          { sourceId: "nl-wam" },
          { sourceId: "nl-civil-code-6" },
          { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(e)" },
        ],
      },
      {
        id: "monitoring",
        eyebrow: "Monitoring & reporting",
        title: "Obligations follow the regulatory layer",
        paragraphs: [
          "Knowledge-sharing, reporting, data recording, monitoring and evaluation can form part of the experimental authorization. The current EU ADS approval framework contains its own in-use monitoring and reporting mechanisms.",
          "No single universal Dutch AV-specific incident-reporting regime applying to every autonomous vehicle has been identified.",
        ],
        takeaway:
          "Reporting obligations depend on the relevant permit or approval layer rather than one universal Dutch AV reporting regime.",
        sources: [
          { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(f), (g) and (i)" },
          { sourceId: "eu-2022-1426", provision: "In-use reporting and monitoring requirements" },
        ],
      },
    ],
    deploymentConclusion: [
      "The Netherlands provides a clear legal mechanism for advanced automated-driving experiments, including experiments where the human driver is located outside the vehicle. Its dedicated national experimental framework nevertheless remains structurally based on the existence of a human driver.",
      "EU law provides a technical type-approval architecture (typegoedkeuring in the official Dutch text) for fully automated vehicles, but that product approval and the Dutch public-road experiment vergunning remain separate regulatory layers.",
      "The Netherlands is open to advanced automated-driving experimentation, but its dedicated national framework does not currently amount to a general road-use regime for deployment without a legally relevant human driver.",
    ],
    practicalQuestions: [
      "Is the proposed operation an experiment or ordinary deployment?",
      "Does the operating model retain a legally relevant human driver?",
      "Is the vehicle / ADS covered by an applicable EU typegoedkeuring route?",
      "Which Dutch road-traffic obligations remain applicable?",
    ],
    conclusions: NL_CONCLUSIONS,
    sourceIds: [
      "nl-wvw",
      "nl-rvv",
      "nl-experiment-regulation",
      "nl-wam",
      "nl-civil-code-6",
      "nl-history-34838-3",
      "nl-history-34838-4",
      "eu-2018-858",
      "eu-2019-2144",
      "eu-2022-1426",
      "eu-2026-481",
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    code: "DE",
    scenario: "Driverless passenger vehicles · public roads",
    scenarioScope: [
      { label: "Vehicle", value: "Passenger vehicle" },
      { label: "Road environment", value: "Public roads" },
      { label: "Automation target", value: "Driverless target scenario" },
    ],
    selectedScenario: {
      label: "Driverless passenger vehicles · public roads",
      details: [
        { label: "Vehicle", value: "Passenger vehicle" },
        { label: "Road environment", value: "Public roads" },
        { label: "Automation target", value: "Driverless target scenario" },
      ],
      systemClass: "autonomous_vehicle_legal_category",
      vehicleCategories: ["passenger_vehicle"],
      useCases: ["testing", "operational_deployment", "passenger_service"],
      operatingEnvironments: ["public_roads", "approved_operating_area"],
      geographicScope: "Germany · approved defined operating area",
    },
    researchCoverage: {
      systemClasses: ["automated_driving_system", "autonomous_vehicle_legal_category"],
      vehicleCategories: [
        "passenger_vehicle",
        "passenger_shuttle",
        "goods_vehicle",
        "public_transport_vehicle",
      ],
      useCases: ["testing", "operational_deployment", "passenger_service", "goods_service"],
      operatingEnvironments: ["public_roads", "approved_operating_area"],
      geographicScope: "German federal autonomous-operation and testing framework plus applicable EU approval instruments",
      reviewStatus: "verified",
      basis: "audited_source_inventory",
      independentOfSelectedScenario: true,
      note: "Coverage describes the researched source inventory; the selected Compare scenario remains passenger-focused and does not define overall product coverage.",
    },
    verifiedLabel: "Substantive legal verification · 31 Aug 2026",
    primaryMessage:
      "Germany has a dedicated statutory framework for autonomous vehicles operating on public roads without a person performing the driving task. Operation is permitted within a genehmigter festgelegter Betriebsbereich where the statutory conditions are satisfied.",
    deploymentAnswers: [
      {
        label: "General driverless deployment",
        answer: "Available conditionally",
        detail:
          "Operation is possible within a genehmigter festgelegter Betriebsbereich when the statutory vehicle-approval, Zulassung, insurance and organizational conditions are satisfied.",
        tone: "conditional",
      },
      {
        label: "Testing / experimental route",
        answer: "Separate authorization",
        detail:
          "Testing and development on public roads use the distinct KBA Erprobungsgenehmigung route under StVG § 1i and AFGBV § 16.",
        tone: "conditional",
      },
    ],
    snapshot: [
      {
        label: "Autonomous operation without vehicle-driving person",
        status: "Permitted",
        tone: "positive",
        scope: "Genehmigter Betriebsbereich + statutory conditions",
      },
      {
        label: "Dedicated national autonomous-driving regime",
        status: "Yes",
        tone: "positive",
        scope: "StVG §§ 1d–1g and AFGBV",
      },
      {
        label: "Geographic / operating-area restriction",
        status: "Yes",
        tone: "conditional",
        scope: "Authority-approved Betriebsbereich",
      },
      {
        label: "Technische Aufsicht",
        status: "Required",
        tone: "conditional",
        scope: "Defined statutory supervisory role",
      },
      {
        label: "EU ADS type approval · Typgenehmigung",
        status: "Expressly recognized",
        tone: "positive",
        scope: "Current § 1e StVG",
      },
      {
        label: "AV-specific liability adaptations",
        status: "Yes",
        tone: "positive",
        scope: "Liability caps and insurance coverage",
      },
      {
        label: "AV-specific operational-data duties",
        status: "Yes",
        tone: "positive",
        scope: "StVG § 1g",
      },
    ],
    pageNavigation: [
      { label: "Access & testing", href: "#approval-path" },
      { label: "Human role", href: "#supervisor" },
      { label: "Traffic & ODD", href: "#operating-area" },
      { label: "Approval & safety", href: "#safety" },
      { label: "Liability & data", href: "#data" },
      { label: "Deployment reality", href: "#deployment-reality" },
      { label: "Sources", href: "#official-sources" },
    ],
    architectureLayers: [
      {
        label: "EU layer",
        body: "Vehicle and ADS technical approval, including current EU 2022/1426 approval recognized by German law.",
      },
      {
        label: "German autonomous-operation layer",
        body: "StVG §§ 1d–1g and AFGBV regulate approval, the defined operating area, organization, human role and data duties.",
      },
      {
        label: "Ordinary road-traffic layer",
        body: "StVO, vehicle registration and compulsory insurance continue to apply alongside the autonomous-operation rules.",
      },
    ],
    architectureConclusion:
      "Germany combines EU technical approval with a distinct national legal regime for autonomous operation on public roads.",
    sections: [
      {
        id: "approval-path",
        eyebrow: "Approval path",
        title: "Four gates connect technical approval to the road",
        paragraphs: [
          "Section 1e StVG permits autonomous operation only when the technical requirements, an eligible Betriebserlaubnis or Typgenehmigung, the Genehmigung des festgelegten Betriebsbereichs and the vehicle's Zulassung are all in place.",
          "Eligible approval routes expressly include the German Betriebserlaubnis for the autonomous vehicle, an EU Typgenehmigung under Regulation 2022/1426 and another comparable approval under applicable law. These source-native terms identify distinct legal gates rather than interchangeable forms of permission.",
        ],
        flow: [
          "Betriebserlaubnis or Typgenehmigung",
          "Genehmigung des festgelegten Betriebsbereichs",
          "Zulassung and insurance",
          "Autonomous operation",
        ],
        takeaway:
          "Technical approval and permission to operate in a particular public-road environment are separate regulatory gates.",
        explain: ["type-approval"],
        sources: [
          { sourceId: "de-stvg", provision: "§ 1e" },
          { sourceId: "de-afgbv", provision: "§§ 2–11" },
          { sourceId: "eu-2022-1426" },
          { sourceId: "eu-2026-481" },
        ],
      },
      {
        id: "operating-area",
        eyebrow: "Defined operating area",
        title: "Technical ODD ≠ legally approved Betriebsbereich",
        paragraphs: [
          "The festgelegter Betriebsbereich is a geographically and spatially defined part of public road space. The Halter proposes it and the competent authority decides whether to grant the Genehmigung des festgelegten Betriebsbereichs.",
          "The authority assesses whether the vehicle can perform the driving task there, the road infrastructure, effects on traffic and road safety, risks to life and physical safety, and other public interests. Conditions may be imposed.",
        ],
        takeaway:
          "ODD describes the ADS technical operating conditions; Betriebsbereich identifies where autonomous public-road operation has been legally approved.",
        explain: ["betriebsbereich", "odd"],
        sources: [
          { sourceId: "de-stvg", provision: "§ 1d(2), § 1e(1)(3)" },
          { sourceId: "de-afgbv", provision: "§§ 7–10, especially § 9" },
        ],
      },
      {
        id: "supervisor",
        eyebrow: "Fahrzeugführer & Technische Aufsicht",
        title: "Technical supervision ≠ remote driving",
        paragraphs: [
          "German law expressly contemplates autonomous operation without a Fahrzeugführer performing the driving task. The ADS must perform that task independently, comply with driving-directed traffic rules and operate without continuous monitoring by the Technische Aufsicht.",
          "The Technische Aufsicht evaluates and releases an alternative manoeuvre where required, can deactivate the autonomous function, responds to system-status information and performs the statutory functions following a minimum-risk event.",
          "AFGBV makes this a regulated role with specified technical or engineering qualifications, manufacturer training, the relevant driving licence and reliability requirements.",
        ],
        takeaway:
          "The vehicle drives itself; the Technische Aufsicht performs defined supervisory and fallback functions rather than acting as a generic remote driver or remote operator.",
        explain: ["technical-supervisor", "minimum-risk-condition"],
        sources: [
          { sourceId: "de-stvg", provision: "§ 1d(1), (3) and (4); § 1e(2); § 1f(2)" },
          { sourceId: "de-afgbv", provision: "§ 14" },
        ],
      },
      {
        id: "traffic-rules",
        eyebrow: "Road traffic rules",
        title: "The ADS itself must comply with driving-directed rules",
        paragraphs: [
          "StVO remains the general road-traffic framework. Section 1e StVG nevertheless assigns independent compliance with rules directed at vehicle control to the autonomous vehicle.",
          "If continuing the journey lawfully would only be possible through a traffic-law violation, the system must independently enter the statutory minimum-risk condition.",
        ],
        takeaway:
          "Ordinary traffic law remains applicable, but compliance with driving-related rules is assigned to the autonomous system itself.",
        explain: ["minimum-risk-condition"],
        sources: [
          { sourceId: "de-stvg", provision: "§ 1e(2)(2)–(3)" },
          { sourceId: "de-stvo" },
        ],
      },
      {
        id: "safety",
        eyebrow: "Safety assurance & manufacturer duties",
        title: "Approval is supported by structured safety and cybersecurity evidence",
        paragraphs: [
          "The German framework addresses a functional-safety concept, hazard analysis, evidence of autonomous-function safety, information-technology security, a functional vehicle description, test scenarios and digital-data-storage documentation.",
          "AFGBV uses technical standards within particular compliance constructions. Annex 1 cites the 2018 ISO 26262 series and ISO/PAS 21448:2019; those regulatory references must remain distinct from later/current editions of the standards.",
        ],
        takeaway:
          "Technical standards may acquire regulatory significance where legislation or approval requirements recognize a specified edition as a means of demonstrating compliance.",
        explain: ["iso-26262"],
        sources: [
          { sourceId: "de-stvg", provision: "§§ 1e–1f" },
          { sourceId: "de-afgbv", provision: "§ 12 and Annexes 1–3" },
        ],
      },
      {
        id: "holder",
        eyebrow: "Halter & operational duties",
        title: "The Halter carries continuing operational duties",
        paragraphs: [
          "The Halter must preserve road safety and environmental compliance, maintain systems needed for autonomous operation, ensure non-driving traffic obligations, and ensure the functions of the Technische Aufsicht are performed.",
          "AFGBV adds pre-operation checks, a comprehensive inspection every 90 days, a six-month main vehicle inspection interval, maintenance documentation, qualified personnel and suitable Technische Aufsicht facilities and IT systems.",
        ],
        takeaway:
          "Germany regulates the organization operating the autonomous vehicle, not only the vehicle and ADS.",
        explain: ["holder-obligations"],
        sources: [
          { sourceId: "de-stvg", provision: "§ 1f(1)" },
          { sourceId: "de-afgbv", provision: "§ 13" },
        ],
      },
      {
        id: "data",
        eyebrow: "Data, incidents & oversight",
        title: "An explicit AV-specific operational-data regime",
        paragraphs: [
          "Section 1g StVG identifies data categories including vehicle identity and position; activation and deactivation; alternative-manoeuvre releases; software and system status; environmental and connectivity conditions; safety-system state; speed and acceleration; and external commands.",
          "Intervention by the Technische Aufsicht, accidents or near-accidents, unplanned lane changes or evasive manoeuvres, and operational disruptions are specified storage triggers. Competent authorities may obtain relevant data for their statutory supervision.",
        ],
        takeaway:
          "Germany has AV-specific data and event-recording duties; event-triggered recording should not be mislabeled as one generic incident-reporting obligation.",
        sources: [
          { sourceId: "de-stvg", provision: "§ 1g" },
          { sourceId: "de-afgbv", provision: "§ 15 and Annex 2" },
        ],
      },
      {
        id: "liability",
        eyebrow: "Liability & insurance",
        title: "The general regime is expressly adapted for autonomy",
        paragraphs: [
          "Statutory Halter liability under § 7 StVG remains relevant. Halter is the source-native legal role and should not be flattened into owner or operator. Section 12 applies higher caps where harm arises through automated or autonomous functions: EUR 10 million for death or personal injury from the same event and EUR 2 million for property damage from the same event.",
          "Compulsory motor liability continues under PflVG, which expressly includes the Technische Aufsicht within the required coverage for an autonomous vehicle.",
        ],
        takeaway:
          "Germany does not replace conventional motor liability with an entirely separate AV system; it expressly adapts the existing liability and insurance architecture.",
        sources: [
          { sourceId: "de-stvg", provision: "§§ 7 and 12" },
          { sourceId: "de-pflvg", provision: "§§ 1 and 4(3)(4)" },
        ],
      },
      {
        id: "testing",
        eyebrow: "Testing vs deployment",
        title: "Testing authorization ≠ operational deployment regime",
        paragraphs: [
          "Section 1i StVG provides a separate Erprobungsgenehmigung route for testing or developing automated and autonomous functions on public roads. Automated-function testing is monitored by a Fahrzeugführer; autonomous-function testing is monitored on site by a Technische Aufsicht.",
          "These testing roles and this authorization should not be conflated with ordinary autonomous operation under §§ 1d–1g within a genehmigter festgelegter Betriebsbereich.",
        ],
        takeaway:
          "Germany is not merely a jurisdiction that allows AV testing; it separately regulates testing and conditional operational deployment.",
        explain: ["testing-vs-deployment"],
        sources: [
          { sourceId: "de-stvg", provision: "§ 1i" },
          { sourceId: "de-afgbv", provision: "§ 16" },
        ],
      },
    ],
    deploymentConclusion: [
      "Germany provides a dedicated statutory architecture for autonomous operation on public roads without a person performing the driving task.",
      "Operation is conditional rather than geographically unrestricted: an eligible Betriebserlaubnis or Typgenehmigung, the Genehmigung des festgelegten Betriebsbereichs, Zulassung and insurance, and a compliant operating organization including the Technische Aufsicht must come together.",
      "Germany permits autonomous operation without a Fahrzeugführer within a genehmigter festgelegter Betriebsbereich, subject to the distinct approval, registration, insurance, organizational and safety requirements.",
    ],
    practicalQuestions: [
      "Does the vehicle require a Betriebserlaubnis, a Typgenehmigung or another eligible approval?",
      "What festgelegter Betriebsbereich will be submitted for approval?",
      "Can the ADS independently comply with traffic rules within that area?",
      "Who will act as Technische Aufsicht?",
      "Can the Halter satisfy maintenance, inspection, data and organizational duties?",
    ],
    conclusions: DE_CONCLUSIONS,
    sourceIds: [
      "de-stvg",
      "de-afgbv",
      "de-stvo",
      "de-pflvg",
      "eu-2018-858",
      "eu-2019-2144",
      "eu-2022-1426",
      "eu-2026-481",
    ],
  },
];

const compareFieldIds = COMPARE_GROUPS.flatMap((group) =>
  group.fields.map((field) => field.id),
);

export function isExposedSourceId(sourceId: string): sourceId is SourceId {
  return sourceId in REGULATORY_SOURCES;
}

assertQuarantinedSourcesNotExposed(
  Object.keys(REGULATORY_SOURCES),
  ["uk-commencement3-2026", "uk-marketing-regs-2026"],
);

function normalizeSourceReferences(
  references: {
    sourceId: string;
    provision?: string;
    legalStatus?: Exclude<LegalStatus, "mixed">;
    effectiveFrom?: string;
    effectiveTo?: string;
    regimeComponent?: string;
  }[],
): SourceReference[] {
  return references
    .filter((reference) => isExposedSourceId(reference.sourceId))
    .map((reference) => ({
      ...reference,
      sourceId: reference.sourceId as SourceId,
  }));
}

type ExpansionProfileInput = Omit<
  JurisdictionProfile,
  "selectedScenario" | "researchCoverage" | "conclusions"
> & {
  conclusions: Record<
    CompareFieldId,
    Omit<RegulatoryConclusion, "review"> & { review?: ReviewMetadata }
  >;
};

const EXPANSION_SCOPE_MODELS: Record<
  Extract<JurisdictionSlug, "united-states" | "united-kingdom" | "russia">,
  { selectedScenario: SelectedScenario; researchCoverage: ResearchCoverage }
> = {
  "united-states": {
    selectedScenario: {
      label: "Driverless passenger vehicles · federal + California layers",
      details: [
        { label: "Vehicle", value: "Passenger vehicle" },
        { label: "Road environment", value: "California public roads" },
        { label: "Legal stack", value: "US federal vehicle safety + California operation" },
      ],
      systemClass: "automated_driving_system",
      vehicleCategories: ["passenger_vehicle"],
      useCases: ["testing", "operational_deployment", "passenger_service"],
      operatingEnvironments: ["public_roads", "permit_defined_route"],
      geographicScope: "United States federal vehicle-safety law plus California road-use and passenger-service law",
    },
    researchCoverage: {
      systemClasses: ["automated_driving_system", "driver_assistance"],
      vehicleCategories: [
        "passenger_vehicle",
        "passenger_shuttle",
        "goods_vehicle",
        "public_transport_vehicle",
      ],
      useCases: ["testing", "operational_deployment", "passenger_service", "goods_service"],
      operatingEnvironments: ["public_roads"],
      geographicScope: "Federal motor-vehicle safety law and the audited California AV/CPUC layer",
      reviewStatus: "partially_verified",
      basis: "audited_source_inventory",
      independentOfSelectedScenario: true,
      note: "Coverage is wider than the selected passenger-vehicle scenario but remains limited to the federal + California stack; it is not a claim about all state law.",
    },
  },
  "united-kingdom": {
    selectedScenario: {
      label: "Driverless passenger vehicles · Great Britain public roads",
      details: [
        { label: "Vehicle", value: "Passenger vehicle" },
        { label: "Road environment", value: "Public roads" },
        { label: "Legal stack", value: "Current pilot + staged AV Act framework" },
      ],
      systemClass: "automated_driving_system",
      vehicleCategories: ["passenger_vehicle"],
      useCases: ["testing", "operational_deployment", "passenger_service"],
      operatingEnvironments: ["public_roads"],
      geographicScope: "Great Britain — England, Scotland and Wales; not Northern Ireland",
    },
    researchCoverage: {
      systemClasses: ["automated_driving_system", "driver_assistance"],
      vehicleCategories: ["passenger_vehicle", "passenger_shuttle", "public_transport_vehicle"],
      useCases: ["testing", "operational_deployment", "passenger_service"],
      operatingEnvironments: ["public_roads"],
      geographicScope: "Great Britain current pilot/APS instruments and enacted, staged AV Act architecture",
      reviewStatus: "partially_verified",
      basis: "audited_source_inventory",
      independentOfSelectedScenario: true,
      note: "Current pilot coverage and the future full authorisation framework are researched as separate legal-status layers.",
    },
  },
  russia: {
    selectedScenario: {
      label: "Passenger VATS · experimental legal regime",
      details: [
        { label: "Vehicle", value: "Passenger vehicle" },
        { label: "Road environment", value: "EPR-defined operation" },
        { label: "Review", value: "Russian expert review required" },
      ],
      systemClass: "automated_driving_system",
      vehicleCategories: ["passenger_vehicle"],
      useCases: ["testing"],
      operatingEnvironments: ["public_roads"],
      geographicScope: "Existing Russia profile scope; substantive scope remains expert-gated",
    },
    researchCoverage: {
      systemClasses: [],
      vehicleCategories: [],
      useCases: [],
      operatingEnvironments: [],
      geographicScope: "Russia substantive coverage held for qualified Russian-law expert review",
      reviewStatus: "expert_review_required",
      basis: "expert_review_pending",
      independentOfSelectedScenario: true,
      note: "No broader research-coverage claim is inferred from the selected scenario until expert review is complete.",
    },
  },
};

function applyExpansionAuditCorrection(
  slug: ExpansionProfileInput["slug"],
  key: CompareFieldId,
  value: RegulatoryConclusion,
): RegulatoryConclusion {
  if (slug === "united-states" && key === "ads_rule_compliance") {
    return {
      ...value,
      status: "Accountability assigned; ADS duty not identified",
      tone: "conditional",
      confidenceStatus: "not_identified",
      summary:
        "California assigns compliance and enforcement consequences through the manufacturer and permit-holder framework. The reviewed provisions do not create a general legal fiction that the ADS itself is the driver or legal duty-holder.",
      searchScope:
        "Current California Vehicle Code § 38750 and adopted DMV Articles 3.7–3.8 were reviewed for a direct legal assignment of conventional driver duties to the ADS itself.",
      uncertaintyReason: undefined,
    };
  }

  if (slug === "united-states" && key === "maintenance_inspection") {
    return {
      ...value,
      status: "Permit-based; universal inspection cadence unclear",
      tone: "watch",
      confidenceStatus: "unclear",
      summary:
        "California requires safety-case and permit evidence addressing maintenance, damage tracking, inspections and return to service. The reviewed sources do not establish one universal Germany-style statutory inspection cadence.",
      uncertaintyReason:
        "The exact maintenance and inspection duties depend on the permit, vehicle and incorporated safety evidence; no single recurring statutory interval was identified for all covered AVs.",
      searchScope: undefined,
      legalBasis: [
        {
          sourceId: "us-ca-dmv-av-regulations",
          provision: "13 CCR Articles 3.7–3.8 · safety-case maintenance evidence",
          legalStatus: "in_force",
          effectiveFrom: "2026-04-28",
        },
      ],
    };
  }

  if (slug === "united-states" && key === "remote_driving_framework") {
    return {
      ...value,
      status: "Defined roles under current California rules",
      summary:
        "California's adopted rules distinguish remote drivers from remote assistants and specify permit, qualification, training and functional requirements. The final regulations took effect on 28 April 2026; specified reporting duties became operative 120 days later.",
      legalBasis: [
        {
          sourceId: "us-ca-dmv-av-regulations",
          provision: "13 CCR §§ 227.38, 227.40 and 228.06",
          legalStatus: "in_force",
          effectiveFrom: "2026-04-28",
          regimeComponent: "Remote-driver and remote-assistant rules",
        },
      ],
      regimeComponents: [
        {
          component: "Remote-driver and remote-assistant rules",
          legalStatus: "in_force",
          effectiveFrom: "2026-04-28",
          provision: "13 CCR §§ 227.38, 227.40 and 228.06",
        },
        {
          component: "Specified testing-data reporting duties",
          legalStatus: "in_force",
          effectiveFrom: "2026-08-26",
          provision: "13 CCR §§ 227.56–227.60 and 227.66",
        },
      ],
    };
  }

  if (slug === "united-kingdom" && key === "holder_liability") {
    return {
      ...value,
      summary:
        "AEVA 2018 supplies an insurer-first liability route for accidents caused while a listed vehicle is driving itself. Other liability questions remain governed by the applicable general law and facts.",
      atlasAnalysis:
        "This is not a standalone strict keeper-liability model equivalent to Germany's Halter architecture.",
    };
  }

  if (slug === "united-kingdom" && key === "principal_instruments") {
    return {
      ...value,
      legalStatus: "mixed",
      status: "Current pilot / APS rules + staged future framework",
      summary:
        "AEVA 2018 and the current pilot/APS instruments operate now. The Automated Vehicles Act 2024 is enacted, but its full authorisation and in-use framework remains subject to provision-specific commencement.",
      regimeComponents: [
        {
          component: "AEVA insurer-liability and listing framework",
          legalStatus: "in_force",
          sourceId: "uk-aeva-2018",
        },
        {
          component: "APS pilot permit framework",
          legalStatus: "in_force",
          effectiveFrom: "2026-05-15",
          sourceId: "uk-aps-regs-2026",
        },
        {
          component: "Full AV Act authorisation and in-use framework",
          legalStatus: "adopted_not_yet_effective",
          sourceId: "uk-av-act-2024",
          note: "Commencement is provision-specific.",
        },
      ],
    };
  }

  if (slug === "united-kingdom" && key === "technical_standards") {
    return {
      ...value,
      legalStatus: "mixed",
      status: "Current pilot evidence + draft future principles",
      summary:
        "Current pilot guidance describes the evidence assessed for pilot operation. The draft Statement of Safety Principles belongs to the future AV Act framework and remains consultation material, not a current binding technical standard.",
      regimeComponents: [
        {
          component: "Pilot safety and approval evidence",
          legalStatus: "guidance",
          sourceId: "uk-vca-pilot",
        },
        {
          component: "Draft Statement of Safety Principles",
          legalStatus: "draft",
          sourceId: "uk-sosp-consultation",
          note: "Consultation material for the future full authorisation framework.",
        },
      ],
    };
  }

  return value;
}

function normalizeExpansionProfile(input: unknown): JurisdictionProfile {
  const profile = input as ExpansionProfileInput;
  const review =
    profile.slug === "russia"
      ? {
          reviewedAt: "2026-09-03",
          nextReviewAt: "2026-09-03",
          reviewer: "Qualified Russian-law expert review pending",
          reviewMethod: "expert_review" as const,
          stale: true,
        }
      : claimReview("2026-09-03");
  const conclusions = Object.fromEntries(
    Object.entries(profile.conclusions).map(([key, value]) => {
      const normalized = applyExpansionAuditCorrection(
        profile.slug,
        key as CompareFieldId,
        {
          ...value,
          legalBasis: normalizeSourceReferences(value.legalBasis),
          review: value.review ?? review,
        },
      );
      validateConclusionRecord(normalized);
      return [key, normalized];
    }),
  ) as Record<CompareFieldId, RegulatoryConclusion>;

  const conclusionKeys = Object.keys(conclusions);
  const missingFields = compareFieldIds.filter(
    (fieldId) => !conclusionKeys.includes(fieldId),
  );

  if (missingFields.length > 0 || conclusionKeys.length !== compareFieldIds.length) {
    throw new Error(
      `Jurisdiction ${profile.slug} must implement all ${compareFieldIds.length} comparison fields`,
    );
  }

  const scopeModel =
    EXPANSION_SCOPE_MODELS[
      profile.slug as keyof typeof EXPANSION_SCOPE_MODELS
    ];
  if (!scopeModel) {
    throw new Error(`Missing scope model for ${profile.slug}`);
  }

  const normalizedProfile: JurisdictionProfile = {
    ...profile,
    ...scopeModel,
    sections: profile.sections.map((section) => ({
      ...section,
      sources: normalizeSourceReferences(section.sources),
    })),
    conclusions,
    sourceIds: profile.sourceIds.filter(isExposedSourceId),
  };
  validateProfileScope(normalizedProfile);
  return normalizedProfile;
}

const EXPANSION_JURISDICTION_PROFILES = expansionSeed.profiles.map(
  normalizeExpansionProfile,
);

export const JURISDICTION_PROFILES: JurisdictionProfile[] = [
  ...BASE_JURISDICTION_PROFILES,
  ...EXPANSION_JURISDICTION_PROFILES,
];

JURISDICTION_PROFILES.forEach(validateProfileScope);

export function getJurisdictionProfile(slug: string) {
  return JURISDICTION_PROFILES.find((profile) => profile.slug === slug) ?? null;
}

export function getRegulatorySource(sourceId: SourceId) {
  const source = REGULATORY_SOURCES[sourceId];

  if (!source) {
    throw new Error(`Regulatory source is not exposed: ${sourceId}`);
  }

  return source;
}

export function legalStatusLabel(status: LegalStatus) {
  const labels: Record<LegalStatus, string> = {
    in_force: "Current law",
    adopted_not_yet_effective: "Adopted · not yet effective",
    proposed: "Proposed",
    draft: "Draft",
    guidance: "Guidance",
    legislative_history: "Legislative history",
    case_law: "Case law",
    mixed: "Staged / mixed legal status",
  };

  return labels[status];
}
