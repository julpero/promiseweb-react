import { IuiRules } from "../interfaces/IuiGameList";
import { RULE } from "../interfaces/IuiGameOptions";
import { IuiCard } from "../interfaces/IuiPlayingGame";

const suiteToUnicode = (suite: string) => {
  switch (suite) {
    case "clubs": return "\u2663";
    case "hearts": return "\u2665";
    case "spades": return "\u2660";
    case "diamonds": return "\u2666";
    default: return "";
  }
};

/**
 *
 * @param card
 * @returns string having suite as unicode
 */
export const cardToString = (card: IuiCard): string => {
  return card.rank + " " + suiteToUnicode(card.suite);
};

/**
 *
 * @param card
 * @returns string having suite as string
 */
export const cardAsString = (card: IuiCard): string => {
  return card.suite + card.rank;
};

export const isRuleActive = (rules: IuiRules, checkRule: RULE): boolean => {
  switch (checkRule) {
    case RULE.noEvenPromisesAllowed:
    case RULE.hiddenPromiseRound:
    case RULE.mustPlayTrump:
    case RULE.onlyTotalPromise:
    case RULE.hiddenTrump:
    case RULE.speedPromise:
    case RULE.privateSpeedGame:
    case RULE.opponentPromiseCardValue:
    case RULE.opponentGameCardValue: {
      return rules.ruleList.some(rule => rule === checkRule);
    }
    default: return false;
  }
};

export const randomNegToPos = (max: number): number => {
  return Math.floor(Math.random() * (2*max)) - max;
};

export const colorize = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 3) - hash));
  const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
  return "#" + Array(6 - color.length + 1).join("0") + color;
};
