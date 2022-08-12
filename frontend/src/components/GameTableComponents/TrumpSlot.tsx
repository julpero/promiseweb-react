import React from "react";
import { IuiCard } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";

interface IProps {
  trump: IuiCard | null
}

class TrumpSlot extends React.Component<IProps> {
  render() {
    const { trump } = this.props;
    if (!trump) return null;
    return (
      <CardSlot card={trump} />
    );
  }
}

export default TrumpSlot;
