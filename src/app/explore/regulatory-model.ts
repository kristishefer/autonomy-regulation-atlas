export type SystemClass =
  | "driver_assistance"
  | "automated_driving_system"
  | "autonomous_vehicle_legal_category";

export type VehicleCategory =
  | "passenger_vehicle"
  | "passenger_shuttle"
  | "goods_vehicle"
  | "public_transport_vehicle"
  | "unspecified";

export type RegulatoryUseCase =
  | "testing"
  | "operational_deployment"
  | "passenger_service"
  | "goods_service"
  | "private_site_operation";

export type OperatingEnvironment =
  | "public_roads"
  | "controlled_site"
  | "approved_operating_area"
  | "permit_defined_route"
  | "mixed";

export type ReviewStatus =
  | "verified"
  | "partially_verified"
  | "research_pending"
  | "expert_review_required";

export type ReviewMethod =
  | "official_public_text"
  | "licensed_full_text"
  | "official_legal_reference"
  | "expert_review";

export type ReviewMetadata = {
  reviewedAt: string;
  nextReviewAt: string;
  reviewer: string;
  reviewMethod: ReviewMethod;
  stale: boolean;
};

export type SelectedScenario = {
  label: string;
  details: { label: string; value: string }[];
  systemClass: SystemClass;
  vehicleCategories: VehicleCategory[];
  useCases: RegulatoryUseCase[];
  operatingEnvironments: OperatingEnvironment[];
  geographicScope: string;
};

export type ResearchCoverage = {
  systemClasses: SystemClass[];
  vehicleCategories: VehicleCategory[];
  useCases: RegulatoryUseCase[];
  operatingEnvironments: OperatingEnvironment[];
  geographicScope: string;
  reviewStatus: ReviewStatus;
  basis: "audited_source_inventory" | "expert_review_pending";
  independentOfSelectedScenario: true;
  note: string;
};

export type ProvisionLegalStatus =
  | "in_force"
  | "adopted_not_yet_effective"
  | "proposed"
  | "draft"
  | "guidance"
  | "legislative_history"
  | "case_law";

export type RegimeComponentStatus = {
  component: string;
  legalStatus: ProvisionLegalStatus;
  effectiveFrom?: string;
  effectiveTo?: string;
  sourceId?: string;
  provision?: string;
  note?: string;
};

type ConclusionLike = {
  key: string;
  confidenceStatus: "established" | "unclear" | "not_identified";
  uncertaintyReason?: string | null;
  searchScope?: string | null;
  legalStatus: string;
  legalBasis: { sourceId: string }[];
  review: ReviewMetadata;
  regimeComponents?: RegimeComponentStatus[];
};

type ProfileScopeLike = {
  slug: string;
  selectedScenario: SelectedScenario;
  researchCoverage: ResearchCoverage;
};

type SourceLike = {
  id: string;
  legalStatus: string;
  stagedCommencement?: boolean;
  regimeComponents?: RegimeComponentStatus[];
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateReviewMetadata(review: ReviewMetadata, owner: string) {
  if (!ISO_DATE.test(review.reviewedAt) || !ISO_DATE.test(review.nextReviewAt)) {
    throw new Error(`${owner}: review dates must use YYYY-MM-DD`);
  }
  if (!review.reviewer.trim()) {
    throw new Error(`${owner}: reviewer is required`);
  }
}

export function validateConclusionRecord(conclusion: ConclusionLike) {
  if (conclusion.legalBasis.length === 0) {
    throw new Error(
      `${conclusion.key}: displayed conclusions require at least one exposed legal basis`,
    );
  }

  if (
    conclusion.confidenceStatus === "unclear" &&
    !conclusion.uncertaintyReason?.trim()
  ) {
    throw new Error(
      `Unclear conclusion requires uncertaintyReason: ${conclusion.key}`,
    );
  }

  if (
    conclusion.confidenceStatus === "not_identified" &&
    !conclusion.searchScope?.trim()
  ) {
    throw new Error(
      `Not identified conclusion requires searchScope: ${conclusion.key}`,
    );
  }

  if (
    ["proposed", "draft", "adopted_not_yet_effective"].includes(
      conclusion.legalStatus,
    ) &&
    conclusion.regimeComponents?.some(
      (component) => component.legalStatus === "in_force",
    )
  ) {
    throw new Error(
      `${conclusion.key}: mixed component status cannot be flattened into one future status`,
    );
  }

  validateReviewMetadata(conclusion.review, conclusion.key);
}

export function validateProfileScope(profile: ProfileScopeLike) {
  const coverage = profile.researchCoverage;
  if (!coverage.note.trim()) {
    throw new Error(`${profile.slug}: research coverage requires a scope note`);
  }
  if (coverage.independentOfSelectedScenario !== true) {
    throw new Error(
      `${profile.slug}: research coverage must be assessed independently of the selected scenario`,
    );
  }
  if (
    coverage.basis === "expert_review_pending" &&
    coverage.reviewStatus !== "expert_review_required"
  ) {
    throw new Error(
      `${profile.slug}: expert-review coverage must remain expert_review_required`,
    );
  }
  if (
    coverage === (profile.selectedScenario as unknown as ResearchCoverage) ||
    !("basis" in coverage)
  ) {
    throw new Error(
      `${profile.slug}: research coverage must not be derived only from the selected scenario`,
    );
  }
}

export function validateStagedSource(source: SourceLike) {
  if (!source.stagedCommencement) return;

  const components = source.regimeComponents ?? [];
  const componentStatuses = new Set(
    components.map((component) => component.legalStatus),
  );
  if (components.length < 2 || componentStatuses.size < 2) {
    throw new Error(
      `${source.id}: staged instrument requires provision/regime-component statuses`,
    );
  }
  if (source.legalStatus !== "mixed") {
    throw new Error(
      `${source.id}: staged instrument cannot use one uniform source-wide status`,
    );
  }
}

export function assertNoFutureMaterialInCurrentLaw(
  sources: { id: string; legalStatus: string }[],
) {
  const invalid = sources.find((source) => source.legalStatus !== "in_force");
  if (invalid) {
    throw new Error(
      `${invalid.id}: Current Law may contain only in-force instruments`,
    );
  }
}

export function assertQuarantinedSourcesNotExposed(
  exposedSourceIds: string[],
  quarantinedSourceIds: string[],
) {
  const exposedQuarantinedSource = quarantinedSourceIds.find((sourceId) =>
    exposedSourceIds.includes(sourceId),
  );
  if (exposedQuarantinedSource) {
    throw new Error(
      `${exposedQuarantinedSource}: quarantined source must not be exposed`,
    );
  }
}

export function assertNativeTermNotFlattened(input: {
  officialTerm: string;
  analyticalLabel: string;
  relationshipTypes: string[];
}) {
  if (
    input.officialTerm !== input.analyticalLabel &&
    !input.relationshipTypes.includes("related-but-not-equivalent") &&
    !input.relationshipTypes.includes("narrower-than") &&
    !input.relationshipTypes.includes("broader-than")
  ) {
    throw new Error(
      `${input.officialTerm}: native terminology requires an explicit non-equivalence relationship`,
    );
  }
}
