import React from "react";

import { useSelector } from "react-redux";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";

import { Table } from "react-bootstrap";

/**
 * Promises made, table in bottom screen
 */
const PromiseTable = () => {
  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  // if (!currentRoundInfo) return null;
  const promiseTable = currentRoundInfo.roundToPlayer.promiseTable;

  const renderPromiseTableHeader = () => {
    if (!promiseTable) return null;
    return (
      promiseTable.rounds.map((round, idx) => {
        return <th key={idx}>{round.cardsInRound}</th>;
      })
    );
  };

  const renderPlayerPromises = (idx: number) => {
    if (!promiseTable) return null;
    return (
      promiseTable.promisesByPlayers[idx].map((promise, idx) => {
        return <td key={idx}>{promise.promise}</td>;
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
      <Table>
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
