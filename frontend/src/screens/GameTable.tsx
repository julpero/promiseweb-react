import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../socket";

import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentGameInfo,
  setGameInfo,
} from "../store/gameInfoSlice";

import {
  getCurrentRoundFromRoundInfo,
  getCurrentRoundInfo,
  setRoundInfo,
} from "../store/roundInfoSlice";

import {
  setGetRoundInfo,
} from "../store/getRoundInfoSlice";

import {
  getPlayedCard,
  setPlayedCard,
} from "../store/playCardSlice";

import {
  setAnimateCard,
  AnimateCard,
} from "../store/animateCardSlice";

import {
  setActionsAvailable,
} from "../store/actionsAvailableSlice";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IuiCard, IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification } from "../interfaces/IuiPlayingGame";
import { ROUND_STATUS } from "../interfaces/IuiGameOptions";
import { getGetRoundInfo } from "../store/getRoundInfoSlice";

interface IProps {
  gameId: string,
}

const GameTable = ({gameId}: IProps) => {
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const getRoundInfoRequest = useSelector(getGetRoundInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const playedCard = useSelector(getPlayedCard);
  const dispatch = useDispatch();

  // const [gameInfo, setGameInfoX] = useState<IuiGetGameInfoResponse | null>(null);
  // const [roundInfo, setRoundInfo] = useState<IuiGetRoundResponse | null>(null);
  // const [roundInd, setRoundInd] = useState(-1);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  const initialRender = useRef(true);

  useEffect(() => {
    console.log("GAMETABLE, gameId", gameId);

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
      const { playerName, playedFromSlot, playedCard, roundStatusAfterPlay, currentRoundIndex } = cardPlayedNotification;

      //
      // const cardFromContainer = document.getElementById(`cardsToPlaySlotsX${playerName}X${playedFromSlot}`);
      // console.log("cardFromContainer", cardFromContainer);
      // if (cardFromContainer) {
      //   // played card will always move to the played card container
      //   const cardPlayedToContainer = playerName === currentRoundInfo.myName
      //     ? document.getElementById("myPlayedCardDiv")
      //     : document.getElementById(`cardPlayedDivX${playerName}`);
      //   if (cardPlayedToContainer) {
      //     console.log("do the animation, cardPlayedToContainer", cardPlayedToContainer);
      //     const playedFrom = cardFromContainer.getBoundingClientRect();
      //     const playedTo = cardPlayedToContainer.getBoundingClientRect();
      //     console.log("playedFrom", playedFrom);
      //     console.log("playedTo", playedTo);
      //     const playedFromChild = cardFromContainer.children;
      //     const playedToChild = cardPlayedToContainer.children;
      //     console.log("playedFromChild", playedFromChild);
      //     console.log("playedToChild", playedToChild);
      //   }
      // }
      //

      // animate played card
      dispatch(setActionsAvailable(false));
      const animatedCard: AnimateCard = {
        cardFace: playedCard,
        fromPlayer: playerName,
        fromSlot: playedFromSlot,
        getRoundRequest: {
          myId: getMyId(),
          gameId: gameId,
          roundInd: roundStatusAfterPlay === ROUND_STATUS.played ? currentRoundIndex + 1 : currentRoundIndex,
        },
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
    console.log("getRoundInfoRequest", getRoundInfoRequest);
    if (getRoundInfoRequest) {
      const getRoundRequest = { ...getRoundInfoRequest };
      console.log("use effect, getRoundRequest", getRoundRequest);
      dispatch(setGetRoundInfo(null));
      // dispatch(setAnimateCard(null));

      socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
        console.log("roundResponse", roundResponse);
        dispatch(setRoundInfo(roundResponse));
        dispatch(setActionsAvailable(roundResponse.roundToPlayer.isMyPromiseTurn || roundResponse.roundToPlayer.isMyTurn));
        // setRoundInfo(roundResponse);
      });

    }
  }, [getRoundInfoRequest, socket, dispatch]);

  useEffect(() => {
    console.log("playedCard useEffect (store)", playedCard);
    if (playedCard) {
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

      // socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
      //   console.log("roundResponse after round change", roundResponse);
      //   setRoundInfo(roundResponse);

      //   // console.log("gameInfo after init", gameInfo);
      //   // console.log("roundInfo after init", roundInfo);
      //   // console.log("roundInd after init", roundInd);
      // });
    }
  }, [currentGameInfo, socket, dispatch]);

  const onPlayCard = (card: IuiCard) => {
    console.log("onPlayCard in GAMETABLE", card);
    const playCardRequest: IuiPlayCardRequest = {
      myId: getMyId(),
      gameId: gameId,
      roundInd: currentRoundInfo.roundInd ?? 0,
      card: card,
      isSpeedPlay: false,
    };
    socket.emit("play card", playCardRequest, (playCardResponse: IuiPlayCardResponse) => {
      console.log("playCardResponse", playCardResponse);
    });
  };

  return (
    <div className="container-fluid" style={{width: "100vw", height: "100vh"}}>
      <div className="row">
        <div className="col-10">
          <CardBoard />
        </div>
        <div className="col-2">
          <ScoreBoard />
        </div>
      </div>
      <div className="row fixed-bottom" style={{height: "150px", margin: "0px 0px"}}>
        <div className="col-6">
          <PromiseTable />
        </div>
        <div className="col-4">
          <Chat />
        </div>
        <div className="col-2">
          buttons and game menu
          I: {currentGameInfo.currentRound}
        </div>
      </div>
    </div>
  );
};

export default GameTable;
