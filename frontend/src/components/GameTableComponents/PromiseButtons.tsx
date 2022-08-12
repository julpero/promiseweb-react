import React from "react";
import { socket, SocketContext } from "../../socket";
import { Button } from "react-bootstrap";
import { IuiMakePromiseRequest, IuiMakePromiseResponse } from "../../interfaces/IuiPlayingGame";

interface IProps {
  gameId: string,
  roundInd: number,
  cardsInRound: number,
  myTurn: boolean,
}

interface IState {
  clicked: boolean,
}

class PromiseButtons extends React.Component<IProps, IState> {
  state: IState = {
    clicked: false,
  };

  static socket = SocketContext;
  getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  doPromise = (promise: number) => {
    this.setState({clicked: true});
    const promiseRequest: IuiMakePromiseRequest = {
      gameId: this.props.gameId,
      roundInd: this.props.roundInd,
      myId: this.getMyId(),
      promise: promise,
      isSpeedPromise: false,
    };
    socket.emit("make promise", promiseRequest, (promiseResponse: IuiMakePromiseResponse) => {
      console.log("promiseResponse", promiseResponse);
      this.setState({clicked: false});
    });
  };

  renderPromiseButtons = (): JSX.Element[] => {
    const {cardsInRound, myTurn} = this.props;
    const buttons: JSX.Element[] = [];
    buttons.push(<div key={0} className="col"><Button onClick={() => this.doPromise(0)} disabled={!myTurn || this.state.clicked}>0</Button></div>);
    for (let i = 1; i <= cardsInRound; i++) {
      buttons.push(<div key={i} className="col"><Button onClick={() => this.doPromise(i)} disabled={!myTurn || this.state.clicked}>{i}</Button></div>);
    }
    return buttons;
  };

  render() {
    return (
      <div className="row">
        {this.renderPromiseButtons()}
      </div>
    );
  }
}

export default PromiseButtons;
