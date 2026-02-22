import { roundToPlayer } from "../actions/playingGame";
import { IBotTask, IBotCardPlay, IBotCardPlayResponse, IBotPromise, IBotPromiseResponse } from "../interfaces/IBot";
import { IGameOptions } from "../interfaces/IGameOptions";

// This function runs in a separate thread
const getBotPromise = (botPromise: IBotPromise): IBotPromiseResponse => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating promise with game state:", botPromise.game);
  return {
    promise: Math.floor(Math.random() * ((botPromise.game as IGameOptions).game.rounds[botPromise.roundInd].cardsInRound + 1)),
    promiseLogic: "Bot logic for making a promise",
    promiseChatMessage: "I just made a random promise.",
  } as IBotPromiseResponse;
};

const getBotCardPlay = (botCardPlay: IBotCardPlay): IBotCardPlayResponse => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating card play with game state:", botCardPlay.game);
  const myRound = roundToPlayer(botCardPlay.game as IGameOptions, botCardPlay.roundInd, botCardPlay.botName || "unknown_bot");
  const randomCard = myRound.playableCards.length > 0 ? myRound.myCards[myRound.playableCards[Math.floor(Math.random() * myRound.playableCards.length)]] : null;
  return {
    card: randomCard,
    cardLogic: "Bot logic for playing a card",
    cardChatMessage: "I just played a random card.",
  } as IBotCardPlayResponse;
};

// The DEFAULT export that Piscina calls
export default (input: IBotTask) => {
  if (input.task === "promise") {
    return getBotPromise(input.botPromise as IBotPromise);
  } else {
    return getBotCardPlay(input.botCardPlay as IBotCardPlay);
  }
};
