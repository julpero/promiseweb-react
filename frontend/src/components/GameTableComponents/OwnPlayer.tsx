import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import PromiseButtons from "./PromiseButtons";
import CardSlots from "./CardSlots";

const OwnPlayer = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);

  return (
    <React.Fragment>
      <div className="row">
        <CardSlots
          name={currentRoundInfo.myName}
          slotCount={10}
          cards={currentRoundInfo.roundToPlayer.myCards}
          cardsRemainingCount={0}
        />
        {/* {renderCardSlots(currentRoundInfo.myName, 10, currentRoundInfo, currentRoundInfo.roundToPlayer.myCards, 0, onPlayCard, (animateCard?.fromPlayer === currentRoundInfo.myName) ? animateCard.fromSlot : -1)} */}
      </div>
      <PromiseButtons />
    </React.Fragment>
  );
};

export default OwnPlayer;
