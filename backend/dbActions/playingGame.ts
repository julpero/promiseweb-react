import { GAME_STATUS, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiMakePromiseRequest, IuiMakePromiseResponse, PROMISE_RESPONSE } from "../../frontend/src/interfaces/IuiPlayingGame";
import { getCurrentPromiseTotal, getCurrentRoundInd, getPromiser, isRoundsLastPromiser } from "../common/common";
import { isRuleActive } from "../common/model";
import { IGameOptions, IPromiser, PromiseValue } from "../interfaces/IGameOptions";
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
  };

  const query = GameOptions.where({
    _id: gameId,
    "humanPlayers.playerId": {$eq: myId},
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    const round = gameInDb.game.rounds[roundInd];
    const promiser: IPromiser | null = getPromiser(round);
    if (gameInDb.gameStatus !== GAME_STATUS.OnGoing) {
      promiseResponse.promiseResponse = PROMISE_RESPONSE.unknownError;
    } else if (roundInd !== getCurrentRoundInd(gameInDb.game)) {
      promiseResponse.promiseResponse = PROMISE_RESPONSE.unknownError;
    } else if (!promiser) {
      promiseResponse.promiseResponse = PROMISE_RESPONSE.unknownError;
    } else if (myId !== promiser.playerId) {
      promiseResponse.promiseResponse = PROMISE_RESPONSE.notMyTurn;
    } else if (isRuleActive(gameInDb, RULE.noEvenPromisesAllowed) && isRoundsLastPromiser(round) && (promise + getCurrentPromiseTotal(round) == round.cardsInRound)) {
      promiseResponse.promiseResponse = PROMISE_RESPONSE.evenPromiseNotAllowed;
    } else {
      round.roundPlayers[promiser.index].promise = promise as PromiseValue;
      if (!round.totalPromise) {
        round.totalPromise = promise;
      } else {
        round.totalPromise+= promise;
      }
      round.roundPlayers[promiser.index].promiseStarted = gameInDb.game.lastTimeStamp;
      round.roundPlayers[promiser.index].promiseMade = Date.now();
      // TODO Speed promise points
      gameInDb.game.lastTimeStamp = Date.now();

      const gameAfter = await gameInDb.save();
      if (gameAfter) {
        promiseResponse.promiseResponse = PROMISE_RESPONSE.promiseOk;
      }
    }
  }
  return promiseResponse;
};
