# Consuming animedownloader-ui

`animedownloader` consumes `animedownloader-ui` from its Git repository during active development. The UI repository is the source of truth for domain-neutral primitives, design tokens, accessibility/interaction/state behavior, and primitive tests.

## Source consumption

The application records the UI repository as a Git submodule at:

```text
web/vendor/animedownloader-ui
```

The submodule URL is:

```text
https://github.com/Hennanoyo/animedownloader-ui.git
```

The submodule commit is intentionally pinned. A change to the shared UI implementation becomes consumable by the application only when the application updates its submodule pointer and validates that revision.

The application currently exposes the checked-out source package through a temporary pnpm alias while legacy `web/libs/ui` consumers remain:

```json
{
  "@animedownloader/ui-source": "link:../../vendor/animedownloader-ui"
}
```

Import primitives from the alias only for consumers explicitly migrated to the source bridge:

```ts
import {ComboBox, Select} from "@animedownloader/ui-source";
```

Load the shared compiled stylesheet from the source package:

```ts
import "@animedownloader/ui-source/styles.css";
```

Once all application consumers use the shared repository and the legacy `web/libs/ui` implementation is removed, the alias can be replaced by the package's canonical name without introducing a second implementation.

## Fresh checkout / Dev Container

A fresh application checkout must initialize the submodule before installing or building the frontend:

```bash
git submodule update --init --recursive web/vendor/animedownloader-ui
just web-ui-source-build
cd web
pnpm install --frozen-lockfile
```

The VSCode Dev Container performs the same initialization automatically through its post-create command.

## CI

GitHub Actions must use:

```yaml
- uses: actions/checkout@v7
  with:
    submodules: recursive
```

Frontend and Browser validation build the pinned UI source before running application checks. Integration validation uses the same checked-out submodule inside the application stack.

Do not fetch the UI repository from npm, replace the submodule with an unpinned `main` checkout, or copy shared primitives into `web/libs/ui`.

## Choosing where work belongs

When a requirement appears in `animedownloader`:

1. If matching low-level behavior exists in `animedownloader-ui`, consume it.
2. If reusable behavior is missing, extend `animedownloader-ui` first.
3. Add primitive-level tests in `animedownloader-ui`.
4. Update the application submodule pointer to the validated UI revision.
5. Keep product workflow composition and application-level Browser tests in `animedownloader`.

Application tests should cover product workflows, not duplicate primitive keyboard/ARIA implementation tests.

## Select and ComboBox boundary

The stable public component API is documented in `docs/package-contract.md`.

The application migration procedure is tracked in `Hennanoyo/animedownloader#383`.

## Source ownership

The UI repository owns the primitive implementation. `animedownloader` may contain product-specific wrappers/compositions, but must not retain a competing generic Select/ComboBox implementation after migration.
