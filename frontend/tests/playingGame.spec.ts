import { test, expect } from "@playwright/test";
import { testCheckLoginSuccess, testLogIn } from "./commons/methods";
import { pageUrl, ekaUser, tokaUser, vikaUser } from "./commons/testvariables";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);
});

test("Play game as creator Eka", async ({ page }) => {
  await testLogIn(page, ekaUser);
  await testCheckLoginSuccess(page);
});

test("Play game as Toka", async ({ page }) => {
  await testLogIn(page, tokaUser);
  await testCheckLoginSuccess(page);
});

test("Play game as Vika", async ({ page }) => {
  await testLogIn(page, vikaUser);
  await testCheckLoginSuccess(page);
});
