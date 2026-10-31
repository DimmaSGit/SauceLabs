import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ProductComponent } from "../../Components/product-component";

export class CartPage extends BasePage {
  readonly product: ProductComponent;
  readonly cartLocator: Locator;
  readonly checkoutButtonLocator: Locator;
  readonly continueShoppingButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.product = new ProductComponent(page);
    this.cartLocator = page.getByTestId("shopping-cart-link");
    this.checkoutButtonLocator = page.getByTestId("checkout");
    this.continueShoppingButtonLocator = page.getByTestId("continue-shopping");
  }

  async gotoCartPage() {
    await this.cartLocator.click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    await product.getByRole("button", { name: "Remove" }).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    const price = await product.getByTestId("inventory-item-price").innerText();
    return price;
  }

  async checkout() {
    await this.checkoutButtonLocator.click();
  }

  async continueShopping() {
    await this.continueShoppingButtonLocator.click();
  }
}
