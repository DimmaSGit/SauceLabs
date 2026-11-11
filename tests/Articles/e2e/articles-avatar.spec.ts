import { test, expect } from "../fixtures.api";
import { navigateToUserSettings } from "../PageObjects/ArticlesPage";

test("should verify registered avatar via fixture mapping", async ({
  page,
  registeredUser,
  settingsPage,
}) => {
  await page.goto("/articles/");
    await expect(page.getByTestId("nav-profile")).toHaveText(
      registeredUser.username,
    );

  await navigateToUserSettings(page);
  const newAvatar = "https://ui-avatars.com";
  await settingsPage.updateAvatar(newAvatar);

  await page.reload();
  await navigateToUserSettings(page);

  await expect(settingsPage.avatarInput).toBeVisible();
  await expect(settingsPage.avatarInput).toHaveValue(newAvatar);
});
