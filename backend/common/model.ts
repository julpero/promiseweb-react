import { IGameOptions, IHumanPlayer } from "../interfaces/IGameOptions";
import { RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import { IRules } from "../../frontend/src/interfaces/IuiGameList";

export const playersToArr = (players: IHumanPlayer[]): string[] => {
  const playerArr: string[] = players.map(player => player.name);

  return playerArr;
};

const rulesToArr = (gameOptions: IGameOptions): RULE[] => {
  const rulesArr: RULE[] = [];

  if (!gameOptions.evenPromisesAllowed) rulesArr.push(RULE.noEvenPromisesAllowed);
  if (!gameOptions.visiblePromiseRound) rulesArr.push(RULE.hiddenPromiseRound);
  if (gameOptions.onlyTotalPromise) rulesArr.push(RULE.onlyTotalPromise);
  if (!gameOptions.freeTrump) rulesArr.push(RULE.mustPlayTrump);
  if (gameOptions.hiddenTrump) rulesArr.push(RULE.hiddenTrump);
  if (gameOptions.speedPromise) rulesArr.push(RULE.speedPromise);
  if (gameOptions.privateSpeedGame) rulesArr.push(RULE.privateSpeedGame);
  if (gameOptions.opponentPromiseCardValue) rulesArr.push(RULE.opponentPromiseCardValue);
  if (gameOptions.opponentGameCardValue) rulesArr.push(RULE.opponentGameCardValue);

  return rulesArr;
};

export const rulesToRuleObj = (gameOptions: IGameOptions): IRules => {
  return {
    ruleList: rulesToArr(gameOptions),
    hiddenCardsMode: gameOptions.hiddenCardsMode,
    roundInfo: {
      startRound: gameOptions.startRound,
      turnRound: gameOptions.turnRound,
      endRound: gameOptions.endRound,
    }
  } as IRules;
};

export const isRuleActive = (gameOptions: IGameOptions, rule: RULE): boolean => {
  switch (rule) {
    case RULE.noEvenPromisesAllowed: {
      return !gameOptions.evenPromisesAllowed;
    }
    case RULE.hiddenPromiseRound: {
      return !gameOptions.visiblePromiseRound;
    }
    case RULE.onlyTotalPromise: {
      return gameOptions.onlyTotalPromise;
    }
    case RULE.mustPlayTrump: {
      return !gameOptions.freeTrump;
    }
    case RULE.hiddenTrump: {
      return gameOptions.hiddenTrump;
    }
    case RULE.speedPromise: {
      return gameOptions.speedPromise;
    }
    case RULE.privateSpeedGame: {
      return gameOptions.privateSpeedGame;
    }
    case RULE.opponentPromiseCardValue: {
      return gameOptions.opponentPromiseCardValue;
    }
    case RULE.opponentGameCardValue: {
      return gameOptions.opponentGameCardValue;
    }
    default: return false;
  }
};

/*
export const rulesToArr = (gameOptions: IGameOptions): string[] => {
  const rulesArr: string[] = [];
  if (!gameOptions.evenPromisesAllowed) rulesArr.push("No even promises");
  if (!gameOptions.visiblePromiseRound) rulesArr.push("Hidden promise round");
  if (gameOptions.onlyTotalPromise) rulesArr.push("Show only total promise");
  if (!gameOptions.freeTrump) rulesArr.push("Must play trump");
  if (gameOptions.hiddenTrump) rulesArr.push("Hidden trump when promising");
  if (gameOptions.speedPromise) rulesArr.push("Speed promise round");
  if (gameOptions.privateSpeedGame) rulesArr.push("Speed game");
  if (gameOptions.opponentPromiseCardValue) rulesArr.push("Hand");

  return rulesArr;
}
*/
