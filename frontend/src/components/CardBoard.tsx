import React from "react";
import { IuiCard, IuiGetGameInfoResponse, IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";
import TableLayout3 from "./GameTableComponents/TableLayout3";

interface IProps {
  gameInfo: IuiGetGameInfoResponse | null,
  roundInfo: IuiGetRoundResponse | null,
  onPlayCard: (card: IuiCard) => void,
}

/**
 * Cardboard, where the all fun happens
 */
const CardBoard = ({ gameInfo, roundInfo, onPlayCard }: IProps) => {
  if (!gameInfo || !roundInfo) return null;

  switch (gameInfo.humanPlayersCount) {
    case 3: {
      return (
        <TableLayout3
          roundInfo={roundInfo}
          gameInfo={gameInfo}
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
