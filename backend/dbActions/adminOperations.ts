import mongoose from "mongoose";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { generateGameStats } from "../common/statsFunctions";
import { ICard, ICardPlayed, IGame, IGameOptions, IHumanPlayer, IPlayer, IRound, IRoundPlayer } from "../interfaces/IGameOptions";
import { OLD_PROMISEWEB_COLLECTION } from "../models/Collections";
import GameOptions from "../models/GameOptions";

interface IDummy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any,
}

export const reCreateGameStatistic = async (gameIdStr: string): Promise<boolean> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return false;
  const gameInDb = await GameOptions.findById(gameIdStr);
  if (gameInDb) {
    gameInDb.gameStatistics = generateGameStats(gameInDb.game, true);
    const gameAfter = await gameInDb.save();
    if (gameAfter) return true;
  }

  return false;
};

export const reCreateAllGamesStatistic = async (): Promise<boolean> => {
  const gameList = await GameOptions.find({
    gameStatus: GAME_STATUS.played,
  });
  for (let i = 0; i < gameList.length; i++) {
    const gameInDb = gameList[i];
    const gameIdStr = gameInDb._id.toString();
    console.log("starting to generate stats...", gameIdStr);
    gameInDb.gameStatistics = generateGameStats(gameInDb.game, true);
    const gameAfter = await gameInDb.save();
    if (!gameAfter) return false;
    console.log("... stats generated", gameIdStr);
  }

  return true;
};

const convertOldPlayerOrderToNew = (old: string[] | IPlayer[]): IPlayer[] => {
  const playerOrder: IPlayer[] = [];
  old.forEach(o => {
    if (typeof o === "string") {
      playerOrder.push({
        name: o,
        type: "human",
      } as IPlayer);
    } else {
      playerOrder.push({
        name: o.name,
        type: "human",
      } as IPlayer);
    }
  });
  return playerOrder;
};

const convertOldHumanPlayersToNew = (old: IHumanPlayer[]): IHumanPlayer[] => {
  const humanPlayers: IHumanPlayer[] = [];
  old.forEach(o => {
    humanPlayers.push({
      name: o.name,
      active: true,
    } as IHumanPlayer);
  });
  return humanPlayers;
};

const valueToRank = (value: number): string => {
  if (value === 11) return "J";
  if (value === 12) return "Q";
  if (value === 13) return "K";
  if (value === 14) return "A";
  return value.toString();
};

const convertOldCardToNew = (old: {suit: string, rank: number}): ICard => {
  return {suite: old.suit, value: old.rank, rank: valueToRank(old.rank) } as ICard;
};

const convertOldRoundPlayersToNew = (old: IDummy[]): IRoundPlayer[] => {
  const newPlayers: IRoundPlayer[] = [];
  old.forEach(oldPlayer => {
    newPlayers.push({
      name: oldPlayer.name,
      type: "human",
      cards: oldPlayer.cards.map((card: {suit: string, rank: number}) => convertOldCardToNew(card)),
      cardsToDebug: oldPlayer.cardsToDebug.map((card: {suit: string, rank: number}) => convertOldCardToNew(card)),
      promise: oldPlayer.promise,
      keeps: oldPlayer.keeps,
      points: oldPlayer.points,
      speedPromisePoints: oldPlayer.speedPromisePoints,
      speedPromiseTotal: oldPlayer.speedPromiseTotal,
      promiseStarted: oldPlayer.promiseStarted ?? 0,
      promiseMade: oldPlayer.promiseMade ?? 0,
    } as IRoundPlayer);
  });
  return newPlayers;
};

const convertOneRoundPlayToNew = (old: IDummy[]): ICardPlayed[] => {
  const oneRoundPlay: ICardPlayed[] = [];
  old.forEach(hit => {
    oneRoundPlay.push({
      name: hit.name,
      card: convertOldCardToNew(hit.card),
      playedTime: hit.playedTime ?? 0,
      playStarted: hit.playStarted ?? 0,
    } as ICardPlayed);
  });
  return oneRoundPlay;
};

const convertOldCardsPlayedToNew = (old: IDummy[][]): ICardPlayed[][] => {
  const retArr: ICardPlayed[][] = [];
  old.forEach(roundPlay => {
    retArr.push(convertOneRoundPlayToNew(roundPlay));
  });
  return retArr;
};

const convertOldRoundsToNew = (old: IDummy[]): IRound[] => {
  const rounds: IRound[] = [];
  old.forEach(oldRound => {
    rounds.push({
      roundIndex: oldRound.roundIndex,
      cardsInRound: oldRound.cardsInRound,
      dealerPositionIndex: oldRound.dealerPositionIndex,
      starterPositionIndex: oldRound.starterPositionIndex,
      trumpCard: convertOldCardToNew(oldRound.trumpCard),
      totalPromise: oldRound.totalPromise,
      roundStatus: oldRound.roundStatus,
      roundPlayers: convertOldRoundPlayersToNew(oldRound.roundPlayers),
      cardsPlayed: convertOldCardsPlayedToNew(oldRound.cardsPlayed),
    } as IRound);
  });
  return rounds;
};

const convertOldGameToNew = (game: IDummy): IGame => {
  const newGame: IGame = {
    playerOrder: convertOldPlayerOrderToNew(game.playerOrder),
    lastTimeStamp: Date.now(),
    rounds: convertOldRoundsToNew(game.rounds),
  };
  return newGame;
};

export const convertOldDataToNew = async (): Promise<string[]> => {
  console.log("convertOldDataToNew");
  const retArr: string[] = [];

  const alreadyConverted = await GameOptions.find(
    {
      oldId: {$ne: null},
    },
    {
      oldId: 1
    },
  );
  const convertedIds = alreadyConverted.flatMap(obj => {return new mongoose.Types.ObjectId(obj.oldId as string);});
  console.log("convertedIds", convertedIds);

  const oldDb = mongoose.connection.db;
  const gamesQuery = {
    "gameStatus": {$eq: GAME_STATUS.played},
    _id: {$nin: convertedIds},
    // "humanPlayers.name": {$eq: "ju-ha"},
  };

  const oldGamesCursor = oldDb.collection(OLD_PROMISEWEB_COLLECTION).find(gamesQuery).limit(50);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newGames: (mongoose.Document<unknown, any, IGameOptions> & IGameOptions & {_id: mongoose.Types.ObjectId })[] = [];
  await oldGamesCursor.forEach((oldGame) => {
    const oldId = oldGame._id.toString();
    console.log(oldId);
    const newHumanPlayers = convertOldHumanPlayersToNew(oldGame.humanPlayers);
    const newGame = convertOldGameToNew(oldGame.game);
    const newStats = generateGameStats(newGame, true);
    const convertedGame = new GameOptions({
      oldId: oldId,
      humanPlayersCount: oldGame.humanPlayersCount,
      botPlayersCount: oldGame.botPlayersCount,
      startRound: oldGame.startRound,
      turnRound: oldGame.turnRound,
      endRound: oldGame.endRound,
      adminName: oldGame.adminName,
      password: oldGame.password,
      gameStatus: oldGame.gameStatus,
      createDateTime: oldGame.createDateTime,
      humanPlayers: newHumanPlayers,
      game: newGame,
      gameStatistics: newStats,
    });
    newGames.push(convertedGame);
  });

  for (let i = 0; i < newGames.length; i++) {
    const gameAfter = await newGames[i].save();
    retArr.push(JSON.stringify(gameAfter));
    console.log("converted", gameAfter.oldId);
  }

  // return newGames.map(game => {return JSON.stringify(game);});
  // return retArr;
  console.log("conversion ready, converted count", retArr.length);
  return [];
};

export const reNameNickInGame = async (gameId: string, currentNick: string, newNick: string): Promise<boolean> => {
  if (!mongoose.isValidObjectId(gameId)) return false;

  const gameInDb = await GameOptions.findById(gameId);
  if (gameInDb) {
    const humanPlayer = gameInDb.humanPlayers.find(player => player.name === currentNick);
    if (!humanPlayer) return false;
    humanPlayer.name = newNick;

    const playerInOrder = gameInDb.game.playerOrder.find(player => player.name === currentNick);
    if (!playerInOrder) return false;
    playerInOrder.name = newNick;

    for (let i = 0; i < gameInDb.game.rounds.length; i++) {
      const round = gameInDb.game.rounds[i];
      const roundPlayer = round.roundPlayers.find(player => player.name === currentNick);
      if (!roundPlayer) return false;
      roundPlayer.name = newNick;

      for (let j = 0; j < round.cardsPlayed.length; j++) {
        const hitRound = round.cardsPlayed[j];
        const hitOfPlayer = hitRound.find(hit => hit.name === currentNick);
        if (!hitOfPlayer) return false;
        hitOfPlayer.name = newNick;
      }
    }

    gameInDb.gameStatistics = generateGameStats(gameInDb.game, true);
    const gameAfter = await gameInDb.save();
    if (gameAfter) return true;
  }
  return false;
};
