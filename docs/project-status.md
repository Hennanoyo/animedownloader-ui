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

PR #13 finalized the public Select/ComboBox contract: both primitives are single-selection, popup positioning uses React Aria useOverlayPosition, the compiled stylesheet has a package export, and application migration guidance is documented.

The official React Aria Agent Skill is source-controlled as the complete 168-file tree under .agents/skills/react-aria/. PR #8 verified the supplied source archive byte-for-byte against the official Skills CLI output; project-specific rules are kept separately in .agents/skills/react-aria-project-overlay.md.

The AI Skill discovery and preflight workflow is authoritative in docs/development/skill-reference-workflow.md. Relevant Skills are discovered rather than all Skills being loaded, the exact selection is recorded in the Development Issue, Required Skills are read before implementation, and newly discovered materially applicable Skills require the plan to be updated before work continues.

## Package contract
The current package version is 0.1.0. The intended consumer entry points are:
- @animedownloader/ui
- @animedownloader/ui/styles.css
- @animedownloader/ui/styles/tokens.scss

The package must be published and consumed by version. Source-tree and git dependencies are not the migration contract.

## Next implementation-ready increment
Publish the validated @animedownloader/ui package version, then activate Hennanoyo/animedownloader#383 against that exact release.

Before coding:
1. classify the release/integration increment and write its Skill Reference Plan in Issue #1;
2. inspect package.json, build output expectations, and release configuration;
3. verify the package tarball/public exports before application adoption;
4. update the companion application dependency using the validated release;
5. keep legacy primitive removal blocked until application adoption and checks pass.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use CI_BROWSER_RUNNER when configured and otherwise fall back to ubuntu-latest.

## Cross-repository coordination
Application migration is tracked by Hennanoyo/animedownloader#383. The application must consume a validated published package before removing the legacy Select/ComboBox implementation.

Current-state documents do not track live PR/CI state. PR #13 is integrated; the active boundary is Phase 6 package publication and application handoff.
