import { AzureOpenAI } from "openai";

import { roundToPlayer } from "../actions/playingGame";
import { IBotTask, IBotCardPlay, IBotCardPlayResponse, IBotPromise, IBotPromiseResponse } from "../interfaces/IBot";
import { IGameOptions } from "../interfaces/IGameOptions";

const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-04-01-preview";
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const modelName = "gpt-5-nano";
const deployment = "gpt-5-nano";
const options = { endpoint, apiKey, deployment, apiVersion };

const client = new AzureOpenAI(options);

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

const getBotCardPlay = async (botCardPlay: IBotCardPlay): Promise<IBotCardPlayResponse> => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating card play with game state:", botCardPlay.game);
  const myRound = roundToPlayer(botCardPlay.game as IGameOptions, botCardPlay.roundInd, botCardPlay.botName || "unknown_bot");
  const prompt = `
    You are a professional card game player.
    At this moment just reply with random index between 0 and ${myRound.playableCards.length - 1}
    Also give a short explanation of your move and a chat message that can be shown to users.
    Return only a JSON object representing your move.
    Example: {"cardIndex": 1 , "cardLogic": "No spades played yet", "cardChatMessage": "You didn't see that coming..."}
  `;
  const result = await client.chat.completions.create({
    model: modelName,
    max_completion_tokens: 16384,
    messages: [{ role: "user", content: prompt }],
  });
  const responseText = result.choices[0].message?.content;
  console.log("Raw response from Azure OpenAI:", responseText);
  const cardIndex = responseText ? JSON.parse(responseText).cardIndex : 0;
  const cardLogic = responseText ? JSON.parse(responseText).cardLogic : "Bot logic for playing a card";
  const cardChatMessage = responseText ? JSON.parse(responseText).cardChatMessage : "I just played a random card.";
  const card = myRound.playableCards.length > 0 ? myRound.myCards[myRound.playableCards[cardIndex]] : null;
  return {
    card: card,
    cardLogic: cardLogic,
    cardChatMessage: cardChatMessage,
  } as IBotCardPlayResponse;
};

// The DEFAULT export that Piscina calls
export default async (input: IBotTask) => {
  if (input.task === "promise") {
    return getBotPromise(input.botPromise as IBotPromise);
  } else {
    return await getBotCardPlay(input.botCardPlay as IBotCardPlay);
  }
};
