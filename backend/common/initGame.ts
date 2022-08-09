import { knuthShuffle } from "knuth-shuffle";
import { Card, DeckOfCards, Suite } from "card-games-typescript";
import { ICardPlayed, IGameOptions, IPlayer, IRound, IRoundPlayer } from "../interfaces/IGameOptions";
import { getPlayerNameInPlayerOrder } from "./common";
import { ROUND_STATUS } from "../../frontend/src/interfaces/IGameOptions";

export const startGame = (gameInDb: IGameOptions) => {
  initPlayers(gameInDb);
  initRounds(gameInDb);
};

const getDealerPositionIndex = (roundIndex: number, totalPlayers: number): number => {
  if (roundIndex < totalPlayers) return roundIndex;
  return getDealerPositionIndex(roundIndex - totalPlayers, totalPlayers);
};

const initPlayers = (gameInDb: IGameOptions): void => {
  gameInDb.game.playerOrder = knuthShuffle(gameInDb.humanPlayers).map((humanPlayer) => {
    return {
      name: humanPlayer.name,
      type: "human",
    } as IPlayer;
  });
};

const initDeck = (): DeckOfCards => {
  const deck = new DeckOfCards(52);
  console.log("deck init", deck);
  deck.shuffleDeck(5);
  console.log("deck shuffled", deck);
  return deck;
};

const sortCards = (cards: Card[]): Card[] => {
  const sortedCards: Card[] = [];
  const suits: Suite[] = ["hearts", "diamonds", "clubs", "spades"];
  suits.forEach(suit => {
    for (let i = 2; i <= 14; i++) {
      if (cards[i].suite === suit && cards[i].value === i) sortedCards.push(cards[i]);
    }
  });

  return sortedCards;
};

const initRound = (roundIndex: number, cardsInRound: number, players: IPlayer[] | string[], speedPromise: boolean): IRound => {
  const deck = initDeck();
  const roundPlayers: IRoundPlayer[] = [];
  players.forEach(player => {
    const playerCards: Card[] = [];
    for (let i = 0; i < cardsInRound; i++) {
      playerCards.push(deck.drawCard());
    }
    console.log("cards before", playerCards);
    const sortedCards = sortCards(playerCards);
    console.log("cards after", sortedCards);
    roundPlayers.push({
      name: getPlayerNameInPlayerOrder(player),
      cards: sortedCards,
      promise: null,
      promiseStarted: null,
      promiseMade: null,
      keeps: 0,
      points: null,
      cardsToDebug: sortedCards,
      type: "human",
      speedPromisePoints: speedPromise ? 1 : null,
      speedPromiseTotal: null,
    } as IRoundPlayer);
  });

  const dealerPositionIndex = getDealerPositionIndex(roundIndex, players.length);
  let starterPositionIndex = dealerPositionIndex + 1;
  if (starterPositionIndex >= players.length) starterPositionIndex-= players.length;

  const cardsPlayed: ICardPlayed[][] = [];
  cardsPlayed.push([]);

  return {
    roundIndex: roundIndex,
    cardsInRound: cardsInRound,
    dealerPositionIndex: dealerPositionIndex,
    starterPositionIndex: starterPositionIndex,
    roundPlayers: roundPlayers,
    trumpCard: deck.drawCard(),
    totalPromise: null,
    cardsPlayed: cardsPlayed,
    roundStatus: ROUND_STATUS.Initialized,
  } as IRound;
};

const initRounds = (gameInDb: IGameOptions): void => {
  const rounds: IRound[] = [];
  let roundIndex = 0;
  for (let i = gameInDb.startRound; i >= gameInDb.turnRound; i--) {
    rounds.push(initRound(roundIndex, i, gameInDb.game.playerOrder, gameInDb.speedPromise));
    roundIndex++;
  }
  for (let i = gameInDb.turnRound+1; i <= gameInDb.endRound; i++) {
    rounds.push(initRound(roundIndex, i, gameInDb.game.playerOrder, gameInDb.speedPromise));
    roundIndex++;
  }
  gameInDb.game.rounds = rounds;
};
