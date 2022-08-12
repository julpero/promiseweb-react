import React from "react";
import { IuiGetGameInfoResponse, IuiGetRoundResponse, IuiRoundPlayer, IuiRoundToPlayer } from "../../interfaces/IuiPlayingGame";
import OtherPlayer from "./OtherPlayer";

interface IProps {
  gameInfo: IuiGetGameInfoResponse,
  roundInfo: IuiGetRoundResponse,
}

class TableLayout3 extends React.Component<IProps> {
  getPlayerToIndex = (ind: number): IuiRoundPlayer => {
    return this.props.roundInfo.roundToPlayer.players[ind];
  };

  render() {
    const { gameInfo, roundInfo } = this.props;
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <OtherPlayer
              player={this.getPlayerToIndex(1)}
              colCount={5}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TableLayout3;
