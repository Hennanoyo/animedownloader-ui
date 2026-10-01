import type { HTMLAttributes, ReactNode, RefObject } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import {
  DismissButton,
  FocusScope,
  HiddenSelect,
  mergeProps,
  useButton,
  useFocusRing,
  useListBox,
  useOption,
  useOverlay,
  useSelect,
} from "react-aria";
import { Item, useSelectState, type ListState } from "react-stately";
import type { AriaSelectProps } from "react-aria/useSelect";
import styles from "./Select.module.scss";
import type { SelectOption } from "./types";

export interface SelectProps
  extends Omit<
    AriaSelectProps<SelectOption>,
    "children" | "items" | "label" | "description" | "errorMessage"
  > {
  label: ReactNode;
  items: Iterable<SelectOption>;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  size?: "compact" | "default" | "prominent";
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Select({
  label,
  items,
  description,
  errorMessage,
  className,
  size = "default",
  isInvalid,
  ...props
}: SelectProps) {
  const itemList = Array.from(items);
  const disabledKeys = new Set(
    itemList.filter((item) => item.isDisabled).map((item) => item.id),
  );

  const state = useSelectState<SelectOption>({
    ...props,
    items: itemList,
    disabledKeys,
    children: (item) => (
      <Item key={item.id} textValue={item.textValue}>
        {item.label}
      </Item>
    ),
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
    hiddenSelectProps,
  } = useSelect(
    {
      ...props,
      items: itemList,
      isInvalid: isInvalid ?? errorMessage != null,
    },
    state,
    triggerRef,
  );

  const { buttonProps } = useButton(triggerProps, triggerRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isFieldInvalid = isInvalid ?? errorMessage != null;

  return (
    <div
      className={joinClassNames(styles.select, className)}
      data-invalid={isFieldInvalid || undefined}
      data-disabled={props.isDisabled || undefined}
      data-open={state.isOpen || undefined}
    >
      <label {...labelProps} className={styles.label}>
        {label}
      </label>

      <HiddenSelect {...hiddenSelectProps} />

      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={triggerRef}
        className={styles.trigger}
        data-size={size}
        data-focus-visible={isFocusVisible || undefined}
        data-pressed={state.isOpen || undefined}
      >
        <span {...valueProps} className={styles.value}>
          {state.selectedItems[0]?.value.label ?? "Select an option"}
        </span>
        <span aria-hidden="true" className={styles.triggerIcon}>
          ▾
        </span>
      </button>

      {description != null ? (
        <span {...descriptionProps} className={styles.description}>
          {description}
        </span>
      ) : null}
      {errorMessage != null ? (
        <span {...errorMessageProps} className={styles.error}>
          {errorMessage}
        </span>
      ) : null}

      {state.isOpen
        ? createPortal(
            <SelectPopup
              state={state}
              menuProps={menuProps}
              triggerRef={triggerRef}
              overlayRef={overlayRef}
              listBoxRef={listBoxRef}
            />,
            document.body,
          )
        : null}
    </div>
  );
}

interface SelectPopupProps {
  state: ReturnType<typeof useSelectState<SelectOption>>;
  menuProps: HTMLAttributes<HTMLElement>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  listBoxRef: RefObject<HTMLUListElement | null>;
}

function SelectPopup({
  state,
  menuProps,
  triggerRef,
  overlayRef,
  listBoxRef,
}: SelectPopupProps) {
  const { overlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      isDismissable: true,
      shouldCloseOnBlur: true,
    },
    overlayRef,
  );

  const { listBoxProps } = useListBox(
    menuProps,
    state as unknown as ListState<SelectOption>,
    listBoxRef,
  );

  return (
    <FocusScope restoreFocus autoFocus>
      <div
        {...overlayProps}
        ref={overlayRef}
        className={styles.popover}
        style={{
          position: "absolute",
          left:
            (triggerRef.current?.getBoundingClientRect().left ?? 0) +
            window.scrollX,
          top:
            (triggerRef.current?.getBoundingClientRect().bottom ?? 0) +
            window.scrollY +
            4,
          width: triggerRef.current?.getBoundingClientRect().width,
        }}
      >
        <DismissButton onDismiss={state.close} />
        <ul {...listBoxProps} ref={listBoxRef} className={styles.listBox}>
          {Array.from(state.collection, (item) => (
            <SelectOptionRow key={item.key} item={item} state={state} />
          ))}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
}

type SelectState = ReturnType<typeof useSelectState<SelectOption>>;
type SelectNode = NonNullable<ReturnType<SelectState["collection"]["getItem"]>>;

function SelectOptionRow({
  item,
  state,
}: {
  item: SelectNode;
  state: SelectState;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const {
    optionProps,
    labelProps,
    descriptionProps,
    isFocused,
    isSelected,
    isDisabled,
    isPressed,
  } = useOption(
    { key: item!.key },
    state as unknown as ListState<SelectOption>,
    ref,
  );
  const option = item!.value;

  return (
    <li
      {...optionProps}
      ref={ref}
      className={styles.item}
      data-focused={isFocused || undefined}
      data-selected={isSelected || undefined}
      data-disabled={isDisabled || undefined}
      data-pressed={isPressed || undefined}
    >
      <span className={styles.itemContent}>
        <span {...labelProps} className={styles.itemLabel}>
          {option.label}
        </span>
        {option.description != null ? (
          <span {...descriptionProps} className={styles.itemDescription}>
            {option.description}
          </span>
        ) : null}
      </span>
      <span aria-hidden="true" className={styles.selectedIndicator}>
        ✓
      </span>
    </li>
  );
}
