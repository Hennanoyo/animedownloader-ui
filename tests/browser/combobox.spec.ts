import { expect, test } from "@playwright/test";

test.describe("ComboBox", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tests/browser/combobox.html");
  });

  test("opens and filters the collection", async ({ page }) => {
    const input = page.getByRole("combobox", { name: "Anime" });
    const trigger = page.getByRole("button", { name: /Show suggestions/ });
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();

    await input.fill("fri");

    await expect(page.getByRole("option", { name: "Frieren" })).toBeVisible();
    await expect(page.getByRole("option", { name: "One Piece" })).toHaveCount(0);
  });

  test("selects with keyboard and restores focus", async ({ page }) => {
    const input = page.getByRole("combobox", { name: "Anime" });
    const trigger = page.getByRole("button", { name: /Show suggestions/ });
    await trigger.click();
    await input.fill("one");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(input).toHaveValue("One Piece");
    await expect(input).toBeFocused();
    await expect(page.getByRole("listbox")).toBeHidden();
  });

  test("exposes disabled option semantics", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Show suggestions/ });
    await trigger.click();

    const disabled = page.getByRole("option", { name: "Disabled" });
    await expect(disabled).toHaveAttribute("aria-disabled", "true");
  });

  test("dismisses the popup with Escape", async ({ page }) => {
    const input = page.getByRole("combobox", { name: "Anime" });
    const trigger = page.getByRole("button", { name: /Show suggestions/ });
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("listbox")).toBeHidden();
    await expect(input).toBeFocused();
  });
});
