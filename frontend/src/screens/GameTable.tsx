import React, { useEffect, useState } from "react";
import { useSocket } from "../socket";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";

interface IProps {
  gameId: string,
}

function GameTable (props: IProps) {
  const [gameInfo, setGameInfo] = useState<IuiGetGameInfoResponse | null>(null);
  const [roundInfo, setRoundInfo] = useState<IuiGetRoundResponse | null>(null);

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  useEffect(() => {
    console.log("gametable did mount, gameId", props.gameId);
    if (props.gameId !== "") {
      const getGameInfoRequest: IuiGetGameInfoRequest = {
        myId: getMyId(),
        gameId: props.gameId,
      };
      socket.emit("check game", getGameInfoRequest, (gameInfo: IuiGetGameInfoResponse) => {
        console.log("gameInfo", gameInfo);

        const getRoundRequest: IuiGetRoundRequest = {
          myId: getMyId(),
          gameId: props.gameId,
          roundInd: gameInfo.currentRound ?? 0,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse", roundResponse);
          setGameInfo(gameInfo);
          setRoundInfo(roundInfo);
        });
      });
    }
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
          buttons and menu
        </div>
      </div>
    </div>
  );
}

export default GameTable;
