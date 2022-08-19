import React from "react";
import { useSpring, animated } from "react-spring";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { cardAsString, cardToString, randomNegToPos } from "../../common/commonFunctions";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

interface IProps {
  card?: IuiCard | null,
  cardPlayStatus?: CARD_PLAYABLE,
  classStr?: string,
  isTrump?: boolean,
  onPlayCard?: (card: IuiCard) => void,
}

const CardSlot = ({card, cardPlayStatus, classStr, isTrump, onPlayCard}: IProps) => {
  if (card === undefined) {
    return <div className="col cardCol"></div>;
  } else {
    const props = useSpring({
      to: { x: randomNegToPos(2), y: randomNegToPos(2), rotate: randomNegToPos(5) },
      // from: { x: 0, y: 0, rotate: 0 },
    });
    // const { x, y } = useSpring({ x: 0, y: 0 })

    if (card === null || isTrump) {
      const renderCard = card ?? { rank: "0", suite: "dummy", value: 0 } as IuiCard;
      // these are card back sides
      return (
        <React.Fragment>
          <div className={`col cardCol ${classStr}`}>
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
            <div className={`col cardCol ${classStr}`}>
              <animated.div style={props} onClick={() => onPlayCard(card)}>
                { getCardFace(cardAsString(card), CARD_PLAYABLE.ok) }
              </animated.div>
              {/* { cardToString(renderCard) } */}
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className={`col cardCol ${classStr}`}>
              <animated.div style={props}>
                { getCardFace(cardAsString(card), cardPlayStatus ?? CARD_PLAYABLE.ok) }
              </animated.div>
              {/* { cardToString(renderCard) } */}
            </div>
          </React.Fragment>
        );
      }
    }
  }
};

export default CardSlot;
