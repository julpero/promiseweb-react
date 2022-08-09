import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { socket, SocketContext } from "./socket";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./screens/HomeScreen";
import GameTable from "./screens/GameTable";

import { ICheckGameRequest, ICheckGameResponse } from "./interfaces/ICheckGame";

class App extends React.Component {
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
    });
  }

  static socket = SocketContext;

  render(): React.ReactNode {
    console.log("app...");

    return (
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route index element={<HomeScreen />} />
              <Route path="/gametable" element={<GameTable />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SocketContext.Provider>
    );
  }
}

export default App;
