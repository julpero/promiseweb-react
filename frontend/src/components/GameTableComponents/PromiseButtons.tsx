import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { getCurrentGameInfo } from "../../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import { useSocket } from "../../socket";
import { Button } from "react-bootstrap";
import { IuiMakePromiseRequest, IuiMakePromiseResponse, IuiRoundPlayer, PROMISE_RESPONSE } from "../../interfaces/IuiPlayingGame";
import { isRuleActive } from "../../common/commonFunctions";
import { currentTotalPromise } from "../../common/playingGame";
import { RULE } from "../../interfaces/IuiGameOptions";

const PromiseButtons = () => {
  const [clicked, setClicked] = useState(false);
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const { gameId, roundInd } = currentRoundInfo;
  const { cardsInRound, isMyPromiseTurn } = currentRoundInfo.roundToPlayer;

  const { socket } = useSocket();

  useEffect(() => {
    setClicked(false);
  }, [currentRoundInfo]);

  if (!currentRoundInfo.gameId) return null;

  const amILastPromiser = (players: IuiRoundPlayer[]): boolean => {
    return players.length - players.filter(player => player.promise !== null).length === 1;
  };

  const disableButton = (): number => {
    // this handles also hidden promise round rule because then total promise is negative
    if (isRuleActive(currentGameInfo.rules, RULE.noEvenPromisesAllowed) && amILastPromiser(currentRoundInfo.roundToPlayer.players)) {
      const totalPromise = currentTotalPromise(currentRoundInfo.roundToPlayer.players);
      return currentRoundInfo.roundToPlayer.cardsInRound - totalPromise;
    }
    return -1;
  };


  const disabledButton = disableButton();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  const doPromise = (promise: number) => {
    if (promise === disabledButton) return;
    setClicked(true);
    const promiseRequest: IuiMakePromiseRequest = {
      gameId: gameId,
      roundInd: roundInd,
      myId: getMyId(),
      promise: promise,
      isSpeedPromise: false,
    };
    socket.emit("make promise", promiseRequest, (promiseResponse: IuiMakePromiseResponse) => {
      console.log("promiseResponse", promiseResponse);
      if (promiseResponse.promiseResponse !== PROMISE_RESPONSE.promiseOk) {
        setClicked(false);
      }
    });
  };

  const renderPromiseButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
    for (let i = 0; i <= cardsInRound; i++) {
      buttons.push(
        <div key={i} className="col promiseButton">
          <Button onClick={() => doPromise(i)} disabled={!isMyPromiseTurn || clicked || disabledButton === i}>
            {i}
          </Button>
        </div>
      );
    }
    for (let i = cardsInRound + 1; i <= 10; i++) {
      buttons.push(<div key={i} className="col">&nbsp;</div>);
    }
    return buttons;
  };

  if (!isMyPromiseTurn) return null;
  return (
    <div className="row">
      {renderPromiseButtons()}
    </div>
  );
};

export default PromiseButtons;
