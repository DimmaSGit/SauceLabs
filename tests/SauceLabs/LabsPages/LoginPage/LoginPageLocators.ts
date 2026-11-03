import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseLocators";

export class LoginPageLocators extends BaseLocators {
  readonly usernameFieldLocator: Locator = this.page.getByTestId("username");
  readonly passwordFieldLocator: Locator = this.page.getByTestId("password");
  readonly loginButtonLocator: Locator = this.page.getByTestId("login-button");
  readonly errorMessageLocator: Locator = this.page.getByTestId("error");
}
