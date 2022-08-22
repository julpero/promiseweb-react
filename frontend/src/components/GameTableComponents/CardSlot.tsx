import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

import { useSelector, useDispatch } from "react-redux";
import {
  setPlayedCard,
} from "../../store/playCardSlice";
import {
  setAnimateCard,
  getAnimateCard,
} from "../../store/animateCardSlice";
import {
  setActionsAvailable,
  isActionsAvailable,
} from "../../store/actionsAvailableSlice";

import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { cardAsString, cardToString, randomNegToPos } from "../../common/commonFunctions";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

interface IProps {
  containerId: string,
  card?: IuiCard | null,
  cardPlayStatus?: CARD_PLAYABLE,
  classStr?: string,
  isTrump?: boolean,
  onPlayCard?: (card: IuiCard) => void,
  springObject?: any,
}

const CardSlot = ({containerId, card, cardPlayStatus, classStr, isTrump, onPlayCard, springObject}: IProps) => {
  const actionsAvailable = useSelector(isActionsAvailable);
  const animateCard = useSelector(getAnimateCard);
  const dispatch = useDispatch();

  const playCard = (card: IuiCard): void => {
    console.log("play card (reducer)", card);
    dispatch(setPlayedCard(card));
    dispatch(setActionsAvailable(false));
  };

  useEffect(() => {
    if (animateCard && containerId === `cardPlayedDivX${animateCard.fromPlayer}`) {
      console.log("ANIMATE ME!", animateCard);
      const playedFrom = document.getElementById(`cardsToPlaySlotsX${animateCard.fromPlayer}X${animateCard.fromSlot}`)?.getBoundingClientRect();
      const playedTo = document.getElementById(`cardPlayedDivX${animateCard.fromPlayer}`)?.getBoundingClientRect();
      console.log("CardSlot playedFrom", playedFrom);
      console.log("CardSlot playedTo", playedTo);

    }
  }, [containerId, animateCard]);

  const springs = { ...springObject, to: { x: randomNegToPos(2), y: randomNegToPos(2), rotate: randomNegToPos(5) }, onRest: () => {dispatch(setActionsAvailable(true));dispatch(setAnimateCard(null));}};
  const props = useSpring(springs);

  if (card === undefined) {
    return <div id={containerId} className="col cardCol"></div>;
  } else {

    if (card === null || isTrump) {
      const renderCard = card ?? { rank: "0", suite: "dummy", value: 0 } as IuiCard;
      // these are card back sides
      return (
        <React.Fragment>
          <div id={containerId} className={`col cardCol ${classStr ?? ""}`}>
            <animated.div style={props}>
              { getCardFace(cardAsString(renderCard), CARD_PLAYABLE.ok) }
            </animated.div>
            {/* { cardToString(renderCard) } */}
          </div>
        </React.Fragment>
      );
    } else {
      console.log("springs", springs);
      if (cardPlayStatus === CARD_PLAYABLE.ok && onPlayCard !== undefined && actionsAvailable) {
        return (
          <React.Fragment>
            <div id={containerId} className={`col cardCol playableCard ${classStr ?? ""}`}>
              <animated.div style={props} onClick={() => playCard(card)}>
                { getCardFace(cardAsString(card), CARD_PLAYABLE.ok) }
              </animated.div>
              {/* { cardToString(card) } */}
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div id={containerId} className={`col cardCol ${classStr ?? ""}`}>
              <animated.div
                style={props}

              >
                { getCardFace(cardAsString(card), cardPlayStatus ?? CARD_PLAYABLE.ok) }
              </animated.div>
              {/* { cardToString(card) } */}
            </div>
          </React.Fragment>
        );
      }
    }
  }
};

export default CardSlot;
