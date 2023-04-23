import { test, expect } from "@playwright/test";
import { pageUrl, userInDatabase } from "../commons/testvariables";
import { testCheckLoginSuccess, testLogIn, waitAndCloseOneGameReport } from '../commons/methods';
import { commonText } from '../commons/texts';

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);
});

test("homepage has Last five games list and it opens game report", async ({ page }) => {
  await expect(page).toHaveTitle(/PromiseWeb/);

  await testLogIn(page, userInDatabase);

  await testCheckLoginSuccess(page);

  await expect(page.getByText(commonText.lastFiveGames)).toHaveCount(1);
  const lastPlayedGameInfo = page.locator("p", {hasText: commonText.lastFiveGames})
    .locator("//following-sibling::ul")
    .locator("li")
    .first()
    .locator("span");
  await lastPlayedGameInfo.click();

  await waitAndCloseOneGameReport(page);
});
