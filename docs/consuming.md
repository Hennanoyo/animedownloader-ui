# Consuming @animedownloader/ui

`animedownloader` consumes the released `@animedownloader/ui` package. It must not import source files from this repository or copy primitives into `web/libs/ui`.

## Standard consumption

~~~json
{
  "dependencies": {
    "@animedownloader/ui": "0.1.0"
  }
}
~~~

~~~ts
import {ComboBox, Select} from "@animedownloader/ui";
import "@animedownloader/ui/styles.css";
~~~

The release version must be the validated published version. Git URLs and source-path dependencies are not the migration contract.

## Choosing where work belongs

When a requirement appears in `animedownloader`:

1. classify the requirement as reusable or domain-specific;
2. if a matching primitive exists, consume it;
3. if reusable behavior is missing, extend this repository;
4. add primitive-level tests here;
5. release a compatible package version;
6. consume that version from `animedownloader`.

Application tests should cover the product workflow, not duplicate primitive keyboard/ARIA tests.

## Select and ComboBox boundary

The stable public API is documented in `docs/package-contract.md`.

The application migration procedure is documented in `docs/migration/animedownloader-select-combobox.md`.

Application migration: `Hennanoyo/animedownloader#383`.
UI system implementation: `Hennanoyo/animedownloader-ui#1`.
