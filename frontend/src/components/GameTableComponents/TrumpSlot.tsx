import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";

interface IProps {
  trump: IuiCard | null
}

const TrumpSlot = (props: IProps) => {
  const { trump } = props;
  if (!trump) return null;
  return (
    <CardSlot
      containerId="trumpCardDiv"
      card={trump}
      classStr="trumpCardCol"
      isTrump={true}
    />
  );
};

export default TrumpSlot;
