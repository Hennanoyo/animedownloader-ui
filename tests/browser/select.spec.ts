import { expect, test } from "@playwright/test";

test.describe("Select", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tests/browser/select.html");
  });

  test("does not submit a form when opening the Select", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Resolution/ });
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("opens, exposes listbox semantics, and selects an option", async ({ page }) => {
    const priorField = page.getByRole("textbox", { name: "Previously focused field" });
    await priorField.focus();

    const trigger = page.getByRole("button", { name: /Resolution/ });
    await trigger.click();

    const listbox = page.getByRole("listbox");
    await expect(listbox).toBeVisible();

    const options = page.getByRole("option");
    await expect(options).toHaveCount(3);
    await expect(options.nth(0)).toHaveAttribute("aria-selected", "true");

    await page.getByRole("option", { name: "720p" }).click();
    await expect(trigger).toContainText("720p");
    await expect(listbox).toBeHidden();
  });

  test("supports keyboard selection and restores focus to the trigger", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Resolution/ });
    await trigger.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("listbox")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(trigger).toContainText("720p");
    await expect(trigger).toBeFocused();
  });

  test("exposes disabled option semantics", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Resolution/ });
    await trigger.click();

    const disabledOption = page.getByRole("option", { name: "480p" });
    await expect(disabledOption).toHaveAttribute("aria-disabled", "true");
  });
});
