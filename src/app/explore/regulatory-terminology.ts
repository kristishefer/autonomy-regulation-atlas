import type { SourceId } from "@/app/explore/regulatory-data";

export type RegulatoryQuestionId =
  | "road-access"
  | "vehicle-approval"
  | "operating-domain"
  | "human-roles"
  | "traffic-rules"
  | "safety-assurance"
  | "operations"
  | "data-incidents"
  | "liability-insurance";

export type UniversalAtlasConceptId =
  | "driver-role"
  | "technical-supervision-role"
  | "vehicle-responsibility-role"
  | "technical-operating-domain"
  | "legal-operating-area"
  | "operating-domain-information"
  | "vehicle-operating-approval"
  | "type-approval"
  | "vehicle-registration"
  | "operating-area-authorization"
  | "experimental-road-access-permit"
  | "regulatory-exemption";

export type JurisdictionTermStatus =
  | "statutory-defined-term"
  | "official-usage"
  | "guidance-term"
  | "legislative-history-term"
  | "technical-standard-term"
  | "atlas-gloss";

export type TermRelationshipType =
  | "narrower-than"
  | "broader-than"
  | "related-but-not-equivalent"
  | "applies-to-testing-only"
  | "applies-to-operation-only"
  | "official-language-version";

export type JurisdictionTermId =
  | "de-technische-aufsicht"
  | "de-fahrzeugfuehrer"
  | "de-halter"
  | "de-betriebsbereich"
  | "de-betriebserlaubnis"
  | "de-typgenehmigung"
  | "de-zulassung"
  | "de-betriebsbereich-genehmigung"
  | "nl-bestuurder"
  | "nl-bestuurder-buiten-motorrijtuig"
  | "nl-vergunning"
  | "nl-ontheffing"
  | "nl-vrijstelling"
  | "nl-operationeel-domein"
  | "nl-typegoedkeuring";

export type UniversalAtlasConcept = {
  id: UniversalAtlasConceptId;
  analyticalLabel: string;
  universalExplanation: string;
  regulatoryQuestionBindings: RegulatoryQuestionId[];
};

export type TerminologySourceReference = {
  sourceId: SourceId;
  provision?: string;
  officialLanguageUrl?: string;
};

export type TermRelationship = {
  type: TermRelationshipType;
  targetConceptId?: UniversalAtlasConceptId;
  targetTermId?: JurisdictionTermId;
  explanation: string;
};

export type JurisdictionTerm = {
  id: JurisdictionTermId;
  conceptId: UniversalAtlasConceptId;
  jurisdiction: "germany" | "netherlands";
  officialTerm: string;
  originalLanguage: {
    tag: "de-DE" | "nl-NL";
    label: "German" | "Dutch";
  };
  englishGloss: string;
  explanation: string;
  whyItMatters: string;
  termStatus: JurisdictionTermStatus;
  scope: string;
  sources: TerminologySourceReference[];
  relationships: TermRelationship[];
};

export const TERM_STATUS_LABELS: Record<JurisdictionTermStatus, string> = {
  "statutory-defined-term": "Statutory defined term",
  "official-usage": "Official usage",
  "guidance-term": "Guidance term",
  "legislative-history-term": "Legislative-history term",
  "technical-standard-term": "Technical-standard term",
  "atlas-gloss": "Atlas gloss",
};

export const UNIVERSAL_ATLAS_CONCEPTS: Record<
  UniversalAtlasConceptId,
  UniversalAtlasConcept
> = {
  "driver-role": {
    id: "driver-role",
    analyticalLabel: "Legally relevant driver role",
    universalExplanation:
      "The human role treated by the applicable regime as driving or legally responsible for defined driving functions.",
    regulatoryQuestionBindings: ["human-roles", "traffic-rules"],
  },
  "technical-supervision-role": {
    id: "technical-supervision-role",
    analyticalLabel: "Technical supervision role",
    universalExplanation:
      "A regime-specific human role assigned defined supervisory, release, deactivation or fallback functions without automatically performing the driving task.",
    regulatoryQuestionBindings: ["human-roles", "operations"],
  },
  "vehicle-responsibility-role": {
    id: "vehicle-responsibility-role",
    analyticalLabel: "Responsible vehicle-keeping role",
    universalExplanation:
      "The person or organization to which a regime assigns continuing vehicle, maintenance, organizational or liability duties.",
    regulatoryQuestionBindings: ["operations", "liability-insurance"],
  },
  "technical-operating-domain": {
    id: "technical-operating-domain",
    analyticalLabel: "Technical operating domain",
    universalExplanation:
      "The conditions in which an ADS is designed to operate, commonly expressed through its Operational Design Domain.",
    regulatoryQuestionBindings: ["operating-domain", "safety-assurance"],
  },
  "legal-operating-area": {
    id: "legal-operating-area",
    analyticalLabel: "Legally defined operating area",
    universalExplanation:
      "A geographic or spatial operating boundary that has legal significance under a particular road-use regime.",
    regulatoryQuestionBindings: ["operating-domain", "road-access"],
  },
  "operating-domain-information": {
    id: "operating-domain-information",
    analyticalLabel: "Operating-domain information in an authorization process",
    universalExplanation:
      "Information about operating conditions, environment or route that a regime requires as part of an authorization assessment.",
    regulatoryQuestionBindings: ["operating-domain", "road-access"],
  },
  "vehicle-operating-approval": {
    id: "vehicle-operating-approval",
    analyticalLabel: "National vehicle approval",
    universalExplanation:
      "A national technical approval for the vehicle or autonomous function under the applicable approval route.",
    regulatoryQuestionBindings: ["vehicle-approval"],
  },
  "type-approval": {
    id: "type-approval",
    analyticalLabel: "Type approval",
    universalExplanation:
      "Approval that a vehicle, system or type satisfies an applicable product-level technical approval regime.",
    regulatoryQuestionBindings: ["vehicle-approval"],
  },
  "vehicle-registration": {
    id: "vehicle-registration",
    analyticalLabel: "Public-road vehicle registration",
    universalExplanation:
      "The registration gate for admitting an individual vehicle to public-road traffic under the applicable regime.",
    regulatoryQuestionBindings: ["road-access", "vehicle-approval"],
  },
  "operating-area-authorization": {
    id: "operating-area-authorization",
    analyticalLabel: "Operating-area authorization",
    universalExplanation:
      "The legal decision approving a defined area for operation, kept distinct from both the area itself and technical vehicle approval.",
    regulatoryQuestionBindings: ["road-access", "operating-domain"],
  },
  "experimental-road-access-permit": {
    id: "experimental-road-access-permit",
    analyticalLabel: "Experimental road-access permit",
    universalExplanation:
      "A permission for a defined public-road experiment, subject to the applicable scope, evidence and operating conditions.",
    regulatoryQuestionBindings: ["road-access"],
  },
  "regulatory-exemption": {
    id: "regulatory-exemption",
    analyticalLabel: "Regulatory exemption mechanism",
    universalExplanation:
      "A mechanism that disapplies or adjusts specified requirements where the applicable law authorizes it.",
    regulatoryQuestionBindings: ["traffic-rules", "road-access"],
  },
};

const german = { tag: "de-DE", label: "German" } as const;
const dutch = { tag: "nl-NL", label: "Dutch" } as const;

export const JURISDICTION_TERMS: Record<JurisdictionTermId, JurisdictionTerm> = {
  "de-technische-aufsicht": {
    id: "de-technische-aufsicht",
    conceptId: "technical-supervision-role",
    jurisdiction: "germany",
    officialTerm: "Technische Aufsicht",
    originalLanguage: german,
    englishGloss: "statutory technical-supervision person",
    explanation:
      "The natural person who can deactivate the autonomous function and release alternative manoeuvres in the circumstances defined by German law.",
    whyItMatters:
      "This role is not a generic remote operator or remote driver and does not continuously perform the dynamic driving task in ordinary operation.",
    termStatus: "statutory-defined-term",
    scope: "Ordinary autonomous operation under StVG §§ 1d–1g",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1d(3), § 1f(2)" },
      { sourceId: "de-afgbv", provision: "§ 14" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetConceptId: "driver-role",
        explanation:
          "Technical supervision and vehicle driving are separate roles in the ordinary German autonomous-operation model.",
      },
      {
        type: "applies-to-operation-only",
        targetConceptId: "technical-supervision-role",
        explanation:
          "This description addresses the ordinary §§ 1d–1g operating regime; § 1i testing has its own monitoring rules.",
      },
    ],
  },
  "de-fahrzeugfuehrer": {
    id: "de-fahrzeugfuehrer",
    conceptId: "driver-role",
    jurisdiction: "germany",
    officialTerm: "Fahrzeugführer",
    originalLanguage: german,
    englishGloss: "vehicle driver",
    explanation:
      "The legally relevant vehicle-driving person. Section 1i uses this role for permanent monitoring when automated functions are tested.",
    whyItMatters:
      "A Fahrzeugführer in automated-function testing must not be relabelled as the Technische Aufsicht used for autonomous operation or autonomous-function testing.",
    termStatus: "official-usage",
    scope: "Automated-function testing under StVG § 1i(1)(4)(a)",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1a(4), § 1i(1)(4)(a)" },
    ],
    relationships: [
      {
        type: "applies-to-testing-only",
        targetConceptId: "driver-role",
        explanation:
          "The terminology record captures the § 1i automated-function testing role, not every use of Fahrzeugführer in German traffic law.",
      },
      {
        type: "related-but-not-equivalent",
        targetTermId: "de-technische-aufsicht",
        explanation:
          "German testing law assigns different monitoring roles to automated and autonomous functions.",
      },
    ],
  },
  "de-halter": {
    id: "de-halter",
    conceptId: "vehicle-responsibility-role",
    jurisdiction: "germany",
    officialTerm: "Halter",
    originalLanguage: german,
    englishGloss: "vehicle keeper under German road-traffic law",
    explanation:
      "The role to which StVG and AFGBV assign continuing duties for road safety, maintenance, organizational arrangements and performance of the Technische Aufsicht functions.",
    whyItMatters:
      "Halter must not be silently equated with the vehicle owner, manufacturer or transport-service operator; the applicable duty must be traced to the provision.",
    termStatus: "official-usage",
    scope: "German autonomous-operation duties and vehicle-liability architecture",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1f(1), § 7" },
      { sourceId: "de-afgbv", provision: "§ 13" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetConceptId: "vehicle-responsibility-role",
        explanation:
          "The English analytical category covers multiple regimes; Halter retains its German legal scope.",
      },
    ],
  },
  "de-betriebsbereich": {
    id: "de-betriebsbereich",
    conceptId: "legal-operating-area",
    jurisdiction: "germany",
    officialTerm: "Betriebsbereich",
    originalLanguage: german,
    englishGloss: "legally defined operating area",
    explanation:
      "The geographically and spatially defined part of public road space in which a vehicle with an autonomous driving function may operate once the area is approved.",
    whyItMatters:
      "Betriebsbereich is a legal operating-area concept, not the German translation of the ADS technical ODD.",
    termStatus: "statutory-defined-term",
    scope: "Autonomous operation under StVG §§ 1d–1g and AFGBV §§ 7–10",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1d(2), § 1e(1)(3)" },
      { sourceId: "de-afgbv", provision: "§§ 7–10" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetConceptId: "technical-operating-domain",
        explanation:
          "The ADS capability informs the assessment, but ODD and the legally approved Betriebsbereich answer different questions.",
      },
      {
        type: "applies-to-operation-only",
        targetConceptId: "legal-operating-area",
        explanation:
          "This record concerns the ordinary autonomous-operation route rather than the separate § 1i testing authorization.",
      },
    ],
  },
  "de-betriebserlaubnis": {
    id: "de-betriebserlaubnis",
    conceptId: "vehicle-operating-approval",
    jurisdiction: "germany",
    officialTerm: "Betriebserlaubnis",
    originalLanguage: german,
    englishGloss: "German national vehicle approval under the autonomous-driving regime",
    explanation:
      "One eligible vehicle-level approval route named by StVG § 1e and issued under the AFGBV framework.",
    whyItMatters:
      "It is not the approval of a Betriebsbereich and does not replace vehicle registration or every other condition for public-road operation.",
    termStatus: "official-usage",
    scope: "Vehicle approval under StVG § 1e(4) and AFGBV §§ 2–6",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1e(1)(2), § 1e(4)" },
      { sourceId: "de-afgbv", provision: "§§ 2–6" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetTermId: "de-betriebsbereich-genehmigung",
        explanation:
          "Vehicle approval and approval of the operating area are separate legal decisions.",
      },
    ],
  },
  "de-typgenehmigung": {
    id: "de-typgenehmigung",
    conceptId: "type-approval",
    jurisdiction: "germany",
    officialTerm: "Typgenehmigung",
    originalLanguage: german,
    englishGloss: "type approval",
    explanation:
      "The German official-language term used for the eligible EU ADS type-approval route under Regulation (EU) 2022/1426.",
    whyItMatters:
      "Typgenehmigung is a product-level approval; it is not the German operating-area authorization or vehicle registration.",
    termStatus: "official-usage",
    scope: "EU ADS type approval as recognized by StVG § 1e",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1e(1)(2)" },
      {
        sourceId: "eu-2022-1426",
        provision: "Article 1 and annexes",
        officialLanguageUrl:
          "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:02022R1426-20260324",
      },
    ],
    relationships: [
      {
        type: "official-language-version",
        targetTermId: "nl-typegoedkeuring",
        explanation:
          "Typgenehmigung and typegoedkeuring are official German and Dutch language versions of the EU type-approval concept, not national road-use permissions.",
      },
    ],
  },
  "de-zulassung": {
    id: "de-zulassung",
    conceptId: "vehicle-registration",
    jurisdiction: "germany",
    officialTerm: "Zulassung",
    originalLanguage: german,
    englishGloss: "registration for participation in public-road traffic",
    explanation:
      "The individual vehicle registration gate that remains necessary in addition to an eligible vehicle approval and approval of the defined operating area.",
    whyItMatters:
      "Zulassung is not a synonym for Betriebserlaubnis, Typgenehmigung or the approval of the Betriebsbereich.",
    termStatus: "official-usage",
    scope: "Public-road participation under StVG § 1 and AFGBV § 11",
    sources: [
      { sourceId: "de-stvg", provision: "§ 1, § 1e(1)(4)" },
      { sourceId: "de-afgbv", provision: "§ 11" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetTermId: "de-betriebserlaubnis",
        explanation:
          "Registration relies on an eligible vehicle approval but remains a separate gate.",
      },
      {
        type: "applies-to-operation-only",
        targetConceptId: "vehicle-registration",
        explanation:
          "This term is shown here as a condition for public-road operation.",
      },
    ],
  },
  "de-betriebsbereich-genehmigung": {
    id: "de-betriebsbereich-genehmigung",
    conceptId: "operating-area-authorization",
    jurisdiction: "germany",
    officialTerm: "Genehmigung des festgelegten Betriebsbereichs",
    originalLanguage: german,
    englishGloss: "authorization of the defined operating area",
    explanation:
      "The competent authority's legal decision approving the area proposed by the Halter for autonomous operation.",
    whyItMatters:
      "The authorization is distinct from the Betriebsbereich as an area, the vehicle's technical approval and its registration.",
    termStatus: "official-usage",
    scope: "Operating-area approval under AFGBV §§ 7–10",
    sources: [
      { sourceId: "de-afgbv", provision: "§§ 7–10" },
      { sourceId: "de-stvg", provision: "§ 1e(1)(3)" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetTermId: "de-betriebsbereich",
        explanation:
          "One term names the legal decision; the other names the operating area to which that decision relates.",
      },
      {
        type: "applies-to-operation-only",
        targetConceptId: "operating-area-authorization",
        explanation:
          "The approval belongs to the ordinary autonomous-operation route, not the separate testing route.",
      },
    ],
  },
  "nl-bestuurder": {
    id: "nl-bestuurder",
    conceptId: "driver-role",
    jurisdiction: "netherlands",
    officialTerm: "bestuurder",
    originalLanguage: dutch,
    englishGloss: "legally relevant driver",
    explanation:
      "The person treated as the driver under the Dutch road-traffic framework, with the associated legal duties and responsibilities.",
    whyItMatters:
      "The Dutch experimental model retains a bestuurder even when that person is outside the vehicle; it does not automatically transfer the driver's legal role to the ADS.",
    termStatus: "statutory-defined-term",
    scope: "WVW 1994 and the Article 149aa experimental model",
    sources: [
      { sourceId: "nl-wvw", provision: "Article 1(1)(o), Article 149aa" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    relationships: [
      {
        type: "broader-than",
        targetTermId: "nl-bestuurder-buiten-motorrijtuig",
        explanation:
          "The out-of-vehicle driver is a particular experimental configuration of the continuing bestuurder role.",
      },
    ],
  },
  "nl-bestuurder-buiten-motorrijtuig": {
    id: "nl-bestuurder-buiten-motorrijtuig",
    conceptId: "driver-role",
    jurisdiction: "netherlands",
    officialTerm: "bestuurder buiten het motorrijtuig",
    originalLanguage: dutch,
    englishGloss: "driver outside the motor vehicle",
    explanation:
      "The legally relevant driver is physically outside the vehicle in the experiment while the driver role remains part of the legal model.",
    whyItMatters:
      "This is not a no-driver model and should not be relabelled as generic remote assistance or remote supervision.",
    termStatus: "official-usage",
    scope: "Public-road experiments under WVW Article 149aa",
    sources: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-history-34838-3", provision: "Driver discussion" },
      { sourceId: "nl-history-34838-4", provision: "Section 1 — De bestuurder" },
    ],
    relationships: [
      {
        type: "narrower-than",
        targetTermId: "nl-bestuurder",
        explanation:
          "The phrase describes where the bestuurder is located; it does not create a legally driverless model.",
      },
      {
        type: "applies-to-testing-only",
        targetConceptId: "driver-role",
        explanation:
          "The current dedicated statutory route is an experiment-specific framework.",
      },
    ],
  },
  "nl-vergunning": {
    id: "nl-vergunning",
    conceptId: "experimental-road-access-permit",
    jurisdiction: "netherlands",
    officialTerm: "vergunning",
    originalLanguage: dutch,
    englishGloss: "permit for the defined experiment",
    explanation:
      "The ministerial permission required for the Article 149aa experiment where the bestuurder is outside the vehicle.",
    whyItMatters:
      "The vergunning authorizes the experiment; it is not the same instrument as an ontheffing or a product type approval.",
    termStatus: "official-usage",
    scope: "Article 149aa out-of-vehicle-driver experiment",
    sources: [
      { sourceId: "nl-wvw", provision: "Article 149aa" },
      { sourceId: "nl-experiment-regulation", provision: "Articles 2–6" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetTermId: "nl-ontheffing",
        explanation:
          "A vergunning may carry a legally available ontheffing, but the permission and exemption remain separate concepts.",
      },
      {
        type: "applies-to-testing-only",
        targetConceptId: "experimental-road-access-permit",
        explanation:
          "The Article 149aa vergunning is permission for an experiment, not unrestricted ordinary deployment.",
      },
    ],
  },
  "nl-ontheffing": {
    id: "nl-ontheffing",
    conceptId: "regulatory-exemption",
    jurisdiction: "netherlands",
    officialTerm: "ontheffing",
    originalLanguage: dutch,
    englishGloss: "exemption from specified requirements",
    explanation:
      "A legally authorized dispensation from particular requirements for the case at issue; Article 149aa limits what may be displaced for the experiment.",
    whyItMatters:
      "An ontheffing adjusts identified requirements. It does not itself supply the whole experimental vergunning and does not disapply the entire road-traffic framework.",
    termStatus: "official-usage",
    scope: "Legally available experiment-specific departures under WVW 1994",
    sources: [
      { sourceId: "nl-wvw", provision: "Article 149aa(3)" },
      { sourceId: "nl-history-34838-3", provision: "Sections 2.3 and 2.4" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetTermId: "nl-vergunning",
        explanation:
          "The exemption may accompany the permit but does not replace it.",
      },
      {
        type: "related-but-not-equivalent",
        targetTermId: "nl-vrijstelling",
        explanation:
          "Dutch legislation names ontheffing and vrijstelling separately; their authority and scope must be traced to the applicable provision.",
      },
    ],
  },
  "nl-vrijstelling": {
    id: "nl-vrijstelling",
    conceptId: "regulatory-exemption",
    jurisdiction: "netherlands",
    officialTerm: "vrijstelling",
    originalLanguage: dutch,
    englishGloss: "statutory exemption mechanism",
    explanation:
      "A distinct exemption mechanism named in the WVW framework whose availability, scope and granting authority depend on the applicable provision.",
    whyItMatters:
      "Vrijstelling must not be used as a literal substitute for ontheffing or vergunning; the Dutch statute treats the mechanisms separately.",
    termStatus: "official-usage",
    scope: "WVW 1994 Chapter VII and provision-specific uses",
    sources: [{ sourceId: "nl-wvw", provision: "Chapter VII, including Articles 146–149" }],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetTermId: "nl-ontheffing",
        explanation:
          "Both concern departures from ordinary requirements, but they are separately named legal mechanisms.",
      },
    ],
  },
  "nl-operationeel-domein": {
    id: "nl-operationeel-domein",
    conceptId: "operating-domain-information",
    jurisdiction: "netherlands",
    officialTerm: "Operationeel Domein",
    originalLanguage: dutch,
    englishGloss: "operational domain information used in the permit assessment",
    explanation:
      "The experimental application must address environmental risk and the route of the Operationeel Domein alongside the proposed operating setup.",
    whyItMatters:
      "The term has legal relevance within the application package, but it is not automatically identical to a technical ODD or a free-standing authorization to use the road.",
    termStatus: "official-usage",
    scope: "Experimental permit application under the 2019 ministerial regulation",
    sources: [
      { sourceId: "nl-experiment-regulation", provision: "Article 1(2)(c), Article 4(1)(d)" },
    ],
    relationships: [
      {
        type: "related-but-not-equivalent",
        targetConceptId: "technical-operating-domain",
        explanation:
          "The regulation uses Operationeel Domein in its own application context; Atlas does not treat it as a literal synonym for ODD.",
      },
      {
        type: "applies-to-testing-only",
        targetConceptId: "operating-domain-information",
        explanation:
          "This term record concerns the experimental vergunning framework.",
      },
    ],
  },
  "nl-typegoedkeuring": {
    id: "nl-typegoedkeuring",
    conceptId: "type-approval",
    jurisdiction: "netherlands",
    officialTerm: "typegoedkeuring",
    originalLanguage: dutch,
    englishGloss: "type approval",
    explanation:
      "The Dutch official-language term used in the EU vehicle and ADS type-approval framework.",
    whyItMatters:
      "Typegoedkeuring is product-level approval and does not itself grant the Article 149aa vergunning or unrestricted Dutch public-road operation.",
    termStatus: "official-usage",
    scope: "EU ADS type approval under Regulation (EU) 2022/1426",
    sources: [
      {
        sourceId: "eu-2022-1426",
        provision: "Article 1 and annexes",
        officialLanguageUrl:
          "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:02022R1426-20260324",
      },
    ],
    relationships: [
      {
        type: "official-language-version",
        targetTermId: "de-typgenehmigung",
        explanation:
          "Typegoedkeuring and Typgenehmigung are official Dutch and German language versions of the EU type-approval concept, not national road-use permissions.",
      },
      {
        type: "related-but-not-equivalent",
        targetTermId: "nl-vergunning",
        explanation:
          "Product approval and permission for the Dutch public-road experiment answer separate regulatory questions.",
      },
    ],
  },
};

export function getUniversalAtlasConcept(conceptId: UniversalAtlasConceptId) {
  return UNIVERSAL_ATLAS_CONCEPTS[conceptId];
}

export function getJurisdictionTerm(termId: JurisdictionTermId) {
  return JURISDICTION_TERMS[termId];
}

export function getJurisdictionTerms(termIds: JurisdictionTermId[]) {
  return termIds.map(getJurisdictionTerm);
}

export function getTermsForConcept(
  conceptId: UniversalAtlasConceptId,
  jurisdiction?: JurisdictionTerm["jurisdiction"],
) {
  return Object.values(JURISDICTION_TERMS).filter(
    (term) =>
      term.conceptId === conceptId &&
      (jurisdiction === undefined || term.jurisdiction === jurisdiction),
  );
}
