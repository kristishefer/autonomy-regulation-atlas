import assert from "node:assert/strict";
import test from "node:test";

import {
  assertNativeTermNotFlattened,
  assertNoFutureMaterialInCurrentLaw,
  assertQuarantinedSourcesNotExposed,
  validateConclusionRecord,
  validateProfileScope,
  validateStagedSource,
  type ReviewMetadata,
} from "./regulatory-model.ts";

const review: ReviewMetadata = {
  reviewedAt: "2026-09-03",
  nextReviewAt: "2026-10-01",
  reviewer: "Atlas test",
  reviewMethod: "official_public_text",
  stale: false,
};

function conclusion(overrides: Record<string, unknown>) {
  return {
    key: "test",
    confidenceStatus: "established" as const,
    legalStatus: "in_force",
    legalBasis: [{ sourceId: "official-source" }],
    review,
    ...overrides,
  };
}

test("Unclear conclusions require an uncertainty reason", () => {
  assert.throws(
    () =>
      validateConclusionRecord(
        conclusion({ confidenceStatus: "unclear" }) as Parameters<
          typeof validateConclusionRecord
        >[0],
      ),
    /uncertaintyReason/,
  );
});

test("Not identified conclusions require a defined search scope", () => {
  assert.throws(
    () =>
      validateConclusionRecord(
        conclusion({ confidenceStatus: "not_identified" }) as Parameters<
          typeof validateConclusionRecord
        >[0],
      ),
    /searchScope/,
  );
});

test("Current Law rejects proposed and draft material", () => {
  assert.throws(
    () =>
      assertNoFutureMaterialInCurrentLaw([
        { id: "proposal", legalStatus: "proposed" },
      ]),
    /Current Law/,
  );
});

test("Displayed conclusions require an exposed legal basis", () => {
  assert.throws(
    () =>
      validateConclusionRecord(
        conclusion({ legalBasis: [] }) as Parameters<
          typeof validateConclusionRecord
        >[0],
      ),
    /exposed legal basis/,
  );
});

test("Quarantined sources cannot enter the exposed source registry", () => {
  assert.throws(
    () =>
      assertQuarantinedSourcesNotExposed(
        ["validated-source", "unverified-source"],
        ["unverified-source"],
      ),
    /must not be exposed/,
  );
});

test("Staged instruments reject a uniform source-wide status", () => {
  assert.throws(
    () =>
      validateStagedSource({
        id: "staged-act",
        legalStatus: "adopted_not_yet_effective",
        stagedCommencement: true,
        regimeComponents: [
          { component: "Part A", legalStatus: "in_force" },
          { component: "Part B", legalStatus: "adopted_not_yet_effective" },
        ],
      }),
    /uniform source-wide status/,
  );
});

test("Research coverage cannot be derived only from the selected scenario", () => {
  assert.throws(
    () =>
      validateProfileScope({
        slug: "test",
        selectedScenario: {
          label: "Passenger scenario",
          details: [],
          systemClass: "automated_driving_system",
          vehicleCategories: ["passenger_vehicle"],
          useCases: ["testing"],
          operatingEnvironments: ["public_roads"],
          geographicScope: "Test jurisdiction",
        },
        researchCoverage: {
          systemClasses: ["automated_driving_system"],
          vehicleCategories: ["passenger_vehicle"],
          useCases: ["testing"],
          operatingEnvironments: ["public_roads"],
          geographicScope: "Test jurisdiction",
          reviewStatus: "verified",
          basis: "audited_source_inventory",
          independentOfSelectedScenario: false,
          note: "Copied from selected scenario",
        } as never,
      }),
    /independently/,
  );
});

test("Native terminology requires an explicit non-equivalence relationship", () => {
  assert.throws(
    () =>
      assertNativeTermNotFlattened({
        officialTerm: "Betriebsbereich",
        analyticalLabel: "Operational Design Domain",
        relationshipTypes: ["official-language-version"],
      }),
    /non-equivalence/,
  );
});
