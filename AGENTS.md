<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Autonomy Regulation Atlas — agent operating rules

## Source of truth and roles

- Treat approved Figma frames as the visual source of truth for UI work. Do not reinterpret them into a different composition unless the task explicitly asks for redesign.
- Treat repository content and regulatory data as the source of truth for product/content behavior.
- For visual implementation, the agent is an implementer first: reproduce the approved frame, then refine only against measurable visual differences.
- Do not self-certify visual quality with phrases like "looks close" or "visual check passed". Use browser screenshots and visual comparison.

## Hero / homepage visual workflow

For Hero or other design-sensitive work:

1. Read the approved design frame / visual spec before coding.
2. Implement at the target desktop viewport first (1440px), then 390px mobile.
3. Capture browser screenshots after implementation.
4. Compare against the approved reference using visual regression / image diff tooling (Playwright preferred).
5. Iterate until the remaining differences are intentional and documented.
6. Verify EN / DE / NL / RU shells after the visual match is stable.

Do not rely on prose prompts alone when a structured design source exists.

## Atlas Hero art direction

- Editorial legal-tech × luminous systems map × subtle storybook warmth.
- Light warm-paper left side dissolving into a luminous cool/dusty-blue spatial field.
- Constellation is a major visual object with far/mid/near depth, sweeping curves, major anchors, latent points and atmospheric pockets.
- Primary anchors: QUESTION, JURISDICTION, RULE, SOURCE. Context satellites: SYSTEM, SCOPE, STATUS.
- Fox / Cat / Dog may appear as latent star-clusters that resolve into subtle silhouettes on hover/focus; they must not read as cartoon stickers in the resting state.
- Cloud remains a hidden atmospheric signature with exactly three companion points.
- Avoid dashboard, scientific-graph, dark-space, neon/sci-fi, generic SaaS and children's-illustration aesthetics.

## Git / Preview workflow

- Normal workflow is direct repository work: edit → validate → commit → push → Preview → browser QA.
- Do not export or request ZIP handoffs as a normal workflow.
- If Git authentication or push fails, stop and report the exact failing step/error. Do not substitute archive transfer unless the user explicitly authorizes emergency fallback.
- Work on the assigned feature branch. Do not merge or push to `main` unless explicitly instructed.
- A push to `main` may trigger Production; never describe it as a no-production action.
- Do not deploy Production unless explicitly instructed.

## Protected project areas

Do not modify unless the task explicitly requires it:

- regulatory data or legal conclusions outside the requested scope;
- jurisdiction profiles, Compare, Learning or Methodology when doing homepage-only work;
- Supabase migrations/tests or untracked Supabase files;
- locale architecture;
- routes unrelated to the task.

For Russia regulatory content, do not independently broaden, narrow or "correct" scope from public-source inference. Russia remains expert-review/user-led unless specifically directed.

## Validation

Before reporting a code task complete, run as applicable:

- `npm run test:content`
- TypeScript check
- `npm run lint`
- `npm run build`
- `git diff --check`

For visual work also verify:

- 1440px desktop
- 390px mobile
- no horizontal overflow
- no browser console errors
- reduced-motion behavior where motion is present
- visual comparison against the approved reference

If a validation failure is pre-existing and unrelated to the task, identify the exact error and demonstrate why it is pre-existing rather than silently ignoring it.
