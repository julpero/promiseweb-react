import { getDealerNameForRound } from "../backend/common/common";
import { playedGame } from "./games/playedGame";

/**
 * Round is played, next should be promise phase
 */
describe("testing game methods", () => {
  test("dealer name first round", () => {
    const firstRound = playedGame.game.rounds[0];
    expect(getDealerNameForRound(firstRound)).toBe("Creator");
  });

  test("dealer name round 5", () => {
    const fifthRound = playedGame.game.rounds[4];
    expect(getDealerNameForRound(fifthRound)).toBe("NoBody");
  });

});
