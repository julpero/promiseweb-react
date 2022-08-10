import React from "react";
import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

class GameTable extends React.Component {

  render() {
    return (
      <div style={{width: "100vw", height: "100vh"}}>
        <div>
          <PromiseTable />
        </div>
        <div>
          <ScoreBoard />
        </div>
        <div>
          <CardBoard />
        </div>
        <div>
          <Chat />
        </div>
      </div>
    );
  }
}

export default GameTable;
