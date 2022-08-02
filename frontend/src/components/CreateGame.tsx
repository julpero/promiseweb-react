import React from "react";
import { socket, SocketContext } from "../socket";
import { Form, Field } from "react-final-form";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import SelectInput from "./FormComponents/SelectInput";
import TextInput from "./FormComponents/TextInput";
import CheckboxInput from "./FormComponents/CheckBoxInput";

import { INewGameForm, initialNewGameValues } from "../interfaces/INewGame";
import { INewGame, GAMESTATUS, HIDDENCARDSMODE } from "../interfaces/IGameOptions";

interface FormValidationFields {
  newGameHumanPlayersCount?: string,
  newGameTurnRound?: string,
  newGameEndRound?: string,
  newGameMyName?: string,
  password1?: string,
}

class CreateGame extends React.Component {
  static socket = SocketContext;
  initialValues: INewGameForm = initialNewGameValues;

  onSubmit = (values: INewGameForm) => {
    const gameOptions = this.createGameOptions(values);
    socket.emit("create game", gameOptions);
  }

  hiddenCardsModeToEnum = (selected: string): HIDDENCARDSMODE => {
    switch (selected) {
      case "1": return HIDDENCARDSMODE.only_card_in_charge;
      case "2": return HIDDENCARDSMODE.card_in_charge_and_winning;
      default: return HIDDENCARDSMODE.normal;
    }
  }

  createGameOptions = (values: INewGameForm): INewGame => {
    return {
      humanPlayersCount: parseInt(values.newGameHumanPlayersCount, 10),
      botPlayersCount: 0,
      startRound: parseInt(values.newGameStartRound, 10),
      turnRound: parseInt(values.newGameTurnRound, 10),
      endRound: parseInt(values.newGameEndRound, 10),
      adminName: values.newGameMyName,
      userPassword1: values.password1,
      userPassword2: values.password2,
      password: values.newGamePassword,
      gameStatus: GAMESTATUS.Created,
      humanPlayers: [{name: values.newGameMyName, playerId: window.localStorage.getItem('uUID'), active: true}],
      createDateTime: new Date(),
      evenPromisesAllowed: !values.noEvenPromises,
      visiblePromiseRound: !values.hidePromiseRound,
      onlyTotalPromise: values.onlyTotalPromise,
      freeTrump: !values.mustTrump,
      hiddenTrump: values.hiddenTrump,
      speedPromise: values.speedPromise,
      privateSpeedGame: values.privateSpeedGame,
      opponentPromiseCardValue: values.opponentPromiseCardValue,
      opponentGameCardValue: values.opponentGameCardValue,
      thisIsDemoGame: values.thisIsDemoGame,
      hiddenCardsMode: this.hiddenCardsModeToEnum(values.hiddenCardsMode),
    } as INewGame;
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={this.initialValues}
        validate={validateForm}
        render={({handleSubmit, form, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <Field<string>
                  name="newGameHumanPlayersCount"
                  component={SelectInput}
                  label="Total number of human players"
                >
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Field>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Field<string>
                  name="newGameStartRound"
                  component={SelectInput}
                  label="Start round of the game"
                >
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Field>
              </div>
              <div className="col">
                <Field<string>
                  name="newGameTurnRound"
                  component={SelectInput}
                  label="Turn round of the game"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Field>
              </div>
              <div className="col">
                <Field<string>
                  name="newGameEndRound"
                  component={SelectInput}
                  label="End round of the game"
                >
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </Field>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Field<string>
                  name="newGameMyName"
                  component={TextInput}
                  label="My (nick)name in the game"
                />
              </div>
              <div className="col">
                <Field<string>
                  name="password1"
                  component={TextInput}
                  label="Password"
                  ispassword="true"
                />
              </div>
              <div className="col">
                <Field<string>
                  name="password2"
                  component={TextInput}
                  label="Re-type password if first time user"
                  ispassword="true"
                />
              </div>
            </div>
            <Card>
              <Card.Header>
                Game Rules
              </Card.Header>
              <Card.Body>
                <div className="content">
                  <div className="row">
                    <div className="col">
                      <Field
                        name="noEvenPromises"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Do not allow even promises"
                        value={form.getFieldState("noEvenPromises")?.value}
                        onChange={(checked: boolean) => {
                          form.change("noEvenPromises", checked);
                        }}
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="hidePromiseRound"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Hidden promise round"
                        value={form.getFieldState("hidePromiseRound")?.value}
                        onChange={(checked: boolean) => {
                          form.change("hidePromiseRound", checked);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Field
                        name="onlyTotalPromise"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Show only total promises"
                        value={form.getFieldState("onlyTotalPromise")?.value}
                        onChange={(checked: boolean) => {
                          form.change("onlyTotalPromise", checked);
                        }}
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="mustTrump"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Must play trump"
                        value={form.getFieldState("mustTrump")?.value}
                        onChange={(checked: boolean) => {
                          form.change("mustTrump", checked);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Field
                        name="hiddenTrump"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Trump is hidden when promising"
                        value={form.getFieldState("hiddenTrump")?.value}
                        onChange={(checked: boolean) => {
                          form.change("hiddenTrump", checked);
                        }}
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="speedPromise"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Speed promise"
                        value={form.getFieldState("speedPromise")?.value}
                        onChange={(checked: boolean) => {
                          form.change("speedPromise", checked);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Field
                        name="privateSpeedGame"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Private speed game"
                        value={form.getFieldState("privateSpeedGame")?.value}
                        onChange={(checked: boolean) => {
                          form.change("privateSpeedGame", checked);
                        }}
                      />
                    </div>
                    <div className="col">
                    <Field<string>
                      name="hiddenCardsMode"
                      issmall="true"
                      component={SelectInput}
                    >
                      <option value="0">show cards normally</option>
                      <option value="1">show only card in charge</option>
                      <option value="2">show card in charge and winning card</option>
                    </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Field
                        name="opponentPromiseCardValue"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Show hand value when promising"
                        value={form.getFieldState("opponentPromiseCardValue")?.value}
                        onChange={(checked: boolean) => {
                          form.change("opponentPromiseCardValue", checked);
                        }}
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="opponentGameCardValue"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Show hand value in the game"
                        value={form.getFieldState("opponentGameCardValue")?.value}
                        onChange={(checked: boolean) => {
                          form.change("opponentGameCardValue", checked);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Field
                        name="thisIsDemoGame"
                        type="checkbox"
                        component={CheckboxInput}
                        label="This is demo game"
                        value={form.getFieldState("thisIsDemoGame")?.value}
                        onChange={(checked: boolean) => {
                          form.change("thisIsDemoGame", checked);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="row">
              <div className="col">
                <Field<string>
                  name="newGamePassword"
                  component={TextInput}
                  label="Password for the new game, leave empty if this is a public game"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <hr />
                <Button variant="success" type="submit" disabled={submitting}>Create Game</Button>
              </div>
            </div>
          </form>
        )}
      />
    )
  }
}

const validateForm = (values: INewGameForm) => {
  const errors: FormValidationFields = {};

  const startRound = parseInt(values.newGameStartRound, 10);
  const turnRound = parseInt(values.newGameTurnRound, 10);
  const endRound = parseInt(values.newGameEndRound, 10);
  if (turnRound > startRound) {
    errors.newGameTurnRound = "Turn round must be equal or less than start round";
  }
  if (endRound < turnRound) {
    errors.newGameEndRound = "End round must be equal or greater than turn round";
  }

  if (values.password1.length < 4) {
    errors.password1 = "Password must be at least four characters long";
  }

  if (values.newGameMyName.length < 4) {
    errors.newGameMyName = "Your (nick)name must be at least four characters long";
  }

  if (parseInt(values.newGameHumanPlayersCount, 10) > 5 && (startRound > 8 || endRound > 8)) {
    errors.newGameHumanPlayersCount = "For six players eight is maximum start and end round";
  }

  return errors;
}

export default CreateGame;
