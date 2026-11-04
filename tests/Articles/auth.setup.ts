import { test as setup, expect } from "@playwright/test";
import fs from "fs";
import { registerUser, BASE_URL } from "./articles.api";

export const STORAGE_STATE = ".auth/user.json";
export const USER_DATA = ".auth/user-data.json";

setup("register user and save session", async ({ request, page }) => {
  fs.mkdirSync(".auth", { recursive: true });

  // 1. Register through the API. The response already includes the token.
  const user = await registerUser(request);

  // 2. Put the token into the browser.
  await page.goto(`${BASE_URL}/articles`);
  await page.evaluate((token) => {
    localStorage.setItem("qa-dojo.token", token);
  }, user.token);

  // 3. Confirm the app treats us as logged in.
  await page.reload();
  await expect(page.getByTestId("nav-profile")).toContainText(user.username);

  // 4. Save the session and user details.
  await page.context().storageState({ path: STORAGE_STATE });
  fs.writeFileSync(USER_DATA, JSON.stringify(user, null, 2));
});
