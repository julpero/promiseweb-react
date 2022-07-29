import React from "react";
import { Form, Field } from "react-final-form";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import SelectInput from "./FormComponents/SelectInput";
import TextInput from "./FormComponents/TextInput";
import CheckboxInput from "./FormComponents/CheckBoxInput";

class CreateGame extends React.Component {
  onSubmit = (values: any) => {
    window.alert(JSON.stringify(values, undefined, 2));
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        {({handleSubmit}) => (
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
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="hidePromiseRound"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Hidden promise round"
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
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="mustTrump"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Must play trump"
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
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="speedPromise"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Speed promise"
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
                      />
                    </div>
                    <div className="col">
                      <Field
                        name="opponentGameCardValue"
                        type="checkbox"
                        component={CheckboxInput}
                        label="Show hand value in the game"
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
                <Button variant="success">Create Game</Button>
              </div>
            </div>
          </form>
        )}
      </Form>
    )
  }
}

export default CreateGame;
