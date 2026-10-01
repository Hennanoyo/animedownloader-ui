# UI Authoring Skill

Use this Skill when implementing or changing a reusable primitive in animedownloader-ui.

## Required references

1. Read AGENTS.md.
2. Read .agents/skills/react-aria/SKILL.md.
3. Read .agents/skills/react-aria-project-overlay.md.
4. Open the exact vendored React Aria reference under .agents/skills/react-aria/references/ for the behavior being implemented.
5. Read docs/architecture/design-system.md.

Do not implement React Aria behavior from memory when the official documentation is available.

## Low-level foundation

- React Aria provides accessibility and interaction behavior.
- React Stately provides state, selection, and collection models.
- Prefer direct Hook + State composition when the public contract requires control of DOM structure, layout, styling, focus, keyboard behavior, collection behavior, or state exposure.
- React Aria Components is optional. Use it only when its higher-level anatomy preserves the required control.

## Implementation

- Keep the primitive domain-neutral.
- Keep styling in SCSS Modules and semantic design tokens.
- Use explicit collection keys and text values where required by the React Aria contract.
- Do not hand-roll accessibility state machines already provided by React Aria/Stately.
- Do not expose internal state objects or undocumented DOM selectors as public API.

## Testing

For interactive primitives, cover:

- accessible labeling and semantics;
- keyboard interaction;
- focus behavior and restoration;
- selection/state transitions;
- disabled/validation states;
- popup/overlay lifecycle;
- Browser-rendered behavior.

Use the official React Aria testing guidance and prefer public accessibility contracts over brittle internal selectors.

## Completion

A reusable primitive is ready for application consumption only after:

- public API and component contract are documented;
- focused tests pass;
- Browser tests pass;
- build/typecheck pass;
- package release path is documented;
- the current GitHub Issue records the completed increment and the next implementation boundary.
