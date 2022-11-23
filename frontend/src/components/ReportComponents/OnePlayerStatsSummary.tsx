import React from "react";
import { IuiOnePlayerReportData } from "../../interfaces/IuiReports";

interface IProps {
  description: string,
  gameReportData: IuiOnePlayerReportData,
}

const OnePlayerStatsSummary = ({description, gameReportData}: IProps) => {
  const {gamesData} = gameReportData;

  // console.log(gamesData);

  const totalRounds = (): number => {
    return gamesData.reduce((count, game) => {
      return count + game.roundCount;
    }, 0);
  };

  const totalPoints = (): number => {
    return gamesData.reduce((count, game) => {
      return count + game.points;
    }, 0);
  };

  const totalScorePoints = (): number => {
    return gamesData.reduce((count, game) => {
      return count + game.scorePoints;
    }, 0);
  };

  const totalPercentageOfWinningPoints = (): number => {
    return gamesData.reduce((count, game) => {
      return count + game.pOfWinPoints;
    }, 0);
  };

  const totalPointsByRoundCount = (rounds: number): number => {
    return gamesData.reduce((count, game) => {
      return game.roundCount === rounds ? count + game.points : count;
    }, 0);
  };

  const winCount = (): number => {
    return gamesData.filter(game => game.position === 1).length;
  };

  const winPercentage = (): string => {
    const winP = winCount()/gamesData.length;
    return (winP * 100).toFixed(1)+"%";
  };

  const keepPercentage = (): string => {
    let weightedKeepP = 0;
    const totRounds = totalRounds();
    for (let i = 0; i < gamesData.length; i++) {
      weightedKeepP += gamesData[i].keepP * gamesData[i].roundCount;
    }
    const keepP = weightedKeepP / totRounds;
    return keepP.toFixed(1)+"%";
  };

  const avg10to1to10Points = (): string => {
    return (totalPointsByRoundCount(19)/gamesData.filter(game => game.roundCount === 19).length).toFixed(1);
  };

  const avgScorePoints = (): string => {
    return (totalScorePoints()/gamesData.length).toFixed(3);
  };

  const avgWinPoints = (): string => {
    return (totalPercentageOfWinningPoints()/gamesData.length).toFixed(1)+"%";
  };

  return (
    <div>
      <h5>{description} {gamesData.length} games, {winCount()} wins, {totalRounds()} rounds, {totalPoints()} points</h5>
      Summary:
      [win%: {winPercentage()}]
      [keep%: {keepPercentage()}]
      [avg score points: {avgScorePoints()}]
      [avg 10-1-10 points: {avg10to1to10Points()}]
      [avg% of win-points: {avgWinPoints()}]
    </div>
  );
};

export default OnePlayerStatsSummary;
