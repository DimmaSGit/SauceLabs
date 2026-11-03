import { BasePage } from "../BasePage";
import { CheckoutPageLocators } from "./CheckoutPageLocators";

export class CheckoutPage extends BasePage {
  readonly locators: CheckoutPageLocators = new CheckoutPageLocators(this.page);

  async fillFirstName(firstName: string) {
    await this.locators.firstNameLocator.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.locators.lastNameLocator.fill(lastName);
  }

  async fillZipCode(zipCode: string) {
    await this.locators.zipCodeLocator.fill(zipCode);
  }

  async continue() {
    await this.locators.continueButtonLocator.click();
  }

  async finish() {
    await this.locators.finishButtonLocator.click();
  }
}
