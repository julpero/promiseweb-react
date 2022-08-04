import { insertNewGame, hasOngoingCreatedGame } from "../dbActions/promiseweb";
import { checkLogin } from "../dbActions/users";
import { getPlayerStats } from "../common/common";

import { IGameOptions, GAME_STATUS, HIDDEN_CARDS_MODE} from "../interfaces/IGameOptions";
import { ICreateGameRequest, ICreateGameResponse, CREATE_GAME_STATUS } from "../../frontend/src/interfaces/INewGame";
import { ICheckLoginRequest, ICheckLoginResponse, IUser } from "../interfaces/IUser";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IUser";

import { validate as uuidValidate } from 'uuid';

const hiddenCardsModeToEnum = (selected: string): HIDDEN_CARDS_MODE => {
  switch (selected) {
    case "1": return HIDDEN_CARDS_MODE.onlyCardInCharge;
    case "2": return HIDDEN_CARDS_MODE.cardInChargeAndWinning;
    default: return HIDDEN_CARDS_MODE.normal;
  }
}

const createGameOptions = (values: ICreateGameRequest): IGameOptions => {
  return {
    humanPlayersCount: parseInt(values.newGameHumanPlayersCount, 10),
    botPlayersCount: 0,
    startRound: parseInt(values.newGameStartRound, 10),
    turnRound: parseInt(values.newGameTurnRound, 10),
    endRound: parseInt(values.newGameEndRound, 10),
    adminName: values.newGameMyName,
    password: values.newGamePassword,
    gameStatus: GAME_STATUS.Created,
    humanPlayers: [{name: values.newGameMyName, playerId: values.playerId, active: true}],
    createDateTime: new Date(),
    evenPromisesAllowed: !values.noEvenPromises,
    visiblePromiseRound: !values.hidePromiseRound,
    onlyTotalPromise: values.onlyTotalPromise,
    freeTrump: !values.mustTrump,
    hiddenTrump: values.hiddenTrump,
    speedPromise: values.speedPromise,
    privateSpeedGame: values.privateSpeedGame,
    opponentPromiseCardValue: values.opponentPromiseCardValue,
    opponentGameCardValue: values.opponentGameCardValue,
    thisIsDemoGame: values.thisIsDemoGame,
    hiddenCardsMode: hiddenCardsModeToEnum(values.hiddenCardsMode),
  } as IGameOptions;
}

export default async function createGame(createGameRequest: ICreateGameRequest): Promise<ICreateGameResponse> {
  const response: ICreateGameResponse = {
    responseStatus: CREATE_GAME_STATUS.notOk,
    newGameId: "",
    loginStatus: LOGIN_RESPONSE.ok
  }

  if (!uuidValidate(createGameRequest.playerId)) {
    console.log("uuidValidate");
    response.responseStatus = CREATE_GAME_STATUS.notValidPlayerId;
    return response;
  }

  const adminUserName = createGameRequest.newGameMyName;
  const adminId = createGameRequest.playerId;

  let okToCreate = !(await hasOngoingCreatedGame(adminId));
  if (!okToCreate) {
    console.log("hasOngoingCreatedGame");
    return response;
  }

  const checkLoginObj: ICheckLoginRequest = {
    userName: adminUserName,
    userPass1: createGameRequest.password1 ?? "",
    userPass2: createGameRequest.password2 ?? "",
  }
  const loginObj = await checkLogin(checkLoginObj);
  console.log("loginObj after", loginObj);
  response.loginStatus = loginObj.result;

  if (okToCreate && loginObj.loginOk) {
      const gameOptions = createGameOptions(createGameRequest);
      console.log("gameOptions", gameOptions);

      gameOptions.humanPlayers[0].playerStats = await getPlayerStats(gameOptions, gameOptions.adminName);
      const createdGameIdStr = await insertNewGame(gameOptions);
      console.log('create game - gameOptions inserted with _id: ' + createdGameIdStr);
      response.responseStatus = CREATE_GAME_STATUS.ok;
      response.newGameId = createdGameIdStr;
  }

  return response;
}
