import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";

interface IProps {
  trump: IuiCard | null
}

function TrumpSlot (props: IProps) {
  const { trump } = props;
  if (!trump) return null;
  return (
    <CardSlot card={trump} />
  );
}

export default TrumpSlot;
