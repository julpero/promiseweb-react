import React from "react";
import { socket, SocketContext } from "../socket";
import Loader from "./Loader";
import GameItem from "./GameItem";
import { IGameListItem, IGetGameListRequest, IGetGameListResponse } from "../interfaces/IGameList";

interface IProps {
  isFetching: boolean,
  gameItemList: IGameListItem[],
}

class OpenGamesList extends React.Component<IProps, {}> {
  static socket = SocketContext;
  myId: string = window.localStorage.getItem('uUID') ?? "";

  renderGameItems = () => {
    return this.props.gameItemList.map(({id, rules, humanPlayers, imInTheGame}: IGameListItem) => {
      return(
        <GameItem
          id={id}
          rules={rules}
          humanPlayers={humanPlayers}
          imInTheGame={imInTheGame}
        />
      );
    }
  )};

  render() {
    if (this.props.isFetching) {
      return <Loader />
    } else {
      return (
        <React.Fragment>
          <div>{this.renderGameItems()}</div>
          <div>gameItemList { JSON.stringify(this.props.gameItemList) }</div>
        </React.Fragment>
      )
    }
  }
}

export default OpenGamesList;
