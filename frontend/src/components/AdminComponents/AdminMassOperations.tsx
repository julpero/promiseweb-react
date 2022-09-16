import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IuiGetGamesResponse } from "../../interfaces/IuiAdminOperations";
import { IuiUserData } from "../../interfaces/IuiUser";
import { useSocket } from "../../socket";
import { isAdminLoggedIn, setAdminGameList } from "../../store/adminSlice";

interface IProps {
  userName: string,
}

const AdminMassOperations = ({userName}: IProps) => {
  console.log("AdminMassOperations");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const [logArray, setLogArray] = useState<string[]>([]);
  const [operationInProgress, setOperationInProgress] = useState(false);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  if (!adminLoggedIn) return null;
  if (!userName) return null;

  const updateAllStats = () => {
    setOperationInProgress(true);
    const request: IuiUserData = {
      uuid: getMyId(),
      userName: userName,
      token: getToken(),
    };
    socket.emit("re-create all game statistics", request, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      dispatch(setAdminGameList(getGamesResponse.gameList));
      setOperationInProgress(false);
    });
  };

  const convertAllData = () => {
    setOperationInProgress(true);
    const request: IuiUserData = {
      uuid: getMyId(),
      userName: userName,
      token: getToken(),
    };
    socket.emit("convert old data", request, (convertReport: string[]) => {
      console.log(convertReport);
      setLogArray(convertReport);
      setOperationInProgress(false);
    });
  };

  const renderLogArray = () => {
    return logArray.map((row, ind) => {
      return (
        <div key={ind}>{row}</div>
      );
    });
  };

  return (
    <div>
      <div>
        <Button onClick={() => updateAllStats()} disabled={operationInProgress}>Update all stats</Button>
        &nbsp;
        <Button onClick={() => convertAllData()} disabled={operationInProgress}>Convert old data</Button>
      </div>
      <div>
        {renderLogArray()}
      </div>
    </div>
  );
};

export default AdminMassOperations;
