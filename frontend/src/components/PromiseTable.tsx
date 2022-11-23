import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";
import { getCurrentGameInfo } from "../store/gameInfoSlice";

import { Table } from "react-bootstrap";
import { IuiPlayerPromise } from "../interfaces/IuiPlayingGame";
import ReactTooltip from "react-tooltip";
import { colorize, isRuleActive } from "../common/commonFunctions";
import { RULE } from "../interfaces/IuiGameOptions";

/**
 * Promises made, table in bottom screen
 */
const PromiseTable = () => {
  // console.log("PromiseTable");
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const currentGameInfo = useSelector(getCurrentGameInfo);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  if (!currentRoundInfo.gameId) return null;
  const promiseTable = currentRoundInfo.roundToPlayer.promiseTable;

  const renderTotalPromiseTooltip = (roundIndAsStr: string) => {
    if (!roundIndAsStr) return null;
    const roundInd = parseInt(roundIndAsStr, 10);
    const {cardsInRound, totalPromise} = promiseTable.rounds[roundInd];
    const promiseState = cardsInRound - (totalPromise ?? 0);
    let promiseStateString = "Even promised";
    if (promiseState > 0) promiseStateString = "Under promised";
    if (promiseState < 0) promiseStateString = "Over promised";

    return (
      <div>
        {promiseStateString} {totalPromise ?? 0} / {cardsInRound}
      </div>
    );
  };

  const renderPlayerPromiseTooltip = (promisesAsStr: string) => {
    if (!promisesAsStr) return null;
    const promises = promisesAsStr.split("|");
    if (promises.length !== 3) return null;
    const [promised, keep, points] = promises;
    const promiseState = parseInt(keep, 10) - (parseInt(promised, 10) ?? 0);
    let promiseStateString = "Kept";
    if (promiseState > 0) promiseStateString = "Over";
    if (promiseState < 0) promiseStateString = "Under";

    return (
      <div>
        {promiseStateString} {keep} / {promised ?? 0}
        <br />
        {points} points
      </div>
    );
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
    const {promise: promised, keep} = promise;
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
            <th key={idx} data-for="promisesThTooltip" data-tip={idx} className={promiseHeaderClass(idx)}>
              {round.cardsInRound}
            </th>
          );
        }
      })
    );
  };

  const renderPlayerPromises = (idx: number) => {
    if (!promiseTable) return null;
    return (
      promiseTable.promisesByPlayers[idx].map((promise, idx) => {
        if (promise.promise === null) {
          return (
            <td key={idx} className={playerPromiseClass(idx, promise)}>
              {promise.promise}
            </td>
          );
        } else {
          return (
            <td key={idx} data-for="promisesTdTooltip" data-tip={`${promise.promise}|${promise.keep}|${promise.points ?? ""}`} className={playerPromiseClass(idx, promise)}>
              {promise.promise}
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
            <th className="tableCell tableHeading" style={{"backgroundImage": `linear-gradient(90deg, ${colorize(player)}, ${bgColor})`}}>
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
    <div id="promisetableArea">
      <ReactTooltip id="promisesThTooltip" getContent={(dataTip) => renderTotalPromiseTooltip(dataTip)} />
      <ReactTooltip id="promisesTdTooltip" getContent={(dataTip) => renderPlayerPromiseTooltip(dataTip)} />
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
  );
};

export default PromiseTable;
