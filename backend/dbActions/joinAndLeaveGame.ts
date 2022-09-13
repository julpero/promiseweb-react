import { IuiJoinLeaveGameRequest, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IuiGameList";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IHumanPlayer } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";
import { getPlayerStats } from "../common/common";
import { startGame } from "../common/initGame";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "../../frontend/src/interfaces/IuiLeaveOngoingGame";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse } from "../../frontend/src/interfaces/IuiJoinOngoingGame";
import mongoose from "mongoose";

export const joinOnGame = async (joinGameRequest: IuiJoinLeaveGameRequest): Promise<JOIN_LEAVE_RESULT> => {
  const gameIdStr = joinGameRequest.gameId;
  if (!mongoose.isValidObjectId(gameIdStr)) {
    return JOIN_LEAVE_RESULT.notOk;
  }
  const gameInDb = await GameOptions.findById(gameIdStr);
  console.log("gameInDb", gameInDb);
  if (!gameInDb) return JOIN_LEAVE_RESULT.notOk;

  if (gameInDb.gameStatus !== GAME_STATUS.created) {
    console.log("wrong game status", gameInDb.gameStatus);
    return JOIN_LEAVE_RESULT.notOk;
  }

  if (gameInDb.humanPlayers.length === gameInDb.humanPlayersCount) {
    console.log("wrong human players length", gameInDb.humanPlayers.length, gameInDb.humanPlayersCount);
    return JOIN_LEAVE_RESULT.notOk;
  }

  if (gameInDb.humanPlayers.find(player => player.name === joinGameRequest.myName) !== undefined) {
    console.log("player name is already in game", joinGameRequest.myName);
    return JOIN_LEAVE_RESULT.notOk;
  }
  if (gameInDb.humanPlayers.find(player => player.playerId === joinGameRequest.myId) !== undefined) {
    console.log("player id is already in game", joinGameRequest.myId);
    return JOIN_LEAVE_RESULT.notOk;
  }

  const newPlayerStats = await getPlayerStats(gameInDb, joinGameRequest.myName);
  const newPlayer: IHumanPlayer = {
    name: joinGameRequest.myName,
    playerId: joinGameRequest.myId,
    active: true,
    playerStats: newPlayerStats,
  };

  gameInDb.humanPlayers.push(newPlayer);

  let gameStartOk = true;
  if (gameInDb.humanPlayers.length === gameInDb.humanPlayersCount) {
    // start game
    console.log("start game!");
    gameStartOk = startGame(gameInDb);
    if (gameStartOk) {
      console.log("started game", gameInDb);
    }
  }

  const gameAfter = await gameInDb.save();
  if (!gameAfter) {
    return JOIN_LEAVE_RESULT.notOk;
  } else if (gameAfter.humanPlayers.length === gameAfter.humanPlayersCount) {
    return JOIN_LEAVE_RESULT.lastOk;
  } else {
    return JOIN_LEAVE_RESULT.ok;
  }
};

export const leaveTheGame = async (leaveGameRequest: IuiJoinLeaveGameRequest): Promise<JOIN_LEAVE_RESULT> => {
  const gameIdStr = leaveGameRequest.gameId;
  if (!mongoose.isValidObjectId(gameIdStr)) {
    return JOIN_LEAVE_RESULT.notOk;
  }
  const game = await GameOptions.findById(gameIdStr);
  console.log("game", game);
  if (!game) return JOIN_LEAVE_RESULT.notOk;

  if (game.gameStatus !== GAME_STATUS.created) {
    console.log("wrong game status", game.gameStatus);
    return JOIN_LEAVE_RESULT.notOk;
  }

  if (!game.humanPlayers.find(player => player.name === leaveGameRequest.myName)) {
    console.log("player name is not in game", leaveGameRequest.myName);
    return JOIN_LEAVE_RESULT.notOk;
  }
  if (!game.humanPlayers.find(player => player.playerId === leaveGameRequest.myId)) {
    console.log("player id is not in game", leaveGameRequest.myId);
    return JOIN_LEAVE_RESULT.notOk;
  }

  // remove player from humanPlayers
  game.humanPlayers = game.humanPlayers.filter(player => player.name !== leaveGameRequest.myName);

  if (game.humanPlayers.length === 0) {
    // this was last player in the game -> set game dismissed
    game.gameStatus = GAME_STATUS.dismissed;
  }

  const gameAfter = await game.save();
  return gameAfter !== null ? JOIN_LEAVE_RESULT.ok : JOIN_LEAVE_RESULT.notOk;
};

export const leaveTheOngoingGame = async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest): Promise<IuiLeaveOngoingGameResponse> => {
  const {gameId, myId} = leaveOngoingGameRequest;
  const leaveOngoingGameResponse: IuiLeaveOngoingGameResponse = {
    gameId: "",
    myId: "",
    leaverName: "",
    leaveStatus: LEAVE_ONGOING_GAME_RESULT.notOk,
  };
  if (!mongoose.isValidObjectId(gameId)) {
    return leaveOngoingGameResponse;
  }

  const query = GameOptions.where({
    _id: gameId,
    "humanPlayers.playerId": {$eq: myId},
    gameStatus: GAME_STATUS.onGoing,
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    const leaver = gameInDb.humanPlayers.find(player => player.playerId === myId);
    if (leaver) {
      leaveOngoingGameResponse.leaverName = leaver.name;
      leaver.active = false;

      if (!gameInDb.humanPlayers.some(player => player.active)) {
        // all players have left the game -> dismiss it
        gameInDb.gameStatus = GAME_STATUS.dismissed;
        leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.gameDismissed;
      } else {
        leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.leaveOk;
        leaveOngoingGameResponse.gameId = gameId;
        leaveOngoingGameResponse.myId = myId;
      }
    }

    const gameAfter = await gameInDb.save();
    if (!gameAfter) {
      leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.notOk;
    }
  }
  return leaveOngoingGameResponse;
};

export const joinTheOngoingGame = async (joinRequest: IuiJoinOngoingGame): Promise<IuiJoinOngoingGameResponse> => {
  const { gameId, playerId } = joinRequest;
  const joinOngoingGameResponse: IuiJoinOngoingGameResponse = {
    joinOk: false,
    playerId: "",
    playerName: "",
  };
  if (!mongoose.isValidObjectId(gameId)) {
    return joinOngoingGameResponse;
  }

  const query = GameOptions.where({
    _id: gameId,
    "humanPlayers.playerId": {$eq: playerId},
    gameStatus: GAME_STATUS.onGoing,
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    const player = gameInDb.humanPlayers.find(Player => Player.playerId === playerId);
    if (player) {
      player.active = true;
      const gameAfter = await gameInDb.save();
      if (gameAfter) {
        joinOngoingGameResponse.joinOk = true;
        joinOngoingGameResponse.playerId = player.playerId;
        joinOngoingGameResponse.playerName = player.name;
        return joinOngoingGameResponse;
      }
    }
  }

  return joinOngoingGameResponse;
};
