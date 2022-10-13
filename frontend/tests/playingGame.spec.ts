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
  try {
    await testLogIn(page, ekaUser);
    await testCheckLoginSuccess(page);

    const createGameAccordionButton = page.locator("button", {hasText: /Create New Game/});
    await createGameAccordionButton.click();
    const createGameButton = page.locator("button", {hasText: /Create Game/});
    await expect(createGameButton).toBeVisible();
    await expect(createGameButton).toBeEnabled();

    // rules
    await page.locator("input[data-tip='thisIsDemoGame']").check();
    await createGameButton.click();

    await expect(page.locator("li", {hasText: ekaUser.name})).toHaveCount(1);

    const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${ekaUser.name}`});
    const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${ekaUser.name}`});

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeDisabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeEnabled();

    await expect(page.locator("li", {hasText: tokaUser.name})).toHaveCount(1);
    await expect(page.locator("li", {hasText: vikaUser.name})).toHaveCount(1);

    await leaveGameButton.click();

    await expect(page.getByText("No open games at the moment, why don't you just create one by your self?")).toHaveCount(1);
  } catch (e) {
    await page.screenshot({ path: "playwright-images/screenshot_eka.png", fullPage: true });
    throw e;
  }
});

test("Play game as Toka", async ({ page }) => {
  try {
    await testLogIn(page, tokaUser);
    await testCheckLoginSuccess(page);

    const createGameAccordionButton = page.locator("button", {hasText: /Open Games/});
    await createGameAccordionButton.click();

    await expect(page.locator("li", {hasText: ekaUser.name})).toHaveCount(1);

    const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${ekaUser.name}`});
    const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${ekaUser.name}`});

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeEnabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeDisabled();

    await joinGameButton.click();

    await expect(page.locator("li", {hasText: tokaUser.name})).toHaveCount(1);

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeDisabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeEnabled();

    await leaveGameButton.click();

    await expect(page.getByText("No open games at the moment, why don't you just create one by your self?")).toHaveCount(1);
  } catch (e) {
    await page.screenshot({ path: "playwright-images/screenshot_toka.png", fullPage: true });
    throw e;
  }
});

test("Play game as Vika", async ({ page }) => {
  try {
    await testLogIn(page, vikaUser);
    await testCheckLoginSuccess(page);

    const createGameAccordionButton = page.locator("button", {hasText: /Open Games/});
    await createGameAccordionButton.click();

    await expect(page.locator("li", {hasText: ekaUser.name})).toHaveCount(1);

    const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${ekaUser.name}`});
    const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${ekaUser.name}`});

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeEnabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeDisabled();

    await joinGameButton.click();

    await expect(page.locator("li", {hasText: vikaUser.name})).toHaveCount(1);

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeDisabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeEnabled();

    await leaveGameButton.click();

    await expect(page.getByText("No open games at the moment, why don't you just create one by your self?")).toHaveCount(1);
  } catch (e) {
    await page.screenshot({ path: "playwright-images/screenshot_vika.png", fullPage: true });
    throw e;
  }
});
