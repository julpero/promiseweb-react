import React, { useState } from "react";
import { useSocket } from "../socket";
import { Form, Field } from "react-final-form";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

import SelectInput from "./FormComponents/SelectInput";
import TextInput from "./FormComponents/TextInput";
import CheckboxInput from "./FormComponents/CheckBoxInput";

import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { IuiNewGameForm, initialNewGameValues, IuiCreateGameRequest, IuiCreateGameResponse, CREATE_GAME_STATUS } from "../interfaces/IuiNewGame";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";

interface IFormValidationFields {
  newGameHumanPlayersCount?: string,
  newGameTurnRound?: string,
  newGameEndRound?: string,
}

interface IProps {
  onCreateGame: () => void,
}

const CreateGame = (props: IProps) => {
  const [ createGameStatus, setCreateGameStatus ] = useState<CREATE_GAME_STATUS | null>(null);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const initialValues: IuiNewGameForm = initialNewGameValues;

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const onSubmit = (values: IuiNewGameForm) => {
    if (user.isUserLoggedIn) {
      setIsSubmitting(true);
      const uuid: string = getMyId();
      const newGameRequest: IuiCreateGameRequest = {...values, uuid, userName: user.userName, token: getToken() };
      socket.emit("create game", newGameRequest, (createGameResponse: IuiCreateGameResponse) => {
        if (createGameResponse.isAuthenticated) {
          handleAuthenticatedRequest(createGameResponse.token);
          setCreateGameStatus(createGameResponse.responseStatus);
          if (createGameResponse.responseStatus === CREATE_GAME_STATUS.ok) {
            // created new game
            props.onCreateGame();
          }
          setIsSubmitting(false);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const createGameErrorHeaderStr = (): string => {
    if (createGameStatus) {
      return "User error";
    }
    return "Error";
  };

  const createGameErrorStr = (): string => {
    switch (createGameStatus) {
      case CREATE_GAME_STATUS.notOk: {
        return "Something went wrong. Check new game settings and try again and / or refresh this page.";
      }
      case CREATE_GAME_STATUS.onGoingGame: {
        return "You have already created game! Leave from it before you can create new one.";
      }
    }
    return "Unexpected error";
  };

  const handleErrorClose = (): void => {
    setCreateGameStatus(null);
  };

  const showModal = (): boolean => {
    return (
      (createGameStatus !== null && createGameStatus !== CREATE_GAME_STATUS.ok)
    );
  };

  const renderRuleTooltip = (rule: string) => {
    switch (rule) {
      case "noEvenPromises": {
        return "Sum of round promises must be different than card count of players";
      }
      case "hidePromiseRound": {
        return "Promises of the other players are visible only after all promises are made.";
      }
      case "onlyTotalPromise": {
        return "Only the total sum of promises is visible.<br />While promising phase, this is same as the &quot;Hidden promise round&quot; rule.";
      }
      case "mustTrump": {
        return "If player has no charging suite but has trump, then player must play trump.";
      }
      case "hiddenTrump": {
        return "Trump card is revealed after all players have made their promise.";
      }
      case "opponentPromiseCardValue": {
        return "Players see other players hand value while promising.";
      }
      case "opponentGameCardValue": {
        return "Players see other players hand value while playing.";
      }
      case "bonusNonEvenPromise": {
        return "If player makes non even promise and keeps his/her own promise,<br />he/she will get two bonus points from every player who doesn&apos;t keep promise.<br />Only ohe player can be even breaker on one round. Dealer can be even breaker if round is under promised.";
      }
      case "thisIsDemoGame": {
        return "This game won&apos;t affect stats.";
      }
    }
    return "";
  };

  return (
    <TooltipProvider>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validateForm}
        render={({handleSubmit, form}) => (
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
            <Card>
              <Card.Header>
                Game Rules
              </Card.Header>
              <Card.Body>
                <div className="content">
                  <div className="row">
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("noEvenPromises")}>
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
                      </TooltipWrapper>
                    </div>
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("hidePromiseRound")}>
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
                      </TooltipWrapper>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("onlyTotalPromise")}>
                        <Field
                          name="onlyTotalPromise"
                          type="checkbox"
                          component={CheckboxInput}
                          label="Show only total promises"
                          value={form.getFieldState("onlyTotalPromise")?.value}
                          onChange={(checked: boolean) => {
                            form.change("onlyTotalPromise", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="onlyTotalPromise"
                        />
                      </TooltipWrapper>
                    </div>
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("mustTrump")}>
                        <Field
                          name="mustTrump"
                          type="checkbox"
                          component={CheckboxInput}
                          label="Must play trump"
                          value={form.getFieldState("mustTrump")?.value}
                          onChange={(checked: boolean) => {
                            form.change("mustTrump", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="mustTrump"
                        />
                      </TooltipWrapper>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("hiddenTrump")}>
                        <Field
                          name="hiddenTrump"
                          type="checkbox"
                          component={CheckboxInput}
                          label="Trump is hidden when promising"
                          value={form.getFieldState("hiddenTrump")?.value}
                          onChange={(checked: boolean) => {
                            form.change("hiddenTrump", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="hiddenTrump"
                        />
                      </TooltipWrapper>
                    </div>
                    <div className="col">
                      <Field
                        disabled
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
                        disabled
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
                        <option disabled value="1">show only card in charge</option>
                        <option disabled value="2">show card in charge and winning card</option>
                      </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("opponentPromiseCardValue")}>
                        <Field
                          name="opponentPromiseCardValue"
                          type="checkbox"
                          component={CheckboxInput}
                          label="Show hand value when promising"
                          value={form.getFieldState("opponentPromiseCardValue")?.value}
                          onChange={(checked: boolean) => {
                            form.change("opponentPromiseCardValue", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="opponentPromiseCardValue"
                        />
                      </TooltipWrapper>
                    </div>
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("opponentGameCardValue")}>
                        <Field
                          name="opponentGameCardValue"
                          type="checkbox"
                          component={CheckboxInput}
                          label="Show hand value in the game"
                          value={form.getFieldState("opponentGameCardValue")?.value}
                          onChange={(checked: boolean) => {
                            form.change("opponentGameCardValue", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="opponentGameCardValue"
                        />
                      </TooltipWrapper>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("bonusNonEvenPromise")}>
                        <Field
                          name="bonusNonEvenPromise"
                          type="checkbox"
                          component={CheckboxInput}
                          label="Bonus points for even breaker"
                          value={form.getFieldState("bonusNonEvenPromise")?.value}
                          onChange={(checked: boolean) => {
                            form.change("bonusNonEvenPromise", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="bonusNonEvenPromise"
                        />
                      </TooltipWrapper>
                    </div>
                    <div className="col">
                      <TooltipWrapper tooltipId="ruleInfoTooltip" html={renderRuleTooltip("thisIsDemoGame")}>
                        <Field
                          name="thisIsDemoGame"
                          type="checkbox"
                          component={CheckboxInput}
                          label="This is demo game"
                          value={form.getFieldState("thisIsDemoGame")?.value}
                          onChange={(checked: boolean) => {
                            form.change("thisIsDemoGame", checked);
                          }}
                          data-for="ruleInfoTooltip"
                          data-tip="thisIsDemoGame"
                        />
                      </TooltipWrapper>
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
                <Button variant="success" type="submit" disabled={isSubmitting}>Create Game</Button>
              </div>
            </div>
          </form>
        )}
      />

      <Modal
        show={showModal()}
        onHide={handleErrorClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {createGameErrorHeaderStr()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createGameErrorStr()}
        </Modal.Body>
      </Modal>
      <Tooltip place="bottom" id="ruleInfoTooltip" noArrow={true} />
    </TooltipProvider>
  );
};

const validateForm = (values: IuiNewGameForm) => {
  const errors: IFormValidationFields = {};

  const startRound = parseInt(values.newGameStartRound, 10);
  const turnRound = parseInt(values.newGameTurnRound, 10);
  const endRound = parseInt(values.newGameEndRound, 10);
  if (turnRound > startRound) {
    errors.newGameTurnRound = "Turn round must be equal or less than start round";
  }
  if (endRound < turnRound) {
    errors.newGameEndRound = "End round must be equal or greater than turn round";
  }

  if (parseInt(values.newGameHumanPlayersCount, 10) > 5 && (startRound > 8 || endRound > 8)) {
    errors.newGameHumanPlayersCount = "For six players eight is maximum start and end round";
  }

  return errors;
};

export default CreateGame;
