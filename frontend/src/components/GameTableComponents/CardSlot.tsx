import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { cardAsString, cardToString } from "../../common/commonFunctions";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

interface IProps {
  card?: IuiCard | null,
  cardPlayStatus?: CARD_PLAYABLE,
  classStr?: string,
}

const CardSlot = ({card, cardPlayStatus, classStr}: IProps) => {
  if (card === undefined) {
    return <div className="col cardCol"></div>;
  } else {
    const renderCard = card ?? { rank: "0", suite: "dummy", value: 0 } as IuiCard;
    return (
      <React.Fragment>
        <div className={`col cardCol ${classStr}`}>
          <div>
            { getCardFace(cardAsString(renderCard), cardPlayStatus ?? CARD_PLAYABLE.ok) }
          </div>
          {/* { cardToString(renderCard) } */}
        </div>
      </React.Fragment>
    );
  }
};

export default CardSlot;
