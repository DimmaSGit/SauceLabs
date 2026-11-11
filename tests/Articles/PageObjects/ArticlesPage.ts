import { BasePage } from "./BasePage";  
import { expect, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";


export class ArticlesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
export interface TestUser {
  username: string;
  email: string;
  password: string;
}

const user = {
  username: `user-${faker.string.alphanumeric(8)}`,
  email: `user-${faker.string.alphanumeric(8)}@test.com`,
  password: "test123",
};

export async function loginUser(
  page: Page,
  user: Pick<TestUser, "email" | "password" | "username">,
) {
  await page.goto(`/articles`);
  await page.getByTestId("nav-sign-in").click();

  await page.getByTestId("auth-email").fill(user.email);
  await page.getByTestId("auth-password").fill(user.password);
  await page.getByTestId("auth-submit").click();

  await expect(page.getByTestId("nav-profile")).toContainText(user.username);
}

export async function navigateToUserSettings(page: Page) {
  await page.getByTestId("nav-profile").click();
  await page.getByRole("link", { name: "Edit profile" }).click();
}
