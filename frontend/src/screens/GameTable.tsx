import React, { useEffect, useState } from "react";
import { useSocket } from "../socket";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiPromiseMadeNotification } from "../interfaces/IuiPlayingGame";

interface IProps {
  gameId: string,
}

const GameTable = ({gameId}: IProps) => {
  const [gameInfo, setGameInfo] = useState<IuiGetGameInfoResponse | null>(null);
  const [roundInfo, setRoundInfo] = useState<IuiGetRoundResponse | null>(null);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  let roundInd = -1;

  useEffect(() => {
    console.log("gametable did mount, gameId", gameId);
    if (gameId !== "") {
      const getGameInfoRequest: IuiGetGameInfoRequest = {
        myId: getMyId(),
        gameId: gameId,
      };
      socket.emit("check game", getGameInfoRequest, (gameInfo: IuiGetGameInfoResponse) => {
        console.log("gameInfo", gameInfo);

        roundInd = gameInfo.currentRound ?? 0;

        const getRoundRequest: IuiGetRoundRequest = {
          myId: getMyId(),
          gameId: gameId,
          roundInd: roundInd,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse", roundResponse);
          setGameInfo(gameInfo);
          setRoundInfo(roundResponse);
        });
      });

      socket.on("promise made", (promiseNotification: IuiPromiseMadeNotification) => {
        console.log("promise made", promiseNotification);

        const getRoundRequest: IuiGetRoundRequest = {
          myId: getMyId(),
          gameId: gameId,
          roundInd: roundInd,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse after promise", roundResponse);
          setRoundInfo(roundResponse);
        });
      });
    }

    return () => {
      socket.off("promise made");
    };
  }, []);

  return (
    <div className="container-fluid" style={{width: "100vw", height: "100vh"}}>
      <div className="row">
        <div className="col-10">
          <CardBoard gameInfo={gameInfo} roundInfo={roundInfo} />
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
