import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../Components/base-component";

export class HeaderComponent extends BaseComponent {
  readonly menuButtonLocator: Locator;
  readonly closeMenuButtonLocator: Locator;
  readonly resetButtonLocator: Locator;
  readonly logoutLinkLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButtonLocator = page.getByRole("button", { name: "Open Menu" });
    this.closeMenuButtonLocator = page.getByRole("button", { name: "Close Menu" });
    this.resetButtonLocator = page.getByTestId("reset-sidebar-link");
    this.logoutLinkLocator = page.getByTestId("logout-sidebar-link");
  }

  private async openMenu() {
    await this.menuButtonLocator.click();
  }

  private async closeMenu() {
    await this.closeMenuButtonLocator.click();
  }

  async reset() {
    await this.openMenu();
    await this.resetButtonLocator.click();
    await this.closeMenu();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLinkLocator.click();
  }

  // Safe to call in teardown: does nothing if the user is not logged in.
  // Resets the app state (e.g. the cart) first, then logs out.
  async logoutIfLoggedIn() {
    if (await this.menuButtonLocator.isVisible()) {
      await this.reset();
      await this.logout();
    }
  }
}
