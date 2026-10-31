import { test as base } from "@playwright/test"
import type { LoginPage } from "../LabsPages/LoginPage/LoginPage";

type MyFixtures = {
  courseName: string;
  loginPage: LoginPage;
  ProductPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({ 
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    }
   })
