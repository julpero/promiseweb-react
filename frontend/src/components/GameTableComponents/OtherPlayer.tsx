import React from "react";
import { ProgressBar } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import {
  setGetRoundInfo,
} from "../../store/getRoundInfoSlice";

import { IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";
import { easings } from "react-spring";
import { cardAsString, randomNegToPos } from "../../common/commonFunctions";
import CardSlots from "./CardSlots";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";

type AlignType = "left" | "right";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  maxCards: number,
  align?: AlignType,
}

const OtherPlayer = ({ index, maxCards, align }: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const dispatch = useDispatch();

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
  console.log("currentRoundInfo, player", player);

  if (!currentRoundInfo.gameId) return null;

  const playedHitsCount = currentRoundInfo.roundToPlayer.players.reduce((count, player) => {
    return count + player.keeps;
  }, 0);

  let cardsRemainingCount = currentRoundInfo.roundToPlayer.cardsInRound - playedHitsCount;
  if (player.cardPlayed) cardsRemainingCount--;
  // if (animateCard && animateCard.fromPlayer === player.name) cardsRemainingCount--;

  const renderCardsRow = () => {
    if (index === 0) return null;
    return (
      <div className="row">
        <CardSlots
          name={player.name}
          slotCount={maxCards}
          cards={[]}
          cardsRemainingCount={cardsRemainingCount}
        />
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
            <CardSlot containerId={`cardsWonSlotsX${player.name}X${i}`} card={null} />
          </div>
        );
      } else {
        cols.push(<div id={`cardsWonSlotsX${player.name}X${i}`} key={i} className={`col cardCol ${i === 0 ? "firstCardCol" : "cardWonCol"}`}></div>);
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

  const renderAnimatedCardPlayedSlot = () => {
    if (index === 0 || index === 5) return null;
    const cardPlayedCard = player.cardPlayed ?? undefined;
    const cardFace = cardPlayedCard ? getCardFace(cardAsString(cardPlayedCard), CARD_PLAYABLE.ok) : undefined;
    // const animationObject = cardFace ? commonAnimationObject() : plainAnimationObject;
    const animationObject = commonAnimationObject();
    return (
      <AnimatedCardSlot
        containerId={`cardPlayedDivX${player.name}`}
        classStr="playedCardCol"
        animationObject={animationObject}
      >
        {cardFace}
      </ AnimatedCardSlot>
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
          {renderAnimatedCardPlayedSlot()}
        </div>
      );
    }
    if (align === "right") {
      return (
        <div className="row">
          {renderAnimatedCardPlayedSlot()}
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
