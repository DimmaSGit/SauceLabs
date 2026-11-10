import { test, expect } from "../fixtures.api";

test("should verify registered avatar via fixture mapping", async ({
  page,
  registeredUser,
}) => {
  await page.goto("/articles/");
  await page.getByTestId("nav-profile").click();
  await page.getByRole("link", { name: "Edit profile" }).click();

  const avatar = page.getByTestId("settings-image");
  
  await expect(avatar).toBeVisible();
  await expect(avatar).toHaveValue(registeredUser.image);
});
