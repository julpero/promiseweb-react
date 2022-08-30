import React, { createRef } from "react";
// import { socket, SocketContext } from "../socket";
import Accordion from "react-bootstrap/Accordion";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";

const HomeScreen = () => {
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
      </Accordion>
    </div>
  );
};

export default HomeScreen;
