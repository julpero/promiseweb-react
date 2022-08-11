import { insertNewGame, hasOngoingOrCreatedGame } from "../dbActions/promiseweb";
import { checkLogin } from "../dbActions/users";
import { getPlayerStats, getGameRoundCount } from "../common/common";
import { IGameOptions} from "../interfaces/IGameOptions";
import { ICreateGameRequest, ICreateGameResponse, CREATE_GAME_STATUS } from "../../frontend/src/interfaces/IuiNewGame";
import { GAME_STATUS, HIDDEN_CARDS_MODE } from "../../frontend/src/interfaces/IuiGameOptions";
import { ICheckLoginRequest  } from "../interfaces/IUser";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";

import { validate as uuidValidate } from "uuid";

const hiddenCardsModeToEnum = (selected: string): HIDDEN_CARDS_MODE => {
  switch (selected) {
    case "1": return HIDDEN_CARDS_MODE.onlyCardInCharge;
    case "2": return HIDDEN_CARDS_MODE.cardInChargeAndWinning;
    default: return HIDDEN_CARDS_MODE.normal;
  }
};

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
};

const createGame = async (createGameRequest: ICreateGameRequest): Promise<ICreateGameResponse> => {
  const response: ICreateGameResponse = {
    responseStatus: CREATE_GAME_STATUS.notOk,
    newGameId: "",
    loginStatus: LOGIN_RESPONSE.ok
  };

  if (!uuidValidate(createGameRequest.playerId)) {
    console.log("uuidValidate");
    response.responseStatus = CREATE_GAME_STATUS.notValidPlayerId;
    return response;
  }

  const adminUserName = createGameRequest.newGameMyName;
  const adminId = createGameRequest.playerId;

  const checkLoginObj: ICheckLoginRequest = {
    userName: adminUserName,
    userPass1: createGameRequest.password1 ?? "",
    userPass2: createGameRequest.password2 ?? "",
  };
  const loginObj = await checkLogin(checkLoginObj);
  response.loginStatus = loginObj.result;
  if (!loginObj.loginOk) {
    console.log("loginFailed", response.loginStatus);
    return response;
  }

  const okToCreate = !(await hasOngoingOrCreatedGame(adminId));
  if (!okToCreate) {
    console.log("hasOngoingOrCreatedGame");
    return response;
  }

  if (okToCreate && loginObj.loginOk) {
    const gameOptions = createGameOptions(createGameRequest);
    console.log("gameOptions", gameOptions);

    gameOptions.humanPlayers[0].playerStats = await getPlayerStats(getGameRoundCount(gameOptions), gameOptions.adminName);
    const createdGameIdStr = await insertNewGame(gameOptions);
    console.log("create game - gameOptions inserted with _id: " + createdGameIdStr);
    response.responseStatus = CREATE_GAME_STATUS.ok;
    response.newGameId = createdGameIdStr;
  }

  return response;
};

export default createGame;
