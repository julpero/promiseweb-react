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

export const makePromise = async (page: Page): Promise<number> => {
  // this wont work if do not allow even promises rule is active
  const promiseButtons = await page.$$(".promiseButton > button");
  const selectedPromise = randomInteger(0, promiseButtons.length);
  await page.locator(".promiseButton > button", {hasText: selectedPromise.toString()}).click();
  return selectedPromise;
};
