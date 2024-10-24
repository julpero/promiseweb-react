import { justStartedRePromiseGame, justStartedRePromiseGameLastPromiser, justStartedRePromiseGameLastPromiserPromised } from "./games/rePromiseGame";

import { getCurrentPlayIndex, getCurrentPromiseTotal, getCurrentRePromiseTotal, getCurrentRoundInd, getDealerNameForRound, getPromiser, isRoundsLastPromiser, isRoundsLastRePromiser } from "../backend/common/common";
import { isRuleActive } from "../backend/common/model";
import { getRoundPhase } from "../backend/actions/playingGame";
import { ROUND_PHASE } from "../frontend/src/interfaces/IuiPlayingGame";
import { IPromiser } from "../backend/interfaces/IGameOptions";
import { RULE } from "../frontend/src/interfaces/IuiGameOptions";

/**
 * This game has just started.
 * First promise round.
 */
describe("testing just created re-promise game methods", () => {
  test("getCurrentRoundInd", () => {
    const currentRoundInd = getCurrentRoundInd(justStartedRePromiseGame.game);
    expect(currentRoundInd).toBe(0);
  });

  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(justStartedRePromiseGame.game.rounds[0], false);
    expect(roundPhase).toBe(ROUND_PHASE.onPromises);
  });

  test("getDealerNameForRound", () => {
    expect(getDealerNameForRound(justStartedRePromiseGame.game.rounds[0])).toBe("Eka");
  });

  test("getPromiser", () => {
    const promiser = {
      name: "Vika",
      type: "human",
      index: 1,
    } as IPromiser;
    expect(getPromiser(justStartedRePromiseGame.game.rounds[0], true)).toStrictEqual(promiser);
  });

  test("isRoundsLastPromiser", () => {
    expect(isRoundsLastPromiser(justStartedRePromiseGame.game.rounds[0])).toBeFalsy();
  });

  test("getCurrentPromiseTotal", () => {
    expect(getCurrentPromiseTotal(justStartedRePromiseGame.game.rounds[0])).toBe(0);
  });

  test("getCurrentPlayIndex", () => {
    expect(getCurrentPlayIndex(justStartedRePromiseGame.game.rounds[0])).toBe(0);
  });
});

describe("last promiser in first promise round in re-promise game", () => {
  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(justStartedRePromiseGameLastPromiser.game.rounds[0], false);
    expect(roundPhase).toBe(ROUND_PHASE.onPromises);
  });

  test("getCurrentPromiseTotal", () => {
    expect(getCurrentPromiseTotal(justStartedRePromiseGameLastPromiser.game.rounds[0])).toBe(4);
  });

  test("getCurrentRePromiseTotal", () => {
    expect(getCurrentRePromiseTotal(justStartedRePromiseGameLastPromiser.game.rounds[0])).toBe(0);
  });

  test("getPromiser", () => {
    const promiser = {
      name: "Eka",
      type: "human",
      index: 0,
    } as IPromiser;
    expect(getPromiser(justStartedRePromiseGameLastPromiser.game.rounds[0], true)).toStrictEqual(promiser);
  });

  test("isRoundsLastPromiser", () => {
    expect(isRoundsLastPromiser(justStartedRePromiseGameLastPromiser.game.rounds[0])).toBeTruthy();
  });
});

describe("last promiser in first promise round just promised in re-promise game", () => {
  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(justStartedRePromiseGameLastPromiserPromised.game.rounds[0], true);
    expect(roundPhase).toBe(ROUND_PHASE.onRePromises);
  });

  test("getCurrentPromiseTotal", () => {
    expect(getCurrentPromiseTotal(justStartedRePromiseGameLastPromiserPromised.game.rounds[0])).toBe(5);
  });

  test("getCurrentRePromiseTotal", () => {
    expect(getCurrentRePromiseTotal(justStartedRePromiseGameLastPromiserPromised.game.rounds[0])).toBe(0);
  });

  test("getPromiser", () => {
    const promiser = {
      name: "Vika",
      type: "human",
      index: 1,
    } as IPromiser;
    expect(getPromiser(justStartedRePromiseGameLastPromiserPromised.game.rounds[0], true)).toStrictEqual(promiser);
  });

  test("isRoundsLastPromiser", () => {
    expect(isRoundsLastPromiser(justStartedRePromiseGameLastPromiserPromised.game.rounds[0])).toBeFalsy();
  });

  test("isRoundsLastRePromiser", () => {
    expect(isRoundsLastRePromiser(justStartedRePromiseGameLastPromiserPromised.game.rounds[0])).toBeFalsy();
  });
});


describe("test game options in re-promise game", () => {
  test("isRuleActive active", () => {
    expect(isRuleActive(justStartedRePromiseGame, RULE.rePromise)).toBeTruthy();
  });

  test("isRuleActive not active", () => {
    expect(isRuleActive(justStartedRePromiseGame, RULE.speedPromise)).toBeFalsy();
  });
});
