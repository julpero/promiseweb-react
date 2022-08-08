import { knuthShuffle } from "knuth-shuffle";
import { Card, DeckOfCards, Suite } from "card-games-typescript";
import { IGameOptions, IPlayer, IRound, IRoundPlayer } from "../interfaces/IGameOptions";

export const startGame = (gameInDb: IGameOptions) => {
  initPlayers(gameInDb);
  initRounds(gameInDb);
}

const initPlayers = (gameInDb: IGameOptions): void => {
  gameInDb.game.playerOrder = knuthShuffle(gameInDb.humanPlayers).map((humanPlayer) => {
    return {
      name: humanPlayer.name,
      type: "human",
    } as IPlayer
  });
}

const initDeck = (): DeckOfCards => {
  const deck = new DeckOfCards(52);
  console.log("deck init", deck);
  deck.shuffleDeck(5);
  console.log("deck shuffled", deck);
  return deck;
}

const sortCards = (cards: Card[]): Card[] => {
  const sortedCards: Card[] = [];
  const suits: Suite[] = ["hearts", "diamonds", "clubs", "spades"];
  suits.forEach(suit => {
    for (let i = 2; i <= 14; i++) {

    }
  })

  return sortedCards;
}

const initRound = (roundIndex: number, cardsInRound: number, players: IPlayer[] | string[], speedPromise: boolean): IRound => {
  const deck = initDeck();
  const roundPlayers: IRoundPlayer[] = [];
  players.forEach(player => {
    let playerCards: Card[] = [];
    for (let i = 0; i < cardsInRound; i++) {
      playerCards.push(deck.drawCard());
    }
    console.log("cards before", playerCards);
    const sortedCards = sortCards(playerCards);
    console.log("cards after", sortedCards);
  });
}

const initRounds = (gameInDb: IGameOptions): void => {
  const rounds: IRound[] = [];
  let roundIndex = 0;
  for (let i = gameInDb.startRound; i >= gameInDb.turnRound; i--) {
    rounds.push(initRound(roundIndex, i, gameInDb.game.playerOrder, gameInDb.speedPromise));
    roundIndex++;
  }
  for (let i = gameInDb.turnRound+1; i <= gameInDb.endRound; i++) {
    roundIndex++;
  }
  gameInDb.game.rounds = rounds;
}
