import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiGameListItem, IuiGetGameListResponse } from "../interfaces/IuiGameList";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse, IuiObserveGameRequest, IuiObserveGameResponse, JOIN_GAME_STATUS, OBSERVE_RESPONSE } from "../interfaces/IuiJoinOngoingGame";
import { IuiUserData } from "../interfaces/IuiUser";
import { useSocket } from "../socket";
import { getUser } from "../store/userSlice";

const JoinOnGoingGame = () => {
  const [ submitting, setSubmitting ] = useState(false);
  const [ showRejection, setShowRejection ] = useState(false);
  const [ showWaiting, setShowWaiting ] = useState(false);
  const [ showObserveWaiting, setShowObserveWaiting ] = useState(false);
  const [ showObserveRejection, setShowObserveRejection ] = useState(false);
  const [ showError, setShowError ] = useState(false);
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
        // console.log("on going gameList", gameList);
        if (gameList.isAuthenticated) {
          handleAuthenticatedRequest(gameList.token);
          setGameItemList(gameList.games);
          setSubmitting(false);
          setShowRejection(false);
          setShowError(false);

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

    const handleObserveRejection = () => {
      setShowObserveRejection(true);
      setShowObserveWaiting(false);
    };

    socket.on("changes in game players", fetchGameItemList);
    socket.on("join request rejected", handleJoinRejection);
    socket.on("observe request rejected", handleObserveRejection);

    return () => {
      socket.off("changes in game players");
      socket.off("join request rejected");
      socket.off("observe request rejected");
    };
  }, [fetchGameItemList, socket]);

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
      setShowWaiting(true);
    }
    setPlayerName(playAsPlayer);
    socket.emit("join ongoing game", joinGameRequest, (joinResponse: IuiJoinOngoingGameResponse) => {
      // console.log("join response", joinResponse);
      if (joinResponse.isAuthenticated) {
        handleAuthenticatedRequest(joinResponse.token);
        if (joinResponse.joinStatus === JOIN_GAME_STATUS.ok) {
          // this is obsolete, we redirect waiter or mySelf straight in to the game
        } else if (joinResponse.joinStatus === JOIN_GAME_STATUS.failed) {
          setShowError(true);
          setShowWaiting(false);
        } else if (mySelf) {
          fetchGameItemList();
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
  };

  const observeGame = (gameId: string): void => {
    setSubmitting(true);
    const observeGameRequest: IuiObserveGameRequest = {
      gameId: gameId,
      uuid: getMyId(),
      userName: user.userName,
      token: getToken(),
    };
    socket.emit("observe game", observeGameRequest, (observeGameResponse: IuiObserveGameResponse) => {
      // console.log("observe response", observeGameResponse);
      if (observeGameResponse.isAuthenticated) {
        handleAuthenticatedRequest(observeGameResponse.token);
        if (observeGameResponse.observeResponse === OBSERVE_RESPONSE.waiting) {
          setShowObserveWaiting(true);
        } else if (observeGameResponse.observeResponse === OBSERVE_RESPONSE.onGoingGameExists) {
          setShowError(true);
        }
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
  };

  const cancelWaiting = () => {
    const cancelRequest: IuiUserData = {
      uuid: getMyId(),
      userName: user.userName,
      token: getToken(),
    };
    socket.emit("cancel my join request", cancelRequest, (simpleResponse) => {
      // console.log("cancelled my join request", simpleResponse);
      if (simpleResponse.isAuthenticated) {
        handleAuthenticatedRequest(simpleResponse.token);
        setShowWaiting(false);
        fetchGameItemList();
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
  };

  const cancelObserveWaiting = () => {
    const cancelRequest: IuiUserData = {
      uuid: getMyId(),
      userName: user.userName,
      token: getToken(),
    };
    socket.emit("cancel my observe request", cancelRequest, (simpleResponse) => {
      // console.log("cancelled my join request", simpleResponse);
      if (simpleResponse.isAuthenticated) {
        handleAuthenticatedRequest(simpleResponse.token);
        setShowObserveWaiting(false);
        setShowObserveRejection(false);
        fetchGameItemList();
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
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

  const renderOtherJoinButtons = (gameId: string, inActivePlayers?: string[], inActivePlayerSockets? : string[], playedByMap?: Map<string, string>) => {
    const buttonsArr: JSX.Element[] = [];
    const freePlayers = Array.from(new Set([ ...inActivePlayers ?? [], ...inActivePlayerSockets ?? [] ]));
    freePlayers.forEach(player => {
      if (!playedByMap || !playedByMap.has(player)) {
        buttonsArr.push(<Button className="joinOtherButton" key={`joinAs${player}`} size="sm" onClick={() => joinGame(gameId, player, false)} disabled={submitting}>Join as {player}</Button>);
      }
    });
    return buttonsArr;
  };

  const renderActions = (gameId: string, imInTheGame: boolean, inActivePlayers?: string[], inActivePlayerSockets?: string[], playedByMap?: Map<string, string>) => {
    const actionArr: JSX.Element[] = [];
    if (imInTheGame) {
      actionArr.push(
        <Button key="joinAsMySelfButton" variant="success" size="sm" onClick={() => joinGame(gameId, user.userName, true)} disabled={submitting}>Re-Join as my self</Button>
      );
    } else if (!imInTheGame) {
      renderOtherJoinButtons(gameId, inActivePlayers, inActivePlayerSockets, playedByMap).forEach(button => {
        actionArr.push(button);
        actionArr.push();
      });
    }
    return actionArr;
  };

  const renderObserveButton = (gameId: string, imInTheGame: boolean) => {
    if (imInTheGame) return null;
    return (
      <Button disabled={submitting} size="sm" onClick={() => observeGame(gameId)}>Observe Game</Button>
    );
  };

  const renderGameItems = () => {
    if (gameItemList.length === 0) {
      return "No on going games at the moment, why don't you just create one by your self?";
    }
    return gameItemList.map(({created, id, humanPlayers, inActivePlayers, inActivePlayerSockets, playedBy}: IuiGameListItem, ind) => {
      const playedByMap: Map<string, string> | undefined = playedBy ? new Map(JSON.parse(playedBy)) : undefined;
      const imInTheGame = humanPlayers.some(player => player === user.userName) || Array.from(playedByMap?.values() ?? []).includes(user.userName);
      return(
        <div key={ind} className="row">
          {ind > 0 &&
            <hr />
          }
          <div className="col">
            {renderDateStr(created.toString())}
          </div>
          <div className="col">
            {renderPlayerList(humanPlayers, playedBy)}
          </div>
          <div className="col">
            {renderActions(id, imInTheGame, inActivePlayers, inActivePlayerSockets, playedByMap)}
          </div>
          <div className="col">
            {renderObserveButton(id, imInTheGame)}
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => fetchGameItemList()} disabled={submitting}>Refresh</Button>
      </div>
      <hr />
      <div>
        {renderGameItems()}
      </div>

      <Modal show={showWaiting} onHide={cancelWaiting}>
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
          <Button variant="warning" onClick={cancelWaiting}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
            />
            &nbsp;
            Cancel
          </Button>
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

      <Modal show={showError} onHide={cancelWaiting}>
        <Modal.Header>
          <Modal.Title>
            Request failed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have requested to join game as a player <i>{playerName}</i>.</p>
          <p>For some reason that request has failed.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={cancelWaiting}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showObserveWaiting} onHide={cancelObserveWaiting}>
        <Modal.Header>
          <Modal.Title>
            Waiting to observe game...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have requested to observe game.</p>
          <p>Someone active player in the game must accept your request so please wait...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={cancelObserveWaiting}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
            />
            &nbsp;
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showObserveRejection} onHide={cancelObserveWaiting}>
        <Modal.Header>
          <Modal.Title>
            Observing request is rejected
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have requested to observe game.</p>
          <p>Someone active player in the game just rejected your request.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={cancelObserveWaiting}>Close</Button>
        </Modal.Footer>
      </Modal>

    </React.Fragment>
  );
};

export default JoinOnGoingGame;
