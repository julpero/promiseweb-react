import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { hashUserName } from "../../common/userFunctions";
import { IuiAdminRequest, IuiGetGamesResponse } from "../../interfaces/IuiAdminOperations";
import { useSocket } from "../../socket";
import { isAdminLoggedIn } from "../../store/adminSlice";

interface IProps {
  userName: string,
}

const AdminMassOperations = ({userName}: IProps) => {
  console.log("AdminMassOperations");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const [operationInProgress, setOperationInProgress] = useState(false);

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  if (!adminLoggedIn) return null;
  if (!userName) return null;

  const updateAllStats = () => {
    setOperationInProgress(true);
    const request: IuiAdminRequest = {
      uuid: getMyId(),
      userName: userName,
      hash: hashUserName(userName),
    };
    socket.emit("get games for admin", request, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      setOperationInProgress(false);
      // setGameList(getGamesResponse.gameList);
    });
  };

  return (
    <div>
      <Button onClick={() => updateAllStats()} disabled={operationInProgress}>Update all stats</Button>
    </div>
  );
};

export default AdminMassOperations;
