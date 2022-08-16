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
