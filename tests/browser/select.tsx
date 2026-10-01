import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Select, type SelectOption } from "@animedownloader/ui";

const options: SelectOption[] = [
  { id: "1080p", textValue: "1080p", label: "1080p" },
  { id: "720p", textValue: "720p", label: "720p", description: "Balanced quality" },
  { id: "480p", textValue: "480p", label: "480p", isDisabled: true },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
    <label>
      Previously focused field
      <input aria-label="Previously focused field" />
    </label>
    <form onSubmit={(event) => event.preventDefault()}>
      <Select
        label="Resolution"
        items={options}
        defaultValue="1080p"
        name="resolution"
      />
    </form>
    </>
  </StrictMode>,
);
