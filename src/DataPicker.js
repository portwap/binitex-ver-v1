import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DataPicker = ({
  minDate,
  maxDate,
  data,
  textDateToDate,
  filterByDateRange,
}) => {
  const dataRangeStart = new Date(minDate());
  const dataRangeEnd = new Date(maxDate());

  const [startDate, setStartDate] = useState(new Date(2019, 11));
  const [endDate, setEndDate] = useState(new Date(2020, 11));

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-outline-secondary btn-sm text-dark"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  // console.log("DataPicker min: " + minDate());
  //   console.log(minDate());
  // console.log(filterByDateRange(new Date(2020, 2, 15), new Date(2020, 5, 5)));

  return (
    <>
      <span className="text-nowrap">Period from</span>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        maxDate={endDate}
        selectsStart
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        includeDateIntervals={[{ start: dataRangeStart, end: dataRangeEnd }]}
        customInput={<CustomDateInput />}
      />

      <span>to</span>

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={startDate}
        selectsEnd
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        includeDateIntervals={[{ start: dataRangeStart, end: dataRangeEnd }]}
        customInput={<CustomDateInput />}
      />
      <button
        className="btn btn-outline-secondary btn-sm text-dark my-1"
        onClick={() => filterByDateRange(startDate, endDate)}
      >
        Filter by selected dates
      </button>
    </>
  );
};

export default DataPicker;
