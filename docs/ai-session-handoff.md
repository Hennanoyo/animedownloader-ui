# AI Session Handoff

## Current integrated baseline
The repository is the independent low-level UI system for `animedownloader`.

## Current Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 1 — AI-native repository foundation

## Next implementation boundary
Complete the repository package/tooling foundation and documentation contract before implementing Select, then implement Select and Combobox as independently tested primitives.

## Important constraints
- React Aria + React Stately are the low-level foundation.
- RAC is optional and must preserve required DOM/layout/styling control.
- Primitives are domain-neutral.
- Primitive behavior/accessibility/interaction tests are owned here; application workflows remain in `animedownloader`.
- The old `animedownloader/web/libs/ui` code is migration input, not a second long-term source of truth.
- Browser CI uses `vars.CI_BROWSER_RUNNER` when configured so the same self-hosted runner label can be shared with `animedownloader`.

## Resume rule
Continue from Issue #1's current Phase after inspecting GitHub live state.
