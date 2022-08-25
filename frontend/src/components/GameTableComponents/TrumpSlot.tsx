import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cardAsString } from "../../common/commonFunctions";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

const TrumpSlot = () => {
  const [trump, setTrump] = useState<IuiCard | null>(null);
  const [cardFace, setCardFace] = useState<JSX.Element | undefined>(undefined);
  const [animationObject, setAnimationObject] = useState(commonAnimationObject());
  const currentRoundInfo = useSelector(getCurrentRoundInfo);

  useEffect(() => {
    setTrump(currentRoundInfo.roundToPlayer.trumpCard);
  }, [currentRoundInfo]);
  useEffect(() => {
    if (trump) {
      setCardFace(getCardFace(cardAsString(trump), CARD_PLAYABLE.ok));
    }
  }, [trump]);
  useEffect(() => {
    if (cardFace) {
      setAnimationObject(commonAnimationObject());
    }
  }, [cardFace]);

  if (!cardFace) return null;
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
