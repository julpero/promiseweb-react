import React from "react";

import { useSelector } from "react-redux";
import { getCurrentGameInfo } from "../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

import { IuiCard } from "../interfaces/IuiPlayingGame";
import TableLayout3 from "./GameTableComponents/TableLayout3";

interface IProps {
  onPlayCard: (card: IuiCard) => void,
}

/**
 * Cardboard, where the all fun happens
 */
const CardBoard = ({ onPlayCard }: IProps) => {
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentGameInfo || !currentRoundInfo) return null;

  switch (currentGameInfo.humanPlayersCount) {
    case 3: {
      return (
        <TableLayout3
          onPlayCard={onPlayCard}
        />
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
