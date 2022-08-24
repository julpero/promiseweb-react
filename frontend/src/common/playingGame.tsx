import React from "react";
import AnimatedCardSlot from "../components/GameTableComponents/AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "../components/GameTableComponents/Cards";
import CardSlot from "../components/GameTableComponents/CardSlot";
import { IuiCard, IuiGetRoundResponse, IuiRoundPlayer } from "../interfaces/IuiPlayingGame";
import { cardAsString, commonAnimationObject, randomNegToPos } from "../common/commonFunctions";

const cardPlayable = (i: number, roundInfo: IuiGetRoundResponse): CARD_PLAYABLE => {
  if (roundInfo.roundToPlayer.isMyTurn) {
    return roundInfo.roundToPlayer.playableCards.some(ind => ind === roundInfo.roundToPlayer.myCards.findIndex(card => card.originalIndex === i))
      ? CARD_PLAYABLE.ok
      : CARD_PLAYABLE.notAllowed;
  } else {
    return CARD_PLAYABLE.notMyTurn;
  }
};

const renderCardSlots = (name: string, slotCount: number, roundInfo: IuiGetRoundResponse, cards: IuiCard[], cardsRemainingCount: number, onPlayCard?: (card: IuiCard) => void, playedSlot?: number): JSX.Element[] => {
  // console.log(cards);
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
        />
      );

      // slots.push(
      //   <CardSlot
      //     containerId={`cardsToPlaySlotsX${name}X${i}`}
      //     key={i}
      //     classStr={classStrArr.join(" ")}
      //   />
      // );
    } else {
      // correct card or null
      const cardFace = getCardFace(cardAsString(cardToRender ?? { rank: "0", suite: "dummy", value: 0 }), cardPlayable(i, roundInfo));
      slots.push(
        <AnimatedCardSlot
          key={i}
          containerId={`cardsToPlaySlotsX${name}X${i}`}
          classStr={classStrArr.join(" ")}
          animationObject={commonAnimationObject()}
        >
          {cardFace}
        </AnimatedCardSlot>
      );

      // slots.push(
      //   <CardSlot
      //     containerId={`cardsToPlaySlotsX${name}X${i}`}
      //     key={i}
      //     cardPlayStatus={cardPlayable(i, roundInfo)}
      //     classStr={classStrArr.join(" ")}
      //     card={cardToRender}
      //     onPlayCard={onPlayCard}
      //   />
      // );
    }
  }
  return slots;
};


export const currentTotalPromise = (players: IuiRoundPlayer[]): number => {
  let total = 0;
  players.map(player => total+= player.promise ?? 0);
  return total;
};
