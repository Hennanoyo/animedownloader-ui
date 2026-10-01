import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("option", { name: "Frieren" })).toBeVisible();
    expect(screen.queryByRole("option", { name: "Banana" })).toBeNull();
  });

  test("does not internally filter controlled items", async () => {
    const user = userEvent.setup();
    render(
      <ComboBox
        label="Anime"
        items={options}
        inputValue="fri"
        onInputChange={() => undefined}
      />,
    );
    const trigger = screen.getByRole("button", { name: /Show suggestions/ });
    await user.click(trigger);
    expect(screen.getByRole("option", { name: "Frieren" })).toBeVisible();
    expect(screen.getByRole("option", { name: "Banana" })).toBeVisible();
    expect(screen.getByRole("option", { name: "KangAnime" })).toBeVisible();
    expect(screen.getByRole("option", { name: "Disabled" })).toBeVisible();
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
          textValue
            .toLocaleLowerCase()
            .startsWith(inputValue.toLocaleLowerCase())
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

  test("preserves consumer-supplied disabled keys", async () => {
    const user = userEvent.setup();
    render(
      <ComboBox
        label="Anime"
        defaultItems={options}
        disabledKeys={["banana"]}
      />,
    );
    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(screen.getByRole("button", { name: /Show suggestions/ }));
    const disabled = screen.getByRole("option", { name: "Banana" });
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    await user.click(disabled);
    expect(input).toHaveValue("");
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

  test("honors shouldCloseOnBlur=false for the state and overlay", async () => {
    const user = userEvent.setup();
    render(
      <ComboBox label="Anime" defaultItems={options} shouldCloseOnBlur={false} />,
    );
    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "fri");
    expect(screen.getByRole("listbox")).toBeVisible();
    fireEvent.blur(input, { relatedTarget: null });
    expect(screen.getByRole("listbox")).toBeVisible();
  });

  test("submits the selected key by default", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <ComboBox label="Anime" name="anime" defaultItems={options} />
      </form>,
    );
    const input = screen.getByRole("combobox", { name: "Anime" });
    await user.click(input);
    await user.type(input, "fri");
    await user.click(screen.getByRole("option", { name: "Frieren" }));
    expect(input).not.toHaveAttribute("name");
    expect(
      new FormData(input.closest("form") as HTMLFormElement).get("anime"),
    ).toBe("frieren");
  });

  test("submits input text with formValue=text", () => {
    render(
      <form>
        <ComboBox
          label="Anime"
          name="anime"
          formValue="text"
          defaultItems={options}
          defaultInputValue="Frieren"
        />
      </form>,
    );
    const input = screen.getByRole("combobox", { name: "Anime" });
    expect(input).toHaveAttribute("name", "anime");
    expect(input).toHaveValue("Frieren");
    expect(
      new FormData(input.closest("form") as HTMLFormElement).get("anime"),
    ).toBe("Frieren");
  });

  test("forces text submission for allowsCustomValue", () => {
    render(
      <form>
        <ComboBox
          label="Anime"
          name="anime"
          allowsCustomValue
          defaultItems={options}
          defaultInputValue="Custom anime"
        />
      </form>,
    );
    const input = screen.getByRole("combobox", { name: "Anime" });
    expect(input).toHaveAttribute("name", "anime");
    expect(
      new FormData(input.closest("form") as HTMLFormElement).get("anime"),
    ).toBe("Custom anime");
  });
});
