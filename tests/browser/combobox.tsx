import { createRoot } from "react-dom/client";
import { ComboBox, type ComboBoxOption } from "../../src";

const options: ComboBoxOption[] = [
  { id: "frieren", textValue: "Frieren", label: "Frieren" },
  { id: "one-piece", textValue: "One Piece", label: "One Piece" },
  {
    id: "spy-x-family",
    textValue: "SPY x FAMILY",
    label: "SPY x FAMILY",
    description: "Example description",
  },
  { id: "disabled", textValue: "Disabled", label: "Disabled", isDisabled: true },
];

createRoot(document.getElementById("root")!).render(
  <ComboBox
    label="Anime"
    placeholder="Search anime"
    defaultItems={options}
    name="anime"
  />,
);
