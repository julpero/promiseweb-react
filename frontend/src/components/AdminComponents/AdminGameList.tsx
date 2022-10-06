import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../../common/userFunctions";
import { IuiGetGamesResponse, IuiReCreateGameStatisticsRequest, IuiReNameNickRequest, IuiReNameNickResponse, RENAME_STATUS } from "../../interfaces/IuiAdminOperations";
import { IuiUserData } from "../../interfaces/IuiUser";
import { useSocket } from "../../socket";
import { getAdminGameList, isAdminLoggedIn, setAdminGameList } from "../../store/adminSlice";
import { setSpinnerVisible } from "../../store/spinnerSlice";
import SelectInput from "../FormComponents/SelectInput";
import TextInput from "../FormComponents/TextInput";
import OneGameReport from "../OneGameReport";

interface IProps {
  userName: string,
}

interface IRenameFormValidation {
  currentNick?: string,
  newNick?: string,
}
interface IRenameForm {
  currentNick: string,
  newNick: string,
}

enum ACTIVE_MODAL {
  none,
  gameReport,
  rename,
}

const AdminGameList = ({userName}: IProps) => {
  // console.log("AdminGameList");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const adminGameList = useSelector(getAdminGameList);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [activeGame, setActiveGame] = useState("");
  const [activeModal, setActiveModal] = useState(ACTIVE_MODAL.none);
  const [errorStr, setErrorStr] = useState("");

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    const getGamesRequest: IuiUserData = {
      uuid: getMyId(),
      userName: userName,
      token: getToken(),
    };
    dispatch(setSpinnerVisible(true));
    console.time("get games for admin");
    socket.emit("get games for admin", getGamesRequest, (getGamesResponse: IuiGetGamesResponse) => {
      // console.log(getGamesResponse);
      console.timeEnd("get games for admin");
      if (getGamesResponse.isAuthenticated) {
        handleAuthenticatedRequest(getGamesResponse.token);
        dispatch(setAdminGameList(getGamesResponse.gameList));
        dispatch(setSpinnerVisible(false));
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
    });

    return () => {
      dispatch(setSpinnerVisible(false));
    };

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

  const renderErrorStr = () => {
    if (errorStr) {
      return (<div className="smallErrorDiv">
        {errorStr}
      </div>
      );
    } else {
      return null;
    }
  };

  const reCreateGameStats = (gameId: string) => {
    setButtonsActive(false);
    const reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest = {
      uuid: getMyId(),
      userName: userName,
      token: getToken(),
      gameId: gameId,
    };
    socket.emit("re-create game statistics", reCreateGameStatisticsRequest, (getGamesResponse: IuiGetGamesResponse) => {
      // console.log(getGamesResponse);
      if (getGamesResponse.isAuthenticated) {
        handleAuthenticatedRequest(getGamesResponse.token);
        dispatch(setAdminGameList(getGamesResponse.gameList));
      } else {
        handleUnauthenticatedRequest(dispatch);
      }
      setButtonsActive(true);
    });
  };

  const changeNickInGame = (values: IRenameForm) => {
    // console.log(values);
    if (activeGame) {
      setButtonsActive(false);
      const reNameNickRequest: IuiReNameNickRequest = {
        uuid: getMyId(),
        userName: userName,
        token: getToken(),
        gameId: activeGame,
        currentNick: values.currentNick,
        newNick: values.newNick,
      };
      socket.emit("rename nick", reNameNickRequest, (reNameNickResponse: IuiReNameNickResponse) => {
        // console.log("reNameNickResponse", reNameNickResponse);
        if (reNameNickResponse.isAuthenticated) {
          handleAuthenticatedRequest(reNameNickResponse.token);
          dispatch(setAdminGameList(reNameNickResponse.gameList));
          switch (reNameNickResponse.renameStatus) {
            case RENAME_STATUS.nameExistsInGame: {
              setErrorStr("Nick already exists in the game, can't rename into this!");
              break;
            }
            case RENAME_STATUS.notOk: {
              setErrorStr("Something wen't wrong, please try again...");
              break;
            }
            default: {
              closeModal();
              break;
            }
          }
          setButtonsActive(true);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  };

  const showRenameModal = (gameId: string) => {
    setActiveGame(gameId);
    setActiveModal(ACTIVE_MODAL.rename);
  };

  const showGameReport = (gameId: string) => {
    setActiveGame(gameId);
    setActiveModal(ACTIVE_MODAL.gameReport);
  };

  const initialCurrentNick = () => {
    if (activeGame && adminGameList.length > 0) {
      return adminGameList.find(game => game.gameId === activeGame)?.players.at(0) ?? "";
    }
    return "";
  };

  const renderReNameNicks = () => {
    if (activeGame && adminGameList.length > 0) {
      const players = adminGameList.find(game => game.gameId === activeGame)?.players;
      if (players) {
        return players.map((player, ind) => {
          return (
            <option key={ind} value={player}>
              {player}
            </option>
          );
        });
      }
    }
  };

  const renderGameActions = (gameId: string) => {
    return (
      <React.Fragment>
        <Button
          size="sm"
          variant="warning"
          disabled={!buttonsActive}
          onClick={() => reCreateGameStats(gameId)}
        >
          Re-Create Stats
        </Button>
        &nbsp;
        <Button
          size="sm"
          variant="warning"
          disabled={!buttonsActive}
          onClick={() => showRenameModal(gameId)}
        >
          ReName
        </Button>
      </React.Fragment>
    );
  };

  const renderGameList = () => {
    return adminGameList.map((game, idx) => {
      return (
        <tr key={idx}>
          <td><Button size="sm" disabled={!buttonsActive} onClick={() => showGameReport(game.gameId)}>Show</Button></td>
          <td>{new Date(game.played).toLocaleString()}</td>
          <td>{renderGamePlayers(game.players)}</td>
          <td>{new Date(game.statsGenerated).toLocaleString()}</td>
          <td>{renderGameActions(game.gameId)}</td>
        </tr>
      );
    });
  };

  const closeModal = () => {
    setActiveGame("");
    setErrorStr("");
    setActiveModal(ACTIVE_MODAL.none);
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
        show={activeModal === ACTIVE_MODAL.gameReport && activeGame !== ""}
        onHide={() => closeModal()}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Game Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OneGameReport gameId={activeGame} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => closeModal()}>Close Report</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={activeModal === ACTIVE_MODAL.rename && activeGame !== ""}
        onHide={() => closeModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
          Change player name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderErrorStr()}
          <Form
            onSubmit={changeNickInGame}
            validate={validateNickChange}
            initialValues={{currentNick: initialCurrentNick()}}
            render={({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field<string>
                  name="currentNick"
                  component={SelectInput}
                  label="Change this..."
                >
                  {renderReNameNicks()}
                </Field>
                <Field<string>
                  name="newNick"
                  component={TextInput}
                  label="... into this"
                />
                <hr />
                <Button variant="primary" type="submit" disabled={!buttonsActive}>Change Name</Button>
              </form>
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!buttonsActive} variant="warning" onClick={() => closeModal()}>CANCEL</Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  );
};

const validateNickChange = (values: IRenameForm) => {
  console.log(values);
  const errors: IRenameFormValidation = {};
  if (!values.newNick || values.newNick.length < 3) {
    errors.newNick = "New name must be at least three characters long!";
  }

  if (values.newNick === values.currentNick) {
    errors.newNick = "Current and new name cant be same!";
  }

  return errors;
};

export default AdminGameList;
