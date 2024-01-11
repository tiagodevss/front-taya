import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { getValueFromObject } from "../../utils/basic";
import ZipCodeTextField from "./ZipCodeTextField";

const ControlledTextField = ({
  formProps,
  name,
  value,
  validationKey,
  ignoreError = false,
  format,
  component,
  ...otherProps
}) => {
  const { control, formState: { errors }, rules } = formProps;
  const isError =
    (getValueFromObject(errors, name) !== undefined && !ignoreError) ||
    otherProps.error;

  return (
    <Controller
      name={name}
      control={control}
      disabled={otherProps.disabled}
      defaultValue={value}
      rules={validationKey}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        return <>
          <TextField
            {...otherProps}
            inputRef={ref}
            value={value}
            error={isError}
            helperText={isError ? errors[name]?.message : " "}
            className="controlled-text-field"
            style={{ margin: 5 }}
            InputProps={format ? {
              inputComponent: format,
            } : undefined}
            onChange={(value) => {
              onChange(value);
              if (!!otherProps.onChange) {
                otherProps.onChange(value);
              }
            }}
            onBlur={() => {
              onBlur();
              if (!!otherProps.onBlur) {
                otherProps.onBlur(formProps.getValues());
              }
            }}
          />
        </>
      }}
    />
  );
};

export default ControlledTextField;
