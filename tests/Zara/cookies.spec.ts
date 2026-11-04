import { test, expect } from "@playwright/test";

test("accept cookies", async ({ page, context }) => {
  await page.goto(`${process.env.ZARA_URL}`);
  await page
    .getByRole("button", {
      name: "Do not Sell or Share My Personal Information",
    })
    .click();
  await page.getByRole("button", { name: "Allow All" }).click();
  await page.getByRole("button", { name: "Yes, continue on Spain" }).click();
// Get cookies
  const cookies = await context.cookies();
  expect(cookies.length).toBeGreaterThan(0);
// Create cookies
  await page.context().addCookies([{
    name: "test-cookie-name",
    value: "created cookie-value",
    domain: ".zara.com",
    path: "/",
  }]);

  const addedCookies = await context.cookies();
  const cookie = addedCookies.find((c) => c.name === "test-cookie-name");
  expect(cookie?.value).toBe("created cookie-value");
// Update cookies
  const listCookies = await context.cookies();
  const updatedCookie = listCookies.map((cookies) => {
    if (cookies.name === "test-cookie-name") {
      cookies.value = "updated cookie-value";
    }
    return cookies;
  });   
  await page.context().clearCookies();
  await page.context().addCookies(updatedCookie);

  const updatedCookieAfter = await context.cookies();
  const cookieAfter = updatedCookieAfter.find((c) => c.name === "test-cookie-name");
  expect(cookieAfter?.value).toBe("updated cookie-value");

// Clear cookies
  await page.context().clearCookies();
  const clearedCookies = await context.cookies();
  expect(clearedCookies.length).toBe(0);
});