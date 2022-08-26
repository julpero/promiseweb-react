import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { IuiPlayerPromise } from "../interfaces/IuiPlayingGame";

/**
 * Promises made, table in bottom screen
 */
const PromiseTable = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  if (!currentRoundInfo.gameId) return null;
  const promiseTable = currentRoundInfo.roundToPlayer.promiseTable;

  const renderThTooltip = (props: any) => {
    return (
      <Tooltip id="thTooltip" { ...props }>
        Testi
      </Tooltip>
    );
  };

  const promiseHeaderClass = (roundInd: number): string => {
    const classArr: string[] = ["tableHeading"];
    const {cardsInRound, totalPromise} = promiseTable.rounds[roundInd];
    if (totalPromise !== null) {
      if (cardsInRound > totalPromise) classArr.push("underPromised");
      if (cardsInRound === totalPromise) classArr.push("evenPromised");
      if (cardsInRound < totalPromise) classArr.push("overPromised");
    }
    return classArr.join(" ");
  };

  const playerPromiseClass = (promise: IuiPlayerPromise): string => {
    const classArr: string[] = ["tableCell"];
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
        return (
          <th key={idx} className={promiseHeaderClass(idx)}>
            <OverlayTrigger placement="bottom" delay={{show: 100, hide: 200}} overlay={renderThTooltip}>
              <span>{round.cardsInRound}</span>
            </OverlayTrigger>
          </th>
        );
      })
    );
  };

  const renderPlayerPromises = (idx: number) => {
    if (!promiseTable) return null;
    return (
      promiseTable.promisesByPlayers[idx].map((promise, idx) => {
        return <td key={idx} className={playerPromiseClass(promise)}>{promise.promise}</td>;
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
