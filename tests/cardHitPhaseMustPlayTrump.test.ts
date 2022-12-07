import { firstRoundFirstPlayer, firstRoundSecondPlayer, firstRoundSecondHitFirstPlayer, firstRoundThirdHitSecondPlayer } from "./games/cardHitPhase";

import { getRoundPhase } from "../backend/actions/playingGame";
import { getCurrentCardInCharge, getCurrentPlayIndex, getCurrentRoundInd, getDealerNameForRound, getMyCards, getPlayableCardIndexes, getPlayerInTurn } from "../backend/common/common";
import { IuiCard, ROUND_PHASE } from "../frontend/src/interfaces/IuiPlayingGame";
import { ICard, IPlayerInTurn } from "../backend/interfaces/IGameOptions";

describe("testing first round and first player - must play trump", () => {
  test("getCurrentRoundInd", () => {
    const currentRoundInd = getCurrentRoundInd(firstRoundFirstPlayer.game);
    expect(currentRoundInd).toBe(0);
  });

  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(firstRoundFirstPlayer.game.rounds[0]);
    expect(roundPhase).toBe(ROUND_PHASE.onPlay);
  });

  test("getCurrentPlayIndex", () => {
    expect(getCurrentPlayIndex(firstRoundFirstPlayer.game.rounds[0])).toBe(0);
  });

  test("getDealerNameForRound", () => {
    expect(getDealerNameForRound(firstRoundFirstPlayer.game.rounds[0])).toBe("Eka");
  });

  test("getPlayerInTurn", () => {
    const playerInTurn: IPlayerInTurn = {
      name: "Vika",
      type: "human",
      index: 1,
    };
    expect(getPlayerInTurn(firstRoundFirstPlayer.game.rounds[0])).toStrictEqual(playerInTurn);
  });

  test("getMyCards", () => {
    const myCards = getMyCards("Vika", firstRoundFirstPlayer.game.rounds[0], false);
    const card0: IuiCard = {rank: "3", suite: "hearts", value: 3, originalIndex: 0};
    const card1: IuiCard = {rank: "6", suite: "diamonds", value: 6, originalIndex: 1};
    const card2: IuiCard = {rank: "2", suite: "clubs", value: 2, originalIndex: 2};
    const card3: IuiCard = {rank: "6", suite: "clubs", value: 6, originalIndex: 3};
    const card4: IuiCard = {rank: "9", suite: "clubs", value: 9, originalIndex: 4};
    const card5: IuiCard = {rank: "10", suite: "clubs", value: 10, originalIndex: 5};
    const cardX: IuiCard = {rank: "11", suite: "clubs", value: 11, originalIndex: 6};
    expect(myCards).toContainEqual(card0);
    expect(myCards).toContainEqual(card1);
    expect(myCards).toContainEqual(card2);
    expect(myCards).toContainEqual(card3);
    expect(myCards).toContainEqual(card4);
    expect(myCards).toContainEqual(card5);
    expect(myCards).not.toContainEqual(cardX);
  });

  test("getPlayableCardIndexes", () => {
    const myCards = getMyCards("Vika", firstRoundFirstPlayer.game.rounds[0], false);
    const playIndex = getCurrentPlayIndex(firstRoundFirstPlayer.game.rounds[0]);
    const myIndexes = getPlayableCardIndexes(myCards, firstRoundFirstPlayer.game.rounds[0], playIndex, true);
    expect(myIndexes).toContain(0);
    expect(myIndexes).toContain(1);
    expect(myIndexes).toContain(2);
    expect(myIndexes).toContain(3);
    expect(myIndexes).toContain(4);
    expect(myIndexes).toContain(5);
    expect(myIndexes).not.toContain(6);
  });

  test("getCurrentCardInCharge", () => {
    expect(getCurrentCardInCharge(firstRoundFirstPlayer.game.rounds[0].cardsPlayed)).toBeNull();
  });
});

describe("testing first round and second player - must play trump", () => {
  test("getCurrentRoundInd", () => {
    const currentRoundInd = getCurrentRoundInd(firstRoundSecondPlayer.game);
    expect(currentRoundInd).toBe(0);
  });

  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(firstRoundSecondPlayer.game.rounds[0]);
    expect(roundPhase).toBe(ROUND_PHASE.onPlay);
  });

  test("getDealerNameForRound", () => {
    expect(getDealerNameForRound(firstRoundSecondPlayer.game.rounds[0])).toBe("Eka");
  });

  test("getPlayerInTurn", () => {
    const playerInTurn: IPlayerInTurn = {
      name: "Toka",
      type: "human",
      index: 2,
    };
    expect(getPlayerInTurn(firstRoundSecondPlayer.game.rounds[0])).toStrictEqual(playerInTurn);
  });

  test("getMyCards", () => {
    const myCards = getMyCards("Toka", firstRoundSecondPlayer.game.rounds[0], false);
    const card0: IuiCard = {rank: "6", suite: "hearts", value: 6, originalIndex: 0};
    const card1: IuiCard = {rank: "10", suite: "hearts", value: 10, originalIndex: 1};
    const card2: IuiCard = {rank: "Q", suite: "hearts", value: 12, originalIndex: 2};
    const card3: IuiCard = {rank: "2", suite: "diamonds", value: 2, originalIndex: 3};
    const card4: IuiCard = {rank: "9", suite: "diamonds", value: 9, originalIndex: 4};
    const card5: IuiCard = {rank: "Q", suite: "clubs", value: 12, originalIndex: 5};
    const cardX: IuiCard = {rank: "11", suite: "spades", value: 11, originalIndex: 6};
    expect(myCards).toContainEqual(card0);
    expect(myCards).toContainEqual(card1);
    expect(myCards).toContainEqual(card2);
    expect(myCards).toContainEqual(card3);
    expect(myCards).toContainEqual(card4);
    expect(myCards).toContainEqual(card5);
    expect(myCards).not.toContainEqual(cardX);
  });

  test("getPlayableCardIndexes", () => {
    const myCards = getMyCards("Toka", firstRoundSecondPlayer.game.rounds[0], false);
    const playIndex = getCurrentPlayIndex(firstRoundSecondPlayer.game.rounds[0]);
    const myIndexes = getPlayableCardIndexes(myCards, firstRoundSecondPlayer.game.rounds[0], playIndex, true);
    expect(myIndexes).not.toContain(0);
    expect(myIndexes).not.toContain(1);
    expect(myIndexes).not.toContain(2);
    expect(myIndexes).not.toContain(3);
    expect(myIndexes).not.toContain(4);
    expect(myIndexes).toContain(5);
    expect(myIndexes).not.toContain(6);
  });

  test("getCurrentCardInCharge", () => {
    const cardInCharge: ICard = {rank: "2", suite: "clubs", value: 2};
    expect(getCurrentCardInCharge(firstRoundSecondPlayer.game.rounds[0].cardsPlayed)).toStrictEqual(cardInCharge);
  });
});

describe("testing first round and second hit first player - must play trump", () => {
  test("getCurrentRoundInd", () => {
    const currentRoundInd = getCurrentRoundInd(firstRoundSecondHitFirstPlayer.game);
    expect(currentRoundInd).toBe(0);
  });

  test("getCurrentPlayIndex", () => {
    expect(getCurrentPlayIndex(firstRoundSecondHitFirstPlayer.game.rounds[0])).toBe(1);
  });

  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(firstRoundSecondHitFirstPlayer.game.rounds[0]);
    expect(roundPhase).toBe(ROUND_PHASE.onPlay);
  });

  test("getPlayerInTurn", () => {
    const playerInTurn: IPlayerInTurn = {
      name: "Toka",
      type: "human",
      index: 2,
    };
    expect(getPlayerInTurn(firstRoundSecondHitFirstPlayer.game.rounds[0])).toStrictEqual(playerInTurn);
  });

  test("getMyCards", () => {
    const myCards = getMyCards("Toka", firstRoundSecondHitFirstPlayer.game.rounds[0], false);
    const card0: IuiCard = {rank: "6", suite: "hearts", value: 6, originalIndex: 0};
    const card1: IuiCard = {rank: "10", suite: "hearts", value: 10, originalIndex: 1};
    const card2: IuiCard = {rank: "Q", suite: "hearts", value: 12, originalIndex: 2};
    const card3: IuiCard = {rank: "2", suite: "diamonds", value: 2, originalIndex: 3};
    const card4: IuiCard = {rank: "9", suite: "diamonds", value: 9, originalIndex: 4};
    const card5: IuiCard = {rank: "Q", suite: "clubs", value: 12, originalIndex: 5};
    const cardX: IuiCard = {rank: "11", suite: "spades", value: 11, originalIndex: 6};
    expect(myCards).toContainEqual(card0);
    expect(myCards).toContainEqual(card1);
    expect(myCards).toContainEqual(card2);
    expect(myCards).toContainEqual(card3);
    expect(myCards).toContainEqual(card4);
    expect(myCards).not.toContainEqual(card5);
    expect(myCards).not.toContainEqual(cardX);
  });

  test("getPlayableCardIndexes", () => {
    const myCards = getMyCards("Toka", firstRoundSecondHitFirstPlayer.game.rounds[0], false);
    const playIndex = getCurrentPlayIndex(firstRoundSecondHitFirstPlayer.game.rounds[0]);
    const myIndexes = getPlayableCardIndexes(myCards, firstRoundSecondHitFirstPlayer.game.rounds[0], playIndex, true);
    expect(myIndexes).toContain(0);
    expect(myIndexes).toContain(1);
    expect(myIndexes).toContain(2);
    expect(myIndexes).toContain(3);
    expect(myIndexes).toContain(4);
    expect(myIndexes).not.toContain(5);
    expect(myIndexes).not.toContain(6);
  });

  test("getCurrentCardInCharge", () => {
    expect(getCurrentCardInCharge(firstRoundSecondHitFirstPlayer.game.rounds[0].cardsPlayed)).toBeNull();
  });
});

describe("testing first round and third hit second player - must play trump", () => {
  test("getCurrentRoundInd", () => {
    const currentRoundInd = getCurrentRoundInd(firstRoundThirdHitSecondPlayer.game);
    expect(currentRoundInd).toBe(0);
  });

  test("getCurrentPlayIndex", () => {
    expect(getCurrentPlayIndex(firstRoundThirdHitSecondPlayer.game.rounds[0])).toBe(2);
  });

  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(firstRoundThirdHitSecondPlayer.game.rounds[0]);
    expect(roundPhase).toBe(ROUND_PHASE.onPlay);
  });

  test("getPlayerInTurn", () => {
    const playerInTurn: IPlayerInTurn = {
      name: "Vika",
      type: "human",
      index: 1,
    };
    expect(getPlayerInTurn(firstRoundThirdHitSecondPlayer.game.rounds[0])).toStrictEqual(playerInTurn);
  });

  test("getMyCards", () => {
    const myCards = getMyCards("Vika", firstRoundThirdHitSecondPlayer.game.rounds[0], false);
    const card0: IuiCard = {rank: "3", suite: "hearts", value: 3, originalIndex: 0};
    const card1: IuiCard = {rank: "6", suite: "diamonds", value: 6, originalIndex: 1};
    const card2: IuiCard = {rank: "2", suite: "clubs", value: 2, originalIndex: 2};
    const card3: IuiCard = {rank: "6", suite: "clubs", value: 6, originalIndex: 3};
    const card4: IuiCard = {rank: "9", suite: "clubs", value: 9, originalIndex: 4};
    const card5: IuiCard = {rank: "10", suite: "clubs", value: 10, originalIndex: 5};
    const cardX: IuiCard = {rank: "11", suite: "clubs", value: 11, originalIndex: 6};
    expect(myCards).toContainEqual(card0);
    expect(myCards).not.toContainEqual(card1);
    expect(myCards).not.toContainEqual(card2);
    expect(myCards).toContainEqual(card3);
    expect(myCards).toContainEqual(card4);
    expect(myCards).toContainEqual(card5);
    expect(myCards).not.toContainEqual(cardX);
  });

  test("getPlayableCardIndexes", () => {
    const myCards = getMyCards("Vika", firstRoundThirdHitSecondPlayer.game.rounds[0], false);
    const playIndex = getCurrentPlayIndex(firstRoundThirdHitSecondPlayer.game.rounds[0]);
    const myIndexes = getPlayableCardIndexes(myCards, firstRoundThirdHitSecondPlayer.game.rounds[0], playIndex, true);
    expect(myIndexes).not.toContain(0);
    expect(myIndexes).toContain(1);
    expect(myIndexes).toContain(2);
    expect(myIndexes).toContain(3);
    expect(myIndexes).not.toContain(4);
    expect(myIndexes).not.toContain(5);
    expect(myIndexes).not.toContain(6);
  });

  test("getCurrentCardInCharge", () => {
    const cardInCharge: ICard = {rank: "4", suite: "spades", value: 4};
    expect(getCurrentCardInCharge(firstRoundThirdHitSecondPlayer.game.rounds[0].cardsPlayed)).toStrictEqual(cardInCharge);
  });
});
