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
import AnimatedPlayedCardSlot from "./AnimatedPlayedCardSlot";
import { CARD_ALIGN_TYPE } from "../../interfaces/IuiPlayingGame";

const TableLayout3 = () => {
  console.log("TableLayout3");
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo || !currentRoundInfo.gameId) return null;
  const { roundToPlayer, myName } = currentRoundInfo;

  const myPlayedCard = roundToPlayer.myPlayedCard ?? undefined;
  const cardFace = myPlayedCard ? getCardFace(cardAsString(myPlayedCard), CARD_PLAYABLE.played) : undefined;
  const animationObject = commonAnimationObject();

  const iAmStarter = roundToPlayer.playerInCharge === myName;
  const iHaveWinningCard = roundToPlayer.playerGoingToWinThisPlay === myName;
  const classStr = `myPlayedCard${iHaveWinningCard ? " winningCardSlot" : ""}`;

  return (
    <React.Fragment>
      <OtherPlayer
        index={1}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          top: 0,
          left: 0,
          width: "40%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
        }}
      />
      <AnimatedPlayedCardSlot
        index={1}
        styleProps={{top: "30%", left: "30%"}}
      />

      <OtherPlayer
        index={2}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          top: 0,
          right: 0,
          width: "40%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
      />
      <AnimatedPlayedCardSlot
        index={2}
        styleProps={{top: "30%", right: "30%"}}
      />

      <TrumpSlot
        styleProps={{top: "5%", left: "50%", right: "50%", transform: "translate(-50%, 0)"}}
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
        styleProps={{bottom: "2%", left: "30%", width: "65%"}}
      />
      <div className="myPlayedCardDiv" style={{top: "50%", left: "50%", right: "50%", transform: "translate(-50%, 0)"}}>
        <AnimatedCardSlot
          containerId={`cardPlayedDivX${myName}`}
          classStr={classStr}
          animationObject={animationObject}
          isCardInCharge={iAmStarter && roundToPlayer.cardsPlayed.length > 0}
          isWinningCard={iHaveWinningCard}
        >
          {cardFace}
        </AnimatedCardSlot>
      </div>
    </React.Fragment>
  );
};

export default TableLayout3;
