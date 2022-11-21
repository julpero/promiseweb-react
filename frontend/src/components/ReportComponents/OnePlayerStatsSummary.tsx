import React from "react";
import { IuiOnePlayerReportData } from "../../interfaces/IuiReports";

interface IProps {
  description: string,
  gameReportData: IuiOnePlayerReportData,
}

const OnePlayerStatsSummary = ({description, gameReportData}: IProps) => {
  const {gamesData} = gameReportData;

  console.log(gamesData);

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

  const avgPoints = (): number => {
    return gamesData.reduce((count, game) => {
      return game.roundCount === 19 ? count + game.points : count;
    }, 0);
  };

  const winPercentage = (): string => {
    const winP = gamesData.filter(game => game.position === 1).length/gamesData.length;
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
    return (avgPoints()/gamesData.filter(game => game.roundCount === 19).length).toFixed(1);
  };

  return (
    <div>
      <h5>{description} {gamesData.length} games, {totalRounds()} rounds, {totalPoints()} points</h5>
      Summary:
      [win%: {winPercentage()}]
      [keep%: {keepPercentage()}]
      [avg 10-1-10 points: {avg10to1to10Points()}]
    </div>
  );
};

export default OnePlayerStatsSummary;
