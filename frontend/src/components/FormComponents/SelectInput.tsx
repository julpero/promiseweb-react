import React from "react";
import { FieldRenderProps } from "react-final-form";

import { FormMetaData, dangerStyle, renderError, renderLabel } from "./Decorators";

type Props = FieldRenderProps<string, any>;

const SelectInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <div className={rest.issmall ? "" : "form-floating" }>
    <select
      style={dangerStyle(meta as FormMetaData)}
      className={`form-select ${rest.issmall ? "form-select-sm" : ""}`}
      {...input} {...rest}
    />
    {renderLabel(rest.label)}
    {renderError(meta as FormMetaData)}
  </div>
);

export default SelectInput;
