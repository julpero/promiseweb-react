import React from "react";
import { Table } from "react-bootstrap";

import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useSelector } from "react-redux";
import { colorize, getTextColorForName, hexToRgb } from "../common/commonFunctions";
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

  const renderAvgTooltip = (playerAndRoundAndPoints: string): string => {
    if (!playerAndRoundAndPoints) return "";
    const dataArr = playerAndRoundAndPoints.split("|");
    if (dataArr.length !== 3) return "";
    const curPoints = parseInt(dataArr[2], 10);
    let toolTipStr = `Total ${curPoints}`;
    const playerInd = parseInt(dataArr[0], 10);
    const roundInd = parseInt(dataArr[1], 10);
    const avgPoints = playerAvgPoint(playerInd, roundInd);
    if (avgPoints !== null) {
      toolTipStr+= ` = ${(curPoints - avgPoints).toFixed(1)} points in average`;
    }
    return toolTipStr;
  };

  const renderScoreBoardHeader = () => {
    const truncInd = 9 - currentGameInfo.humanPlayersCount;
    const bgColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
    return (
      promiseTable.players.map((playerName, idx) => {
        return (
          <td key={idx} className="tableCell tableHeading" style={{"backgroundImage": `linear-gradient(90deg, ${colorize(playerName)}, ${bgColor})`, "color": getTextColorForName(hexToRgb(colorize(playerName)))}}>
            <TooltipWrapper tooltipId="scoreBoardThTooltip" content={playerName}>
              {playerName.substring(0, truncInd)}
            </TooltipWrapper>
          </td>
        );
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

  const playerAvgPoint = (playerInd: number, roundInd: number): number | null => {
    const thisPlayerName = currentRoundInfo.roundToPlayer.players[playerInd].name;
    const avgStatsPlayer = currentGameInfo.humanPlayers.find(player => player.name === thisPlayerName);
    if (avgStatsPlayer) {
      return avgStatsPlayer.playerStats.playerAvgPointsInRounds[roundInd] ?? null;
    } else {
      return null;
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
          <td key={i} className={classStr}>
            <TooltipWrapper
              tooltipId="scoreBoardAvgTooltip"
              content={renderAvgTooltip(`${i}|${rowInd}|${playersCumulativePointsInRound}`)}
            >
              {str}
            </TooltipWrapper>
          </td>
        );
      } else {
        const avgPoint = playerAvgPoint(i, rowInd);
        if (avgPoint !== null) {
          colArr.push(
            <td className={`${classStr} avgPointCol`} key={i}>{avgPoint.toFixed(1)}</td>
          );
        } else {
          colArr.push(
            <td className={classStr} key={i}>&nbsp;</td>
          );
        }
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
    <TooltipProvider>
      <div id="scoretableArea">
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
        <Tooltip place="left" id="scoreBoardThTooltip" />
        <Tooltip place="left" id="scoreBoardAvgTooltip" />
        <RuleList rules={currentGameInfo.rules} classStr="smallList" />
      </div>
    </TooltipProvider>
  );
};

export default ScoreBoard;
