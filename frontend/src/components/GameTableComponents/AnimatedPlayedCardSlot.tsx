import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { cardAsString } from "../../common/commonFunctions";
import { playerFromIndex } from "../../common/playingGame";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import { getUser } from "../../store/userSlice";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { IuiAnimationTimes } from "../../interfaces/IuiPlayingGame";

interface IProps {
  index: number,
  styleProps: CSSProperties,
  animationTimes: IuiAnimationTimes,
}

const AnimatedPlayedCardSlot = ({index, styleProps, animationTimes}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const user = useSelector(getUser);

  if (!currentRoundInfo.gameId || !user.isUserLoggedIn) return null;
  const { roundToPlayer } = currentRoundInfo;
  const iAmObserver = currentRoundInfo.observers?.some(observer => observer.name === user.userName && !observer.waiting) ?? false;

  const player: IuiRoundPlayer = playerFromIndex(currentRoundInfo, index, iAmObserver);
  // console.log("AnimatedPlayedCardSlot, player", player);

  const thisIsCardInCharge = roundToPlayer.playerInCharge === player.name && roundToPlayer.cardsPlayed.length > 0;
  const thisIsWinningCard = roundToPlayer.playerGoingToWinThisPlay === player.name;

  const renderAnimatedCardPlayedSlot = () => {
    const cardPlayedCard = player.cardPlayed ?? undefined;
    const cardFace = cardPlayedCard ? getCardFace(cardAsString(cardPlayedCard), CARD_PLAYABLE.played) : undefined;
    // const animationObject = cardFace ? commonAnimationObject() : plainAnimationObject;
    const animationObject = commonAnimationObject();
    return (
      <AnimatedCardSlot
        containerId={`cardPlayedDivX${player.name}`}
        animationObject={animationObject}
        isCardInCharge={thisIsCardInCharge}
        isWinningCard={thisIsWinningCard}
        animationTimes={animationTimes}
      >
        {cardFace}
      </ AnimatedCardSlot>
    );
  };

  const classStr = "animatedCardPlayedSlot";

  return (
    <div className={classStr} style={styleProps}>
      {renderAnimatedCardPlayedSlot()}
    </div>
  );
};

export default AnimatedPlayedCardSlot;
