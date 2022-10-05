import React, { CSSProperties } from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import PromiseButtons from "./PromiseButtons";
import CardSlots from "./CardSlots";
import { getUser } from "../../store/userSlice";

interface IProps {
  maxCards: number,
  styleProps?: CSSProperties,
}

const OwnPlayer = ({maxCards, styleProps}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const user = useSelector(getUser);
  if (!currentRoundInfo.gameId || !user.isUserLoggedIn) return null;

  let me = currentRoundInfo.roundToPlayer.players.find(player => player.thisIsMe);
  if (!me) {
    const iAmObserver = currentRoundInfo.observers?.some(observer => observer.name === user.userName && !observer.waiting) ?? false;
    if (iAmObserver) {
      me = currentRoundInfo.roundToPlayer.players[0];
    }
  }

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
