import React from "react";
import Accordion from "react-bootstrap/Accordion";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";

class HomeScreen extends React.Component {
  render(): React.ReactNode {
    return(
      <div className="container-fluid">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Open Games</Accordion.Header>
            <Accordion.Body><OpenGamesList /></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Create New Game</Accordion.Header>
            <Accordion.Body><CreateGame /></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

export default HomeScreen;
