import { chromium, request, expect } from "@playwright/test";
declare const require: any;
const fs = require("fs");
import { registerUser, BASE_URL } from "./tests/Articles/articles.api";

export const STORAGE_STATE = ".auth/user.json";
export const USER_DATA = ".auth/user-data.json";

export default async function globalSetup() {
  fs.mkdirSync(".auth", { recursive: true });

  // 1. Register through the API. The response already includes the token.
  const api = await request.newContext();
  const user = await registerUser(api);
  await api.dispose();

  // 2. Put the token into the browser and save the session.
  const browser = await chromium.launch();
  const page = await browser.newPage();

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

  await browser.close();
}
