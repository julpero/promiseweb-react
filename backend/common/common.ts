import { Suite } from "card-games-typescript";
import { ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiCard } from "../../frontend/src/interfaces/IuiPlayingGame";
import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { ICard, ICardPlayed, IGame, IGameOptions, IHumanPlayer, IPlayer, IPlayerInTurn, IPlayerStats, IPromiser, IRound, IRoundPlayer } from "../interfaces/IGameOptions";
import { ICardToIuiCard } from "./model";

export const getPlayerStats = async (roundCount: number, playerName: string): Promise<IPlayerStats> => {
  const statsGamesObj = {
    playerAvgPointsInRounds: await getPlayerAvgPoints(playerName, roundCount)
  };
  return statsGamesObj;
};

export const getGameRoundCount = (gameInDb: IGameOptions): number => {
  return (gameInDb.startRound-gameInDb.turnRound+1)+(gameInDb.endRound-gameInDb.turnRound);
};

export const getPlayerNameInPlayerOrder = (player: IPlayer | string): string => {
  if (typeof player === "string") {
    return player;
  } else {
    return player.name;
  }
};

export const getPlayerIdInPlayerOrder = (player: IPlayer | string): string => {
  if (typeof player === "string") {
    return ""; // this should be obsolete now
  } else {
    return player.playerId;
  }
};

export const getPlayerNameById = (players: IHumanPlayer[], playerId: string): string => {
  return players.find(player => player.playerId == playerId)?.name ?? "";
};

export const getCurrentRoundInd = (game: IGame): number => {
  return game.rounds.find(round => round.roundStatus === ROUND_STATUS.onGoing)?.roundIndex ?? -1;
};

const getCurrentPlayInd = (round: IRound): number => {
  return round.cardsPlayed.length - 1;
};

export const getPlayerInTurn = (round: IRound): IPlayerInTurn | null => {
  const currentPlayInd = getCurrentPlayInd(round);
  const playerCount = round.roundPlayers.length;
  if (currentPlayInd === 0 && round.cardsPlayed[0].length === 0) {
    // first card of the round -> starter
    return {
      name: round.roundPlayers[round.starterPositionIndex].name,
      type: round.roundPlayers[round.starterPositionIndex].type,
      playerId: round.roundPlayers[round.starterPositionIndex].playerId,
      index: round.starterPositionIndex,
    } as IPlayerInTurn;
  } else if (round.cardsPlayed[currentPlayInd].length < playerCount) {
    // all players haven't hit the card
    let checkInd = round.starterPositionIndex + round.cardsPlayed[currentPlayInd].length;
    if (checkInd >= playerCount) checkInd-= playerCount;
    return {
      name: round.roundPlayers[checkInd].name,
      type: round.roundPlayers[checkInd].type,
      playerId: round.roundPlayers[checkInd].playerId,
      index: checkInd,
    } as IPlayerInTurn;
  }
  return null;
};

export const getPromiser = (round: IRound): IPromiser | null => {
  if (round.roundPlayers.some(player => player.promise === null)) {
    const playerCount = round.roundPlayers.length;
    const { starterPositionIndex } = round;
    for (let i = starterPositionIndex; i < starterPositionIndex + playerCount; i++) {
      const checkInd = i >= playerCount ? i - playerCount : i;
      if (round.roundPlayers[checkInd].promise === null) {
        return {
          name: round.roundPlayers[checkInd].name,
          type: round.roundPlayers[checkInd].type,
          playerId: round.roundPlayers[checkInd].playerId,
          index: checkInd,
        } as IPromiser;
      }
    }
  }
  return null;
};

export const isRoundsLastPromiser = (round: IRound): boolean => {
  return round.roundPlayers.length - round.roundPlayers.filter(player => player.promise !== null).length === 1;
};

export const getCurrentPromiseTotal = (round: IRound): number => {
  let totalPromise = 0;
  round.roundPlayers.map(player => totalPromise+=(player.promise ?? 0));
  return totalPromise;
};

export const getCurrentPlayIndex = (round: IRound): number => {
  return round.cardsPlayed.length - 1;
};

const showSpeedPromiseCards = (): boolean => {
  return true;
};

export const getMyCards = (myId: string, round: IRound, speedPromise: boolean): IuiCard[] => {
  if (!speedPromise || showSpeedPromiseCards()) {
    return round.roundPlayers.find(player => player.playerId === myId)?.cards.map(card => {
      return ICardToIuiCard(card);
    }) ?? [];
  } else {
    return [];
  }
};

/**
 * This is called only if it is players turn.
 * Frontend can trust this mapping, no need for logic there.
 * @param myCards
 * @param round
 * @param playIndex
 */
export const getPlayableCardIndexes = (myCards: IuiCard[], round: IRound, playIndex: number): number[] => {
  if (round.cardsPlayed[playIndex].length === 0) {
    // I started this turn so I can hit any card I like
    return Array.from(myCards.keys());
  }
  return [];
};

export const winnerOfPlay = (cardsPlayed: ICardPlayed[], trumpSuit: Suite): IPlayer | null=> {
  if (cardsPlayed.length === 0) return null;

  let winner = {
    name:  cardsPlayed[0].name,
    playerId:  cardsPlayed[0].playerId,
  } as IPlayer;
  let winningCard = cardsPlayed[0].card;
  for (let i = 1; i < cardsPlayed.length; i++) {
    let thisWins = false;
    const thisCard = cardsPlayed[i].card;
    if (winningCard.suite === trumpSuit) {
      // has to be bigger trump to win
      thisWins = thisCard.value > winningCard.value;
    } else if (thisCard.suite === trumpSuit) {
      // wins with any trump
      thisWins = true;
    } else {
      // wins if greater rank of same suit
      thisWins = thisCard.suite === winningCard.suite && thisCard.value > winningCard.value;
    }
    if (thisWins) {
      winner = {
        name:  cardsPlayed[i].name,
        playerId:  cardsPlayed[i].playerId,
      } as IPlayer;
      winningCard = thisCard;
    }
  }
  return winner;
};

export const getCurrentCardInCharge = (cardsPlayed: ICardPlayed[][]): ICard | null => {
  if (!cardsPlayed[cardsPlayed.length - 1][0]) return null;
  return cardsPlayed[cardsPlayed.length - 1][0].card;
};

export const getPlayerIndexFromRoundById = (roundPlayers: IRoundPlayer[], id: string | null): number => {
  if (!id) return -1;
  return roundPlayers.findIndex(player => player.playerId === id);
};
