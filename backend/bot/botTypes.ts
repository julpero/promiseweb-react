export type Suit = "S" | "H" | "D" | "C"; // Spades, Hearts, Diamonds, Clubs

export type CardCode = `${number}${Suit}` | `A${Suit}` | `K${Suit}` | `Q${Suit}` | `J${Suit}`;
// Examples: "2C","10H","QS","AD"

export interface PlayerPublicState {
  name: string;
  promise: number;
  tricksTaken: number;
  score: number;
  doesNotHaveSuits: Suit[]; // Optional property to indicate if we know the player does not have a certain suits
}

export interface TrickPlay {
  player: string;
  card: CardCode;
}

export type RoundType = "big" | "small";

export interface GameStateForTurn {
  hand: CardCode[];
  legal_cards: CardCode[];
  trump: Suit;
  deal_round: number;       // number of cards dealt to each player this deal
  round_type: RoundType;    // "big" (>=6) | "small" (<=5)
  your_promise: number;
  your_tricks_taken: number;
  other_players: PlayerPublicState[];
  trick_so_far: TrickPlay[]; // cards played in current trick in order
  cards_played: CardCode[];  // all cards played in the round so far
}

export type DecisionMode = "normal" | "sabotage" | "safe" | "risky";

export interface PlayCardResult {
  card: CardCode;
  confidence?: number; // 0..1
  mode?: DecisionMode;
  reasoning: string;
  cardChatMessage?: string; // Optional message to say when playing the card
}
