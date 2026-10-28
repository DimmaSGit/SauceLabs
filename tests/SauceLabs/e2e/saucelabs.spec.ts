import { test, expect } from "@playwright/test";
import { products, user } from "../helpers/test-data";
import { LoginPage } from "../LabsPages/LoginPage/LoginPage";
import { ProductPage } from "../LabsPages/ProductPage/ProductPage";
import { CartPage } from "../LabsPages/CartPage/CartPage";
import { CheckoutPage } from "../LabsPages/CheckoutPage/CheckoutPage";

test.describe("End-to-End tests for SauceLabs", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
  page.goto("/");
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

test(
  "OOP-01 Successful login with valid products",
  { tag: ["@smoke", "@login"] },
  async ({ page }) => {
    await loginPage.loginUser(user.loginData);
    await expect(productPage.productListLocator).toBeVisible();
  },
);

for (const product of products) {
  test(
    `OOP-02-${product.id} Adding product to cart and checking the price for ${product.name}`,
    { tag: ["@smoke", "@regression"] },
    async ({ page }) => {
      await loginPage.loginUser(user.loginData);
      await expect(productPage.productListLocator).toBeVisible();
      await productPage.addToCartByTitle(product.name);
      await cartPage.gotoCartPage();
      const priceInCart = await cartPage.getPriceByTitle(product.name);
      expect(product.price).toEqual(priceInCart);
    },
  );
}

test(
  "OOP-03 Completing an order and checking the result",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    await loginPage.loginUser(user.loginData);

    await expect(productPage.productListLocator).toBeVisible();
    await productPage.addToCartByTitle(products[0].name);

    await cartPage.gotoCartPage();
    await cartPage.checkout();

    await checkoutPage.fillFirstName(user.firstName);
    await checkoutPage.fillLastName(user.lastName);
    await checkoutPage.fillZipCode(user.zipCode);
    await checkoutPage.continue();
    await checkoutPage.finish();

    expect(page.getByTestId("complete-header")).toBeVisible();
  },
);
});
