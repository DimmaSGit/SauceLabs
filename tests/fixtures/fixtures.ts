import { test as base, expect } from "@playwright/test"
import { LoginPage } from "../SauceLabs/LabsPages/LoginPage/LoginPage";
import { CheckoutPage } from "../SauceLabs/LabsPages/CheckoutPage/CheckoutPage";
import { CartPage } from "../SauceLabs/LabsPages/CartPage/CartPage";
import { ProductPage } from "../SauceLabs/LabsPages/ProductPage/ProductPage";
import { HeaderComponent } from "../SauceLabs/Components/header-component";

type Credentials = { login: string; password: string };
type UserType = "standard" | "lockedOut";

type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  headerComponent: HeaderComponent;
  users: Record<UserType, Credentials>;
  userType: UserType;
  login: void;
  logout: void;
};

const test = base.extend<MyFixtures>({
  users: {
    standard: {
      login: process.env.STANDARD_LOGIN || "standard_user",
      password: process.env.PASSWORD || "secret_sauce",
    },
    lockedOut: {
      login: process.env.LOCKED_OUT_LOGIN || "locked_out_user",
      password: process.env.PASSWORD || "secret_sauce",
    },
  },

  // describe block with `test.use({ userType: "lockedOut" })`.
  userType: ["standard", { option: true }],

  // Auto: opens the app and logs in as `userType` before every test.
  login: [async ({ page, loginPage, users, userType }, use) => {
    await page.goto("/");
    await loginPage.loginUser(users[userType]);
    await use();
  }, { auto: true }],

  // Auto: depends on `login`, so it is torn down first, right after the test.
  // Resets app state and logs out, but only if the login actually succeeded
  // (nothing to do for e.g. the locked out user).
  logout: [async ({ login, headerComponent }, use) => {
    await use();
    await headerComponent.logoutIfLoggedIn();
  }, { auto: true }],

  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { test, expect };
