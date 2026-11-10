import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: "./tests",
  // globalSetup: "./global-setup.ts",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.ARTICLES_BASE_URL ?? "http://104.168.59.50",
    trace: "on-first-retry",
    // Every project starts logged in as the Articles user by default.
    // Other projects opt out with test.use({ storageState: { cookies: [], origins: [] } }).
    // storageState: ".auth/user.json",
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
    // Project-based setup (replaced by globalSetup for now):
    // {
    //   name: "articles-setup",
    //   testMatch: /tests\/Articles\/.*\.setup\.ts$/,
    //   use: { ...devices["Desktop Chrome"], baseURL: process.env.ARTICLES_URL },
    // },
    {
      name: "Articles",
      // dependencies: ["articles-setup"],
      testMatch: /tests\/Articles\/.*\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.ARTICLES_BASE_URL,
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
