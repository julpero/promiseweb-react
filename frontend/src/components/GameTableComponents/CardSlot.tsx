import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { cardAsString, cardToString } from "../../common/commonFunctions";
import getCardFace from "./Cards";

interface IProps {
  card?: IuiCard | null,
}

const CardSlot = (props: IProps) => {
  const { card } = props;
  if (card === undefined) {
    return <div className="col"></div>;
  } else {
    const renderCard = card ?? { rank: "0 d", suite: "dummy", value: 0 } as IuiCard;
    return (
      <React.Fragment>
        <div className="col cardCol">
          { cardToString(renderCard) }
        </div>
        { getCardFace(cardAsString(renderCard)) }
      </React.Fragment>
    );
  }
};

export default CardSlot;
