import { expect, Locator, Page } from "@playwright/test";
import { timeOut } from "./constants";
import { ITUser } from "./testvariables";
import { buttonText, notificationText } from "./texts";

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const testLogIn = async (page: Page, user: ITUser, falsy?: boolean) => {
  const logInButton = page.locator("button", {hasText: /Log In/});
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeEnabled();

  const userNameField = page.getByPlaceholder("(Nick)Name", { exact: true });
  const password1Field = page.getByPlaceholder("Password", { exact: true });
  await userNameField.fill(user.name);
  await password1Field.fill(falsy && user.falsyPass ? user.falsyPass : user.pass);
  await logInButton.click();
};

export const testCheckLoginSuccess = async (page: Page) => {
  const logOutButton = page.locator("button", {hasText: /Log Out/});
  await expect(logOutButton).toBeVisible();
  await expect(logOutButton).toBeEnabled();
};

export const testGameBoardVisible = async (page: Page): Promise<Locator> => {
  const leaveOngoingGameButton = page.locator("button", {hasText: buttonText.leaveOnGoingGame});
  await expect(leaveOngoingGameButton).toBeVisible({timeout: timeOut.eternity});
  await expect(leaveOngoingGameButton).toBeEnabled();
  const headers = page.locator(".prHead");
  await expect(headers.first()).toBeVisible({timeout: timeOut.eternity});
  return leaveOngoingGameButton;
};

export const confirmLeavingOnGoingGame = async (page: Page) => {
  const confirmLeavingButton = page.locator("button", {hasText: buttonText.confirmLeaveOnGoingGame});
  await expect(confirmLeavingButton).toBeVisible();
  await expect(confirmLeavingButton).toBeEnabled();

  await confirmLeavingButton.click();

  await expect(page.getByText(notificationText.leavedGame)).toHaveCount(1);
};

export const joinGame = async (page: Page, currentUser: ITUser, creatorUser: ITUser) => {
  // await openOpenGamesList(page, creatorUser);

  const joinGameButton = page.locator("button", {hasText: `JOIN GAME - created by ${creatorUser.name}`});
  const leaveGameButton = page.locator("button", {hasText: `LEAVE GAME - created by ${creatorUser.name}`});

  await expect(joinGameButton).toBeVisible();
  await expect(joinGameButton).toBeEnabled();

  await expect(leaveGameButton).toBeVisible();
  await expect(leaveGameButton).toBeDisabled();

  await joinGameButton.click();

  try {
    // possible error -> retry
    const closeErrorButton = page.locator("button", {hasText: "Close"});
    await expect(closeErrorButton).toBeVisible();
    await expect(closeErrorButton).toBeEnabled();
    closeErrorButton.click();
    await expect(joinGameButton).toBeVisible();
    await expect(joinGameButton).toBeEnabled();
    await joinGameButton.click();
  } catch (e) {
    // all ok, do nothing
  }
};

export const getCardCountInRound = async (page: Page): Promise<number> => {
  // first wait until promise buttons are visible
  await page.waitForSelector(".promiseButton > button >>text='0'", {timeout: timeOut.eternity});
  return await page.locator(".promiseButton > button").count() - 1;
};


const makePromise = async (page: Page, cardsInRound: number, name: string): Promise<number> => {
  // this wont work if do not allow even promises rule is active
  const selectedPromise = randomInteger(0, cardsInRound);
  console.log(`${name} selected promise ${selectedPromise}`);
  await page.locator(".promiseButton > button", { hasText: selectedPromise.toString() }).first().click({ timeout: timeOut.eternity });
  return selectedPromise;
};

const playAnyCard = async (page: Page, name: string) => {
  const playableCards = page.locator(".playableCard");
  await expect(playableCards.first()).toBeVisible({timeout: timeOut.eternity});
  const playableCardsCount = await playableCards.count();
  const playCardNbr = randomInteger(0,  playableCardsCount - 1);
  await page.locator(".playableCard").nth(playCardNbr).click({timeout: timeOut.eternity});
  console.log(`${name} played card ${playCardNbr}`);
};

const playRoundCards = async (page: Page, cardsInRound: number, name: string) => {
  for (let i = 0; i < cardsInRound; i++) {
    await playAnyCard(page, name);
    if (i < cardsInRound - 1) {
      await expect(page.locator(".cardWonCol > .cardCol")).toHaveCount(i+1, {timeout: timeOut.eternity});
    }
  }
};

const playRound = async (page: Page, cardsInRound: number, name: string) => {
  await makePromise(page, cardsInRound, name);
  await playRoundCards(page, cardsInRound, name);
};

const checkNameHover = async (page: Page) => {
  console.log("checking score board header hover");
  const popUp = page.locator("#scoreBoardThTooltip");
  await page.locator("#scoretableArea > table > thead > tr > td:first-child").hover();
  await expect(popUp).toBeVisible({ timeout: timeOut.long });
  console.log("checked score board header hover");
};

const checkPromisesHeaderHover = async (page: Page) => {
  console.log("checking promises table header hover");
  const popUp = page.locator("#promisesThTooltip");
  await page.locator("#promisetableArea > table > thead > tr:first-child > th.tableHeading.prHead").first().hover();
  await expect(popUp).toBeVisible({ timeout: timeOut.long });
  console.log("checked promises table header hover");
};

const checkPointsHover = async (page: Page) => {
  console.log("checking score board points hover");
  const popUp = page.locator("#scoreBoardAvgTooltip", {hasText: "Round"});
  await page.locator("#scoretableArea > table > tbody > tr:first-child > td:first-child").hover();
  await expect(popUp).toBeVisible({ timeout: timeOut.long });
  console.log("checked score board points hover");
};

const checkPromisesHover = async (page: Page) => {
  console.log("checking promises table hover");
  const popUp = page.locator("#promisesTdTooltip");
  await page.locator("#promisetableArea > table > tbody > tr:first-child > td.tableCell").first().hover();
  await expect(popUp).toBeVisible({ timeout: timeOut.long });
  console.log("checked promises table hover");
};

export const playGame = async (page: Page, roundsInGame: number, name: string) => {
  for (let i = 0; i < roundsInGame; i++) {
    console.log(`${name} start round ${i+1}`);
    if (i === 0) {
      await checkNameHover(page);
    }
    const cardsInRound = await getCardCountInRound(page);
    if (i === 1) {
      await checkPointsHover(page);
      await checkPromisesHeaderHover(page);
      await checkPromisesHover(page);
    }
    await playRound(page, cardsInRound, name);
    console.log(`${name} round ${i+1} played`);
  }
};

export const waitAndCloseOneGameReport = async (page: Page) => {
  const closeButton = page.locator("button", {hasText: "Close Report"});
  await expect(closeButton).toBeVisible({ timeout: timeOut.eternity });
  await expect(closeButton).toBeEnabled({ timeout: timeOut.eternity });
  await closeButton.click();
};
