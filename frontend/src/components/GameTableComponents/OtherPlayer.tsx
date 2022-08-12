import React from "react";
import { IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";

interface IProps {
  player: IuiRoundPlayer,
  colCount: number,
}

class OtherPlayer extends React.Component<IProps> {

  render() {
    const { colCount } = this.props;
    return (
      <div className={`col-${colCount}`}>
        OtherPlayer
      </div>
    );
  }
}

export default OtherPlayer;
