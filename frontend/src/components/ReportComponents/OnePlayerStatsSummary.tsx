import React from "react";
import { IuiOnePlayerReportData } from "../../interfaces/IuiReports";

interface IProps {
  gameReportData?: IuiOnePlayerReportData,
}

const OnePlayerStatsSummary = ({gameReportData}: IProps) => {
  return (
    <React.Fragment>
      Summary
    </React.Fragment>
  );
};

export default OnePlayerStatsSummary;
