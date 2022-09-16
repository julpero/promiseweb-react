import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../socket";

import Accordion from "react-bootstrap/Accordion";
import { Button, Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";

import OpenGamesList from "../components/OpenGamesList";
import CreateGame from "../components/CreateGame";
import JoinGameById from "../components/JoinGameById";
import PlayedGamesReport from "../components/PlayedGamesReport";
import TextInput from "../components/FormComponents/TextInput";
import { IuiLoginRequest, IuiLoginResponse, LOGIN_RESPONSE } from "../interfaces/IuiUser";
import AdminGameList from "../components/AdminComponents/AdminGameList";
import { isAdminLoggedIn, setAdminLoggedIn } from "../store/adminSlice";
import AdminMassOperations from "../components/AdminComponents/AdminMassOperations";
import { isUserLoggedIn, setUserLoggedIn } from "../store/userSlice";

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

interface IProps {
  onJoin: () => void,
}

const HomeScreen = ({onJoin}: IProps) => {
  const [showLoginAdminModal, setShowLoginAdminModal] = useState(false);
  const [adminUserName, setAdminUserName] = useState("");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const userLoggedIn = useSelector(isUserLoggedIn);
  const dispatch = useDispatch();
  const accRef = createRef<HTMLHeadingElement>();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  const handleGameCreation = () => {
    if (accRef.current?.firstElementChild) {
      (accRef.current.firstElementChild as HTMLButtonElement).click();
    }
  };

  const closeLoginUserModal = () => {
    dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
  };

  const closeLoginAdminModal = () => {
    setShowLoginAdminModal(false);
    dispatch(setAdminLoggedIn(false));
    setAdminUserName("");
  };

  const closeAndLogoutAdminModal = () => {
    closeLoginAdminModal();
    setAdminUserName("");
  };

  const onLoginUserSubmit = ({userName, password1, password2, email}: IUserLoginForm) => {
    const loginRequest: IuiLoginRequest = {
      uuid: getMyId(),
      userName: userName,
      password1: password1,
      password2: password2,
      email: email,
    };
    console.log("loginRequest", loginRequest);
    socket.emit("user login", loginRequest, (loginResponse: IuiLoginResponse) => {
      console.log("loginResponse", loginResponse);
      if (loginResponse.loginStatus === LOGIN_RESPONSE.ok && loginResponse.isAuthenticated) {
        dispatch(setUserLoggedIn({loggedIn: true, name: loginRequest.userName}));
        window.localStorage.setItem("token", loginResponse.token ?? "");
      } else {
        dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
        window.localStorage.removeItem("token");
      }
    });
  };

  const onLoginSubmit = ({userName, password}: IAdminLoginForm) => {
    const loginRequest: IuiLoginRequest = {
      uuid: getMyId(),
      userName: userName,
      password1: password,
    };
    socket.emit("admin login", loginRequest, (loginResponse: IuiLoginResponse) => {
      console.log("loginResponse", loginResponse);
      if (loginResponse.loginStatus === LOGIN_RESPONSE.ok) {
        dispatch(setAdminLoggedIn(true));
        setAdminUserName(loginRequest.userName);
      } else {
        dispatch(setAdminLoggedIn(false));
        setAdminUserName("");
      }
    });
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
          <Accordion.Header>Join Game by Id</Accordion.Header>
          <Accordion.Body>
            <JoinGameById onJoin={onJoin} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <PlayedGamesReport />

      <div className="adminButtonDiv">
        <Button onClick={() => setShowLoginAdminModal(true)}>Admin</Button>
      </div>

      <Modal
        show={!userLoggedIn}
        onHide={() => closeLoginUserModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Log in / Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onLoginUserSubmit}
            validate={validateLoginUserForm}
            render={({handleSubmit, submitting}) => (
              <form onSubmit={handleSubmit}>
                <Field<string>
                  name="userName"
                  component={TextInput}
                  label="(Nick)Name"
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
                  <Button disabled={submitting} type="submit" variant="primary" size="lg">Log In / Register</Button>
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
        show={showLoginAdminModal}
        onHide={() => closeLoginAdminModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Admin Panel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onLoginSubmit}
            validate={validateLoginForm}
            render={({handleSubmit, submitting}) => (
              <form onSubmit={handleSubmit}>
                <Field<string>
                  name="userName"
                  component={TextInput}
                  label="User name"
                />
                <Field<string>
                  name="password"
                  component={TextInput}
                  label="Password"
                  ispassword="true"
                />
                <div className="d-grid gap-2">
                  <Button disabled={submitting} type="submit" variant="primary" size="lg">Log In</Button>
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
              <Accordion.Body><AdminGameList userName={adminUserName} /></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Mass Operations</Accordion.Header>
              <Accordion.Body><AdminMassOperations userName={adminUserName} /></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => closeAndLogoutAdminModal()}>Log out</Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
};

const validateLoginUserForm = (values: IUserLoginForm) => {
  // console.log("validating form");
  const errors: IUserLoginFormValidationFields = {};

  if (!values.userName || values.userName.length < 3) {
    errors.userName = "Your (nick)name must be at least three characters long";
  }

  if (!values.password1 || values.password1?.length < 4) {
    errors.password1 = "Password doesn't match!";
  }

  if (values.password2 && (values.password1 !== values.password2)) {
    errors.password2 = "Password doesn't match!";
  }

  if (values.email && (values.email.split("@").length !== 2 || values.email.split(".").length < 2)) {
    errors.email = "Not valid email!";
  }

  return errors;
};

const validateLoginForm = (values: IAdminLoginForm) => {
  // console.log("validating form");
  const errors: IAdminLoginFormValidationFields = {};

  if (!values.userName || values.userName.length < 3) {
    errors.userName = "Your (nick)name must be at least three characters long";
  }

  if (!values.password || values.password?.length < 4) {
    errors.password = "Password doesn't match!";
  }

  return errors;
};

export default HomeScreen;
