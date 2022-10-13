import { test, expect } from "@playwright/test";
import { testCheckLoginSuccess, testLogIn } from "./commons/methods";
import { pageUrl, userInDatabase } from "./commons/testvariables";

test("Create and dismiss game", async ({ page }) => {
  await page.goto(pageUrl);

  await testLogIn(page, userInDatabase);

  await testCheckLoginSuccess(page);

  const createGameAccordionButton = page.locator("button", {hasText: /Create New Game/});
  await createGameAccordionButton.click();
  const createGameButton = page.locator("button", {hasText: /Create Game/});
  await expect(createGameButton).toBeVisible();
  await expect(createGameButton).toBeEnabled();

  // rules
  await page.locator("input[data-tip='noEvenPromises']").check();
  await page.locator("input[data-tip='hidePromiseRound']").check();
  await page.locator("input[data-tip='opponentPromiseCardValue']").check();
  await page.locator("input[data-tip='opponentGameCardValue']").check();
  await page.locator("input[data-tip='thisIsDemoGame']").check();

  await createGameButton.click();

  // await expect(page.locator("li", {hasText: "no even promises"})).toHaveCount(1);
  // await expect(page.locator("li", {hasText: "hidden promise round"})).toHaveCount(1);
  // await expect(page.locator("li", {hasText: "show opponent hand value when promising"})).toHaveCount(1);
  // await expect(page.locator("li", {hasText: "show opponent hand value in game"})).toHaveCount(1);

  await expect(page.locator("li", {hasText: userInDatabase.name})).toHaveCount(1);

  const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${userInDatabase.name}`});
  const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${userInDatabase.name}`});

  await expect(joinGameButton).toBeVisible();
  await expect(joinGameButton).toBeDisabled();

  await expect(leaveGameButton).toBeVisible();
  await expect(leaveGameButton).toBeEnabled();

  await leaveGameButton.click();

  await expect(page.getByText("No open games at the moment, why don't you just create one by your self?")).toHaveCount(1);
});
