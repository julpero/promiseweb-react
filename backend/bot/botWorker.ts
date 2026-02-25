import { AzureOpenAI } from "openai";

import { IBotTask, IBotCardPlay, IBotCardPlayResponse, IBotPromise, IBotPromiseResponse } from "../interfaces/IBot";
import { IGameOptions } from "../interfaces/IGameOptions";
import { AiPlayCardResult, AiPromiseResult, GameStateForPromise, GameStateForTurn } from "./botTypes";
import { cardCodeToCard, handlePlayCardCall, handlePromiseCall, makePromiseTool, myRoundToGameStateForPromise, myRoundToGameStateForTurn, playCardTool } from "./botFunctions";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index";

const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-04-01-preview";
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const modelName = process.env.AZURE_OPENAI_MODEL_NAME || "gpt-4.1";
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4.1";
const options = { endpoint, apiKey, deployment, apiVersion };

const client = new AzureOpenAI(options);

const systemPrompt = `
You are an AI card-game player. You play at a professional level and strictly follow the rules and strategies defined here. Your goals:

1. Your primary goal is to win the entire game.
2. If you are sure that you cannot keep your promise anymore, your new primary goal becomes sabotaging other players.
3. Target sabotage primarily against the player who is leading in total points.
4. Play risky when behind; play safe when ahead.
5. Make rational, strategic decisions at all times.

=============================
GAME RULES
=============================

GENERAL RULES
- The game uses a standard 52-card deck. Ace = 14.
- If 5 or fewer players → 19 rounds. Otherwise → 15 rounds.
- 19-round game deals: 10 cards, then 9, then 8… down to 1, then back up to 10 again.
- 15-round game deals: 8 cards, then 7… down to 1, then back up to 8.
- The dealer deals cards, then reveals one extra card as the trump suit.
- Then each player makes a promise (bid) of how many tricks they expect to win.
- After promises, trick-taking begins starting from the player after the dealer.
- 6+ cards per player = Big Round.
  5 or fewer cards per player = Small Round.

=============================
TRICK-TAKING RULES
=============================
- First player may play any card.
- Other players must follow suit if possible.
- If not possible, they may play any card.
- Winning the trick:
  - Highest trump wins.
  - If no trump was played: highest card of the starting suit wins.
- Trick winner starts the next trick.
- Round ends when all cards have been played.

=============================
SCORING
=============================
- If the promise is not met → 0 points.
- If the promise is kept:
  - If promise = 0:
    • Small round: 5 points
    • Big round: 15 points
  - If promise ≥ 1:
    Points = 10 + promise

=============================
PROMISING STRATEGY
=============================
- Identify “ultimatum cards” (cards that guarantee a trick). Never promise fewer tricks than ultimatum cards.
- As first player in a big round, a non-trump Ace can usually win if played first.
- Use the average expected promises:
  Example: 5 players with 10 cards → average is 2.
- If you promise last, adjust based on existing promises.
- Holding many cards of one suit, especially low cards, increases your chances of playing zero.
- Big rounds reward zero with 15 points; small rounds only 5 points.

=============================
PLAYING STRATEGY
=============================
- Track which tricks you must win and which you must avoid.
- Match play to your promise and trick probabilities.
- Track which cards have been played by all players.
- Notice when a player breaks suit: that player no longer has that suit.

=============================
PRIMARY/SECONDARY BEHAVIOR LOGIC
=============================
- If your current hand makes your promise impossible → switch to sabotage mode.
- Sabotage strategy:
  • Target the player with most points.
  • Force them to win unwanted tricks or lose expected tricks.
  • Use trumps and off-suit cards strategically to disrupt.
- Otherwise follow normal optimal play.

You must always follow the rules above when making any decision.

When deciding a promise, you MUST call the function "make_promise" with:
- promise: an integer between 0 and the number of cards in the round, inclusive.
- promiseLogic: a short explanation of the reasoning behind the promise, tied to the rules and strategies above.
- promiseChatMessage: a message to show to the user when making the promise, never reveal your hand or strategy in this message, but you can be playful or misleading if you want.

When deciding a move, you MUST call the function "play_card" with:
- card: one of legal_cards
- mode: "normal" unless promise is impossible, then "sabotage"; use "safe" when ahead and "risky" when behind
- confidence: 0..1 indicating your confidence
- reasoning: short, actionable explanation tied to the rules (trump, lead suit, promise, sabotage target)
- cardChatMessage: message to show to the user when playing the card, never reveal your hand or strategy in this message, but you can be playful or misleading if you want.
Never output plain text decisions if the function is available.
`;

const stateToUserTextMakePromise = (state: GameStateForPromise): string => {
  return [
    "Game state for your promise turn.",
    "You will decide a promise by calling the function `make_promise`.",
    "",
    "JSON STATE:",
    "```json",
    JSON.stringify(state),
    "```"
  ].join("\n");
};

const stateToUserTextPlayCard = (state: GameStateForTurn): string => {
  return [
    "Game state for your turn.",
    "You will decide a move by calling the function `play_card`.",
    "",
    "JSON STATE:",
    "```json",
    JSON.stringify(state),
    "```"
  ].join("\n");
};

// This function runs in a separate thread
const getBotPromise = async (botPromise: IBotPromise): Promise<IBotPromiseResponse> => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating promise with game state:", botPromise.game);

  const state = myRoundToGameStateForPromise(botPromise);
  // console.log("Derived game state for bot's turn: ", state);
  const parameterObject: ChatCompletionCreateParamsNonStreaming = {
    model: modelName,
    temperature: 0.2,
    messages: [
      { role: "system", content: [{ type: "text", text: systemPrompt }] },
      { role: "user", content: stateToUserTextMakePromise(state) }
    ],
    tools: [makePromiseTool],
    tool_choice: "auto", // allow the model to call make_promise
  };
  console.log("Sending the following parameters to Azure OpenAI:");
  console.log(JSON.stringify(parameterObject));
  const response = await client.chat.completions.create(parameterObject);
  const choice = response.choices[0];
  const toolCall = choice.message?.tool_calls?.[0];

  let cardPlayResult: AiPromiseResult | null = null;
  if (toolCall && toolCall.type === "function" && toolCall.function?.name === "make_promise") {
    const toolArgs = JSON.parse(toolCall.function.arguments) as AiPromiseResult;
    cardPlayResult = handlePromiseCall(toolArgs, state);
  }

  const promiseLogic = cardPlayResult?.reasoning || "Bot logic for playing a card";
  const promiseChatMessage = cardPlayResult?.promiseChatMessage || "I just played a random card.";
  return {
    promise: Math.floor(Math.random() * ((botPromise.game as IGameOptions).game.rounds[botPromise.roundInd].cardsInRound + 1)),
    promiseLogic: promiseLogic,
    promiseChatMessage: promiseChatMessage,
  } as IBotPromiseResponse;
};

const getBotCardPlay = async (botCardPlay: IBotCardPlay): Promise<IBotCardPlayResponse> => {
  // Heavy computation/AI logic here
  console.log("Bot is calculating card play with game state...");

  const state = myRoundToGameStateForTurn(botCardPlay);
  // console.log("Derived game state for bot's turn: ", state);
  const parameterObject: ChatCompletionCreateParamsNonStreaming = {
    model: modelName,
    temperature: 0.2,
    messages: [
      { role: "system", content: [{ type: "text", text: systemPrompt }] },
      { role: "user", content: stateToUserTextPlayCard(state) }
    ],
    tools: [playCardTool],
    tool_choice: "auto", // allow the model to call play_card
  };
  // console.log("Sending the following parameters to Azure OpenAI:");
  // console.log(JSON.stringify(parameterObject));
  const response = await client.chat.completions.create(parameterObject);
  // console.log("Raw response from Azure OpenAI:", response);
  const choice = response.choices[0];
  const toolCall = choice.message?.tool_calls?.[0];

  let cardPlayResult: AiPlayCardResult | null = null;
  if (toolCall && toolCall.type === "function" && toolCall.function?.name === "play_card") {
    const toolArgs = JSON.parse(toolCall.function.arguments) as AiPlayCardResult;
    cardPlayResult = handlePlayCardCall(toolArgs, state);
  }

  const cardLogic = cardPlayResult?.reasoning || "Bot logic for playing a card";
  const cardChatMessage = cardPlayResult?.cardChatMessage || "I just played a random card.";
  return {
    card: cardPlayResult?.card ? cardCodeToCard(cardPlayResult.card) : null,
    cardLogic: cardLogic,
    cardChatMessage: cardChatMessage,
    success: true,
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
