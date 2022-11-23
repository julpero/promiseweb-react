import React from "react";
import { Button, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { ANIMATION_TIMES, DEBUG_ANIMATION_TIMES, IuiAnimationTimes } from "../interfaces/IuiPlayingGame";
import { getCurrentGameInfo, setGameId } from "../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

import TableLayout3 from "./GameTableComponents/TableLayout3";
import TableLayout4 from "./GameTableComponents/TableLayout4";
import TableLayout5 from "./GameTableComponents/TableLayout5";
import TableLayout6 from "./GameTableComponents/TableLayout6";
import OneGameReport from "./OneGameReport";

/**
 * Cardboard, where the all fun happens
 */
const CardBoard = () => {
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const dispatch = useDispatch();
  if (!currentGameInfo.gameId || !currentRoundInfo.gameId) return null;
  // console.log("CardBoard");

  const animationTimes: IuiAnimationTimes = currentGameInfo.thisIsDemoGame ? DEBUG_ANIMATION_TIMES : ANIMATION_TIMES;

  const closeReportModal = () => {
    dispatch(setGameId(""));
  };

  const getTableLayout = (playerCount: number) => {
    switch (playerCount) {
      case 3: {
        return (
          <TableLayout3 animationTimes={animationTimes} />
        );
      }
      case 4: {
        return (
          <TableLayout4 animationTimes={animationTimes} />
        );
      }
      case 5: {
        return (
          <TableLayout5 animationTimes={animationTimes} />
        );
      }
      case 6: {
        return (
          <TableLayout6 animationTimes={animationTimes} />
        );
      }
      default: {
        return (
          <div>
            CardBoard
          </div>
        );
      }
    }
  };

  return (
    <div id="cardboardArea">
      {getTableLayout(currentGameInfo.humanPlayersCount)}
      <Modal
        show={currentRoundInfo.roundToPlayer.gameOver}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>
          Game Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OneGameReport gameId={currentGameInfo.gameId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => closeReportModal()}>Close Report and Game</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardBoard;
