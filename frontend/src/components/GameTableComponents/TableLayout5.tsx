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
import { CARD_ALIGN_TYPE, IuiAnimationTimes } from "../../interfaces/IuiPlayingGame";
import { getUser } from "../../store/userSlice";

interface IProps {
  animationTimes: IuiAnimationTimes,
}

const TableLayout5 = ({animationTimes}: IProps) => {
  // console.log("TableLayout5");
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
        animationTimes={animationTimes}
      />
      <AnimatedPlayedCardSlot
        index={2}
        styleProps={{top: "150px", left: "40%"}}
        animationTimes={animationTimes}
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
        animationTimes={animationTimes}
      />
      <AnimatedPlayedCardSlot
        index={3}
        styleProps={{top: "150px", right: "40%"}}
        animationTimes={animationTimes}
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
        animationTimes={animationTimes}
      />
      <AnimatedPlayedCardSlot
        index={1}
        styleProps={{top: "270px", left: "40%"}}
        animationTimes={animationTimes}
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
        animationTimes={animationTimes}
      />
      <AnimatedPlayedCardSlot
        index={4}
        styleProps={{top: "270px", right: "40%"}}
        animationTimes={animationTimes}
      />

      <TrumpSlot
        styleProps={{top: "30px", left: "50%", right: "50%", transform: "translate(-50%, 0)"}}
        animationTimes={animationTimes}
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
        animationTimes={animationTimes}
      />
      <OwnPlayer
        maxCards={10}
        styleProps={{bottom: "2%", left: "27%", width: "65%"}}
        animationTimes={animationTimes}
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
          containerId={`cardPlayedDivX${myName}`}
          classStr={classStr}
          animationObject={animationObject}
          animationTimes={animationTimes}
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
