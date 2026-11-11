import { BasePage } from "./BasePage";
import { type Locator, type Page } from "@playwright/test";

export class SettingsPage extends BasePage {
  // Define element locators as private class properties
  readonly avatarInput: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.avatarInput = this.page.getByTestId("settings-image");
    this.submitButton = this.page.getByTestId("settings-submit");
  }
  async updateAvatar(avatarUrl: string): Promise<void> {
    await this.avatarInput.fill(avatarUrl);
    await this.submitButton.click();
  }
}
