import React, { CSSProperties } from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import { CARD_ALIGN_TYPE, IuiAnimationTimes, IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import CardSlots from "./CardSlots";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { playerFromIndex } from "../../common/playingGame";
import PlayerInfo from "./PlayerInfo";
import { getUser } from "../../store/userSlice";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  maxCards: number,
  align: CARD_ALIGN_TYPE,
  styleProps?: CSSProperties,
  oneRow?: boolean,
  animationTimes: IuiAnimationTimes,
}

const OtherPlayer = ({ index, maxCards, align, styleProps, oneRow, animationTimes }: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const user = useSelector(getUser);

  if (!currentRoundInfo.gameId || !user.isUserLoggedIn) return null;
  const iAmObserver = currentRoundInfo.observers?.some(observer => observer.name === user.userName && !observer.waiting) ?? false;

  const player: IuiRoundPlayer = playerFromIndex(currentRoundInfo, index, iAmObserver);
  // console.log("OtherPlayer, player", player);

  const renderCardsRow = () => {
    if (index === 0) return null;
    return (
      <div className="otherPlayerCardSlots">
        <CardSlots
          player={player}
          slotCount={maxCards}
          cards={[]}
          align={align}
          animationTimes={animationTimes}
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
            className={`cardWonCol ${i === 0 ? "firstCardCol" : ""}`}
            style={cardWonSlotStyle(i)}
          >
            <AnimatedCardSlot
              containerId={`cardsWonSlotsX${player.name}X${i}`}
              animationObject={animationObject}
              animationTimes={animationTimes}
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
            {currentRoundInfo.roundToPlayer.handValues &&
              <div className="handValueContainerLeft">
                <div className="handValue">
                  HV: {currentRoundInfo.roundToPlayer.handValues.find(hv => hv.name === player.name)?.value}
                </div>
              </div>
            }
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
            {currentRoundInfo.roundToPlayer.handValues &&
              <div className="handValueContainerRight">
                <div className="handValue">
                  HV: {currentRoundInfo.roundToPlayer.handValues.find(hv => hv.name === player.name)?.value}
                </div>
              </div>
            }
          </div>
        </div>
      );
    }
  } else {
    const rowClassName = "wonCardsRow";
    const containerClassName = align === CARD_ALIGN_TYPE.left ? "handValueContainerLeft" : "handValueContainerRight";
    return (
      <div className="playerInfoDiv" style={styleProps}>
        <PlayerInfo index={index} />
        {renderCardsRow()}
        <div className={rowClassName}>
          {renderCardsWonCols()}
          {currentRoundInfo.roundToPlayer.handValues &&
            <div className={containerClassName}>
              <div className="handValue">
                HV: {currentRoundInfo.roundToPlayer.handValues.find(hv => hv.name === player.name)?.value}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

};

export default OtherPlayer;
