import type { Page } from "@playwright/test";

export class BaseLocators {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}


