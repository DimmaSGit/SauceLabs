import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    // baseURL: "https://www.saucedemo.com/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "SauceLabs",
      testMatch: /tests\/(SauceLabs|with-fixture-SL)\/.*\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.SWAGLABS_URL,
        testIdAttribute: "data-test",
      },
    },
    {
      name: "articles-setup",
      testMatch: /tests\/Articles\/.*\.setup\.ts$/,
      use: { ...devices["Desktop Chrome"], baseURL: process.env.ARTICLES_URL },
    },
    {
      name: "Articles",
      dependencies: ["articles-setup"],
      testMatch: /tests\/Articles\/.*\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.ARTICLES_URL,
        storageState: ".auth/user.json", // every Articles test starts logged in
      },
    },
    {
      name: "Zara",
      testMatch: /tests\/Zara\/.*\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.ZARA_URL,
      },
    },
  ],
});
