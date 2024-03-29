import React, { useRef } from "react";
import { HIDDEN_CARDS_MODE } from "../interfaces/IuiGameOptions";
import { IuiGameListItem } from "../interfaces/IuiGameList";
import { hiddenCardsModeToStr } from "../common/enumFunctions";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RuleList from "./RuleList";
import Form from "react-bootstrap/Form";

interface IProps {
  onJoin: (gamePassword?: string) => void,
  onLeave: () => void,
  imInTheGame: boolean,
  disabledButtons: boolean,
}

const GameItem = (props: IuiGameListItem & IProps) => {
  const passRef = useRef<HTMLInputElement | null>(null);

  const joinGameClick = (): void => {
    props.onJoin(passRef.current?.value);
  };

  const leaveGameClick = (): void => {
    props.onLeave();
  };

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false
  };

  const renderDateStr = (dateAsStr: string): string => {
    const dateAsDate = new Date(dateAsStr);
    return dateAsDate.toLocaleString("fi-FI", dateFormatOptions);
  };

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderHiddenCardsMode = () => {
    if (props.rules.hiddenCardsMode === HIDDEN_CARDS_MODE.normal) return null;
    return <li>{hiddenCardsModeToStr(props.rules.hiddenCardsMode)}</li>;
  };

  const renderCreatedAndTurns = () => {
    return (
      <React.Fragment>
        <div>
          {renderDateStr(props.created.toString())}
        </div>
        <div>
          rounds: {props.rules.roundInfo.startRound.toString()}-{props.rules.roundInfo.turnRound.toString()}-{props.rules.roundInfo.endRound.toString()}
        </div>
      </React.Fragment>
    );
  };

  const renderEmptyPlayers = () => {
    const emptyPlayers: JSX.Element[] = [];
    for (let i = props.humanPlayers.length; i < props.playerCount; i++) {
      emptyPlayers.push(<li key={i}>[ ]</li>);
    }
    return emptyPlayers;
  };

  const renderPlayerList = () => {
    return props.humanPlayers.map(player => {
      return <li className="playersInGame" key={player}>{player}</li>;
    });
  };

  const renderPlayers = () => {
    return (
      <ul>
        {renderPlayerList()}
        {renderEmptyPlayers()}
      </ul>
    );
  };

  const renderPasswordField = () => {
    if (props.gameHasPassword) {
      return (
        <div>
          <Form.Control
            ref={passRef}
            name="gamepassword"
            placeholder="Enter game password"
            type="password"
            disabled={props.imInTheGame}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderButtons = () => {
    return (
      <div className="d-grid gap-2">
        <Button
          variant="success"
          onClick={joinGameClick}
          disabled={props.imInTheGame || props.disabledButtons}
        >JOIN GAME - created by <i>{props.creator}</i></Button>
        <Button
          variant="warning"
          onClick={leaveGameClick}
          disabled={!props.imInTheGame || props.disabledButtons}
        >LEAVE GAME - created by <i>{props.creator}</i></Button>
      </div>
    );
  };

  return (
    <Card>
      <Card.Body>
        <div className="row">
          <div className="col-2">
            {renderCreatedAndTurns()}
          </div>
          <div className="col-3">
            <RuleList rules={props.rules} />
          </div>
          <div className="col-2">
            {renderPlayers()}
          </div>
          <div className="col-5">
            {renderPasswordField()}
            {renderButtons()}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameItem;
