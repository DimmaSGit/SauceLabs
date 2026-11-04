import { test, expect } from "@playwright/test";
import fs from "fs";

test("logged-in user sees their name in nav", async ({ page }) => {
  const user = JSON.parse(fs.readFileSync(".auth/user-data.json", "utf-8"));

  await page.goto(`${process.env.ARTICLES_URL}`);
  await expect(page.getByTestId("nav-profile")).toContainText(user.username);
});
