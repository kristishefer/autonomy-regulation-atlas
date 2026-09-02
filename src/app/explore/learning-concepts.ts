import {
  getJurisdictionTerms,
  type JurisdictionTerm,
  type JurisdictionTermId,
} from "@/app/explore/regulatory-terminology";
import {
  getKnowledgeConcept,
  getKnowledgeStandard,
  type KnowledgeConceptId,
} from "@/app/explore/learning-data";
import type { JurisdictionSlug } from "@/app/explore/regulatory-data";

export type LearningConceptId =
  | "odd"
  | "safety-assurance"
  | "functional-safety"
  | "sotif"
  | "scenario-based-assessment"
  | "safety-case-evidence"
  | "type-approval"
  | "technical-supervisor"
  | "iso-26262"
  | "driver-outside-vehicle"
  | "targeted-exemptions"
  | "rvv-1990"
  | "experimental-permit"
  | "betriebsbereich"
  | "minimum-risk-condition"
  | "holder-obligations"
  | "testing-vs-deployment";

export type LearningNote = {
  plain: string;
  why: string;
  confusion: string;
  terminology?: JurisdictionTerm[];
  deeperHref?: string;
  regulationHref?: string;
};

export type LearningConcept = LearningNote & {
  id: LearningConceptId;
  name: string;
  deeperHref?: string;
  jurisdictionContext?: Partial<Record<JurisdictionSlug, string>>;
  jurisdictionTerminology?: Partial<
    Record<JurisdictionSlug, JurisdictionTermId[]>
  >;
};

function projectKnowledgeConcept(id: KnowledgeConceptId): LearningConcept {
  const concept = getKnowledgeConcept(id);
  return {
    id,
    name: concept.title,
    plain: concept.plainEnglish,
    why: concept.whyItMatters.join(" "),
    confusion: concept.commonConfusions[0].body,
    deeperHref: `/learn/safety-standards/${concept.slug}`,
  };
}

export const LEARNING_CONCEPTS: Record<LearningConceptId, LearningConcept> = {
  odd: {
    ...projectKnowledgeConcept("odd"),
    jurisdictionContext: {
      netherlands:
        "Operationeel Domein information forms part of the Dutch experimental vergunning assessment, but the source term is not treated as a literal synonym for ODD.",
      germany:
        "The ADS technical ODD must not be conflated with the legally approved defined operating area (Betriebsbereich).",
      "united-states":
        "California permit and passenger-service records can make an ODD legally relevant to a specific authorization, but that does not create one nationwide operating-domain rule.",
      russia:
        "The technical среда штатной эксплуатации and the legally bounded зона эксплуатации perform related but non-equivalent functions within the EPR.",
      "united-kingdom":
        "The current Great Britain pilot assesses operating conditions and routes; Atlas does not turn those conditions into a single statutory ODD synonym.",
    },
    jurisdictionTerminology: {
      netherlands: ["nl-operationeel-domein"],
      germany: ["de-betriebsbereich", "de-betriebsbereich-genehmigung"],
      russia: ["ru-ordinary-environment", "ru-operating-zone"],
    },
  },
  "safety-assurance": {
    ...projectKnowledgeConcept("safety-assurance"),
    jurisdictionContext: {
      "united-states":
        "California uses safety-case documentation within its permit framework; it is not a nationwide certificate or a substitute for operational permission.",
      russia:
        "The EPR admission package uses a декларация о безопасности alongside a distinct conformity conclusion.",
      "united-kingdom":
        "The Statement of Safety Principles belongs to staged AV Act implementation; the September 2026 text remains a consultation draft rather than current binding criteria.",
    },
    jurisdictionTerminology: {
      "united-states": ["us-ca-safety-case"],
      russia: ["ru-safety-declaration", "ru-conformity-conclusion"],
      "united-kingdom": ["uk-sosp"],
    },
  },
  "functional-safety": projectKnowledgeConcept("functional-safety"),
  sotif: projectKnowledgeConcept("sotif"),
  "scenario-based-assessment": projectKnowledgeConcept(
    "scenario-based-assessment",
  ),
  "safety-case-evidence": projectKnowledgeConcept("safety-case-evidence"),
  "type-approval": {
    id: "type-approval",
    name: "Type approval",
    plain:
      "Type approval determines whether the relevant vehicle, system or type satisfies an applicable technical approval regime.",
    why:
      "It is an important product-level gate, but public-road operation also depends on the law of the operating jurisdiction.",
    confusion:
      "Type approval is not, by itself, permission to operate in every place or under every operating model.",
    deeperHref: "/explore/system-map",
    jurisdictionContext: {
      netherlands:
        "EU ADS approval and Dutch public-road authorization answer separate regulatory questions.",
      germany:
        "EU 2022/1426 Typgenehmigung is expressly recognized, while Betriebserlaubnis, approval of the Betriebsbereich and Zulassung remain distinct gates where applicable.",
      "united-states":
        "Federal FMVSS self-certification and temporary exemption mechanisms are not EU-style type approval and do not grant California road-use permission.",
      russia:
        "The EPR uses a conformity conclusion and programme-specific admission steps; Atlas does not relabel that route as EU type approval.",
      "united-kingdom":
        "Current vehicle approval, the VSO pilot route and official listing answer different questions; future AV Act authorization is shown separately.",
    },
    jurisdictionTerminology: {
      netherlands: ["nl-typegoedkeuring", "nl-vergunning"],
      germany: [
        "de-betriebserlaubnis",
        "de-typgenehmigung",
        "de-betriebsbereich-genehmigung",
        "de-zulassung",
      ],
      "united-states": [
        "us-fmvss",
        "us-self-certification",
        "us-temporary-exemption",
        "us-ca-deployment-permit",
      ],
      russia: ["ru-conformity-conclusion"],
      "united-kingdom": [
        "uk-vso",
        "uk-vehicle-listing",
        "uk-self-driving-test",
      ],
    },
  },
  "technical-supervisor": {
    id: "technical-supervisor",
    name: "Technical supervision role",
    plain:
      "The vehicle drives itself; German law assigns defined supervisory and fallback functions to the Technische Aufsicht.",
    why:
      "German law assigns this person specific duties, including evaluating proposed manoeuvres and deactivating the autonomous function where required.",
    confusion:
      "The Technische Aufsicht is not a generic remote operator or remote driver and does not continuously perform or monitor the driving task in ordinary operation.",
    jurisdictionContext: {
      germany:
        "The role is defined in StVG § 1d and subject to qualification requirements in AFGBV § 14.",
    },
    jurisdictionTerminology: {
      germany: ["de-technische-aufsicht", "de-fahrzeugfuehrer"],
    },
  },
  "iso-26262": {
    id: "iso-26262",
    name: "ISO 26262",
    plain: getKnowledgeStandard("std-iso-26262").scope,
    why: getKnowledgeStandard("std-iso-26262").avRelevance,
    confusion: getKnowledgeStandard("std-iso-26262").whatItDoesNotDo[0],
    deeperHref: "/learn/safety-standards/functional-safety",
    jurisdictionContext: {
      netherlands:
        "The experimental application regulation references specified processes while allowing a demonstrably equivalent method.",
      germany:
        "AFGBV uses ISO 26262 within particular state-of-the-art and documentation constructions rather than as a universal standalone command.",
    },
  },
  "driver-outside-vehicle": {
    id: "driver-outside-vehicle",
    name: "Out-of-vehicle driver role",
    plain:
      "Dutch experimental law allows the legally relevant bestuurder to be physically outside the vehicle.",
    why:
      "The permit framework can support advanced remote arrangements while retaining the existing legal role of a human driver.",
    confusion:
      "Outside the vehicle does not mean that the experiment has no driver.",
    jurisdictionContext: {
      netherlands:
        "Legislative history explains that the driver must retain control and be able to intervene immediately.",
    },
    jurisdictionTerminology: {
      netherlands: ["nl-bestuurder", "nl-bestuurder-buiten-motorrijtuig"],
    },
  },
  "targeted-exemptions": {
    id: "targeted-exemptions",
    name: "Targeted exemptions",
    plain:
      "A permit may disapply particular conventional requirements where the statute allows it and the experiment requires it.",
    why:
      "This lets an authorization adapt ordinary traffic law around a defined experiment without replacing the whole road-traffic framework.",
    confusion:
      "An experimental permit does not automatically switch off the entire WVW or RVV; WVW Articles 5 and 6 remain outside the Article 149aa exemption power.",
    jurisdictionTerminology: {
      netherlands: ["nl-vergunning", "nl-ontheffing", "nl-vrijstelling"],
    },
  },
  "rvv-1990": {
    id: "rvv-1990",
    name: "RVV 1990",
    plain:
      "The RVV 1990 is the principal detailed Dutch road-traffic-rules framework alongside the Wegenverkeerswet 1994.",
    why:
      "Automated-driving experiments begin from the ordinary traffic rules, with only legally available, experiment-specific adjustments.",
    confusion:
      "The presence of an ADS does not automatically disapply ordinary Dutch traffic rules.",
    jurisdictionTerminology: {
      netherlands: ["nl-ontheffing", "nl-vrijstelling"],
    },
  },
  "experimental-permit": {
    id: "experimental-permit",
    name: "Experimental permit",
    plain:
      "A time- and scope-limited authorization for a defined public-road experiment, operating setup and evidence package.",
    why:
      "The Dutch route assesses the experiment, including its route, timing, driver arrangements, safety evidence, insurance and monitoring.",
    confusion:
      "Testing authorization is not a general deployment authorization.",
    jurisdictionTerminology: {
      netherlands: ["nl-vergunning", "nl-ontheffing"],
    },
  },
  betriebsbereich: {
    id: "betriebsbereich",
    name: "Legally authorized operating area",
    plain:
      "The geographically and spatially defined part of public road space in which German autonomous operation has been legally approved.",
    why:
      "The competent authority assesses whether the vehicle can operate there and whether the infrastructure, traffic, safety and public-interest conditions are satisfied.",
    confusion:
      "A legally approved Betriebsbereich is not the same thing as the ADS technical ODD.",
    jurisdictionContext: {
      germany:
        "The Halter proposes the area and the competent authority grants the Genehmigung des festgelegten Betriebsbereichs under StVG and AFGBV.",
    },
    jurisdictionTerminology: {
      germany: ["de-betriebsbereich", "de-betriebsbereich-genehmigung"],
    },
  },
  "minimum-risk-condition": {
    id: "minimum-risk-condition",
    name: "Minimum-risk condition",
    plain:
      "A condition in which the autonomous vehicle brings itself to a stop at the safest available place and activates its hazard warning lights.",
    why:
      "German law requires the ADS to enter this condition when it reaches system limits or lawful continuation is not possible.",
    confusion:
      "The minimum-risk condition is a system response, not an instruction for the Technische Aufsicht to take over continuous remote driving.",
  },
  "holder-obligations": {
    id: "holder-obligations",
    name: "Responsible vehicle-keeper duties",
    plain:
      "German autonomous-driving law regulates the organization responsible for operating and maintaining the vehicle, not only its manufacturer.",
    why:
      "The Halter must support maintenance, checks, qualified personnel, Technische Aufsicht functions and the required facilities and systems.",
    confusion:
      "A vehicle approval does not discharge the operating organization from its continuing legal duties.",
    jurisdictionTerminology: {
      germany: ["de-halter", "de-technische-aufsicht"],
    },
  },
  "testing-vs-deployment": {
    id: "testing-vs-deployment",
    name: "Testing versus deployment",
    plain:
      "Testing authorization supports development or evaluation; an operational regime authorizes ordinary use within its statutory conditions.",
    why:
      "The evidence, monitoring, personnel and authorization route can differ materially between a test and an operational service.",
    confusion:
      "Permission to test is not proof that ordinary operational deployment is authorized.",
    jurisdictionTerminology: {
      germany: ["de-fahrzeugfuehrer", "de-technische-aufsicht"],
    },
  },
};

export function getLearningNote(
  conceptId: LearningConceptId,
  jurisdiction?: JurisdictionSlug,
): LearningNote {
  const concept = LEARNING_CONCEPTS[conceptId];
  const context = jurisdiction
    ? concept.jurisdictionContext?.[jurisdiction]
    : undefined;
  const terminologyIds = jurisdiction
    ? concept.jurisdictionTerminology?.[jurisdiction]
    : undefined;

  return {
    plain: concept.plain,
    why: context ? `${concept.why} ${context}` : concept.why,
    confusion: concept.confusion,
    deeperHref: concept.deeperHref,
    regulationHref: concept.regulationHref,
    terminology: terminologyIds
      ? getJurisdictionTerms(terminologyIds)
      : undefined,
  };
}
