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
import { getUser } from "../../store/userSlice";

const TableLayout4 = () => {
  // console.log("TableLayout4");
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const user = useSelector(getUser);

  if (!currentRoundInfo || !currentRoundInfo.gameId || !user.isUserLoggedIn) return null;
  const { roundToPlayer, userName } = currentRoundInfo;

  const iAmObserver = currentRoundInfo.observers?.some(observer => observer.name === user.userName && !observer.waiting) ?? false;
  const myName = iAmObserver ? currentRoundInfo.roundToPlayer.players[0].name ?? "" : userName;

  const myPlayedCard = (iAmObserver ? roundToPlayer.cardsPlayed.find(played => played.name === myName)?.card : roundToPlayer.myPlayedCard) ?? undefined;
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
        styleProps={{top: "28%", right: "40%"}}
      />

      <OtherPlayer
        index={3}
        maxCards={10}
        align={CARD_ALIGN_TYPE.right}
        styleProps={{
          top: "50%",
          right: 0,
          width: "40%",
          borderRadius: "5px",
          borderRight: "1px inset cyan",
        }}
      />
      <AnimatedPlayedCardSlot
        index={3}
        styleProps={{top: "50%", right: "45%"}}
      />

      <TrumpSlot
        styleProps={{top: "5%", left: "50%", right: "50%", transform: "translate(-50%, 0)"}}
      />

      <OtherPlayer
        index={0}
        maxCards={10}
        align={CARD_ALIGN_TYPE.left}
        styleProps={{
          bottom: "150px",
          left: 0,
          width: "25%",
          borderRadius: "5px",
          borderLeft: "1px inset cyan",
        }}
      />
      <OwnPlayer
        maxCards={10}
        styleProps={{bottom: "2%", left: "1%", width: "65%"}}
      />
      <div className="myPlayedCardDiv" style={{bottom: "165px", left: "35%", right: "60%", transform: "translate(-40%, 0)"}}>
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

export default TableLayout4;
