# Project Status

## Current integrated baseline
The repository is the independent low-level UI system for animedownloader.

## Current main Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 6 — Integration handoff

## Architecture boundary
This repository owns reusable, domain-neutral low-level UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and Skills.

animedownloader owns product/domain composition and application end-to-end workflows.

## Completed primitive increments
Select is integrated through PR #3, with validation-specific coverage in PR #6. Later contract review preserves consumer-supplied disabledKeys in addition to option-level isDisabled.

The domain-neutral ComboBox primitive is integrated through PR #9. PR #11 aligned controlled collection behavior, form submission, blur configuration, and disabledKeys preservation with the documented contract.

PR #13 finalized the public Select/ComboBox contract: both primitives are single-selection, popup positioning uses React Aria useOverlayPosition, the compiled stylesheet has the package export, and application migration guidance is documented.

The official React Aria Agent Skill is source-controlled as the complete 168-file tree under .agents/skills/react-aria/. PR #8 verified the supplied source archive byte-for-byte against the official Skills CLI output; project-specific rules are kept separately in .agents/skills/react-aria-project-overlay.md.

The AI Skill discovery and preflight workflow is authoritative in docs/development/skill-reference-workflow.md. Relevant Skills are discovered rather than all Skills being loaded, the exact selection is recorded in the Development Issue, Required Skills are read before implementation, and newly discovered materially applicable Skills require the plan to be updated before work continues.

## Package and source-consumption readiness

The repository is a source-controlled UI package for `animedownloader`. The application consumes it from the pinned Git submodule at `web/vendor/animedownloader-ui` and exposes the checked-out package through a pnpm `link:` dependency while the legacy `web/libs/ui` implementation remains for non-migrated consumers.

The package remains buildable as `@animedownloader/ui`, but npm publication is intentionally not part of the application integration model. The source repository and the application's submodule commit are the authoritative distribution boundary.

The application CI checkout uses `submodules: recursive`, and the frontend/browser validation path builds the checked-out UI source before application checks.

## Next implementation-ready increment

Continue `animedownloader#383` Phase 2: verify the representative Select contract and migrate additional Select/ComboBox consumers using the pinned Git source boundary.

The repository-side Git source integration is complete. Do not reintroduce npm publication or replace the pinned submodule with an unbounded Git branch dependency.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use CI_BROWSER_RUNNER when configured and otherwise fall back to ubuntu-latest.

## Cross-repository coordination

Application migration is tracked by Hennanoyo/animedownloader#383. The application owns the submodule pointer and product workflow validation; this repository owns the generic UI package implementation and primitive validation.

Current-state documents intentionally do not track live PR/CI state.
