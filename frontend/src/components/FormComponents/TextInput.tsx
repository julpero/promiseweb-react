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

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <div className="form-floating">
    <input
      className="form-control"
      placeholder={rest.label}
      type={rest.ispassword ? "password" : "text"}
      autoComplete={rest.ispassword ? "off" : "on"}
      {...input} {...rest}
    />
    {renderLabel(rest.label)}
  </div>
);

export default TextInput;
