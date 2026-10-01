import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import {
  DismissButton,
  FocusScope,
  mergeProps,
  useButton,
  useComboBox,
  useFilter,
  useFocusRing,
  useListBox,
  useOption,
  useOverlay,
  useOverlayPosition,
} from "react-aria";
import { Item, useComboBoxState, type ListState } from "react-stately";
import type { AriaComboBoxOptions } from "react-aria/useComboBox";
import type { AriaListBoxOptions } from "react-aria/useListBox";
import styles from "./ComboBox.module.scss";
import type { ComboBoxOption } from "./types";

export interface ComboBoxProps
  extends Omit<
    AriaComboBoxOptions<ComboBoxOption>,
    | "children"
    | "label"
    | "description"
    | "errorMessage"
    | "items"
    | "defaultItems"
    | "inputRef"
    | "buttonRef"
    | "listBoxRef"
    | "popoverRef"
    | "selectionMode"
  > {
  label: ReactNode;
  defaultItems?: Iterable<ComboBoxOption>;
  items?: Iterable<ComboBoxOption>;
  description?: ReactNode;
  errorMessage?: ReactNode;
  defaultFilter?: (textValue: string, inputValue: string) => boolean;
  allowsEmptyCollection?: boolean;
  shouldCloseOnBlur?: boolean;
  formValue?: "text" | "key";
  className?: string;
  size?: "compact" | "default" | "prominent";
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function ComboBox({
  label,
  defaultItems,
  items,
  description,
  errorMessage,
  defaultFilter,
  allowsEmptyCollection,
  shouldCloseOnBlur,
  formValue = "key",
  name,
  form,
  allowsCustomValue,
  className,
  size = "default",
  isInvalid,
  ...props
}: ComboBoxProps) {
  const { contains } = useFilter({ sensitivity: "base" });

  const defaultItemList =
    defaultItems == null ? undefined : Array.from(defaultItems);
  const itemList = items == null ? undefined : Array.from(items);
  const disabledOptionKeys = [
    ...(defaultItemList ?? []),
    ...(itemList ?? []),
  ]
    .filter((item) => item.isDisabled)
    .map((item) => item.id);
  const disabledKeys = new Set([
    ...(props.disabledKeys ?? []),
    ...disabledOptionKeys,
  ]);
  const isFieldInvalid = isInvalid ?? errorMessage != null;
  const resolvedFormValue = allowsCustomValue ? "text" : formValue;
  const inputName = resolvedFormValue === "text" ? name : undefined;

  const state = useComboBoxState<ComboBoxOption>({
    ...props,
    label,
    description,
    errorMessage,
    items: itemList,
    defaultItems: defaultItemList,
    isInvalid: isFieldInvalid,
    disabledKeys,
    defaultFilter: defaultFilter ?? contains,
    allowsEmptyCollection,
    allowsCustomValue,
    shouldCloseOnBlur,
    children: (item) => (
      <Item key={item.id} textValue={item.textValue}>
        {item.label}
      </Item>
    ),
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const {
    buttonProps,
    inputProps,
    labelProps,
    listBoxProps,
    descriptionProps,
    errorMessageProps,
  } = useComboBox(
    {
      ...props,
      label,
      description,
      errorMessage,
      name: inputName,
      form,
      items: itemList,
      defaultItems: defaultItemList,
      isInvalid: isFieldInvalid,
      allowsCustomValue,
      disabledKeys,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const { buttonProps: triggerButtonProps } = useButton(
    buttonProps,
    buttonRef,
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      className={joinClassNames(styles.comboBox, className)}
      data-invalid={isFieldInvalid || undefined}
      data-disabled={props.isDisabled || undefined}
      data-open={state.isOpen || undefined}
    >
      <label {...labelProps} className={styles.label}>
        {label}
      </label>

      <div ref={anchorRef} className={styles.field}>
        <input
          {...mergeProps(inputProps, focusProps)}
          ref={inputRef}
          className={styles.input}
          data-size={size}
          data-focus-visible={isFocusVisible || undefined}
        />
        <button
          {...triggerButtonProps}
          ref={buttonRef}
          type="button"
          className={styles.trigger}
          data-size={size}
        >
          <span aria-hidden="true" className={styles.triggerIcon}>
            ▾
          </span>
        </button>
      </div>

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

      {resolvedFormValue === "key" && name != null ? (
        <input
          type="hidden"
          name={name}
          form={form}
          value={
            Array.isArray(state.value)
              ? (state.value[0] ?? "")
              : (state.value ?? "")
          }
        />
      ) : null}

      {state.isOpen
        ? createPortal(
            <ComboBoxPopup
              state={state}
              listBoxProps={listBoxProps}
              anchorRef={anchorRef}
              popoverRef={popoverRef}
              listBoxRef={listBoxRef}
              shouldCloseOnBlur={shouldCloseOnBlur ?? true}
            />,
            document.body,
          )
        : null}
    </div>
  );
}

interface ComboBoxPopupProps {
  state: ReturnType<typeof useComboBoxState<ComboBoxOption>>;
  listBoxProps: AriaListBoxOptions<ComboBoxOption>;
  anchorRef: RefObject<HTMLDivElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
  listBoxRef: RefObject<HTMLUListElement | null>;
  shouldCloseOnBlur: boolean;
}

function ComboBoxPopup({
  state,
  listBoxProps,
  anchorRef,
  popoverRef,
  listBoxRef,
  shouldCloseOnBlur,
}: ComboBoxPopupProps) {
  const { overlayProps: dismissProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      isDismissable: true,
      shouldCloseOnBlur,
    },
    popoverRef,
  );
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: anchorRef,
    overlayRef: popoverRef,
    placement: "bottom start",
    offset: 4,
    isOpen: state.isOpen,
    shouldFlip: true,
    shouldUpdatePosition: true,
  });

  const { listBoxProps: resolvedListBoxProps } = useListBox(
    listBoxProps,
    state as unknown as ListState<ComboBoxOption>,
    listBoxRef,
  );

  return (
    <FocusScope restoreFocus>
      <div
        {...mergeProps(dismissProps, positionProps)}
        ref={popoverRef}
        className={styles.popover}
      >
        <DismissButton onDismiss={state.close} />
        <ul
          {...resolvedListBoxProps}
          ref={listBoxRef}
          className={styles.listBox}
        >
          {Array.from(state.collection, (item) => (
            <ComboBoxOptionRow
              key={item.key}
              item={item}
              state={state}
            />
          ))}
        </ul>
        <DismissButton onDismiss={state.close} />
      </div>
    </FocusScope>
  );
}

type ComboBoxState = ReturnType<typeof useComboBoxState<ComboBoxOption>>;
type ComboBoxNode = NonNullable<
  ReturnType<ComboBoxState["collection"]["getItem"]>
>;

function ComboBoxOptionRow({
  item,
  state,
}: {
  item: ComboBoxNode;
  state: ComboBoxState;
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
    { key: item.key },
    state as unknown as ListState<ComboBoxOption>,
    ref,
  );
  const option = item.value;
  if (!option) return null;

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
