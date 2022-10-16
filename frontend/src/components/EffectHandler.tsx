import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { GAME_STATUS, ROUND_STATUS } from "../interfaces/IuiGameOptions";
import { IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification, ROUND_PHASE } from "../interfaces/IuiPlayingGame";
import { useSocket } from "../socket";
import { AnimateCard, setAnimateCard } from "../store/animateCardSlice";
import { getCurrentGameId, getCurrentGameInfo, setGameInfo } from "../store/gameInfoSlice";
import { getGetRoundInfo, setGetRoundInfo } from "../store/getRoundInfoSlice";
import { getPlayedCard, setPlayedCard } from "../store/playCardSlice";
import { getCurrentRoundInfo, setRoundInfo } from "../store/roundInfoSlice";
import { getUser } from "../store/userSlice";

const EffectHandler = () => {
  const gameId = useSelector(getCurrentGameId);
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const getRoundInfoRequest = useSelector(getGetRoundInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const playedCard = useSelector(getPlayedCard);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  // console.log("EffectHandler");

  const initialRender = useRef(true);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    // console.log("getRoundInfoRequest", getRoundInfoRequest);
    if (getRoundInfoRequest) {
      const getRoundRequest = { ...getRoundInfoRequest };
      // console.log("use effect, getRoundRequest", getRoundRequest);

      socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
        // console.log("roundResponse", roundResponse);
        if (roundResponse.isAuthenticated) {
          handleAuthenticatedRequest(roundResponse.token);
          dispatch(setRoundInfo(roundResponse));
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [getRoundInfoRequest, socket, dispatch]);

  useEffect(() => {
    // console.log("EffectHandler, gameId", gameId);

    const onPromiseMadeNotification = (promiseNotification: IuiPromiseMadeNotification) => {
      // console.log("promise made", promiseNotification);

      const getRoundRequest: IuiGetRoundRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: gameId,
        roundInd: promiseNotification.currentRoundIndex,
      };
      dispatch(setGetRoundInfo(getRoundRequest));
    };

    const onCardPlayedNotification = (cardPlayedNotification: IuiCardPlayedNotification) => {
      // console.log("cardPlayedNotification", cardPlayedNotification);
      const { playerName, playedFromSlot, playedCard, roundStatusAfterPlay, currentRoundIndex, winnerOfPlay, winCount, newPlayAfterHit, gameStatusAfterPlay } = cardPlayedNotification;

      // animate played card
      const animatedCard: AnimateCard = {
        cardFace: playedCard,
        fromPlayer: playerName,
        fromSlot: playedFromSlot,
        getRoundRequest: !newPlayAfterHit && roundStatusAfterPlay === ROUND_STATUS.onGoing ? {
          uuid: getMyId(),
          userName: user.userName,
          token: getToken(),
          gameId: gameId,
          roundInd: currentRoundIndex,
        } : null,
        collectCards: newPlayAfterHit || gameStatusAfterPlay === GAME_STATUS.played ? {
          winner: winnerOfPlay ?? "",
          winCount: winCount ?? 0,
          getRoundRequest: {
            uuid: getMyId(),
            userName: user.userName,
            token: getToken(),
            gameId: gameId,
            roundInd: (roundStatusAfterPlay === ROUND_STATUS.played && gameStatusAfterPlay !== GAME_STATUS.played) ? currentRoundIndex + 1 : currentRoundIndex,
          }
        } : null,
      };
      dispatch(setAnimateCard(animatedCard));
    };

    const heyHey = () => {
      console.log("Hey hey to me!");
    };

    if (gameId !== "" && initialRender.current && user.isUserLoggedIn) {
      initialRender.current = false;

      const getGameInfoRequest: IuiGetGameInfoRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: gameId,
      };
      // console.log("INITIAL getGameInfoRequest", getGameInfoRequest);
      socket.emit("check game", getGameInfoRequest, (gameInfoResponse: IuiGetGameInfoResponse) => {
        // console.log("gameInfoResponse", gameInfoResponse);
        if (gameInfoResponse.isAuthenticated) {
          handleAuthenticatedRequest(gameInfoResponse.token);
          dispatch(setGameInfo(gameInfoResponse));
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });

      socket.on("promise made", onPromiseMadeNotification);
      socket.on("card played", onCardPlayedNotification);
      socket.on("hey", heyHey);
    }

    return () => {
      socket.off("promise made");
      socket.off("card played");
      socket.off("hey");
    };
  }, [gameId, user, socket, dispatch]);

  useEffect(() => {
    // console.log("playedCard useEffect (store)", playedCard);
    if (user.isUserLoggedIn && playedCard && currentRoundInfo.roundToPlayer.isMyTurn && currentRoundInfo.roundToPlayer.roundPhase === ROUND_PHASE.onPlay) {
      const playCardRequest: IuiPlayCardRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: gameId,
        roundInd: currentRoundInfo.roundInd ?? 0,
        card: playedCard,
        isSpeedPlay: false,
      };
      // console.log("playedCard useEffect (store) playCardRequest", playCardRequest);
      socket.emit("play card", playCardRequest, (playCardResponse: IuiPlayCardResponse) => {
        // console.log("playCardResponse (store)", playCardResponse);
        if (playCardResponse.isAuthenticated) {
          handleAuthenticatedRequest(playCardResponse.token);
          dispatch(setPlayedCard(null));
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    } else {
      dispatch(setPlayedCard(null));
    }
  }, [gameId, user, currentRoundInfo, playedCard, socket, dispatch]);

  useEffect(() => {
    // console.log("currentGameInfo updated", currentGameInfo);
    if (user.isUserLoggedIn && currentGameInfo.gameId !== "" && currentGameInfo.currentRound !== null && currentGameInfo.currentRound >= 0) {
      const getRoundRequest: IuiGetRoundRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: currentGameInfo.gameId,
        roundInd: currentGameInfo.currentRound,
      };
      // console.log("getRoundRequest A", getRoundRequest);
      dispatch(setGetRoundInfo(getRoundRequest));
    }
  }, [currentGameInfo, user, dispatch]);

  return null;
};

export default EffectHandler;
