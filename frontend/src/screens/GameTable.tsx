import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../socket";

import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRound,
  setGameInfo,
} from "../store/gameInfoSlice";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IuiCard, IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification } from "../interfaces/IuiPlayingGame";
import { ROUND_STATUS } from "../interfaces/IuiGameOptions";

interface IProps {
  gameId: string,
}

const GameTable = ({gameId}: IProps) => {
  const currentRoundIndex = useSelector(getCurrentRound);
  const dispatch = useDispatch();

  const [gameInfo, setGameInfoX] = useState<IuiGetGameInfoResponse | null>(null);
  const [roundInfo, setRoundInfo] = useState<IuiGetRoundResponse | null>(null);
  const [roundInd, setRoundInd] = useState(-1);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  const initialRender = useRef(true);

  useEffect(() => {
    // console.log("mounted, gameId", gameId);
    const getGameInfoRequest: IuiGetGameInfoRequest = {
      myId: getMyId(),
      gameId: gameId,
    };
    // console.log("getGameInfoRequest", getGameInfoRequest);
    socket.emit("check game", getGameInfoRequest, (gameInfoResponse: IuiGetGameInfoResponse) => {
      console.log("gameInfoResponse", gameInfoResponse);
      initialRender.current = false;
      dispatch(setGameInfo(gameInfoResponse));
      setGameInfoX(gameInfoResponse);
      setRoundInd(gameInfoResponse.currentRound ?? 0);
    });

    socket.on("promise made", onPromiseMadeNotification);
    socket.on("card played", onCardPlayedNotification);

    return () => {
      socket.off("promise made");
      socket.off("card played");
    };
  }, []);

  useEffect(() => {
    // console.log("roundInd updated", roundInd);
    if (roundInd >= 0) {
      const getRoundRequest: IuiGetRoundRequest = {
        myId: getMyId(),
        gameId: gameId,
        roundInd: roundInd,
      };
      console.log("getRoundRequest A", getRoundRequest);

      socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
        console.log("roundResponse after round change", roundResponse);
        setRoundInfo(roundResponse);

        // console.log("gameInfo after init", gameInfo);
        // console.log("roundInfo after init", roundInfo);
        // console.log("roundInd after init", roundInd);
      });
    }
  }, [roundInd]);

  const onPromiseMadeNotification = (promiseNotification: IuiPromiseMadeNotification) => {
    console.log("promise made", promiseNotification);
    console.log("roundInfo after promise made", roundInfo);

    const getRoundRequest: IuiGetRoundRequest = {
      myId: getMyId(),
      gameId: gameId,
      roundInd: promiseNotification.currentRoundIndex,
    };

    console.log("getRoundRequest B", getRoundRequest);

    socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
      console.log("roundResponse after promise", roundResponse);
      setRoundInfo(roundResponse);
    });
  };

  const onCardPlayedNotification = (cardPlayedNotification: IuiCardPlayedNotification) => {
    console.log("cardPlayedNotification", cardPlayedNotification);
    // console.log("roundInfo after card played", roundInfo);

    if (cardPlayedNotification.roundStatusAfterPlay === ROUND_STATUS.played) {
      setRoundInd(cardPlayedNotification.currentRoundIndex + 1);
    } else {
      const getRoundRequest: IuiGetRoundRequest = {
        myId: getMyId(),
        gameId: gameId,
        roundInd: cardPlayedNotification.currentRoundIndex,
      };
      console.log("getRoundRequest after card hit", getRoundRequest);

      socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
        console.log("roundResponse after card hit", roundResponse);
        setRoundInfo(roundResponse);
      });
    }
  };

  const onPlayCard = (card: IuiCard) => {
    console.log("onPlayCard in GAMETABLE", card);
    const playCardRequest: IuiPlayCardRequest = {
      myId: getMyId(),
      gameId: gameId,
      roundInd: roundInd ?? 0,
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
          <CardBoard
            gameInfo={gameInfo}
            roundInfo={roundInfo}
            onPlayCard={onPlayCard}
          />
        </div>
        <div className="col-2">
          <ScoreBoard />
        </div>
      </div>
      <div className="row fixed-bottom" style={{height: "150px", margin: "0px 0px"}}>
        <div className="col-6">
          <PromiseTable promiseTable={roundInfo?.roundToPlayer.promiseTable ?? null} />
        </div>
        <div className="col-4">
          <Chat />
        </div>
        <div className="col-2">
          buttons and game menu
          I: {currentRoundIndex}
        </div>
      </div>
    </div>
  );
};

export default GameTable;
