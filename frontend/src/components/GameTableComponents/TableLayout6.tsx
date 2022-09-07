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
import { CARD_ALIGN_TYPE } from "../../interfaces/IuiPlayingGame";
import AnimatedPlayedCardSlot from "./AnimatedPlayedCardSlot";

const TableLayout6 = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const myPlayedCard = currentRoundInfo.roundToPlayer.myPlayedCard ?? undefined;
  const cardFace = myPlayedCard ? getCardFace(cardAsString(myPlayedCard), CARD_PLAYABLE.played) : undefined;
  const animationObject = commonAnimationObject();
  console.log("TableLayout6");

  if (!currentRoundInfo || !currentRoundInfo.gameId) return null;
  return (
    <React.Fragment>
      <OtherPlayer
        index={3}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          top: 0,
          left: "35%",
          width: "52%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={3}
        styleProps={{top: "170px", left: "50%", right: "50%", transform: "translate(-50%, 0)"}}
      />

      <OtherPlayer
        index={2}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          top: "175px",
          left: 0,
          width: "40%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={2}
        styleProps={{top: "295px", left: "40%"}}
      />

      <OtherPlayer
        index={4}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          top: "175px",
          right: 0,
          width: "40%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={4}
        styleProps={{top: "295px", right: "40%"}}
      />

      <OtherPlayer
        index={1}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          bottom: "300px",
          left: 0,
          width: "35%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={1}
        styleProps={{bottom: "190px", left: "35%"}}
      />

      <OtherPlayer
        index={5}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          bottom: "300px",
          right: 0,
          width: "35%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={5}
        styleProps={{bottom: "190px", right: "35%"}}
      />

      <TrumpSlot
        styleProps={{top: "20px", left: "15%"}}
      />

      <OtherPlayer
        index={0}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          bottom: "2%",
          left: 0,
          width: "25%",
          borderRadius: "5px",
          borderBottom: "1px inset cyan",
          borderLeft: "1px inset cyan",
        }}
      />
      <OwnPlayer
        maxCards={10}
        styleProps={{bottom: "2%", left: "27%", width: "65%"}}
      />
      <div
        className="myPlayedCardDiv"
        style={{
          bottom: "150px",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <AnimatedCardSlot
          containerId={`cardPlayedDivX${currentRoundInfo.myName}`}
          classStr="myPlayedCard"
          animationObject={animationObject}
        >
          {cardFace}
        </AnimatedCardSlot>
      </div>
    </React.Fragment>
  );
};

export default TableLayout6;
