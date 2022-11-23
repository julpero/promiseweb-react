import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiOneGameData, IuiOnePlayerReportData, IuiOnePlayerReportRequest, IuiOnePlayerReportResponse } from "../interfaces/IuiReports";
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
import OnePlayerStatsPerPlayersInGame from "./ReportComponents/OnePlayerStatsPerPlayersInGame";
import OnePlayerStatsSummary from "./ReportComponents/OnePlayerStatsSummary";

interface IProps {
  playerName: string,
}

const OnePlayerReport = ({playerName}: IProps) => {
  const [allReportData, setAllReportData] = useState<IuiOneGameData[]>();
  const [reportDataToShow, setReportDataToShow] = useState<IuiOnePlayerReportData>();

  const [yearFilter, setYearFilter] = useState("");
  const [playerFilter, setPlayerFilter] = useState<string[]>([]);

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
          setAllReportData(playerReportResponse.onePlayerReport.gamesData);
          setReportDataToShow({...playerReportResponse.onePlayerReport || undefined});
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [playerName, user, socket, dispatch]);

  useEffect(() => {
    const handleTimeLineReportFilter = (): IuiOnePlayerReportData | undefined => {
      const now = Date.now();
      const minusWeek = sub(now, {weeks: 1});
      const minusMonth = sub(now, {months: 1});
      const minusMonth2 = sub(now, {months: 2});
      const minusMonth3 = sub(now, {months: 3});
      const minusMonth6 = sub(now, {months: 6});
      const minusYear = sub(now, {years: 1});
      if (allReportData) {
        // console.log("yearFilter", yearFilter);
        switch (yearFilter) {
          case "-1wk": {
            return {
              playerName: playerName,
              gamesData: allReportData.filter(data => isAfter(parseISO(data.started.toString()), minusWeek)),
            };
          }
          case "-1mo": {
            return {
              playerName: playerName,
              gamesData: allReportData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth)),
            };
          }
          case "-2mo": {
            return {
              playerName: playerName,
              gamesData: allReportData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth2)),
            };
          }
          case "-3mo": {
            return {
              playerName: playerName,
              gamesData: allReportData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth3)),
            };
          }
          case "-6mo": {
            return {
              playerName: playerName,
              gamesData: allReportData.filter(data => isAfter(parseISO(data.started.toString()), minusMonth6)),
            };
          }
          case "-1year": {
            return {
              playerName: playerName,
              gamesData: allReportData.filter(data => isAfter(parseISO(data.started.toString()), minusYear)),
            };
          }
          default: {
            const year = parseInt(yearFilter, 10);
            if (!isNaN(year)) {
              return {
                playerName: playerName,
                gamesData: allReportData.filter(data => getYear(parseISO(data.started.toString())) === year),
              };
            } else {
              return {
                playerName: playerName,
                gamesData: allReportData,
              };
            }
          }
        }
      }
    };

    if (allReportData) {
      // console.log("allReportData", allReportData);
      const reportToShow = handleTimeLineReportFilter();
      // console.log("reportToShow 1", reportToShow);
      if (reportToShow?.gamesData && playerFilter.length > 0) {
        // console.log("playerFilter", playerFilter);

        const gamesToReport: IuiOneGameData[] = [];
        reportToShow?.gamesData.forEach(game => {
          let includeGame = true;
          playerFilter.forEach(filter => {
            if (!game.opponents.some(opponent => opponent === filter)) {
              includeGame = false;
            }
          });
          if (includeGame) {
            gamesToReport.push(game);
          }
          // console.log(`game ${game.gameId} to report ${includeGame}`);
        });
        reportToShow.gamesData = gamesToReport;
        // console.log("reportToShow 2", reportToShow);
      }
      setReportDataToShow(reportToShow);

    }
  }, [yearFilter, playerFilter, playerName, allReportData]);

  const renderYearButtons = () => {
    const yearArr = allReportData?.flatMap(data => getYear(parseISO(data.started.toString())).toString()) ?? [];
    const distinctYearArr = Array.from(new Set( [...yearArr] ));
    return distinctYearArr.map((year, ind) => {
      return (
        <Button className="timeLineButton" key={ind} size="sm" onClick={() => setYearFilter(year)}>
          {year}
        </Button>
      );
    });
  };

  const renderTimeLine = () => {
    return (
      <div>
        <Button className="timeLineButton" size="sm" onClick={() => setYearFilter("all")}>
          All
        </Button>
        {renderYearButtons()}
        <Button className="timeLineButton" size="sm"  onClick={() => setYearFilter("-1year")}>
          -1 year
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => setYearFilter("-6mo")}>
          -6 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => setYearFilter("-3mo")}>
          -3 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => setYearFilter("-2mo")}>
          -2 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => setYearFilter("-1mo")}>
          -1 mo
        </Button>
        <Button className="timeLineButton" size="sm"  onClick={() => setYearFilter("-1wk")}>
          -1 wk
        </Button>
      </div>
    );
  };

  const handleOpponentFilterClick = (opponentName: string, filterOn: boolean) => {
    // console.log(opponentName, filterOn);
    let currentFilter = [...playerFilter];
    if (filterOn) {
      if (!currentFilter.some(opponent => opponent === opponentName)) {
        currentFilter.push(opponentName);
      }
    } else {
      currentFilter = currentFilter.filter(opponent => opponent !== opponentName);
    }
    // console.log(currentFilter);
    setPlayerFilter(currentFilter);
  };

  const renderPlayerButtons = () => {
    // console.log("allReportData", allReportData);
    const playersArr = allReportData?.flatMap(data => data.opponents) ?? [];
    const distinctPlayersArr = Array.from(new Set( [...playersArr] ));
    return distinctPlayersArr.sort((a: string, b: string) => a.localeCompare(b)).map((player, ind) => {
      return (
        <Form.Check inline type="switch" id={`inline-switch-${ind}`} key={ind} label={player} name={player} onChange={(e) => handleOpponentFilterClick(e.target.name, e.target.checked)} />
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
      {allReportData &&
        <OnePlayerStatsSummary description="Total" gameReportData={{playerName: playerName, gamesData: allReportData}} />
      }
      <hr />
      {allReportData &&
        renderTimeLine()
      }
      {allReportData &&
        renderPlayerSwitch()
      }
      {reportDataToShow &&
        <OnePlayerStatsSummary description="Filtered" gameReportData={reportDataToShow} />
      }

      <OnePlayerStatsPerOpponents gameReportData={reportDataToShow} />
      <OnePlayerStatsPerPlayers gameReportData={reportDataToShow} />
      <OnePlayerStatsPerPlayersInGame gameReportData={reportDataToShow} />
      <OnePlayerStats gameReportData={reportDataToShow} />
    </React.Fragment>
  );
};

export default OnePlayerReport;
