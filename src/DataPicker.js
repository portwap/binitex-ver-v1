import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DataPicker = ({ minDate, maxDate }) => {

  const dataRangeStart = new Date(minDate());
  const dataRangeEnd = new Date(maxDate());

  // console.log("dataRangeStart: " + dataRangeStart);

  // const test = () => {
  //   const year = dataRangeStart.getFullYear();
  //   const month = dataRangeStart.getMonth();
  //   const day = dataRangeStart.getDate();
  //   return year + "/" + (month + 1) + "/" + day;
  // };

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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setStartDate(minDate());
  //     setEndDate(maxDate());
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  // console.log("DataPicker min: " + minDate());
  //   console.log(minDate());

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
    </>
  );
};

export default DataPicker;
