import { ICard, IGameOptions, IHumanPlayer } from "../interfaces/IGameOptions";
import { RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiRules } from "../../frontend/src/interfaces/IuiGameList";
import { IuiCard } from "../../frontend/src/interfaces/IuiPlayingGame";
import { IGameForList } from "../dbActions/games";

export const playersToArr = (players: IHumanPlayer[]): string[] => {
  const playerArr: string[] = players.map(player => player.name);

  return playerArr;
};

const rulesToArr = (gameOptions: IGameOptions | IGameForList): RULE[] => {
  const rulesArr: RULE[] = [];

  if (gameOptions.evenPromisesAllowed === false) rulesArr.push(RULE.noEvenPromisesAllowed);
  if (gameOptions.visiblePromiseRound === false) rulesArr.push(RULE.hiddenPromiseRound);
  if (gameOptions.onlyTotalPromise === true) rulesArr.push(RULE.onlyTotalPromise);
  if (gameOptions.freeTrump === false) rulesArr.push(RULE.mustPlayTrump);
  if (gameOptions.hiddenTrump === true) rulesArr.push(RULE.hiddenTrump);
  if (gameOptions.speedPromise === true) rulesArr.push(RULE.speedPromise);
  if (gameOptions.privateSpeedGame === true) rulesArr.push(RULE.privateSpeedGame);
  if (gameOptions.opponentPromiseCardValue === true) rulesArr.push(RULE.opponentPromiseCardValue);
  if (gameOptions.opponentGameCardValue === true) rulesArr.push(RULE.opponentGameCardValue);
  if (gameOptions.bonusNonEvenPromise === true) rulesArr.push(RULE.bonusNonEvenPromise);
  if (gameOptions.rePromise === true) rulesArr.push(RULE.rePromise);
  if (gameOptions.hiddenRePromise === true) rulesArr.push(RULE.hiddenRePromise);

  return rulesArr;
};

export const rulesToRuleObj = (gameOptions: IGameOptions | IGameForList): IuiRules => {
  return {
    ruleList: rulesToArr(gameOptions),
    hiddenCardsMode: gameOptions.hiddenCardsMode,
    roundInfo: {
      startRound: gameOptions.startRound,
      turnRound: gameOptions.turnRound,
      endRound: gameOptions.endRound,
    }
  } as IuiRules;
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
    case RULE.bonusNonEvenPromise: {
      return gameOptions.bonusNonEvenPromise;
    }
    case RULE.rePromise: {
      return gameOptions.rePromise;
    }
    case RULE.hiddenRePromise: {
      return gameOptions.hiddenRePromise;
    }
    default: return false;
  }
};

export const ICardToIuiCard = (card: ICard): IuiCard => {
  return {
    suite: card.suite,
    rank: card.rank,
    value: card.value,
  } as IuiCard;
};

export const IuiCardToICard = (card: IuiCard): ICard => {
  return {
    suite: card.suite,
    rank: card.rank,
    value: card.value,
  } as ICard;
};
