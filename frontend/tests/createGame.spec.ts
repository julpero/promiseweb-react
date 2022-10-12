import { test, expect } from "@playwright/test";
import { pageUrl, userInDatabase } from "./commons/testvariables";

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);

  // Log In / Register -button
  const logInButton = page.locator("button", {hasText: /Log In/});
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeEnabled();

  const userNameField = page.getByPlaceholder("(Nick)Name", { exact: true });
  const password1Field = page.getByPlaceholder("Password", { exact: true });
  await userNameField.fill(userInDatabase.name);
  await password1Field.fill(userInDatabase.pass);
  await logInButton.click();

  const logOutButton = page.locator("button", {hasText: /Log Out/});
  await expect(logOutButton).toBeVisible();
  await expect(logOutButton).toBeEnabled();
});

test("Create and dismiss game", async ({ page }) => {
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

  await expect(page.locator("li", {hasText: "no even promises"})).toHaveCount(1);
  await expect(page.locator("li", {hasText: "hidden promise round"})).toHaveCount(1);
  await expect(page.locator("li", {hasText: "show opponent hand value when promising"})).toHaveCount(1);
  await expect(page.locator("li", {hasText: "show opponent hand value in game"})).toHaveCount(1);

  await expect(page.locator("li", {hasText: userInDatabase.name})).toHaveCount(1);
  await expect(page.locator("li", {hasText: "[ ]"})).toHaveCount(2);

  const joinGameButton = page.locator("button", {hasText: /JOIN GAME/});
  const leaveGameButton = page.locator("button", {hasText: /LEAVE GAME/});

  await expect(joinGameButton).toBeVisible();
  await expect(joinGameButton).toBeDisabled();

  await expect(leaveGameButton).toBeVisible();
  await expect(leaveGameButton).toBeEnabled();

  await leaveGameButton.click();

  await expect(page.getByText("No open games at the moment, why don't you just create one by your self?")).toHaveCount(1);
});
