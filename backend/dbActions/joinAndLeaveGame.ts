import { IuiJoinLeaveGameRequest, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IuiGameList";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IHumanPlayer } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";
import { getPlayerStats } from "../common/common";
import { startGame } from "../common/initGame";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "../../frontend/src/interfaces/IuiLeaveOngoingGame";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse, JOIN_GAME_STATUS } from "../../frontend/src/interfaces/IuiJoinOngoingGame";
import mongoose from "mongoose";

export const joinOnGame = async (joinGameRequest: IuiJoinLeaveGameRequest): Promise<JOIN_LEAVE_RESULT> => {
  const gameIdStr = joinGameRequest.gameId;
  if (!mongoose.isValidObjectId(gameIdStr)) {
    return JOIN_LEAVE_RESULT.notOk;
  }
  const gameInDb = await GameOptions.findById(gameIdStr);
  // console.log("gameInDb", gameInDb);
  if (!gameInDb) return JOIN_LEAVE_RESULT.notOk;

  if (gameInDb.password) {
    if (!joinGameRequest.gamePassword || joinGameRequest.gamePassword !== gameInDb.password) {
      return JOIN_LEAVE_RESULT.notOk;
    }
  }

  if (gameInDb.gameStatus !== GAME_STATUS.created) {
    console.warn("wrong game status", gameInDb.gameStatus);
    return JOIN_LEAVE_RESULT.gameIsOn;
  }

  if (gameInDb.humanPlayers.length === gameInDb.humanPlayersCount) {
    console.warn("wrong human players length", gameInDb.humanPlayers.length, gameInDb.humanPlayersCount);
    return JOIN_LEAVE_RESULT.gameFull;
  }

  if (gameInDb.humanPlayers.find(player => player.name === joinGameRequest.userName) !== undefined) {
    console.warn("player name is already in game", joinGameRequest.userName);
    return JOIN_LEAVE_RESULT.alreadyInGame;
  }

  const newPlayerStats = await getPlayerStats(gameInDb, joinGameRequest.userName);
  const newPlayer: IHumanPlayer = {
    name: joinGameRequest.userName,
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
      console.log("started game");
    }
  }

  try {
    const gameAfter = await gameInDb.save();
    if (!gameAfter) {
      return JOIN_LEAVE_RESULT.notOk;
    } else if (gameAfter.humanPlayers.length === gameAfter.humanPlayersCount) {
      return JOIN_LEAVE_RESULT.lastOk;
    } else {
      return JOIN_LEAVE_RESULT.ok;
    }
  } catch (e) {
    console.error(e);
    return JOIN_LEAVE_RESULT.notOk;
  }
};

export const leaveTheGame = async (leaveGameRequest: IuiJoinLeaveGameRequest): Promise<JOIN_LEAVE_RESULT> => {
  const gameIdStr = leaveGameRequest.gameId;
  if (!mongoose.isValidObjectId(gameIdStr)) {
    return JOIN_LEAVE_RESULT.notOk;
  }
  const game = await GameOptions.findById(gameIdStr);
  // console.log("game", game);
  if (!game) return JOIN_LEAVE_RESULT.notOk;

  if (game.gameStatus !== GAME_STATUS.created) {
    console.warn("wrong game status", game.gameStatus);
    return JOIN_LEAVE_RESULT.notOk;
  }

  if (!game.humanPlayers.find(player => player.name === leaveGameRequest.userName)) {
    console.warn("player name is not in game", leaveGameRequest.userName);
    return JOIN_LEAVE_RESULT.notOk;
  }

  // remove player from humanPlayers
  game.humanPlayers = game.humanPlayers.filter(player => player.name !== leaveGameRequest.userName);

  if (game.humanPlayers.length === 0) {
    // this was last player in the game -> set game dismissed
    game.gameStatus = GAME_STATUS.dismissed;
  }

  try {
    const gameAfter = await game.save();
    return gameAfter !== null ? JOIN_LEAVE_RESULT.ok : JOIN_LEAVE_RESULT.notOk;
  } catch (e) {
    console.error(e);
    return JOIN_LEAVE_RESULT.notOk;
  }
};

export const leaveTheOngoingGame = async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest): Promise<IuiLeaveOngoingGameResponse> => {
  const {gameId, userName} = leaveOngoingGameRequest;
  const leaveOngoingGameResponse: IuiLeaveOngoingGameResponse = {
    gameId: "",
    leaverName: "",
    leaveStatus: LEAVE_ONGOING_GAME_RESULT.notOk,
  };
  if (!mongoose.isValidObjectId(gameId)) {
    return leaveOngoingGameResponse;
  }

  const query = GameOptions.where({
    _id: gameId,
    $or: [{"humanPlayers.name": { $eq: userName }},{"humanPlayers.playedBy": { $eq: userName }}],
    gameStatus: GAME_STATUS.onGoing,
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    const leaver = gameInDb.humanPlayers.find(player => player.name === userName || player.playedBy === userName);
    if (leaver) {
      leaveOngoingGameResponse.leaverName = leaver.name;
      leaver.active = false;
      leaver.playedBy = undefined;

      if (!gameInDb.humanPlayers.some(player => player.active)) {
        // all players have left the game -> dismiss it
        gameInDb.gameStatus = GAME_STATUS.dismissed;
        leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.gameDismissed;
      } else {
        leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.leaveOk;
        leaveOngoingGameResponse.gameId = gameId;
      }
    }

    try {
      const gameAfter = await gameInDb.save();
      if (!gameAfter) {
        leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.notOk;
      }
    } catch (e) {
      console.error(e);
      leaveOngoingGameResponse.leaveStatus = LEAVE_ONGOING_GAME_RESULT.notOk;
    }
  }
  return leaveOngoingGameResponse;
};

/**
 *
 * @param joinRequest IuiJoinOngoingGame
 * @param forceJoin set true when allowing someone to join
 * @returns
 */
export const joinTheOngoingGame = async (joinRequest: IuiJoinOngoingGame, forceJoin: boolean): Promise<IuiJoinOngoingGameResponse> => {
  const { gameId, playAsPlayer, userName } = joinRequest;
  const joinOngoingGameResponse: IuiJoinOngoingGameResponse = {
    joinStatus: JOIN_GAME_STATUS.failed,
    playerName: "",
  };
  if (!mongoose.isValidObjectId(gameId)) {
    return joinOngoingGameResponse;
  }

  const query = GameOptions.where({
    _id: gameId,
    "humanPlayers.name": {$eq: playAsPlayer},
    gameStatus: GAME_STATUS.onGoing,
  });
  const gameInDb = await query.findOne();
  if (gameInDb) {
    // if joining player is an original game player, then he/she can join only to that original player
    const myOwnPlayerExists = gameInDb.humanPlayers.some(player => player.name === userName);
    if (myOwnPlayerExists && userName !== playAsPlayer) {
      return joinOngoingGameResponse;
    }

    const player = gameInDb.humanPlayers.find(player => player.name === playAsPlayer);
    if (player) {
      const reJoiningMySelf = playAsPlayer === userName;
      joinOngoingGameResponse.playerName = player.name;
      player.active = true;
      if (reJoiningMySelf) {
        joinOngoingGameResponse.playedBy = player.playedBy;
        player.playedBy = undefined;
      } else if (forceJoin) {
        player.playedBy = userName;
      } else if (!forceJoin) {
        joinOngoingGameResponse.joinStatus = JOIN_GAME_STATUS.waiting;
        joinOngoingGameResponse.playedBy = userName;
        return joinOngoingGameResponse;
      }

      try {
        const gameAfter = await gameInDb.save();
        if (gameAfter) {
          joinOngoingGameResponse.joinStatus = JOIN_GAME_STATUS.ok;
          return joinOngoingGameResponse;
        } else {
          joinOngoingGameResponse.playedBy = undefined;
        }
      } catch (e) {
        console.error(e);
        joinOngoingGameResponse.joinStatus = JOIN_GAME_STATUS.failed;
      }
    }
  }

  return joinOngoingGameResponse;
};
