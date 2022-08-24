import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAnimateCard, setAnimateCard } from "../../store/animateCardSlice";

import { useSpring, animated, useSpringRef, easings } from "react-spring";
import { setGetRoundInfo } from "../../store/getRoundInfoSlice";
import { cardAsString, randomNegToPos } from "../../common/commonFunctions";
import getCardFace, { CARD_PLAYABLE } from "./Cards";

interface IProps {
  containerId: string,
  children?: JSX.Element,
  classStr?: string,
  animationObject?: any,
  onPlayCard?: () => void,
}

const AnimatedCardSlot = ({containerId, children, classStr, animationObject, onPlayCard}: IProps) => {
  const [child, setChild] = useState(children);
  const [animation, setAnimation] = useState<any|null>(null);

  const thisDiv = useRef<HTMLDivElement>(null);
  const [props, api] = useSpring(() => animationObject);
  // const propsRef = useSpringRef();
  // const referredAnimationObject = {
  //   ref: propsRef,
  //   ...animationObject,
  // };
  // const props = useSpring(referredAnimationObject);

  const animateCard = useSelector(getAnimateCard);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("useEffect A");
    if (animateCard && containerId === `cardsToPlaySlotsX${animateCard.fromPlayer}X${animateCard.fromSlot}`) {
      // this is the slot where card is played from, so it should be empty for now on
      console.log("animateCard, empty this slot", animateCard);
      setChild(undefined);
    } else if (animateCard && containerId === `cardPlayedDivX${animateCard.fromPlayer}`) {
      // this is the slot where card is played to, so it should handle the animation
      console.log("animateCard, to slot, set children", animateCard);
      const newChildren = animateCard.cardFace;
      const cardFace = getCardFace(cardAsString(newChildren ?? { rank: "0", suite: "dummy", value: 0 }), CARD_PLAYABLE.ok);
      console.log("animateCard, to slot, new card face", cardFace);
      console.log(`A: ${Date.now()}`);
      setChild(cardFace);
      console.log(`B: ${Date.now()}`);
    } else {
      setChild(children);
    }

  }, [children, animateCard, containerId]);

  useEffect(() => {
    // animation must be done after child is set
    // console.log("useEffect B");
    if (child && animateCard && containerId === `cardPlayedDivX${animateCard.fromPlayer}`) {
      console.log(`C: ${Date.now()}`);
      console.log("animateCard, to slot", animateCard);

      const fromContainer = document.getElementById(`cardsToPlaySlotsX${animateCard.fromPlayer}X${animateCard.fromSlot}`);
      const toContainer = thisDiv.current;
      if (fromContainer && toContainer) {
        const playedFrom = fromContainer.getBoundingClientRect();
        const playedTo = toContainer.getBoundingClientRect();
        console.log("playedFrom", playedFrom);
        console.log("playedTo", playedTo);
        const fromX = playedFrom.left - playedTo.left;
        const fromY = playedFrom.top - playedTo.top;

        const springObject = {
          from: { x: fromX, y: fromY },
          config: { duration: 2000, easing: easings.easeOutQuint },
          delay: 500,
          to: [{
            x: randomNegToPos(20),
            y: randomNegToPos(20),
            rotate: randomNegToPos(50),
            onStart: () => {
              console.log("started to animate");
            },
            onRest: () => {
              // dispatch(setAnimateCard(null));
              // dispatch(setGetRoundInfo(animateCard.getRoundRequest));
              setAnimation(null);
              console.log("onRest");
            }
          }],
        };
        console.log("springObject", springObject);
        setAnimation(springObject);
      }
    }
  }, [child, containerId, animateCard, dispatch]);

  useEffect(() => {
    if (api && animation) {
      console.log("animating", animation);
      console.log("api.current", api.current);
      api.update(animation);
      api.start();
      console.log("api.current", api.current);
      // propsRef.start(animation);
    }
  }, [animation, api]);

  return (
    <div ref={thisDiv} onClick={onPlayCard} id={containerId} className={`col cardCol ${classStr ?? ""}`}>
      <animated.div style={props}>
        {child}
      </animated.div>
    </div>
  );
};

export default AnimatedCardSlot;
