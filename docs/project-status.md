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

## Package and release readiness
The package version is 0.1.0 and the intended public entry points are @animedownloader/ui, @animedownloader/ui/styles.css, and @animedownloader/ui/styles/tokens.scss.

PR #15 configured npm package metadata and a tag-driven GitHub Actions Trusted Publishing workflow. The repository-side release workflow passed Check and Browser before merge and the main push CI also passed both checks.

The remaining release steps are external to the repository: configure the npm Trusted Publisher for publish.yml, then create tag v0.1.0. The workflow verifies that the tag exactly matches package.json.version before publication.

## Next implementation-ready increment
Complete the external npm Trusted Publisher setup and publish @animedownloader/ui 0.1.0. After npm makes that exact version available, continue Hennanoyo/animedownloader#383 with representative Select adoption.

Do not remove the legacy application Select/ComboBox implementation before the published release is consumable and the representative application checks pass.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use CI_BROWSER_RUNNER when configured and otherwise fall back to ubuntu-latest.

## Cross-repository coordination
Application migration is tracked by Hennanoyo/animedownloader#383. The application must consume the validated published package before removing the legacy Select/ComboBox implementation.

Current-state documents do not track live PR/CI state. PR #15 is integrated; the active boundary is external npm publisher setup and version 0.1.0 publication.
