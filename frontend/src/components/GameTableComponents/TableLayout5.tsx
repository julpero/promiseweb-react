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

const TableLayout5 = () => {
  console.log("TableLayout5");
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo || !currentRoundInfo.gameId) return null;
  const { roundToPlayer, userName } = currentRoundInfo;

  const myPlayedCard = roundToPlayer.myPlayedCard ?? undefined;
  const cardFace = myPlayedCard ? getCardFace(cardAsString(myPlayedCard), CARD_PLAYABLE.played) : undefined;
  const animationObject = commonAnimationObject();

  const iAmStarter = roundToPlayer.playerInCharge === userName;
  const iHaveWinningCard = roundToPlayer.playerGoingToWinThisPlay === userName;
  const classStr = `myPlayedCard${iHaveWinningCard ? " winningCardSlot" : ""}`;

  return (
    <React.Fragment>
      <OtherPlayer
        index={2}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          top: 0,
          left: 0,
          width: "42%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={2}
        styleProps={{top: "150px", left: "40%"}}
      />

      <OtherPlayer
        index={3}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          top: 0,
          right: 0,
          width: "42%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
        oneRow={true}
      />
      <AnimatedPlayedCardSlot
        index={3}
        styleProps={{top: "150px", right: "40%"}}
      />

      <OtherPlayer
        index={1}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          top: "200px",
          left: 0,
          width: "35%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderLeft: "1px inset cyan",
        }}
      />
      <AnimatedPlayedCardSlot
        index={1}
        styleProps={{top: "270px", left: "40%"}}
      />

      <OtherPlayer
        index={4}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          top: "200px",
          right: 0,
          width: "35%",
          borderRadius: "5px",
          borderTop: "1px inset cyan",
          borderRight: "1px inset cyan",
        }}
      />
      <AnimatedPlayedCardSlot
        index={4}
        styleProps={{top: "270px", right: "40%"}}
      />

      <TrumpSlot
        styleProps={{top: "30px", left: "50%", right: "50%", transform: "translate(-50%, 0)"}}
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
          containerId={`cardPlayedDivX${userName}`}
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

export default TableLayout5;
