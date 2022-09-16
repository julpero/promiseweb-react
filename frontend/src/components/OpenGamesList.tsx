import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form, Field } from "react-final-form";
import { useSocket } from "../socket";
import GameItem from "./GameItem";
import {
  IuiGameListItem,
  IuiGetGameListRequest,
  IuiGetGameListResponse,
  IuiJoinLeaveGameRequest,
  IuiJoinLeaveGameResponse,
  JOIN_LEAVE_RESULT
} from "../interfaces/IuiGameList";
import TextInput from "./FormComponents/TextInput";
import { Modal } from "react-bootstrap";
import { FormApi } from "final-form";
import { LOGIN_RESPONSE } from "../interfaces/IuiUser";

interface IFormValidationFields {
  myName?: string,
  password1?: string,
  password2?: string,
  gamePassword?: string,
}

interface IFormFields {
  myName: string,
  password1: string,
  password2: string,
  gamePassword?: string,
}

type MethodType = null | "join" | "leave";

const OpenGamesList = () => {
  const [ gameId, setGameId] = useState("");
  const [ method, setMethod] = useState<MethodType>(null);
  const [ gameItemList, setGameItemList ] = useState<IuiGameListItem[]>([]);
  const [ loginStatus, setLoginStatus ] = useState<LOGIN_RESPONSE | null>(null);
  const [ joinLeaveStatus, setJoinLeaveStatus ] = useState<JOIN_LEAVE_RESULT | null>(null);

  const { socket } = useSocket();

  const callBackList = useRef<(() => void)[]>([]);

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  const fetchGameItemList = useCallback(() => {
    const gameListRequest: IuiGetGameListRequest = { myId: getMyId() };
    socket.emit("get open games", gameListRequest, (gameList: IuiGetGameListResponse) => {
      console.log("gameList", gameList);
      setGameItemList(gameList.games);
    });
  }, [socket]);

  useEffect(() => {
    fetchGameItemList();
    socket.on("new game created", (id) => {
      console.log("new game id", id);
      fetchGameItemList();
    });

    socket.on("game list updated", () => {
      fetchGameItemList();
    });

    return () => {
      socket.off("new game created");
      socket.off("game list updated");
    };
  }, [socket, fetchGameItemList]);

  useEffect(() => {
    if (method !== null) {
      console.log("method", method);
      callBackList.current.forEach(cb => cb());
      callBackList.current = [];
    }
  }, [method]);

  const joinGameMethod = (gameId: string, form: FormApi<IFormFields, Partial<IFormFields>>) => {
    callBackList.current.push(form.submit);
    setGameId(gameId);
    setMethod("join");
  };

  const leaveGameMethod = (gameId: string, form: FormApi<IFormFields, Partial<IFormFields>>) => {
    callBackList.current.push(form.submit);
    setGameId(gameId);
    setMethod("leave");
  };

  const createGameErrorStr = (): string => {
    switch (loginStatus) {
      case LOGIN_RESPONSE.passwordFails: {
        return "Password doesn't match!";
      }
      case LOGIN_RESPONSE.passwordMismatch: {
        return "Password doesn't match!";
      }
      case LOGIN_RESPONSE.password2Empty: {
        return "New username, enter password to both fields!";
      }
      case LOGIN_RESPONSE.passwordShort: {
        return "Password must be at least four characters long!";
      }
    }
    return "Unexpected error";
  };

  const handleErrorClose = (): void => {
    setLoginStatus(null);
    setJoinLeaveStatus(null);
    setMethod(null);
  };

  const createGameErrorHeaderStr = (): string => {
    if (loginStatus) {
      return "Check your password";
    }
    return "Error";
  };

  const joinGame = (joinGameRequest: IuiJoinLeaveGameRequest) => {
    socket.emit("join game", joinGameRequest, (response: IuiJoinLeaveGameResponse) => {
      console.log("join response", response);
      setLoginStatus(response.loginStatus);
      setJoinLeaveStatus(response.joinLeaveResult);
      if (response.loginStatus !== LOGIN_RESPONSE.ok || response.joinLeaveResult === JOIN_LEAVE_RESULT.notOk) {
        fetchGameItemList();
      }
    });
  };

  const leaveGame = (leaveGameRequest: IuiJoinLeaveGameRequest) => {
    socket.emit("leave game", leaveGameRequest, (response: IuiJoinLeaveGameResponse) => {
      console.log("leave response", response);
      setLoginStatus(response.loginStatus);
      setJoinLeaveStatus(response.joinLeaveResult);
      if (response.loginStatus !== LOGIN_RESPONSE.ok || response.joinLeaveResult === JOIN_LEAVE_RESULT.notOk) {
        fetchGameItemList();
      }
    });
  };

  const renderGameItems = (form: FormApi<IFormFields, Partial<IFormFields>>) => {
    if (gameItemList.length === 0) {
      return "No open games at the moment, why don't you just create one by your self?";
    }
    return gameItemList.map(({created, id, rules, humanPlayers, imInTheGame, playerCount, gameHasPassword}: IuiGameListItem) => {
      return(
        <GameItem
          key={id}
          created={created}
          id={id}
          rules={rules}
          humanPlayers={humanPlayers}
          imInTheGame={imInTheGame}
          playerCount= {playerCount}
          gameHasPassword={gameHasPassword}
          onJoin={() => {joinGameMethod(id, form);}}
          onLeave={() => {leaveGameMethod(id, form);}}
        />
      );
    });
  };

  const onSubmit = (values: IFormFields) => {
    console.log("onSubmit", values);
    if (gameId.length > 0 && method !== null) {
      const request: IuiJoinLeaveGameRequest = {
        myId: getMyId(),
        gameId: gameId,
        myName: values.myName,
        password1: values.password1,
        password2: values.password2,
        gamePassword: values.gamePassword ?? "",
        method: method,
      };
      switch (method) {
        case "join": {
          joinGame(request);
          break;
        }
        case "leave": {
          leaveGame(request);
          break;
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({handleSubmit, form }) => (
          <form onSubmit={ handleSubmit }>
            <div className="row">
              <div className="col">
                <Field<string>
                  name="myName"
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
            <div className="row">
              <div className="col">
                {renderGameItems(form)}
              </div>
            </div>
            <input type="hidden" name="gameId" />
          </form>
        )}
      />
      <Modal
        show={((loginStatus || (joinLeaveStatus !== null && joinLeaveStatus === JOIN_LEAVE_RESULT.notOk))) as boolean }
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
    </React.Fragment>
  );
};

const validateForm = (values: IFormFields ) => {
  console.log("validating form");
  const errors: IFormValidationFields = {};

  if (!values.password1 || values.password1.length < 3) {
    errors.password1 = "Password must be at least four characters long";
  }

  if (!values.myName || values.myName.length < 3) {
    errors.myName = "Your (nick)name must be at least three characters long";
  }

  if (values.password2?.length > 0 && values.password1 !== values.password2) {
    errors.password2 = "Password doesn't match!";
  }

  return errors;
};

export default OpenGamesList;
