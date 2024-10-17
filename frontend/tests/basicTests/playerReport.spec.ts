import { test, expect } from "@playwright/test";
import { pageUrl, userInDatabase } from "../commons/testvariables";
import { testCheckLoginSuccess, testLogIn } from '../commons/methods';

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);
});

test("homepage has Player report table and clicking it opens player report", async ({ page }) => {
  await expect(page).toHaveTitle(/PromiseWeb/);

  await testLogIn(page, userInDatabase);

  await testCheckLoginSuccess(page);

  const playerReportTableLocator = page.locator(".tabulator");
  await expect(playerReportTableLocator).toHaveCount(1);

  const playerReportTableRowLocator = page.locator(".tabulator-row");
  expect(await (playerReportTableRowLocator.count())).toBeGreaterThanOrEqual(3);

  await playerReportTableRowLocator.first().click();

  await expect(page.locator("div.modal-title.h4", {hasText: /Player Report/})).toHaveCount(1);
  await expect(page.locator("div.modal-body > div > h6", {hasText: /Total/})).toHaveCount(1);

  const closeButton = page.locator("div.modal-footer > button", {hasText: /CLOSE/});
  await expect(closeButton).toBeVisible();
  await expect(closeButton).toBeEnabled();

  await closeButton.click();
  // await expect(page).toHaveTitle(/juuupajuu/, {timeout: timeOut.common});
});
