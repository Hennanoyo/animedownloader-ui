# Project Status

## Current integrated baseline
The repository is the independent low-level UI system for animedownloader.

## Current main Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 5 — AI usage Skills and migration contract

## Architecture boundary
This repository owns reusable, domain-neutral low-level UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and Skills.

animedownloader owns product/domain composition and application end-to-end workflows.

## Completed primitive increments
Select is integrated through PR #3, with validation-specific coverage in PR #6. The current review also preserves consumer-supplied disabledKeys in addition to option-level isDisabled.

The domain-neutral ComboBox primitive is integrated through PR #9. It provides the React Aria/React Stately text input, collection, filtering, highlighting, selection, disabled, validation, keyboard/focus, and popup lifecycle contract. The review in PR #11 also aligns controlled collection behavior, form submission, blur configuration, and disabledKeys preservation with the documented contract.

The official React Aria Agent Skill is source-controlled as the complete 168-file tree under .agents/skills/react-aria/. PR #8 verified the supplied source archive byte-for-byte against the official Skills CLI output; project-specific rules are kept separately in .agents/skills/react-aria-project-overlay.md.

The AI Skill discovery and preflight workflow is now authoritative in docs/development/skill-reference-workflow.md: relevant Skills are discovered rather than all Skills being loaded, the exact selection is recorded in the Development Issue, Required Skills are read before implementation, and newly discovered materially applicable Skills require the plan to be updated before work continues.

## Next implementation-ready increment
Finalize the stable Select/ComboBox public API and migration guidance for animedownloader. Start by classifying the increment, creating its Skill Reference Plan in Issue #1, reading the selected Skills/references, then reviewing the exported package surface, component docs, package/version contract, and animedownloader#383.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use CI_BROWSER_RUNNER when configured and otherwise fall back to ubuntu-latest.

## Cross-repository coordination
Application migration is tracked by Hennanoyo/animedownloader#383. The application must not remove the legacy Select/ComboBox implementation until a versioned package release is consumable.

Current-state documents do not track live PR/CI state. PR #11 is integrated and main Check and Browser CI both passed for the merge commit. The next active work is Phase 5 API/migration contract.
