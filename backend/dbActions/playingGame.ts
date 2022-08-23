import { GAME_STATUS, ROUND_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import {
  IuiMakePromiseRequest,
  IuiMakePromiseResponse,
  IuiPlayCardRequest,
  IuiPlayCardResponse,
  PLAY_CARD_RESPONSE,
  PROMISE_RESPONSE,
} from "../../frontend/src/interfaces/IuiPlayingGame";
import {
  getCurrentPlayIndex,
  getCurrentPromiseTotal,
  getCurrentRoundInd,
  getMyCards,
  getPlayableCardIndexes,
  getPlayerIndexFromRoundById,
  getPlayerInTurn,
  getPlayerNameById,
  getPromiser,
  isRoundsLastPromiser,
  winnerOfPlay,
} from "../common/common";
import { startRound } from "../common/game";
import { ICardToIuiCard, isRuleActive, IuiCardToICard } from "../common/model";
import { ICard, ICardPlayed, IGameOptions, IPromiser, PromiseValue } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";

export const getGame = async (gameIdStr: string): Promise<IGameOptions | null> => {
  const gameInDb = await GameOptions.findById(gameIdStr);
  return gameInDb;
};

export const getGameWithPlayer = async (gameIdStr: string, playerId: string): Promise<IGameOptions | null> => {
  const query = GameOptions.where({
    _id: gameIdStr,
    "humanPlayers.playerId": {$eq: playerId},
  });
  const gameInDb = await query.findOne();
  return gameInDb;
};

export const makePromiseToPlayer = async (makePromiseRequest: IuiMakePromiseRequest): Promise<IuiMakePromiseResponse> => {
  const { gameId, myId, roundInd, promise } = makePromiseRequest;
  const promiseResponse: IuiMakePromiseResponse = {
    promiseResponse: PROMISE_RESPONSE.unknownError,
    promise: promise,
    promiser: "",
    promiseTime: -1,
  };

  const query = GameOptions.where({
    _id: gameId,
    "humanPlayers.playerId": {$eq: myId},
    gameStatus: GAME_STATUS.onGoing,
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    const currentRoundInd = getCurrentRoundInd(gameInDb.game);
    if (roundInd !== currentRoundInd) {
      console.warn("promising, wrong round or round status");
      return promiseResponse;
    }
    const round = gameInDb.game.rounds[currentRoundInd];
    const promiser: IPromiser | null = getPromiser(round);
    if (!promiser) {
      console.warn("promising, possible not promising phase");
      return promiseResponse;
    }
    if (myId !== promiser.playerId) {
      console.warn("promising, wrong promiser turn");
      promiseResponse.promiseResponse = PROMISE_RESPONSE.notMyTurn;
      return promiseResponse;
    }
    if (isRuleActive(gameInDb, RULE.noEvenPromisesAllowed) && isRoundsLastPromiser(round) && (promise + getCurrentPromiseTotal(round) == round.cardsInRound)) {
      console.log("promising, even promises not allowed");
      promiseResponse.promiseResponse = PROMISE_RESPONSE.evenPromiseNotAllowed;
      return promiseResponse;
    }

    // All checks made, let's make promise
    round.roundPlayers[promiser.index].promise = promise as PromiseValue;
    if (!round.totalPromise) {
      round.totalPromise = promise;
    } else {
      round.totalPromise+= promise;
    }
    const promiseTime = Date.now() - gameInDb.game.lastTimeStamp;
    round.roundPlayers[promiser.index].promiseStarted = gameInDb.game.lastTimeStamp;
    round.roundPlayers[promiser.index].promiseMade = Date.now();
    // TODO Speed promise points
    gameInDb.game.lastTimeStamp = Date.now();

    const gameAfter = await gameInDb.save();
    if (gameAfter) {
      promiseResponse.promiseResponse = PROMISE_RESPONSE.promiseOk;
      promiseResponse.promiser = promiser.name;
      promiseResponse.promiseTime = promiseTime;
    } else {
      console.error("promising, error while saving game");
    }
  }
  return promiseResponse;
};

export const playerPlaysCard = async (playCardRequest: IuiPlayCardRequest): Promise<IuiPlayCardResponse> => {
  const { card, gameId, roundInd, myId } = playCardRequest;
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

  const query = GameOptions.where({
    _id: gameId,
    "humanPlayers.playerId": {$eq: myId},
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    const currentRoundInd = getCurrentRoundInd(gameInDb.game);
    if (currentRoundInd !== roundInd) {
      console.warn("playing card, wrong round or round status", currentRoundInd, roundInd);
      return response;
    }
    const round = gameInDb.game.rounds[currentRoundInd];
    const playerInTurn = getPlayerInTurn(round);
    if (playerInTurn?.playerId !== myId) {
      console.warn("playing card, not my turn");
      response.playResponse = PLAY_CARD_RESPONSE.notMyTurn;
      return response;
    }
    const playerCards = getMyCards(myId, round, false);
    const playedCardIndex = playerCards.findIndex(cardInDb => cardInDb.suite === card.suite && cardInDb.value === card.value);
    if (playedCardIndex === -1) {
      response.playResponse = PLAY_CARD_RESPONSE.invalidCard;
      return response;
    }
    const playIndex = getCurrentPlayIndex(round);
    const playableCardIndexes = getPlayableCardIndexes(playerCards, round, playIndex);
    if (!playableCardIndexes.some(ind => ind === playedCardIndex)) {
      response.playResponse = PLAY_CARD_RESPONSE.invalidCard;
      return response;
    }

    // All checks made, let's play card
    const myIndexInRound = getPlayerIndexFromRoundById(round.roundPlayers, myId);
    const myName = getPlayerNameById(gameInDb.humanPlayers, myId);
    const playTime = Date.now() - gameInDb.game.lastTimeStamp;
    round.cardsPlayed[playIndex].push({
      playerId: myId,
      name: myName,
      card: IuiCardToICard(card),
      playedTime: Date.now(),
      playStarted: gameInDb.game.lastTimeStamp,
    } as ICardPlayed);
    round.roundPlayers[myIndexInRound].cards.splice(playedCardIndex, 1);
    gameInDb.game.lastTimeStamp = Date.now();

    response.playedFromSlot = round.cardsInRound - round.cardsPlayed[playIndex].length;

    if (round.cardsPlayed[playIndex].length === round.roundPlayers.length) {
      // this was the last card of the play
      response.newPlayAfterHit = true;

      // let's see who wins this play and will be starter of the next play
      const winner = winnerOfPlay(round.cardsPlayed[playIndex], round.trumpCard.suite);
      if (winner) {
        const winnerIndexInRound = getPlayerIndexFromRoundById(round.roundPlayers, winner.playerId);
        round.roundPlayers[winnerIndexInRound].keeps++;
      }

      if (round.cardsPlayed.length === round.cardsInRound) {
        // this whole round is now played
        response.roundStatusAfterPlay = ROUND_STATUS.played;

        round.roundStatus = ROUND_STATUS.played;

        if (currentRoundInd === gameInDb.game.rounds.length - 1) {
          // this was the last round in the game so now game ends
          response.gameStatusAfterPlay = GAME_STATUS.played;
        } else {
          // there are more rounds to play so let's start the next one
          startRound(gameInDb, currentRoundInd + 1);
        }
      } else {
        // new hit round
        round.cardsPlayed.push([]);
      }
    } else {
      // the same play, round and game continues
    }

    const gameAfter = await gameInDb.save();
    if (gameAfter) {
      response.playerName = myName;
      response.playTime = playTime;
      response.playResponse = PLAY_CARD_RESPONSE.playOk;
      return response;
    } else {
      console.error("playing card, error while saving game");
    }
  } else {
    console.warn("playing card, no game");
  }
  return response;
};
