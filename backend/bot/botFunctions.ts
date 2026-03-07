import OpenAI from "openai";
import { IuiCard } from "../../frontend/src/interfaces/IuiPlayingGame";
import { CardCode, DecisionMode, GameStateForPromise, GameStateForTurn, AiPlayCardResult, Suit, AiPromiseResult, PlayerPublicState, PlayerPublicStateForPlay, RoundPromiseType } from "./botTypes";
import { IGameOptions, IRound } from "../interfaces/IGameOptions";
import { roundToPlayer } from "../actions/playingGame";
import { IBotCardPlay, IBotPromise } from "../interfaces/IBot";
import { getGamePointsForPlayer } from "../common/statsFunctions";
import { getCurrentPlayIndex, winnerOfPlay } from "../common/common";

// Correct tool definition
export const makePromiseTool: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "make_promise",
    description: "Makes a promise for the current round.",
    parameters: {
      type: "object",
      properties: {
        promise: {
          type: "number",
          description:
            "The number of tricks to promise."
        },
        confidence: {
          type: "number",
          description: "Confidence from 0.0 to 1.0.",
          minimum: 0,
          maximum: 1
        },
        mode: {
          type: "string",
          description: "Decision mode used by the agent.",
          enum: ["normal", "sabotage", "safe", "risky"]
        },
        reasoning: {
          type: "string",
          description: "Short explanation referencing promise, trump, trick state, sabotage target, etc."
        },
        promise_chat_message: {
          type: "string",
          description: "Message to say when making the promise but do not reveal your hand in any manner - of course you can fool other players. Max 500 chars."
        }
      },
      required: ["promise", "reasoning", "promise_chat_message" ],
      additionalProperties: false
    }
  }
};

export const playCardTool: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "play_card",
    description: "Selects a legal card to play for this trick and explains the reasoning.",
    parameters: {
      type: "object",
      properties: {
        card: {
          type: "string",
          description:
            "The chosen card to play, e.g., 'AS', '10H', 'QD'. Must be in legal_cards."
        },
        confidence: {
          type: "number",
          description: "Confidence from 0.0 to 1.0.",
          minimum: 0,
          maximum: 1
        },
        mode: {
          type: "string",
          description: "Decision mode used by the agent.",
          enum: ["normal", "sabotage", "safe", "risky"]
        },
        reasoning: {
          type: "string",
          description: "Short explanation referencing promise, trump, trick state, sabotage target, etc."
        },
        card_chat_message: {
          type: "string",
          description: "Message to say when playing the card but do not reveal your hand in any manner - of course you can fool other players. Max 500 chars."
        }
      },
      required: ["card", "reasoning", "card_chat_message" ],
      additionalProperties: false
    }
  }
};

export const handlePromiseCall = (
  args: AiPromiseResult,
  state: GameStateForPromise
): AiPromiseResult => {
  const { promise } = args;

  if (promise < 0 || promise > state.hand.length) {
    throw new Error(
      `Illegal promise: ${promise}. Must be between 0 and ${state.hand.length}`
    );
  }

  // Optionally enrich / clamp values
  const confidence =
    typeof args.confidence === "number"
      ? Math.max(0, Math.min(1, args.confidence))
      : undefined;

  const mode: DecisionMode | undefined = args.mode && ["normal","sabotage","safe","risky"].includes(args.mode)
    ? args.mode
    : undefined;

  return {
    promise,
    confidence,
    mode,
    reasoning: args.reasoning?.slice(0, 1000) ?? "No reasoning provided by the model.",
    promise_chat_message: args.promise_chat_message?.slice(0, 500) // optional message to say when playing the card
  } as AiPromiseResult;
};

export const handlePlayCardCall = (
  args: AiPlayCardResult,
  state: GameStateForTurn
): AiPlayCardResult => {
  const { card } = args;

  if (!state.legal_cards.includes(card)) {
    throw new Error(
      `Illegal move: ${card}. Legal options are: ${state.legal_cards.join(", ")}`
    );
  }

  // Optionally enrich / clamp values
  const confidence =
    typeof args.confidence === "number"
      ? Math.max(0, Math.min(1, args.confidence))
      : undefined;

  const mode: DecisionMode | undefined = args.mode && ["normal","sabotage","safe","risky"].includes(args.mode)
    ? args.mode
    : undefined;

  return {
    card,
    confidence,
    mode,
    reasoning: args.reasoning?.slice(0, 1000) ?? "No reasoning provided by the model.",
    card_chat_message: args.card_chat_message?.slice(0, 500) // optional message to say when playing the card
  } as AiPlayCardResult;
};

export const cardCodeToCard = (code: CardCode): IuiCard  => {
  const match = code.match(/^(10|[2-9]|[AJQK])([SHDC])$/);
  if (!match) {
    throw new Error(`Invalid card code: ${code}`);
  }
  const [, rank, suit] = match;
  return {
    value: rank === "A" ? 14 : rank === "K" ? 13 : rank === "Q" ? 12 : rank === "J" ? 11 : parseInt(rank),
    suite: suit === "S" ? "spades" : suit === "H" ? "hearts" : suit === "D" ? "diamonds" : "clubs",
    rank: rank,
  } as IuiCard;
};

const cardToCardCode = (card: IuiCard): CardCode => {
  const rank = card.value === 14 ? "A" : card.value === 13 ? "K" : card.value === 12 ? "Q" : card.value === 11 ? "J" : card.value.toString();
  const suit = card.suite === "spades" ? "S" : card.suite === "hearts" ? "H" : card.suite === "diamonds" ? "D" : "C";
  return `${rank}${suit}` as CardCode;
};

const getCardsPlayedSoFar = (round: IRound): CardCode[] => {
  const cardsPlayed: CardCode[] = [];
  for (const play of round.cardsPlayed) {
    for (const card of play) {
      cardsPlayed.push(cardToCardCode(card.card));
    }
  }
  return cardsPlayed;
};

const playerHasNoSuits = (playerName: string, round: IRound): Suit[] => {
  const suits: Suit[] = [];
  for (const play of round.cardsPlayed) {
    let leadSuit: Suit | null = null;
    for (let i = 0; i < play.length; i++) {
      const card = play[i];
      if (i === 0) {
        // this is leading suit, if player did not follow it, we know they do not have it
        leadSuit = card.card.suite.toUpperCase().substring(0,1) as Suit;
      } else if (card.name === playerName) {
        if (card.card.suite.toUpperCase().substring(0,1) !== leadSuit) {
          // player did not follow suit, we can add the leading suit to the list of suits they might not have
          if (leadSuit && !suits.includes(leadSuit)) {
            suits.push(leadSuit);
          }
        }
      }
    }
  }
  return suits;
};

const roundPromiseType = (round: IRound): RoundPromiseType => {
  const totalPromise = round.roundPlayers.reduce((sum, player) => sum + (player.promise ?? 0), 0);
  if (totalPromise > round.cardsInRound) {
    return "over";
  } else if (totalPromise < round.cardsInRound) {
    return "under";
  } else {
    return "even";
  }
};

const playersInOrderForPromise = (game: IGameOptions, roundInd: number, myName: string): PlayerPublicState[] => {
  const playerOrder: PlayerPublicState[] = [];
  const round = game.game.rounds[roundInd];
  const playerCount = round.roundPlayers.length;
  for (let i = round.starterPositionIndex; i < round.starterPositionIndex + playerCount; i++) {
    const checkInd = i >= playerCount ? i - playerCount : i;
    const player = round.roundPlayers[checkInd];
    playerOrder.push({
      name: player.name,
      this_is_me: player.name === myName,
      promise: player.promise ?? "not promised yet",
      score: getGamePointsForPlayer(game.game.rounds, player.name),
    });
  }
  return playerOrder;
};

const playersInOrderForPlay = (game: IGameOptions, roundInd: number, myName: string): PlayerPublicStateForPlay[] => {
  const playerOrder: PlayerPublicStateForPlay[] = [];
  const round = game.game.rounds[roundInd];
  const currentPlayIndex = getCurrentPlayIndex(round);
  const playerCount = round.roundPlayers.length;
  if (currentPlayIndex === 0) {
    // first play of the round, use starter position index to determine player order
    for (let i = round.starterPositionIndex; i < round.starterPositionIndex + playerCount; i++) {
      const checkInd = i >= playerCount ? i - playerCount : i;
      const player = round.roundPlayers[checkInd];
      playerOrder.push({
        name: player.name,
        this_is_me: player.name === myName,
        promise: player.promise ?? "not promised yet",
        score: getGamePointsForPlayer(game.game.rounds, player.name),
        tricks_taken: player.keeps,
        does_not_have_suits: playerHasNoSuits(player.name, round),
        has_played_cards_earlier: round.cardsPlayed.flatMap(play => play.filter(p => p.name === player.name).map(p => cardToCardCode(p.card))),
        played_card_this_trick: round.cardsPlayed[currentPlayIndex].find(p => p.name === player.name) ? cardToCardCode(round.cardsPlayed[currentPlayIndex].find(p => p.name === player.name)!.card) : null,
      });
    }
  } else {
    // not first play, use current play index to determine player order (the player in turn is first, then the rest in order)
    const prevWinner = winnerOfPlay(round.cardsPlayed[currentPlayIndex-1], round.trumpCard.suite);
    const starterIndex = round.roundPlayers.findIndex(player => player.name === prevWinner!.name);
    for (let i = starterIndex; i < starterIndex + playerCount; i++) {
      const checkInd = i >= playerCount ? i - playerCount : i;
      const player = round.roundPlayers[checkInd];
      playerOrder.push({
        name: player.name,
        this_is_me: player.name === myName,
        promise: player.promise ?? "not promised yet",
        score: getGamePointsForPlayer(game.game.rounds, player.name),
        tricks_taken: player.keeps,
        does_not_have_suits: playerHasNoSuits(player.name, round),
        has_played_cards_earlier: round.cardsPlayed.flatMap(play => play.filter(p => p.name === player.name).map(p => cardToCardCode(p.card))),
        played_card_this_trick: round.cardsPlayed[currentPlayIndex].find(p => p.name === player.name) ? cardToCardCode(round.cardsPlayed[currentPlayIndex].find(p => p.name === player.name)!.card) : null,
      });
    }
  }
  return playerOrder;
};

export const myRoundToGameStateForPromise = (botPromise: IBotPromise): GameStateForPromise => {
  const { game, roundInd, botName } = botPromise;
  const myRound = roundToPlayer(game as IGameOptions, roundInd, botName || "unknown_bot");
  // const myIndex = myRound.promiseTable.players.findIndex(p => p === botPromise.botName);

  return {
    players_in_order: playersInOrderForPromise(game!, roundInd, botName || "unknown_bot"),
    hand: myRound.myCards.map(card => cardToCardCode(card)),
    trump: myRound.trumpCard?.suite.toUpperCase().substring(0,1) as GameStateForPromise["trump"] || "H", // default to Hearts if not provided
    deal_round: myRound.cardsInRound,
    round_type: myRound.cardsInRound >= 6 ? "big" : "small",
    round_promise_type: roundPromiseType(game!.game.rounds[roundInd]),
  };
};

export const myRoundToGameStateForTurn = (botCardPlay: IBotCardPlay): GameStateForTurn => {
  const { game, roundInd, botName } = botCardPlay;
  const round = (game as IGameOptions).game.rounds[roundInd];
  const myRound = roundToPlayer(game as IGameOptions, roundInd, botName || "unknown_bot");
  // const myIndex = myRound.promiseTable.players.findIndex(p => p === botCardPlay.botName);
  const me = myRound.players.find(p => p.name === botName) || { promise: 0, keeps: 0, name: botName || "unknown_bot", score: 0 };

  return {
    players_in_order: playersInOrderForPlay(game!, roundInd, botName || "unknown_bot"),
    hand: myRound.myCards.map(card => cardToCardCode(card)),
    legal_cards: myRound.playableCards.map(index => cardToCardCode(myRound.myCards[index])),
    trump: myRound.trumpCard?.suite.toUpperCase().substring(0,1) as GameStateForTurn["trump"] || "H", // default to Hearts if not provided
    deal_round: myRound.cardsInRound,
    round_type: myRound.cardsInRound >= 6 ? "big" : "small",
    your_promise: me.promise ?? 0,
    your_tricks_taken: me.keeps ?? 0,
    trick_so_far: myRound.cardsPlayed.map(play => ({
      player: play.name,
      card: cardToCardCode(play.card)
    })),
    cards_played_in_this_game: getCardsPlayedSoFar(round),
    round_promise_type: roundPromiseType(round),
  };
};

//#region Gemini prompt construction functions
const geminiBasicInfoFromIBotPromise = (game: IGameOptions, roundInd: number, botName: string): string => {
  const round = game.game.rounds[roundInd];
  return `
You are a bot playing a card game. Here is the current game state:
- There are ${round.roundPlayers.length - 1} other players in the game. You are playing against them.
- Your name is ${botName}, the other players are ${round.roundPlayers.filter(p => p.name !== botName).map(p => p.name).join(", ")}.
- The game is currently in round ${roundInd + 1} and every player started with ${round.cardsInRound} cards in this round, so this is ${round.cardsInRound >= 6 ? "a big round" : "a small round"}.
- The trump card revealed for this round is ${cardToCardCode(round.trumpCard)}.
- ${round.cardsInRound * (round.roundPlayers.length + 1)} cards have been dealt in this round plus the trump card so there are ${52 - (round.cardsInRound * (round.roundPlayers.length + 1) + 1)} cards that have not been dealt and are not in play in this round. Keep this in mind when making your promise and try to deduce what cards the other players might have in their hands based on the cards played in this round and the previous rounds.
- The total scores of the players so far are: ${round.roundPlayers.map(p => `${p.name}: ${getGamePointsForPlayer(game.game.rounds, p.name)}`).join(", ")}.
- Your have these cards in your hand at the moment: ${round.roundPlayers.find(p => p.name === botName)?.cards.map(c => cardToCardCode(c)).join(", ") || "unknown"}.
`;
};

const indexToPosition = (index: number, totalPlayers?: number): string => {
  const positions = ["first", "second", "third", "fourth", "fifth", "sixth"];
  if (totalPlayers && index === totalPlayers - 1) {
    return "last";
  }
  return positions[index] || `position ${index}`;
};

const promisesSoFarToString = (playersInOrder: PlayerPublicState[]): string => {
  return playersInOrder.map(p => `${p.name} ${p.promise !== null ? "promised " + p.promise : "has not promised yet"}`).join(", ");
};

const geminiPromisesSoFar = (botPromise: IBotPromise): string => {
  const game: IGameOptions = botPromise.game!;

  const playersInOrder = playersInOrderForPromise(game, botPromise.roundInd, botPromise.botName || "unknown_bot");
  const myIndex = playersInOrder.findIndex(p => p.name === botPromise.botName);
  const myPosition = indexToPosition(myIndex, playersInOrder.length);

  return `
- You are the ${myPosition} player and promiser in this round.
- Promises so far in order: ${promisesSoFarToString(playersInOrder)}.
`;
};

const geminiBasicPromiseInstruction = (): string => {

  return `

You will decide a promise for the current round with information given above.
The promise is the number of tricks you think you will take in this round, from 0 to the number of cards in this round. You want to make a promise that you think you can achieve based on your hand and the game state. You can also consider the current scores of the players and whether you want to play it safe or take a risk.
You can use the information about the trump card, your hand, and the scores of the players to make your decision. You want to make a promise that you think you can achieve based on your hand and the game state. You can also consider the current scores of the players and whether you want to play it safe or take a risk.

What is your promise and why? Say also something about your reasoning as chat line but do not reveal your hand or strategy in any way. You can be playful or misleading if you want, but try to make it sound like a reasonable promise based on the game state. Do not say anything that would directly reveal your cards or your exact strategy to the other players.
Respond with a JSON object with the following format:
{
  "promise": integer, // between 0 and the number of cards in the round, inclusive
  "confidence": number, // 0..1 indicating your confidence in this promise
  "reasoning": string, // a short explanation of the reasoning behind the promise, tied to the rules and strategies above
  "promise_chat_message": string // a message to show to the other players when making the promise, never reveal your hand or strategy in this message, but you can be playful or misleading if you want
}
`;
};

const geminiBasicPlayState = (botCardPlay: IBotCardPlay): string => {
  const game: IGameOptions = botCardPlay.game!;
  const { roundInd, botName } = botCardPlay;
  const round = game.game.rounds[roundInd];
  const myRound = roundToPlayer(game as IGameOptions, roundInd, botName || "unknown_bot");
  const playersInOrder = playersInOrderForPlay(game, roundInd, botName || "unknown_bot");
  let stateString = `Players in order: ${playersInOrder.map(p => p.name).join(", ")}.`;
  stateString += "\nOther players have promised to take the following number of tricks in this round: " + playersInOrder.filter(p => p.this_is_me === false).map(p => `${p.name}: ${p.promise}`).join(", ") + ".";
  if (round.cardsPlayed.length === 1) {
    stateString += "\nThis is the first round, so no one has taken any tricks yet.";
    stateString += `\nYour promise for this round is ${playersInOrder.find(p => p.this_is_me)?.promise ?? "unknown"}.`;
  } else {
    stateString += "\nIn the previous rounds, the players have taken the following number of tricks: " + playersInOrder.filter(p => p.this_is_me === false).map(p => `${p.name}: ${p.tricks_taken}`).join(", ") + ".";
    stateString += `\nYour promise for this round is ${playersInOrder.find(p => p.this_is_me)?.promise ?? "unknown"}, and you have taken ${playersInOrder.find(p => p.this_is_me)?.tricks_taken ?? "unknown"} tricks so far.`;
  }
  stateString += `\nBased on the total promises and tricks available, this round is a ${roundPromiseType(round)} promised round.`;
  if (playersInOrder[0].this_is_me) {
    stateString += "\nYou are the first player in this trick, so you can play any card.";
  } else {
    stateString += `\nThe lead player for this trick is ${playersInOrder[0].name}, so you must follow suit if you have any cards of the lead suit. The lead suit for this trick is determined by the first card played in this trick, which is ${playersInOrder[0].played_card_this_trick || "unknown"}. If you do not have any cards of the lead suit, you can play any card. Remember to consider your promise and how many tricks you have taken so far in this round when making your decision.`;
    for (let i = 1; i < playersInOrder.length; i++) {
      if (playersInOrder[i].this_is_me) {
        stateString += `\nYou are the ${indexToPosition(i, playersInOrder.length)} player to play and now it is your turn to play a card. Consider the current trick state, your hand, the trump suit, and your promise when making your decision.`;
        break;
      } else {
        stateString += `\nThe ${indexToPosition(i, playersInOrder.length)} player to play in this trick was ${playersInOrder[i].name} and he/she played ${playersInOrder[i].played_card_this_trick || "unknown"}`;
        if (cardCodeToCard(playersInOrder[i].played_card_this_trick!).suite !== cardCodeToCard(playersInOrder[0].played_card_this_trick!).suite) {
          stateString += " and broke the lead suit so he/she does not have any more cards of the lead suit.";
        } else {
          stateString += ".";
        }
      }
    }
    const playWinner = myRound.playerGoingToWinThisPlay!;
    stateString += `\nBased on the current trick state, ${playWinner} is likely to win this trick with the card ${playersInOrder.find(p => p.name === playWinner)?.played_card_this_trick || "unknown"}.`;
  }
  stateString += "\nYou can play the following legal cards from your hand (legal_cards): " + myRound.playableCards.map(index => cardToCardCode(myRound.myCards[index])).join(", ");
  if (playersInOrder.findIndex(p => p.this_is_me) < playersInOrder.length - 1) {
    stateString += `\nThe players who have not yet played in this trick are: ${playersInOrder.filter(p => p.this_is_me === false && !p.played_card_this_trick).map(p => p.name).join(", ")}.`;
  }

  if (roundInd > 0) {
    stateString += `\nThe cards played in this game so far are: ${getCardsPlayedSoFar(round).join(", ")} so they and the trump card ${cardToCardCode(myRound.trumpCard!)} are not available to play by any player anymore.`;
  }
  if (playersInOrder.some(p => p.this_is_me === false && p.does_not_have_suits.length > 0)) {
    stateString += `\nBased on the previous tricks, you know that some players do not have cards of certain suits anymore in their hands: ${playersInOrder.filter(p => p.this_is_me === false && p.does_not_have_suits.length > 0).map(p => `${p.name} does not have ${p.does_not_have_suits.join(", ")}`).join("; ")}.`;
  }

  return stateString;
};

const geminiBasicPlayInstruction = (): string => {

  return `

Card is represented as a string with rank followed by suit, e.g. "AS" for Ace of Spades, "10H" for Ten of Hearts, "QD" for Queen of Diamonds, etc.
You must choose a card from the legal_cards list. Use the information about the current trick, your hand, the trump suit, and the game state to make your decision. You can also consider your promise and how many tricks you have taken so far in this round.
Try to win the trick if it helps you achieve your promise, but also consider when it might be better to lose a trick. You can also consider the current scores of the players and whether you want to play it safe or take a risk.

Which card do you play and why? Say also something about your reasoning as chat line but do not reveal your hand or strategy in any way. You can be playful or misleading if you want, but try to make it sound like a reasonable play based on the game state. Do not say anything that would directly reveal your cards or your exact strategy to the other players.
Respond with a JSON object with the following format:
{
  "card": string, // one of legal_cards
  "mode": string, // 'normal' unless promise is impossible, then 'sabotage'; use 'safe' when ahead and 'risky' when behind
  "confidence": number, // 0..1 indicating your confidence in this play
  "reasoning": string, // a short, actionable explanation tied to the rules (trump, lead suit, promise, sabotage target, possibility to win or lose trick)
  "card_chat_message": string // a message to show to the user when playing the card, never reveal your hand or strategy in this message, but you can be playful or misleading if you want
}
`;
};

export const myRoundToGeminiGameStateForPromise = (botPromise: IBotPromise): string => {
  return geminiBasicInfoFromIBotPromise(botPromise.game!, botPromise.roundInd, botPromise.botName!) +
    geminiPromisesSoFar(botPromise) +
    geminiBasicPromiseInstruction();
};

export const myRoundToGeminiGameStateForPlay = (botCardPlay: IBotCardPlay): string => {
  const game: IGameOptions = botCardPlay.game!;
  return geminiBasicInfoFromIBotPromise(game, botCardPlay.roundInd, botCardPlay.botName!) +
    geminiBasicPlayState(botCardPlay) +
    geminiBasicPlayInstruction();
};

//#endregion
