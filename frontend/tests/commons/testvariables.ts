// export const pageUrl = "https://promiseweb.azurewebsites.net/";
// export const pageUrl = process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000/";
export const pageUrl = process.env.PLAYWRIGHT_TEST_BASE_URL ?? "https://promiseweb.azurewebsites.net/";

export interface ITUser {
  name: string,
  pass: string,
  falsyPass?: string,
}

export const userNotInDatabase: ITUser = {
  name: "unknown user",
  pass: "jflDJjhblf38djfd",
};

export const userInDatabase: ITUser = {
  name: "known user",
  pass: "sfs8jssJH",
  falsyPass: "dsd87ojlhjr",
};

export const ekaUser: ITUser = {
  name: "Eka",
  pass: "1EkaPass",
};

export const tokaUser: ITUser = {
  name: "Toka",
  pass: "2TokaPass",
};

export const vikaUser: ITUser = {
  name: "Vika",
  pass: "3VikaPass",
};

export const gameVariables = {
  start: "6",
  turn: "5",
  end: "6",
  hidePromiseRound: false,
  onlyTotalPromise: false,
};
