import React from "react";
import { NumberFormatBase } from "react-number-format";
import { removeNonDigitsFromString } from "../../utils/basic";

const formatDate = (value) => {
  const stripped = removeNonDigitsFromString(value);

  let finalValue = stripped.slice(0, 2);
  if (stripped.length > 2) {
    finalValue += "/" + stripped.slice(2, 4);
  }
  if (stripped.length > 4) {
    finalValue += "/" + stripped.slice(4, 8);
  }
  return finalValue;
};

const DateTextField = React.forwardRef(({ onChange, ...other }, ref) => {
  return (
    <NumberFormatBase
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.formattedValue,
          },
        });
      }}
      format={formatDate}
    />
  );
});

export default DateTextField;
