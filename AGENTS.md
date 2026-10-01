# Agent Instructions

## Repository role
animedownloader-ui is the independent low-level UI system consumed by Hennanoyo/animedownloader.

This repository owns domain-neutral UI primitives, design tokens, accessibility/interaction/state contracts, primitive tests, and reusable UI Skills.

The application repository owns domain composition and end-to-end product workflows.

## Official React Aria Skill
For reusable UI primitive work, the agent must satisfy the Skill Reference and Preflight workflow in docs/development/skill-reference-workflow.md.

At minimum, React Aria + React Stately primitive work requires reading:
- .agents/skills/react-aria/SKILL.md;
- .agents/skills/react-aria-project-overlay.md;
- the exact vendored references relevant to the behavior.

Do not read every Skill by default. Discover the Skills relevant to the current task, record the selection in the Development Issue, and read all Required Skills before implementation.

## Session entrypoint
For a fresh unscoped continuation request, read:
1. docs/ai-session-protocol.md
2. docs/project-status.md
3. docs/ai-session-handoff.md
4. the current GitHub Development Issue
5. the smallest relevant architecture and Skill workflow documents

## Low-level UI rules
- React Aria + React Stately are the foundational accessibility, interaction, and state layer.
- Prefer direct React Aria hooks and React Stately state when DOM structure, layout, styling, focus, keyboard, collection, or state control matters.
- React Aria Components (RAC) is optional. Use it only when its higher-level anatomy fits the required contract without reducing required control.
- Never hand-roll a generic accessibility state machine when React Aria or React Stately already provides the behavior/state model.
- Shared primitives must be domain-neutral.
- Use SCSS Modules and semantic design tokens.
- Primitive behavior belongs here. Application workflow behavior belongs in animedownloader.

## Cross-repository ownership
When animedownloader lacks a generic primitive:
1. classify whether the behavior is genuinely reusable;
2. implement or extend it here;
3. publish a versioned package;
4. consume the release from animedownloader.

Do not add a competing low-level implementation to animedownloader merely to unblock one page.

Detailed lifecycle rules live in docs/ai-session-protocol.md, docs/development/ai-agent-workflow.md, and docs/development/skill-reference-workflow.md.
