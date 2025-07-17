import { test, expect } from "@playwright/test";

test("login como admin", async ({ page }) => {
  await page.goto("http://localhost:5173/admin");
  await page.fill('input[name="username"]', "admin");
  await page.fill('input[name="password"]', "adminpassword");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*dashboard/);
});
