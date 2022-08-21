import React from "react";
import { useSpring, animated } from "react-spring";
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
  if (card === undefined) {
    return <div id={containerId} className="col cardCol"></div>;
  } else {
    const springs = { ...springObject, to: { x: randomNegToPos(2), y: randomNegToPos(2), rotate: randomNegToPos(5) }};
    console.log(springs);
    const props = useSpring(springs);
    // const { x, y } = useSpring({ x: 0, y: 0 })

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
      if (cardPlayStatus === CARD_PLAYABLE.ok && onPlayCard !== undefined) {
        return (
          <React.Fragment>
            <div id={containerId} className={`col cardCol playableCard ${classStr ?? ""}`}>
              <animated.div style={props} onClick={() => onPlayCard(card)}>
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
              <animated.div style={props}>
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
