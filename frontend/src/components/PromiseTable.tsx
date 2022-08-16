import React from "react";
import { Table } from "react-bootstrap";
import { IuiPromiseTable } from "../interfaces/IuiPlayingGame";

interface IProps {
  promiseTable: IuiPromiseTable | null | undefined,
}

/**
 * Promises made, table in bottom screen
 */
const PromiseTable = (props: IProps) => {
  const renderPromiseTableHeader = () => {
    if (!props.promiseTable) return null;
    return (
      props.promiseTable.rounds.map((round, idx) => {
        return <th key={idx}>{idx+1}</th>;
      })
    );
  };

  const renderPlayerPromises = (idx: number) => {
    if (!props.promiseTable) return null;
    return (
      props.promiseTable.promisesByPlayers[idx].map((promise, idx) => {
        return <td key={idx}>{promise.promise}</td>;
      })
    );
  };

  const renderPromiseTableBody = () => {
    if (!props.promiseTable) return null;
    return (
      props.promiseTable.players.map((player, idx) => {
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
