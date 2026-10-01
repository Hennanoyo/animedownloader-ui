# ComboBox

`ComboBox` is a domain-neutral single-selection primitive built from React Aria and React Stately.

## Public data contract

```ts
type ComboBoxOption = {
  id: string | number;
  textValue: string;
  label: ReactNode;
  description?: ReactNode;
  isDisabled?: boolean;
};
```

`textValue` is explicit so filtering and accessible naming do not depend on extracting text from arbitrary React nodes.

## Items and filtering

Use `defaultItems` for a collection that the primitive should filter internally. It uses React Aria's language-sensitive contains filter by default and accepts `defaultFilter` for a custom predicate.

```tsx
<ComboBox
  label="Anime"
  placeholder="Search anime"
  defaultItems={options}
/>
```

Use `items` when the consumer owns filtering. This follows React Stately's controlled collection contract and is useful for remote/async search:

```tsx
<ComboBox
  label="Anime"
  items={filteredOptions}
  inputValue={query}
  onInputChange={setQuery}
  allowsCustomValue
/>
```

When `items` is provided, the collection is treated as controlled and no internal filtering is applied.

## Accessibility and interaction contract

- React Aria `useComboBox` owns input, popup trigger, labeling, keyboard, focus, and ARIA wiring.
- React Stately `useComboBoxState` owns input state, collection, filtering, highlighting, selection, and popup state.
- React Aria `useListBox` and `useOption` own option interaction/accessibility.
- The component owns DOM structure, visual styling, and presentation.
- RAC is not used by this primitive.
- The popup is dismissible and restores focus to the input when closed.
- Disabled options expose `aria-disabled` and cannot be selected.
- Consumers should target accessible roles/names and documented state rather than CSS classes.

## Validation

Pass `isInvalid` and `errorMessage` for field-level invalid state. React Aria validation and form props remain available through the public API.

## Size

`size` accepts `compact`, `default`, or `prominent` and only controls visual sizing.
