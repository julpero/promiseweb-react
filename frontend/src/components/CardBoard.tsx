import React from "react";

import { useSelector } from "react-redux";
import { getCurrentGameInfo } from "../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

import TableLayout3 from "./GameTableComponents/TableLayout3";

/**
 * Cardboard, where the all fun happens
 */
const CardBoard = () => {
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentGameInfo || !currentRoundInfo) return null;
  console.log("CardBoard");

  switch (currentGameInfo.humanPlayersCount) {
    case 3: {
      return (
        <TableLayout3 />
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

export default CardBoard;
