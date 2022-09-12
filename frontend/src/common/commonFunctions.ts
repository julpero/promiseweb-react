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

export const increase_brightness = (hex: string, percent: number): string => {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length === 3){
    hex = hex.replace(/(.)/g, "$1$1");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return "#" +
     ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substring(1) +
     ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substring(1) +
     ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substring(1);
};
