import React from "react";
import { Table } from "react-bootstrap";
import { IuiPromiseTable } from "../interfaces/IuiPlayingGame";

interface IProps {
  promiseTable: IuiPromiseTable | null | undefined,
}

/**
 * Promises made, table in bottom screen
 */
class PromiseTable extends React.Component<IProps> {
  renderPromiseTableHeader = () => {
    if (!this.props.promiseTable) return null;
    return (
      this.props.promiseTable.rounds.map((round, idx) => {
        return <th key={idx}>{idx+1}</th>;
      })
    );
  };

  renderPlayerPromises = (idx: number) => {
    if (!this.props.promiseTable) return null;
    return (
      this.props.promiseTable.promisesByPlayers[idx].map((promise, idx) => {
        return <td key={idx}>{promise.promise}</td>;
      })
    );
  };

  renderPromiseTableBody = () => {
    if (!this.props.promiseTable) return null;
    return (
      this.props.promiseTable.players.map((player, idx) => {
        return <tr key={idx}><th>{player}</th>{this.renderPlayerPromises(idx)}</tr>;
      })
    );
  };

  render(): React.ReactNode {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th />
              {this.renderPromiseTableHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderPromiseTableBody()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PromiseTable;
