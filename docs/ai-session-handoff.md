# AI Session Handoff

## Current integrated baseline
The repository is the independent low-level UI system for animedownloader.

## Current Development Issue
Issue #1 — Establish AI-native UI system and build React Aria + React Stately Select/Combobox

## Current phase
Phase 6 — Integration handoff

## Completed since the previous snapshot
- Repository AI/tooling foundation integrated through PR #2.
- Official React Aria Agent Skill is source-controlled under `.agents/skills/react-aria/`; project rules remain in the separate overlay.
- Select and ComboBox primitives and their required primitive validation are integrated.
- PR #13 finalized the stable public Select/ComboBox contract and stylesheet export.
- PR #19/#20 corrected release build declaration output, making the source package's local build contract explicit.

## Next implementation boundary

Move application integration fully onto the Git source boundary.

Required work:
1. ensure a fresh `animedownloader` checkout can initialize `web/vendor/animedownloader-ui` automatically in its VSCode Dev Container;
2. ensure CI checks out submodules recursively and builds the pinned UI source before frontend/browser validation;
3. keep the application's `@animedownloader/ui-source` link as the migration bridge while legacy `web/libs/ui` consumers remain;
4. migrate remaining consumers and then remove the legacy package and temporary alias.

No npm bootstrap, Trusted Publisher setup, or npm registry publication is required.

## Important constraints
- React Aria + React Stately are the low-level foundation.
- RAC is optional and must preserve required DOM/layout/styling control.
- Primitives are domain-neutral.
- Primitive behavior/accessibility/interaction tests are owned here; application workflows remain in animedownloader.
- The old animedownloader/web/libs/ui code is migration input, not a second long-term source of truth.
- Skill discovery, Issue recording, and preflight are mandatory for each non-trivial implementation increment as defined in docs/development/skill-reference-workflow.md.
- Browser CI uses CI_BROWSER_RUNNER when configured so the same self-hosted runner label can be shared with animedownloader.
- The application Git submodule commit is the source-consumption compatibility boundary.
- npm publication and Trusted Publishing are deliberately outside this project's integration model.

## Resume rule
Continue from the application migration boundary in Hennanoyo/animedownloader#383 after inspecting GitHub live state and satisfying the current increment's Skill Reference Plan/preflight.
