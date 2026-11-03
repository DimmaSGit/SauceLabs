import { BasePage } from "../BasePage";
import { ProductComponent } from "../../Components/product-component";
import { ProductPageLocators } from "./ProductPageLocators";

export class ProductPage extends BasePage {
  readonly product: ProductComponent = new ProductComponent(this.page);
  readonly locators: ProductPageLocators = new ProductPageLocators(this.page);

  async addToCartByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    await this.locators.getAddToCartLocatorByProduct(product).click();
  }

  async removeFromCartByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    await this.locators.getRemoveLocatorByProduct(product).click();
  }

  async getPriceByTitle(title: string) {
    const product = await this.product.getProductByTitle(title);
    return await this.locators.getPriceLocatorByProduct(product).innerText();
  }
}
