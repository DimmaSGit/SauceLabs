import { Page, Locator } from "@playwright/test";
import { BaseComponent } from "../Components/base-component";

export class ProductComponent extends BaseComponent {
  readonly productItemLocator: Locator;
  readonly productNameLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.productItemLocator = page.getByTestId("inventory-item");
    this.productNameLocator = page.getByTestId("inventory-item-name");
  }

  async getProductByTitle(title: string) {
    return this.productItemLocator.filter({
      has: this.productNameLocator.getByText(title, { exact: true }),
    });
  }
}
