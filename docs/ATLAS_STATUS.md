# Current status

Project: Autonomy Regulation Atlas

Current branch: `codex/jurisdiction-native-terminology`

Preview status: Ready

## Completed

### Global Localization Shell

Status: **DONE**

The shared interface localization shell supports EN, DE, NL and RU. It provides one reusable `LanguageSwitcher`, locale persistence, same-route switching that preserves unrelated query parameters, and request-level `<html lang>` handling.

Coverage:

- Home
- Deploy
- Jurisdictions
- Compare
- System Map
- Learning
- Terms

Validation:

- Desktop and mobile behavior verified
- Keyboard accessibility verified
- No duplicate language selectors identified

Important limitations:

- The interface is localized; substantive regulatory analysis remains English unless it is separately translated and reviewed.
- Official legal terminology remains in the source language.
- A localized interface label does not imply legal equivalence between jurisdiction-specific concepts.

### Learning v1

Status: **DONE**

Learning v1 adds the typed shared knowledge layer, the initial Safety & Standards learning path and six unit routes. It distinguishes current standards, draft Standards Watch items, binding law, guidance, investigations and Atlas analysis, and connects learning material to jurisdiction examples and Explorer concepts.

Important limitations:

- This is a focused learning foundation, not a full learning-management system.
- Learning coverage is intentionally limited to the reviewed initial path and concepts.
- Regulatory analysis remains English unless separately translated and reviewed.

### Explain / Atlasling integration

Status: **DONE**

The existing Explain pattern reuses shared learning objects across jurisdiction content and the System Map. Atlaslings remain functional guides rather than a parallel tooltip or learning architecture.

Important limitations:

- Explain coverage depends on an existing reviewed shared learning object.
- Explain content supplements the regulatory analysis; it does not replace jurisdiction-specific scope or source review.

### Glossary foundation

Status: **DONE**

The Glossary is a projection of the shared knowledge layer, so definitions and jurisdiction-native terminology are reused rather than copied into a separate glossary registry.

Important limitations:

- The Glossary currently reflects the concepts available in the shared knowledge layer.
- It is not yet a comprehensive index of every term appearing in Atlas sources.

### Jurisdiction-native terminology layer

Status: **DONE**

The terminology model separates the universal Atlas concept from the jurisdiction-specific official term, English analytical gloss, plain-language explanation, jurisdiction significance and primary source. It also records non-equivalent relationships and term status.

Initial reviewed terminology covers Germany and the Netherlands, including human roles, operating concepts and approval or authorization concepts.

Important limitations:

- Initial terminology coverage is not exhaustive.
- Official terms are not treated as literal translations or presumed legal equivalents.
- Additional jurisdictions require source-native terminology research before records are added.

### Compare five-jurisdiction architecture

Status: **DONE**

Compare applies a universal set of regulatory questions across the Netherlands, Germany, the United Kingdom, the United States and Russia. It preserves scope, uncertainty and scenario-specific conclusions instead of reducing answers to binary yes/no labels.

Important limitations:

- Comparisons are constrained by the stated vehicle, automation, road, operating and human-role scope.
- `Not identified` does not mean `No` or `Prohibited`, and `Unclear` remains non-binary.
- Similar comparison labels do not establish legal equivalence between national regimes.

### USA / Russia / UK jurisdiction expansion

Status: **TECHNICAL IMPLEMENTATION DONE · SUBSTANTIVE REVIEW IN PROGRESS**

The Explorer includes technical profile, discovery, comparison and System Map integration for the United States, Russia and the United Kingdom alongside the Netherlands and Germany. Non-Russia substantive audit remediation has been implemented and is pending final review. Russia remains a separate expert-review workstream and is not substantively approved.

Important limitations:

- United States coverage distinguishes the federal layer and California where specified.
- Russia content remains quarantined behind a qualified Russian-law expert review requirement. Existing conclusions are not approved for production and must not be broadened or corrected without that review.
- United Kingdom coverage follows the reviewed Great Britain scope where stated.
- Each profile is a source-backed regulatory view, not an exhaustive statement of all potentially applicable law.

### Source status separation

Status: **DONE**

Source type and legal status are represented separately. Proposed and draft regulator materials remain traceable in Implementation Watch without appearing as active rules in Current Law, and source cards are not duplicated between those views.

Important limitations:

- Source status is time-sensitive and requires continued verification.
- A source's institutional type does not determine whether it is in force, proposed or draft.

### Explorer regulatory-layer architecture

Status: **DONE**

Explorer combines a universal knowledge graph, universal regulatory questions, jurisdiction overlays, shared Explain objects and an authority/source layer. The System Map retains one shared international and technical architecture while jurisdiction overlays express regime-specific legal effect.

Important limitations:

- International origin does not imply automatic applicability in a jurisdiction.
- Treaty participation, national implementation, regulatory reference and voluntary assurance use remain distinct relationships.
- Unresearched jurisdiction relationships must remain pending rather than being inferred.

## Current launch blockers

### Closed blockers

- Proposed source material appearing as active Current Law
- Stale Netherlands/Germany-only Deploy coverage
- System Map ESLint regression
- Global language-switcher persistence and compact-control UX

### Remaining review items

- ASIL licensed/full-text verification
- Independent German/Dutch source-language review
- Homepage map and product-axis design holds
- Manual verification of UK SI 2026/731 and SI 2026/733; both sources remain withheld until verified
- Qualified Russian-law expert review of all Russia substantive conclusions, sources and terminology
- Final post-remediation claim audit
- Final cross-surface visual and responsive review
- Preview sign-off before any production decision

Production status: **NOT APPROVED**

## Next steps

- [ ] Final UX review
- [ ] Final content polish
- [ ] Production launch decision
