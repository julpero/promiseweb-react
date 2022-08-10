import React from "react";
import { socket, SocketContext } from "../socket";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IGetRoundRequest, IGetRoundResponse } from "../interfaces/IPlayingGame";

interface IProps {
  gameId: string,
}

class GameTable extends React.Component<IProps> {
  componentDidMount() {
    console.log("gametable did mount, gameId", this.props.gameId);
    if (this.props.gameId !== "") {
      const getRoundRequest: IGetRoundRequest = {
        myId: this.getMyId(),
        gameId: this.props.gameId,
        round: -1,
      };

      socket.emit("get round", getRoundRequest, (roundResponse: IGetRoundResponse) => {
        console.log("roundResponse", roundResponse);
      });
    }
  }
  getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  static socket = SocketContext;


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
