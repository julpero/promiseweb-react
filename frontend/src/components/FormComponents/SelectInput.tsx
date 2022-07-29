import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const renderLabel = (label: string) => {
  if (!label) return null;

  return(
    <label>
      {label}
    </label>
  )
}

const SelectInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <div className={rest.issmall ? "" : "form-floating" }>
    <select className={`form-select ${rest.issmall ? "form-select-sm" : ""}`} {...input} {...rest} />
    {renderLabel(rest.label)}
  </div>
);

export default SelectInput;
