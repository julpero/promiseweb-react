import React from "react";
import { HIDDEN_CARDS_MODE } from "../interfaces/IuiGameOptions";
import { IuiGameListItem } from "../interfaces/IuiGameList";
import { ruleToStr, hiddenCardsModeToStr } from "../common/enumFunctions";
import { Card } from "react-bootstrap";
import { Field } from "react-final-form";
import TextInput from "./FormComponents/TextInput";
import Button from "react-bootstrap/Button";

interface IProps {
  onJoin: () => void,
  onLeave: () => void,
}

function GameItem (props: IuiGameListItem & IProps) {
  const joinGameClick = (): void => {
    props.onJoin();
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

  const renderRuleList = () => {
    return props.rules.ruleList.map((rule) => {
      return (
        <li key={rule.toString()}>{ruleToStr(rule)}</li>
      );
    });
  };

  // TODO
  const renderHiddenCardsMode = () => {
    if (props.rules.hiddenCardsMode === HIDDEN_CARDS_MODE.normal) return null;
    return <li>{hiddenCardsModeToStr(props.rules.hiddenCardsMode)}</li>;
  };

  const renderRules = () => {
    if (props.rules.ruleList.length === 0 && props.rules.hiddenCardsMode === HIDDEN_CARDS_MODE.normal) {
      return null;
    } else {
      return(
        <ul>
          {renderRuleList()}
        </ul>
      );
    }
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
      return <li key={player}>{player}</li>;
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
          <Field<string>
            name="gamepassword"
            component={TextInput}
            label="Enter game password"
            ispassword="true"
            disabled={props.imInTheGame}
          />
          <hr />
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
          disabled={props.imInTheGame}
        >JOIN GAME</Button>
        <Button
          variant="warning"
          onClick={leaveGameClick}
          disabled={!props.imInTheGame}
        >LEAVE GAME</Button>
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
            {renderRules()}
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
}

export default GameItem;
