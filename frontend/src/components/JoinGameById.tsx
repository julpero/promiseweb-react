import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse } from "../interfaces/IuiJoinOngoingGame";
import { useSocket } from "../socket";
import TextInput from "./FormComponents/TextInput";

interface IFormValidationFields {
  gameId?: string,
  playerId?: string,
}

interface IProps {
  onJoin: () => void,
}

const JoinGameById = ({onJoin}: IProps) => {
  const [ joinOk, setJoinOk ] = useState(false);
  const [ playerName, setPlayerName ] = useState("");
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const onSubmit = (values: IuiJoinOngoingGame): void => {
    console.log("onSubmit", values);
    socket.emit("join ongoing game", values, (joinResponse: IuiJoinOngoingGameResponse) => {
      console.log("join response", joinResponse);
      if (joinResponse.isAuthenticated) {
        handleAuthenticatedRequest(joinResponse.token);
        if (joinResponse.joinOk) {
          window.localStorage.setItem("uUID", joinResponse.playerId);
          setPlayerName(joinResponse.playerName);
          setJoinOk(joinResponse.joinOk);
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
  };

  const closeAndPlay = () =>  {
    setJoinOk(false);
    onJoin();
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({handleSubmit, submitting}) => (
          <form onSubmit={handleSubmit}>
            <Field<string>
              name="gameId"
              component={TextInput}
              label="GameId"
            />
            <Field<string>
              name="playerId"
              component={TextInput}
              label="PlayerId"
            />
            <hr />
            <Button variant="success" type="submit" disabled={submitting}>Join Game</Button>
          </form>
        )}
      />

      <Modal show={joinOk} onHide={closeAndPlay}>
        <Modal.Header closeButton>
          <Modal.Title>
            Joined game...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have successfully joined the game as a player {playerName}.</p>
          <p>You can now close this dialog and start playing.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closeAndPlay}>Close and Play</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

const validateForm = (values: IuiJoinOngoingGame) => {
  console.log("validating form", values);
  const errors: IFormValidationFields = {};

  if (!values.gameId) {
    errors.gameId = "Enter GameId";
  }
  if (!values.playerId) {
    errors.playerId = "Enter PlayerId";
  }

  return errors;
};

export default JoinGameById;
