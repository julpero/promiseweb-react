import React from "react";
import { renderCardSlots } from "../../common/playingGame";
import { IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";

type AlignType = "left" | "right";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  player: IuiRoundPlayer,
  maxCards: number,
  align?: AlignType,
}

const OtherPlayer = ({ index, player, maxCards, align }: IProps) => {
  const renderCardsRow = () => {
    if (index === 0) return null;
    return (
      <div className="row">
        {renderCardSlots(maxCards, [])}
      </div>
    );
  };

  const renderPromise = () => {
    return (player.promise && player.promise >= 0) ? player.promise : "";
  };

  const renderCardsWonCols = () => {
    const cols: JSX.Element[] = [];
    for (let i = 0; i < maxCards; i++) {
      cols.push(<div className="col cardCol"></div>);
    }
    return cols;
  };

  const renderCardsWonRow = () => {
    return (
      <div className="row cardsWonRow">
        {renderCardsWonCols()}
      </div>
    );
  };

  const renderCardPlayedCol = () => {
    if (index === 0 || index === 5) return null;
    return (
      <div className="col cardCol playedCardCol">&nbsp;</div>
    );
  };

  const renderStatsCol = () => {
    return (
      <div className="col playerStatsCol">
        <div className="row handValueRow">
          <div className="col handValueCol">
            HV
          </div>
        </div>
        <div className="row statsRoe2">
          <div className="col statsCol2">
            S1
          </div>
        </div>
        <div className="row statsRow3">
          <div className="col statsCol3">
            S2
          </div>
        </div>
      </div>
    );
  };

  const renderCardPlayedRow = () => {
    if (align === "left") {
      return (
        <div className="row">
          {renderStatsCol()}
          {renderCardPlayedCol()}
        </div>
      );
    }
    if (align === "right") {
      return (
        <div className="row">
          {renderCardPlayedCol()}
          {renderStatsCol()}
        </div>
      );
    }
  };

  const renderStatsAndCardPlayedAndWonRow = () => {
    if (align === "left") {
      return (
        <div className="row">
          <div className="col">
            {renderCardsWonRow()}
          </div>
          <div className="col">
            {renderCardPlayedRow()}
          </div>
        </div>
      );
    }
    if (align === "right") {
      return (
        <div className="row">
          <div className="col">
            {renderCardPlayedRow()}
          </div>
          <div className="col">
            {renderCardsWonRow()}
          </div>
        </div>
      );
    }
  };

  const renderPlayerInfoRow = () => {
    return (
      <div className="row playerInfoRow">
        <div className="col-3 nameCol playerNameCol">
          {player.name}
        </div>
        <div className="col-3 playerInfoCol">
          {renderPromise()}
        </div>
        <div className="col-2 playerInfoCol">
          {player.keeps}
        </div>
        <div className="col-4 progressInfoCol">
          {player.keeps}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {renderPlayerInfoRow()}
      {renderCardsRow()}
      {renderStatsAndCardPlayedAndWonRow()}
    </React.Fragment>
  );
};

export default OtherPlayer;
