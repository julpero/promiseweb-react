import React, { CSSProperties, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameInfo } from "../../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import { useSocket } from "../../socket";
import { Button } from "react-bootstrap";
import { IuiMakePromiseRequest, IuiMakePromiseResponse, IuiRoundPlayer, PROMISE_RESPONSE } from "../../interfaces/IuiPlayingGame";
import { isRuleActive } from "../../common/commonFunctions";
import { currentTotalPromise } from "../../common/playingGame";
import { RULE } from "../../interfaces/IuiGameOptions";
import { getUser } from "../../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../../common/userFunctions";

const PromiseButtons = () => {
  const [clicked, setClicked] = useState(false);
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const user = useSelector(getUser);
  const { gameId, roundInd } = currentRoundInfo;
  const { cardsInRound, isMyPromiseTurn } = currentRoundInfo.roundToPlayer;

  const dispatch = useDispatch();

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
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const promiseButtonStyle = (ind: number): CSSProperties => {
    return {left: `${ind * 72}px`};
  };

  const doPromise = (promise: number) => {
    if (user.isUserLoggedIn) {
      if (promise === disabledButton) return;
      setClicked(true);
      const promiseRequest: IuiMakePromiseRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: gameId,
        roundInd: roundInd,
        promise: promise,
        isSpeedPromise: false,
      };
      socket.emit("make promise", promiseRequest, (promiseResponse: IuiMakePromiseResponse) => {
        // console.log("promiseResponse", promiseResponse);
        if (promiseResponse.isAuthenticated) {
          handleAuthenticatedRequest(promiseResponse.token);
          if (promiseResponse.promiseResponse !== PROMISE_RESPONSE.promiseOk) {
            setClicked(false);
          }
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const renderPromiseButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
    for (let i = 0; i <= cardsInRound; i++) {
      buttons.push(
        <div key={i} className="promiseButton" style={promiseButtonStyle(i)}>
          <Button onClick={() => doPromise(i)} disabled={!isMyPromiseTurn || clicked || disabledButton === i}>
            {i}
          </Button>
        </div>
      );
    }
    for (let i = cardsInRound + 1; i <= 10; i++) {
      buttons.push(
        <div key={i} className="promiseButton" style={promiseButtonStyle(i)}>
          &nbsp;
        </div>
      );
    }
    return buttons;
  };

  if (!isMyPromiseTurn) return null;
  return (
    <div className="promiseButtonRow">
      {renderPromiseButtons()}
    </div>
  );
};

export default PromiseButtons;
