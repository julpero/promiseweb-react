import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoundInfo,
} from "../../store/roundInfoSlice";

import { cardAsString, randomNegToPos } from "../../common/commonFunctions";
import { IuiCard, IuiGetRoundResponse, IuiRoundPlayer, ROUND_PHASE } from "../../interfaces/IuiPlayingGame";
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
}

const CardSlots = ({player, slotCount, cards, playedSlot}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const dispatch = useDispatch();

  if (!currentRoundInfo.gameId) return null;

  const name = player.name;

  const playedHitsCount = currentRoundInfo.roundToPlayer.players.reduce((count, player) => {
    return count + player.keeps;
  }, 0);

  let cardsRemainingCount = player.thisIsMe ? 0 : currentRoundInfo.roundToPlayer.cardsInRound - playedHitsCount;
  if (player.cardPlayed) cardsRemainingCount--;

  const cardPlayable = (i: number, roundInfo: IuiGetRoundResponse): CARD_PLAYABLE => {
    if (roundInfo.roundToPlayer.isMyTurn) {
      return roundInfo.roundToPlayer.playableCards.some(ind => ind === roundInfo.roundToPlayer.myCards.findIndex(card => card.originalIndex === i))
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

  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    const openFaceCard = cards.find(card => card.originalIndex === i && card.originalIndex !== playedSlot);
    const cardToRender = openFaceCard ?? (cards.length == 0 && i < cardsRemainingCount ? null : undefined);
    const classStrArr: string[] = [];
    if (i === 0) classStrArr.push("firstCardCol");
    if (i === slotCount-1) classStrArr.push("lastCardCol");

    if (cardToRender === undefined) {
      // just empty slot
      slots.push(
        <AnimatedCardSlot
          key={i}
          containerId={`cardsToPlaySlotsX${name}X${i}`}
          classStr={classStrArr.join(" ")}
          animationObject={commonAnimationObject()}
        />
      );
    } else {
      // correct card or null
      const canPlayThisCard = cardPlayable(i, currentRoundInfo);
      const cardFace = getCardFace(cardAsString(cardToRender ?? { rank: "0", suite: "dummy", value: 0 }), canPlayThisCard);
      if (canPlayThisCard === CARD_PLAYABLE.ok) classStrArr.push("playableCard");
      slots.push(
        <AnimatedCardSlot
          key={i}
          containerId={`cardsToPlaySlotsX${name}X${i}`}
          classStr={classStrArr.join(" ")}
          animationObject={commonAnimationObject()}
          onPlayCard={
            () => playCard(canPlayThisCard === CARD_PLAYABLE.ok ? cardToRender : null)
          }
        >
          {cardFace}
        </AnimatedCardSlot>
      );
    }
  }

  return (
    <React.Fragment>
      {slots}
    </React.Fragment>
  );
};

export default CardSlots;
