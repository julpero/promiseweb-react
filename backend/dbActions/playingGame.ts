import mongoose from "mongoose";
import { GAME_STATUS, ROUND_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import {
  ANIMATION_TIMES,
  DEBUG_ANIMATION_TIMES,
  IuiMakePromiseRequest,
  IuiMakePromiseResponse,
  IuiPlayCardRequest,
  IuiPlayCardResponse,
  PLAY_CARD_RESPONSE,
  PROMISE_RESPONSE,
  ROUND_PHASE,
} from "../../frontend/src/interfaces/IuiPlayingGame";
import { getRoundPhase } from "../actions/playingGame";
import {
  countRoundPoints,
  getAdditionalTimeToPromise,
  getCurrentAnimationTime,
  getCurrentPlayIndex,
  getCurrentPromiseTotal,
  getCurrentRoundInd,
  getDealerNameForRound,
  getMyCards,
  getPlayableCardIndexes,
  getPlayerIndexFromRoundByName,
  getPlayerInTurn,
  getPromiser,
  isRoundsLastPromiser,
  winnerOfPlay,
} from "../common/common";
import { startRound } from "../common/game";
import { isRuleActive, IuiCardToICard } from "../common/model";
import { generateGameStats } from "../common/statsFunctions";
import { ICardPlayed, IGameOptions, IPromiser, PromiseValue } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";

export const getGame = async (gameIdStr: string): Promise<IGameOptions | null> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return null;

  // console.time("getGame");
  const gameInDb = await GameOptions.findById(gameIdStr).lean();
  // console.timeEnd("getGame");
  return gameInDb;
};

export const getGameWithPlayer = async (gameIdStr: string, playerName: string): Promise<IGameOptions | null> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return null;

  // console.time("getGameWithPlayer "+playerName+" "+gameIdStr);
  const query = GameOptions.where({
    _id: gameIdStr,
    $or: [{"humanPlayers.name": { $eq: playerName }},{"humanPlayers.playedBy": { $eq: playerName }}],
  }).lean();
  const gameInDb = await query.findOne();
  // console.timeEnd("getGameWithPlayer "+playerName+" "+gameIdStr);
  return gameInDb;
};

export const makePromiseToPlayer = async (makePromiseRequest: IuiMakePromiseRequest): Promise<IuiMakePromiseResponse> => {
  const { gameId, userName, roundInd, promise } = makePromiseRequest;
  const promiseResponse: IuiMakePromiseResponse = {
    promiseResponse: PROMISE_RESPONSE.unknownError,
    promise: -1,
    promiser: "",
    promiseTime: -1,
  };

  if (!mongoose.isValidObjectId(gameId)) return promiseResponse;

  const query = GameOptions.where({
    _id: gameId,
    $or: [{"humanPlayers.name": { $eq: userName }},{"humanPlayers.playedBy": { $eq: userName }}],
    gameStatus: GAME_STATUS.onGoing,
  });
  // console.time("makePromiseToPlayer");
  const gameInDb = await query.findOne();
  // console.timeEnd("makePromiseToPlayer");
  if (gameInDb) {
    const currentRoundInd = getCurrentRoundInd(gameInDb.game);
    if (roundInd !== currentRoundInd) {
      console.warn("promising, wrong round or round status");
      return promiseResponse;
    }
    const round = gameInDb.game.rounds[currentRoundInd];
    const roundPhase = getRoundPhase(round);
    if (roundPhase !== ROUND_PHASE.onPromises) {
      console.warn("promising, round not in onPromises phase");
      promiseResponse.promiseResponse = PROMISE_RESPONSE.noPromisePhase;
      return promiseResponse;
    }

    const promiser: IPromiser | null = getPromiser(round);
    if (!promiser) {
      console.warn("promising, possible not promising phase");
      return promiseResponse;
    }
    const originalPlayerName = gameInDb.humanPlayers.find(player => player.playedBy === userName)?.name;
    if (promiser.name !== userName && promiser.name !== originalPlayerName) {
      console.warn("promising, wrong promiser turn");
      promiseResponse.promiseResponse = PROMISE_RESPONSE.notMyTurn;
      return promiseResponse;
    }
    if (isRuleActive(gameInDb, RULE.noEvenPromisesAllowed) && isRoundsLastPromiser(round) && (promise + getCurrentPromiseTotal(round) === round.cardsInRound)) {
      console.log("promising, even promises not allowed");
      promiseResponse.promiseResponse = PROMISE_RESPONSE.evenPromiseNotAllowed;
      return promiseResponse;
    }
    const isEvenBreakingPromise = isRuleActive(gameInDb, RULE.bonusNonEvenPromise) && !round.roundPlayers.some(player => player.evenBreakingBonus !== null) && (
      (isRoundsLastPromiser(round) && (promise + getCurrentPromiseTotal(round) !== round.cardsInRound))
      ||
      (!isRoundsLastPromiser(round) && (promise + getCurrentPromiseTotal(round) > round.cardsInRound))
    );

    // All checks made, let's make promise
    round.roundPlayers[promiser.index].promise = promise as PromiseValue;
    if (isEvenBreakingPromise) round.roundPlayers[promiser.index].evenBreakingBonus = 0;
    if (!round.totalPromise) {
      round.totalPromise = promise;
    } else {
      round.totalPromise+= promise;
    }

    const now = Date.now();

    const animationTime = getAdditionalTimeToPromise(round.roundPlayers, gameInDb.thisIsDemoGame ? DEBUG_ANIMATION_TIMES : ANIMATION_TIMES);
    let promiseTime = now - (gameInDb.game.lastTimeStamp + animationTime);

    if (promiseTime < 0) {
      console.warn("promise too fast, promiseTime", promiseTime);
      promiseTime = 0;
    }

    round.roundPlayers[promiser.index].promiseStarted = gameInDb.game.lastTimeStamp + animationTime;
    round.roundPlayers[promiser.index].promiseMade = now;
    // TODO Speed promise points
    gameInDb.game.lastTimeStamp = now;

    try {
      const gameAfter = await gameInDb.save();
      if (gameAfter) {
        if (!isRuleActive(gameAfter, RULE.hiddenPromiseRound) && !isRuleActive(gameAfter, RULE.onlyTotalPromise)) promiseResponse.promise = promise;
        promiseResponse.promiseResponse = PROMISE_RESPONSE.promiseOk;
        promiseResponse.promiser = promiser.name;
        promiseResponse.promiseTime = promiseTime;
      } else {
        console.error("promising, error while saving game");
      }
    } catch (e) {
      console.error(e);
    }
  }
  return promiseResponse;
};

export const playerPlaysCard = async (playCardRequest: IuiPlayCardRequest): Promise<IuiPlayCardResponse> => {
  const { card, gameId, roundInd, userName } = playCardRequest;
  const response: IuiPlayCardResponse = {
    playResponse: PLAY_CARD_RESPONSE.notOk,
    playerName: "",
    playedFromSlot: -1,
    card: card,
    cardIndex: -1,
    playTime: -1,
    newPlayAfterHit: false,
    roundStatusAfterPlay: ROUND_STATUS.onGoing,
    gameStatusAfterPlay: GAME_STATUS.onGoing,
  };

  if (!mongoose.isValidObjectId(gameId)) return response;

  const query = GameOptions.where({
    _id: gameId,
    $or: [{"humanPlayers.name": { $eq: userName }},{"humanPlayers.playedBy": { $eq: userName }}],
    gameStatus: GAME_STATUS.onGoing,
  });
  // console.time("playerPlaysCard");
  const gameInDb = await query.findOne();
  // console.timeEnd("playerPlaysCard");
  if (gameInDb) {
    const currentRoundInd = getCurrentRoundInd(gameInDb.game);
    if (currentRoundInd !== roundInd) {
      console.warn("playing card, wrong round or round status", currentRoundInd, roundInd);
      return response;
    }
    const round = gameInDb.game.rounds[currentRoundInd];
    const roundPhase = getRoundPhase(round);
    if (roundPhase !== ROUND_PHASE.onPlay) {
      console.warn("playing card, round not in onPlay phase");
      response.playResponse = PLAY_CARD_RESPONSE.notMyTurn;
      return response;
    }

    const playerInTurn = getPlayerInTurn(round);
    if (!playerInTurn) {
      console.warn("playing card, but no anyone's turn");
      response.playResponse = PLAY_CARD_RESPONSE.notMyTurn;
      return response;
    }

    const originalPlayerName = gameInDb.humanPlayers.find(player => player.playedBy === userName)?.name;
    if (playerInTurn.name !== userName && playerInTurn.name !== originalPlayerName) {
      console.warn("playing card, not my turn");
      response.playResponse = PLAY_CARD_RESPONSE.notMyTurn;
      return response;
    }
    const playerCards = getMyCards(userName, round, false, originalPlayerName);
    const playedCardIndex = playerCards.findIndex(cardInDb => cardInDb.suite === card.suite && cardInDb.value === card.value);
    if (playedCardIndex === -1) {
      response.playResponse = PLAY_CARD_RESPONSE.invalidCard;
      return response;
    }
    const playIndex = getCurrentPlayIndex(round);
    const playableCardIndexes = getPlayableCardIndexes(playerCards, round, playIndex, isRuleActive(gameInDb, RULE.mustPlayTrump));
    if (!playableCardIndexes.some(ind => ind === playedCardIndex)) {
      response.playResponse = PLAY_CARD_RESPONSE.invalidCard;
      return response;
    }

    // All checks made, let's play card
    const myIndexInRound = getPlayerIndexFromRoundByName(round.roundPlayers, userName, originalPlayerName);
    const now = Date.now();

    const animationTime = getCurrentAnimationTime(round, playIndex, gameInDb.thisIsDemoGame ? DEBUG_ANIMATION_TIMES : ANIMATION_TIMES);
    const playTime = now - (gameInDb.game.lastTimeStamp + animationTime);
    round.cardsPlayed[playIndex].push({
      name: originalPlayerName ?? userName,
      card: IuiCardToICard(card),
      playedTime: now,
      playStarted: gameInDb.game.lastTimeStamp + animationTime,
    } as ICardPlayed);
    round.roundPlayers[myIndexInRound].cards.splice(playedCardIndex, 1);
    gameInDb.game.lastTimeStamp = now;

    response.playedFromSlot = round.cardsInRound - round.cardsPlayed.length; // cardsPlayed array has always at least one element

    if (round.cardsPlayed[playIndex].length === round.roundPlayers.length) {
      // this was the last card of the play
      response.newPlayAfterHit = true;

      // let's see who wins this play and will be starter of the next play
      const winner = winnerOfPlay(round.cardsPlayed[playIndex], round.trumpCard.suite);
      if (winner) {
        const winnerIndexInRound = getPlayerIndexFromRoundByName(round.roundPlayers, winner.name);
        round.roundPlayers[winnerIndexInRound].keeps++;
        response.winnerOfPlay = winner.name;
        response.winCount = round.roundPlayers[winnerIndexInRound].keeps;
        if ((response.winCount === (round.roundPlayers[winnerIndexInRound].promise ?? -1) +1) && !isRuleActive(gameInDb, RULE.onlyTotalPromise)) {
          response.playWentOver = true;
        }
      }

      if (round.cardsPlayed.length === round.cardsInRound) {
        // this whole round is now played
        response.roundStatusAfterPlay = ROUND_STATUS.played;

        round.roundStatus = ROUND_STATUS.played;

        // let's count points for this round
        countRoundPoints(round.roundPlayers, round.cardsInRound > 5);

        if (currentRoundInd === gameInDb.game.rounds.length - 1) {
          // this was the last round in the game so now game ends
          response.gameStatusAfterPlay = GAME_STATUS.played;
          response.newPlayAfterHit = false;

          gameInDb.gameStatus = GAME_STATUS.played;
        } else {
          // there are more rounds to play so let's start the next one
          const newRoundInd = currentRoundInd + 1;
          startRound(gameInDb, newRoundInd);
          response.newDealer = getDealerNameForRound(gameInDb.game.rounds[newRoundInd]);
        }
      } else {
        // new hit round
        round.cardsPlayed.push([]);
      }
    } else {
      // the same play, round and game continues
    }

    // let's update game statistics after every card hit
    // (when game is over we calculate more data than just after card hit)
    gameInDb.gameStatistics = generateGameStats(gameInDb.game, response.gameStatusAfterPlay === GAME_STATUS.played);

    if (response.gameStatusAfterPlay === GAME_STATUS.played) {
      response.winnerOfGame = gameInDb.gameStatistics.winnerName;
    }

    try {
      const gameAfter = await gameInDb.save();
      if (gameAfter) {
        response.playerName = originalPlayerName ?? userName;
        response.playTime = playTime;
        response.playResponse = PLAY_CARD_RESPONSE.playOk;
        return response;
      } else {
        console.error("playing card, error while saving game");
      }
    } catch (e) {
      console.error(e);
      response.playResponse = PLAY_CARD_RESPONSE.notOk;
      return response;
    }
  } else {
    console.warn("playing card, no game");
  }
  return response;
};
