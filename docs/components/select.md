# Select

Select is a domain-neutral single-selection primitive.

## Public API

~~~ts
type SelectOption = {
  id: string | number;
  textValue: string;
  label: ReactNode;
  description?: ReactNode;
  isDisabled?: boolean;
};

<Select
  label="Resolution"
  items={options}
  defaultValue="1080p"
  onChange={(value) => ...}
/>
~~~

The explicit textValue is part of the public contract so collection/typeahead and accessible naming do not depend on extracting text from arbitrary React nodes.

## Disabled items

Set isDisabled: true on an option for option-level disabling. The primitive also preserves any consumer-supplied disabledKeys from the React Aria/React Stately API; the two sources are combined.

## Implementation contract

- React Aria useSelect owns field/trigger accessibility behavior.
- React Stately useSelectState owns collection and selection state.
- React Aria useListBox and useOption own option interaction/accessibility.
- The component owns DOM structure, styling, and presentation.
- RAC is not used by this primitive.
- The popup restores focus to its trigger when closed.
- Disabled options cannot be selected.
- Consumers should locate controls through accessible roles/names and documented state rather than CSS classes.

The current React Aria low-level Select API explicitly separates Select state from the DOM/accessibility props returned by useSelect, which matches this component's architecture.
