import { IBotTask, IBotCardPlay, IBotCardPlayResponse, IBotPromise, IBotPromiseResponse } from "../interfaces/IBot";
import { ICard } from "../interfaces/IGameOptions";

// This function runs in a separate thread
const getBotPromise = (botPromise: IBotPromise): IBotPromiseResponse => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating promise with game state:", botPromise.game);
  return {
    promise: 1,
    promiseLogic: "Bot logic for making a promise",
    promiseChatMessage: "Bot made a promise.",
  } as IBotPromiseResponse;
};

const getBotCardPlay = (botCardPlay: IBotCardPlay): IBotCardPlayResponse => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating card play with game state:", botCardPlay.game);
  return {
    card: {} as ICard,
    cardLogic: "Bot logic for playing a card",
    cardChatMessage: "Bot played a card.",
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
