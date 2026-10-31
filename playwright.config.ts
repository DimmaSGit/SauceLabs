import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: "https://www.saucedemo.com/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "SauceLabs",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.BASE_URL,
        testIdAttribute: "data-test",
      },
    },
  ],
});
