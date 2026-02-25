import { getGame } from "../dbActions/playingGame";
import { IBotCardPlay, IBotPromise } from "../interfaces/IBot";
import { isMyPromiseTurn, getRoundPhase } from "./playingGame";
import { getPlayerInTurn } from "../common/common";
import { ROUND_PHASE } from "../../frontend/src/interfaces/IuiPlayingGame";

export const isBotPromiseTurn = async (gameId: string, roundInd: number): Promise<IBotPromise> => {
  const response: IBotPromise = {
    isBotPromiseTurn: false,
    gameId: gameId,
    roundInd: roundInd,
  };
  const game = await getGame(gameId);
  if (!game) return response;

  if (roundInd >= game.game.rounds.length) return response; // round index out of bounds
  const round = game.game.rounds[roundInd];

  round.roundPlayers.forEach(player => {
    if (player.type === "bot" && player.promise === null) {
      // this may be the bot whose turn it is to promise, but we need to check if the player before him has promised or not
      if (isMyPromiseTurn(player.name, round)) {
        // console.log("It's bot's promise turn for bot:", player.name);
        response.isBotPromiseTurn = true;
        response.game = game;
        response.botName = player.name;
        return;
      }
    }
  });
  return response;
};

export const isBotPlayTurn = async (gameId: string, roundInd: number): Promise<IBotCardPlay> => {
  const response: IBotCardPlay = {
    isBotCardPlayTurn: false,
    gameId: gameId,
    roundInd: roundInd,
  };
  const game = await getGame(gameId);
  if (!game) return response;

  const round = game.game.rounds[roundInd];
  const roundPhase = getRoundPhase(round);
  if (roundPhase !== ROUND_PHASE.onPlay) return response;

  const playerInTurn = getPlayerInTurn(round);
  if (playerInTurn && playerInTurn.type === "bot") {
    response.isBotCardPlayTurn = true;
    response.botName = playerInTurn.name;
    response.game = game;
  }
  return response;
};
