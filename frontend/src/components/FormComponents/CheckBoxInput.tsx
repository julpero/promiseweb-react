import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<boolean, any>;

const renderLabel = (label: any) => {
  if (!label) return null;

  return(
    <label className="form-check-label">
      {label}
    </label>
  )
}

const CheckboxInput: React.FC<Props> = ({input: { value, ...input }, ...rest}: Props) => (
  <div className="form-check">
    <input className="form-check-input" {...input} type="checkbox" checked={!!value} />
    {renderLabel(rest.label)}
  </div>
);

export default CheckboxInput;
