import React from "react";

import { ruleToStr } from "../common/enumFunctions";
import { IuiRules } from "../interfaces/IuiGameList";
import { HIDDEN_CARDS_MODE } from "../interfaces/IuiGameOptions";

interface IProps {
  rules: IuiRules,
  classStr?: string,
}

const RuleList = ({rules, classStr}: IProps) => {
  const renderRuleList = () => {
    return rules.ruleList.map((rule) => {
      return (
        <li key={rule.toString()}>{ruleToStr(rule)}</li>
      );
    });
  };

  if (rules.ruleList.length === 0 && rules.hiddenCardsMode === HIDDEN_CARDS_MODE.normal) {
    return <span>vanilla game</span>;
  } else {
    return(
      <ul className={classStr ?? ""}>
        {renderRuleList()}
      </ul>
    );
  }
};

export default RuleList;
