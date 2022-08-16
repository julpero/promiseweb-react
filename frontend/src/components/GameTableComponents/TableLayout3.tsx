import React from "react";
import { IuiGetGameInfoResponse, IuiGetRoundResponse, IuiRoundPlayer, IuiRoundToPlayer } from "../../interfaces/IuiPlayingGame";
import OtherPlayer from "./OtherPlayer";
import OwnPlayer from "./OwnPlayer";
import TrumpSlot from "./TrumpSlot";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
}

const TableLayout3 = (props: IProps) => {
  const getMyPosition = (): number => {
    return props.roundInfo.roundToPlayer.players.findIndex(player => player.thisIsMe);
  };

  const getPlayerToIndex = (ind: number): IuiRoundPlayer => {
    const myPosition = getMyPosition();
    const playerCount = props.gameInfo.humanPlayersCount;
    let retIndex = myPosition + ind;
    if (retIndex >= playerCount) retIndex = retIndex - playerCount;
    return props.roundInfo.roundToPlayer.players[retIndex];
  };

  const { gameInfo, roundInfo } = props;
  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-5">
            <OtherPlayer
              index={1}
              player={getPlayerToIndex(1)}
              maxCards={10}
            />
          </div>
          <div className="col-2">
            <TrumpSlot trump={roundInfo.roundToPlayer.trumpCard} />
          </div>
          <div className="col-5">
            <OtherPlayer
              index={2}
              player={getPlayerToIndex(2)}
              maxCards={10}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-2 myPlayedCard">MyPlayedCard</div>
          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col-3">
            <OtherPlayer
              index={0}
              player={getPlayerToIndex(0)}
              maxCards={10}
            />
          </div>
          <div className="col-9">
            <OwnPlayer
              gameInfo={gameInfo}
              roundInfo={roundInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout3;
