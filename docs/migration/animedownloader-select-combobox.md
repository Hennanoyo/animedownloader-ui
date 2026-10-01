# animedownloader Select/ComboBox Migration

This guide is for the application migration tracked by `Hennanoyo/animedownloader#383`.

## Dependency

Consume the published package:

~~~json
{
  "dependencies": {
    "@animedownloader/ui": "0.1.0"
  }
}
~~~

The exact version used by the application must be the validated published release. Do not replace the dependency with a git URL or a source-tree path.

Import primitives from the package root:

~~~ts
import {
  ComboBox,
  Select,
  type ComboBoxOption,
  type SelectOption
} from "@animedownloader/ui";
~~~

Load the compiled stylesheet once at the application entry point:

~~~ts
import "@animedownloader/ui/styles.css";
~~~

## Select migration

The legacy application primitive uses child components:

~~~tsx
<Select label="Resolution">
  <SelectItem id="720p">720p</SelectItem>
  <SelectItem id="1080p">1080p</SelectItem>
</Select>
~~~

The shared primitive uses a domain-neutral item array:

~~~tsx
const resolutions: SelectOption[] = [
  {id: "720p", textValue: "720p", label: "720p"},
  {id: "1080p", textValue: "1080p", label: "1080p"}
];

<Select
  label="Resolution"
  items={resolutions}
  value={resolution}
  onChange={setResolution}
/>
~~~

Mapping rules:

| Legacy concept | Shared API |
| --- | --- |
| child `SelectItem` id | `SelectOption.id` |
| child visible text | `SelectOption.label` |
| searchable/typeahead text | `SelectOption.textValue` |
| item description | `SelectOption.description` |
| disabled item | `SelectOption.isDisabled` |
| `Select` `className` | `className` |
| `size` | `size` |
| `description` | `description` |
| `errorMessage` | `errorMessage` |

The application keeps all domain-specific option construction in `animedownloader`.

## ComboBox migration

Use `defaultItems` when the application supplies a local collection that the primitive should filter.

Use `items` + controlled `inputValue` when the application performs filtering or remote search itself:

~~~tsx
<ComboBox
  label="Anime"
  items={results}
  inputValue={query}
  onInputChange={setQuery}
/>
~~~

Do not copy the old filtering logic into a second shared primitive. Product-specific query construction, debounce, API calls, loading state, result reconciliation, and domain decisions remain in the application.

## Validation and forms

Preserve `isInvalid`, `errorMessage`, `isRequired`, `validate`, and `validationBehavior` when application flows depend on them.

For HTML form submission, preserve the documented `name` / `formValue` semantics instead of reading private DOM nodes.

## Testing boundary

The UI repository owns primitive accessibility, keyboard, focus, selection, disabled, validation, collection, and popup behavior.

The application should retain tests for product workflows such as:

- the correct domain options are produced;
- API results update the controlled ComboBox collection;
- selecting a release/anime updates product state;
- navigation or submission occurs correctly.

Do not duplicate primitive implementation tests in `animedownloader` unless a product workflow requires the behavior.

## Removal rule

Do not remove `web/libs/ui/Select.tsx` or other competing low-level code until:

1. a published `@animedownloader/ui` release satisfying the contract is available;
2. a representative application flow has migrated and passed its application checks;
3. the remaining application consumers have been migrated;
4. primitive-owned tests have been removed or moved to the UI repository as appropriate.

This keeps the two repositories on a controlled migration boundary.
