import { getGame } from "../dbActions/playingGame";
import { IBotPromise } from "../interfaces/IBot";
import { isMyPromiseTurn } from "./playingGame";

export const isBotPromiseTurn = async (gameId: string, roundInd: number): Promise<IBotPromise> => {
  const response: IBotPromise = {
    isBotPromiseTurn: false,
    gameId: gameId,
  };
  const game = await getGame(gameId);
  if (!game) return response;

  const round = game.game.rounds[roundInd];

  round.roundPlayers.forEach(player => {
    if (player.type === "bot" && player.promise === null) {
      // this may be the bot whose turn it is to promise, but we need to check if the player before him has promised or not
      if (isMyPromiseTurn(player.name, round)) {
        console.log("It's bot's promise turn for bot:", player.name);
        response.isBotPromiseTurn = true;
        response.game = game;
        response.botName = player.name;
        return;
      }
    }
  });
  return response;
};
