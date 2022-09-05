import React, { createRef } from "react";
// import { socket, SocketContext } from "../socket";
import Accordion from "react-bootstrap/Accordion";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";
import JoinGameById from "../components/JoinGameById";
import PlayedGamesReport from "../components/PlayedGamesReport";

interface IProps {
  onJoin: () => void,
}

const HomeScreen = ({onJoin}: IProps) => {
  const accRef = createRef<HTMLHeadingElement>();

  const handleGameCreation = () => {
    if (accRef.current?.firstElementChild) {
      (accRef.current.firstElementChild as HTMLButtonElement).click();
    }
  };

  return(
    <div className="container-fluid">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header ref={accRef}>Open Games</Accordion.Header>
          <Accordion.Body>
            <OpenGamesList />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Create New Game</Accordion.Header>
          <Accordion.Body>
            <CreateGame onCreateGame={handleGameCreation} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Join Game by Id</Accordion.Header>
          <Accordion.Body>
            <JoinGameById onJoin={onJoin} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <PlayedGamesReport />
    </div>
  );
};

export default HomeScreen;
