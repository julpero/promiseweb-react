import React from "react";
import { Modal } from "react-bootstrap";

import { useSelector } from "react-redux";
import { getCurrentGameInfo } from "../store/gameInfoSlice";
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
  if (!currentGameInfo || !currentRoundInfo) return null;
  console.log("CardBoard");

  const getTableLayout = (playerCount: number) => {
    switch (playerCount) {
      case 3: {
        return (
          <TableLayout3 />
        );
      }
      case 4: {
        return (
          <TableLayout4 />
        );
      }
      case 5: {
        return (
          <TableLayout5 />
        );
      }
      case 6: {
        return (
          <TableLayout6 />
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
        <Modal.Header closeButton>
          <Modal.Title>
          Game Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OneGameReport gameId={currentGameInfo.gameId} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardBoard;
