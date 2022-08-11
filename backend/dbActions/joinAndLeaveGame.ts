import { IJoinLeaveGameRequest, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IGameList";
import { GAME_STATUS } from "../../frontend/src/interfaces/IGameOptions";
import { IHumanPlayer } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";
import { getPlayerStats, getGameRoundCount } from "../common/common";
import { startGame } from "../common/initGame";

export const joinOnGame = async (joinGameRequest: IJoinLeaveGameRequest): Promise<JOIN_LEAVE_RESULT> => {
  const gameInDb = await GameOptions.findById(joinGameRequest.gameId);
  console.log("gameInDb", gameInDb);
  if (!gameInDb) return JOIN_LEAVE_RESULT.notOk;

  if (gameInDb.gameStatus !== GAME_STATUS.Created) {
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

  const newPlayerStats = await getPlayerStats(getGameRoundCount(gameInDb), joinGameRequest.myName);
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

export const leaveTheGame = async (leaveGameRequest: IJoinLeaveGameRequest): Promise<JOIN_LEAVE_RESULT> => {
  const game = await GameOptions.findById(leaveGameRequest.gameId);
  console.log("game", game);
  if (!game) return JOIN_LEAVE_RESULT.notOk;

  if (game.gameStatus !== GAME_STATUS.Created) {
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
    game.gameStatus = GAME_STATUS.Dismissed;
  }

  const gameAfter = await game.save();
  return gameAfter !== null ? JOIN_LEAVE_RESULT.ok : JOIN_LEAVE_RESULT.notOk;
};
