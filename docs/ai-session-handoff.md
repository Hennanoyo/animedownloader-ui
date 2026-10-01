# AI Session Handoff

## Current integrated baseline
The repository is the independent low-level UI system for `animedownloader`.

## Current Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 5 — AI usage Skills and migration contract

## Completed since the previous snapshot
- Repository AI/tooling foundation integrated through PR #2.
- Official React Aria Agent Skill was initially integrated through PRs #4/#5, then replaced with the complete 168-file supplied upstream tree in PR #8.
- Select integrated through PR #3.
- Select validation-specific test coverage integrated through PR #6.
- Final Select CI passed Check and Browser.
- Domain-neutral ComboBox integrated through PR #9.
- ComboBox final Check and Browser CI passed after fixing a state-only filter API typing issue, aligning tests with the default `menuTrigger="input"` semantics, and wiring option `isDisabled` into React Stately `disabledKeys`.

## Next implementation boundary
Finalize the stable Select/ComboBox public API and migration guidance for `animedownloader`.

Before coding:
1. read `.agents/skills/react-aria/SKILL.md`;
2. read `.agents/skills/react-aria-project-overlay.md`;
3. review `docs/components/select.md` and `docs/components/combobox.md`;
4. inspect the current package exports and version/release contract;
5. inspect `animedownloader#383` only as migration input and keep product/domain composition in the application repository.

## Important constraints
- React Aria + React Stately are the low-level foundation.
- RAC is optional and must preserve required DOM/layout/styling control.
- Primitives are domain-neutral.
- Primitive behavior/accessibility/interaction tests are owned here; application workflows remain in `animedownloader`.
- The old `animedownloader/web/libs/ui` code is migration input, not a second long-term source of truth.
- Browser CI uses `vars.CI_BROWSER_RUNNER` when configured so the same self-hosted runner label can be shared with `animedownloader`.

## Resume rule
Continue from Issue #1's current Phase after inspecting GitHub live state.
