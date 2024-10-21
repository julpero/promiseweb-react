import { knuthShuffle } from "knuth-shuffle";
import { Card, DeckOfCards, Suite } from "card-games-typescript";
import { ICardPlayed, IGameOptions, IGame, IPlayer, IRound, IRoundPlayer } from "../interfaces/IGameOptions";
import { GAME_STATUS, ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { startRound } from "./game";
import { getPlayerStats } from "./common";

export const startGame = async (gameInDb: IGameOptions): Promise<boolean> => {
  try {
    gameInDb.game = {
      playerOrder: [],
      rounds: [],
      lastTimeStamp: 0,
    } as IGame;
    await initPlayers(gameInDb);
    initRounds(gameInDb);

    gameInDb.game.lastTimeStamp = Date.now();
    gameInDb.gameStatus = GAME_STATUS.onGoing;
    gameInDb.gameStarted = new Date();
    startRound(gameInDb, 0);
  } catch (error: unknown) {
    console.error("startGame exception!", error);
    return false;
  }
  return true;
};

const getDealerPositionIndex = (roundIndex: number, totalPlayers: number): number => {
  if (roundIndex < totalPlayers) return roundIndex;
  return getDealerPositionIndex(roundIndex - totalPlayers, totalPlayers);
};

const initPlayers = async (gameInDb: IGameOptions) => {
  const players: IPlayer[] = gameInDb.humanPlayers.map(player => { return { name: player.name } as IPlayer; });
  gameInDb.game.playerOrder = knuthShuffle(players).map((player) => {
    return {
      name: player.name,
      type: "human",
    } as IPlayer;
  });

  // creators stats are generated when creating game
  for (let i = 1; i < gameInDb.humanPlayers.length; i++) {
    gameInDb.humanPlayers[i].playerStats = await getPlayerStats(gameInDb, gameInDb.humanPlayers[i].name);
  }
  // console.log(gameInDb.game.playerOrder);
};

const initDeck = (): DeckOfCards => {
  const deck = new DeckOfCards(52);
  deck.shuffleDeck(5);
  return deck;
};

const sortCards = (cards: Card[]): Card[] => {
  const sortedCards: Card[] = [];
  const suits: Suite[] = ["hearts", "diamonds", "clubs", "spades"];
  suits.forEach(suit => {
    for (let i = 2; i <= 14; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (cards[j].suite === suit && cards[j].value === i) sortedCards.push(cards[j]);
      }
    }
  });

  return sortedCards;
};

const initRound = (roundIndex: number, cardsInRound: number, players: IPlayer[], speedPromise: boolean): IRound => {
  const deck = initDeck();
  const roundPlayers: IRoundPlayer[] = [];
  players.forEach(player => {
    const playerCards: Card[] = [];
    for (let i = 0; i < cardsInRound; i++) {
      playerCards.push(deck.drawCard());
    }
    const sortedCards = sortCards(playerCards);
    roundPlayers.push({
      name: player.name,
      cards: sortedCards,
      promise: null,
      rePromise: null,
      promiseStarted: null,
      promiseMade: null,
      keeps: 0,
      points: null,
      cardsToDebug: sortedCards,
      type: "human",
      speedPromisePoints: speedPromise ? 1 : null,
      speedPromiseTotal: null,
      evenBreakingBonus: null,
      rePromiseBonus: null,
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
    roundStatus: ROUND_STATUS.initialized,
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
