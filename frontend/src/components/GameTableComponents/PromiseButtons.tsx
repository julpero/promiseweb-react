import React, { useState } from "react";
import { useSocket } from "../../socket";
import { Button } from "react-bootstrap";
import { IuiMakePromiseRequest, IuiMakePromiseResponse } from "../../interfaces/IuiPlayingGame";

interface IProps {
  gameId: string,
  roundInd: number,
  cardsInRound: number,
  myTurn: boolean,
}

const PromiseButtons = (props: IProps) => {
  const [clicked, setClicked] = useState(false);
  const {cardsInRound, myTurn} = props;

  const { socket } = useSocket();
  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  const doPromise = (promise: number) => {
    setClicked(true);
    const promiseRequest: IuiMakePromiseRequest = {
      gameId: props.gameId,
      roundInd: props.roundInd,
      myId: getMyId(),
      promise: promise,
      isSpeedPromise: false,
    };
    socket.emit("make promise", promiseRequest, (promiseResponse: IuiMakePromiseResponse) => {
      console.log("promiseResponse", promiseResponse);
      setClicked(false);
    });
  };

  const renderPromiseButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
    for (let i = 0; i <= cardsInRound; i++) {
      buttons.push(<div key={i} className="col"><Button onClick={() => doPromise(i)} disabled={!myTurn || clicked}>{i}</Button></div>);
    }
    for (let i = cardsInRound + 1; i <= 10; i++) {
      buttons.push(<div key={i} className="col">&nbsp;</div>);
    }
    return buttons;
  };

  if (!myTurn) return null;
  return (
    <div className="row">
      {renderPromiseButtons()}
    </div>
  );
};

export default PromiseButtons;
