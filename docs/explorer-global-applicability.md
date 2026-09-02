# Explorer: Global → Jurisdiction Applicability Model

## Problem

The current Explorer separates a `Global core` from a `Jurisdiction layer`, but it does not show how a global/international instrument reaches a particular legal order. This can imply that an international rule or standard is globally applicable merely because it originates at the global level.

The Explorer must distinguish:

1. **Origin level** — where an instrument comes from.
2. **Jurisdictional reach** — whether and how that instrument has legal, regulatory, approval, assurance or voluntary relevance in a selected jurisdiction.
3. **Domestic legal overlay** — national/subnational rules that exist in that jurisdiction itself.

These are separate dimensions and must not be collapsed into one `relevance` score.

## Core rule

> Global does not mean universally binding.

A node may remain part of the common/global system map while its legal effect differs by jurisdiction.

Data relationship:

`instrument ↔ jurisdiction → applicability relationship`

not:

`instrument → generic EU/US/China relevance badge`

## Data model

Use `JurisdictionApplicability` from `applicability-data.ts` as the cross-cutting relationship layer.

Required dimensions:

- `instrumentId`
- `jurisdiction`
- `status`
- `mechanism`
- `legalEffect`
- `effectiveFrom` where relevant
- `versionOrSeries` where relevant
- `source`
- `note`

Never infer a relationship solely from `geography`, `issuingBody`, treaty participation, or a broad regional relevance marker.

## Status vocabulary

Use mechanism-sensitive statuses rather than one universal `implemented` flag.

### UN Regulations / 1958 Agreement

Prefer:

- Applies through legal framework
- Not part of this legal pathway
- Research pending

Instrument-specific records should additionally capture applicable series/version where legally material.

Treaty participation alone is not sufficient to mark every UN Regulation as applicable.

### UN GTRs / 1998 Agreement

Prefer:

- Implemented / transposed
- Partially implemented
- Not implemented
- Research pending

Participation in the 1998 Agreement does not make a GTR directly applicable as domestic law.

### ISO / SAE / UL and other standards

Prefer:

- Legally or regulatorily referenced
- Approval / assurance relevance
- Voluntary / industry relevance
- No identified legal pathway
- Research pending

Do not display a voluntary technical standard as a binding rule merely because a regulator, manufacturer or industry commonly uses it.

## Explorer UX

### 1. Rename global context

Replace user-facing `Global core` where appropriate with:

**Global instruments & frameworks**

Supporting text:

> Global describes where an instrument originates, not where it is automatically binding. Select a jurisdiction to see how each instrument reaches that legal order.

The underlying common system map remains global/common.

### 2. Jurisdiction selection changes context, not the node universe

Selecting Germany, Netherlands, United States, China, etc. must not simply append national nodes.

It must do two things simultaneously:

- annotate global/core nodes with their researched jurisdictional applicability;
- show domestic/supranational legal nodes belonging to the selected jurisdiction.

### 3. Node card / drawer

When a jurisdiction is selected, add a section:

**How this reaches {Jurisdiction}**

Show:

- status label
- mechanism
- concise legal effect
- source
- version/series if applicable

If the relationship is not researched, show `Research pending` rather than inferring from the generic node description.

### 4. Global view

When no jurisdiction is selected, the node drawer should show:

**Jurisdictional reach**

with a compact preview of researched relationships and a prompt to select a jurisdiction for legal effect.

Do not show a misleading universal applicability badge.

### 5. Jurisdiction layer

Rename/reframe the current jurisdiction section so it does not imply that international instruments live outside the selected legal order.

Suggested structure:

**Jurisdiction context**

- `International / regional instruments reaching this jurisdiction`
- `Domestic legal overlay`

### 6. Compare readiness

The same applicability relationship must later feed Compare. Do not create a separate comparison-only interpretation layer.

Compare should be able to distinguish, for the same instrument:

- different treaty / approval pathways;
- implementation/transposition status;
- legal reference vs voluntary engineering relevance;
- domestic rules that replace or supplement the global framework.

## Existing field to retire

`SystemNode.relevance: { EU, US, China }` is too coarse for legal applicability and should not drive legal-effect UI.

It may be temporarily retained only for migration compatibility. New UI must read jurisdiction-specific legal effect from `JurisdictionApplicability`.

After all nodes are migrated, remove the generic `relevance` field or rename it to a clearly non-legal concept if a visual thematic relevance signal is still needed.

## Source discipline

Every definitive applicability record should be backed by a primary source where available:

- UNECE treaty / Regulation status tables;
- EU legislation / type-approval instruments;
- national legislation or regulator material;
- official standard metadata for the status of standards.

Company or secondary sources may explain practice but should not establish legal applicability where an official source exists.

## Acceptance criteria

- Selecting a jurisdiction visibly changes the applicability information attached to global nodes.
- `Global` can no longer reasonably be read as `globally binding`.
- UN Regulation applicability is not inferred from WP.29 or treaty participation alone.
- UN GTR implementation is modeled separately from the 1958 Agreement pathway.
- ISO/SAE/UL standards are not labeled binding without a specific legal mechanism.
- Domestic jurisdiction nodes remain a distinct overlay.
- Missing research renders as `Research pending`, never as an inferred legal conclusion.
- The data structure can be consumed later by Jurisdiction pages and Compare without a second applicability model.
