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
  const [ showRejection, setShowRejection ] = useState(false);
  const [ waitingResponseFromGame, setWaitingResponseFromGame ] = useState("");
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
          setSubmitting(false);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [user, dispatch, socket]);

  useEffect(() => {
    fetchGameItemList();

    const handleJoinRejection = () => {
      setShowRejection(true);
    };

    socket.on("changes in game players", fetchGameItemList);
    socket.on("join request rejected", handleJoinRejection);

    return () => {
      socket.off("changes in game players");
    };
  }, [fetchGameItemList, waitingResponseFromGame, socket]);

  const joinGame = (gameId: string, playAsPlayer: string, mySelf: boolean): void => {
    setSubmitting(true);
    const joinGameRequest: IuiJoinOngoingGame = {
      gameId: gameId,
      playAsPlayer: playAsPlayer,
      uuid: getMyId(),
      userName: user.userName,
      token: getToken(),
    };
    if (!mySelf) {
      setWaitingResponseFromGame(gameId);
    }
    setPlayerName(playAsPlayer);
    socket.emit("join ongoing game", joinGameRequest, (joinResponse: IuiJoinOngoingGameResponse) => {
      console.log("join response", joinResponse);
      if (joinResponse.isAuthenticated) {
        handleAuthenticatedRequest(joinResponse.token);
        if (joinResponse.joinOk) {
          setJoinOk(joinResponse.joinOk);
        } else if (!mySelf) {
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

  const cancelWaiting = () => {
    setWaitingResponseFromGame("");
    setShowRejection(false);
    setSubmitting(false);
  };

  const showWaitingModal = (): boolean => {
    return waitingResponseFromGame !== undefined && waitingResponseFromGame !== "";
  };

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: false
  };

  const renderDateStr = (dateAsStr: string): string => {
    const dateAsDate = new Date(dateAsStr);
    return dateAsDate.toLocaleString("fi-FI", dateFormatOptions);
  };

  const renderPlayerList = (humanPlayers: string[], playedBy?: string) => {
    const playedByMap: Map<string, string> | null = playedBy ? new Map(JSON.parse(playedBy)) : null;
    return humanPlayers.map(player => {
      const playedByPlayer = playedByMap?.get(player) ?? "";
      const playedByPlayerStr = playedByPlayer ? ` (${playedByPlayer})` : "";
      return <li key={player}>{player}{playedByPlayerStr}</li>;
    });
  };

  const renderOtherJoinButtons = (gameId: string, inActivePlayers?: string[], inActivePlayerSockets? : string[]) => {
    const buttonsArr: JSX.Element[] = [];
    const freePlayers = Array.from(new Set([ ...inActivePlayers ?? [], ...inActivePlayerSockets ?? [] ]));
    freePlayers.forEach(player => {
      buttonsArr.push(<Button key={`joinAs${player}`} size="sm" onClick={() => joinGame(gameId, player, false)} disabled={submitting}>Join as {player}</Button>);
    });
    return buttonsArr;
  };

  const renderActions = (gameId: string, imInTheGame: boolean, inActivePlayers?: string[], inActivePlayerSockets?: string[]) => {
    const actionArr: JSX.Element[] = [];
    if (imInTheGame) {
      actionArr.push(
        <Button key="joinAsMySelfButton" size="sm" onClick={() => joinGame(gameId, user.userName, true)} disabled={submitting}>Re-Join as my self</Button>
      );
    } else if (!imInTheGame) {
      renderOtherJoinButtons(gameId, inActivePlayers, inActivePlayerSockets).forEach(button => {
        actionArr.push(button);
      });
    }
    return actionArr;
  };

  const renderGameItems = () => {
    if (gameItemList.length === 0) {
      return "No on going games at the moment, why don't you just create one by your self?";
    }
    return gameItemList.map(({created, id, humanPlayers, imInTheGame, inActivePlayers, inActivePlayerSockets, playedBy}: IuiGameListItem, ind) => {
      return(
        <div key={ind} className="row">
          <div className="col">
            {renderDateStr(created.toString())}
          </div>
          <div className="col">
            {renderPlayerList(humanPlayers, playedBy)}
          </div>
          <div className="col">
            {renderActions(id, imInTheGame, inActivePlayers, inActivePlayerSockets)}
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => fetchGameItemList()}>Refresh</Button>
      </div>
      <hr />
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
          <p>You have successfully joined the game as a player <i>{playerName}</i>.</p>
          <p>You can now close this dialog and start playing.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closeAndPlay}>Close and Play</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWaitingModal()} onHide={cancelWaiting}>
        <Modal.Header>
          <Modal.Title>
            Waiting to join game...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have requested to join game as a player <i>{playerName}</i>.</p>
          <p>Someone active player in the game must accept your request so please wait...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={cancelWaiting}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejection} onHide={cancelWaiting}>
        <Modal.Header>
          <Modal.Title>
            Request is rejected
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have requested to join game as a player <i>{playerName}</i>.</p>
          <p>Someone active player in the game just rejected your request.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={cancelWaiting}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default JoinGameById;
