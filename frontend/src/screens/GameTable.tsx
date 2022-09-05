import React from "react";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import EffectHandler from "../components/EffectHandler";
import GameMenu from "../components/GameMenu";

interface IProps {
  gameId: string,
}

const GameTable = ({gameId}: IProps) => {
  console.log("GameTable");

  return (
    <div className="container-fluid" style={{width: "100vw", height: "100vh", zIndex: 999}}>
      <div className="row cardBoardTopRow">
        <div className="col-10">
          <CardBoard />
        </div>
        <div className="col-2">
          <ScoreBoard />
        </div>
      </div>
      <div className="row fixed-bottom" style={{height: "220px", margin: "0px 0px", zIndex: 1}}>
        <div className="col-6">
          <PromiseTable />
        </div>
        <div className="col-4" style={{zIndex: 1}}>
          <Chat />
        </div>
        <div className="col-2">
          <GameMenu />
        </div>
      </div>
      <EffectHandler gameId={gameId} />
    </div>
  );
};

export default GameTable;
