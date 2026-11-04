import { test, expect } from "../../fixtures/fixtures";
import { products, user } from "../../SauceLabs/helpers/test-data";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("End-to-End tests for SauceLabs - refactored", () => {

for (const product of products) {
  test(
    `OOP-01-${product.id} Adding product to cart and checking the price for ${product.name}`,
    { tag: ["@smoke", "@regression"] },
    async ({ productPage, cartPage }) => {
      await expect(productPage.locators.productListLocator).toBeVisible();
      await productPage.addToCartByTitle(product.name);
      await cartPage.gotoCartPage();
      const priceInCart = await cartPage.getPriceByTitle(product.name);
      expect(product.price).toEqual(priceInCart);
    },
  );
}

test(
  "OOP-02 Completing an order and checking the result",
  { tag: ["@smoke", "@regression"] },
  async ({ productPage, cartPage, checkoutPage }) => {

    await expect(productPage.locators.productListLocator).toBeVisible();
    await productPage.addToCartByTitle(products[0].name);

    await cartPage.gotoCartPage();
    await cartPage.checkout();

    await checkoutPage.fillFirstName(user.firstName);
    await checkoutPage.fillLastName(user.lastName);
    await checkoutPage.fillZipCode(user.zipCode);
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(checkoutPage.locators.completeHeaderLocator).toBeVisible();
  },
);

test.describe("Locked out user", () => {
test.use({ userType: "lockedOut" });
  test(
    "OOP-03 Locked out user is not able to log in",
    { tag: ["@smoke", "@login"] },
    async ({ loginPage, productPage }) => {
      await expect(loginPage.locators.errorMessageLocator).toHaveText(
        "Epic sadface: Sorry, this user has been locked out.",
      );
      await expect(productPage.locators.productListLocator).toBeHidden();
    },
  );
});
});
