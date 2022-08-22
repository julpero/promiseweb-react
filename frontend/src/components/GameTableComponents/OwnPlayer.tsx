import React, { useEffect } from "react";
import { isRuleActive } from "../../common/commonFunctions";
import { amILastPromiser, currentTotalPromise, renderCardSlots } from "../../common/playingGame";
import { RULE } from "../../interfaces/IuiGameOptions";
import { IuiCard, IuiGetGameInfoResponse, IuiGetRoundResponse } from "../../interfaces/IuiPlayingGame";
import PromiseButtons from "./PromiseButtons";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
  onPlayCard: (card: IuiCard) => void,
}

const OwnPlayer = ({ gameInfo, roundInfo, onPlayCard }: IProps) => {
  useEffect(() => {
    console.log("in ownplayer, roundinfo", roundInfo);
  }, [roundInfo]);

  const disableButton = (): number => {
    // this handles also hidden promise round rule because then total promise is negative
    if (isRuleActive(gameInfo.rules, RULE.noEvenPromisesAllowed) && amILastPromiser(roundInfo.roundToPlayer.players)) {
      const totalPromise = currentTotalPromise(roundInfo.roundToPlayer.players);
      return roundInfo.roundToPlayer.cardsInRound - totalPromise;
    }
    return -1;
  };

  return (
    <React.Fragment>
      <div className="row">
        {renderCardSlots(roundInfo.myName, 10, roundInfo, roundInfo.roundToPlayer.myCards, 0, onPlayCard)}
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
