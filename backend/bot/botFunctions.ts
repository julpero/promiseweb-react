import OpenAI from "openai";
import { IuiCard } from "../../frontend/src/interfaces/IuiPlayingGame";
import { CardCode, DecisionMode, GameStateForPromise, GameStateForTurn, AiPlayCardResult, Suit, AiPromiseResult, PlayerPublicState, PlayerPublicStateForPlay } from "./botTypes";
import { IGameOptions, IRound } from "../interfaces/IGameOptions";
import { roundToPlayer } from "../actions/playingGame";
import { IBotCardPlay, IBotPromise } from "../interfaces/IBot";
import { getGamePointsForPlayer } from "../common/statsFunctions";
import { getPlayerInTurn } from "../common/common";

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
        promiseChatMessage: {
          type: "string",
          description: "Message to say when making the promise but do not reveal your hand in any manner - of course you can fool other players. Max 500 chars."
        }
      },
      required: ["promise", "reasoning", "promiseChatMessage" ],
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
        cardChatMessage: {
          type: "string",
          description: "Message to say when playing the card but do not reveal your hand in any manner - of course you can fool other players. Max 500 chars."
        }
      },
      required: ["card", "reasoning", "cardChatMessage" ],
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
    promiseChatMessage: args.promiseChatMessage?.slice(0, 500) // optional message to say when playing the card
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
    cardChatMessage: args.cardChatMessage?.slice(0, 500) // optional message to say when playing the card
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

const playersInOrderForPromise = (game: IGameOptions, roundInd: number, myName: string): PlayerPublicState[] => {
  const playerOrder: PlayerPublicState[] = [];
  const round = game.game.rounds[roundInd];
  for (let i = round.starterPositionIndex; i < round.starterPositionIndex + round.roundPlayers.length; i++) {
    const checkInd = i >= round.roundPlayers.length ? i - round.roundPlayers.length : i;
    const player = round.roundPlayers[checkInd];
    playerOrder.push({
      name: player.name,
      thisIsMe: player.name === myName,
      promise: player.promise ?? undefined,
      score: getGamePointsForPlayer(game.game.rounds, player.name),
    });
  }
  return playerOrder;
};

const playersInOrderForPlay = (game: IGameOptions, roundInd: number, myName: string): PlayerPublicStateForPlay[] => {
  const playerOrder: PlayerPublicStateForPlay[] = [];
  const round = game.game.rounds[roundInd];
  const currentPlayIndex = getPlayerInTurn(round)?.index;
  if (currentPlayIndex === undefined || currentPlayIndex === null) {
    throw new Error("No player in turn found for round " + roundInd);
  }
  for (let i = currentPlayIndex; i < currentPlayIndex + round.roundPlayers.length; i++) {
    const checkInd = i >= round.roundPlayers.length ? i - round.roundPlayers.length : i;
    const player = round.roundPlayers[checkInd];
    playerOrder.push({
      name: player.name,
      thisIsMe: player.name === myName,
      promise: player.promise ?? undefined,
      score: getGamePointsForPlayer(game.game.rounds, player.name),
      tricksTaken: player.keeps,
      doesNotHaveSuits: playerHasNoSuits(player.name, round),
    });
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
  } as GameStateForPromise;
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
    trump: myRound.trumpCard?.suite.toUpperCase() as GameStateForTurn["trump"] || "H", // default to Hearts if not provided
    deal_round: myRound.cardsInRound,
    round_type: myRound.cardsInRound >= 6 ? "big" : "small",
    your_promise: me.promise ?? 0,
    your_tricks_taken: me.keeps ?? 0,
    trick_so_far: myRound.cardsPlayed.map(play => ({
      player: play.name,
      card: cardToCardCode(play.card)
    })),
    cards_played: getCardsPlayedSoFar(round),
  } as GameStateForTurn;
};
