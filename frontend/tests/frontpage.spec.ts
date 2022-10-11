import { test, expect } from "@playwright/test";
import { userNotInDatabase } from "./commons/testvariables";
import { textsLogIn } from "./commons/texts";

test.beforeEach(async ({page}) => {
  await page.goto("https://promiseweb.azurewebsites.net/");
});

test("homepage has PromiseWeb in title and Log In button works with new user", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);

  // Log In / Register -button
  const logInButton = page.locator("button", {hasText: /Log In/});
  await logInButton.click();

  // expect there is error on the screen
  await expect(page.locator(".text-danger")).toHaveText(textsLogIn.error1);

  const userNameField = page.getByPlaceholder("(Nick)Name", { exact: true });
  await userNameField.fill(userNotInDatabase.name);

  await logInButton.click();
  await expect(page.locator(".text-danger")).not.toHaveText(textsLogIn.error1);
  await expect(page.locator(".text-danger")).toHaveText(textsLogIn.error2);

  const password1Field = page.getByPlaceholder("Password", { exact: true });
  await password1Field.fill(userNotInDatabase.pass);
  await logInButton.click();
  await expect(page.locator(".smallErrorDiv")).toHaveText(textsLogIn.error3);
});

test("ping page", async ({request}) => {
  const pingPage = await request.get("https://promiseweb.azurewebsites.net/ping?ver=1");
  expect(pingPage.ok()).toBeTruthy();
  expect((await pingPage.text()).includes("v16.")).toBeTruthy();
});
