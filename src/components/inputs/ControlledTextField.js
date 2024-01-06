import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { getValueFromObject } from "../../utils/basic";
import { PatternFormat } from "react-number-format";

const ControlledTextField = ({
  formProps,
  name,
  format,
  mask,
  validationKey,
  onBlur = null,
  ignoreError = false,
  ...otherProps
}) => {
  const { control, formState: { errors }, rules } = formProps;

  const isError =
    (getValueFromObject(errors, name) !== undefined && !ignoreError) ||
    otherProps.error;

  const MaskedInput = React.forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format={format}
        mask={mask}
      />
    );
  });

  return (
    <Controller
      name={name}
      control={control}
      disabled={otherProps.disabled}
      rules={
        otherProps.disabled
          ? { a: () => true }
          : getValueFromObject(rules, validationKey ?? name)
      }
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          {...otherProps}
          value={value}
          error={isError}
          InputProps={{
            inputComponent: format ? MaskedInput : null
          }}
          helperText={
            !isError
              ? otherProps.helperText
              : !ignoreError
                ? getValueFromObject(errors, name)?.message ??
                otherProps.helperText
                : undefined
          }
          onChange={(v) => {
            onChange(v);
            if (!!otherProps.onChange) {
              otherProps.onChange(v);
            }
          }}
          onBlur={() => {
            onBlur();
            if (!!otherProps.onBlur) {
              otherProps.onBlur(value);
            }
          }}
        />
      )}
    />
  );
};

export default ControlledTextField;
