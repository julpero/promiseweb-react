import React from "react";

export interface FormMetaData {
  error: string;
  touched: boolean;
}

export const dangerStyle = ({error, touched}: FormMetaData) => {
  return (touched && error) ? {"borderColor": "red", "color": "red"} as React.CSSProperties : undefined;
};

export const renderLabel = (label: string) => {
  if (!label) return null;

  return(
    <label>
      {label}
    </label>
  );
};

export const renderError = ({error, touched}: FormMetaData) => {
  if (!touched || !error) return null;
  return(
    <p className="text-danger">
      {error}
    </p>
  );
};
