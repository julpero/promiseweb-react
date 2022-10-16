import React from "react";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import EffectHandler from "../components/EffectHandler";
import GameMenu from "../components/GameMenu";

const GameTable = () => {
  // console.log("GameTable");

  return (
    <div id="gameTableContainer">
      <CardBoard />
      <ScoreBoard />
      <PromiseTable />
      <Chat />
      <GameMenu />
      <EffectHandler  />
    </div>
  );
};

export default GameTable;
