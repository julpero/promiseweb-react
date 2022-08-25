import React from "react";
import AnimatedCardSlot from "../components/GameTableComponents/AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "../components/GameTableComponents/Cards";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard, IuiGetRoundResponse, IuiRoundPlayer } from "../interfaces/IuiPlayingGame";
import { cardAsString, randomNegToPos } from "../common/commonFunctions";
import { commonAnimationObject } from "../interfaces/IuiAnimation";

const cardPlayable = (i: number, roundInfo: IuiGetRoundResponse): CARD_PLAYABLE => {
  if (roundInfo.roundToPlayer.isMyTurn) {
    return roundInfo.roundToPlayer.playableCards.some(ind => ind === roundInfo.roundToPlayer.myCards.findIndex(card => card.originalIndex === i))
      ? CARD_PLAYABLE.ok
      : CARD_PLAYABLE.notAllowed;
  } else {
    return CARD_PLAYABLE.notMyTurn;
  }
};

export const currentTotalPromise = (players: IuiRoundPlayer[]): number => {
  let total = 0;
  players.map(player => total+= player.promise ?? 0);
  return total;
};
