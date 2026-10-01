# Project Status

## Current integrated baseline
The repository is the independent low-level UI system for `animedownloader`.

## Current main Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 1 — AI-native repository foundation

## Architecture boundary
This repository owns reusable, domain-neutral low-level UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and Skills.

`animedownloader` owns product/domain composition and application end-to-end workflows.

## Next implementation-ready increment
Complete the repository foundation, then implement the Select primitive as the first high-risk contract. Combobox follows after Select is stable.

## Validation
Required CI checks must reach terminal success before merge. Browser checks use `CI_BROWSER_RUNNER` when configured and otherwise fall back to `ubuntu-latest`.

## Cross-repository coordination
Application migration is tracked by `Hennanoyo/animedownloader#383`.

Current-state documents do not track live PR/CI state.
