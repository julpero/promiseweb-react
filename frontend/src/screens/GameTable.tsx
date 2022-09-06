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
    <div id="gameTableContainer">
      <CardBoard />
      <ScoreBoard />
      <PromiseTable />
      <Chat />
      <GameMenu />
      <EffectHandler gameId={gameId} />
    </div>
  );
};

export default GameTable;
