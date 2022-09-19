import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form } from "react-final-form";
import { useSocket } from "../socket";
import GameItem from "./GameItem";
import {
  IuiGameListItem,
  IuiGetGameListResponse,
  IuiJoinLeaveGameRequest,
  IuiJoinLeaveGameResponse,
  JOIN_LEAVE_RESULT
} from "../interfaces/IuiGameList";
import { Modal } from "react-bootstrap";
import { FormApi } from "final-form";
import { IuiUserData, LOGIN_RESPONSE } from "../interfaces/IuiUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { handleUnauthenticatedRequest } from "../common/userFunctions";

interface IFormFields {
  gamePassword?: string,
}

type MethodType = null | "join" | "leave";

const OpenGamesList = () => {
  const [ gameId, setGameId] = useState("");
  const [ method, setMethod] = useState<MethodType>(null);
  const [ gameItemList, setGameItemList ] = useState<IuiGameListItem[]>([]);
  const [ loginStatus, setLoginStatus ] = useState<LOGIN_RESPONSE | null>(null);
  const [ joinLeaveStatus, setJoinLeaveStatus ] = useState<JOIN_LEAVE_RESULT | null>(null);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const callBackList = useRef<(() => void)[]>([]);

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const fetchGameItemList = useCallback(() => {
    if (user.isUserLoggedIn) {
      const gameListRequest: IuiUserData = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };
      socket.emit("get open games", gameListRequest, (gameList: IuiGetGameListResponse) => {
        console.log("gameList", gameList);
        if (gameList.isAuthenticated) {
          window.localStorage.setItem("token", gameList.token ?? "");
          setGameItemList(gameList.games);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [user, dispatch, socket]);

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
      if (response.isAuthenticated) {
        window.localStorage.setItem("token", response.token ?? "");
        setLoginStatus(response.loginStatus);
        setJoinLeaveStatus(response.joinLeaveResult);
        if (response.loginStatus !== LOGIN_RESPONSE.ok || response.joinLeaveResult === JOIN_LEAVE_RESULT.notOk) {
          fetchGameItemList();
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
  };

  const leaveGame = (leaveGameRequest: IuiJoinLeaveGameRequest) => {
    socket.emit("leave game", leaveGameRequest, (response: IuiJoinLeaveGameResponse) => {
      console.log("leave response", response);
      if (response.isAuthenticated) {
        window.localStorage.setItem("token", response.token ?? "");
        setLoginStatus(response.loginStatus);
        setJoinLeaveStatus(response.joinLeaveResult);
        if (response.loginStatus !== LOGIN_RESPONSE.ok || response.joinLeaveResult === JOIN_LEAVE_RESULT.notOk) {
          fetchGameItemList();
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
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
    if (user.isUserLoggedIn && gameId.length > 0 && method !== null) {
      const request: IuiJoinLeaveGameRequest = {
        uuid: getMyId(),
        token: getToken(),
        gameId: gameId,
        userName: user.userName,
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
        render={({handleSubmit, form }) => (
          <form onSubmit={ handleSubmit }>
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

export default OpenGamesList;
