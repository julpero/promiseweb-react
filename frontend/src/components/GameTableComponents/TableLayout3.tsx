import React from "react";
import { IuiCard, IuiGetGameInfoResponse, IuiGetRoundResponse } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";
import OtherPlayer from "./OtherPlayer";
import OwnPlayer from "./OwnPlayer";
import TrumpSlot from "./TrumpSlot";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
  onPlayCard: (card: IuiCard) => void,
}

const TableLayout3 = ({ gameInfo, roundInfo, onPlayCard }: IProps) => {
  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-5 playerTable">
            <OtherPlayer
              index={1}
              roundInfo={roundInfo}
              maxCards={10}
              align="left"
            />
          </div>
          <div className="col-2">
            <TrumpSlot trump={roundInfo.roundToPlayer.trumpCard} />
          </div>
          <div className="col-5 playerTable">
            <OtherPlayer
              index={2}
              roundInfo={roundInfo}
              maxCards={10}
              align="right"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-2 cardCol myPlayedCard">
            <CardSlot
              card={roundInfo.roundToPlayer.myPlayedCard ?? undefined}
            />
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col-3">
            <OtherPlayer
              index={0}
              roundInfo={roundInfo}
              maxCards={10}
            />
          </div>
          <div className="col-9">
            <OwnPlayer
              gameInfo={gameInfo}
              roundInfo={roundInfo}
              onPlayCard={onPlayCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout3;
