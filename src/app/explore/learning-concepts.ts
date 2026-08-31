export type LearningConceptId =
  | "odd"
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
};

export type LearningConcept = LearningNote & {
  id: LearningConceptId;
  name: string;
  deeperHref?: string;
  jurisdictionContext?: Partial<Record<"netherlands" | "germany", string>>;
};

export const LEARNING_CONCEPTS: Record<LearningConceptId, LearningConcept> = {
  odd: {
    id: "odd",
    name: "Operational Design Domain (ODD)",
    plain:
      "An ODD describes the conditions an automated driving system is designed to handle, such as road type, geography, weather, lighting, traffic and speed range.",
    why:
      "The ODD bounds the situations in which ADS behavior and safety performance need to be specified, evaluated and monitored.",
    confusion:
      "An ODD is a technical design domain, not automatically a legal operating permit or the same boundary as an authorized service area.",
    deeperHref: "/explore/system-map",
    jurisdictionContext: {
      netherlands:
        "Operational Domain information forms part of the Dutch experimental permit assessment.",
      germany:
        "The ADS technical ODD must not be conflated with the legally approved defined operating area (Betriebsbereich).",
    },
  },
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
        "EU 2022/1426 approval is expressly recognized, but operating-area approval and registration remain separate gates.",
    },
  },
  "technical-supervisor": {
    id: "technical-supervisor",
    name: "Technical Supervisor",
    plain:
      "The vehicle drives itself; the Technical Supervisor performs the defined supervisory and fallback functions created by German autonomous-driving law.",
    why:
      "German law assigns this person specific duties, including evaluating proposed manoeuvres and deactivating the autonomous function where required.",
    confusion:
      "A Technical Supervisor is not a remote driver and does not continuously perform or monitor the driving task in ordinary operation.",
    jurisdictionContext: {
      germany:
        "The role is defined in StVG § 1d and subject to qualification requirements in AFGBV § 14.",
    },
  },
  "iso-26262": {
    id: "iso-26262",
    name: "ISO 26262",
    plain:
      "ISO 26262 is a functional-safety standard for automotive electrical and electronic systems.",
    why:
      "It gives teams a structured way to identify malfunction-related hazards and determine how rigorous the safety process needs to be.",
    confusion:
      "Functional Safety is not the same as SOTIF: ISO 26262 focuses on malfunctioning behaviour.",
    deeperHref: "/explore/system-map",
    jurisdictionContext: {
      netherlands:
        "The experimental application regulation references specified processes while allowing a demonstrably equivalent method.",
      germany:
        "AFGBV uses ISO 26262 within particular state-of-the-art and documentation constructions rather than as a universal standalone command.",
    },
  },
  "driver-outside-vehicle": {
    id: "driver-outside-vehicle",
    name: "Driver outside the vehicle",
    plain:
      "Dutch experimental law allows the legally relevant human driver to be physically outside the vehicle.",
    why:
      "The permit framework can support advanced remote arrangements while retaining the existing legal role of a human driver.",
    confusion:
      "Outside the vehicle does not mean that the experiment has no driver.",
    jurisdictionContext: {
      netherlands:
        "Legislative history explains that the driver must retain control and be able to intervene immediately.",
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
  },
  betriebsbereich: {
    id: "betriebsbereich",
    name: "Defined operating area (Betriebsbereich)",
    plain:
      "The geographically and spatially defined part of public road space in which German autonomous operation has been legally approved.",
    why:
      "The competent authority assesses whether the vehicle can operate there and whether the infrastructure, traffic, safety and public-interest conditions are satisfied.",
    confusion:
      "A legally approved Betriebsbereich is not the same thing as the ADS technical ODD.",
    jurisdictionContext: {
      germany:
        "The holder proposes the area and the competent authority approves it under StVG and AFGBV.",
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
      "The minimum-risk condition is a system response, not an instruction for the Technical Supervisor to take over continuous remote driving.",
  },
  "holder-obligations": {
    id: "holder-obligations",
    name: "Holder obligations",
    plain:
      "German autonomous-driving law regulates the organization responsible for operating and maintaining the vehicle, not only its manufacturer.",
    why:
      "The holder must support maintenance, checks, qualified personnel, Technical Supervisor functions and the required facilities and systems.",
    confusion:
      "A vehicle approval does not discharge the operating organization from its continuing legal duties.",
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
  },
};

export function getLearningNote(
  conceptId: LearningConceptId,
  jurisdiction?: "netherlands" | "germany",
): LearningNote {
  const concept = LEARNING_CONCEPTS[conceptId];
  const context = jurisdiction
    ? concept.jurisdictionContext?.[jurisdiction]
    : undefined;

  return {
    plain: concept.plain,
    why: context ? `${concept.why} ${context}` : concept.why,
    confusion: concept.confusion,
  };
}
