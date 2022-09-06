import React, { CSSProperties } from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import PromiseButtons from "./PromiseButtons";
import CardSlots from "./CardSlots";

interface IProps {
  maxCards: number,
  styleProps?: CSSProperties,
}

const OwnPlayer = ({maxCards, styleProps}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const me = currentRoundInfo.roundToPlayer.players.find(player => player.thisIsMe);
  if (!me) return null;

  return (
    <div className="ownCardsDiv" style={styleProps}>
      <CardSlots
        player={me}
        slotCount={maxCards}
        cards={currentRoundInfo.roundToPlayer.myCards}
      />
      <PromiseButtons />
    </div>
  );
};

export default OwnPlayer;
