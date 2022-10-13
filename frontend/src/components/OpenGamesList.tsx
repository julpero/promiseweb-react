import React, { useEffect, useState, useCallback } from "react";
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
import { IuiUserData, LOGIN_RESPONSE } from "../interfaces/IuiUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";

const OpenGamesList = () => {
  const [ gameItemList, setGameItemList ] = useState<IuiGameListItem[]>([]);
  const [ loginStatus, setLoginStatus ] = useState<LOGIN_RESPONSE | null>(null);
  const [ joinLeaveStatus, setJoinLeaveStatus ] = useState<JOIN_LEAVE_RESULT | null>(null);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

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
        // console.log("gameList", gameList);
        if (gameList.isAuthenticated) {
          handleAuthenticatedRequest(gameList.token);
          setGameItemList(gameList.games);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [user, dispatch, socket]);

  useEffect(() => {
    fetchGameItemList();

    socket.on("new game created", () => {
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

  const joinGameMethod = (gameId: string, password?: string) => {
    const joinGameRequest: IuiJoinLeaveGameRequest = {
      userName: user.userName,
      uuid: getMyId(),
      token: getToken(),
      gameId: gameId,
      gamePassword: password ?? "",
    };
    joinGame(joinGameRequest);
  };

  const leaveGameMethod = (gameId: string) => {
    const leaveGameRequest: IuiJoinLeaveGameRequest = {
      userName: user.userName,
      uuid: getMyId(),
      token: getToken(),
      gameId: gameId,
      gamePassword: "",
    };
    leaveGame(leaveGameRequest);
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
  };

  const createGameErrorHeaderStr = (): string => {
    if (loginStatus) {
      return "Check your password";
    }
    return "Error";
  };

  const joinGame = (joinGameRequest: IuiJoinLeaveGameRequest) => {
    socket.emit("join game", joinGameRequest, (response: IuiJoinLeaveGameResponse) => {
      // console.log("join response", response);
      if (response.isAuthenticated) {
        handleAuthenticatedRequest(response.token);
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
      // console.log("leave response", response);
      if (response.isAuthenticated) {
        handleAuthenticatedRequest(response.token);
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

  const renderGameItems = () => {
    if (gameItemList.length === 0) {
      return "No open games at the moment, why don't you just create one by your self?";
    }
    return gameItemList.map(({created, id, rules, humanPlayers, imInTheGame, playerCount, gameHasPassword, creator}: IuiGameListItem) => {
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
          onJoin={(gamePassword?: string) => {joinGameMethod(id, gamePassword);}}
          onLeave={() => {leaveGameMethod(id);}}
          creator={creator}
        />
      );
    });
  };

  return (
    <React.Fragment>
      {renderGameItems()}

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
