import React from "react";
import { renderCardSlots } from "../../common/playingGame";
import { IuiGetGameInfoResponse, IuiGetRoundResponse } from "../../interfaces/IuiPlayingGame";
import PromiseButtons from "./PromiseButtons";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
}

const OwnPlayer = (props: IProps) => {
  const { gameInfo, roundInfo } = props;

  return (
    <React.Fragment>
      <div className="row">
        {renderCardSlots(10, roundInfo.roundToPlayer.myCards)}
      </div>
      <PromiseButtons
        gameId={roundInfo.gameId}
        roundInd={roundInfo.roundInd}
        cardsInRound={roundInfo.roundToPlayer.cardsInRound}
        myTurn={roundInfo.roundToPlayer.isMyPromiseTurn}
      />
    </React.Fragment>
  );
};

export default OwnPlayer;
