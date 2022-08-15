import React from "react";
import { renderCardSlots } from "../../common/playingGame";
import { IuiGetGameInfoResponse, IuiGetRoundResponse } from "../../interfaces/IuiPlayingGame";
import PromiseButtons from "./PromiseButtons";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
}

class OwnPlayer extends React.Component<IProps> {
  render() {
    const { gameInfo, roundInfo } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          {renderCardSlots(10, roundInfo.roundToPlayer.myCards)}
        </div>
        <div className="row">
          <PromiseButtons
            gameId={roundInfo.gameId}
            roundInd={roundInfo.roundInd}
            cardsInRound={roundInfo.roundToPlayer.cardsInRound}
            myTurn={roundInfo.roundToPlayer.isMyPromiseTurn}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default OwnPlayer;
