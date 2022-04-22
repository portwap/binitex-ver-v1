import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Tabs from "./Tabs";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const url = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/";

function App() {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);

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
    uniqueCountries();
  }, [data]);

  // useEffect(() => {
  //   filterCountry("Zimbabwe");
  // },[data]);

  // console.log(countries);

  const uniqueCountries = () => {
    const uniqueCountriesTemp = new Set(
      data.map((item) => item.countriesAndTerritories)
    );
    setCountries([...uniqueCountriesTemp]);
  };

  const filterCountry = (country) => {
    const newData = data.filter(
      (item) => item.countriesAndTerritories === country
    );
    setFilteredCountry(newData);
  };

  // из загруженных данных получаем массив дат в формате дат
  const datesArray = () => {
    const datesArray = data.map((item) => {
      const { dateRep } = item;
      const splitDate = dateRep.split("/");
      const newDate = Date.UTC(splitDate[2], splitDate[1] - 1, splitDate[0]); //Year, Month, Day
      return newDate;
    });
    return datesArray;
  };

  console.log(datesArray());

  const minDate = () => {
    return Math.min(...datesArray());
  };
  const maxDate = () => {
    return Math.max(...datesArray());
  };

  console.log("App min: " + minDate());
  console.log("App max: " + maxDate());


  return (
    <div className="container-fluid mx-auto p-3 border border-5">
      <Tabs
        data={data}
        filterCountry={filterCountry}
        filteredCountry={filteredCountry}
        countries={countries}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
}

export default App;
