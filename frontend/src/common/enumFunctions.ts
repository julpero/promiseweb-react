import { RULES, HIDDEN_CARDS_MODE } from "../interfaces/IGameOptions";

export const ruleToStr = (rule: RULES): string => {
  switch (rule) {
    case RULES.noEvenPromisesAllowed: return "no even promises";
    case RULES.hiddenPromiseRound: return "hidden promise round";
    case RULES.onlyTotalPromise: return "show only total promise";
    case RULES.mustPlayTrump: return "must play trump";
    case RULES.hiddenTrump: return "hidden trump when promising";
    case RULES.speedPromise: return "speed promise round";
    case RULES.privateSpeedGame: return "speed game";
    case RULES.opponentPromiseCardValue: return "show opponent hand value when promising";
    case RULES.opponentGameCardValue: return "show opponent hand value in game";
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