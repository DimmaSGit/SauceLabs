import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ProductComponent } from "../../Components/product-component";
import { CartPageLocators } from "./CartPageLocators";

export class CartPage extends BasePage {
  readonly product: ProductComponent = new ProductComponent(this.page);
  readonly locators: CartPageLocators = new CartPageLocators(this.page);
 
  async gotoCartPage() {
    await this.locators.cartLocator.click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    await this.locators.getRemoveLocatorByProduct(product).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    const price = await this.locators.getPriceLocatorByProduct(product).innerText();
    return price;
  }

  async checkout() {
    await this.locators.checkoutButtonLocator.click();
  }

  async continueShopping() {
    await this.locators.continueShoppingButtonLocator.click();
  }
}
