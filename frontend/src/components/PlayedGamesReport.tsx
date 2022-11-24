import React, { useEffect, useState } from "react";
import { IuiPlayedGamesReport } from "../interfaces/IuiGameReports";
import { useSocket } from "../socket";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/userSlice";
import { IuiUserData } from "../interfaces/IuiUser";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import PlayedGamesByPlayerCount from "./ReportComponents/PlayedGamesByPlayerCount";
import { RowComponent } from "tabulator-tables";
import { setSpinnerVisible } from "../store/spinnerSlice";
import { Button, Modal } from "react-bootstrap";
import OneGameReport from "./OneGameReport";

import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import UsedRulesGraph from "./ReportComponents/UsedRulesGraph";
import { HIDDEN_CARDS_MODE, RULE } from "../interfaces/IuiGameOptions";

interface IProps {
  openPlayerReport: (playerName: string) => void,
}

const PlayedGamesReport = (props: IProps) => {
  // console.log("PlayedGamesReport");
  const [reportData, setReportData] = useState<IuiPlayedGamesReport>();
  const [activeGame, setActiveGame] = useState("");
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const colorArr = [
    "#FF0000",
    "#FF1100",
    "#FF2200",
    "#FF3300",
    "#FF4400",
    "#FF5500",
    "#FF6600",
    "#FF7700",
    "#FF8800",
    "#FF9900",
    "#FFAA00",
    "#FFBB00",
    "#FFCC00",
    "#FFDD00",
    "#FFEE00",
    "#FFFF00",
    "#EEFF00",
    "#DDFF00",
    "#CCFF00",
    "#BBFF00",
    "#AAFF00",
    "#99FF00",
    "#88FF00",
    "#77FF00",
    "#66FF00",
    "#55FF00",
    "#44FF00",
    "#33FF00",
    "#22FF00",
    "#11FF00",
    "#00FF00"
  ];

  const columns: ColumnDefinition[] = [
    {
      title: "(Nick)Name",
      field: "playerName",
      sorter: "string",
    },
    {
      title: "Games",
      headerTooltip: "Total played games",
      field: "count",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: 0,
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.count) ?? [])),
        color: colorArr,
        legend: (val) => val,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "Keeps-%",
      headerTooltip: "Average keep-% of promises from all games",
      field: "avgKeepPercentage",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: 0,
        max: 100,
        color: colorArr,
        legend: (val) => `${parseFloat(val).toFixed(1)}%`,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "AvgPoints",
      headerTooltip: "Average points of games with 10-1-10 rounds",
      field: "avgPoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.avgPoints) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.avgPoints) ?? [])),
        color: colorArr,
        legend: (val) => parseFloat(val).toFixed(1),
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "TotalPoints",
      headerTooltip: "Total points of all played games",
      field: "totalPoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.totalPoints) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.totalPoints) ?? [])),
        color: colorArr,
        legend: (val) => val,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "ScorePoints",
      headerTooltip: "Average score points, score point = ((players in the game - position) / players in the game)",
      field: "avgScorePoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.avgScorePoints) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.avgScorePoints) ?? [])),
        color: colorArr,
        legend: (val) => parseFloat(val).toFixed(3),
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "Wins",
      headerTooltip: "Count of all games player has won",
      field: "wins",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.wins) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.wins) ?? [])),
        color: colorArr,
        legend: (val) => val,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "Win-%",
      headerTooltip: "Winning percentage of all games player has played",
      field: "winPercentage",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.winPercentage) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.winPercentage) ?? [])),
        color: colorArr,
        legend: (val) => `${parseFloat(val).toFixed(1)}%`,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "% of win points",
      headerTooltip: "Average of game winning points of all games",
      field: "avgPercentagePoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: 0,
        max: 100,
        color: colorArr,
        legend: (val) => `${parseFloat(val).toFixed(1)}%`,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
  ];

  useEffect(() => {
    // console.log("PlayedGamesReport A");
    if (user.isUserLoggedIn) {
      const request: IuiUserData = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };
      dispatch(setSpinnerVisible(true));
      // console.time("get report data");
      socket.emit("get report data", request, (reportData: IuiPlayedGamesReport) => {
        console.log("report data", reportData);
        // console.timeEnd("get report data");
        if (reportData.isAuthenticated) {
          handleAuthenticatedRequest(reportData.token);
          setReportData(reportData);
          dispatch(setSpinnerVisible(false));
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [user, dispatch, socket]);

  const openPlayerReport = (playerName: string) => {
    props.openPlayerReport(playerName);
  };

  const closeModal = () => {
    setActiveGame("");
  };

  const usedRulesToMap = (usedRulesJson: string): Map<RULE, number> => {
    const retMap = new Map<RULE, number>(JSON.parse(usedRulesJson));
    console.log(retMap);
    return retMap;
  };

  const usedCardModesToMap = (usedCardModesJson: string): Map<HIDDEN_CARDS_MODE, number> => {
    const retMap = new Map<HIDDEN_CARDS_MODE, number>(JSON.parse(usedCardModesJson));
    console.log(retMap);
    return retMap;
  };

  return (
    <div>
      <hr />
      {reportData &&
        <div className="row">
          <div className="col">
            <p>Total of {reportData?.gamesPlayed} games and {reportData?.roundsPlayed} rounds played so far...</p>
            <p>... and there were {reportData?.playerCount} players in those games and they hit {reportData?.totalCardsHit} cards while playing.</p>
          </div>
          <div className="col">
            <p>Last five games</p>
            <ul>
              {reportData?.lastGames?.map((game, ind) => {
                return (
                  <li key={ind}>
                    <span onClick={() => setActiveGame(game.gameId)} style={{cursor: "pointer"}}>{format(parseISO(game.played.toString()), "dd MMM yyyy HH:mm:ss")}</span>
                    &nbsp;-&nbsp;
                    <span>{game.humanPlayers.map((player, idx) => {
                      if (idx === 0) {
                        return <strong key={idx}>{`${player}, `}</strong>;
                      } else if (idx === game.humanPlayers.length-1) {
                        return player;
                      } else {
                        return `${player}, `;
                      }
                    })}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      }
      {reportData &&
        <ReactTabulator
          columns={columns}
          events={{rowClick: (e: UIEvent, r: RowComponent) => {
            const playerName = r.getData().playerName;
            if (playerName) {
              openPlayerReport(playerName);
            }
          }}}
          data={reportData?.gamesByPlayer ?? []}
          options={{
            initialSort: [{
              column: "count"
            }],
            layout: "fitColumns",
          }}
        />
      }
      {reportData &&
        <PlayedGamesByPlayerCount gameReportData={reportData?.playersTotal} max={reportData?.gamesPlayed ?? 0} />
      }
      {reportData &&
        <UsedRulesGraph
          vanillaGamesCount={reportData?.vanillaGamesCount}
          usedRulesCount={usedRulesToMap(reportData.usedRulesCount)}
          hiddenCardsModeCount={usedCardModesToMap(reportData.hiddenCardsModeCount)}
        />
      }
      {reportData && activeGame !== "" &&
        <Modal
          show={activeGame !== ""}
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
      }
    </div>
  );
};

export default PlayedGamesReport;
