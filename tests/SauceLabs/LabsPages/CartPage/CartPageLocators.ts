import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseLocators";

export class CartPageLocators extends BaseLocators {
  readonly cartLocator: Locator = this.page.getByTestId("shopping-cart-link");
  readonly checkoutButtonLocator: Locator = this.page.getByTestId("checkout");
  readonly continueShoppingButtonLocator: Locator = this.page.getByTestId("continue-shopping");
  
  getRemoveLocatorByProduct = (product: Locator) => 
    product.getByRole("button", { name: "Remove" });

  getPriceLocatorByProduct = (product: Locator) =>
    product.getByTestId("inventory-item-price");

}