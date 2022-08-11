import { RULE, HIDDEN_CARDS_MODE } from "../interfaces/IGameOptions";

export const ruleToStr = (rule: RULE): string => {
  switch (rule) {
    case RULE.noEvenPromisesAllowed: return "no even promises";
    case RULE.hiddenPromiseRound: return "hidden promise round";
    case RULE.onlyTotalPromise: return "show only total promise";
    case RULE.mustPlayTrump: return "must play trump";
    case RULE.hiddenTrump: return "hidden trump when promising";
    case RULE.speedPromise: return "speed promise round";
    case RULE.privateSpeedGame: return "speed game";
    case RULE.opponentPromiseCardValue: return "show opponent hand value when promising";
    case RULE.opponentGameCardValue: return "show opponent hand value in game";
    default: return "unknown rule";
  }
};

export const hiddenCardsModeToStr = (mode: HIDDEN_CARDS_MODE) => {
  switch (mode) {
    case HIDDEN_CARDS_MODE.onlyCardInCharge: return "show only card in charge";
    case HIDDEN_CARDS_MODE.cardInChargeAndWinning: return "show card in charge and winning card";
    default: return "normal";
  }
};
