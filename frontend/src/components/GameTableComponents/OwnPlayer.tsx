import React from "react";
import { amILastPromiser, currentTotalPromise, renderCardSlots } from "../../common/playingGame";
import { IuiGetGameInfoResponse, IuiGetRoundResponse } from "../../interfaces/IuiPlayingGame";
import PromiseButtons from "./PromiseButtons";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
}

const OwnPlayer = (props: IProps) => {
  const { gameInfo, roundInfo } = props;

  const disableButton = (): number => {
    // this handles also hidden promise round rule because then total promise is negative
    if (amILastPromiser(roundInfo.roundToPlayer.players)) {
      const totalPromise = currentTotalPromise(roundInfo.roundToPlayer.players);
      return roundInfo.roundToPlayer.cardsInRound - totalPromise;
    }
    return -1;
  };

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
        disableButton={disableButton()}
      />
    </React.Fragment>
  );
};

export default OwnPlayer;
