import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Tabs from "./Tabs";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ProvidedFilter } from "ag-grid-community";

const url = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const fetchedData = await response.json();
      setData(fetchedData.records);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      uniqueCountries();
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const uniqueCountries = () => {
    const uniqueCountriesTemp = new Set(
      data.map((item) => item.countriesAndTerritories)
    );
    setCountries([...uniqueCountriesTemp]);
  };

  // дата текстовая в формат Date
  const textDateToDate = (textDate) => {
    const splitDate = textDate.split("/");
    const newDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]); //Year, Month, Day
    return newDate;
  };

  // console.log("textDateToDate: " + textDateToDate("07/02/2020"));

  // из загруженных данных получаем массив дат в формате дат
  const datesArray = () => {
    const datesArray = data.map((item) => {
      const { dateRep } = item;
      const splitDate = dateRep.split("/");
      const newDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]); //Year, Month, Day
      return newDate;
    });
    return datesArray;
  };

  // console.log(datesArray());

  const minDate = () => {
    return new Date(Math.min(...datesArray()));
  };
  const maxDate = () => {
    return new Date(Math.max(...datesArray()));
  };

  // console.log("App min: " + new Date(minDate()).toUTCString());
  // console.log("App min: " + minDate());
  // console.log("App max: " + maxDate());


  return (
    <div className="container-fluid mx-auto p-3 border border-5">
      <Tabs
        data={data}
        textDateToDate={textDateToDate}
        countries={countries}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

export default App;

// Cumulative_number_for_14_days_of_COVID-19_cases_per_100000: "0.00606555"
// cases: 0
// continentExp: "Asia"
// countriesAndTerritories: "Cambodia"
// countryterritoryCode: "KHM"
// dateRep: "07/02/2020"
// day: "07"
// deaths: 0
// geoId: "KH"
// month: "02"
// popData2019: 16486542
// year: "2020"