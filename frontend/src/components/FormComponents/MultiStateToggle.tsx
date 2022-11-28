import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "./MultiStateToggle.css";

interface IProps {
  states: string[],
  labels?: string[],
  label?: string,
  onChange?: (state: string) => void,
}

const MultiStateToggle = ({states, labels, label, onChange}: IProps) => {
  const [selectedState, setSelectedState] = useState(states.at(0) ?? "");

  const handleClick = (state: string) => {
    if (state !== selectedState) {
      setSelectedState(state);
      if (onChange) {
        onChange(state);
      }
    }
  };

  const stateClass = (state: string): string => {
    if (state === selectedState) {
      switch (state) {
        case "default": return "";
        case "in": return "btn-success";
        case "out": return "btn-danger";
        default: return "";
      }
    } else {
      return "btn-secondary";
    }
  };

  const renderButtons = () => {
    return (
      <ButtonGroup>
        {
          states.map((state, ind) => {
            return (
              <Button
                key={ind}
                className={`btn btn-sm btn-xs ${stateClass(state)}`}
                onClick={() => handleClick(state)}
              >{labels?.at(ind) ?? state}</Button>
            );
          })
        }
      </ButtonGroup>
    );
  };

  const renderLabel = () => {
    if (!label) return null;
    return <span className="labelSpan">{label}</span>;
  };

  return (
    <React.Fragment>
      {renderButtons()}
      {renderLabel()}
    </React.Fragment>
  );
};

export default MultiStateToggle;
