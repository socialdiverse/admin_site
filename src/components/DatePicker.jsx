import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

export default function ReactDatePicker({ startDate, setStartDate }) {
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
ReactDatePicker.propTypes = {
  startDate: PropTypes.any.isRequired,
  setStartDate: PropTypes.func.isRequired,
};
