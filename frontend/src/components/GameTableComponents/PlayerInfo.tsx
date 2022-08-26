import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { playerFromIndex } from "../../common/playingGame";
import { getCurrentRoundInfo } from "../../store/roundInfoSlice";

interface IProps {
  /** index goes clockwise, starting from you 0 and rest players from 1 to 5 */
  index: number,
  maxCards: number,
}

const PlayerInfo = ({index, maxCards}: IProps) => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const player = playerFromIndex(currentRoundInfo, index);

  const renderPromise = () => {
    return (player.promise && player.promise >= 0) ? player.promise : "";
  };

  const renderKeepProgress = () => {
    const max = maxCards;
    const keeps = player.keeps;
    const promise = player.promise ?? 0;
    if (keeps === promise) {
      return (
        <ProgressBar>
          <ProgressBar variant="success" now={keeps} max={max} />
        </ProgressBar>
      );
    } else if (keeps < promise) {
      return (
        <ProgressBar>
          <ProgressBar variant="success" now={keeps} max={max} key={1} />
          <ProgressBar variant="warning" now={promise - keeps} max={max} key={2} />
        </ProgressBar>
      );
    } else {
      return (
        <ProgressBar>
          <ProgressBar variant="success" now={promise} max={max} key={1} />
          <ProgressBar variant="danger" now={keeps - promise} max={max} key={2} />
        </ProgressBar>
      );
    }
  };

  return (
    <div className="row playerInfoRow">
      <div className="col-3 nameCol playerNameCol">
        {player.name}
      </div>
      <div className="col-3 playerInfoCol">
        {renderPromise()}
      </div>
      <div className="col-2 playerInfoCol">
        k: {player.keeps}
      </div>
      <div className="col-4 progressInfoCol">
        {renderKeepProgress()}
      </div>
    </div>
  );
};

export default PlayerInfo;
