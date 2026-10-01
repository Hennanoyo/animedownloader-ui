# Project Status

## Current integrated baseline
The repository is the independent low-level UI system for `animedownloader`.

## Current main Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 5 — AI usage Skills and migration contract

## Architecture boundary
This repository owns reusable, domain-neutral low-level UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and Skills.

`animedownloader` owns product/domain composition and application end-to-end workflows.

## Completed primitive increments
Select is integrated through PR #3, with validation-specific coverage in PR #6. The final Select CI passed both Check and Browser.

The domain-neutral ComboBox primitive is integrated through PR #9. It provides the React Aria/React Stately text input, collection, filtering, highlighting, selection, disabled, validation, keyboard/focus, and popup lifecycle contract. Final Check and Browser CI passed.

The official React Aria Agent Skill is source-controlled as the complete 168-file tree under `.agents/skills/react-aria/`. PR #8 verified the supplied source archive byte-for-byte against the official Skills CLI output; project-specific rules are kept separately in `.agents/skills/react-aria-project-overlay.md`.

## Next implementation-ready increment
Finalize the stable Select/ComboBox public API and migration guidance for `animedownloader`. Start by reviewing the exported package surface, `docs/components/select.md`, `docs/components/combobox.md`, and `animedownloader#383` before making consumer-facing changes.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use `CI_BROWSER_RUNNER` when configured and otherwise fall back to `ubuntu-latest`.

## Cross-repository coordination
Application migration is tracked by `Hennanoyo/animedownloader#383`. The application must not remove the legacy Select/ComboBox implementation until a versioned package release is consumable.

Current-state documents do not track live PR/CI state. PR #9 is integrated; the next active work is Phase 5 API/migration contract.
