import type { JurisdictionKey } from "./system-map-data";

export type ApplicabilityStatus =
  | "applies"
  | "implemented"
  | "referenced"
  | "voluntary_relevance"
  | "not_in_pathway"
  | "research_pending";

export type ApplicabilityMechanism =
  | "1958_agreement"
  | "1998_agreement"
  | "regional_type_approval"
  | "national_implementation"
  | "regulatory_reference"
  | "guidance_or_assurance"
  | "industry_use"
  | "none"
  | "unknown";

export type JurisdictionApplicability = {
  instrumentId: string;
  jurisdiction: JurisdictionKey;
  status: ApplicabilityStatus;
  mechanism: ApplicabilityMechanism;
  legalEffect: string;
  note?: string;
  effectiveFrom?: string;
  versionOrSeries?: string;
  source?: string;
};

/**
 * Cross-cutting relationship layer between a global/core instrument and a
 * jurisdiction. This is deliberately separate from SystemNode.jurisdiction:
 * a node can originate at the international level while having different
 * legal effects in different legal orders.
 *
 * Do not infer applicability from geography, issuing body or a generic
 * relevance score. Each relationship should be researched and sourced.
 */
export const JURISDICTION_APPLICABILITY: JurisdictionApplicability[] = [
  // Seed relationships are intentionally conservative. Expand only from
  // primary sources and keep Regulation-specific status separate from treaty
  // participation.
  {
    instrumentId: "agreement-1958",
    jurisdiction: "eu",
    status: "applies",
    mechanism: "1958_agreement",
    legalEffect:
      "The EU participates in the 1958 Agreement architecture; the legal effect of an individual UN Regulation still depends on whether that Regulation is applicable through the EU type-approval framework.",
  },
  {
    instrumentId: "agreement-1958",
    jurisdiction: "de",
    status: "applies",
    mechanism: "regional_type_approval",
    legalEffect:
      "Germany sits within the EU type-approval system and the 1958 Agreement architecture; applicability must still be checked instrument by instrument.",
  },
  {
    instrumentId: "agreement-1958",
    jurisdiction: "nl",
    status: "applies",
    mechanism: "regional_type_approval",
    legalEffect:
      "The Netherlands sits within the EU type-approval system and the 1958 Agreement architecture; applicability must still be checked instrument by instrument.",
  },
  {
    instrumentId: "agreement-1958",
    jurisdiction: "us",
    status: "not_in_pathway",
    mechanism: "none",
    legalEffect:
      "The United States does not use the 1958 Agreement type-approval pathway as its federal vehicle market-access architecture.",
  },
  {
    instrumentId: "un-regulations",
    jurisdiction: "eu",
    status: "applies",
    mechanism: "regional_type_approval",
    legalEffect:
      "Individual UN Regulations can form part of the EU vehicle type-approval framework. Applicability must be recorded Regulation by Regulation, including the applicable series/version.",
  },
  {
    instrumentId: "un-regulations",
    jurisdiction: "de",
    status: "applies",
    mechanism: "regional_type_approval",
    legalEffect:
      "UN Regulations may apply through the EU/German type-approval architecture. The Atlas must not treat all UN Regulations as automatically applicable merely because Germany participates in the 1958 Agreement system.",
  },
  {
    instrumentId: "un-regulations",
    jurisdiction: "nl",
    status: "applies",
    mechanism: "regional_type_approval",
    legalEffect:
      "UN Regulations may apply through the EU/Dutch type-approval architecture. The Atlas must record instrument-specific applicability rather than infer it from treaty participation alone.",
  },
  {
    instrumentId: "un-regulations",
    jurisdiction: "us",
    status: "not_in_pathway",
    mechanism: "none",
    legalEffect:
      "UN Regulations under the 1958 Agreement are not the federal US vehicle certification pathway; US market access follows the federal self-certification architecture.",
  },
  {
    instrumentId: "agreement-1998",
    jurisdiction: "us",
    status: "applies",
    mechanism: "1998_agreement",
    legalEffect:
      "Participation in the 1998 Agreement does not make a UN GTR directly binding domestically. Domestic legal effect depends on implementation in the relevant US regulatory framework.",
  },
  {
    instrumentId: "un-gtrs",
    jurisdiction: "us",
    status: "implemented",
    mechanism: "national_implementation",
    legalEffect:
      "UN GTRs do not operate as directly applicable type-approval rules. The Atlas should record the domestic implementation status of each GTR separately.",
    note: "Family-level placeholder: replace with GTR-specific implementation records before presenting a definitive status to users.",
  },
  {
    instrumentId: "iso-26262",
    jurisdiction: "eu",
    status: "voluntary_relevance",
    mechanism: "guidance_or_assurance",
    legalEffect:
      "ISO 26262 is a voluntary technical standard unless a specific legal, approval, contractual or evidentiary mechanism gives it additional relevance.",
  },
  {
    instrumentId: "iso-26262",
    jurisdiction: "de",
    status: "voluntary_relevance",
    mechanism: "guidance_or_assurance",
    legalEffect:
      "The standard can be relevant to functional-safety engineering and evidence, but the Atlas should not display it as a German statutory rule without a specific legal reference.",
  },
  {
    instrumentId: "iso-26262",
    jurisdiction: "nl",
    status: "voluntary_relevance",
    mechanism: "guidance_or_assurance",
    legalEffect:
      "The standard can be relevant to functional-safety engineering and evidence, but the Atlas should not display it as a Dutch statutory rule without a specific legal reference.",
  },
  {
    instrumentId: "iso-26262",
    jurisdiction: "us",
    status: "voluntary_relevance",
    mechanism: "industry_use",
    legalEffect:
      "ISO 26262 may be used as an engineering or assurance benchmark, but it is not by itself a federal vehicle market-access authorization.",
  },
];

export const APPLICABILITY_STATUS_LABELS: Record<ApplicabilityStatus, string> = {
  applies: "Applies through legal framework",
  implemented: "Implemented / transposed",
  referenced: "Legally or regulatorily referenced",
  voluntary_relevance: "Voluntary / assurance relevance",
  not_in_pathway: "Not part of this legal pathway",
  research_pending: "Research pending",
};

export function getApplicability(
  instrumentId: string,
  jurisdiction: JurisdictionKey | null
) {
  if (!jurisdiction) return null;

  const direct = JURISDICTION_APPLICABILITY.find(
    (item) =>
      item.instrumentId === instrumentId && item.jurisdiction === jurisdiction
  );

  if (direct) return direct;

  return {
    instrumentId,
    jurisdiction,
    status: "research_pending" as const,
    mechanism: "unknown" as const,
    legalEffect:
      "Jurisdiction-specific applicability has not yet been researched for this instrument. Do not infer legal effect from its global origin or general relevance.",
  };
}
