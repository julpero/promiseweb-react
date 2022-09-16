import { insertNewGame, hasOngoingOrCreatedGame } from "../dbActions/promiseweb";
import { getPlayerStats } from "../common/common";
import { IGameOptions} from "../interfaces/IGameOptions";
import { IuiCreateGameRequest, IuiCreateGameResponse, CREATE_GAME_STATUS } from "../../frontend/src/interfaces/IuiNewGame";
import { GAME_STATUS, HIDDEN_CARDS_MODE } from "../../frontend/src/interfaces/IuiGameOptions";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";

import { validate as uuidValidate } from "uuid";

const hiddenCardsModeToEnum = (selected: string): HIDDEN_CARDS_MODE => {
  switch (selected) {
    case "1": return HIDDEN_CARDS_MODE.onlyCardInCharge;
    case "2": return HIDDEN_CARDS_MODE.cardInChargeAndWinning;
    default: return HIDDEN_CARDS_MODE.normal;
  }
};

const createGameOptions = (values: IuiCreateGameRequest): IGameOptions => {
  return {
    humanPlayersCount: parseInt(values.newGameHumanPlayersCount, 10),
    botPlayersCount: 0,
    startRound: parseInt(values.newGameStartRound, 10),
    turnRound: parseInt(values.newGameTurnRound, 10),
    endRound: parseInt(values.newGameEndRound, 10),
    adminName: values.userName,
    password: values.newGamePassword,
    gameStatus: GAME_STATUS.created,
    humanPlayers: [{name: values.userName, playerId: values.uuid, active: true}],
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

export const createGame = async (createGameRequest: IuiCreateGameRequest): Promise<IuiCreateGameResponse> => {
  const response: IuiCreateGameResponse = {
    responseStatus: CREATE_GAME_STATUS.notOk,
    newGameId: "",
    loginStatus: LOGIN_RESPONSE.ok
  };

  const okToCreate = !(await hasOngoingOrCreatedGame(createGameRequest.uuid));
  if (!okToCreate) {
    console.log("hasOngoingOrCreatedGame");
    return response;
  }

  if (okToCreate) {
    const gameOptions = createGameOptions(createGameRequest);
    console.log("gameOptions", gameOptions);

    gameOptions.humanPlayers[0].playerStats = await getPlayerStats(gameOptions, gameOptions.adminName);
    const createdGameIdStr = await insertNewGame(gameOptions);
    console.log("create game - gameOptions inserted with _id: " + createdGameIdStr);
    response.responseStatus = CREATE_GAME_STATUS.ok;
    response.newGameId = createdGameIdStr;
  }

  return response;
};
