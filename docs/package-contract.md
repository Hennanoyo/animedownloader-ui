# Package Contract

## Package

The repository exposes `@animedownloader/ui` as a source-controlled package. The package is consumed from the pinned `animedownloader-ui` Git submodule during development; npm publication is not part of the project integration contract.

The package manifest keeps a semantic version for ordinary package tooling, but the authoritative application revision is the Git submodule commit recorded by `animedownloader`.

## Public exports

The package root exports:

- `Select` and `SelectProps`
- `SelectOption`, `SelectKey`, and `SelectValue`
- `ComboBox` and `ComboBoxProps`
- `ComboBoxOption`, `ComboBoxKey`, and `ComboBoxValue`
- `UI_PACKAGE_NAME`

The package also exposes `@animedownloader/ui/styles.css` as the compiled stylesheet entry.

Consumers must import from the package root and the documented stylesheet entry. They must not deep-import `src` files.

## Select contract

`Select` is intentionally single-selection.

Its domain-neutral item contract is:

```ts
interface SelectOption {
  id: string | number;
  textValue: string;
  label: ReactNode;
  description?: ReactNode;
  isDisabled?: boolean;
}
```

The component accepts React Aria low-level Select behavior/state props that are compatible with single selection. `selectionMode="multiple"` is not part of this public contract.

Use `defaultValue` for uncontrolled selection and `value` + `onChange` for controlled selection.

Use `disabledKeys` for consumer-level disabled state. Option-level `isDisabled` values are merged with it.

## ComboBox contract

`ComboBox` is intentionally single-selection.

Its domain-neutral item contract is:

```ts
interface ComboBoxOption {
  id: string | number;
  textValue: string;
  label: ReactNode;
  description?: ReactNode;
  isDisabled?: boolean;
}
```

Use `defaultItems` when this primitive owns local filtering. Use `items` when the consumer owns filtering, including remote or asynchronous search.

Use `defaultInputValue` / `inputValue` for the text state. Use `defaultValue` / `value` for selection state.

The default `menuTrigger` is `input`. The suggestion trigger button is also available to explicitly open the collection without changing the query.

`selectionMode="multiple"` is not part of this public contract.

## Form contract

ComboBox supports `name` and `formValue`:

- `formValue="key"` submits the selected option key through a hidden input.
- `formValue="text"` submits the visible input text.
- `allowsCustomValue` forces text submission because a matching option key may not exist.

Select uses React Aria's `HiddenSelect` form integration and submits the selected option id when `name` is provided.

## Styling contract

Primitive styling is internal and uses SCSS Modules plus semantic tokens.

Consumers may pass `className` for composition, but application code must not depend on generated CSS Module class names. Public behavior should be located through roles, accessible names, and documented state.

Consumers that need the shared tokens can use the existing `@animedownloader/ui/styles/tokens.scss` export.

## Compatibility policy

The Git submodule commit is the compatibility boundary during active development.

Changes that affect exported component props, option/value types, form semantics, or documented behavior must update the package contract and be validated by the corresponding application consumer before the application moves its submodule pointer.

The application must never switch the submodule to an arbitrary unvalidated UI commit as a workaround for a failing product check.

## Distribution

This repository is source-distributed through Git. CI and Dev Container workflows clone/init the repository's submodule and build it locally before application validation.

There is no npm release, Trusted Publisher, npm token, or registry-version handoff required for application integration.
