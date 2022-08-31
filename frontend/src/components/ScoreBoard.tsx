import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IuiGetGameInfoResponse, IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";
import { getCurrentGameInfo } from "../store/gameInfoSlice";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";
import RuleList from "./RuleList";

/**
 * Scoreboard, table in right side screen
 */
const ScoreBoard = () => {
  const currentGameInfo: IuiGetGameInfoResponse = useSelector(getCurrentGameInfo);
  const currentRoundInfo: IuiGetRoundResponse = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const { promiseTable } = currentRoundInfo.roundToPlayer;

  const renderScoreBoardHeader = () => {
    return (
      promiseTable.players.map((playerName, idx) => {
        return <td className="tableHeading truncate" key={idx}>{playerName}</td>;
      })
    );
  };

  const pointsStr = (cumulativePoints: number, roundPoints: number | null, notYetPlayed: boolean): string => {
    if (notYetPlayed) return "";
    return roundPoints === 0 ? "-" : cumulativePoints.toString();
  };

  const cumulativePointsInRound = (playerInd: number, roundInd: number): number => {
    if (roundInd === 0) {
      return promiseTable.promisesByPlayers[playerInd][0].points ?? 0;
    } else {
      return (promiseTable.promisesByPlayers[playerInd][roundInd].points ?? 0) + cumulativePointsInRound(playerInd, roundInd - 1);
    }
  };

  const playerScoreClass = (pointStr: string): string => {
    if (pointStr === "") return "";
    if (pointStr === "-") return "noPoints";
    return "gotPoints";
  };

  const renderScoreBoardCols = (rowInd: number) => {
    const colArr: JSX.Element[] = [];
    for (let i = 0; i < promiseTable.promisesByPlayers.length; i++) {
      const currentPromise = promiseTable.promisesByPlayers[i][rowInd].promise;
      // const keep = promiseTable.promisesByPlayers[i][rowInd].keep;
      const currentRoundPoints = promiseTable.promisesByPlayers[i][rowInd].points;
      const playersCumulativePointsInRound = cumulativePointsInRound(i, rowInd);
      const str = pointsStr(playersCumulativePointsInRound, currentRoundPoints, currentRoundPoints === null || currentPromise === null);
      const classStr = "tableCell " + playerScoreClass(str);
      if (str) {
        colArr.push(
          <td className={classStr} key={i}>{str}</td>
        );
      } else {
        colArr.push(
          <td className={classStr} key={i}>&nbsp;</td>
        );
      }
    }
    return colArr;
  };

  const renderScoreBoardRows = () => {
    const rowArr: JSX.Element[] = [];
    for (let i = 0; i < promiseTable.promisesByPlayers[0].length; i++) {
      rowArr.push(
        <tr key={i}>
          {renderScoreBoardCols(i)}
        </tr>
      );
    }
    return rowArr;
  };

  return (
    <React.Fragment>
      <Table size="sm">
        <thead>
          <tr>
            {renderScoreBoardHeader()}
          </tr>
        </thead>
        <tbody className="scoreBoardTableBody">
          {renderScoreBoardRows()}
        </tbody>
      </Table>
      <RuleList rules={currentGameInfo.rules} classStr="smallList" />
    </React.Fragment>
  );
};

export default ScoreBoard;
