import React, { useEffect, useState } from "react";
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
import { IuiUserData } from "../interfaces/IuiUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";

const OpenGamesList = () => {
  const [ gameItemList, setGameItemList ] = useState<IuiGameListItem[]>([]);
  const [ joinLeaveStatus, setJoinLeaveStatus ] = useState<JOIN_LEAVE_RESULT | null>(null);
  const [disabledButtons, setDisabledButtons] = useState(true);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    const fetchGameItemList = () => {
      if (user.isUserLoggedIn) {
        const gameListRequest: IuiUserData = {
          uuid: getMyId(),
          userName: user.userName,
          token: getToken(),
        };
        setDisabledButtons(true);
        socket.emit("get open games", gameListRequest, (gameList: IuiGetGameListResponse) => {
          // console.log("gameList", gameList);
          if (gameList.isAuthenticated) {
            handleAuthenticatedRequest(gameList.token);
            setGameItemList(gameList.games);
          } else {
            handleUnauthenticatedRequest(dispatch);
          }
          setDisabledButtons(false);
        });
      }
    };

    fetchGameItemList();

    socket.on("new game created", (gameList: IuiGameListItem[]) => {
      // console.log("new game created", gameList);
      setGameItemList(gameList);
    });

    socket.on("game list updated", (gameList: IuiGameListItem[]) => {
      // console.log("game list updated", gameList);
      setGameItemList(gameList);
    });

    return () => {
      socket.off("new game created");
      socket.off("game list updated");
    };
  }, [user, dispatch, socket]);

  const joinGameMethod = (gameId: string, password?: string) => {
    if (disabledButtons) return;
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
    if (disabledButtons) return;
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
    return "Unexpected error";
  };

  const handleErrorClose = (): void => {
    setJoinLeaveStatus(null);
  };

  const createGameErrorHeaderStr = (): string => {
    return "Error";
  };

  const joinGame = (joinGameRequest: IuiJoinLeaveGameRequest) => {
    setDisabledButtons(true);
    socket.emit("join game", joinGameRequest, (response: IuiJoinLeaveGameResponse) => {
      // console.log("join response", response);
      if (response.isAuthenticated) {
        handleAuthenticatedRequest(response.token);
        setJoinLeaveStatus(response.joinLeaveResult);
        if (response.games) {
          setGameItemList(response.games);
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
      setDisabledButtons(false);
    });
  };

  const leaveGame = (leaveGameRequest: IuiJoinLeaveGameRequest) => {
    setDisabledButtons(true);
    socket.emit("leave game", leaveGameRequest, (response: IuiJoinLeaveGameResponse) => {
      // console.log("leave response", response);
      if (response.isAuthenticated) {
        handleAuthenticatedRequest(response.token);
        setJoinLeaveStatus(response.joinLeaveResult);
        if (response.games) {
          setGameItemList(response.games);
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
      setDisabledButtons(false);
    });
  };

  const renderGameItems = () => {
    if (gameItemList.length === 0) {
      return "No open games at the moment, why don't you just create one by your self?";
    }
    return gameItemList.map(({created, id, rules, humanPlayers, playerCount, gameHasPassword}: IuiGameListItem) => {
      return(
        <GameItem
          key={id}
          created={created}
          id={id}
          rules={rules}
          humanPlayers={humanPlayers}
          imInTheGame={humanPlayers.some(player => player === user.userName)}
          playerCount= {playerCount}
          gameHasPassword={gameHasPassword}
          onJoin={(gamePassword?: string) => {joinGameMethod(id, gamePassword);}}
          onLeave={() => {leaveGameMethod(id);}}
          disabledButtons={disabledButtons}
        />
      );
    });
  };

  return (
    <React.Fragment>
      {renderGameItems()}

      <Modal
        show={(joinLeaveStatus !== null && joinLeaveStatus === JOIN_LEAVE_RESULT.notOk) as boolean }
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
