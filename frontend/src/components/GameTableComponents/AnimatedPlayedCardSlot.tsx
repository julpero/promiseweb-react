import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { cardAsString } from "../../common/commonFunctions";
import { playerFromIndex } from "../../common/playingGame";
import { commonAnimationObject } from "../../interfaces/IuiAnimation";
import { IuiRoundPlayer } from "../../interfaces/IuiPlayingGame";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import AnimatedCardSlot from "./AnimatedCardSlot";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

interface IProps {
  index: number,
  styleProps: CSSProperties,
}

const AnimatedPlayedCardSlot = ({index, styleProps}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;
  const { roundToPlayer } = currentRoundInfo;
  const player: IuiRoundPlayer = playerFromIndex(currentRoundInfo, index);
  console.log("AnimatedPlayedCardSlot, player", player);

  const thisIsCardInCharge = roundToPlayer.playerInCharge === player.name && roundToPlayer.cardsPlayed.length > 0;
  const thisIsWinningCard = roundToPlayer.playerGoingToWinThisPlay === player.name;
  const isSmall = roundToPlayer.players.length === 6 && !player.thisIsMe;

  const renderAnimatedCardPlayedSlot = () => {
    const cardPlayedCard = player.cardPlayed ?? undefined;
    const cardFace = cardPlayedCard ? getCardFace(cardAsString(cardPlayedCard), CARD_PLAYABLE.played, isSmall) : undefined;
    // const animationObject = cardFace ? commonAnimationObject() : plainAnimationObject;
    const animationObject = commonAnimationObject();
    return (
      <AnimatedCardSlot
        containerId={`cardPlayedDivX${player.name}`}
        animationObject={animationObject}
        isSmall={isSmall}
        isCardInCharge={thisIsCardInCharge}
        isWinningCard={thisIsWinningCard}
      >
        {cardFace}
      </ AnimatedCardSlot>
    );
  };

  const classStr = isSmall ? "smallAnimatedCardPlayedSlot" : "animatedCardPlayedSlot";

  return (
    <div className={classStr} style={styleProps}>
      {renderAnimatedCardPlayedSlot()}
    </div>
  );
};

export default AnimatedPlayedCardSlot;
