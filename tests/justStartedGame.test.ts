import { justStartedGame, justStartedLastPromiser } from "./games/justStartedGame";

import { getCurrentPlayIndex, getCurrentPromiseTotal, getCurrentRoundInd, getDealerNameForRound, getPromiser, isRoundsLastPromiser } from "../backend/common/common";
import { isRuleActive } from "../backend/common/model";
import { getRoundPhase } from "../backend/actions/playingGame";
import { ROUND_PHASE } from "../frontend/src/interfaces/IuiPlayingGame";
import { IPromiser } from "../backend/interfaces/IGameOptions";
import { RULE } from "../frontend/src/interfaces/IuiGameOptions";

/**
 * This game has just started.
 * First promise round.
 */
describe("testing just created game methods", () => {
  test("getCurrentRoundInd", () => {
    const currentRoundInd = getCurrentRoundInd(justStartedGame.game);
    expect(currentRoundInd).toBe(0);
  });

  test("getRoundPhase", () => {
    const roundPhase = getRoundPhase(justStartedGame.game.rounds[0], false);
    expect(roundPhase).toBe(ROUND_PHASE.onPromises);
  });

  test("getDealerNameForRound", () => {
    expect(getDealerNameForRound(justStartedGame.game.rounds[0])).toBe("Eka");
  });

  test("getPromiser", () => {
    const promiser = {
      name: "Vika",
      type: "human",
      index: 1,
      rePromiser: false,
    } as IPromiser;
    expect(getPromiser(justStartedGame.game.rounds[0], false)).toStrictEqual(promiser);
  });

  test("isRoundsLastPromiser", () => {
    expect(isRoundsLastPromiser(justStartedGame.game.rounds[0])).toBeFalsy();
  });

  test("getCurrentPromiseTotal", () => {
    expect(getCurrentPromiseTotal(justStartedGame.game.rounds[0])).toBe(0);
  });

  test("getCurrentPlayIndex", () => {
    expect(getCurrentPlayIndex(justStartedGame.game.rounds[0])).toBe(0);
  });
});

describe("last promiser", () => {
  /**
   * in this game this is just internal, total promise is not visible in the ui
   * because of the rule hiddenPromiseRound
   */
  test("getCurrentPromiseTotal", () => {
    expect(getCurrentPromiseTotal(justStartedLastPromiser.game.rounds[0])).toBe(4);
  });

  test("getPromiser", () => {
    const promiser = {
      name: "Eka",
      type: "human",
      index: 0,
      rePromiser: false,
    } as IPromiser;
    expect(getPromiser(justStartedLastPromiser.game.rounds[0], false)).toStrictEqual(promiser);
  });

  test("isRoundsLastPromiser", () => {
    expect(isRoundsLastPromiser(justStartedLastPromiser.game.rounds[0])).toBeTruthy();
  });
});

describe("test game options", () => {
  test("isRuleActive active", () => {
    expect(isRuleActive(justStartedGame, RULE.hiddenPromiseRound)).toBeTruthy();
  });

  test("isRuleActive not active", () => {
    expect(isRuleActive(justStartedGame, RULE.speedPromise)).toBeFalsy();
  });
});
