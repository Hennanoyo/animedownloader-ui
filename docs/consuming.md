# Consuming @animedownloader/ui

`animedownloader` consumes the released `@animedownloader/ui` package. It must not import source files from this repository or copy primitives into `web/libs/ui`.

When a generic primitive is missing:
1. classify the requirement as reusable or domain-specific;
2. if reusable, extend this repository;
3. add primitive-level tests;
4. release a compatible package version;
5. consume that version from `animedownloader`.

Application tests should cover the product workflow, not duplicate primitive keyboard/ARIA tests.

Application migration: `Hennanoyo/animedownloader#383`.
UI system implementation: `Hennanoyo/animedownloader-ui#1`.
