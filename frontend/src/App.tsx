import React from "react";
import { socket, SocketContext } from "./socket";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./screens/HomeScreen";
import GameTable from "./screens/GameTable";

import { CHECK_GAME_STATUS, ICheckGameRequest, ICheckGameResponse } from "./interfaces/ICheckGame";

interface IState {
  gameStatus: CHECK_GAME_STATUS,
  gameId: string | null,
}

class App extends React.Component<Record<string, never>, IState> {
  state: IState = {
    gameStatus: CHECK_GAME_STATUS.noGame,
    gameId: null,
  };

  componentDidMount() {
    if (window.localStorage.getItem("uUID")) {
      console.log("has uUid:", window.localStorage.getItem("uUID"));
    } else {
      const uuid = uuidv4();
      console.log("uUID set: ", uuid);
      window.localStorage.setItem("uUID", uuid);
    }
    const checkGameRequest: ICheckGameRequest = {
      myId: window.localStorage.getItem("uUID") ?? "",
    };

    socket.emit("check ongoing game", checkGameRequest, (response: ICheckGameResponse) => {
      console.log("check response", response);
      this.setState({gameStatus: response.checkStatus, gameId: response.gameId});
    });
  }

  static socket = SocketContext;

  render(): React.ReactNode {
    console.log("app...");

    switch (this.state.gameStatus) {
      case CHECK_GAME_STATUS.onGoingGame:
        return <GameTable />;
      default:
        return <HomeScreen />;
    }
  }
}

export default App;
