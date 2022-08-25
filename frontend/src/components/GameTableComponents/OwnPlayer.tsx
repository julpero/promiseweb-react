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
      </div>
      <PromiseButtons />
    </React.Fragment>
  );
};

export default OwnPlayer;
