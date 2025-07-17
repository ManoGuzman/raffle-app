import { test, expect } from "@playwright/test";

test("formulario de reserva muestra confirmación", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.fill('input[name="name"]', "Juan");
  await page.fill('input[name="phone"]', "88888888");
  await page.click('button:has-text("Apartar")');

  await expect(page.locator("text=Confirmación enviada")).toBeVisible();
});
