import React from "react";
import { socket, SocketContext } from "../socket";

import CardBoard from "../components/CardBoard";
import Chat from "../components/Chat";
import PromiseTable from "../components/PromiseTable";
import ScoreBoard from "../components/ScoreBoard";

import { IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";

interface IProps {
  gameId: string,
}

interface IState {
  gameInfo: IuiGetGameInfoResponse | null,
  roundInfo: IuiGetRoundResponse | null,
}

class GameTable extends React.Component<IProps, IState> {
  state: IState = {
    gameInfo: null,
    roundInfo: null,
  };
  componentDidMount() {
    console.log("gametable did mount, gameId", this.props.gameId);
    if (this.props.gameId !== "") {
      const getGameInfoRequest: IuiGetGameInfoRequest = {
        myId: this.getMyId(),
        gameId: this.props.gameId,
      };
      socket.emit("check game", getGameInfoRequest, (gameInfo: IuiGetGameInfoResponse) => {
        console.log("gameInfo", gameInfo);

        const getRoundRequest: IuiGetRoundRequest = {
          myId: this.getMyId(),
          gameId: this.props.gameId,
          round: gameInfo.currentRound ?? 0,
        };

        socket.emit("get round", getRoundRequest, (roundResponse: IuiGetRoundResponse) => {
          console.log("roundResponse", roundResponse);
          this.setState({gameInfo: gameInfo, roundInfo: roundResponse});
        });
      });
    }
  }
  getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  static socket = SocketContext;


  render() {
    return (
      <div style={{width: "100vw", height: "100vh"}}>
        <div>
          <PromiseTable roundInfo={this.state.roundInfo} />
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
