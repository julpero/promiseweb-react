import React from "react";
import { useSelector } from "react-redux";
import { cardAsString, commonAnimationObject } from "../../common/commonFunctions";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

const TrumpSlot = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo) return null;
  const trump = currentRoundInfo.roundToPlayer.trumpCard;
  const cardFace = trump ? getCardFace(cardAsString(trump), CARD_PLAYABLE.ok) : undefined;
  const animationObject = cardFace ? commonAnimationObject() : null;
  return (
    <AnimatedCardSlot
      containerId="trumpCardDiv"
      classStr="trumpCardCol"
      animationObject={animationObject}
    >
      {cardFace}
    </AnimatedCardSlot>
  );
};

export default TrumpSlot;
