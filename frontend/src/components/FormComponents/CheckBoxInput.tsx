import React from "react";
import Form from "react-bootstrap/Form";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<boolean, any>;

const CheckboxInput: React.FC<Props> = ( { input: { value }, onChange, label, ...rest}: Props) => {
  return (
    <div>
      <Form.Check
        inline
        type="switch"
        checked={!!value}
        label={label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.checked);
        }}
        {...rest}
      />
    </div>
  );
};

export default CheckboxInput;
