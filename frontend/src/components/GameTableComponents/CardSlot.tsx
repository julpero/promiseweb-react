import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import { cardToString } from "../../common/commonFunctions";

interface IProps {
  card?: IuiCard | null,
}

function CardSlot (props: IProps) {
  const { card } = props;
  if (card === undefined) {
    return <div className="col"></div>;
  } else {
    const renderCard = card ?? { rank: "0 d", suite: "dummy", value: 0 } as IuiCard;
    return (
      <div className="col cardCol">
        { cardToString(renderCard) }
      </div>
    );
  }
}

export default CardSlot;
