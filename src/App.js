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

  // дата текстовая в формат Date
  const textDateToDate = (textDate) => {
    const splitDate = textDate.split("/");
    const newDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]); //Year, Month, Day
    return newDate;
  };

  const dateToTextDate = (date) => {
    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (MM < 10) MM = "0" + MM;

    const textDate = dd + "/" + MM + "/" + yyyy;
    return textDate;
  };

  // проблема в том, что здесь работа идёт с data массивом, в таблице все хорошо, НО, 
  // в графике работа идёт с отдельным массивом данных и эта функция не работает!!!
  // надо решить как лучше поступить
  const filterByDateRange = (startDate, endDate) => {
    const dataArrayTextDateToDate = data.map((item) => {
      // получаем массив даннных с датами в формате дат
      const { cases, deaths, dateRep, countriesAndTerritories } = item;
      return {
        cases,
        deaths,
        dateRep: textDateToDate(dateRep),
        countriesAndTerritories,
      };
    });
    const filteredData = dataArrayTextDateToDate.filter(
      (item) => startDate <= item.dateRep && item.dateRep <= endDate
    );
    const dataArrayDateToTextDate = filteredData.map((item) => {
      // возвращаем даты в предыдущий вид текста
      const { cases, deaths, dateRep, countriesAndTerritories } = item;
      return {
        cases,
        deaths,
        dateRep: dateToTextDate(dateRep),
        countriesAndTerritories,
      };
    });
    // console.log(dataArrayDateToTextDate);
    setData(dataArrayDateToTextDate);
  };

  // console.log(dataArray);
  // console.log(filteredData);
  // console.log(filterByDateRange(new Date("2020/2/15"), new Date("2020/5/5")));

  const uniqueCountries = () => {
    const uniqueCountriesTemp = new Set(
      data.map((item) => item.countriesAndTerritories)
    );
    setCountries([...uniqueCountriesTemp]);
  };

  // из загруженных данных получаем массив дат в формате дат для вычисления мин и макс (вероятно, лучше улучшить позже)
  const datesArray = () => {
    const datesArray = data.map((item) => {
      return typeof item.dateRep === "string"
        ? textDateToDate(item.dateRep)
        : item.dateRep;
    });
    return datesArray;
  };

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
        filterByDateRange={filterByDateRange}
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
