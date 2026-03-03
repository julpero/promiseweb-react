import {
  GoogleGenAI,
  MediaResolution,
  ThinkingLevel,
} from "@google/genai";
import util from "util";

import { IBotTask, IBotCardPlay, IBotCardPlayResponse, IBotPromise, IBotPromiseResponse } from "../interfaces/IBot";
import { AiPlayCardResult, AiPromiseResult } from "./botTypes";
import { cardCodeToCard, myRoundToGeminiGameStateForPlay, myRoundToGeminiGameStateForPromise } from "./botFunctions";

// const geminiApiKey = process.env.GEMINI_API_KEY;
// const geminiApiEndpoint = process.env.GEMINI_API_ENDPOINT || "https://gemini.googleapis.com/v1/models/gemini-3-flash-preview:generateContentStream";
const modelName = "gemini-3-flash-preview";

const client = new GoogleGenAI({});

const systemPrompt = `
You are an AI card-game player. You play at a professional level and strictly follow the rules and strategies defined here. Your goals:

1. Your primary goal is to win the entire game.
2. If you are sure that you cannot keep your promise anymore, your new primary goal becomes sabotaging other players.
3. Target sabotage primarily against the player who is leading in total points.
4. Play risky when behind; play safe when ahead.
5. Make rational, strategic decisions at all times.
6. The cards are always represented as a string with rank followed by suit, for example '10D' for ten of diamonds, 'AS' for ace of spades, '7H' for seven of hearts, etc. Ranks are 2-10, J=11, Q=12, K=13, A=14. Suits are D=diamonds, C=clubs, H=hearts, S=spades.
7. Trump suit is revealed at the start of each round and is represented as a single letter (D, C, H, S).

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
- Round is even promised if total promises = number of cards in the round
  Round is under promised if total promises < number of cards in the round
  Round is over promised if total promises > number of cards in the round

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
- Use the average expected promises as a base promising value based on the number of cards in the round and the number of players. For example, if there are 5 players and 10 cards in the round, the average expected promise is 2 (10 cards / 5 players). This is a starting point that you can adjust based on your hand strength and position.
- You can assume that other players who have not yet promised will generally promise around the average, with some variation based on their hand strength and position. Use this assumption to predict their promises and adjust your own promise accordingly.
- When promising, consider your position relative to the dealer. Players who promise later have more information about the promises of earlier players, which can be an advantage. For example, if you are the last to promise and the total promises so far are 7 in a 10-card round, you can promise 3 to make the round even promised.
- First promiser cant think if the round is likely to be over or under promised, so they should rely more on their hand strength and the average expected promise. Last promiser has the most information and can make the most strategic promise based on the current state of promises.
- If you promise last, the safest promise is often to promise the number of tricks that would make the round even promised, based on the promises of the other players. For example, if there are 10 cards in the round and the other 4 players have promised a total of 7 tricks, promising 3 would make the round even promised. This is often a good choice if you have an average hand, as it minimizes risk.
- Identify “ultimatum cards” (cards that guarantee a trick, for example a biggest trump card available in the play). Never promise fewer tricks than ultimatum cards and adjust your base promise value accordingly.
- When playing small rounds also high value trump cards (J, Q, K) can often guarantee tricks, so consider that in your promise.
- If you have two or more ultimatum cards and also few smaller trump cards, you can often get extra tricks by leading the round with an ultimatum trump card to draw out opponents' trumps, then playing your smaller trump cards to win additional tricks.
- If you have more trumps than it is likely that opponents have, you certainly want to promise more tricks to utilize your trump advantage.
- When playing first, the highest card in a non-trump suit can often win a trick, so consider that in your promise especially in big rounds.
- Holding many cards of one suit with some low cards increases your chances of playing zero if there is no strong trump in your hand.
- Big rounds reward keeping zero promise with 15 points; small rounds only 5 points.
- In big rounds, it can be worth risking a zero promise with a weak hand for the higher reward.
- If you do not have all suits represented in your hand, it can be easier to promise zero, especially if you have no single strong cards.
- In small rounds the more you have trumps the more you can promise.
- In one card rounds just use possibility calculation based on your card strength and the revealed trump card to decide your promise.
- If the promise round is under promised, it is often safer to promise more tricks to increase the chances of keeping your promise, since there are fewer total promised tricks and thus less competition for winning tricks.
- If the promise round is over promised, it is often safer to promise fewer tricks to increase the chances of keeping your promise, since there are more total promised tricks and thus more competition for winning tricks.

=============================
PLAYING STRATEGY
=============================
- Track which tricks you must win and which you must avoid.
- Count possibility for every playable card in your hand to win the current trick and use this to guide your play.
- Match play to your promise and trick probabilities.
- Check which cards have been played in this round when thinking which cards in your hand can win tricks and which cannot, and use this to guide your play. For example if someone has already played trump card you cannot win unless you have and can play a trump card of higher rank.
- Track which cards have been played by all players in this game when counting possibilities and making decisions.
- Notice when a player breaks suit: that player no longer has that suit.
- Try to deduce opponents' hands and strategies based on their play and promises.
- Always keep track of which cards in your playable hand can win this trick if played, and which cannot. Use this to guide your play.
  • For example if someone starts round with a suit you do not have, you can win the trick only with a biggest trump card in round, so if you have no trumps you know you cannot win the trick and can play safely if you want.
  • For example if someone starts round with a suit you have, but someone has already played a trump card then you cannot win this trick anymore.
- During tricks you must always reconsider which cards in your hand are guaranteed to win tricks in later rounds (ultimatum cards), which cards can only win if opponents play certain cards (conditional winners), and which cards cannot win any tricks. Use this to guide your play.
- During tricks you must always reconsider which are your cards that you are going to play to reach your promised number of tricks in the safest way possible, and which cards are risky to play because they might win unwanted tricks or lose expected tricks. Use this also to guide your play and adjust your strategy between safe and sabotage.
- If there is a possibility to sabotage a opponent which have more points than you, consider playing a card that forces them to win an unwanted trick or lose an expected trick.
- Use trumps strategically to disrupt opponents, especially the players with more points than you if you are in sabotage mode.
- If you need not to win any tricks anymore it is usually easier to play if you do not have all suits represented in your hand, so you can get rid of cards quickly by playing off-suit cards when you cannot follow suit.
- If the round is over promised, try to get your tricks as quickly as possible to minimize risk. Of course if you have ultimatum cards you know that you will get certain tricks, so you can play those strategically to draw out opponents' trumps or high cards. But if you have no strong cards, it's often best to just get your tricks over with quickly.
- If the round is under promised, try to delay getting your tricks until you have more information and can play more safely.
- If the round is under promised and you have your ultimatum cards or other strong cards in hand then it is always good idea to let opponents play over their promises by skipping tricks.

=============================
PRIMARY/SECONDARY BEHAVIOR LOGIC
=============================
- If you have reached your promised number of tricks or you are sure that with your remaining ultimatum cards you can get your remaining promised tricks → switch to safe mode.
- If your current hand makes your promise impossible → switch to sabotage mode.
- Safe strategy:
  • Try get rid of highest and strongest cards which are likely to win unwanted tricks and are not in your ultimatum cards.
  • If you have ultimatum cards, play them strategically to draw out opponents' trumps or high cards, then play your smaller cards safely.
- Sabotage strategy:
  • Target the player with most points and players with more points than you.
  • Force them to win unwanted tricks or lose expected tricks.
  • Use trumps and off-suit cards strategically to disrupt.
  • Usually a player who has promised zero is easier to sabotage by forcing them to win a trick for example playing a small card of the suit you know they may have.
- Otherwise follow normal optimal play.

You must always follow the rules above when making any decision.

When deciding a promise, you MUST call the function 'make_promise' with:
- promise: an integer between 0 and the number of cards in the round, inclusive.
- promise_logic: a short explanation of the reasoning behind the promise, tied to the rules and strategies above.
- promise_chat_message: a message to show to the user when making the promise, never reveal your hand or strategy in this message, but you can be playful or misleading if you want.

When deciding a move, you MUST call the function 'play_card' with:
- card: one of legal_cards
- mode: 'normal' unless promise is impossible, then 'sabotage'; use 'safe' when ahead and 'risky' when behind
- confidence: 0..1 indicating your confidence
- reasoning: short, actionable explanation tied to the rules (trump, lead suit, promise, sabotage target, possibility to win or lose trick)
- card_chat_message: message to show to the user when playing the card, never reveal your hand or strategy in this message, but you can be playful or misleading if you want.
Never output plain text decisions if the function is available.
`;

// This function runs in a separate thread
const getBotPromiseTask = async (botPromise: IBotPromise): Promise<IBotPromiseResponse> => {
  // Heavy computation/AI logic here
  // console.log("Bot is calculating promise with game state:", botPromise.game);

  const state = myRoundToGeminiGameStateForPromise(botPromise);
  console.log("Derived game state for bot's turn: ", util.inspect(state, { depth: null, colors: true }));
  const config = {
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.HIGH,
    },
    mediaResolution: MediaResolution.MEDIA_RESOLUTION_LOW,
    responseMimeType: "application/json",
    systemInstruction: [
      {
        text: systemPrompt,
      }
    ],
  };
  const model = modelName;
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: myRoundToGeminiGameStateForPromise(botPromise),
        },
      ],
    },
  ];

  const response = await client.models.generateContent({
    model,
    config,
    contents,
  });

  if (!response.text) {
    throw new Error("No text response from Gemini");
  }
  console.log("Raw result from Gemini for promise:", util.inspect(response, { depth: null, colors: true }));
  const resultJson = JSON.parse(response.text) as AiPromiseResult;

  const promiseLogic = resultJson.reasoning || "Bot logic for making a promise";
  const promiseChatMessage = resultJson.promise_chat_message || "I just made a random promise.";
  const retValue: IBotPromiseResponse = {
    promise: resultJson.promise ?? 1,
    promiseLogic: promiseLogic,
    promiseChatMessage: promiseChatMessage,
    success: true,
  };
  return retValue;
};

const getBotCardPlayTask = async (botCardPlay: IBotCardPlay): Promise<IBotCardPlayResponse> => {
  // Heavy computation/AI logic here
  // console.log("Bot is calculating card play with game state...");

  const state = myRoundToGeminiGameStateForPlay(botCardPlay);
  console.log("Derived game state for bot's turn: ", util.inspect(state, { depth: null, colors: true }));
  const config = {
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.HIGH,
    },
    mediaResolution: MediaResolution.MEDIA_RESOLUTION_LOW,
    responseMimeType: "application/json",
    systemInstruction: [
      {
        text: systemPrompt,
      }
    ],
  };
  const model = modelName;
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: myRoundToGeminiGameStateForPlay(botCardPlay),
        },
      ],
    },
  ];

  const response = await client.models.generateContent({
    model,
    config,
    contents,
  });

  if (!response.text) {
    throw new Error("No text response from Gemini");
  }
  console.log("Raw result from Gemini for play card:", util.inspect(response, { depth: null, colors: true }));
  const resultJson = JSON.parse(response.text) as AiPlayCardResult;

  const cardLogic = resultJson?.reasoning || "Bot logic for playing a card";
  const cardChatMessage = resultJson?.card_chat_message || "I just played a random card.";
  return {
    card: resultJson?.card ? cardCodeToCard(resultJson.card) : null,
    cardLogic: cardLogic,
    cardChatMessage: cardChatMessage,
    success: true,
  } as IBotCardPlayResponse;
};

// The DEFAULT export that Piscina calls
export default async (input: IBotTask) => {
  if (input.task === "promise") {
    return await getBotPromiseTask(input.botPromise as IBotPromise);
  } else {
    return await getBotCardPlayTask(input.botCardPlay as IBotCardPlay);
  }
};
