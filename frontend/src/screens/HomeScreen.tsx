import React from "react";
import { socket, SocketContext } from "../socket";
import Accordion from "react-bootstrap/Accordion";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";

interface IState {
  selectedAccordion: string,
}

class HomeScreen extends React.Component<{}, IState> {
  state: Readonly<IState> = {
    selectedAccordion: "",
  };

  static socket = SocketContext;

  accRef: any;
  constructor(props: any) {
    super(props);
    this.accRef = React.createRef();
  }

  handleGameCreation = () => {
    this.setState({selectedAccordion: "0"});
    this.accRef.current.firstElementChild.click();
  }

  render() {
    return(
      <div className="container-fluid">
        <Accordion>
          <Accordion.Item eventKey="0" onSelect={() => this.setState({selectedAccordion: "0"})}>
            <Accordion.Header ref={this.accRef}>Open Games</Accordion.Header>
            <Accordion.Body>
              <OpenGamesList />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" onSelect={() => this.setState({selectedAccordion: "1"})}>
            <Accordion.Header>Create New Game</Accordion.Header>
            <Accordion.Body><CreateGame onCreateGame={this.handleGameCreation} /></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

export default HomeScreen;
