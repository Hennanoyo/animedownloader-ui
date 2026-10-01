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
- PR #13 finalized the stable public API and migration contract: single-selection Select/ComboBox, React Aria overlay positioning, compiled stylesheet export, and animedownloader migration guidance.
- PR #15 added npm package metadata and the GitHub Actions Trusted Publishing workflow for tagged releases.
- PR #15 Check and Browser CI passed; main push CI for the merge commit also passed both checks.
- animedownloader#383 has been updated with the migration handoff and remains blocked on the published package release.

## Next implementation boundary
Complete the external npm release setup for `@animedownloader/ui` 0.1.0.

Required external actions:
1. Configure the npm Trusted Publisher for GitHub Actions using repository owner `Hennanoyo`, repository `animedownloader-ui`, workflow `publish.yml`, with direct publish allowed.
2. Create tag `v0.1.0` on the validated main commit.
3. Verify the publish workflow reaches terminal success and the package is available from npm.
4. Activate `animedownloader#383` Phase 2 against that exact version.

The workflow itself is repository-controlled and already validates dependency install, lint, typecheck, unit tests, build, version-tag matching, package contents, and npm publish.

## Important constraints
- React Aria + React Stately are the low-level foundation.
- RAC is optional and must preserve required DOM/layout/styling control.
- Primitives are domain-neutral.
- Primitive behavior/accessibility/interaction tests are owned here; application workflows remain in animedownloader.
- The old animedownloader/web/libs/ui code is migration input, not a second long-term source of truth.
- Skill discovery, Issue recording, and preflight are mandatory for each non-trivial implementation increment as defined in docs/development/skill-reference-workflow.md.
- Browser CI uses CI_BROWSER_RUNNER when configured so the same self-hosted runner label can be shared with animedownloader.
- npm publication uses a GitHub-hosted runner because npm Trusted Publishing currently does not support self-hosted runners.

## Resume rule
Continue from Issue #1's current Phase after inspecting GitHub live state and satisfying the current increment's Skill Reference Plan/preflight.
