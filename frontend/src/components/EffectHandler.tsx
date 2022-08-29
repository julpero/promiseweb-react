import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUND_STATUS } from "../interfaces/IuiGameOptions";
import { IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification, ROUND_PHASE } from "../interfaces/IuiPlayingGame";
import { useSocket } from "../socket";
import { setActionsAvailable } from "../store/actionsAvailableSlice";
import { AnimateCard, setAnimateCard } from "../store/animateCardSlice";
import { getCurrentGameInfo, setGameInfo } from "../store/gameInfoSlice";
import { getGetRoundInfo, setGetRoundInfo } from "../store/getRoundInfoSlice";
import { getPlayedCard, setPlayedCard } from "../store/playCardSlice";
import { getCurrentRoundInfo, setRoundInfo } from "../store/roundInfoSlice";

interface IProps {
  gameId: string,
}

const EffectHandler = ({gameId}: IProps) => {
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const getRoundInfoRequest = useSelector(getGetRoundInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const playedCard = useSelector(getPlayedCard);
  const dispatch = useDispatch();
  console.log("EffectHandler");

  const initialRender = useRef(true);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  useEffect(() => {
    console.log("getRoundInfoRequest", getRoundInfoRequest);
    if (getRoundInfoRequest) {
      const getRoundRequest = { ...getRoundInfoRequest };
      console.log("use effect, getRoundRequest", getRoundRequest);

      socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
        console.log("roundResponse", roundResponse);
        dispatch(setRoundInfo(roundResponse));
        dispatch(setActionsAvailable(roundResponse.roundToPlayer.isMyPromiseTurn || roundResponse.roundToPlayer.isMyTurn));
      });

    }
  }, [getRoundInfoRequest, socket, dispatch]);

  useEffect(() => {
    console.log("EffectHandler, gameId", gameId);

    const onPromiseMadeNotification = (promiseNotification: IuiPromiseMadeNotification) => {
      console.log("promise made", promiseNotification);

      const getRoundRequest: IuiGetRoundRequest = {
        myId: getMyId(),
        gameId: gameId,
        roundInd: promiseNotification.currentRoundIndex,
      };
      dispatch(setGetRoundInfo(getRoundRequest));
    };

    const onCardPlayedNotification = (cardPlayedNotification: IuiCardPlayedNotification) => {
      console.log("cardPlayedNotification", cardPlayedNotification);
      const { playerName, playedFromSlot, playedCard, roundStatusAfterPlay, currentRoundIndex, winnerOfPlay, winCount, newPlayAfterHit } = cardPlayedNotification;

      // animate played card
      dispatch(setActionsAvailable(false));
      const animatedCard: AnimateCard = {
        cardFace: playedCard,
        fromPlayer: playerName,
        fromSlot: playedFromSlot,
        getRoundRequest: !newPlayAfterHit && roundStatusAfterPlay === ROUND_STATUS.onGoing ? {
          myId: getMyId(),
          gameId: gameId,
          roundInd: currentRoundIndex,
        } : null,
        collectCards: newPlayAfterHit ? {
          winner: winnerOfPlay ?? "",
          winCount: winCount ?? 0,
          getRoundRequest: {
            myId: getMyId(),
            gameId: gameId,
            roundInd: (roundStatusAfterPlay === ROUND_STATUS.played) ? currentRoundIndex + 1 : currentRoundIndex,
          }
        } : null,
      };
      dispatch(setAnimateCard(animatedCard));
    };

    if (gameId !== "" && initialRender.current) {
      initialRender.current = false;

      const getGameInfoRequest: IuiGetGameInfoRequest = {
        myId: getMyId(),
        gameId: gameId,
      };
      // console.log("getGameInfoRequest", getGameInfoRequest);
      socket.emit("check game", getGameInfoRequest, (gameInfoResponse: IuiGetGameInfoResponse) => {
        console.log("gameInfoResponse", gameInfoResponse);
        dispatch(setGameInfo(gameInfoResponse));
      });

      socket.on("promise made", onPromiseMadeNotification);
      socket.on("card played", onCardPlayedNotification);
    }

    return () => {
      socket.off("promise made");
      socket.off("card played");
    };
  }, [gameId, socket, dispatch]);

  useEffect(() => {
    console.log("playedCard useEffect (store)", playedCard);
    if (playedCard && currentRoundInfo.roundToPlayer.isMyTurn && currentRoundInfo.roundToPlayer.roundPhase === ROUND_PHASE.onPlay) {
      const playCardRequest: IuiPlayCardRequest = {
        myId: getMyId(),
        gameId: gameId,
        roundInd: currentRoundInfo.roundInd ?? 0,
        card: playedCard,
        isSpeedPlay: false,
      };
      console.log("playedCard useEffect (store) playCardRequest", playCardRequest);
      socket.emit("play card", playCardRequest, (playCardResponse: IuiPlayCardResponse) => {
        dispatch(setPlayedCard(null));
        dispatch(setActionsAvailable(true));
        console.log("playCardResponse (store)", playCardResponse);
      });
    } else {
      dispatch(setPlayedCard(null));
    }
  }, [gameId, currentRoundInfo, playedCard, socket, dispatch]);

  useEffect(() => {
    console.log("currentGameInfo updated", currentGameInfo);
    if (currentGameInfo.currentRound !== null && currentGameInfo.currentRound >= 0) {
      const getRoundRequest: IuiGetRoundRequest = {
        myId: getMyId(),
        gameId: currentGameInfo.gameId,
        roundInd: currentGameInfo.currentRound,
      };
      console.log("getRoundRequest A", getRoundRequest);
      dispatch(setGetRoundInfo(getRoundRequest));
    }
  }, [currentGameInfo, dispatch]);

  return null;
};

export default EffectHandler;
