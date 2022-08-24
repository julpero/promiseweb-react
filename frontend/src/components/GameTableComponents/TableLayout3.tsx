import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import {
  setGetRoundInfo,
} from "../../store/getRoundInfoSlice";

import { IuiCard } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";
import OtherPlayer from "./OtherPlayer";
import OwnPlayer from "./OwnPlayer";
import TrumpSlot from "./TrumpSlot";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { cardAsString, commonAnimationObject } from "../../common/commonFunctions";

const TableLayout3 = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const myPlayedCard = currentRoundInfo.roundToPlayer.myPlayedCard ?? undefined;
  const cardFace = myPlayedCard ? getCardFace(cardAsString(myPlayedCard), CARD_PLAYABLE.ok) : undefined;
  const animationObject = cardFace ? commonAnimationObject() : null;

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-5 playerTable">
            <OtherPlayer
              index={1}
              maxCards={10}
              align="left"
            />
          </div>
          <div className="col-2">
            <TrumpSlot />
          </div>
          <div className="col-5 playerTable">
            <OtherPlayer
              index={2}
              maxCards={10}
              align="right"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6"></div>
          <AnimatedCardSlot
            containerId="myPlayedCardDiv"
            classStr="col-2 myPlayedCard"
            animationObject={animationObject}
          >
            {cardFace}
          </AnimatedCardSlot>
          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col-3">
            <OtherPlayer
              index={0}
              maxCards={10}
              align="left"
            />
          </div>
          <div className="col-9">
            <OwnPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout3;
