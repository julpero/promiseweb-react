import React, { useEffect, useState } from "react";
import { useSocket } from "../socket";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IuiCard, IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification } from "../interfaces/IuiPlayingGame";

interface IProps {
  gameId: string,
}

const GameTable = ({gameId}: IProps) => {
  const [gameInfo, setGameInfo] = useState<IuiGetGameInfoResponse | null>(null);
  const [roundInfo, setRoundInfo] = useState<IuiGetRoundResponse | null>(null);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  useEffect(() => {
    console.log("gametable did mount, gameId", gameId);
    if (gameId !== "") {
      const getGameInfoRequest: IuiGetGameInfoRequest = {
        myId: getMyId(),
        gameId: gameId,
      };
      socket.emit("check game", getGameInfoRequest, (gameInfoResponse: IuiGetGameInfoResponse) => {
        console.log("gameInfoResponse", gameInfoResponse);

        const getRoundRequest: IuiGetRoundRequest = {
          myId: getMyId(),
          gameId: gameId,
          roundInd: gameInfoResponse.currentRound ?? 0,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse", roundResponse);
          setGameInfo(gameInfoResponse);
          setRoundInfo(roundResponse);
        });
      });

      socket.on("promise made", (promiseNotification: IuiPromiseMadeNotification) => {
        console.log("promise made", promiseNotification);

        const getRoundRequest: IuiGetRoundRequest = {
          myId: getMyId(),
          gameId: gameId,
          roundInd: roundInfo?.roundInd ?? 0,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse after promise", roundResponse);
          setRoundInfo(roundResponse);
        });
      });

      socket.on("card played", (cardPlayedNotification: IuiCardPlayedNotification) => {
        console.log("cardPlayedNotification", cardPlayedNotification);

        const getRoundRequest: IuiGetRoundRequest = {
          myId: getMyId(),
          gameId: gameId,
          roundInd: roundInfo?.roundInd ?? 0,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse after card hit", roundResponse);
          setRoundInfo(roundResponse);
        });
      });
    }

    return () => {
      socket.off("promise made");
    };
  }, []);

  const onPlayCard = (card: IuiCard) => {
    console.log("onPlayCard in GAMETABLE", card);
    const playCardRequest: IuiPlayCardRequest = {
      myId: getMyId(),
      gameId: gameId,
      roundInd: gameInfo?.currentRound ?? 0,
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
          <CardBoard gameInfo={gameInfo} roundInfo={roundInfo} onPlayCard={onPlayCard} />
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
        </div>
      </div>
    </div>
  );
};

export default GameTable;
