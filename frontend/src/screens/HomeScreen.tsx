import React from "react";
import { socket, SocketContext } from "../socket";
import Accordion from "react-bootstrap/Accordion";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";
import { IGameListItem, IGetGameListRequest, IGetGameListResponse } from "../interfaces/IGameList";

interface IState {
  selectedAccordion: string,
  gameItemList: IGameListItem[],
  isFetching: boolean,
}

class HomeScreen extends React.Component<{}, IState> {
  state: Readonly<IState> = {
    selectedAccordion: "",
    gameItemList: [],
    isFetching: false,
  };

  static socket = SocketContext;

  accRef: any;

  constructor(props: any) {
    super(props);
    this.accRef = React.createRef();
  }

  componentDidMount() {
    this.fetchGameItemList();
    socket.on("new game created", (id) => {
      console.log("new game id", id);
    });
  }

  getMyId = (): string => window.localStorage.getItem('uUID') ?? "";

  fetchGameItemList = () => {
    this.setState({ isFetching: true });
    const gameListRequest: IGetGameListRequest = { myId: this.getMyId() };
    socket.emit("get games", gameListRequest, (gameList: IGetGameListResponse) => {
      console.log("gameList", gameList);
      this.setState({ gameItemList: gameList.games, isFetching: false });
    });
  }

  handleGameCreation = () => {
    this.setState({selectedAccordion: "0", isFetching: true });
    this.accRef.current.firstElementChild.click();
    this.fetchGameItemList();
  }

  render() {
    return(
      <div className="container-fluid">
        <Accordion>
          <Accordion.Item eventKey="0" onSelect={() => this.setState({selectedAccordion: "0"})}>
            <Accordion.Header ref={this.accRef}>Open Games</Accordion.Header>
            <Accordion.Body>
              <OpenGamesList gameItemList={this.state.gameItemList} isFetching={this.state.isFetching} />
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
