import React, { CSSProperties } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoundInfo,
} from "../../store/roundInfoSlice";

import { cardAsString } from "../../common/commonFunctions";
import { CARD_ALIGN_TYPE, IuiCard, IuiGetRoundResponse, IuiRoundPlayer, IuiRoundToPlayer, ROUND_PHASE } from "../../interfaces/IuiPlayingGame";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { setPlayedCard } from "../../store/playCardSlice";
import { setActionsAvailable } from "../../store/actionsAvailableSlice";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";

interface IProps {
  player: IuiRoundPlayer,
  slotCount: number,
  cards: IuiCard[],
  // cardsRemainingCount: number,
  playedSlot?: number,
  align?: CARD_ALIGN_TYPE,
}

const CardSlots = ({player, slotCount, cards, playedSlot, align}: IProps) => {
  const currentRoundInfo: IuiGetRoundResponse = useSelector(getCurrentRoundInfo);
  const dispatch = useDispatch();
  console.log("CardSlots");

  if (!currentRoundInfo.gameId) return null;

  const name = player.name;

  const playedHitsCount = currentRoundInfo.roundToPlayer.players.reduce((count, player) => {
    return count + player.keeps;
  }, 0);

  let cardsRemainingCount = player.thisIsMe ? 0 : currentRoundInfo.roundToPlayer.cardsInRound - playedHitsCount;
  if (player.cardPlayed) cardsRemainingCount--;

  const cardPlayable = (i: number, roundToPlayer: IuiRoundToPlayer): CARD_PLAYABLE => {
    if (roundToPlayer.isMyTurn && roundToPlayer.roundPhase === ROUND_PHASE.onPlay) {
      return roundToPlayer.playableCards.some(ind => ind === roundToPlayer.myCards.findIndex(card => card.originalIndex === i))
        ? CARD_PLAYABLE.ok
        : CARD_PLAYABLE.notAllowed;
    } else {
      return CARD_PLAYABLE.notMyTurn;
    }
  };

  const playCard = (card: IuiCard | null): void => {
    if (card) {
      console.log("play card (reducer)", card);
      dispatch(setPlayedCard(card));
      dispatch(setActionsAvailable(false));
    }
  };

  const cardSlotStyle = (ind: number): CSSProperties => {
    if (player.thisIsMe) {
      return {left: `${ind * 78}px`};
    } else {
      if (align === CARD_ALIGN_TYPE.right) {
        return {left: `${ind * 9}%`};
      } else {
        return {right: `${ind * 9}%`};
      }
    }
  };

  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    const openFaceCard = cards.find(card => card.originalIndex === i && card.originalIndex !== playedSlot);
    const cardToRender = openFaceCard ?? (cards.length == 0 && i < cardsRemainingCount ? null : undefined);
    const classStrArr: string[] = [];

    if (cardToRender === undefined) {
      // just empty slot
      slots.push(
        <div key={i} className="animatedCardPlayedSlot" style={cardSlotStyle(i)}>
          <AnimatedCardSlot
            containerId={`cardsToPlaySlotsX${name}X${i}`}
            classStr={classStrArr.join(" ")}
            animationObject={commonAnimationObject()}
            isSmall={currentRoundInfo.roundToPlayer.players.length === 6}
          />
        </div>
      );
    } else {
      // correct card or null
      const canPlayThisCard = cardPlayable(i, currentRoundInfo.roundToPlayer);
      const cardAsStr = cardAsString(cardToRender ?? { rank: "0", suite: "dummy", value: 0 });
      const cardFace = getCardFace(cardAsStr, canPlayThisCard);
      if (canPlayThisCard === CARD_PLAYABLE.ok) classStrArr.push("playableCard");
      slots.push(
        <div key={i} className="animatedCardPlayedSlot" style={cardSlotStyle(i)}>
          <AnimatedCardSlot
            containerId={`cardsToPlaySlotsX${name}X${i}`}
            classStr={classStrArr.join(" ")}
            animationObject={commonAnimationObject()}
            onPlayCard={
              () => playCard(canPlayThisCard === CARD_PLAYABLE.ok ? cardToRender : null)
            }
            isSmall={currentRoundInfo.roundToPlayer.players.length === 6 && !player.thisIsMe}
          >
            {cardFace}
          </AnimatedCardSlot>
        </div>
      );
    }
  }

  return (
    <div className="cardsRow">
      {slots}
    </div>
  );
};

export default CardSlots;
