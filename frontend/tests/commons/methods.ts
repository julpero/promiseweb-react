import { expect, Page } from "@playwright/test";
import { ITUser } from "./testvariables";

export const testLogIn = async(page: Page, user: ITUser, falsy?: boolean) => {
  const logInButton = page.locator("button", {hasText: /Log In/});
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toBeEnabled();

  const userNameField = page.getByPlaceholder("(Nick)Name", { exact: true });
  const password1Field = page.getByPlaceholder("Password", { exact: true });
  await userNameField.fill(user.name);
  await password1Field.fill(falsy && user.falsyPass ? user.falsyPass : user.pass);
  await logInButton.click();
};
