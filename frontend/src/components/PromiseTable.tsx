import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";
import { getCurrentGameInfo } from "../store/gameInfoSlice";

import { Table } from "react-bootstrap";
import { IuiPlayerPromise } from "../interfaces/IuiPlayingGame";

import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { colorize, getTextColorForName, hexToRgb, isRuleActive } from "../common/commonFunctions";
import { RULE } from "../interfaces/IuiGameOptions";

/**
 * Promises made, table in bottom screen
 */
const PromiseTable = () => {
  // console.log("PromiseTable");
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const currentGameInfo = useSelector(getCurrentGameInfo);

  if (!currentRoundInfo.gameId) return null;
  const promiseTable = currentRoundInfo.roundToPlayer.promiseTable;

  const renderTotalPromiseTooltip = (roundInd: number): string => {
    const {cardsInRound, totalPromise} = promiseTable.rounds[roundInd];
    const promiseState = cardsInRound - (totalPromise ?? 0);
    let promiseStateString = "Even promised";
    if (promiseState > 0) promiseStateString = "Under promised";
    if (promiseState < 0) promiseStateString = "Over promised";

    return `${promiseStateString} ${totalPromise ?? 0} / ${cardsInRound}`;
  };

  const renderPlayerPromiseTooltip = (promisesAsStr: string): string => {
    if (!promisesAsStr) return "";
    const promises = promisesAsStr.split("|");
    if (promises.length !== 4) return "";
    const [promised, keep, points, evenBreakingBonus] = promises;
    const promiseState = parseInt(keep, 10) - (parseInt(promised, 10) ?? 0);
    let promiseStateString = "Kept";
    if (promiseState > 0) promiseStateString = "Over";
    if (promiseState < 0) promiseStateString = "Under";

    promiseStateString += ` ${keep} / ${promised ?? 0}<br />${points} points`;
    if (evenBreakingBonus && evenBreakingBonus !== "null") {
      promiseStateString += `<br />${`includes ${evenBreakingBonus} bonus points`}`;
    }

    return promiseStateString;
  };

  const promiseHeaderClass = (roundInd: number): string => {
    const classArr: string[] = ["tableHeading", "prHead"];
    if (roundInd === currentRoundInfo.roundInd) classArr.push("currentRound");
    const {cardsInRound, totalPromise} = promiseTable.rounds[roundInd];
    if (totalPromise !== null) {
      if (cardsInRound > totalPromise) classArr.push("underPromised");
      if (cardsInRound === totalPromise) classArr.push("evenPromised");
      if (cardsInRound < totalPromise) classArr.push("overPromised");
    }
    return classArr.join(" ");
  };

  const playerPromiseClass = (roundInd: number, promise: IuiPlayerPromise): string => {
    const classArr: string[] = ["tableCell"];
    if (roundInd === currentRoundInfo.roundInd) classArr.push("currentRound");
    const {promise: promised, keep, evenBreakingBonus} = promise;
    if (evenBreakingBonus !== null) classArr.push("evenBreakingBonus");
    if (promised !== null) {
      if (promised > keep) classArr.push("underKept");
      if (promised === keep) classArr.push("evenKept");
      if (promised < keep) classArr.push("overKept");
    }
    return classArr.join(" ");
  };

  const renderPromiseTableHeader = () => {
    if (!promiseTable) return null;
    return (
      promiseTable.rounds.map((round, idx) => {
        if (round.totalPromise === null) {
          return (
            <th key={idx} className={promiseHeaderClass(idx)}>
              {round.cardsInRound}
            </th>
          );
        } else {
          return (
            <th key={idx} data-for="promisesThTooltip" className={promiseHeaderClass(idx)}>
              <TooltipWrapper tooltipId="promisesThTooltip" content={renderTotalPromiseTooltip(idx)}>
                {round.cardsInRound}
              </TooltipWrapper>
            </th>
          );
        }
      })
    );
  };

  const renderPlayerPromises = (playerIdx: number) => {
    if (!promiseTable) return null;
    return (
      promiseTable.promisesByPlayers[playerIdx].map((promise, idx) => {
        if (promise.promise === null) {
          return (
            <td key={idx} className={playerPromiseClass(idx, promise)}>
              {promise.promise}
            </td>
          );
        } else {
          return (
            <td
              key={idx}
              className={playerPromiseClass(idx, promise)}
            >
              <TooltipWrapper tooltipId="promisesTdTooltip" html={renderPlayerPromiseTooltip(`${promise.promise}|${promise.keep}|${promise.points ?? ""}|${promise.evenBreakingBonus}`)}>
                {promise.promise}
              </TooltipWrapper>
            </td>
          );
        }
      })
    );
  };

  const renderPromiseTableBody = () => {
    if (!promiseTable) return null;
    const bgColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
    return (
      promiseTable.players.map((player, idx) => {
        return (
          <tr key={idx}>
            <th className="tableCell tableHeading" style={{"backgroundImage": `linear-gradient(90deg, ${colorize(player)}, ${bgColor})`, "color": getTextColorForName(hexToRgb(colorize(player)))}}>
              {player.substring(0, 10)}
            </th>
            {renderPlayerPromises(idx)}
          </tr>
        );
      })
    );
  };

  const renderRoundTotalPromise = () => {
    if (!promiseTable || !isRuleActive(currentGameInfo.rules, RULE.onlyTotalPromise)) return null;
    const currentRoundInd = currentRoundInfo.roundInd;
    const retStr = "Tot.Pro:";
    if (promiseTable.rounds[currentRoundInd].totalPromise !== null) {
      return `${retStr} ${promiseTable.rounds[currentRoundInd].totalPromise}`;
    }
    return `${retStr} -`;
  };

  return (
    <TooltipProvider>
      <div id="promisetableArea">
        <Tooltip id="promisesThTooltip" />
        <Tooltip id="promisesTdTooltip" />
        <Table size="sm">
          <thead>
            <tr>
              <td className="totalPromiseCell">{renderRoundTotalPromise()}</td>
              {renderPromiseTableHeader()}
            </tr>
          </thead>
          <tbody>
            {renderPromiseTableBody()}
          </tbody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default PromiseTable;
