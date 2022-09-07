import React, { CSSProperties } from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import { CARD_ALIGN_TYPE, IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import CardSlots from "./CardSlots";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { playerFromIndex } from "../../common/playingGame";
import PlayerInfo from "./PlayerInfo";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  maxCards: number,
  align: CARD_ALIGN_TYPE,
  styleProps?: CSSProperties,
  oneRow?: boolean,
}

const OtherPlayer = ({ index, maxCards, align, styleProps, oneRow }: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const player: IuiRoundPlayer = playerFromIndex(currentRoundInfo, index);
  console.log("OtherPlayer, player", player);

  const renderCardsRow = () => {
    if (index === 0) return null;
    return (
      <div className="otherPlayerCardSlots">
        <CardSlots
          player={player}
          slotCount={maxCards}
          cards={[]}
          align={align}
        />
      </div>
    );
  };

  const cardWonSlotStyle = (ind: number): CSSProperties => {
    if (align === CARD_ALIGN_TYPE.right) {
      return {right: `${ind * 8}%`};
    } else {
      return {left: `${ind * 8}%`};
    }
  };

  const renderCardsWonCols = () => {
    const cols: JSX.Element[] = [];
    for (let i = 0; i < maxCards; i++) {
      if (i + 1 <= player.keeps) {
        const cardFace = getCardFace("backSide", CARD_PLAYABLE.ok);
        const animationObject = commonAnimationObject();
        cols.push(
          <div
            key={i}
            className={`col cardWonCol ${i === 0 ? "firstCardCol" : ""}`}
            style={cardWonSlotStyle(i)}
          >
            <AnimatedCardSlot
              containerId={`cardsWonSlotsX${player.name}X${i}`}
              animationObject={animationObject}
              isSmall={currentRoundInfo.roundToPlayer.players.length === 6}
            >
              {cardFace}
            </AnimatedCardSlot>
          </div>
        );
      } else {
        cols.push(
          <div
            id={`cardsWonSlotsX${player.name}X${i}`}
            key={i}
            className={`cardWonCol ${i === 0 ? "firstCardCol" : ""}`}
            style={cardWonSlotStyle(i)}
          />
        );
      }
    }
    return cols;
  };

  if (oneRow) {
    if (align === CARD_ALIGN_TYPE.left) {
      return (
        <div className="playerInfoDiv" style={styleProps}>
          <PlayerInfo index={index} />
          <div style={{position: "absolute", width: "70%", right: "5%"}}>
            {renderCardsRow()}
          </div>
          <div style={{position: "absolute", width: "70%", left: "3%"}}>
            {renderCardsWonCols()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="playerInfoDiv" style={styleProps}>
          <PlayerInfo index={index} />
          <div style={{position: "absolute", width: "70%", left: "5%"}}>
            {renderCardsRow()}
          </div>
          <div style={{position: "absolute", width: "70%", right: "3%"}}>
            {renderCardsWonCols()}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="playerInfoDiv" style={styleProps}>
        <PlayerInfo index={index} />
        {renderCardsRow()}
        <div style={{height: "122px"}}>
          {renderCardsWonCols()}
        </div>
      </div>
    );
  }

};

export default OtherPlayer;
