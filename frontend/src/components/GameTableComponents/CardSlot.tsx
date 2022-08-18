import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { cardAsString, cardToString } from "../../common/commonFunctions";
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
    if (card === null || isTrump) {
      const renderCard = card ?? { rank: "0", suite: "dummy", value: 0 } as IuiCard;
      // these are card back sides
      return (
        <React.Fragment>
          <div className={`col cardCol ${classStr}`}>
            <div>
              { getCardFace(cardAsString(renderCard), CARD_PLAYABLE.ok) }
            </div>
            {/* { cardToString(renderCard) } */}
          </div>
        </React.Fragment>
      );
    } else {
      if (cardPlayStatus === CARD_PLAYABLE.ok && onPlayCard !== undefined) {
        return (
          <React.Fragment>
            <div className={`col cardCol ${classStr}`}>
              <div onClick={() => onPlayCard(card)}>
                { getCardFace(cardAsString(card), CARD_PLAYABLE.ok) }
              </div>
              {/* { cardToString(renderCard) } */}
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className={`col cardCol ${classStr}`}>
              <div>
                { getCardFace(cardAsString(card), cardPlayStatus ?? CARD_PLAYABLE.ok) }
              </div>
              {/* { cardToString(renderCard) } */}
            </div>
          </React.Fragment>
        );
      }
    }
  }
};

export default CardSlot;
