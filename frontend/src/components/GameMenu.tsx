import React, { useEffect, useState } from "react";
import { useSocket } from "../socket";
import { Button, Modal } from "react-bootstrap";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "../interfaces/IuiLeaveOngoingGame";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameInfo, setGameId } from "../store/gameInfoSlice";
import { getUser } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiAllowPlayerToJoinRequest, IuiAllowPlayerToJoinResponse, IuiAllowPlayerToObserveRequest, IuiAllowPlayerToObserveResponse, IuiPlayerJoinedOnGoingGameNotification, IuiPlayerWantsToJoinNotification } from "../interfaces/IuiJoinOngoingGame";
import { getCurrentRoundInfo } from "../store/roundInfoSlice";
import { IuiGetRoundRequest } from "../interfaces/IuiPlayingGame";
import { setGetRoundInfo } from "../store/getRoundInfoSlice";
import { IuiAuth, IuiUserData } from "../interfaces/IuiUser";

/**
 * GameMenu
 */
const GameMenu = () => {
  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [leftGameModal, setLeftGameModal] = useState(false);
  const [gameDismissedModal, setGameDismissedModal] = useState(false);
  const [otherPlayerJoined, setOtherPlayerJoined] = useState(false);
  const [otherPlayerName, setOtherPlayerName] = useState("");
  const [requestPlayerName, setRequestPlayerName] = useState("");
  const [activeJoinRequest, setActiveJoinRequest] = useState(false);
  const [showObserveModal, setShowObserveModal] = useState(false);
  const [showObserveDismissedModal, setShowObserveDismissedModal] = useState(false);

  const currentRoundInfo = useSelector(getCurrentRoundInfo);
  const currentGameInfo = useSelector(getCurrentGameInfo);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const iAmObserver = currentRoundInfo.observers?.some(observer => observer.name === user.userName && !observer.waiting) ?? false;

  useEffect(() => {
    const handleOtherPlayerReplacingMe = (playerJoinedNotification: IuiPlayerJoinedOnGoingGameNotification) => {
      const {replacedPlayer, gameId, joinerName} = playerJoinedNotification;
      // console.log(`I (${replacedPlayer}) am replaced by ${joinerName}`);
      if (currentGameInfo.gameId === gameId && user.isUserLoggedIn && user.userName === replacedPlayer) {
        setOtherPlayerName(joinerName);
        setOtherPlayerJoined(true);
      }
    };

    const handlePlayerJoining = (playerWantsToJoinNotification: IuiPlayerWantsToJoinNotification) => {
      // console.log("playerWantsToJoinNotification", playerWantsToJoinNotification);
      const {replacedPlayer, joinerName} = playerWantsToJoinNotification;
      setRequestPlayerName(joinerName);
      setOtherPlayerName(replacedPlayer);
      setActiveJoinRequest(joinerName.length > 0 && replacedPlayer.length > 0);
    };

    const handleObserveDismissed = (gameId: string) => {
      if (currentGameInfo.gameId === gameId) {
        setShowObserveDismissedModal(true);
      }
    };

    socket.on("player joined on going game", handleOtherPlayerReplacingMe);
    socket.on("player wants to join", handlePlayerJoining);
    socket.on("observe request rejected", handleObserveDismissed);

    return () => {
      socket.off("player joined on going game");
      socket.off("player wants to join");
      socket.off("observe request rejected");
    };
  }, [user, currentGameInfo, socket]);

  if (!currentGameInfo.gameId) return null;

  const showLeaveModal = (): boolean => {
    return leaveGameModal && !leftGameModal;
  };
  const showLeftModal = (): boolean => {
    return !leaveGameModal && leftGameModal;
  };

  const allowPlayerToJoin = (allow: boolean) => {
    if (otherPlayerName && requestPlayerName && currentGameInfo.gameId) {
      const playerToJoinRequest: IuiAllowPlayerToJoinRequest = {
        replacedPlayer: otherPlayerName,
        joinerName: requestPlayerName,
        allow: allow,
        gameId: currentGameInfo.gameId,
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };
      socket.emit("allow to join game", playerToJoinRequest, (allowPlayerToJoinResponse: IuiAllowPlayerToJoinResponse) => {
        // console.log("allowPlayerToJoinResponse", allowPlayerToJoinResponse);
        if (allowPlayerToJoinResponse.isAuthenticated) {
          handleAuthenticatedRequest(allowPlayerToJoinResponse.token);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    } else {
      setRequestPlayerName("");
      setOtherPlayerName("");
      setActiveJoinRequest(false);
    }
  };

  const leaveGameClick = () => {
    if (user.isUserLoggedIn) {
      const leaveOngoingGameRequest: IuiLeaveOngoingGameRequest = {
        gameId: currentGameInfo.gameId,
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };

      socket.emit("leave ongoing game", leaveOngoingGameRequest, (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => {
        // console.log("leaveOngoingGameResponse", leaveOngoingGameResponse);
        if (leaveOngoingGameResponse.isAuthenticated) {
          handleAuthenticatedRequest(leaveOngoingGameResponse.token);
          switch (leaveOngoingGameResponse.leaveStatus) {
            case LEAVE_ONGOING_GAME_RESULT.leaveOk: {
              setLeftGameModal(true);
              setLeaveGameModal(false);
              break;
            }
            case LEAVE_ONGOING_GAME_RESULT.gameDismissed: {
              setGameDismissedModal(true);
              setLeaveGameModal(false);
              break;
            }
            default: {
              // not ok
              // TODO handle not ok -case
            }
          }
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const leaveObservingClick = () => {
    if (user.isUserLoggedIn) {
      const cancelRequest: IuiUserData = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };
      socket.emit("stop observing", cancelRequest, (response: IuiAuth) => {
        if (response.isAuthenticated) {
          handleAuthenticatedRequest(response.token);
          closeLeftModal();
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const refreshRoundInfo = () => {
    if (currentGameInfo.gameId) {
      const getRoundRequest: IuiGetRoundRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: currentGameInfo.gameId,
        roundInd: currentRoundInfo.roundInd,
      };
      dispatch(setGetRoundInfo(getRoundRequest));
    }
  };

  const closeLeftModal = () => {
    setLeftGameModal(false);
    setGameDismissedModal(false);
    setLeaveGameModal(false);
    setShowObserveDismissedModal(false);
    dispatch(setGameId(""));
  };

  const toggleObserveModal = (show: boolean): void => {
    refreshRoundInfo();
    setShowObserveModal(show);
  };

  const isActiveObserveRequest = (): boolean => {
    return currentRoundInfo.observers?.some(observer => observer.waiting) ?? false;
  };

  const isActiveObservers = (): boolean => {
    return currentRoundInfo.observers?.some(observer => !observer.waiting) ?? false;
  };

  const allowPlayerToObserve = (observerName: string, allow: boolean) => {
    const playerToObserveRequest: IuiAllowPlayerToObserveRequest = {
      observerName: observerName,
      allow: allow,
      gameId: currentGameInfo.gameId,
      uuid: getMyId(),
      userName: user.userName,
      token: getToken(),
    };
    socket.emit("allow to observe game", playerToObserveRequest, (observeGameResponse: IuiAllowPlayerToObserveResponse) => {
      // console.log("observeGameResponse", observeGameResponse);
      if (observeGameResponse.isAuthenticated) {
        handleAuthenticatedRequest(observeGameResponse.token);
        refreshRoundInfo();
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });
  };

  const renderActiveObservers = () => {
    if (isActiveObservers()) {
      return (
        currentRoundInfo.observers?.filter(observer => !observer.waiting).map((observer, ind) => {
          return (
            <div key={ind} className="row">
              <div className="col">
                {observer.name}
              </div>
              <div className="col">
                <Button size="sm" variant="danger" onClick={() => allowPlayerToObserve(observer.name, false)}>
                  Dismiss
                </Button>
              </div>
            </div>
          );
        })
      );
    } else {
      return "No active observers";
    }
  };

  const renderObserveRequests = () => {
    if (isActiveObserveRequest()) {
      return (
        currentRoundInfo.observers?.filter(observer => observer.waiting).map((observer, ind) => {
          return (
            <div key={ind} className="row">
              <div className="col">
                {observer.name}
              </div>
              <div className="col">
                <Button size="sm" variant="success" onClick={() => allowPlayerToObserve(observer.name, true)}>
                  Allow
                </Button>
                &nbsp;
                <Button size="sm" variant="warning" onClick={() => allowPlayerToObserve(observer.name, false)}>
                  Reject
                </Button>
              </div>
            </div>
          );
        })
      );
    } else {
      return "No active requests";
    }
  };

  const renderRequest = () => {
    if (activeJoinRequest && !iAmObserver) {
      return (
        <React.Fragment>
          <div><i>{requestPlayerName}</i> want to play as <i>{otherPlayerName}</i>, is this ok?</div>
          <div>
            <Button variant="success" onClick={() => allowPlayerToJoin(true)}>Allow</Button>
            &nbsp;
            <Button variant="danger" onClick={() => allowPlayerToJoin(false)}>Reject</Button>
          </div>
        </React.Fragment>
      );
    }
    return null;
  };

  const renderMenuButtons = () => {
    if (iAmObserver) {
      return (
        <Button
          size="sm"
          variant="warning"
          onClick={() => leaveObservingClick()}
        >
          Stop Observing
        </Button>
      );
    } else {
      return (
        <React.Fragment>
          <Button
            size="sm"
            variant={isActiveObserveRequest() ? "warning" : (isActiveObservers() ? "info" : "secondary")}
            onClick={() => toggleObserveModal(!showObserveModal)}
          >
            Observers
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setLeaveGameModal(!leaveGameModal)}
          >
            Leaving Game?
          </Button>
        </React.Fragment>
      );
    }
  };

  return (
    <div id="menuArea">
      <div className="d-grid gap-2">
        {renderMenuButtons()}
      </div>

      {renderRequest()}
      {currentGameInfo.thisIsDemoGame &&
        <div>
          I AM: {user.userName}
        </div>
      }

      <Modal show={showLeaveModal()} onHide={() => setLeaveGameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Leaving game...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure that you really, really want to leave this outstanding game?</p>
          <p>Remember that after you have left the game someone else can continue playing game as you - and the final game score will affect to your statistics.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setLeaveGameModal(false)}>No, go back to the game</Button>
          <Button variant="danger" onClick={() => leaveGameClick()}>Yes, leave the game now</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLeftModal()} onHide={closeLeftModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            You have just left the game...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You can re-join this game in On Going Games.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeLeftModal}>CLOSE</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={gameDismissedModal} onHide={closeLeftModal}>
        <Modal.Header closeButton>
          <Modal.Title>
          You have just left the game...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You were the last player in the game and now there is no more players in the game.</p>
          <p>The game is now dismissed and can&apos;t be played anymore.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeLeftModal}>CLOSE</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={otherPlayerJoined} onHide={closeLeftModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            You have been kicked off from this game!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Original player <i>{otherPlayerName}</i> has just joined again into this game and continues to play it.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeLeftModal}>CLOSE</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showObserveModal} onHide={() => toggleObserveModal(!showObserveModal)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Observers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Active</h5>
          {renderActiveObservers()}
          <hr />
          <h5>Requests</h5>
          {renderObserveRequests()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => refreshRoundInfo()}>REFRESH</Button>
          &nbsp;
          <Button variant="primary" onClick={() => toggleObserveModal(!showObserveModal)}>CLOSE</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showObserveDismissedModal} onHide={closeLeftModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            You have been kicked off from observing this game!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Some player in the game just dismissed your observing permission.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeLeftModal}>CLOSE</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameMenu;
