import type { SourceId } from "@/app/explore/regulatory-data";

export type DeploymentRealityJurisdiction = "netherlands" | "germany";

export type DeploymentRealityStatus =
  | "commercial-operation"
  | "passenger-trial"
  | "vehicle-testing"
  | "announced-preparing"
  | "closed-historical";

export type HumanOnboardStatus =
  | "none"
  | "safety-driver"
  | "operator"
  | "unknown";

export type RemoteHumanRole =
  | "technical-supervisor"
  | "remote-driver"
  | "monitoring-only"
  | "none-unknown";

export type DeploymentRealitySource = {
  title: string;
  authority: string;
  url: string;
  sourceType:
    | "binding_law"
    | "regulator_decision"
    | "official_authority_statement"
    | "public_project_statement"
    | "operator_statement"
    | "company_announcement";
  sourceDate: string | null;
  claimSupported: string[];
  authorityFinding?: string;
  legalStatus?: "in_force" | "proposed" | "draft" | "adopted_not_yet_effective";
  asOf: "2026-09-03";
};

export type DeploymentRealityEntry = {
  id: string;
  jurisdiction: DeploymentRealityJurisdiction;
  project: string;
  operator: string;
  location: string;
  vehicleService: string;
  status: DeploymentRealityStatus;
  statusDetail: string;
  passengerAccess: string;
  roadEnvironment: string;
  humanOnboard: HumanOnboardStatus;
  humanOnboardDetail: string;
  remoteHumanRole: RemoteHumanRole;
  remoteHumanDetail: string;
  legalRoute: string;
  relevantAuthority: string;
  whyItMatters: string;
  atlasAnalysis: string;
  uncertaintyNote?: string;
  lastVerified: "2026-09-01";
  asOf: "2026-09-03";
  nextReviewAt: "2026-10-01";
  stale: boolean;
  legalSourceIds?: SourceId[];
  sources: DeploymentRealitySource[];
};

export const DEPLOYMENT_STATUS_LABELS: Record<
  DeploymentRealityStatus,
  string
> = {
  "commercial-operation": "Commercial operation",
  "passenger-trial": "Passenger pilot / trial",
  "vehicle-testing": "Vehicle testing",
  "announced-preparing": "Announced / preparing",
  "closed-historical": "Closed / historical",
};

export const HUMAN_ONBOARD_LABELS: Record<HumanOnboardStatus, string> = {
  none: "None",
  "safety-driver": "Safety driver",
  operator: "Operator",
  unknown: "Unknown",
};

export const REMOTE_HUMAN_LABELS: Record<RemoteHumanRole, string> = {
  "technical-supervisor": "Technical Supervisor",
  "remote-driver": "Remote driver",
  "monitoring-only": "Monitoring only",
  "none-unknown": "None / unknown",
};

type RawDeploymentRealityEntry = Omit<
  DeploymentRealityEntry,
  "asOf" | "nextReviewAt" | "stale" | "atlasAnalysis" | "sources"
> & {
  sources: Omit<
    DeploymentRealitySource,
    | "sourceType"
    | "sourceDate"
    | "claimSupported"
    | "authorityFinding"
    | "legalStatus"
    | "asOf"
  >[];
};

const RAW_DEPLOYMENT_REALITY: Record<
  DeploymentRealityJurisdiction,
  RawDeploymentRealityEntry[]
> = {
  netherlands: [
    {
      id: "nl-rotterdam-airport-shuttle",
      jurisdiction: "netherlands",
      project: "Shuttle Rotterdam The Hague Airport",
      operator: "RET / Dutch Automated Mobility",
      location: "Meijersplein metro station ↔ Rotterdam The Hague Airport",
      vehicleService: "ADASTEC-equipped Karsan e-ATAK passenger shuttle",
      status: "passenger-trial",
      statusDetail:
        "Passengers are carried on a scheduled public-road shuttle route during the pilot.",
      passengerAccess: "Public passengers on the airport shuttle",
      roadEnvironment: "Public roads",
      humanOnboard: "safety-driver",
      humanOnboardDetail:
        "A qualified safety driver is always onboard and can intervene.",
      remoteHumanRole: "none-unknown",
      remoteHumanDetail:
        "No separate remote driving or supervisory role was identified in the official sources reviewed.",
      legalRoute:
        "RDW temporary national individual approval under the Prototyperegeling, subject to defined areas and conditions.",
      relevantAuthority: "RDW",
      whyItMatters:
        "Automated passenger operation does not necessarily mean no-driver deployment. This vehicle reaches public roads through a prototype approval route while retaining an onboard safety driver.",
      lastVerified: "2026-09-01",
      sources: [
        {
          title: "How the self-driving bus works — and how RDW tested it",
          authority: "RDW",
          url: "https://www.rdw.nl/over-rdw/campagnes/veilige-voertuigen/zelfrijdende-bus",
        },
        {
          title: "RDW grants approval to first self-driving bus on Dutch public roads",
          authority: "RDW",
          url: "https://www.rdw.nl/nieuws/2025/rdw-verleent-goedkeuring-aan-eerste-zelfrijdende-bus",
        },
        {
          title: "Autonomous e-ATAK passenger service at Rotterdam Airport",
          authority: "Karsan",
          url: "https://www.karsan.com/es/prensa/noticias-actuales/karsan-launches-autonomous-passenger-services-at-rotterdam-airport-with-autonomous-e-atak",
        },
      ],
    },
    {
      id: "nl-efteling-line-7",
      jurisdiction: "netherlands",
      project: "Efteling / Arriva Line 7",
      operator: "Arriva / Dutch Automated Mobility",
      location:
        "Efteling Europalaan stop ↔ accommodation locations around the park",
      vehicleService: "Automated Arriva city-bus shuttle",
      status: "passenger-trial",
      statusDetail:
        "An eight-week free passenger trial began on 12 August 2026.",
      passengerAccess: "Efteling visitors at published operating times",
      roadEnvironment: "Part public roads / part private park property",
      humanOnboard: "safety-driver",
      humanOnboardDetail:
        "An Arriva safety driver is at the wheel; a second person monitors vehicle data.",
      remoteHumanRole: "none-unknown",
      remoteHumanDetail:
        "No remote human role was identified in the official sources reviewed.",
      legalRoute:
        "RDW tested and approved the vehicle for the specified route; the precise approval instrument is not named in the official sources reviewed.",
      relevantAuthority: "RDW; Province of North Brabant and local partners",
      whyItMatters:
        "A passenger-facing service can still be a time-limited trial with an onboard driver and a route-specific approval rather than general driverless deployment.",
      uncertaintyNote:
        "Official project and provincial sources confirm RDW route approval, but do not identify whether it uses the same Prototyperegeling instrument as the Rotterdam shuttle.",
      lastVerified: "2026-09-01",
      sources: [
        {
          title: "Self-driving bus makes Efteling accommodation locations easier to reach",
          authority: "Efteling",
          url: "https://www.efteling.com/en/blog/nieuws/self-driving-bus-makes-it-easier-to-reach-the-efteling-accommodation-locations",
        },
        {
          title: "First self-driving bus in Brabant starts at Efteling",
          authority: "Province of North Brabant",
          url: "https://www.brabant.nl/actueel/nieuws/eerste-zelfrijdende-bus-brabant-efteling/",
        },
      ],
    },
    {
      id: "nl-schiphol-klm-2026",
      jurisdiction: "netherlands",
      project: "Schiphol / KLM autonomous transport",
      operator: "Royal Schiphol Group / KLM",
      location: "Schiphol-Oost airport site",
      vehicleService: "Self-driving employee shuttle on a predetermined route",
      status: "closed-historical",
      statusDetail:
        "The January–July 2026 pilot is complete; further airport deployment work is planned.",
      passengerAccess: "Schiphol and KLM employees during the pilot",
      roadEnvironment: "Controlled / airport environment",
      humanOnboard: "none",
      humanOnboardDetail:
        "The pilot moved from an onboard safety operator to a final phase with no safety operator onboard.",
      remoteHumanRole: "monitoring-only",
      remoteHumanDetail:
        "A safety operator continuously monitored the bus from a control room and could support intervention when needed.",
      legalRoute:
        "Controlled airport-site pilot; it is not presented as authorization for Dutch public-road driverless deployment.",
      relevantAuthority: "Royal Schiphol Group airport operations",
      whyItMatters:
        "A no-onboard-operator milestone in a controlled airport environment does not establish a public-road driverless deployment route.",
      lastVerified: "2026-09-01",
      sources: [
        {
          title: "Towards autonomous transport at Schiphol",
          authority: "Royal Schiphol Group",
          url: "https://www.schiphol.nl/en/innovation/blog/towards-autonomous-transport-at-schiphol/",
        },
      ],
    },
  ],
  germany: [
    {
      id: "de-kira",
      jurisdiction: "germany",
      project: "KIRA",
      operator: "DB Regio Bus Mitte / RMV",
      location: "Darmstadt, Langen, Egelsbach and the western Offenbach district",
      vehicleService: "Level-4 on-demand shuttles with Mobileye driving technology",
      status: "passenger-trial",
      statusDetail:
        "Registered test users can book free on-demand passenger rides; the operating area and hours expanded in 2026.",
      passengerAccess: "Registered test users",
      roadEnvironment: "Public roads within the approved test network",
      humanOnboard: "safety-driver",
      humanOnboardDetail:
        "A safety driver remains onboard throughout the testing operation.",
      remoteHumanRole: "technical-supervisor",
      remoteHumanDetail:
        "Technical supervisory staff monitor vehicle manoeuvres from a control centre.",
      legalRoute:
        "KBA Level-4 testing authorization under § 16 AFGBV, not the regular operating-area approval route.",
      relevantAuthority: "Kraftfahrt-Bundesamt (KBA)",
      whyItMatters:
        "Germany has a regular statutory autonomous-operation framework, yet this live Level-4 passenger project still uses the separate testing pathway.",
      lastVerified: "2026-09-01",
      legalSourceIds: ["de-afgbv"],
      sources: [
        {
          title: "Autonomous KIRA shuttles extend hours and add locations",
          authority: "Rhein-Main-Verkehrsverbund",
          url: "https://www.rmv.de/c/de/ueber-uns/presse/aktuelle-pressemitteilungen/31032026-autonome-kira-shuttles-fahren-laenger-und-bedienen-neue-orte",
        },
        {
          title: "KIRA autonomous Level-4 public-transport project",
          authority: "KIRA project partners",
          url: "https://kira-autonom.de/",
        },
      ],
    },
    {
      id: "de-moia-alike",
      jurisdiction: "germany",
      project: "MOIA / ALIKE",
      operator: "MOIA",
      location: "Central Hamburg ALIKE operating area",
      vehicleService: "Self-driving Volkswagen ID. Buzz on-demand ridepooling",
      status: "passenger-trial",
      statusDetail:
        "Selected pre-registered Hamburg residents have been able to book rides since 15 July 2026.",
      passengerAccess: "Selected registered test users",
      roadEnvironment: "Public roads in the 37 km² ALIKE test area",
      humanOnboard: "safety-driver",
      humanOnboardDetail:
        "A trained safety driver monitors every trip and can take control.",
      remoteHumanRole: "monitoring-only",
      remoteHumanDetail:
        "MOIA describes fleet-control-centre monitoring and passenger support; a separate Technical Supervisor role is not identified in the sources reviewed.",
      legalRoute:
        "Passenger testing under an AFGBV § 16 testing authorization within the ALIKE project.",
      relevantAuthority: "KBA; Hamburg Authority for Transport and Mobility Transition",
      whyItMatters:
        "Passenger booking through a familiar mobility app does not make this commercial driverless service: it remains a closed-user test with an onboard safety driver.",
      lastVerified: "2026-09-01",
      legalSourceIds: ["de-afgbv"],
      sources: [
        {
          title: "MOIA launches passenger test operation in Hamburg",
          authority: "MOIA",
          url: "https://www.moia.io/en/news/moia-launches-passenger-test-operation-in-hamburg",
        },
        {
          title: "Hamburg parliamentary response 23/1072 — autonomous driving timetable and approvals",
          authority: "Hamburg Parliament / Senate",
          url: "https://www.buergerschaft-hh.de/parldok/dokument/93459/23_01072_autonomes_fahren_in_hamburg_zeitplan_realisierbarkeit_und_rolle_von_moia",
        },
        {
          title: "MOIA autonomous test-phase technology and human oversight",
          authority: "MOIA",
          url: "https://www.moia.io/en/passengers/autonomous/technology",
        },
      ],
    },
    {
      id: "de-holon-alike",
      jurisdiction: "germany",
      project: "HOLON / HOCHBAHN / ALIKE",
      operator: "Hamburger Hochbahn",
      location: "Central Hamburg ALIKE operating area",
      vehicleService: "HOLON urban autonomous accessible shuttle",
      status: "vehicle-testing",
      statusDetail:
        "The vehicle is regularly testing on Hamburg public roads; passenger operation was not confirmed as started in the latest official material reviewed.",
      passengerAccess: "Not yet confirmed; a closed passenger group was planned for 2026",
      roadEnvironment: "Public-road vehicle testing",
      humanOnboard: "safety-driver",
      humanOnboardDetail:
        "A safety driver monitors the autonomous driving task; development engineers may accompany testing.",
      remoteHumanRole: "none-unknown",
      remoteHumanDetail:
        "A distinct remote human role was not identified for the current vehicle-testing phase.",
      legalRoute:
        "KBA testing authorization under § 16 AFGBV, valid through the end of 2026 with an extension option.",
      relevantAuthority: "Kraftfahrt-Bundesamt (KBA)",
      whyItMatters:
        "An issued Level-4 testing authorization and visible road testing do not by themselves establish that passenger testing or regular operation has begun.",
      uncertaintyNote:
        "HOCHBAHN confirms regular road testing and continued plans for passenger use, but the official sources reviewed do not confirm a passenger-service start date.",
      lastVerified: "2026-09-01",
      legalSourceIds: ["de-afgbv"],
      sources: [
        {
          title: "HOLON and HOCHBAHN receive autonomous-driving test authorization",
          authority: "Hamburger Hochbahn",
          url: "https://www.hochbahn.de/de/presse/pressemitteilungen/meilenstein-holon-und-hochbahn-erhalten-genehmigung-fuer-autonomes-fahren-111518",
        },
        {
          title: "HOCHBAHN investment update — autonomous shuttles in regular testing",
          authority: "Hamburger Hochbahn",
          url: "https://www.hochbahn.de/de/presse/pressemitteilungen/stabil-auf-rekordniveau-hochbahn-verfolgt-groesste-investitionsoffensive-der-unternehmensgeschichte-119088",
        },
      ],
    },
    {
      id: "de-waymo-munich",
      jurisdiction: "germany",
      project: "Waymo Munich",
      operator: "Waymo",
      location: "Munich",
      vehicleService: "Planned fully autonomous ride-hailing service",
      status: "announced-preparing",
      statusDetail:
        "Manual mapping and later validation with trained specialists were announced; public commercial service is targeted for late 2027.",
      passengerAccess: "None — commercial rides are not currently offered",
      roadEnvironment: "Public-road mapping and planned validation testing",
      humanOnboard: "safety-driver",
      humanOnboardDetail:
        "The announced sequence starts with manual driving, followed by autonomous validation with a trained specialist behind the wheel.",
      remoteHumanRole: "none-unknown",
      remoteHumanDetail:
        "No remote operational role for the Munich preparation phase has been published.",
      legalRoute:
        "Required German approvals are still being pursued; announced testing is to follow KBA guidance and applicable StVG/AFGBV requirements.",
      relevantAuthority: "KBA; relevant Bavarian operating-area authority for any future regular route",
      whyItMatters:
        "Announced mapping, testing and a future service target are not current legal deployment or commercial operation.",
      lastVerified: "2026-09-01",
      legalSourceIds: ["de-stvg", "de-afgbv"],
      sources: [
        {
          title: "Waymo is coming to Germany",
          authority: "Waymo",
          url: "https://waymo.com/blog/2026/08/waymo-in-munich/",
        },
        {
          title: "Waymo in Munich — current preparation and testing FAQ",
          authority: "Waymo",
          url: "https://waymo.com/waymo-in-germany/",
        },
        {
          title: "Waymo test-driving announcement for Munich",
          authority: "Bavarian Ministry of Economic Affairs",
          url: "https://www.stmwi.bayern.de/presse/pressemeldungen/385-2026/",
        },
      ],
    },
  ],
};

type EvidenceProvenance = Omit<
  DeploymentRealitySource,
  "title" | "authority" | "url" | "asOf"
>;

const SOURCE_PROVENANCE: Record<string, EvidenceProvenance> = {
  "https://www.rdw.nl/over-rdw/campagnes/veilige-voertuigen/zelfrijdende-bus": {
    sourceType: "official_authority_statement",
    sourceDate: null,
    claimSupported: [
      "RDW testing and temporary national approval under the Prototyperegeling",
      "Public-road route and continuing onboard safety-driver condition",
    ],
    authorityFinding:
      "RDW states that the bus received temporary national approval subject to conditions; the page is an authority explanation, not the approval instrument itself.",
  },
  "https://www.rdw.nl/nieuws/2025/rdw-verleent-goedkeuring-aan-eerste-zelfrijdende-bus": {
    sourceType: "official_authority_statement",
    sourceDate: "2025-07-11",
    claimSupported: [
      "Temporary national individual approval under the Prototyperegeling",
      "Defined-area operation with a qualified onboard safety driver",
    ],
    authorityFinding:
      "RDW reports its own approval decision and its stated operating conditions; Atlas does not treat the news release as a generally available deployment route.",
  },
  "https://www.karsan.com/es/prensa/noticias-actuales/karsan-launches-autonomous-passenger-services-at-rotterdam-airport-with-autonomous-e-atak": {
    sourceType: "company_announcement",
    sourceDate: "2025-07-11",
    claimSupported: [
      "Vehicle identity and announced passenger-service launch",
      "Route between Meijersplein and Rotterdam The Hague Airport",
    ],
  },
  "https://www.efteling.com/en/blog/nieuws/self-driving-bus-makes-it-easier-to-reach-the-efteling-accommodation-locations": {
    sourceType: "operator_statement",
    sourceDate: "2026-08-12",
    claimSupported: [
      "Eight-week free passenger trial and published operating arrangement",
      "Onboard Arriva safety driver and separate onboard data monitor",
      "RDW route approval without identification of the precise approval instrument",
    ],
  },
  "https://www.brabant.nl/actueel/nieuws/eerste-zelfrijdende-bus-brabant-efteling/": {
    sourceType: "public_project_statement",
    sourceDate: "2026-08-07",
    claimSupported: [
      "Mixed public-road and private-site route",
      "Passenger-trial timing, onboard safety driver and RDW route approval",
    ],
    authorityFinding:
      "The provincial statement confirms route approval but does not identify the legal approval instrument.",
  },
  "https://www.schiphol.nl/en/innovation/blog/towards-autonomous-transport-at-schiphol/": {
    sourceType: "public_project_statement",
    sourceDate: "2026-08-27",
    claimSupported: [
      "January–July 2026 controlled airport-site pilot",
      "Transition from onboard safety operator to remote control-room monitoring",
      "Employee-passenger scope and future airport-deployment work",
    ],
  },
  "https://www.rmv.de/c/de/ueber-uns/presse/aktuelle-pressemitteilungen/31032026-autonome-kira-shuttles-fahren-laenger-und-bedienen-neue-orte": {
    sourceType: "public_project_statement",
    sourceDate: "2026-03-31",
    claimSupported: [
      "Free rides for registered test users and expanded 2026 operating hours and area",
      "Passenger operation remains a pilot rather than ordinary public transport service",
    ],
  },
  "https://kira-autonom.de/": {
    sourceType: "public_project_statement",
    sourceDate: null,
    claimSupported: [
      "AFGBV-based testing context",
      "Onboard trained safety personnel and trial use of Technische Aufsicht",
    ],
  },
  "https://www.moia.io/en/news/moia-launches-passenger-test-operation-in-hamburg": {
    sourceType: "operator_statement",
    sourceDate: "2026-07-15",
    claimSupported: [
      "Start of free rides for selected pre-registered test users",
      "Onboard trained safety operator and defined ALIKE pilot area",
    ],
  },
  "https://www.buergerschaft-hh.de/parldok/dokument/93459/23_01072_autonomes_fahren_in_hamburg_zeitplan_realisierbarkeit_und_rolle_von_moia": {
    sourceType: "official_authority_statement",
    sourceDate: "2025-08-05",
    claimSupported: [
      "ALIKE closed-user testing with an onboard safety driver",
      "AFGBV § 16 Erprobungsgenehmigung as the stated test route",
    ],
    authorityFinding:
      "The Hamburg Senate response distinguishes the testing authorization from later Betriebserlaubnis and operating-area approval.",
  },
  "https://www.moia.io/en/passengers/autonomous/technology": {
    sourceType: "operator_statement",
    sourceDate: null,
    claimSupported: [
      "Onboard trained safety driver during testing",
      "Fleet-control-centre monitoring and passenger support",
    ],
  },
  "https://www.hochbahn.de/de/presse/pressemitteilungen/meilenstein-holon-und-hochbahn-erhalten-genehmigung-fuer-autonomes-fahren-111518": {
    sourceType: "public_project_statement",
    sourceDate: "2025-11-13",
    claimSupported: [
      "KBA AFGBV § 16 testing authorization through the end of 2026",
      "Public-road testing with a safety driver; passenger rides described as a future phase",
    ],
    authorityFinding:
      "The operator reports a testing authorization, not regular operation or confirmed passenger-service approval.",
  },
  "https://www.hochbahn.de/de/presse/pressemitteilungen/stabil-auf-rekordniveau-hochbahn-verfolgt-groesste-investitionsoffensive-der-unternehmensgeschichte-119088": {
    sourceType: "public_project_statement",
    sourceDate: "2026-07-01",
    claimSupported: [
      "HOLON shuttles regularly testing on Hamburg roads",
      "No confirmation in this source that passenger operation had started",
    ],
  },
  "https://waymo.com/blog/2026/08/waymo-in-munich/": {
    sourceType: "company_announcement",
    sourceDate: "2026-08-25",
    claimSupported: [
      "Manual mapping followed by planned testing with trained specialists",
      "Company target of public commercial service toward the end of 2027",
      "Regulatory approvals still being pursued",
    ],
  },
  "https://waymo.com/waymo-in-germany/": {
    sourceType: "company_announcement",
    sourceDate: null,
    claimSupported: [
      "Current Munich preparation and validation narrative",
      "No evidence on this page of present commercial passenger operation in Munich",
    ],
  },
  "https://www.stmwi.bayern.de/presse/pressemeldungen/385-2026/": {
    sourceType: "official_authority_statement",
    sourceDate: "2026-08-25",
    claimSupported: [
      "Bavarian authority acknowledgment of Waymo's announced Munich test activity",
      "The authority describes planned testing, not an issued operating approval",
    ],
    authorityFinding:
      "The ministry welcomes the announced tests; it does not state that a deployment authorization has been granted.",
  },
};

function withEvidenceProvenance(
  entry: RawDeploymentRealityEntry,
): DeploymentRealityEntry {
  return {
    ...entry,
    asOf: "2026-09-03",
    nextReviewAt: "2026-10-01",
    stale: false,
    atlasAnalysis: entry.whyItMatters,
    sources: entry.sources.map((source) => {
      const provenance = SOURCE_PROVENANCE[source.url];
      if (!provenance) {
        throw new Error(`Missing deployment evidence provenance for ${source.url}`);
      }
      return {
        ...source,
        ...provenance,
        asOf: "2026-09-03" as const,
      };
    }),
  };
}

export const DEPLOYMENT_REALITY: Record<
  DeploymentRealityJurisdiction,
  DeploymentRealityEntry[]
> = {
  netherlands: RAW_DEPLOYMENT_REALITY.netherlands.map(withEvidenceProvenance),
  germany: RAW_DEPLOYMENT_REALITY.germany.map(withEvidenceProvenance),
};

export function getDeploymentReality(
  jurisdiction: DeploymentRealityJurisdiction,
): DeploymentRealityEntry[] {
  return DEPLOYMENT_REALITY[jurisdiction];
}
