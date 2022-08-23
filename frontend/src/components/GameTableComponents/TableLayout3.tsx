import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import {
  setAnimateCard,
  getAnimateCard,
} from "../../store/animateCardSlice";
import {
  setGetRoundInfo,
} from "../../store/getRoundInfoSlice";

import { IuiCard } from "../../interfaces/IuiPlayingGame";
import CardSlot from "./CardSlot";
import OtherPlayer from "./OtherPlayer";
import OwnPlayer from "./OwnPlayer";
import TrumpSlot from "./TrumpSlot";
import { randomNegToPos } from "../../common/commonFunctions";
import { easings } from "react-spring";

interface IProps {
  onPlayCard: (card: IuiCard) => void,
}

const TableLayout3 = ({ onPlayCard }: IProps) => {
  const [playedCard, setPlayedCard] = useState<IuiCard | undefined>(undefined);
  const [springObject, setSpringObject] = useState({});
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const animateCard = useSelector(getAnimateCard);
  const dispatch = useDispatch();

  // const springObjectRef = useRef({});
  // const cardRef = useRef(currentRoundInfo.roundToPlayer.myPlayedCard ?? undefined);

  useEffect(() => {
    console.log("animate my played card A", animateCard);
    if (currentRoundInfo && animateCard && animateCard.fromPlayer === currentRoundInfo.myName) {
      setPlayedCard(animateCard.cardFace ?? undefined);
      console.log("animate my played card B", animateCard);
      const playedFrom = document.getElementById(`cardsToPlaySlotsX${currentRoundInfo.myName}X${animateCard.fromSlot}`)?.getBoundingClientRect();
      const playedTo = document.getElementById("myPlayedCardDiv")?.getBoundingClientRect();
      console.log("playedFrom", playedFrom);
      console.log("playedTo", playedTo);
      // in refresh these are undefined so no animations and that's ok
      if (playedFrom && playedTo) {
        console.log("ANIMATE my played card", animateCard);

        const fromX = playedFrom.left - playedTo.left;
        const fromY = playedFrom.top - playedTo.top;

        console.log("CardSlot playedFrom", playedFrom);
        console.log("CardSlot playedTo", playedTo);

        const roundRequestAfterAnimation = { ...animateCard.getRoundRequest };
        console.log("roundRequestAfterAnimation", roundRequestAfterAnimation);
        setSpringObject({
          from: { x: fromX, y: fromY },
          config: { duration: 1000, easing: easings.easeOutQuint },
          delay: 300,
          to: [{
            x: randomNegToPos(2),
            y: randomNegToPos(2),
            rotate: randomNegToPos(5),
            onRest: () => {
              dispatch(setAnimateCard(null));
              dispatch(setGetRoundInfo(animateCard.getRoundRequest));
              console.log("onRest");
            }
          }],
        });
        // console.log("springObject", springObjectRef.current);
      }
    } else if (currentRoundInfo) {
      setSpringObject({});
      setPlayedCard(currentRoundInfo.roundToPlayer.myPlayedCard ?? undefined);
      console.log("animate my played card C", currentRoundInfo.roundToPlayer.myPlayedCard);
    } else {
      setSpringObject({});
    }
  }, [currentRoundInfo, animateCard, dispatch]);

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-5 playerTable">
            <OtherPlayer
              index={1}
              maxCards={10}
              align="left"
            />
          </div>
          <div className="col-2">
            <TrumpSlot trump={currentRoundInfo.roundToPlayer.trumpCard} />
          </div>
          <div className="col-5 playerTable">
            <OtherPlayer
              index={2}
              maxCards={10}
              align="right"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6"></div>
          <CardSlot
            containerId="myPlayedCardDiv"
            classStr="col-2 myPlayedCard"
            card={playedCard}
            springObject={springObject}
          />
          <div className="col-4"></div>
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
            <OwnPlayer
              onPlayCard={onPlayCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLayout3;
