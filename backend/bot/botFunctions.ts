import OpenAI from "openai";
import { IuiCard } from "../../frontend/src/interfaces/IuiPlayingGame";
import { CardCode, DecisionMode, GameStateForTurn, PlayCardResult } from "./botTypes";
import { IGameOptions } from "../interfaces/IGameOptions";
import { roundToPlayer } from "../actions/playingGame";
import { IBotCardPlay } from "../interfaces/IBot";
import { getGamePointsForPlayer } from "../common/statsFunctions";

// Correct tool definition
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

export const handlePlayCardCall = (
  args: PlayCardResult,
  state: GameStateForTurn
): PlayCardResult => {
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
  };
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

export const myRoundToGameStateForTurn = (botCardPlay: IBotCardPlay): GameStateForTurn => {
  const { roundInd, botName } = botCardPlay;
  const myRound = roundToPlayer(botCardPlay.game as IGameOptions, roundInd, botName || "unknown_bot");
  // const myIndex = myRound.promiseTable.players.findIndex(p => p === botCardPlay.botName);
  const me = myRound.players.find(p => p.name === botName) || { promise: 0, keeps: 0, name: botName || "unknown_bot", score: 0 };

  return {
    hand: myRound.myCards.map(card => cardToCardCode(card)),
    legal_cards: myRound.playableCards.map(index => cardToCardCode(myRound.myCards[index])),
    trump: myRound.trumpCard?.suite.toUpperCase() as GameStateForTurn["trump"] || "H", // default to Hearts if not provided
    deal_round: myRound.cardsInRound,
    round_type: myRound.cardsInRound >= 6 ? "big" : "small",
    your_promise: me.promise ?? 0,
    your_tricks_taken: me.keeps ?? 0,
    other_players: myRound.players.filter(p => p.name !== botCardPlay.botName).map(p => ({
      name: p.name,
      promise: p.promise ?? 0,
      tricksTaken: p.keeps,
      score: getGamePointsForPlayer(botCardPlay.game!.game.rounds, p.name)
    })),
    trick_so_far: myRound.cardsPlayed.map(play => ({
      player: play.name,
      card: cardToCardCode(play.card)
    })),
  };
};
