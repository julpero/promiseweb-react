import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IuiAdminGame, IuiGetGamesRequest, IuiGetGamesResponse, IuiReCreateGameStatisticsRequest } from "../../interfaces/IuiAdminOperations";
import { useSocket } from "../../socket";
import { isAdminLoggedIn } from "../../store/adminSlice";

interface IProps {
  userName: string,
}

const AdminGameList = ({userName}: IProps) => {
  console.log("AdminGameList");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const [gameList, setGameList] = useState<IuiAdminGame[]>([]);
  const [buttonsActive, setButtonsActive] = useState(true);

  const { socket } = useSocket();
  useEffect(() => {
    const getGamesRequest: IuiGetGamesRequest = {
      userName: userName,
    };
    socket.emit("get games for admin", getGamesRequest, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      setGameList(getGamesResponse.gameList);
    });
  }, [userName, socket]);

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
      userName: userName,
      gameId: gameId,
    };
    socket.emit("re-create game statistics", reCreateGameStatisticsRequest, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      setGameList(getGamesResponse.gameList);
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
    return gameList.map((game, idx) => {
      return (
        <tr key={idx}>
          <td><Button size="sm" disabled={!buttonsActive}>Show</Button></td>
          <td>{new Date(game.played).toLocaleString()}</td>
          <td>{renderGamePlayers(game.players)}</td>
          <td>{new Date(game.statsGenerated).toLocaleString()}</td>
          <td>{renderGameActions(game.gameId)}</td>
        </tr>
      );
    });
  };

  return (
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
  );
};

export default AdminGameList;
