import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiOnePlayerReportData, IuiOnePlayerReportRequest, IuiOnePlayerReportResponse } from "../interfaces/IuiReports";
import { useSocket } from "../socket";
import { getUser } from "../store/userSlice";
import OnePlayerStats from "./ReportComponents/OnePlayerStats";
import parseISO from "date-fns/parseISO";
import getYear from "date-fns/getYear";
import isAfter from "date-fns/isAfter";
import sub from "date-fns/sub";
import { setSpinnerVisible } from "../store/spinnerSlice";
import OnePlayerStatsPerPlayers from "./ReportComponents/OnePlayerStatsPerPlayers";
import Form from "react-bootstrap/Form";
import OnePlayerStatsPerOpponents from "./ReportComponents/OnePlayerStatsPerOpponents";

interface IProps {
  playerName: string,
}

const OnePlayerReport = ({playerName}: IProps) => {
  const [reportData, setReportData] = useState<IuiOnePlayerReportData>();
  const [reportDataToShow, setReportDataToShow] = useState<IuiOnePlayerReportData>();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    if (playerName && user.isUserLoggedIn) {
      dispatch(setSpinnerVisible(true));
      const reportRequest: IuiOnePlayerReportRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        playerName: playerName,
      };
      // console.time("get one player report");
      socket.emit("get one player report", reportRequest, (playerReportResponse: IuiOnePlayerReportResponse) => {
        // console.timeEnd("get one player report");
        // console.log("playerReportResponse", playerReportResponse);
        dispatch(setSpinnerVisible(false));
        if (playerReportResponse.isAuthenticated) {
          handleAuthenticatedRequest(playerReportResponse.token);
          setReportData(playerReportResponse.onePlayerReport);
          setReportDataToShow(playerReportResponse.onePlayerReport);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [playerName, user, socket, dispatch]);

  const handleTimeLineButtons = (button: string) => {
    const now = Date.now();
    const minusWeek = sub(now, {weeks: 1});
    const minusMonth = sub(now, {months: 1});
    const minusMonth2 = sub(now, {months: 2});
    const minusMonth3 = sub(now, {months: 3});
    const minusMonth6 = sub(now, {months: 6});
    const minusYear = sub(now, {years: 1});
    if (reportData) {
      switch (button) {
        case "-1wk": {
          setReportDataToShow({
            playerName: reportData.playerName,
            gamesData: reportData.gamesData.filter(data => isAfter(parseISO(data.started.toString()), minusWeek)),
          });
          break;
        }
        case "-1mo": {
          setReportDataToShow({
            playerName: reportData.playerName,
            gamesData: reportData.gamesData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth)),
          });
          break;
        }
        case "-2mo": {
          setReportDataToShow({
            playerName: reportData.playerName,
            gamesData: reportData.gamesData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth2)),
          });
          break;
        }
        case "-3mo": {
          setReportDataToShow({
            playerName: reportData.playerName,
            gamesData: reportData.gamesData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth3)),
          });
          break;
        }
        case "-6mo": {
          setReportDataToShow({
            playerName: reportData.playerName,
            gamesData: reportData.gamesData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth6)),
          });
          break;
        }
        case "-1year": {
          setReportDataToShow({
            playerName: reportData.playerName,
            gamesData: reportData.gamesData.filter(data => isAfter(parseISO(data.started.toString()), minusYear)),
          });
          break;
        }
        default: {
          const year = parseInt(button, 10);
          if (!isNaN(year)) {
            setReportDataToShow({
              playerName: reportData.playerName,
              gamesData: reportData.gamesData.filter(data => getYear(parseISO(data.started.toString())) === year),
            });
          } else {
            setReportDataToShow(reportData);
          }
          break;
        }
      }
    }
  };

  const renderYearButtons = () => {
    const yearArr = reportData?.gamesData.flatMap(data => getYear(parseISO(data.started.toString())).toString()) ?? [];
    const distinctYearArr = Array.from(new Set( [...yearArr] ));
    return distinctYearArr.map((year, ind) => {
      return (
        <Button className="timeLineButton" key={ind} size="sm" onClick={() => handleTimeLineButtons(year)}>
          {year}
        </Button>
      );
    });
  };

  const renderTimeLine = () => {
    return (
      <div>
        <Button className="timeLineButton" size="sm" onClick={() => handleTimeLineButtons("all")}>
          All
        </Button>
        {renderYearButtons()}
        <Button className="timeLineButton" size="sm"  onClick={() => handleTimeLineButtons("-1year")}>
          -1 year
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => handleTimeLineButtons("-6mo")}>
          -6 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => handleTimeLineButtons("-3mo")}>
          -3 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => handleTimeLineButtons("-2mo")}>
          -2 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => handleTimeLineButtons("-1mo")}>
          -1 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => handleTimeLineButtons("-1wk")}>
          -1 wk
        </Button>
      </div>
    );
  };

  const renderPlayerButtons = () => {
    const playersArr = reportData?.gamesData.flatMap(data => data.opponents) ?? [];
    const distinctPlayersArr = Array.from(new Set( [...playersArr] ));
    return distinctPlayersArr.sort((a: string, b: string) => a.localeCompare(b)).map((player, ind) => {
      return (
        <Form.Check inline type="switch" id={`inline-switch-${ind}`} key={ind} label={player} />
      );
    });
  };

  const renderPlayerSwitch = () => {
    return (
      <Form>
        <div key="inline-switch" className="mb-3">
          {renderPlayerButtons()}
        </div>
      </Form>
    );
  };

  return (
    <React.Fragment>
      {reportData &&
        renderTimeLine()
      }
      {reportData &&
        renderPlayerSwitch()
      }
      <OnePlayerStatsPerOpponents gameReportData={reportDataToShow} />
      <OnePlayerStatsPerPlayers gameReportData={reportDataToShow} />
      <OnePlayerStats gameReportData={reportDataToShow} />
    </React.Fragment>
  );
};

export default OnePlayerReport;
