# Project Status

## Current integrated baseline
The repository is the independent low-level UI system for `animedownloader`.

## Current main Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 4 — Combobox

## Architecture boundary
This repository owns reusable, domain-neutral low-level UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and Skills.

`animedownloader` owns product/domain composition and application end-to-end workflows.

## Completed primitive increments
Select is integrated through PR #3, with validation-specific coverage in PR #6. The final Select CI passed both Check and Browser.

The official React Aria Agent Skill is source-controlled under `.agents/skills/react-aria/`, with project-specific rules separated into `PROJECT-OVERLAY.md`. The Skill snapshot was refined through PR #5.

## Next implementation-ready increment
Implement the domain-neutral Combobox primitive. Start by reading `.agents/skills/react-aria/SKILL.md`, `.agents/skills/react-aria/PROJECT-OVERLAY.md`, and the official `useComboBox` / `useComboBoxState` documentation before defining the public API.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use `CI_BROWSER_RUNNER` when configured and otherwise fall back to `ubuntu-latest`.

## Cross-repository coordination
Application migration is tracked by `Hennanoyo/animedownloader#383`. The application must not remove the legacy Select/ComboBox implementation until a versioned package release is consumable.

Current-state documents do not track live PR/CI state.
