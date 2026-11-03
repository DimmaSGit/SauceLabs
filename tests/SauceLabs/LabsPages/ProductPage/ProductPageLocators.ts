import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseLocators";

export class ProductPageLocators extends BaseLocators {
  readonly productListLocator: Locator = this.page.getByTestId("inventory-list");

  getAddToCartLocatorByProduct = (product: Locator) =>
    product.getByRole("button", { name: "Add to cart" });

  getRemoveLocatorByProduct = (product: Locator) =>
    product.getByRole("button", { name: "Remove" });

  getPriceLocatorByProduct = (product: Locator) =>
    product.getByTestId("inventory-item-price");
}
