import React from "react";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard } from "../interfaces/IuiPlayingGame";

export const renderCardSlots = (slotCount: number, cards?: IuiCard[]): JSX.Element[] => {
  console.log(cards);
  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    const card = cards === undefined ? undefined : cards[i] ?? null;
    if (card === undefined) {
      // just empty slot
      slots.push(<CardSlot key={i} />);
    } else {
      // correct card or null
      slots.push(<CardSlot key={i} card={card} />);
    }
  }
  return slots;
};
