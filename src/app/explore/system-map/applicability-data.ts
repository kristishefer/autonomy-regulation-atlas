import type { JurisdictionSlug } from "@/app/explore/regulatory-data";
import type { SystemNode } from "./system-map-data";

export type ApplicabilityJurisdiction = Extract<
  JurisdictionSlug,
  "germany" | "netherlands" | "united-states" | "russia" | "united-kingdom"
>;

export type ApplicabilityStatus =
  | "treaty_participation"
  | "applies"
  | "implementation_required"
  | "implemented"
  | "referenced"
  | "voluntary_relevance"
  | "not_in_pathway"
  | "research_pending";

export type ApplicabilityMechanism =
  | "1958_agreement"
  | "1998_agreement"
  | "eu_type_approval"
  | "national_implementation"
  | "regulatory_reference"
  | "approval_or_assurance"
  | "industry_use"
  | "none"
  | "unknown";

export type JurisdictionApplicability = {
  instrumentId: string;
  jurisdiction: ApplicabilityJurisdiction;
  status: ApplicabilityStatus;
  mechanism: ApplicabilityMechanism;
  legalEffect: string;
  note?: string;
  versionOrSeries?: string;
  source?: string;
};

const UNECE_1958_STATUS = "https://unece.org/trans/main/wp29/wp29regs";
const UNECE_1998_STATUS =
  "https://unece.org/transport/road-transport/status-1998-agreement";
const EU_GSR =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R2144";
const EU_ADS =
  "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R1426";
const NL_EXPERIMENT = "https://wetten.overheid.nl/BWBR0042343/";
const DE_AFGBV = "https://www.gesetze-im-internet.de/afgbv/";

/**
 * Instrument ↔ jurisdiction relationships.
 *
 * This layer answers a different question from node origin. A standard or UN
 * instrument can originate internationally without being binding everywhere.
 * Every binding / implemented / referenced relationship should be traceable to
 * an authoritative source. Missing research must stay visible as such.
 */
export const JURISDICTION_APPLICABILITY: JurisdictionApplicability[] = [
  ...(["germany", "netherlands", "united-kingdom", "russia"] as const).map(
    (jurisdiction) => ({
      instrumentId: "agreement-1958",
      jurisdiction,
      status: "treaty_participation" as const,
      mechanism: "1958_agreement" as const,
      legalEffect:
        "This jurisdiction participates in the 1958 Agreement system. Participation does not make every UN Regulation automatically applicable: the relevant Regulation, series of amendments and domestic or regional approval pathway still have to be checked.",
      source: UNECE_1958_STATUS,
    }),
  ),
  {
    instrumentId: "agreement-1958",
    jurisdiction: "united-states",
    status: "not_in_pathway",
    mechanism: "none",
    legalEffect:
      "The United States does not use the 1958 Agreement type-approval system as its federal vehicle market-access pathway. Federal motor-vehicle safety law instead uses the FMVSS/self-certification architecture, with separate state road-use rules.",
    source: UNECE_1958_STATUS,
  },

  ...(["germany", "netherlands"] as const).map((jurisdiction) => ({
    instrumentId: "un-regulations",
    jurisdiction,
    status: "applies" as const,
    mechanism: "eu_type_approval" as const,
    legalEffect:
      "Individual UN Regulations can become compulsory parts of the EU vehicle type-approval framework. Applicability must therefore be checked Regulation by Regulation and series by series, rather than inferred from the label ‘UNECE’.",
    source: EU_GSR,
  })),
  ...(["united-kingdom", "russia"] as const).map((jurisdiction) => ({
    instrumentId: "un-regulations",
    jurisdiction,
    status: "treaty_participation" as const,
    mechanism: "1958_agreement" as const,
    legalEffect:
      "UN Regulations can operate through this jurisdiction's participation in the 1958 Agreement system, but Atlas must verify the application of each Regulation and amendment series before showing it as a binding domestic approval requirement.",
    source: UNECE_1958_STATUS,
  })),
  {
    instrumentId: "un-regulations",
    jurisdiction: "united-states",
    status: "not_in_pathway",
    mechanism: "none",
    legalEffect:
      "UN Regulations under the 1958 Agreement are not the US federal certification pathway. A technically similar requirement may exist in US law, but it must be traced to US authority rather than inferred from the UN Regulation.",
    source: UNECE_1958_STATUS,
  },

  ...([
    "germany",
    "netherlands",
    "united-states",
    "united-kingdom",
    "russia",
  ] as const).map((jurisdiction) => ({
    instrumentId: "agreement-1998",
    jurisdiction,
    status: "treaty_participation" as const,
    mechanism: "1998_agreement" as const,
    legalEffect:
      "Participation in the 1998 Agreement supports development of UN Global Technical Regulations. A UN GTR does not become directly binding domestic law merely because it is established in the Global Registry.",
    source: UNECE_1998_STATUS,
  })),
  ...([
    "germany",
    "netherlands",
    "united-states",
    "united-kingdom",
    "russia",
  ] as const).map((jurisdiction) => ({
    instrumentId: "un-gtrs",
    jurisdiction,
    status: "implementation_required" as const,
    mechanism: "national_implementation" as const,
    legalEffect:
      "UN GTRs require implementation through the relevant domestic or regional legal system. Atlas should show a GTR as implemented only when that implementation has been researched for the specific GTR and jurisdiction.",
    source: UNECE_1998_STATUS,
  })),

  ...(["germany", "netherlands"] as const).flatMap((jurisdiction) => [
    {
      instrumentId: "un-r155",
      jurisdiction,
      status: "applies" as const,
      mechanism: "eu_type_approval" as const,
      legalEffect:
        "UN R155 forms part of the EU vehicle type-approval architecture where the applicable EU requirements and vehicle scope trigger it. Its effect here comes through the EU approval framework, not from a claim that every UN Regulation is universally binding.",
      source: EU_GSR,
    },
    {
      instrumentId: "un-r156",
      jurisdiction,
      status: "applies" as const,
      mechanism: "eu_type_approval" as const,
      legalEffect:
        "UN R156 is incorporated into the EU type-approval architecture for software-update requirements in the applicable vehicle categories and approval context.",
      source:
        "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:02018R0858-20240528",
    },
    {
      instrumentId: "un-r157",
      jurisdiction,
      status: "applies" as const,
      mechanism: "eu_type_approval" as const,
      legalEffect:
        "UN R157 is used in the EU type-approval architecture for ALKS within its defined regulatory scope. It is one function-specific approval rule, not a general legal basis for all driverless deployment.",
      source: EU_ADS,
    },
  ]),

  {
    instrumentId: "iso-26262",
    jurisdiction: "netherlands",
    status: "referenced",
    mechanism: "regulatory_reference",
    legalEffect:
      "The Dutch experimental-permit framework expressly references specified ISO 26262 processes as a safety-evidence method, while allowing a demonstrably equivalent method. That is a concrete regulatory reference, not a rule that ISO 26262 is universally mandatory in the Netherlands.",
    source: NL_EXPERIMENT,
  },
  {
    instrumentId: "iso-26262",
    jurisdiction: "germany",
    status: "referenced",
    mechanism: "regulatory_reference",
    legalEffect:
      "AFGBV references ISO 26262 in specific state-of-the-art presumptions and safety-evidence constructions. The reference gives the standard regulatory significance in those constructions without turning ISO 26262 into a universal standalone German deployment rule.",
    source: DE_AFGBV,
  },
  {
    instrumentId: "sotif",
    jurisdiction: "germany",
    status: "referenced",
    mechanism: "regulatory_reference",
    legalEffect:
      "AFGBV references SOTIF in specific safety and state-of-the-art evidence constructions. Its legal significance comes from that regulatory use and should not be generalized into a claim that the ISO standard is mandatory for every German vehicle or purpose.",
    source: DE_AFGBV,
  },
  ...(["united-states", "united-kingdom", "russia"] as const).map(
    (jurisdiction) => ({
      instrumentId: "iso-26262",
      jurisdiction,
      status: "voluntary_relevance" as const,
      mechanism: "approval_or_assurance" as const,
      legalEffect:
        "ISO 26262 can be relevant to functional-safety engineering and assurance, but Atlas has not identified a general rule making the standard itself the jurisdiction-wide legal gateway for autonomous-vehicle deployment.",
    }),
  ),

  {
    instrumentId: "natm",
    jurisdiction: "germany",
    status: "referenced",
    mechanism: "eu_type_approval",
    legalEffect:
      "The EU ADS type-approval framework uses the multi-pillar assessment logic developed through UNECE NATM work for fully automated vehicle ADS assessment. The legal obligation arises from the EU approval instrument, not from NATM standing alone.",
    source: EU_ADS,
  },
  {
    instrumentId: "natm",
    jurisdiction: "netherlands",
    status: "referenced",
    mechanism: "eu_type_approval",
    legalEffect:
      "The EU ADS type-approval framework uses the multi-pillar assessment logic developed through UNECE NATM work for fully automated vehicle ADS assessment. The legal obligation arises from the EU approval instrument, not from NATM standing alone.",
    source: EU_ADS,
  },
];

export const APPLICABILITY_STATUS_LABELS: Record<ApplicabilityStatus, string> = {
  treaty_participation: "Treaty pathway",
  applies: "Applies through legal framework",
  implementation_required: "Requires domestic / regional implementation",
  implemented: "Implemented / transposed",
  referenced: "Referenced by applicable regulation or approval framework",
  voluntary_relevance: "Voluntary / assurance relevance",
  not_in_pathway: "Not part of this legal pathway",
  research_pending: "Applicability research pending",
};

export const APPLICABILITY_MECHANISM_LABELS: Record<
  ApplicabilityMechanism,
  string
> = {
  "1958_agreement": "1958 Agreement / UN Regulation pathway",
  "1998_agreement": "1998 Agreement / UN GTR pathway",
  eu_type_approval: "EU vehicle type-approval framework",
  national_implementation: "Domestic or regional implementation",
  regulatory_reference: "Express regulatory reference",
  approval_or_assurance: "Approval / safety-assurance relevance",
  industry_use: "Industry use",
  none: "Not part of the applicable pathway",
  unknown: "Not yet researched",
};

const standardsWithVoluntaryDefault = new Set([
  "sae-j3016",
  "iso-26262",
  "sotif",
  "iso-pas-8800",
  "iso-sae-21434",
  "iso-24089",
  "ul-4600",
  "iso-3450x",
]);

export function getApplicability(
  instrumentId: string,
  jurisdiction: ApplicabilityJurisdiction,
): JurisdictionApplicability | null {
  return (
    JURISDICTION_APPLICABILITY.find(
      (item) =>
        item.instrumentId === instrumentId && item.jurisdiction === jurisdiction,
    ) ?? null
  );
}

export function getNodeApplicability(
  node: SystemNode,
  jurisdiction: ApplicabilityJurisdiction | null,
): JurisdictionApplicability | null {
  if (!jurisdiction) return null;

  const direct = getApplicability(node.id, jurisdiction);
  if (direct) return direct;

  if (standardsWithVoluntaryDefault.has(node.id) || node.nodeType === "standard") {
    return {
      instrumentId: node.id,
      jurisdiction,
      status: "voluntary_relevance",
      mechanism: "approval_or_assurance",
      legalEffect:
        "This is a technical or industry standard, not a jurisdiction-wide deployment authorization by itself. A stronger legal effect should be shown only where Atlas has identified a specific incorporation, regulatory reference or approval use.",
    };
  }

  if (
    node.nodeType === "concept" ||
    node.nodeType === "methodology" ||
    node.nodeType === "institution"
  ) {
    return null;
  }

  return {
    instrumentId: node.id,
    jurisdiction,
    status: "research_pending",
    mechanism: "unknown",
    legalEffect:
      "Atlas has not yet completed jurisdiction-specific applicability research for this instrument. Do not infer legal effect from its international origin or general relevance.",
  };
}
