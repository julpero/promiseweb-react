import { Suite } from "card-games-typescript";
import { ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiAnimationTimes, IuiCard } from "../../frontend/src/interfaces/IuiPlayingGame";
import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { ICard, ICardPlayed, IGame, IGameOptions, IPlayer, IPlayerInTurn, IPlayerStats, IPromiser, IRound, IRoundPlayer } from "../interfaces/IGameOptions";
import { ICardToIuiCard } from "./model";

export const getPlayerStats = async (gameInDb: IGameOptions, playerName: string): Promise<IPlayerStats> => {
  const {startRound, turnRound, endRound} = gameInDb;
  const statsGamesObj = {
    playerAvgPointsInRounds: await getPlayerAvgPoints(playerName, startRound, turnRound, endRound)
  };
  return statsGamesObj;
};

export const getDealerNameForRound = (round: IRound): string => {
  return round.roundPlayers[round.dealerPositionIndex].name;
};

export const getCurrentRoundInd = (game: IGame): number => {
  return game.rounds.find(round => round.roundStatus === ROUND_STATUS.onGoing)?.roundIndex ?? -1;
};

export const getPlayerInTurn = (round: IRound): IPlayerInTurn | null => {
  const {roundPlayers, cardsPlayed, starterPositionIndex, trumpCard} = round;
  const currentPlayInd = getCurrentPlayIndex(round);
  const playerCount = roundPlayers.length;
  // console.log("getPlayerInTurn currentPlayInd", currentPlayInd);

  if (currentPlayInd === 0 && cardsPlayed[0].length === 0) {
    // first card of the round -> starter
    // console.log("getPlayerInTurn starter");
    return {
      name: roundPlayers[starterPositionIndex].name,
      type: roundPlayers[starterPositionIndex].type,
      index: starterPositionIndex,
    } as IPlayerInTurn;
  } else if (cardsPlayed[currentPlayInd].length < playerCount && cardsPlayed[currentPlayInd].length > 0) {
    // all players haven't hit the card -> next player who hasn't hit the card
    // console.log("getPlayerInTurn in play");
    let starterIndex = starterPositionIndex;
    if (currentPlayInd !== 0) {
      // starter was last play winner
      const prevWinner = winnerOfPlay(cardsPlayed[currentPlayInd-1], trumpCard.suite);
      if (prevWinner) {
        starterIndex = roundPlayers.findIndex(player => player.name === prevWinner.name);
      }
    }
    let checkInd = starterIndex + cardsPlayed[currentPlayInd].length;
    if (checkInd >= playerCount) checkInd-= playerCount;
    return {
      name: roundPlayers[checkInd].name,
      type: roundPlayers[checkInd].type,
      index: checkInd,
    } as IPlayerInTurn;
  } else {
    // play is complete, take winner of the previous play
    // console.log("getPlayerInTurn play complete");
    const prevWinner = winnerOfPlay(cardsPlayed[currentPlayInd-1], trumpCard.suite);
    if (prevWinner) {
      const winnerIndex = roundPlayers.findIndex(player => player.name === prevWinner.name);
      return {
        name: roundPlayers[winnerIndex].name,
        type: roundPlayers[winnerIndex].type,
        index: winnerIndex,
      } as IPlayerInTurn;
    }
  }
  return null;
};

export const getPromiser = (round: IRound): IPromiser | null => {
  const {roundPlayers, starterPositionIndex} = round;
  if (roundPlayers.some(player => player.promise === null)) {
    const playerCount = roundPlayers.length;
    for (let i = starterPositionIndex; i < starterPositionIndex + playerCount; i++) {
      const checkInd = i >= playerCount ? i - playerCount : i;
      if (roundPlayers[checkInd].promise === null) {
        return {
          name: roundPlayers[checkInd].name,
          type: roundPlayers[checkInd].type,
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

export const getAdditionalTimeToPromise = (roundPlayers: IRoundPlayer[], animationTimes: IuiAnimationTimes): number => {
  let animationTime = 0;

  // before first promiser there is animation delay of playing and collecting last play of previous round
  // technically there is no such animation delay in the very first promiser of the game,
  // but we can add same time because there is some waiting time when redirecting players to cardboard
  // and rendering it
  if (!roundPlayers.some(player => player.promise !== null)) {
    animationTime+= animationTimes.playDelay + animationTimes.playDuration + animationTimes.collectDelay + animationTimes.collectDuration;
  }

  // console.log("promise animationTime", animationTime);
  return animationTime;
};

export const getCurrentAnimationTime = (round: IRound, playIndex: number, animationTimes: IuiAnimationTimes): number => {
  let animationTime = 0;

  if (playIndex === 0 && round.cardsPlayed[playIndex].length === 0) {
    // first card in round, previous action was the last promise -> no animations
  } else {
    // animation time is at least play delay and duration
    animationTime+= animationTimes.playDelay + animationTimes.playDuration;

    // first card in new hit round, previous action was hit and collecting cards -> add also collect durations
    if (playIndex > 0 && round.cardsPlayed[playIndex].length === 0) animationTime+= animationTimes.collectDelay + animationTimes.collectDuration;
  }

  // console.log("card animationTime", animationTime);
  return animationTime;
};

const showSpeedPromiseCards = (): boolean => {
  return true;
};

export const getMyCards = (name: string, round: IRound, speedPromise: boolean, originalPlayerName?: string): IuiCard[] => {
  if (!speedPromise || showSpeedPromiseCards()) {
    const player = round.roundPlayers.find(player => player.name === name || player.name === originalPlayerName);
    return player?.cards.map(card => {
      const uiCard = ICardToIuiCard(card);
      uiCard.originalIndex = player.cardsToDebug.findIndex(dCard => dCard.value === card.value && dCard.suite === card.suite);
      return uiCard;
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
export const getPlayableCardIndexes = (myCards: IuiCard[], round: IRound, playIndex: number, mustPlayTrump: boolean): number[] => {
  if (round.cardsPlayed[playIndex].length === 0) {
    // I started this turn so I can hit any card I like
    return Array.from(myCards.keys());
  } else {
    const suiteInCharge = round.cardsPlayed[playIndex][0].card.suite;
    const playableCardIndexes: number[] = [];
    myCards.forEach((card, idx) => {
      if (card.suite === suiteInCharge) playableCardIndexes.push(idx);
    });

    // if there is one or more suitable cards in hand then play with them
    if (playableCardIndexes.length > 0) return playableCardIndexes;

    // if must play trump rule is active
    if (mustPlayTrump) {
      const roundTrumpSuite = round.trumpCard.suite;
      myCards.forEach((card, idx) => {
        if (card.suite === roundTrumpSuite) playableCardIndexes.push(idx);
      });
      if (playableCardIndexes.length > 0) return playableCardIndexes;
    }

    // else return all indexes
    return Array.from(myCards.keys());
  }
};

export const winnerOfPlay = (cardsPlayed: ICardPlayed[], trumpSuit: Suite): IPlayer | null=> {
  if (cardsPlayed.length === 0) return null;

  let winner = {
    name:  cardsPlayed[0].name,
  } as IPlayer;
  let winningCard = cardsPlayed[0].card;
  for (let i = 1; i < cardsPlayed.length; i++) {
    let thisWins = false;
    const thisCard = cardsPlayed[i].card;
    if (winningCard.suite === trumpSuit) {
      // has to be bigger trump to win
      thisWins = thisCard.suite === trumpSuit && thisCard.value > winningCard.value;
    } else if (thisCard.suite === trumpSuit) {
      // wins with any trump
      thisWins = true;
    } else {
      // wins if greater value of same suit
      thisWins = thisCard.suite === winningCard.suite && thisCard.value > winningCard.value;
    }
    if (thisWins) {
      winner = {
        name:  cardsPlayed[i].name,
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

export const getPlayerIndexFromRoundByName = (roundPlayers: IRoundPlayer[], name: string | null, originalPlayerName?: string): number => {
  if (!name) return -1;
  return roundPlayers.findIndex(player => player.name === name || player.name === originalPlayerName);
};

export const countRoundPoints = (roundPlayers: IRoundPlayer[], bigRound: boolean): void => {
  // TODO speed play points
  for (let i = 0; i < roundPlayers.length; i++) {
    const player = roundPlayers[i];
    if (player.promise === player.keeps) {
      if (player.promise === 0) {
        player.points = bigRound ? 15 : 5;
      } else {
        player.points = 10 + player.promise;
      }
    } else {
      player.points = 0;
    }
  }
  const evenBreaker = roundPlayers.find(player => player.evenBreakingBonus === 0 && player.promise === player.keeps);
  if (evenBreaker && evenBreaker.points !== null) {
    const bonusPoints = roundPlayers.filter(player => player.promise !== player.keeps).length * 2;
    evenBreaker.evenBreakingBonus = bonusPoints;
    evenBreaker.points += bonusPoints;
  }
};
