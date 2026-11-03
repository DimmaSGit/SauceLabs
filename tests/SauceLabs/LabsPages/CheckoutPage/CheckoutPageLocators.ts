import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseLocators";

export class CheckoutPageLocators extends BaseLocators {
  readonly firstNameLocator: Locator = this.page.getByTestId("firstName");
  readonly lastNameLocator: Locator = this.page.getByTestId("lastName");
  readonly zipCodeLocator: Locator = this.page.getByTestId("postalCode");
  readonly continueButtonLocator: Locator = this.page.getByTestId("continue");
  readonly cancelButtonLocator: Locator = this.page.getByTestId("cancel");
  readonly finishButtonLocator: Locator = this.page.getByTestId("finish");
  readonly completeHeaderLocator: Locator = this.page.getByTestId("complete-header");
}
