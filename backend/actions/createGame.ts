import { insertNewGame, hasOngoingOrCreatedGame, getPlayerAvgPoints } from "../dbActions/promiseweb";
import { IGameOptions} from "../interfaces/IGameOptions";
import { IuiCreateGameRequest, IuiCreateGameResponse, CREATE_GAME_STATUS } from "../../frontend/src/interfaces/IuiNewGame";
import { GAME_STATUS, HIDDEN_CARDS_MODE } from "../../frontend/src/interfaces/IuiGameOptions";

const hiddenCardsModeToEnum = (selected: string): HIDDEN_CARDS_MODE => {
  switch (selected) {
    case "1": return HIDDEN_CARDS_MODE.onlyCardInCharge;
    case "2": return HIDDEN_CARDS_MODE.cardInChargeAndWinning;
    default: return HIDDEN_CARDS_MODE.normal;
  }
};

const createGameOptions = async (values: IuiCreateGameRequest): Promise<IGameOptions> => {
  const startRound = parseInt(values.newGameStartRound, 10);
  const turnRound = parseInt(values.newGameTurnRound, 10);
  const endRound = parseInt(values.newGameEndRound, 10);
  const avgStats = await getPlayerAvgPoints(values.userName, startRound, turnRound, endRound);
  const statsGamesObj = {
    playerAvgPointsInRounds: avgStats,
  };
  return {
    humanPlayersCount: parseInt(values.newGameHumanPlayersCount, 10),
    botPlayersCount: 0,
    startRound: startRound,
    turnRound: turnRound,
    endRound: endRound,
    adminName: values.userName,
    password: values.newGamePassword ?? "",
    gameStatus: GAME_STATUS.created,
    humanPlayers: [{name: values.userName, active: true, playerStats: statsGamesObj}],
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
  const {userName, newGameStartRound, newGameTurnRound, newGameEndRound, newGameHumanPlayersCount} = createGameRequest;
  const response: IuiCreateGameResponse = {
    responseStatus: CREATE_GAME_STATUS.notOk,
    newGameId: "",
  };

  const startRound = parseInt(newGameStartRound, 10);
  const turnRound = parseInt(newGameTurnRound, 10);
  const endRound = parseInt(newGameEndRound, 10);
  if (turnRound > startRound) {
    return response;
  }
  if (endRound < turnRound) {
    return response;
  }

  if (parseInt(newGameHumanPlayersCount, 10) > 5 && (startRound > 8 || endRound > 8)) {
    return response;
  }

  const okToCreate = !(await hasOngoingOrCreatedGame(userName));
  if (!okToCreate) {
    response.responseStatus = CREATE_GAME_STATUS.onGoingGame;
    console.log("hasOngoingOrCreatedGame");
    return response;
  }

  if (okToCreate) {
    const gameOptions = await createGameOptions(createGameRequest);
    // console.log("gameOptions", gameOptions);

    const createdGameIdStr = await insertNewGame(gameOptions);
    // console.log("create game - gameOptions inserted with _id: " + createdGameIdStr);
    response.responseStatus = createdGameIdStr ? CREATE_GAME_STATUS.ok : CREATE_GAME_STATUS.notOk;
    response.newGameId = createdGameIdStr;
  }

  return response;
};
