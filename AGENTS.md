# Agent Instructions

## Repository role
`animedownloader-ui` is the independent low-level UI system consumed by `Hennanoyo/animedownloader`.

This repository owns domain-neutral UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and reusable UI Skills.

The application repository owns domain composition and end-to-end product workflows.

## Official React Aria Skill

For reusable UI primitive work, read `.agents/skills/react-aria/SKILL.md` before implementing behavior from memory. Use its reference map to open the exact official React Aria documentation page for unfamiliar hooks, state, collections, overlays, or component patterns. The project-specific React Aria + React Stately rules below remain authoritative for how that knowledge is applied here.

## Session entrypoint
For a fresh unscoped continuation request, read:
1. `docs/ai-session-protocol.md`
2. `docs/project-status.md`
3. `docs/ai-session-handoff.md`
4. the current GitHub Development Issue
5. the smallest relevant architecture/Skill/test documents

## Low-level UI rules
- React Aria + React Stately are the foundational accessibility, interaction, and state layer.
- Prefer direct React Aria hooks and React Stately state when DOM structure, layout, styling, focus, keyboard, collection, or state control matters.
- React Aria Components (RAC) is optional. Use it only when its higher-level anatomy fits the required contract without reducing required control.
- Never hand-roll a generic accessibility state machine when React Aria or React Stately already provides the behavior/state model.
- Shared primitives must be domain-neutral.
- Use SCSS Modules and semantic design tokens.
- Primitive behavior belongs here. Application workflow behavior belongs in `animedownloader`.

## Cross-repository ownership
When `animedownloader` lacks a generic primitive:
1. classify whether the behavior is genuinely reusable;
2. implement or extend it here;
3. publish a versioned package;
4. consume the release from `animedownloader`.

Do not add a competing low-level implementation to `animedownloader` merely to unblock one page.

Detailed lifecycle rules live in `docs/ai-session-protocol.md` and `docs/development/ai-agent-workflow.md`.
