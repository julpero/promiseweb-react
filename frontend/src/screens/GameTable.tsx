import React from "react";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import EffectHandler from "../components/EffectHandler";

interface IProps {
  gameId: string,
}

const GameTable = ({gameId}: IProps) => {
  console.log("GameTable");

  return (
    <div className="container-fluid" style={{width: "100vw", height: "100vh"}}>
      <div className="row" style={{paddingTop: "5px"}}>
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
        </div>
      </div>
      <EffectHandler gameId={gameId} />
    </div>
  );
};

export default GameTable;
