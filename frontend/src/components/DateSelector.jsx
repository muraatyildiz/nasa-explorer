import React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const DateSelector = ({ label, value, onChange, maxDate = new Date() }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newDate) => newDate && onChange(newDate)}
        maxDate={maxDate}
        slotProps={{ textField: { size: "small" } }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
