import { test, expect } from "@playwright/test";
import { playGame, testCheckLoginSuccess, testGameBoardVisible, testLogIn, waitAndCloseOneGameReport } from "./commons/methods";
import { pageUrl, ekaUser, tokaUser, vikaUser } from "./commons/testvariables";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({page}) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PromiseWeb/);
});

test("Play game as creator Eka", async ({ page }) => {
  const currentUser = ekaUser;
  const myName = currentUser.name;

  try {
    await testLogIn(page, ekaUser);
    await testCheckLoginSuccess(page);

    const createGameAccordionButton = page.locator("button", {hasText: "Create New Game"});
    await createGameAccordionButton.click();
    const createGameButton = page.locator("button", {hasText: "Create Game"});
    await expect(createGameButton).toBeVisible();
    await expect(createGameButton).toBeEnabled();

    // rounds
    await page.selectOption("[label='Start round of the game']", "6");
    await page.selectOption("[label='Turn round of the game']", "5");
    await page.selectOption("[label='End round of the game']", "6");

    // rules
    await page.locator("input[data-tip='thisIsDemoGame']").check();
    await createGameButton.click();

    await expect(page.locator("li", {hasText: ekaUser.name})).toHaveCount(1);
    console.log("Eka created game");

    const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${ekaUser.name}`});
    const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${ekaUser.name}`});

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeDisabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeEnabled();

    console.log(`${myName} buttons ok`);

    // should be game visible game board
    // const leaveOngoingGameButton = await testGameBoardVisible(page);
    await testGameBoardVisible(page);
    console.log(`${myName} visible game board`);

    const roundsInGame = await page.locator(".prHead").count();
    console.log(`${myName} rounds in game ${roundsInGame}`);

    await playGame(page, roundsInGame);

    await waitAndCloseOneGameReport(page);

    // await leaveOngoingGameButton.click();

    // await confirmLeavingOnGoingGame(page);
  } catch (e) {
    await page.screenshot({ path: `playwright-images/screenshot_${myName}.png`, fullPage: true });
    throw e;
  }
});

test("Play game as Toka", async ({ page }) => {
  const creatorUser = ekaUser;
  const currentUser = tokaUser;
  const myName = currentUser.name;

  try {
    await testLogIn(page, currentUser);
    await testCheckLoginSuccess(page);

    const createGameAccordionButton = page.locator("button", {hasText: "Open Games"});
    await createGameAccordionButton.click();

    await expect(page.locator("li", {hasText: creatorUser.name})).toHaveCount(1);

    const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${creatorUser.name}`});
    const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${creatorUser.name}`});

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeEnabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeDisabled();

    console.log(`${myName} buttons ok`);

    // Toka joins second
    await joinGameButton.click();

    // should be game visible game board
    // const leaveOngoingGameButton = await testGameBoardVisible(page);
    await testGameBoardVisible(page);
    console.log(`${myName} visible game board`);

    const roundsInGame = await page.locator(".prHead").count();
    console.log(`${myName} rounds in game ${roundsInGame}`);

    await playGame(page, roundsInGame);

    await waitAndCloseOneGameReport(page);

    // await expect(page.getByText(`${ekaUser.name} has left the game!`)).toHaveCount(1);
    // await leaveOngoingGameButton.click();

    // await confirmLeavingOnGoingGame(page);
  } catch (e) {
    await page.screenshot({ path: `playwright-images/screenshot_${myName}.png`, fullPage: true });
    throw e;
  }
});

test("Play game as Vika", async ({ page }) => {
  const creatorUser = ekaUser;
  const currentUser = vikaUser;
  const myName = currentUser.name;

  try {
    await testLogIn(page, currentUser);
    await testCheckLoginSuccess(page);

    const createGameAccordionButton = page.locator("button", {hasText: "Open Games"});
    await createGameAccordionButton.click();

    await expect(page.locator("li", {hasText: creatorUser.name})).toHaveCount(1);

    const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${creatorUser.name}`});
    const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${creatorUser.name}`});

    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeEnabled();

    await expect(leaveGameButton).toBeVisible();
    await expect(leaveGameButton).toBeDisabled();

    console.log(`${myName} buttons ok`);

    // Vika joins last, wait until Toka has joined
    await expect(page.locator("li", {hasText: tokaUser.name})).toHaveCount(1);

    await joinGameButton.click();

    // should be game visible game board
    // const leaveOngoingGameButton = await testGameBoardVisible(page);
    await testGameBoardVisible(page);
    console.log(`${myName} visible game board`);

    const roundsInGame = await page.locator(".prHead").count();
    console.log(`${myName} rounds in game ${roundsInGame}`);

    await playGame(page, roundsInGame);

    await waitAndCloseOneGameReport(page);

    // await expect(page.getByText(`${tokaUser.name} has left the game!`)).toHaveCount(1);
    // await leaveOngoingGameButton.click();

    // await confirmLeavingOnGoingGame(page);
  } catch (e) {
    await page.screenshot({ path: `playwright-images/screenshot_${myName}.png`, fullPage: true });
    throw e;
  }
});
