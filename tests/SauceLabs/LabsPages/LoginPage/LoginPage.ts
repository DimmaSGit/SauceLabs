import { BasePage } from "../BasePage";
import { LoginPageLocators } from "./LoginPageLocators";

export class LoginPage extends BasePage {
  readonly locators: LoginPageLocators = new LoginPageLocators(this.page);

  async loginUser(userData: { login: string; password: string }) {
    await this.locators.usernameFieldLocator.fill(userData.login);
    await this.locators.passwordFieldLocator.fill(userData.password);
    await this.locators.loginButtonLocator.click();
  }
}
