import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Select, type SelectOption } from "../src";

const options: SelectOption[] = [
  { id: "one", textValue: "One", label: "One" },
  { id: "two", textValue: "Two", label: "Two" },
  { id: "three", textValue: "Three", label: "Three", isDisabled: true },
];

describe("Select", () => {
  test("renders the accessible field and selected value", () => {
    render(<Select label="Example" items={options} defaultValue="one" />);
    expect(screen.getByRole("button", { name: "Example" })).toHaveTextContent("One");
  });

  test("opens and selects with keyboard interaction", async () => {
    const user = userEvent.setup();
    render(<Select label="Example" items={options} defaultValue="one" />);

    const trigger = screen.getByRole("button", { name: "Example" });
    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeVisible();

    await user.keyboard("{ArrowDown}{Enter}");

    expect(trigger).toHaveTextContent("Two");
    expect(trigger).toHaveFocus();
  });

  test("does not select disabled options", async () => {
    const user = userEvent.setup();
    render(<Select label="Example" items={options} defaultValue="one" />);

    await user.click(screen.getByRole("button", { name: "Example" }));
    const disabled = screen.getByRole("option", { name: "Three" });
    expect(disabled).toHaveAttribute("aria-disabled", "true");

    await user.click(disabled);
    expect(screen.getByRole("button", { name: "Example" })).toHaveTextContent("One");
  });
});
