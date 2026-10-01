# AI Session Handoff

## Current integrated baseline
The repository is the independent low-level UI system for animedownloader.

## Current Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 6 — Integration handoff

## Completed since the previous snapshot
- Repository AI/tooling foundation integrated through PR #2.
- Official React Aria Agent Skill was initially integrated through PRs #4/#5, then replaced with the complete 168-file supplied upstream tree in PR #8.
- Select integrated through PR #3 and validation coverage through PR #6.
- Domain-neutral ComboBox integrated through PR #9.
- PR #11 added the authoritative Skill discovery/selection/preflight workflow and reconciled Select/ComboBox contracts including disabledKeys, controlled collection filtering, form submission, and shouldCloseOnBlur.
- PR #13 finalized the public package contract: Select and ComboBox are single-selection primitives, popup positioning uses React Aria useOverlayPosition, the compiled stylesheet is exposed as @animedownloader/ui/styles.css, and the animedownloader migration guide is documented.
- PR #13 final Check and Browser CI passed.
- Main push CI for the PR #13 merge commit passed Check and Browser.

## Next implementation boundary
Publish the validated @animedownloader/ui 0.1.0 package and activate animedownloader#383 against that exact release.

Before coding:
1. inspect GitHub live state and Issue #1;
2. write the Skill Reference Plan for the release/integration increment before implementation;
3. verify package build artifacts and public exports;
4. publish the validated version;
5. update animedownloader only after the release is consumable;
6. preserve the rule that legacy Select/ComboBox code is removed only after adoption and application checks pass.

## Important constraints
- React Aria + React Stately are the low-level foundation.
- RAC is optional and must preserve required DOM/layout/styling control.
- Primitives are domain-neutral.
- Primitive behavior/accessibility/interaction tests are owned here; application workflows remain in animedownloader.
- The old animedownloader/web/libs/ui code is migration input, not a second long-term source of truth.
- Skill discovery, Issue recording, and preflight are mandatory for each non-trivial implementation increment as defined in docs/development/skill-reference-workflow.md.
- Browser CI uses CI_BROWSER_RUNNER when configured so the same self-hosted runner label can be shared with animedownloader.

## Resume rule
Continue from Issue #1's current Phase after inspecting GitHub live state and satisfying the current increment's Skill Reference Plan/preflight.
