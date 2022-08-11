import React from "react";
import { IuiGetRoundResponse } from "../interfaces/IuiPlayingGame";

interface IProps {
  roundInfo: IuiGetRoundResponse | null,
}

/**
 * Promises made, table in bottom screen
 */
class PromiseTable extends React.Component<IProps> {
  render(): React.ReactNode {
    return (
      <div>PromiseTable</div>
    );
  }
}

export default PromiseTable;
