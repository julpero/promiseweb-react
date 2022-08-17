import React from "react";
import { CARD_PLAYABLE } from "../components/GameTableComponents/Cards";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard, IuiRoundPlayer } from "../interfaces/IuiPlayingGame";

export const renderCardSlots = (slotCount: number, cardsInRound: number, cards: IuiCard[]): JSX.Element[] => {
  console.log(cards);
  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    const card = i >= cardsInRound ? undefined : cards[i] ?? null;
    const classStrArr: string[] = [];
    if (i === 0) classStrArr.push("firstCardCol");
    if (i === slotCount-1) classStrArr.push("lastCardCol");

    if (card === undefined) {
      // just empty slot
      slots.push(<CardSlot key={i} classStr={classStrArr.join(" ")} />);
    } else {
      // correct card or null
      slots.push(<CardSlot key={i} cardPlayStatus={CARD_PLAYABLE.ok} classStr={classStrArr.join(" ")} card={card} />);
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
