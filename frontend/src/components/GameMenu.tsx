import React, { useState } from "react";
import { useSocket } from "../socket";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Modal } from "react-bootstrap";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "../interfaces/IuiLeaveOngoingGame";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameInfo } from "../store/gameInfoSlice";
import { getUser } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";

/**
 * GameMenu
 */
const GameMenu = () => {
  const [leaveGameModal, setLeaveGameModal] = useState(false);
  const [leftGameModal, setLeftGameModal] = useState(false);

  const [leftGameId, setLeftGameId] = useState("");
  const [leftMMyId, setLeftMyId] = useState("");

  const currentGameInfo = useSelector(getCurrentGameInfo);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

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
            setLeftGameId(leaveOngoingGameResponse.gameId);
            setLeftMyId(leaveOngoingGameResponse.uuid);
            const uuid = uuidv4();
            window.localStorage.setItem("uUID", uuid);
          }
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const closeLeftModal = () => {
    setLeftGameModal(false);
    setLeftGameId("");
    setLeftMyId("");
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
          Copy Paste these values to someone else who can continue playing as you.
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="formLeftGameId">
              <Form.Label>Game ID</Form.Label>
              <Form.Control value={leftGameId} readOnly type="text" placeholder="game id" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLeftMyId">
              <Form.Label>My ID</Form.Label>
              <Form.Control value={leftMMyId} readOnly type="text" placeholder="my id" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeLeftModal}>CLOSE</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameMenu;
