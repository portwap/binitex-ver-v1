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

  // console.log(countries);

  return (
    <div className="container-fluid mx-auto p-3 border border-5">
      <Tabs
        data={data}
        filterCountry={filterCountry}
        filteredCountry={filteredCountry}
        countries={countries}
      />
    </div>
  );
}

export default App;
