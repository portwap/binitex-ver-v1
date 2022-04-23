import React, { useState, useEffect } from "react";

import { Chart } from "react-google-charts";

import Badge from "react-bootstrap/Badge";

  let defaultData = [
    ["Период", "Смерти", "Заболевания"],
    [1, 12, 36],
    [3, 5.5, 45],
    [6, 14, 55],
    [9, 25, 25],
    [12, 3.5, 45],
    [13, 7, 12],
  ];

const DataChart = ({ data, textDateToDate, countries }) => {
  const [chartData, setChartData] = useState(defaultData);

  const [selectedCountry, setSelectedCountry] = useState("");

  // console.log(countries);

  const loadChartData2 = (country) => {
    const newData = data.filter(
      (item) => item.countriesAndTerritories === country
    );
    const oneCountryChartData = newData.map((item) => {
      // в этой константе получаем в итоге массив массивов
      const { cases, deaths, dateRep } = item;
      let dataArray = [textDateToDate(dateRep), deaths, cases];
      return dataArray;
    });
    oneCountryChartData.reverse(); // переворачиваем массив, чтобы даты шли по возврастающей
    oneCountryChartData.unshift(["Period", "Deaths", "Diseases"]); // добавляем в начало массива заголовки
    setChartData(oneCountryChartData);
    setSelectedCountry(country);
  };

  const options = {
    title: "Diseases/deaths by periods",
    hAxis: { title: "Period" },
    vAxis: { title: "Cases" },
    legend: { position: "bottom" },
  };

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
          <Badge className="mx-2" bg="info">
            {selectedCountry}
          </Badge>
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
