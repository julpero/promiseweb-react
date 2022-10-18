import { test, expect } from "@playwright/test";
import { testLogIn } from "./commons/methods";
import { pageUrl, userInDatabase } from "./commons/testvariables";
import { textsLogIn } from "./commons/texts";

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);
});

test("Login with falsy and correct passwords and logout", async ({ page }) => {
  await testLogIn(page, userInDatabase, true);

  await expect(page.locator(".smallErrorDiv")).toHaveText(textsLogIn.error4);

  await testLogIn(page, userInDatabase);

  const logOutButton = page.locator("button", {hasText: /Log Out/});
  await expect(logOutButton).toBeVisible();
  await expect(logOutButton).toBeEnabled();

  await logOutButton.click();

  const logInButton = page.locator("button", {hasText: /Log In/});
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeEnabled();
});
