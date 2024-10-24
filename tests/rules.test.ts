import { rulesOk } from "../backend/actions/createGame";
import { IuiCreateGameRequest } from "../frontend/src/interfaces/IuiNewGame";

describe("testing rule set", () => {
  const validRuleSet: IuiCreateGameRequest = {
    newGameHumanPlayersCount: "3",
    newGameStartRound: "10",
    newGameTurnRound: "1",
    newGameEndRound: "10",
    noEvenPromises: false,
    hidePromiseRound: false,
    onlyTotalPromise: false,
    mustTrump: false,
    hiddenTrump: false,
    speedPromise: false,
    privateSpeedGame: false,
    hiddenCardsMode: "0",
    opponentPromiseCardValue: false,
    opponentGameCardValue: false,
    bonusNonEvenPromise: false,
    rePromise: false,
    hiddenRePromise: false,
    thisIsDemoGame: false,
    newGamePassword: "",
    userName: "",
    uuid: "",
    token: "",
  };

  const validRuleSet_rePromise: IuiCreateGameRequest = {
    newGameHumanPlayersCount: "3",
    newGameStartRound: "10",
    newGameTurnRound: "1",
    newGameEndRound: "10",
    noEvenPromises: false,
    hidePromiseRound: false,
    onlyTotalPromise: false,
    mustTrump: false,
    hiddenTrump: false,
    speedPromise: false,
    privateSpeedGame: false,
    hiddenCardsMode: "0",
    opponentPromiseCardValue: false,
    opponentGameCardValue: false,
    bonusNonEvenPromise: false,
    rePromise: true,
    hiddenRePromise: false,
    thisIsDemoGame: false,
    newGamePassword: "",
    userName: "",
    uuid: "",
    token: "",
  };

  const invalidRuleSet: IuiCreateGameRequest = {
    newGameHumanPlayersCount: "3",
    newGameStartRound: "10",
    newGameTurnRound: "1",
    newGameEndRound: "10",
    noEvenPromises: false,
    hidePromiseRound: false,
    onlyTotalPromise: false,
    mustTrump: false,
    hiddenTrump: false,
    speedPromise: false,
    privateSpeedGame: false,
    hiddenCardsMode: "0",
    opponentPromiseCardValue: false,
    opponentGameCardValue: false,
    bonusNonEvenPromise: false,
    rePromise: true,
    hiddenRePromise: true,
    thisIsDemoGame: false,
    newGamePassword: "",
    userName: "",
    uuid: "",
    token: "",
  };

  test("rulesOk", () => {
    expect(rulesOk(validRuleSet)).toBeTruthy();
    expect(rulesOk(validRuleSet_rePromise)).toBeTruthy();
    expect(rulesOk(invalidRuleSet)).toBeFalsy();
  });
});
