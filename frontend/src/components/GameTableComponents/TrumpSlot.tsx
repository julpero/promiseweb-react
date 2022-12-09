import React, { CSSProperties, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cardAsString } from "../../common/commonFunctions";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { IuiAnimationTimes, IuiCard } from "../../interfaces/IuiPlayingGame";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

interface IProps {
  styleProps?: CSSProperties,
  animationTimes: IuiAnimationTimes,
}

const TrumpSlot = ({styleProps, animationTimes}: IProps) => {
  const [trump, setTrump] = useState<IuiCard | null>(null);
  const [cardFace, setCardFace] = useState<JSX.Element | undefined>(undefined);
  const [animationObject, setAnimationObject] = useState(commonAnimationObject(true));
  const currentRoundInfo = useSelector(getCurrentRoundInfo);

  useEffect(() => {
    setTrump(currentRoundInfo.roundToPlayer.trumpCard);
  }, [currentRoundInfo]);

  useEffect(() => {
    const cardStr = trump ? cardAsString(trump): "backSide";
    setCardFace(getCardFace(cardStr, CARD_PLAYABLE.played));
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
          animationTimes={animationTimes}
        >
          {overCardFace}
        </AnimatedCardSlot>
      );
    }
    return overCards;
  };

  if (!cardFace) return null;
  return (
    <div className="trumpCardSlotDiv" style={styleProps}>
      {renderOverDeck()}
      <AnimatedCardSlot
        containerId="trumpCardDiv"
        classStr="trumpCardCol"
        animationObject={animationObject}
        animationTimes={animationTimes}
      >
        {cardFace}
      </AnimatedCardSlot>
    </div>
  );
};

export default TrumpSlot;
