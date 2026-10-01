# UI Authoring Skill

Use this Skill when implementing or changing a reusable primitive here.

Before coding:
- read `docs/architecture/design-system.md`;
- define public semantics, state model, and API;
- decide whether direct React Aria + React Stately composition is required;
- use RAC only when its anatomy fits the contract without reducing control.

Implementation:
- keep the primitive domain-neutral;
- use React Aria for accessibility/interaction/focus/keyboard behavior;
- use React Stately for state/selection/collection models;
- use SCSS Modules and semantic tokens;
- avoid exposing internal state objects or implementation-only DOM conventions.

Testing:
- accessible labeling/semantics;
- keyboard interaction;
- focus behavior;
- selection/state transitions;
- disabled/validation where supported;
- popup/overlay lifecycle where supported;
- browser-rendered behavior.

A primitive is ready for application consumption only after API/contract docs, focused tests, Browser tests, build/typecheck, and package release path are ready.
