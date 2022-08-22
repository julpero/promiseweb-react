import React from "react";
import { ProgressBar } from "react-bootstrap";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import {
  getAnimateCard,
} from "../../store/animateCardSlice";


import { renderCardSlots } from "../../common/playingGame";
import { IuiGetRoundResponse, IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";

type AlignType = "left" | "right";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  roundInfo: IuiGetRoundResponse,
  maxCards: number,
  align?: AlignType,
}

const OtherPlayer = ({ index, maxCards, align }: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const animateCard = useSelector(getAnimateCard);
  if (!currentRoundInfo.gameId) return null;
  console.log(currentRoundInfo);

  const getMyPosition = (): number => {
    return currentRoundInfo.roundToPlayer.players.findIndex(player => player.thisIsMe);
  };

  const playerFromIndex = (): IuiRoundPlayer => {
    const myPosition = getMyPosition();
    const playerCount = currentRoundInfo.roundToPlayer.players.length;
    let retIndex = myPosition + index;
    if (retIndex >= playerCount) retIndex = retIndex - playerCount;
    return currentRoundInfo.roundToPlayer.players[retIndex];
  };
  const player = playerFromIndex();
  const playedHitsCount = currentRoundInfo.roundToPlayer.players.reduce((count, player) => {
    return count + player.keeps;
  }, 0);
  const cardsRemainingCount = currentRoundInfo.roundToPlayer.cardsInRound - playedHitsCount - (player.cardPlayed ? 1 : 0);

  const renderCardsRow = () => {
    if (index === 0) return null;
    return (
      <div className="row">
        {renderCardSlots(player.name, maxCards, currentRoundInfo, [], cardsRemainingCount)}
      </div>
    );
  };

  const renderPromise = () => {
    return (player.promise && player.promise >= 0) ? player.promise : "";
  };

  const renderKeepProgress = () => {
    const max = maxCards;
    const keeps = player.keeps;
    const promise = player.promise ?? 0;
    if (keeps === promise) {
      return (
        <ProgressBar>
          <ProgressBar variant="success" now={keeps} max={max} />
        </ProgressBar>
      );
    } else if (keeps < promise) {
      return (
        <ProgressBar>
          <ProgressBar variant="success" now={keeps} max={max} key={1} />
          <ProgressBar variant="warning" now={promise - keeps} max={max} key={2} />
        </ProgressBar>
      );
    } else {
      return (
        <ProgressBar>
          <ProgressBar variant="success" now={promise} max={max} key={1} />
          <ProgressBar variant="danger" now={keeps - promise} max={max} key={2} />
        </ProgressBar>
      );
    }
  };

  const renderCardsWonCols = () => {
    const cols: JSX.Element[] = [];
    for (let i = 0; i < maxCards; i++) {
      if (i + 1 <= player.keeps) {
        cols.push(
          <div key={i} className={`col cardCol ${i === 0 ? "firstCardCol" : "cardWonCol"}`}>
            <CardSlot containerId={`cardsWonSlots${index}X${i}`} card={null} />
          </div>
        );
      } else {
        cols.push(<div id={`cardsWonSlots${index}X${i}`} key={i} className={`col cardCol ${i === 0 ? "firstCardCol" : "cardWonCol"}`}></div>);
      }
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
    let springObject = null;
    if (player.cardPlayed && animateCard) {
      const playedFrom = document.getElementById(`cardsToPlaySlotsX${player.name}X${currentRoundInfo.roundToPlayer.cardsInRound-playedHitsCount}`)?.getBoundingClientRect();
      const playedTo = document.getElementById(`cardPlayedDivX${player.name}`)?.getBoundingClientRect();
      // in refresh these are undefined so no animations and that's ok
      if (animateCard && playedFrom && playedTo) {
        const fromX = playedFrom.left - playedTo.left;
        const fromY = playedFrom.top - playedTo.top;
        springObject = {from: {x: fromX, y: fromY}, duration: 3000};
        console.log("springObject", springObject);
      }
    }
    return (
      <CardSlot
        containerId={`cardPlayedDivX${player.name}`}
        card={player.cardPlayed ?? undefined}
        classStr="playedCardCol"
        springObject={springObject}
      />
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
          k: {player.keeps}
        </div>
        <div className="col-4 progressInfoCol">
          {renderKeepProgress()}
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
