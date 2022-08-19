import React from "react";
import { CARD_PLAYABLE } from "../components/GameTableComponents/Cards";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard, IuiGetRoundResponse, IuiRoundPlayer } from "../interfaces/IuiPlayingGame";

const cardPlayable = (i: number, roundInfo: IuiGetRoundResponse): CARD_PLAYABLE => {
  if (roundInfo.roundToPlayer.isMyTurn) {
    return roundInfo.roundToPlayer.playableCards.some(ind => ind === i)
      ? CARD_PLAYABLE.ok
      : CARD_PLAYABLE.notAllowed;
  } else {
    return CARD_PLAYABLE.notMyTurn;
  }
};

export const renderCardSlots = (slotCount: number, roundInfo: IuiGetRoundResponse, cards: IuiCard[], cardsPlayedCount: number, onPlayCard?: (card: IuiCard) => void): JSX.Element[] => {
  console.log(cards);
  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    // const card = i >= roundInfo.roundToPlayer.cardsInRound || (i >= cards.length && cards.length > 0) ? undefined : cards[i] ?? null;
    const openFaceCard = cards.find(card => card.originalIndex === i);
    const cardToRender = openFaceCard ?? (cards.length == 0 && i < cardsPlayedCount ? null : undefined);
    const classStrArr: string[] = [];
    if (i === 0) classStrArr.push("firstCardCol");
    if (i === slotCount-1) classStrArr.push("lastCardCol");

    if (cardToRender === undefined) {
      // just empty slot
      slots.push(<CardSlot key={i} classStr={classStrArr.join(" ")} />);
    } else {
      // correct card or null
      slots.push(
        <CardSlot
          key={i}
          cardPlayStatus={cardPlayable(i, roundInfo)}
          classStr={classStrArr.join(" ")}
          card={cardToRender}
          onPlayCard={onPlayCard}
        />
      );
    }
  }
  return slots;
};

export const amILastPromiser = (players: IuiRoundPlayer[]): boolean => {
  return players.length - players.filter(player => player.promise !== null).length === 1;
};

export const currentTotalPromise = (players: IuiRoundPlayer[]): number => {
  let total = 0;
  players.map(player => total+= player.promise ?? 0);
  return total;
};
