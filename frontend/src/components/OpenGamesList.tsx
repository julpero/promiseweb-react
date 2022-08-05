import React from "react";
import { Form, Field } from "react-final-form";
import { socket, SocketContext } from "../socket";
import GameItem from "./GameItem";
import { IGameListItem, IGetGameListRequest, IGetGameListResponse, IJoinLeaveGameRequest } from "../interfaces/IGameList";
import TextInput from "./FormComponents/TextInput";

interface IFormValidationFields {
  myName?: string,
  password1?: string,
  password2?: string,
  gamePassword?: string,
}

interface IFormFields {
  myName: string,
  password1: string,
  password2: string,
  gamePassword?: string,
}

interface IState {
  gameId: string,
  method: null | "join" | "leave",
  isFetching: boolean,
  gameItemList: IGameListItem[],
}

class OpenGamesList extends React.Component<{}, IState> {
  state: IState = {
    gameId: "",
    method: null,
    isFetching: false,
    gameItemList: [],
  }

  static socket = SocketContext;

  getMyId = (): string => window.localStorage.getItem('uUID') ?? "";

  componentDidMount() {
    this.fetchGameItemList();
    socket.on("new game created", (id) => {
      console.log("new game id", id);
      this.fetchGameItemList();
    });
  }

  fetchGameItemList = () => {
    this.setState({ isFetching: true });
    const gameListRequest: IGetGameListRequest = { myId: this.getMyId() };
    socket.emit("get games", gameListRequest, (gameList: IGetGameListResponse) => {
      console.log("gameList", gameList);
      this.setState({ gameItemList: gameList.games, isFetching: false });
    });
  }


  joinGameMethod = (gameId: string, form: any) => {
    this.setState({gameId: gameId, method: "join"}, () => {
      form.submit();
    });
  }

  leaveGameMethod = (gameId: string, form: any) => {
    this.setState({gameId: gameId, method: "leave"}, () => {
      form.submit();
    });
  }

  joinGame = (joinGameRequest: IJoinLeaveGameRequest) => {
    console.log("join", joinGameRequest);

  }

  leaveGame = (joinGameRequest: IJoinLeaveGameRequest) => {
    console.log("leave", joinGameRequest);
  }

  renderGameItems = (form: any) => {
    if (this.state.gameItemList.length === 0) {
      return "No open games at the moment, why don't you just create one by your self?";
    }
    return this.state.gameItemList.map(({created, id, rules, humanPlayers, imInTheGame, playerCount, gameHasPassword}: IGameListItem) => {
      return(
        <GameItem
          key={id}
          created={created}
          id={id}
          rules={rules}
          humanPlayers={humanPlayers}
          imInTheGame={imInTheGame}
          playerCount= {playerCount}
          gameHasPassword={gameHasPassword}
          joinedGameId=""
          onJoin={() => {this.joinGameMethod(id, form)}}
          onLeave={() => {this.leaveGameMethod(id, form)}}
        />
      );
    }
  )};

  onSubmit = (values: IFormFields) => {
    const gameId = this.state.gameId;
    const method = this.state.method;
    if (gameId.length > 0 && method !== null) {
      const request: IJoinLeaveGameRequest = {
        myId: this.getMyId(),
        gameId: gameId,
        myName: values.myName,
        password1: values.password1,
        password2: values.password2,
        gamePassword: values.gamePassword ?? "",
        method: method,
      }
      switch (this.state.method) {
        case "join": {
          this.joinGame(request);
          break;
        }
        case "leave": {
          this.leaveGame(request);
          break;
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form
          onSubmit={this.onSubmit}
          validate={validateForm}
          render={({handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <Field<string>
                    name="myName"
                    component={TextInput}
                    label="My (nick)name in the game"
                  />
                </div>
                <div className="col">
                  <Field<string>
                    name="password1"
                    component={TextInput}
                    label="Password"
                    ispassword="true"
                  />
                </div>
                <div className="col">
                  <Field<string>
                    name="password2"
                    component={TextInput}
                    label="Re-type password if first time user"
                    ispassword="true"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {this.renderGameItems(form)}
                </div>
              </div>
              <input type="hidden" name="gameId" />
            </form>
          )}
        />
        <div>gameItemList { JSON.stringify(this.state.gameItemList) }</div>
      </React.Fragment>
    )
  }
}

const validateForm = (values: IFormFields ) => {
  const errors: IFormValidationFields = {};

  if (!values.password1 || values.password1.length < 4) {
    errors.password1 = "Password must be at least four characters long";
  }

  if (!values.myName || values.myName.length < 4) {
    errors.myName = "Your (nick)name must be at least four characters long";
  }

  if (values.password2?.length > 0 && values.password1 !== values.password2) {
    errors.password2 = "Password doesn't match!";
  }

  return errors;
}

export default OpenGamesList;
