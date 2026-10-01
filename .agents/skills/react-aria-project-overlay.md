# animedownloader-ui React Aria project overlay

This file is project-specific guidance. It is intentionally stored outside the vendored upstream React Aria Skill tree so the upstream source remains byte-for-byte reproducible.

## Low-level foundation
- React Aria provides accessibility and interaction behavior.
- React Stately provides state, selection, and collection models.
- Prefer direct Hook + State composition when the public contract requires control of DOM structure, layout, styling, focus, keyboard behavior, collection behavior, or state exposure.
- React Aria Components is optional. Use it only when its higher-level anatomy preserves the required control.
- Do not hand-roll accessibility state machines already provided by React Aria or React Stately.

## Styling
- Use SCSS Modules.
- Use semantic design tokens.
- Keep primitives domain-neutral.

## Implementation procedure
1. Read .agents/skills/react-aria/SKILL.md.
2. Open the exact vendored reference under .agents/skills/react-aria/references/ for the behavior being changed.
3. Inspect the corresponding React Stately state API.
4. Define or update the public component contract.
5. Implement the smallest direct Hook + State composition that satisfies that contract.
6. Add focused unit/interaction/accessibility tests and Browser tests.
7. Verify typecheck, tests, build, and Browser behavior before declaring the increment complete.

## Current component work
Select and Combobox are the first primitives being rebuilt from the application's legacy implementations. Their repository Issue is the source of truth for the current phase and acceptance criteria.
