import { expect, Locator, Page } from "@playwright/test";
import { timeOut } from "./constants";
import { ITUser } from "./testvariables";
import { buttonText, notificationText } from "./texts";

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

export const confirmLeavingOnGoingGame = async (page: Page, awaitFirst?: string) => {
  const confirmLeavingButton = page.locator("button", {hasText: buttonText.confirmLeaveOnGoingGame});
  await expect(confirmLeavingButton).toBeVisible();
  await expect(confirmLeavingButton).toBeEnabled();

  if (awaitFirst) {
    await expect(page.getByText(`${awaitFirst} has left the game!`)).toHaveCount(1);
  }
  await confirmLeavingButton.click();

  await expect(page.getByText(notificationText.leavedGame)).toHaveCount(1);
};

// const openOpenGamesList = async (page: Page, creatorUser: ITUser) => {
//   try {
//     const createGameAccordionButton = page.locator("button", {hasText: /Open Games/});
//     await createGameAccordionButton.click();

//     try {
//       await expect(page.locator("li", {hasText: creatorUser.name})).toHaveCount(1);
//     } catch {
//       // maybe we just closed the accordion?
//       // try again
//       await createGameAccordionButton.click();
//       await expect(page.locator("li", {hasText: creatorUser.name})).toHaveCount(1);
//     }

//   } catch (e) {
//     throw e;
//   }
// };

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
