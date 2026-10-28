import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ProductComponent } from "../../Components/product-component";

export class ProductPage extends BasePage {
  readonly productListLocator: Locator;
  readonly product: ProductComponent;

  constructor(page: Page) {
    super(page);
    this.productListLocator = page.getByTestId("inventory-list");
    this.product = new ProductComponent(page);
  }

  async addToCartByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    await product.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    await product.getByRole("button", { name: "Remove" }).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    return await product.getByTestId("inventory-item-price").innerText();
  }
}
