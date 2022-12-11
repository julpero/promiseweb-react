import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";

import { colorize } from "../../common/commonFunctions";
import { playerFromIndex } from "../../common/playingGame";
import { ROUND_PHASE } from "../../interfaces/IuiPlayingGame";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";
import { getUser } from "../../store/userSlice";
import AnimatedProgressBar from "./AnimatedProgressBar";
import { BsFillLightningChargeFill } from "react-icons/bs";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
}

const PlayerInfo = ({index}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const user = useSelector(getUser);

  if (!currentRoundInfo.gameId || !user.isUserLoggedIn) return null;

  const iAmObserver = currentRoundInfo.observers?.some(observer => observer.name === user.userName && !observer.waiting) ?? false;
  const player = playerFromIndex(currentRoundInfo, index, iAmObserver);
  const max = currentRoundInfo.roundToPlayer.cardsInRound;

  const isThisPromiseTurn = (): boolean => {
    if (!currentRoundInfo.roundToPlayer.players.some(player => player.promise === null)) {
      // all players have promised
      return false;
    }
    for (let i = currentRoundInfo.roundToPlayer.starterPositionIndex; i < currentRoundInfo.roundToPlayer.starterPositionIndex + currentRoundInfo.roundToPlayer.players.length; i++) {
      const checkInd = i >= currentRoundInfo.roundToPlayer.players.length ? i - currentRoundInfo.roundToPlayer.players.length : i;
      if (currentRoundInfo.roundToPlayer.players[checkInd].promise === null) {
        return currentRoundInfo.roundToPlayer.players[checkInd].name === player.name;
      }
    }
    return false;
  };

  const isThisPlayingTurn = () => {
    return currentRoundInfo.roundToPlayer.whoseTurn === player.name && currentRoundInfo.roundToPlayer.roundPhase === ROUND_PHASE.onPlay;
  };

  const renderShowMyTurn = (key: number, min: number) => {
    if (!isThisPlayingTurn()) return null;
    return (
      <AnimatedProgressBar initialX={max-min} min={0} max={max} pbKey={key} variant="dark" />
    );
  };

  const renderPromise = () => {
    return (player.promise !== null && player.promise >= 0) ? player.promise : "-";
  };

  const renderKeeps = () => {
    return (player.promise !== null && player.keeps !== null && player.keeps >= 0) ? player.keeps : "-";
  };

  const renderKeepProgress = () => {
    if (isThisPromiseTurn()) {
      return <AnimatedProgressBar pbKey={1} initialX={max} min={0} max={max} isChild={false} />;
    }

    const keeps = player.keeps;
    const promise = player.promise ?? 0;
    if (keeps === promise) {
      return (
        <ProgressBar style={{"border": "solid 1px green"}}>
          <ProgressBar variant="success" now={keeps} max={max} key={1} />
          {renderShowMyTurn(2, keeps)}
        </ProgressBar>
      );
    } else if (keeps < promise) {
      return (
        <ProgressBar style={{"border": "solid 1px orange"}}>
          <ProgressBar variant="success" now={keeps} max={max} key={1} />
          <ProgressBar variant="warning" now={promise - keeps} max={max} key={2}/>
          {renderShowMyTurn(3, promise)}
        </ProgressBar>
      );
    } else {
      return (
        <ProgressBar style={{"border": "solid 1px red"}}>
          <ProgressBar variant="success" now={promise} max={max} key={1} />
          <ProgressBar variant="danger" now={keeps - promise} max={max} key={2} />
          {renderShowMyTurn(3, keeps)}
        </ProgressBar>
      );
    }
  };

  const renderEvenBreaker = () => {
    return player.evenBreakingBonus === 0 ? <BsFillLightningChargeFill color="yellow" /> : null;
  };

  const bgColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");

  return (
    <div className="playerInfoRow">
      <div className="playerNameCol" style={{"backgroundImage": `linear-gradient(90deg, ${colorize(player.name)}, ${bgColor})`}}>
        {player.name.substring(0, 10)}
        {renderEvenBreaker()}
      </div>
      <div className="playerInfoCol">
        k: {renderKeeps()} p: {renderPromise()}
      </div>
      <div className="progressInfoCol">
        {renderKeepProgress()}
      </div>
    </div>
  );
};

export default PlayerInfo;
