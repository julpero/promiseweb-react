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
  const [animationObject, setAnimationObject] = useState(commonAnimationObject(true));
  const currentRoundInfo = useSelector(getCurrentRoundInfo);

  useEffect(() => {
    setTrump(currentRoundInfo.roundToPlayer.trumpCard);
  }, [currentRoundInfo]);

  useEffect(() => {
    if (trump) {
      setCardFace(getCardFace(cardAsString(trump), CARD_PLAYABLE.played));
    }
  }, [trump]);

  useEffect(() => {
    if (cardFace) {
      setAnimationObject(commonAnimationObject(true));
    }
  }, [cardFace]);

  const renderOverDeck = () => {
    const overCards: JSX.Element[] = [];
    const overCardFace = getCardFace("backSide", CARD_PLAYABLE.played);
    const overDeckSize = 52 - 1 - currentRoundInfo.roundToPlayer.cardsInRound * currentRoundInfo.roundToPlayer.players.length;
    for (let i = 0; i < overDeckSize; i++) {
      overCards.push(
        <AnimatedCardSlot
          key={i}
          containerId={`overDeckSlotX${i}`}
          classStr="stackedCards"
          animationObject={commonAnimationObject()}
          isStacked={true}
        >
          {overCardFace}
        </AnimatedCardSlot>
      );
    }
    return overCards;
  };

  if (!cardFace) return null;
  return (
    <React.Fragment>
      {renderOverDeck()}
      <AnimatedCardSlot
        containerId="trumpCardDiv"
        classStr="trumpCardCol"
        animationObject={animationObject}
      >
        {cardFace}
      </AnimatedCardSlot>
    </React.Fragment>
  );
};

export default TrumpSlot;
