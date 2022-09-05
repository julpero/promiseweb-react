import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

import OtherPlayer from "./OtherPlayer";
import OwnPlayer from "./OwnPlayer";
import TrumpSlot from "./TrumpSlot";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { cardAsString } from "../../common/commonFunctions";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";

const TableLayout5 = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const myPlayedCard = currentRoundInfo.roundToPlayer.myPlayedCard ?? undefined;
  const cardFace = myPlayedCard ? getCardFace(cardAsString(myPlayedCard), CARD_PLAYABLE.played) : undefined;
  const animationObject = commonAnimationObject();
  console.log("TableLayout5");

  if (!currentRoundInfo || !currentRoundInfo.gameId) return null;
  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-5 playerTable">
            <OtherPlayer
              index={2}
              maxCards={10}
              align="left"
            />
          </div>
          <div className="col-2 trumpSlotDiv">
            <TrumpSlot />
          </div>
          <div className="col-5 playerTable">
            <OtherPlayer
              index={3}
              maxCards={10}
              align="right"
            />
          </div>
        </div>
        <div className="row ownPlayedCardRow">
          <div className="col-5 playerTable">
            <OtherPlayer
              index={1}
              maxCards={10}
              align="left"
            />
          </div>
          <div className="col-1" />
          <AnimatedCardSlot
            containerId={`cardPlayedDivX${currentRoundInfo.myName}`}
            classStr="col-1 myPlayedCard topMargin"
            animationObject={animationObject}
          >
            {cardFace}
          </AnimatedCardSlot>
          <div className="col-5 playerTable">
            <OtherPlayer
              index={4}
              maxCards={10}
              align="right"
            />
          </div>
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
            <OwnPlayer maxCards={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout5;
