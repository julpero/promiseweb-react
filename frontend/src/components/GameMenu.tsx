import React, { useEffect, useState } from "react";
import { useSocket } from "../socket";
import { Button, Modal } from "react-bootstrap";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "../interfaces/IuiLeaveOngoingGame";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameInfo, setGameId } from "../store/gameInfoSlice";
import { getUser } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiPlayerJoinedOnGoingGameNotification } from "../interfaces/IuiJoinOngoingGame";

/**
 * GameMenu
 */
const GameMenu = () => {
  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [leftGameModal, setLeftGameModal] = useState(false);
  const [otherPlayerJoined, setOtherPlayerJoined] = useState(false);
  const [otherPlayerName, setOtherPlayerName] = useState("");

  const currentGameInfo = useSelector(getCurrentGameInfo);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    const handleOtherPlayerReplacingMe = (playerJoinedNotification: IuiPlayerJoinedOnGoingGameNotification) => {
      const {replacedPlayer, gameId, joinerName} = playerJoinedNotification;
      console.log(`I (${replacedPlayer}) am replaced by ${joinerName}`);
      if (currentGameInfo.gameId === gameId && user.isUserLoggedIn && user.userName === replacedPlayer) {
        setOtherPlayerName(joinerName);
        setOtherPlayerJoined(true);
      }
    };

    socket.on("player joined on going game", handleOtherPlayerReplacingMe);

    return () => {
      socket.off("player joined on going game");
    };
  }, [user, currentGameInfo, socket]);

  const showLeaveModal = (): boolean => {
    return leaveGameModal && !leftGameModal;
  };
  const showLeftModal = (): boolean => {
    return !leaveGameModal && leftGameModal;
  };

  if (!currentGameInfo.gameId) return null;

  const leaveGameClick = () => {
    if (user.isUserLoggedIn) {
      const leaveOngoingGameRequest: IuiLeaveOngoingGameRequest = {
        gameId: currentGameInfo.gameId,
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };

      socket.emit("leave ongoing game", leaveOngoingGameRequest, (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => {
        console.log("leaveOngoingGameResponse", leaveOngoingGameResponse);
        if (leaveOngoingGameResponse.isAuthenticated) {
          handleAuthenticatedRequest(leaveOngoingGameResponse.token);
          if (leaveOngoingGameResponse.leaveStatus === LEAVE_ONGOING_GAME_RESULT.leaveOk) {
            setLeftGameModal(true);
            setLeaveGameModal(false);
          }
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const closeLeftModal = () => {
    setLeftGameModal(false);
    dispatch(setGameId(""));
  };

  return (
    <div id="menuArea">
      <Button
        size="sm"
        variant="danger"
        onClick={() => setLeaveGameModal(!leaveGameModal)}
      >
        Leaving Game?
      </Button>

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
    </div>
  );
};

export default GameMenu;
