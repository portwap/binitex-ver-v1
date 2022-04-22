import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const DataPicker = ({ minDate, maxDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dataRangeStart = new Date(minDate());
  const dataRangeEnd = new Date(maxDate());

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setStartDate(minDate());
//     setEndDate(maxDate());
//   }, 3000);
//   return () => clearTimeout(timer);
// }, []);

  console.log("DataPicker min: " + minDate());
//   console.log(minDate());

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        startDate={startDate}
        endDate={endDate}
        // minDate={dataRangeStart} // минимальная дата из полученных данных
        maxDate={endDate}
        selectsStart
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="dd/MM/yyyy"
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        // maxDate={dataRangeEnd} // максимальная дата из полученных данных
        selectsEnd
      />
    </>
  );
};

export default DataPicker;
