import React from "react";

import { useSelector } from "react-redux";
import { getCurrentGameInfo } from "../../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import { getAnimateCard } from "../../store/animateCardSlice";

import { isRuleActive } from "../../common/commonFunctions";
import { amILastPromiser, currentTotalPromise, renderCardSlots } from "../../common/playingGame";
import { RULE } from "../../interfaces/IuiGameOptions";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import PromiseButtons from "./PromiseButtons";

interface IProps {
  onPlayCard: (card: IuiCard) => void,
}

const OwnPlayer = ({ onPlayCard }: IProps) => {
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const animateCard = useSelector(getAnimateCard);

  const disableButton = (): number => {
    // this handles also hidden promise round rule because then total promise is negative
    if (isRuleActive(currentGameInfo.rules, RULE.noEvenPromisesAllowed) && amILastPromiser(currentRoundInfo.roundToPlayer.players)) {
      const totalPromise = currentTotalPromise(currentRoundInfo.roundToPlayer.players);
      return currentRoundInfo.roundToPlayer.cardsInRound - totalPromise;
    }
    return -1;
  };

  return (
    <React.Fragment>
      <div className="row">
        {renderCardSlots(currentRoundInfo.myName, 10, currentRoundInfo, currentRoundInfo.roundToPlayer.myCards, 0, onPlayCard, (animateCard?.fromPlayer === currentRoundInfo.myName) ? animateCard.fromSlot : -1)}
      </div>
      <PromiseButtons
        gameId={currentRoundInfo.gameId}
        roundInd={currentRoundInfo.roundInd}
        cardsInRound={currentRoundInfo.roundToPlayer.cardsInRound}
        myTurn={currentRoundInfo.roundToPlayer.isMyPromiseTurn}
        disableButton={disableButton()}
      />
    </React.Fragment>
  );
};

export default OwnPlayer;
