import React from "react";
import { useSpring, animated } from "react-spring";

import { useSelector, useDispatch } from "react-redux";
import {
  setPlayedCard,
} from "../../store/playCardSlice";
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
  const dispatch = useDispatch();

  const playCard = (card: IuiCard): void => {
    console.log("play card (reducer)", card);
    dispatch(setPlayedCard(card));
    dispatch(setActionsAvailable(false));
  };

  // const springs = { ...springObject, to: { x: randomNegToPos(2), y: randomNegToPos(2), rotate: randomNegToPos(5) }};
  const springs = springObject ?? { to: { x: randomNegToPos(2), y: randomNegToPos(2), rotate: randomNegToPos(5) }};
  const props = useSpring(springs);
  // console.log("springs", springs, card);

  if (card === undefined) {
    return <div id={containerId} className="col cardCol"></div>;
  } else {
    if (card === null || isTrump) {
      const renderCard = card ?? { rank: "0", suite: "dummy", value: 0 } as IuiCard;
      // these are card back sides
      return (
        <div id={containerId} className={`col cardCol ${classStr ?? ""}`}>
          <animated.div style={props}>
            { getCardFace(cardAsString(renderCard), CARD_PLAYABLE.ok) }
          </animated.div>
          {/* { cardToString(renderCard) } */}
        </div>
      );
    } else {
      if (cardPlayStatus === CARD_PLAYABLE.ok && onPlayCard !== undefined && actionsAvailable) {
        return (
          <div id={containerId} className={`col cardCol playableCard ${classStr ?? ""}`}>
            <animated.div style={props} onClick={() => playCard(card)}>
              { getCardFace(cardAsString(card), CARD_PLAYABLE.ok) }
            </animated.div>
            {/* { cardToString(card) } */}
          </div>
        );
      } else {
        return (
          <div id={containerId} className={`col cardCol ${classStr ?? ""}`}>
            <animated.div
              style={props}

            >
              { getCardFace(cardAsString(card), cardPlayStatus ?? CARD_PLAYABLE.ok) }
            </animated.div>
            {/* { cardToString(card) } */}
          </div>
        );
      }
    }
  }
};

export default CardSlot;
