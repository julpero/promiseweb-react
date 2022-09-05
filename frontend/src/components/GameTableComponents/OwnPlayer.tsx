import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import PromiseButtons from "./PromiseButtons";
import CardSlots from "./CardSlots";

interface IProps {
  maxCards: number,
}

const OwnPlayer = ({maxCards}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const me = currentRoundInfo.roundToPlayer.players.find(player => player.thisIsMe);
  if (!me) return null;

  return (
    <React.Fragment>
      <div className="row">
        <CardSlots
          player={me}
          slotCount={maxCards}
          cards={currentRoundInfo.roundToPlayer.myCards}
        />
      </div>
      <PromiseButtons />
    </React.Fragment>
  );
};

export default OwnPlayer;
