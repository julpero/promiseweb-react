import React from "react";
import { Button } from "react-bootstrap";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard } from "../interfaces/IuiPlayingGame";

const concludeCard = (ind: number): IuiCard | null | undefined => {
  return null;
};

export const renderCardSlots = (slotCount: number): JSX.Element[] => {
  const slots: JSX.Element[] = [];
  for (let i = 0; i < slotCount; i++) {
    const card = concludeCard(i);
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
