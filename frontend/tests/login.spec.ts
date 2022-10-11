import { test, expect } from "@playwright/test";
import { userInDatabase } from "./commons/testvariables";
import { textsLogIn } from "./commons/texts";

test.beforeEach(async ({page}) => {
  await page.goto("https://promiseweb.azurewebsites.net/");
});

test("Login with falsy and correct passwords and logout", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);

  const userNameField = page.getByPlaceholder("(Nick)Name", { exact: true });
  await userNameField.fill(userInDatabase.name);

  const password1Field = page.getByPlaceholder("Password", { exact: true });
  await password1Field.fill(userInDatabase.falsyPass);

  // Log In / Register -button
  const logInButton = page.locator("button", {hasText: /Log In/});
  await logInButton.click();

  await expect(page.locator(".smallErrorDiv")).toHaveText(textsLogIn.error4);

  await password1Field.fill(userInDatabase.pass);
  await logInButton.click();

  const logOutButton = page.locator("button", {hasText: /Log Out/});
  expect(await logOutButton.isVisible()).toBeTruthy();
  expect(await logInButton.isVisible()).toBeTruthy();
  await logOutButton.click();

});
