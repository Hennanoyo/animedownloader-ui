import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { ComboBox, type ComboBoxOption } from "../src";

const options: ComboBoxOption[] = [
  { id: "frieren", textValue: "Frieren", label: "Frieren" },
  { id: "banana", textValue: "Banana", label: "Banana" },
  {
    id: "kanganime",
    textValue: "KangAnime",
    label: "KangAnime",
    description: "Example description",
  },
  {
    id: "disabled",
    textValue: "Disabled",
    label: "Disabled",
    isDisabled: true,
  },
];

describe("ComboBox", () => {
  test("renders a labeled combobox input", () => {
    render(<ComboBox label="Anime" defaultItems={options} />);

    expect(screen.getByRole("combobox", { name: "Anime" })).toBeInTheDocument();
  });

  test("filters the default collection as the input changes", async () => {
    const user = userEvent.setup();
    render(<ComboBox label="Anime" defaultItems={options} />);

    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "fri");

    const option = screen.getByRole("option", { name: "Frieren" });
    expect(option).toBeVisible();
    expect(screen.queryByRole("option", { name: "Banana" })).toBeNull();
  });

  test("selects an option and restores focus to the input", async () => {
    const user = userEvent.setup();
    render(<ComboBox label="Anime" defaultItems={options} />);

    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "fri");

    await user.click(screen.getByRole("option", { name: "Frieren" }));

    expect(input).toHaveValue("Frieren");
    expect(input).toHaveFocus();
  });

  test("supports a custom default filter", async () => {
    const user = userEvent.setup();
    render(
      <ComboBox
        label="Anime"
        defaultItems={options}
        defaultFilter={(textValue, inputValue) =>
          textValue.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())
        }
      />,
    );

    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "fri");

    expect(screen.getByRole("option", { name: "Frieren" })).toBeVisible();
    expect(screen.queryByRole("option", { name: "KangAnime" })).toBeNull();
  });

  test("exposes disabled options and does not select them", async () => {
    const user = userEvent.setup();
    render(<ComboBox label="Anime" defaultItems={options} />);

    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "dis");
    const disabled = screen.getByRole("option", { name: "Disabled" });

    expect(disabled).toHaveAttribute("aria-disabled", "true");
    await user.click(disabled);
    expect(input).toHaveValue("dis");
  });

  test("wires validation state and error message to the field", () => {
    render(
      <ComboBox
        label="Anime"
        defaultItems={options}
        isInvalid
        errorMessage="Choose a valid anime."
      />,
    );

    const input = screen.getByRole("combobox", { name: "Anime" });
    const field = input.closest("[data-invalid='true']");

    expect(screen.getByText("Choose a valid anime.")).toBeInTheDocument();
    expect(field).not.toBeNull();
  });

  test("dismisses the popup with Escape and restores input focus", async () => {
    const user = userEvent.setup();
    render(<ComboBox label="Anime" defaultItems={options} />);

    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "f");
    expect(screen.getByRole("listbox")).toBeVisible();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input).toHaveFocus();
  });
});
