import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IuiAdminRequest, IuiGetGamesResponse, IuiReCreateGameStatisticsRequest } from "../../interfaces/IuiAdminOperations";
import { useSocket } from "../../socket";
import { getAdminGameList, isAdminLoggedIn, setAdminGameList } from "../../store/adminSlice";
import OneGameReport from "../OneGameReport";

interface IProps {
  userName: string,
}

const AdminGameList = ({userName}: IProps) => {
  console.log("AdminGameList");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const adminGameList = useSelector(getAdminGameList);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [gameToReport, setGameToReport] = useState("");

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  useEffect(() => {
    const getGamesRequest: IuiAdminRequest = {
      uuid: getMyId(),
      userName: userName,
    };
    socket.emit("get games for admin", getGamesRequest, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      dispatch(setAdminGameList(getGamesResponse.gameList));
    });
  }, [userName, socket, dispatch]);

  if (!adminLoggedIn) return null;
  if (!userName) return null;

  const renderGamePlayers = (players: string[]) => {
    return players.map((player, idx) => {
      if (idx === 0) {
        return (
          <span key={idx}><strong>{player}</strong>, </span>
        );
      } else if (idx === players.length - 1) {
        return (

          <span key={idx}>{player}</span>
        );
      } else {
        return (
          <span key={idx}>{player}, </span>
        );
      }
    });
  };

  const reCreateGameStats = (gameId: string) => {
    setButtonsActive(false);
    const reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest = {
      uuid: getMyId(),
      userName: userName,
      gameId: gameId,
    };
    socket.emit("re-create game statistics", reCreateGameStatisticsRequest, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      dispatch(setAdminGameList(getGamesResponse.gameList));
      setButtonsActive(true);
    });
  };

  const renderGameActions = (gameId: string) => {
    return (
      <Button
        size="sm"
        variant="warning"
        disabled={!buttonsActive}
        onClick={() => reCreateGameStats(gameId)}
      >
        Re-Create Stats
      </Button>
    );
  };

  const renderGameList = () => {
    return adminGameList.map((game, idx) => {
      return (
        <tr key={idx}>
          <td><Button size="sm" disabled={!buttonsActive} onClick={() => setGameToReport(game.gameId)}>Show</Button></td>
          <td>{new Date(game.played).toLocaleString()}</td>
          <td>{renderGamePlayers(game.players)}</td>
          <td>{new Date(game.statsGenerated).toLocaleString()}</td>
          <td>{renderGameActions(game.gameId)}</td>
        </tr>
      );
    });
  };

  const closeReportModal = () => {
    setGameToReport("");
  };

  return (
    <React.Fragment>
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>

            </th>
            <th>
            Played
            </th>
            <th>
            Players
            </th>
            <th>
            Stats gen
            </th>
            <th>
            Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {renderGameList()}
        </tbody>
      </Table>
      <Modal
        show={gameToReport !== ""}
        onHide={() => closeReportModal()}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Game Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OneGameReport gameId={gameToReport} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => closeReportModal()}>Close Report</Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  );
};

export default AdminGameList;
