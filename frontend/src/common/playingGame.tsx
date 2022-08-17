import React from "react";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard } from "../interfaces/IuiPlayingGame";

export const renderCardSlots = (slotCount: number, cards?: IuiCard[]): JSX.Element[] => {
  console.log(cards);
  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    const card = cards === undefined ? undefined : cards[i] ?? null;
    const classStrArr: string[] = [];
    if (i === 0) classStrArr.push("firstCardCol");
    if (i === slotCount-1) classStrArr.push("lastCardCol");

    if (card === undefined) {
      // just empty slot
      slots.push(<CardSlot key={i} classStr={classStrArr.join(" ")} />);
    } else {
      // correct card or null
      slots.push(<CardSlot key={i} classStr={classStrArr.join(" ")} card={card} />);
    }
  }
  return slots;
};
