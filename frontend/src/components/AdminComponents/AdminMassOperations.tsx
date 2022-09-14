import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IuiAdminRequest, IuiGetGamesResponse } from "../../interfaces/IuiAdminOperations";
import { useSocket } from "../../socket";
import { isAdminLoggedIn, setAdminGameList } from "../../store/adminSlice";

interface IProps {
  userName: string,
}

const AdminMassOperations = ({userName}: IProps) => {
  console.log("AdminMassOperations");
  const adminLoggedIn = useSelector(isAdminLoggedIn);
  const [operationInProgress, setOperationInProgress] = useState(false);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";

  if (!adminLoggedIn) return null;
  if (!userName) return null;

  const updateAllStats = () => {
    setOperationInProgress(true);
    const request: IuiAdminRequest = {
      uuid: getMyId(),
      userName: userName,
    };
    socket.emit("re-create all game statistics", request, (getGamesResponse: IuiGetGamesResponse) => {
      console.log(getGamesResponse);
      dispatch(setAdminGameList(getGamesResponse.gameList));
      setOperationInProgress(false);
    });
  };

  return (
    <div>
      <Button onClick={() => updateAllStats()} disabled={operationInProgress}>Update all stats</Button>
    </div>
  );
};

export default AdminMassOperations;
