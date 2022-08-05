import React from "react";
import { HIDDEN_CARDS_MODE } from "../interfaces/IGameOptions";
import { IGameListItem } from "../interfaces/IGameList";
import { ruleToStr, hiddenCardsModeToStr } from "../common/enumFunctions";
import { Card } from "react-bootstrap";
import { Field } from "react-final-form";
import TextInput from "./FormComponents/TextInput";
import Button from 'react-bootstrap/Button';

interface IProps {
  onJoin: any,
  onLeave: any,
  joinedGameId: string,
}

class GameItem extends React.Component<IGameListItem & IProps, {}> {
  dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false
  };

  renderDateStr = (dateAsStr: string): string => {
    const dateAsDate = new Date(dateAsStr);
    return dateAsDate.toLocaleString("fi-FI", this.dateFormatOptions);
  }

  renderRuleList = () => {
    return this.props.rules.ruleList.map((rule) => {
      return (
        <li key={rule.toString()}>{ruleToStr(rule)}</li>
      );
    });
  }

  renderHiddenCardsMode = () => {
    if (this.props.rules.hiddenCardsMode === HIDDEN_CARDS_MODE.normal) return null;
    return <li>{hiddenCardsModeToStr(this.props.rules.hiddenCardsMode)}</li>
  }

  renderRules = () => {
    if (this.props.rules.ruleList.length === 0 && this.props.rules.hiddenCardsMode === HIDDEN_CARDS_MODE.normal) {
      return null;
    } else {
      return(
        <ul>
          {this.renderRuleList()}
        </ul>
      );
    }
  }

  renderCreatedAndTurns = () => {
    return (
      <React.Fragment>
        <div>
          {this.renderDateStr(this.props.created.toString())}
        </div>
        <div>
          rounds: {this.props.rules.roundInfo.startRound.toString()}-{this.props.rules.roundInfo.turnRound.toString()}-{this.props.rules.roundInfo.endRound.toString()}
        </div>
      </React.Fragment>
    );
  }

  renderEmptyPlayers = () => {
    const emptyPlayers: any[] = [];
    for (let i = this.props.humanPlayers.length; i < this.props.playerCount; i++) {
      emptyPlayers.push(<li key={i}>[ ]</li>);
    }
    return emptyPlayers;
  }

  renderPlayerList = () => {
    return this.props.humanPlayers.map(player => {
      return <li key={player}>{player}</li>;
    });
  }

  renderPlayers = () => {
    return (
      <ul>
        {this.renderPlayerList()}
        {this.renderEmptyPlayers()}
      </ul>
    )
  }

  renderPasswordField = () => {
    if (this.props.gameHasPassword) {
      return (
        <div>
          <Field<string>
            name="gamepassword"
            component={TextInput}
            label="Enter game password"
            ispassword="true"
            disabled={this.props.imInTheGame || this.props.joinedGameId.length > 0}
          />
          <hr />
        </div>
      )
    } else {
      return null;
    }
  }

  renderButtons = () => {
    return (
      <div className="d-grid gap-2">
        <Button
          variant="success"
          onClick={this.props.onJoin}
          disabled={this.props.imInTheGame || this.props.joinedGameId.length > 0}
        >JOIN GAME</Button>
        <Button
          variant="warning"
          onClick={this.props.onLeave}
          disabled={!this.props.imInTheGame}
        >LEAVE GAME</Button>
      </div>
    );
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-2">
              {this.renderCreatedAndTurns()}
            </div>
            <div className="col-3">
              {this.renderRules()}
            </div>
            <div className="col-2">
              {this.renderPlayers()}
            </div>
            <div className="col-5">
              {this.renderPasswordField()}
              {this.renderButtons()}
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

export default GameItem;
