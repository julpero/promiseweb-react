import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import { IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import { cardAsString } from "../../common/commonFunctions";
import CardSlots from "./CardSlots";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { playerFromIndex } from "../../common/playingGame";
import PlayerInfo from "./PlayerInfo";

type AlignType = "left" | "right";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  maxCards: number,
  align?: AlignType,
}

const OtherPlayer = ({ index, maxCards, align }: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const player: IuiRoundPlayer = playerFromIndex(currentRoundInfo, index);
  console.log("currentRoundInfo, player", player);


  // if (animateCard && animateCard.fromPlayer === player.name) cardsRemainingCount--;

  const renderCardsRow = () => {
    if (index === 0) return null;
    return (
      <div className="row otherPlayerCardSlots">
        <CardSlots
          player={player}
          slotCount={maxCards}
          cards={[]}
        />
      </div>
    );
  };


  const renderCardsWonCols = () => {
    const cols: JSX.Element[] = [];
    for (let i = 0; i < maxCards; i++) {
      if (i + 1 <= player.keeps) {
        const cardFace = getCardFace("backSide", CARD_PLAYABLE.ok);
        const animationObject = commonAnimationObject();
        cols.push(
          <div key={i} className={`col cardCol ${i === 0 ? "firstCardCol" : "cardWonCol"}`}>
            <AnimatedCardSlot
              containerId={`cardsWonSlotsX${player.name}X${i}`}
              animationObject={animationObject}
            >
              {cardFace}
            </AnimatedCardSlot>
          </div>
        );
      } else {
        cols.push(
          <div id={`cardsWonSlotsX${player.name}X${i}`} key={i} className={`col cardCol ${i === 0 ? "firstCardCol" : "cardWonCol"}`}></div>
        );
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
    const cardFace = cardPlayedCard ? getCardFace(cardAsString(cardPlayedCard), CARD_PLAYABLE.played) : undefined;
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
        <div className="row otherPlayerWonRow">
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
        <div className="row otherPlayerWonRow">
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

  return (
    <React.Fragment>
      <PlayerInfo index={index} maxCards={maxCards} />
      {renderCardsRow()}
      {renderStatsAndCardPlayedAndWonRow()}
    </React.Fragment>
  );
};

export default OtherPlayer;
