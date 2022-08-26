import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

/**
 * Scoreboard, table in right side screen
 */
const ScoreBoard = () => {
  const currentRoundInfo: IuiGetRoundResponse = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;

  const { promiseTable } = currentRoundInfo.roundToPlayer;

  const renderScoreBoardHeader = () => {
    return (
      promiseTable.players.map((playerName, idx) => {
        return <td className="tableHeading" key={idx}>{playerName.substring(0, 3)}</td>;
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

  const renderScoreBoardCols = (rowInd: number) => {
    const colArr: JSX.Element[] = [];
    for (let i = 0; i < promiseTable.promisesByPlayers.length; i++) {
      const currentPromise = promiseTable.promisesByPlayers[i][rowInd].promise;
      const keep = promiseTable.promisesByPlayers[i][rowInd].keep;
      const currentRoundPoints = promiseTable.promisesByPlayers[i][rowInd].points;
      const playersCumulativePointsInRound = cumulativePointsInRound(i, rowInd);
      const str = pointsStr(playersCumulativePointsInRound, currentRoundPoints, currentRoundPoints === null || currentPromise === null);
      if (str) {
        colArr.push(
          <td className="tableCell" key={i}>{str}</td>
        );
      } else {
        colArr.push(
          <td className="tableCell" key={i}>&nbsp;</td>
        );
      }
    }
    return colArr;
  };

  const renderScoreBoardRows = () => {
    const rowArr: JSX.Element[] = [];
    for (let i = 0; i < promiseTable.promisesByPlayers[0].length; i++) {
      rowArr.push(
        <tr>
          {renderScoreBoardCols(i)}
        </tr>
      );
    }
    return rowArr;
  };

  return (
    <Table size="sm">
      <thead>
        <tr>
          {renderScoreBoardHeader()}
        </tr>
      </thead>
      <tbody>
        {renderScoreBoardRows()}
      </tbody>
    </Table>
  );
};

export default ScoreBoard;
