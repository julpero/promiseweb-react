import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../socket";

import Accordion from "react-bootstrap/Accordion";
import { Button, Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";
import JoinOnGoingGame from "../components/JoinOnGoingGame";
import PlayedGamesReport from "../components/PlayedGamesReport";
import TextInput from "../components/FormComponents/TextInput";
import { IuiLoginRequest, IuiLoginResponse, IuiUserData, LOGIN_RESPONSE } from "../interfaces/IuiUser";
import AdminGameList from "../components/AdminComponents/AdminGameList";
import { isAdminLoggedIn, setAdminLoggedIn } from "../store/adminSlice";
import AdminMassOperations from "../components/AdminComponents/AdminMassOperations";
import { getUser, setUserLoggedIn } from "../store/userSlice";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import OnePlayerReport from "../components/OnePlayerReport";
import { BallTriangle } from "react-loader-spinner";
import { isSpinnerVisible } from "../store/spinnerSlice";
import { setGameId } from "../store/gameInfoSlice";
import { clearRoundInfo } from "../store/roundInfoSlice";

interface IUserLoginFormValidationFields {
  userName?: string,
  password1?: string,
  password2?: string,
  email?: string,
}
interface IUserLoginForm {
  userName: string,
  password1: string,
  password2: string,
  email: string,
}

interface IAdminLoginFormValidationFields {
  userName?: string,
  password?: string,
}
interface IAdminLoginForm {
  userName: string,
  password: string,
}

enum ACTIVE_MODAL {
  none,
  loginForm,
  adminLoginForm,
  adminActions,
  onePlayerReport,
}

const HomeScreen = () => {
  const [loginFormValidationError, setLoginFormValidationError] = useState("");
  const [activeModal, setActiveModal] = useState<ACTIVE_MODAL>(ACTIVE_MODAL.none);
  const [activePlayerName, setActivePlayerName] = useState("");
  const [adminUserName, setAdminUserName] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const user = useSelector(getUser);
  const spinnerVisible = useSelector(isSpinnerVisible);
  const dispatch = useDispatch();
  const accRef = createRef<HTMLHeadingElement>();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const openOnePlayerReport = (playerName: string) => {
    // console.log("openOnePlayerReport", playerName);
    setActivePlayerName(playerName);
    setActiveModal(ACTIVE_MODAL.onePlayerReport);
  };

  const closeOnePlayerReport = () => {
    setActivePlayerName("");
    setActiveModal(ACTIVE_MODAL.none);
  };

  const handleGameCreation = () => {
    if (accRef.current?.firstElementChild) {
      (accRef.current.firstElementChild as HTMLButtonElement).click();
    }
  };

  const closeLoginUserModal = () => {
    dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
  };

  const closeLoginAdminModal = () => {
    setActiveModal(ACTIVE_MODAL.none);
    dispatch(setAdminLoggedIn(false));
    setAdminUserName("");
  };

  const closeAndLogoutAdminModal = () => {
    closeLoginAdminModal();
  };

  const renderLoginError = () => {
    if (loginFormValidationError) {
      return (<div className="smallErrorDiv">
        {loginFormValidationError}
      </div>
      );
    } else {
      return null;
    }
  };

  const onLoginUserSubmit = ({userName, password1, password2, email}: IUserLoginForm) => {
    setLoginFormValidationError("");
    setButtonsDisabled(true);
    const loginRequest: IuiLoginRequest = {
      uuid: getMyId(),
      userName: userName,
      password1: password1,
      password2: password2,
      email: email,
    };
    socket.emit("user login", loginRequest, (loginResponse: IuiLoginResponse) => {
      // console.log("user login, response", loginResponse);
      if (loginResponse.loginStatus === LOGIN_RESPONSE.ok && loginResponse.isAuthenticated) {
        handleAuthenticatedRequest(loginResponse.token);
        dispatch(setGameId(""));
        dispatch(clearRoundInfo());
        dispatch(setUserLoggedIn({loggedIn: true, name: loginRequest.userName}));
      } else {
        window.localStorage.removeItem("token");
        dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
        switch (loginResponse.loginStatus) {
          case LOGIN_RESPONSE.passwordFails: {
            setLoginFormValidationError("Check your password!");
            break;
          }
          case LOGIN_RESPONSE.password2Empty: {
            setLoginFormValidationError("New user, type password again in second field!");
            break;
          }
          default: {
            setLoginFormValidationError("Check your password!");
            break;
          }
        }
      }
      setButtonsDisabled(false);
    });
  };

  const logOutUser = () => {
    // console.log("user want's to log out");
    if (user.isUserLoggedIn) {
      const logOutRequest: IuiUserData = {
        userName: user.userName,
        uuid: getMyId(),
        token: getToken(),
      };
      socket.emit("log out", logOutRequest);
    }
    window.localStorage.removeItem("uUID");
    window.localStorage.removeItem("token");
    dispatch(setGameId(""));
    dispatch(clearRoundInfo());
    dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
  };

  const onLoginAdminSubmit = ({userName, password}: IAdminLoginForm) => {
    if (user.isUserLoggedIn) {
      setButtonsDisabled(true);
      const loginRequest: IuiLoginRequest = {
        uuid: getMyId(),
        userName: userName,
        token: getToken(),
        password1: password,
      };
      socket.emit("admin login", loginRequest, (loginResponse: IuiLoginResponse) => {
        // console.log("loginResponse", loginResponse);
        if (loginResponse.isAuthenticated) {
          handleAuthenticatedRequest(loginResponse.token);
          if (loginResponse.loginStatus === LOGIN_RESPONSE.ok) {
            dispatch(setAdminLoggedIn(true));
            setAdminUserName(loginRequest.userName);
          } else {
            dispatch(setAdminLoggedIn(false));
            setAdminUserName("");
          }
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
        setButtonsDisabled(false);
      });
    }
  };

  return(
    <div className="container-fluid">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header ref={accRef}>Open Games</Accordion.Header>
          <Accordion.Body>
            <OpenGamesList />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Create New Game</Accordion.Header>
          <Accordion.Body>
            <CreateGame onCreateGame={handleGameCreation} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>On Going Games</Accordion.Header>
          <Accordion.Body>
            <JoinOnGoingGame />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {user.isUserLoggedIn &&
        <PlayedGamesReport
          openPlayerReport={openOnePlayerReport}
        />
      }

      <div className="adminButtonDiv">
        <Button variant="warning" onClick={() => logOutUser()} disabled={!user.isUserLoggedIn}>Log Out <i>{user.userName}</i></Button>
        &nbsp;
        <Button onClick={() => setActiveModal(ACTIVE_MODAL.adminLoginForm)} disabled={!user.isUserLoggedIn}>Admin</Button>
      </div>

      <Modal
        show={!user.isUserLoggedIn}
        onHide={() => closeLoginUserModal()}
      >
        <Modal.Header>
          <Modal.Title>
            Log in / Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderLoginError()}
          <Form
            onSubmit={onLoginUserSubmit}
            validate={validateLoginUserForm}
            render={({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field<string>
                  name="userName"
                  component={TextInput}
                  label="(Nick)Name"
                  autoFocus
                />
                <Field<string>
                  name="password1"
                  component={TextInput}
                  label="Password"
                  ispassword="true"
                />
                <br />
                <Field<string>
                  name="password2"
                  component={TextInput}
                  label="Password (again, if new user)"
                  ispassword="true"
                />
                <Field<string>
                  name="email"
                  component={TextInput}
                  label="Email (if new user - optional)"
                />
                <br />
                <div className="d-grid gap-2">
                  <Button disabled={buttonsDisabled || user.isUserLoggedIn} type="submit" variant="primary" size="lg">Log In / Register</Button>
                </div>
              </form>
            )}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={activeModal === ACTIVE_MODAL.adminLoginForm}
        onHide={() => closeLoginAdminModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Admin Panel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onLoginAdminSubmit}
            validate={validateLoginAdminForm}
            render={({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field<string>
                  name="userName"
                  component={TextInput}
                  label="User name"
                  autoFocus
                />
                <Field<string>
                  name="password"
                  component={TextInput}
                  label="Password"
                  ispassword="true"
                />
                <div className="d-grid gap-2">
                  <Button disabled={buttonsDisabled} type="submit" variant="primary" size="lg">Log In</Button>
                </div>
              </form>
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => closeLoginAdminModal()}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={adminLoggedIn}
        fullscreen={true}
      >
        <Modal.Header>
          <Modal.Title>
            Admin Panel - <i>{adminUserName}</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Game List</Accordion.Header>
              <Accordion.Body>
                <AdminGameList userName={adminUserName} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Mass Operations</Accordion.Header>
              <Accordion.Body>
                <AdminMassOperations userName={adminUserName} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => closeAndLogoutAdminModal()}>Log out as admin</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={activeModal === ACTIVE_MODAL.onePlayerReport}
        fullscreen={true}
      >
        <Modal.Header>
          <Modal.Title>
            Player Report - <i>{activePlayerName}</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OnePlayerReport playerName={activePlayerName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => closeOnePlayerReport()}>CLOSE</Button>
        </Modal.Footer>
      </Modal>

      {spinnerVisible &&
        <div className="spinnerContainer">
          <BallTriangle
            wrapperClass="spinnerClass"
            height="40vh"
            width="40vw"
          />
        </div>
      }
    </div>
  );
};

const validateLoginUserForm = (values: IUserLoginForm) => {
  // console.log("validating form");
  const errors: IUserLoginFormValidationFields = {};

  if (!values.userName || values.userName.length < 3) {
    errors.userName = "Your (nick)name must be at least three characters long";
  }

  if (values.userName && values.userName.length !== values.userName.trim().length) {
    errors.userName = "Leading and ending white spaces are not allowed in (nick)name";
  }

  if (!values.password1 || values.password1?.length < 4) {
    errors.password1 = "Not valid password!";
  }

  if (values.password2 && (values.password1 !== values.password2)) {
    errors.password2 = "Password doesn't match!";
  }

  if (values.email && (values.email.split("@").length !== 2 || values.email.split(".").length < 2)) {
    errors.email = "Not valid email!";
  }

  return errors;
};

const validateLoginAdminForm = (values: IAdminLoginForm) => {
  // console.log("validating form");
  const errors: IAdminLoginFormValidationFields = {};

  if (!values.userName || values.userName.length < 3) {
    errors.userName = "Your (nick)name must be at least three characters long";
  }

  if (!values.password || values.password?.length < 4) {
    errors.password = "Not valid password!";
  }

  return errors;
};

export default HomeScreen;
