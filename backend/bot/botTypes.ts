export type Suit = "S" | "H" | "D" | "C"; // Spades, Hearts, Diamonds, Clubs

export type CardCode = `${number}${Suit}` | `A${Suit}` | `K${Suit}` | `Q${Suit}` | `J${Suit}`;
// Examples: "2C","10H","QS","AD"

export interface PlayerPublicState {
  name: string;
  promise?: number;
  score: number;
  thisIsMe: boolean;
}

export interface PlayerPublicStateForPlay extends PlayerPublicState {
  tricksTaken: number;
  doesNotHaveSuits: Suit[]; // Optional property to indicate if we know the player does not have a certain suits
}

export interface TrickPlay {
  player: string;
  card: CardCode;
}

export type RoundType = "big" | "small";

export interface GameStateForAi {
  hand: CardCode[];
  trump: Suit;
  deal_round: number;       // number of cards dealt to each player this deal
  round_type: RoundType;    // "big" (>=6) | "small" (<=5)
}
export interface GameStateForPromise extends GameStateForAi {
  players_in_order: PlayerPublicState[]; // players in the order they will promise, with info on their promises and scores
}

export interface GameStateForTurn extends GameStateForAi {
  legal_cards: CardCode[];
  your_promise: number;
  your_tricks_taken: number;
  players_in_order: PlayerPublicStateForPlay[]; // players in the order they will play, with info on their promises, scores, tricks taken, and known suit information
  trick_so_far: TrickPlay[]; // cards played in current trick in order
  cards_played: CardCode[];  // all cards played in the round so far
}

export type DecisionMode = "normal" | "sabotage" | "safe" | "risky";

export interface AiPromiseResult {
  promise: number;
  confidence?: number; // 0..1
  mode?: DecisionMode;
  reasoning: string;
  promiseChatMessage?: string; // Optional message to say when playing the card
}

export interface AiPlayCardResult {
  card: CardCode;
  confidence?: number; // 0..1
  mode?: DecisionMode;
  reasoning: string;
  cardChatMessage?: string; // Optional message to say when playing the card
}
