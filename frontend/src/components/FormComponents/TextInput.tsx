import React from "react";
import Form from 'react-bootstrap/Form';
import { FieldRenderProps } from "react-final-form";
import { FormMetaData, dangerStyle, renderError, renderLabel } from "./Decorators";

type Props = FieldRenderProps<string, any>;

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <div className="form-floating">
    <Form.Control
      style={dangerStyle(meta as FormMetaData)}
      className="form-control"
      placeholder={rest.label}
      type={rest.ispassword ? "password" : "text"}
      autoComplete={rest.ispassword ? "off" : "on"}
      {...input} {...rest}
    />
    {renderLabel(rest.label)}
    {renderError(meta as FormMetaData)}
  </div>
);

export default TextInput;
