# UI Design System Architecture

## Two-repository model

```
animedownloader-ui
  React Aria + React Stately
      ↓
  reusable low-level primitives
      ↓
  @animedownloader/ui
      ↓
animedownloader
  domain-specific composition
  application workflows
```

The `animedownloader` frontend remains a pnpm monorepo. The external UI package is a dependency; it does not replace the application's `web/apps` or `web/libs` boundaries.

## Ownership

This repository owns domain-neutral primitives such as Select, Combobox, Button, TextField, Dialog, Popover, ListBox, Tabs, and generic layout/control foundations when they meet the reuse criteria.

`animedownloader` owns product-specific composition such as ReleaseProfileEditor, Discovery filters, Anime search composition, Download queue interactions, and Episode Player workflows.

## Low-level implementation contract

React Aria supplies accessibility and interaction behavior. React Stately supplies state, selection, and collection models.

Prefer direct hook/state composition when tight control is needed over DOM structure, layout, styling, focus, keyboard interaction, collection state, or state exposure.

RAC is an optional convenience layer. It may be used internally only when its anatomy fits the public contract without workarounds that reduce required control.

## Styling
Use SCSS Modules and semantic design tokens. Do not encode domain knowledge in primitives.

## Testing ownership

Here, tests prove primitive contracts: accessibility, focus/keyboard behavior, state/selection, collection behavior, disabled/validation states, overlay lifecycle, and browser-rendered behavior.

In `animedownloader`, tests prove product workflows and integration. Do not duplicate primitive implementation tests there.

## Migration
During migration, `animedownloader/web/libs/ui` is legacy implementation input only. Once a primitive is consumed from `@animedownloader/ui`, its old low-level implementation and primitive-owned tests are removed from the application.

## Versioning
The public package contract is versioned. Breaking public API changes require migration notes. The publication registry/mechanism must be selected and documented before the first application handoff.
