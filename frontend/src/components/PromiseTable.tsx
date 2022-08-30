import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { IuiPlayerPromise } from "../interfaces/IuiPlayingGame";
import { TooltipProps } from "react-bootstrap";

/**
 * Promises made, table in bottom screen
 */
const PromiseTable = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;
  const promiseTable = currentRoundInfo.roundToPlayer.promiseTable;

  const renderThTooltip = (props: TooltipProps, roundInd: number) => {
    const {cardsInRound, totalPromise} = promiseTable.rounds[roundInd];
    const promiseState = cardsInRound - (totalPromise ?? 0);
    let promiseStateString = "Even promised";
    if (promiseState > 0) promiseStateString = "Under promised";
    if (promiseState < 0) promiseStateString = "Over promised";

    return (
      <Tooltip id="thTooltip" { ...props }>
        {promiseStateString} {totalPromise ?? 0} / {cardsInRound}
      </Tooltip>
    );
  };

  const renderPlayerPromiseTooltip = (props: TooltipProps, promise: IuiPlayerPromise) => {
    const {promise: promised, keep} = promise;
    const promiseState = keep - (promised ?? 0);
    let promiseStateString = "Kept";
    if (promiseState > 0) promiseStateString = "Over";
    if (promiseState < 0) promiseStateString = "Under";

    return (
      <Tooltip id="thTooltip" { ...props }>
        {promiseStateString} {keep} / {promised ?? 0}
      </Tooltip>
    );
  };

  const promiseHeaderClass = (roundInd: number): string => {
    const classArr: string[] = ["tableHeading"];
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
              <span>{round.cardsInRound}</span>
            </th>
          );
        } else {
          return (
            <th key={idx} className={promiseHeaderClass(idx)}>
              <OverlayTrigger delay={{show: 100, hide: 200}} overlay={renderThTooltip({placement: "top"}, idx)}>
                <span>{round.cardsInRound}</span>
              </OverlayTrigger>
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
              <span>{promise.promise}</span>
            </td>
          );
        } else {
          return (
            <td key={idx} className={playerPromiseClass(idx, promise)}>
              <OverlayTrigger delay={{show: 100, hide: 200}} overlay={renderPlayerPromiseTooltip({placement: "top"}, promise)}>
                <span>{promise.promise}</span>
              </OverlayTrigger>
            </td>
          );
        }
      })
    );
  };

  const renderPromiseTableBody = () => {
    if (!promiseTable) return null;
    return (
      promiseTable.players.map((player, idx) => {
        return <tr key={idx}><th>{player}</th>{renderPlayerPromises(idx)}</tr>;
      })
    );
  };

  return (
    <div>
      <Table size="sm">
        <thead>
          <tr>
            <th />
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
