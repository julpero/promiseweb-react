import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAnimateCard, setAnimateCard } from "../../store/animateCardSlice";
import { getEmptySlot, setEmptySlot } from "../../store/emptyAnimatedCardSlotSlice";
import { getCollectCards, setCollectCards } from "../../store/collectAnimatedCardsSlice";
import { setGetRoundInfo } from "../../store/getRoundInfoSlice";

import { useSpring, animated, easings } from "react-spring";
import { cardAsString, randomNegToPos } from "../../common/commonFunctions";
import getCardFace, { CARD_PLAYABLE } from "./Cards";
import { IuiSpringObject } from "../../interfaces/IuiAnimation";

interface IProps {
  containerId: string,
  children?: JSX.Element,
  classStr?: string,
  animationObject: IuiSpringObject,
  onPlayCard?: () => void,
  isSmall?: boolean,
}

const AnimatedCardSlot = ({containerId, children, classStr, animationObject, onPlayCard, isSmall}: IProps) => {
  const [child, setChild] = useState<JSX.Element | undefined>(undefined);
  const initialChildren = useRef<JSX.Element | undefined>(children);
  const initialEffect = useRef(true);

  const [animation, setAnimation] = useState<IuiSpringObject|null>(null);

  const [props, api] = useSpring(() => animationObject);

  const animateCard = useSelector(getAnimateCard);
  const emptySlot = useSelector(getEmptySlot);
  const collectCards = useSelector(getCollectCards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (children !== initialChildren.current || initialEffect.current) {
      // console.log("initial set children", containerId);
      initialEffect.current = false;
      setChild(children);
    }
  }, [children, containerId]);

  useEffect(() => {
    if (collectCards && containerId.startsWith("cardPlayedDivX")) {
      console.log("collectCards", collectCards);
      const fromContainer = document.getElementById(containerId);
      const toContainer = document.getElementById(`cardsWonSlotsX${collectCards.winner}X${collectCards.winCount-1}`);
      if (fromContainer && toContainer) {
        const playedFrom = fromContainer.getBoundingClientRect();
        const playedTo = toContainer.getBoundingClientRect();
        // console.log("collect from", playedFrom);
        // console.log("collect to", playedTo);
        const fromX = playedTo.left - playedFrom.left;
        const fromY = playedTo.top- playedFrom.top;
        const springObject = {
          from: { },
          config: { duration: 1200, easing: easings.easeOutQuint },
          delay: 400,
          to: [{
            x: fromX,
            y: fromY,
            rotate: randomNegToPos(5),
            onStart: () => {
              console.log("started to animate");
            },
            onRest: () => {
              // set this only once, easiest handle with winner containerId
              if (containerId === `cardPlayedDivX${collectCards.winner}`) {
                dispatch(setGetRoundInfo(collectCards.getRoundRequest));
                dispatch(setCollectCards(null));
              }
              setAnimation(null);
              setChild(undefined);
              console.log("onRest");
            }
          }],
        } as IuiSpringObject;
        setAnimation(springObject);
      }
    }
  }, [collectCards, containerId, dispatch]);

  useEffect(() => {
    if (emptySlot && emptySlot === containerId) {
      // console.log("emptySlot", emptySlot);
      const fromContainer = document.getElementById(emptySlot);
      fromContainer?.classList.remove("playableCard");
      setChild(undefined);
      dispatch(setEmptySlot(null));
    }
  }, [emptySlot, containerId, dispatch]);

  useEffect(() => {
    // console.log("useEffect A", containerId);
    if (animateCard && containerId === `cardsToPlaySlotsX${animateCard.fromPlayer}X${animateCard.fromSlot}`) {
      // this is the slot where card is played from, it will be set empty when played to animation starts
      // console.log("animateCard, empty this slot", animateCard);
    } else if (animateCard && containerId === `cardPlayedDivX${animateCard.fromPlayer}`) {
      // this is the slot where card is played to, so it should handle the animation
      // console.log("animateCard, to slot, set children", animateCard);
      const newChildren = animateCard.cardFace;
      const cardFace = getCardFace(cardAsString(newChildren ?? { rank: "0", suite: "dummy", value: 0 }), CARD_PLAYABLE.played);
      // console.log("animateCard, to slot, new card face", cardFace);

      const fromContainerStr = `cardsToPlaySlotsX${animateCard.fromPlayer}X${animateCard.fromSlot}`;
      const fromContainer = document.getElementById(fromContainerStr);
      const toContainer = document.getElementById(`cardPlayedDivX${animateCard.fromPlayer}`);
      if (fromContainer && toContainer) {
        const playedFrom = fromContainer.getBoundingClientRect();
        const playedTo = toContainer.getBoundingClientRect();
        // console.log("playedFrom", playedFrom);
        // console.log("playedTo", playedTo);
        const fromX = playedFrom.left - playedTo.left;
        const fromY = playedFrom.top - playedTo.top;

        const springObject = {
          from: { x: fromX, y: fromY },
          config: { duration: 1500, easing: easings.easeOutQuint },
          delay: 100,
          to: [{
            x: randomNegToPos(2),
            y: randomNegToPos(2),
            rotate: randomNegToPos(5),
            onStart: () => {
              console.log("started to animate");
              setChild(cardFace);
              dispatch(setEmptySlot(fromContainerStr));
            },
            onRest: () => {
              dispatch(setAnimateCard(null));
              if (animateCard.getRoundRequest) {
                dispatch(setGetRoundInfo(animateCard.getRoundRequest));
              }
              if (animateCard.collectCards) {
                dispatch(setCollectCards(animateCard.collectCards));
              }
              setAnimation(null);
              console.log("onRest");
            }
          }],
        } as IuiSpringObject;
        // console.log("springObject", springObject);
        setAnimation(springObject);
      }
    }
  }, [ animateCard, containerId, dispatch]);

  useEffect(() => {
    if (api && animation) {
      console.log("animating", animation);
      api.update(animation);
      api.start();
    }
  }, [animation, api]);

  const handleClick = () => {
    if (onPlayCard !== undefined && !animateCard && !collectCards && !emptySlot) {
      onPlayCard();
    }
  };

  let finalClassStr = "cardCol";
  finalClassStr+= " " + classStr;

  if (isSmall) {
    finalClassStr = finalClassStr.replace("cardCol", "smallCardCol");
  }

  return (
    <div onClick={() => handleClick()} id={containerId} className={finalClassStr}>
      <animated.div style={props}>
        {child}
      </animated.div>
    </div>
  );
};

export default AnimatedCardSlot;
