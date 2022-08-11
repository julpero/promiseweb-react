import React from "react";
import { IGetRoundResponse } from "../interfaces/IPlayingGame";

interface IProps {
  roundInfo: IGetRoundResponse | null,
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
