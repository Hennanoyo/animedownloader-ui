# AI Session Handoff

## Current integrated baseline
The repository is the independent low-level UI system for `animedownloader`.

## Current Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 4 — Combobox

## Completed since the previous snapshot
- Repository AI/tooling foundation integrated through PR #2.
- Official React Aria Agent Skill and provenance guidance integrated through PR #4 and refined through PR #5.
- Select integrated through PR #3.
- Select validation-specific test coverage integrated through PR #6.
- Final Select CI passed Check and Browser.

## Next implementation boundary
Implement the domain-neutral Combobox primitive.

Before coding:
1. read `.agents/skills/react-aria/SKILL.md`;
2. read `.agents/skills/react-aria/PROJECT-OVERLAY.md`;
3. inspect the official `useComboBox`, `useComboBoxState`, `useListBox`, `useOption`, and overlay references;
4. inspect the legacy product ComboBox in `animedownloader` only as migration input;
5. define the public domain-neutral contract before copying behavior.

## Important constraints
- React Aria + React Stately are the low-level foundation.
- RAC is optional and must preserve required DOM/layout/styling control.
- Primitives are domain-neutral.
- Primitive behavior/accessibility/interaction tests are owned here; application workflows remain in `animedownloader`.
- The old `animedownloader/web/libs/ui` code is migration input, not a second long-term source of truth.
- Browser CI uses `vars.CI_BROWSER_RUNNER` when configured so the same self-hosted runner label can be shared with `animedownloader`.

## Resume rule
Continue from Issue #1's current Phase after inspecting GitHub live state.
