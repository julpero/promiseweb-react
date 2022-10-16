import { test, expect } from "@playwright/test";
import { pageUrl, userInDatabase } from "./commons/testvariables";
import { textsLogIn } from "./commons/texts";

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);
});

test("Login with falsy and correct passwords and logout", async ({ page }) => {
  // Log In / Register -button
  const logInButton = page.locator("button", {hasText: /Log In/});
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeEnabled();

  const userNameField = page.getByPlaceholder("(Nick)Name", { exact: true });
  await userNameField.fill(userInDatabase.name);

  const password1Field = page.getByPlaceholder("Password", { exact: true });
  await password1Field.fill(userInDatabase.falsyPass);

  await logInButton.click();

  await expect(page.locator(".smallErrorDiv")).toHaveText(textsLogIn.error4);

  await password1Field.fill(userInDatabase.pass);
  await logInButton.click();

  const logOutButton = page.locator("button", {hasText: /Log Out/});
  await expect(logOutButton).toBeVisible();
  await expect(logOutButton).toBeEnabled();

  await logOutButton.click();

  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeEnabled();
});
