import React, { useState, useEffect } from "react";

import { Chart } from "react-google-charts";

import Badge from "react-bootstrap/Badge";

const DataChart = ({ data, filterCountry, filteredCountry, countries }) => {
  const [chartData, setChartData] = useState([]);

  const loadChartData2 = (selectedCountry) => {
    filterCountry(selectedCountry);
    let oneCountryChartData = filteredCountry.map((item) => {
      // получаем в итоге массив массивов
      const { cases, deaths, day, month, year, dateRep } = item;
      let dataArray = [dateRep, deaths, cases];
      return dataArray;
    });
    oneCountryChartData.reverse(); // переворачиваем массив, чтобы даты шли по возврастающей
    oneCountryChartData.unshift(["Период", "Смерти", "Заболевания"]); // добавляем в начало массива заголовки
    console.log(oneCountryChartData);
    setChartData(oneCountryChartData);
  };

  let defaultData = [
    ["Период", "Смерти", "Заболевания"],
    [1, 12, 36],
    [3, 5.5, 45],
    [6, 14, 55],
    [9, 25, 25],
    [12, 3.5, 45],
    [13, 7, 12],
  ];

  const options = {
    title: "Заболевания/смерти по периодам",
    hAxis: { title: "Период", textPosition: "none" },
    vAxis: { title: "Случаи", textPosition: "none" },
    legend: { position: "bottom" },
  };

  // console.log(filteredCountry);
  //  console.log(countries);

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-primary btn-sm dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select a country
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          {countries.map((country, index) => {
            return (
              <li key={index}>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => loadChartData2(country)}
                >
                  {country}
                </button>
              </li>
            );
          })}
        </ul>
        <Badge bg="secondary">Test</Badge>
      </div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
        legendToggle
      />
    </>
  );
};

export default DataChart;

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
