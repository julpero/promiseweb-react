import React from "react";
import { renderCardSlots } from "../../common/playingGame";
import { IuiCard, IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  player: IuiRoundPlayer,
  maxCards: number,
}

class OtherPlayer extends React.Component<IProps> {

  renderCards = () => {
    const { index, player, maxCards } = this.props;
    if (index === 0) return null;
    return (
      <div className="row">
        {renderCardSlots(maxCards)}
      </div>
    );
  };

  render() {
    const { index, player, maxCards } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3 nameCol playerNameCol">
            {player.name}
          </div>
          <div className="col-3 playerInfoCol">
            {player.promise}
          </div>
          <div className="col-2 playerInfoCol">
            {player.keeps}
          </div>
          <div className="col-4 progressInfoCol">
            {player.keeps}
          </div>
        </div>
        {this.renderCards()}
      </React.Fragment>
    );
  }
}

export default OtherPlayer;
