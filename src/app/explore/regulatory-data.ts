import type { LearningConceptId } from "@/app/explore/learning-concepts";

export type ConfidenceStatus = "established" | "unclear" | "not_identified";

export type LegalStatus =
  | "in_force"
  | "adopted_not_yet_effective"
  | "proposed"
  | "draft"
  | "guidance"
  | "legislative_history"
  | "case_law";

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
};

export type SourceReference = {
  sourceId: SourceId;
  provision?: string;
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
  lastVerified: "2026-08-31";
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
  lastChecked: "2026-08-31";
  jurisdiction: "EU" | "Netherlands" | "Germany";
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
  slug: "netherlands" | "germany";
  name: string;
  code: string;
  scenario: string;
  scenarioScope: ScenarioScopeItem[];
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
  | "de-pflvg";

export const REGULATORY_SOURCES = {
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

type ConclusionInput = Omit<RegulatoryConclusion, "lastVerified">;

function conclusion(input: ConclusionInput): RegulatoryConclusion {
  if (input.confidenceStatus === "unclear" && !input.uncertaintyReason) {
    throw new Error(`Unclear conclusion requires uncertaintyReason: ${input.key}`);
  }

  if (input.confidenceStatus === "not_identified" && !input.searchScope) {
    throw new Error(`Not identified conclusion requires searchScope: ${input.key}`);
  }

  return { ...input, lastVerified: "2026-08-31" };
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
};

function established(input: EstablishedInput) {
  return conclusion({
    ...input,
    tone: input.tone ?? "conditional",
    confidenceStatus: "established",
    scope: input.scope ?? passengerRoadScope,
    scopeLabel:
      input.scopeLabel ?? "Driverless passenger vehicles · public roads",
    legalStatus: "in_force",
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
    legalStatus: "in_force",
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
    legalStatus: "in_force",
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
    status: "Permitted with specific permit",
    tone: "positive",
    summary:
      "Experiments with the driver outside the vehicle may be authorized through the Article 149aa permit route.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-experiment-regulation", provision: "Articles 2–6" },
    ],
    scopeLabel: "Permit-defined public-road experiment · driver outside vehicle",
  }),
  deployment_regime: established({
    key: "deployment_regime",
    label: "Deployment regime",
    status: "Experimental framework",
    summary:
      "The dedicated national route is structured around a defined experiment rather than unrestricted ordinary deployment.",
    legalBasis: [{ sourceId: "nl-wvw", provision: "Articles 149aa–149ab" }],
    scopeLabel: "Experiment-specific authorization",
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
    status: "Vehicle driver",
    summary:
      "The relevant Dutch experiment retains a human driver even when that person is physically outside the vehicle.",
    legalBasis: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-history-34838-3", provision: "General explanation and Article 149aa notes" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    scopeLabel: "Article 149aa out-of-vehicle-driver experiment",
    scope: { ...passengerRoadScope, humanRole: "Driver outside the vehicle" },
  }),
  human_performs_driving_task: established({
    key: "human_performs_driving_task",
    label: "Human performs driving task",
    status: "Yes",
    summary:
      "The experiment framework does not remove the legal driver; legislative history contemplates a person who retains control and can intervene.",
    legalBasis: [
      { sourceId: "nl-history-34838-3", provision: "Driver discussion" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    scopeLabel: "Relevant Dutch experimental model",
  }),
  continuous_human_monitoring: established({
    key: "continuous_human_monitoring",
    label: "Continuous human monitoring",
    status: "Required in the relevant model",
    summary:
      "Official explanatory material describes an out-of-vehicle driver who continuously monitors and can intervene immediately.",
    legalBasis: [{ sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" }],
    scopeLabel: "Article 149aa experimental model · legislative-history interpretation",
  }),
  remote_driving_framework: established({
    key: "remote_driving_framework",
    label: "Remote driving framework",
    status: "Permit-specific",
    summary:
      "Remote control and supervision arrangements are addressed through the experimental permit, including driver location and number of vehicles controlled.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a)(5), (c) and (i)" },
    ],
    scopeLabel: "Out-of-vehicle-driver experiment",
  }),
  operating_scope_model: established({
    key: "operating_scope_model",
    label: "Operating scope model",
    status: "Permit-defined route / operational domain",
    summary:
      "The application identifies route, dates, times, duration, operating environment and Operational Domain risks.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a), (c) and (d)" }],
    scopeLabel: "Individual experimental permit",
  }),
  separate_operating_area_approval: established({
    key: "separate_operating_area_approval",
    label: "Separate operating-area approval",
    status: "Route assessed in permit",
    summary:
      "The proposed route and Operational Domain are assessed as part of the experiment authorization; this is not a German-style standalone Betriebsbereich regime.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(a)(4) and (d)" }],
    scopeLabel: "Permit-defined experiment route",
  }),
  odd_legal_relevance: established({
    key: "odd_legal_relevance",
    label: "ODD legal relevance",
    status: "Part of permit assessment",
    summary:
      "Operational Domain information and environmental/route risk analysis form part of the required application package.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4(1)(d)" }],
    scopeLabel: "Dutch experimental authorization",
  }),
  traffic_rules_model: established({
    key: "traffic_rules_model",
    label: "Traffic-rules model",
    status: "Ordinary rules with targeted exemptions",
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
      "The permit may include necessary exemptions where the statute allows them; WVW Articles 5 and 6 cannot be displaced through Article 149aa.",
    legalBasis: [{ sourceId: "nl-wvw", provision: "Article 149aa(3)" }],
    scopeLabel: "Only requirements within the statutory exemption power",
  }),
  ads_rule_compliance: established({
    key: "ads_rule_compliance",
    label: "ADS responsibility for compliance",
    status: "Driver remains legally relevant",
    summary:
      "The experimental regime does not generally transfer the conventional driver's legal role to the ADS.",
    legalBasis: [
      { sourceId: "nl-history-34838-3", provision: "Driver discussion" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    scopeLabel: "Article 149aa experimental model",
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
      "Regulation 2022/1426, as amended, provides uniform procedures and technical specifications for ADS type approval within its stated use cases.",
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
      "Technical approval does not replace the Dutch permit required for an out-of-vehicle-driver public-road experiment.",
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
    label: "Holder / operator duties",
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
  qualified_personnel: established({
    key: "qualified_personnel",
    label: "Qualified personnel",
    status: "Assessed through permit materials",
    summary:
      "The application addresses driver location, control arrangements, system operation and the people responsible for the experiment.",
    legalBasis: [{ sourceId: "nl-experiment-regulation", provision: "Article 4" }],
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
  incident_event_reporting: established({
    key: "incident_event_reporting",
    label: "Incident / event reporting",
    status: "Layer-specific",
    summary:
      "Reporting, knowledge-sharing, monitoring and evaluation can arise through permit conditions, while EU approval has its own in-use mechanisms.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4(1)(f) and (i)" },
      { sourceId: "eu-2022-1426", provision: "In-use reporting and monitoring requirements" },
    ],
    scopeLabel: "Applicable permit or type-approval layer",
  }),
  regulator_data_access: established({
    key: "regulator_data_access",
    label: "Regulator data access",
    status: "Permit / approval specific",
    summary:
      "The authorization package addresses data recording and monitoring, with access and reporting shaped by the permit and applicable EU approval requirements.",
    legalBasis: [
      { sourceId: "nl-experiment-regulation", provision: "Article 4" },
      { sourceId: "eu-2022-1426" },
    ],
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
    label: "Holder liability",
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
    status: "Minister + RDW permit process",
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
  commercial_use: established({
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
  }),
  primary_human_role: established({
    key: "primary_human_role",
    label: "Primary human role",
    status: "Technical Supervisor",
    tone: "positive",
    summary:
      "The autonomous system performs the driving task; the legally defined human role is the Technische Aufsicht.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1d(3), § 1f(2)" }],
    scopeLabel: "Ordinary operation under §§ 1d–1g StVG",
    scope: { ...passengerRoadScope, humanRole: "Technical Supervisor" },
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
      "The autonomous function must operate without the journey being permanently monitored by the Technical Supervisor.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1e(2)(1)" }],
    scopeLabel: "Ordinary operational regime · not § 1i testing",
  }),
  remote_driving_framework: established({
    key: "remote_driving_framework",
    label: "Remote driving framework",
    status: "Not the role in this regime",
    summary:
      "The Technical Supervisor may release or deactivate defined functions but is not the remote driver performing the dynamic driving task.",
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
      "The holder proposes the operating area and the competent authority approves it after assessing vehicle capability, infrastructure, safety and public interests.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(1)(3)" },
      { sourceId: "de-afgbv", provision: "§§ 7–9" },
    ],
    scopeLabel: "Each defined operating area",
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
  traffic_rule_exemptions: established({
    key: "traffic_rule_exemptions",
    label: "Availability of exemptions",
    status: "Not the ordinary operating model",
    summary:
      "Ordinary autonomous operation is designed around ADS compliance; testing follows a separate route that can address necessary exceptions under its own authority.",
    legalBasis: [
      { sourceId: "de-stvg", provision: "§ 1e(2), § 1i" },
      { sourceId: "de-afgbv", provision: "§ 16" },
    ],
    scopeLabel: "Ordinary operation distinguished from testing",
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
      "Current § 1e recognizes a German operating approval, EU type approval under Regulation 2022/1426, or another comparable approval under applicable law.",
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
      "Technical approval is followed by operating-area approval and vehicle registration before autonomous public-road operation.",
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
      "AFGBV references ISO 26262 and SOTIF in particular state-of-the-art presumptions and evidence pathways.",
    legalBasis: [{ sourceId: "de-afgbv", provision: "Annex 1, especially 7.2.1–7.2.2 and 10" }],
    scopeLabel: "Specific AFGBV safety and evidence requirements",
    atlasAnalysis:
      "The standards have regulatory significance in the cited constructions; they should not be described as universally mandatory for every purpose.",
  }),
  holder_operator_duties: established({
    key: "holder_operator_duties",
    label: "Holder / operator duties",
    status: "Dedicated statutory duties",
    tone: "positive",
    summary:
      "The holder must maintain road safety and environmental compliance, maintain systems, ensure non-driving obligations and provide Technical Supervisor functions.",
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
    scopeLabel: "Holder personnel and Technical Supervisor",
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
  incident_event_reporting: established({
    key: "incident_event_reporting",
    label: "Incident / event reporting",
    status: "Event-triggered recording",
    summary:
      "Intervention, accidents or near-accidents, unplanned lane changes/evasive manoeuvres and operational disruptions trigger data storage duties.",
    legalBasis: [{ sourceId: "de-stvg", provision: "§ 1g(2)" }],
    scopeLabel: "Specified operational events",
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
    label: "Holder liability",
    status: "Remains applicable",
    summary:
      "Statutory holder liability under § 7 StVG remains part of the liability architecture.",
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
    status: "Technical Supervisor expressly covered",
    tone: "positive",
    summary:
      "Current PflVG expressly includes the person acting as Technical Supervisor within the required liability coverage.",
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

export const JURISDICTION_PROFILES: JurisdictionProfile[] = [
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
    verifiedLabel: "Substantive legal verification · 31 Aug 2026",
    primaryMessage:
      "Testing with the driver outside the vehicle is expressly supported under Dutch law. A general Dutch road-use regime for operation without a legally relevant human driver has not been identified.",
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
        answer: "Available with specific permit",
        detail:
          "Article 149aa supports a defined public-road experiment, including where the legally relevant driver is outside the vehicle.",
        tone: "positive",
      },
    ],
    snapshot: [
      {
        label: "Road access",
        status: "Permit-specific",
        tone: "positive",
        scope: "Article 149aa experimental permit route",
      },
      {
        label: "Human role",
        status: "Required",
        tone: "conditional",
        scope: "A legally relevant driver remains part of the Article 149aa model",
      },
      {
        label: "General driverless deployment",
        status: "Not identified",
        tone: "neutral",
        scope: "Dutch public-road operation beyond the experimental model",
      },
      {
        label: "EU ADS type approval",
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
        body: "Vehicle and ADS technical/type approval, including the current Regulation 2022/1426 framework for fully automated vehicles within its scope.",
      },
      {
        label: "Dutch layer",
        body: "Public-road use, ordinary traffic law and experiment-specific authorization under WVW 1994 and the ministerial permit regulation.",
      },
    ],
    architectureConclusion:
      "The Netherlands does not regulate automated driving through one autonomous-vehicle statute. EU type approval and Dutch road access answer different regulatory questions.",
    sections: [
      {
        id: "testing",
        eyebrow: "Testing & authorization",
        title: "A permit for the experiment, not merely the technology",
        paragraphs: [
          "Article 149aa Wegenverkeerswet 1994 expressly provides for public-road experiments where the driver is outside the vehicle. A specific ministerial permit is required, and the application is submitted through RDW under the ministerial regulation.",
          "The application concerns the proposed operating system and experiment: route, dates and duration, driver location, number of vehicles controlled, functional description, risks, safety evidence, insurance and monitoring/evaluation information all form part of the package.",
        ],
        flow: [
          "Defined experiment and route",
          "RDW application and evidence package",
          "Ministerial permit and conditions",
          "Operation within the authorization",
        ],
        takeaway:
          "This is an experiment-specific authorization route, not a general authorization for unrestricted driverless deployment.",
        explain: ["experimental-permit"],
        sources: [
          { sourceId: "nl-wvw", provision: "Article 149aa" },
          { sourceId: "nl-experiment-regulation", provision: "Articles 2–6" },
        ],
      },
      {
        id: "driver",
        eyebrow: "Driver & remote operation",
        title: "Driver outside the vehicle ≠ no driver",
        paragraphs: [
          "The experimental framework allows the driver to be physically outside the vehicle; it does not eliminate the legal driver. Permit material addresses where the driver is located and how many vehicles that driver controls.",
          "Official legislative history explains that the existing concept of bestuurder was considered capable of covering a person outside the vehicle who retains control and can intervene immediately. That explanation is interpretative legislative material, not the binding statutory text itself.",
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
          "The experimental permit can include targeted exemptions where legally available and necessary. It does not automatically disapply the whole RVV, and WVW Articles 5 and 6 sit outside the Article 149aa exemption power.",
        ],
        flow: [
          "Ordinary WVW / RVV rules",
          "Experiment-specific assessment",
          "Targeted exemptions where legally available and necessary",
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
        title: "Operational Domain information enters the permit assessment",
        paragraphs: [
          "The ministerial experimental regulation expressly uses Operational Domain. The application must address environmental factors and the route of the Operational Domain, alongside timing and system-specific risks.",
          "This gives the technical operating boundary legal relevance within the authorization assessment, but it does not turn ODD into a free-standing road-use permission.",
        ],
        takeaway:
          "ODD is not merely a technical description in the Dutch experimental regime; it forms part of the authorization assessment.",
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
          "Regulations 2018/858 and 2019/2144 provide the wider EU vehicle-approval architecture. Regulation 2022/1426, in its current consolidated form after Regulation 2026/481, provides ADS type-approval procedures and technical specifications for fully automated vehicles within its defined scope.",
          "That technical approval does not itself establish a general Dutch right to operate on public roads without a legally relevant human driver.",
        ],
        takeaway:
          "Technical approval of the vehicle or ADS should not be confused with national permission to operate without a legally relevant human driver on Dutch roads.",
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
      "EU law provides a technical type-approval architecture for fully automated vehicles, but technical approval and Dutch public-road authorization remain separate regulatory layers.",
      "The Netherlands is open to advanced automated-driving experimentation, but its dedicated national framework does not currently amount to a general road-use regime for deployment without a legally relevant human driver.",
    ],
    practicalQuestions: [
      "Is the proposed operation an experiment or ordinary deployment?",
      "Does the operating model retain a legally relevant human driver?",
      "Is the vehicle / ADS covered by an applicable EU approval route?",
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
    verifiedLabel: "Substantive legal verification · 31 Aug 2026",
    primaryMessage:
      "Germany has a dedicated statutory framework for autonomous vehicles operating on public roads without a person performing the driving task. Operation is permitted within an officially approved defined operating area where the statutory conditions are satisfied.",
    deploymentAnswers: [
      {
        label: "General driverless deployment",
        answer: "Available conditionally",
        detail:
          "Operation is possible within an approved defined operating area when the statutory vehicle, registration, insurance and organizational conditions are satisfied.",
        tone: "conditional",
      },
      {
        label: "Testing / experimental route",
        answer: "Separate authorization",
        detail:
          "Testing and development on public roads use the distinct KBA authorization route under StVG § 1i and AFGBV § 16.",
        tone: "conditional",
      },
    ],
    snapshot: [
      {
        label: "Autonomous operation without vehicle-driving person",
        status: "Permitted",
        tone: "positive",
        scope: "Approved defined operating area + statutory conditions",
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
        label: "Technical Supervisor",
        status: "Required",
        tone: "conditional",
        scope: "Defined statutory supervisory role",
      },
      {
        label: "EU ADS type approval",
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
          "Section 1e StVG permits autonomous operation only when the technical requirements, an eligible vehicle/ADS approval, an approved defined operating area and public-road registration are all in place.",
          "Eligible approval routes expressly include the German autonomous-vehicle operating approval, EU type approval under Regulation 2022/1426 and another comparable approval under applicable law. KBA performs the German national vehicle-approval role.",
        ],
        flow: [
          "Vehicle / ADS approval",
          "Defined operating area approval",
          "Registration and insurance",
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
          "The festgelegter Betriebsbereich is a geographically and spatially defined part of public road space. The holder proposes it and the competent authority decides whether to approve it.",
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
        eyebrow: "Driver & Technical Supervisor",
        title: "Technical supervision ≠ remote driving",
        paragraphs: [
          "German law expressly contemplates autonomous operation without a person performing the vehicle-driving task. The ADS must perform that task independently, comply with driving-directed traffic rules and operate without continuous monitoring by the Technical Supervisor.",
          "The Technical Supervisor evaluates and releases an alternative manoeuvre where required, can deactivate the autonomous function, responds to system-status information and performs the statutory functions following a minimum-risk event.",
          "AFGBV makes this a regulated role with specified technical or engineering qualifications, manufacturer training, the relevant driving licence and reliability requirements.",
        ],
        takeaway:
          "The vehicle drives itself; the Technical Supervisor performs defined supervisory and fallback functions rather than remote driving.",
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
          "AFGBV uses technical standards within particular compliance constructions. ISO 26262 therefore has regulatory significance in defined places, but should not be presented as universally mandatory for every purpose.",
        ],
        takeaway:
          "Technical standards may acquire regulatory significance where legislation or approval requirements recognize them as a means of demonstrating compliance.",
        explain: ["iso-26262"],
        sources: [
          { sourceId: "de-stvg", provision: "§§ 1e–1f" },
          { sourceId: "de-afgbv", provision: "§ 12 and Annexes 1–3" },
        ],
      },
      {
        id: "holder",
        eyebrow: "Holder & operational duties",
        title: "Germany regulates the operating organization",
        paragraphs: [
          "The holder must preserve road safety and environmental compliance, maintain systems needed for autonomous operation, ensure non-driving traffic obligations, and ensure the Technical Supervisor functions are performed.",
          "AFGBV adds pre-operation checks, a comprehensive inspection every 90 days, a six-month main vehicle inspection interval, maintenance documentation, qualified personnel and suitable Technical Supervisor facilities and IT systems.",
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
          "Technical Supervisor intervention, accidents or near-accidents, unplanned lane changes or evasive manoeuvres, and operational disruptions are specified storage triggers. Competent authorities may obtain relevant data for their statutory supervision.",
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
          "Statutory holder liability under § 7 StVG remains relevant. Section 12 applies higher caps where harm arises through automated or autonomous functions: EUR 10 million for death or personal injury from the same event and EUR 2 million for property damage from the same event.",
          "Compulsory motor liability continues under PflVG, which expressly includes the Technical Supervisor within the required coverage for an autonomous vehicle.",
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
          "Section 1i StVG provides a separate route for testing or developing automated and autonomous functions on public roads. It requires a KBA testing authorization and the monitoring specified for that testing context.",
          "That route should not be conflated with ordinary autonomous operation under §§ 1d–1g within an approved defined operating area.",
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
      "Operation is conditional rather than geographically unrestricted: an eligible vehicle/ADS approval, an approved defined operating area, registration and insurance, and a compliant operating organization including a Technical Supervisor must come together.",
      "Germany permits autonomous operation without a vehicle-driving person within approved defined operating areas, subject to vehicle/ADS approval, operating-area approval, registration, insurance and detailed organizational and safety requirements.",
    ],
    practicalQuestions: [
      "Which vehicle / ADS approval route applies?",
      "What operating area will be submitted for approval?",
      "Can the ADS independently comply with traffic rules within that area?",
      "Who will act as Technical Supervisor?",
      "Can the holder satisfy maintenance, inspection, data and organizational duties?",
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

export function getJurisdictionProfile(slug: string) {
  return JURISDICTION_PROFILES.find((profile) => profile.slug === slug) ?? null;
}

export function getRegulatorySource(sourceId: SourceId) {
  return REGULATORY_SOURCES[sourceId];
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
  };

  return labels[status];
}
