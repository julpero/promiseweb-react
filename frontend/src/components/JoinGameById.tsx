import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiGameListItem, IuiGetGameListResponse } from "../interfaces/IuiGameList";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse } from "../interfaces/IuiJoinOngoingGame";
import { IuiUserData } from "../interfaces/IuiUser";
import { useSocket } from "../socket";
import { getUser } from "../store/userSlice";

interface IProps {
  onJoin: () => void,
}

const JoinGameById = ({onJoin}: IProps) => {
  const [ submitting, setSubmitting ] = useState(false);
  const [ joinOk, setJoinOk ] = useState(false);
  const [ playerName, setPlayerName ] = useState("");
  const [ gameItemList, setGameItemList ] = useState<IuiGameListItem[]>([]);
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
      socket.emit("get on going games", gameListRequest, (gameList: IuiGetGameListResponse) => {
        console.log("on going gameList", gameList);
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
  }, [fetchGameItemList]);

  const joinGame = (gameId: string, playAsPlayer: string): void => {
    setSubmitting(true);
    const joinGameRequest: IuiJoinOngoingGame = {
      gameId: gameId,
      playAsPlayer: playAsPlayer,
      uuid: getMyId(),
      userName: user.userName,
      token: getToken(),
    };
    console.log("onSubmit", joinGameRequest);
    socket.emit("join ongoing game", joinGameRequest, (joinResponse: IuiJoinOngoingGameResponse) => {
      console.log("join response", joinResponse);
      if (joinResponse.isAuthenticated) {
        handleAuthenticatedRequest(joinResponse.token);
        if (joinResponse.joinOk) {
          // window.localStorage.setItem("uUID", joinResponse.playerId);
          setPlayerName(joinResponse.playerName);
          setJoinOk(joinResponse.joinOk);
        } else {
          fetchGameItemList();
          setSubmitting(false);
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

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false
  };

  const renderDateStr = (dateAsStr: string): string => {
    const dateAsDate = new Date(dateAsStr);
    return dateAsDate.toLocaleString("fi-FI", dateFormatOptions);
  };
  const renderPlayerList = (humanPlayers: string[]) => {
    return humanPlayers.map(player => {
      return <li key={player}>{player}</li>;
    });
  };

  const renderActions = (gameId: string, imInTheGame: boolean) => {
    const actionArr: JSX.Element[] = [];
    if (imInTheGame) {
      actionArr.push(
        <Button key="joinButton" size="sm" onClick={() => joinGame(gameId, user.userName)} disabled={submitting}>Re-Join</Button>
      );
    }
    return actionArr;
  };

  const renderGameItems = () => {
    if (gameItemList.length === 0) {
      return "No on going games at the moment, why don't you just create one by your self?";
    }
    return gameItemList.map(({created, id, humanPlayers, imInTheGame}: IuiGameListItem, ind) => {
      return(
        <div key={ind} className="row">
          <div className="col">
            {renderDateStr(created.toString())}
          </div>
          <div className="col">
            {renderPlayerList(humanPlayers)}
          </div>
          <div className="col">
            {renderActions(id, imInTheGame)}
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div>
        {renderGameItems()}
      </div>

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

export default JoinGameById;
