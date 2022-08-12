import React from "react";
import { IuiGetGameInfoResponse, IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";
import TableLayout3 from "./GameTableComponents/TableLayout3";

interface IProps {
  gameInfo: IuiGetGameInfoResponse | null,
  roundInfo: IuiGetRoundResponse | null,
}

/**
 * Cardboard, where the all fun happens
 */
class CardBoard extends React.Component<IProps> {
  render() {
    const { gameInfo, roundInfo } = this.props;
    if (!gameInfo || !roundInfo) return null;

    switch (gameInfo.humanPlayersCount) {
      case 3: {
        return (
          <TableLayout3
            roundInfo={roundInfo}
            gameInfo={gameInfo}
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
  }
}

export default CardBoard;
