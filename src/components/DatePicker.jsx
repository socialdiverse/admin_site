import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

export default function ReactDatePicker({ formik }) {
  return (
    <div style={{ zIndex: 1000 }}>
      <DatePicker
        selected={formik.values.dob}
        onChange={(date) => formik.setFieldValue("dob", date)}
      />
    </div>
  );
}
ReactDatePicker.propTypes = {
  formik: PropTypes.any.isRequired,
};
