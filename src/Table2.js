import React, { useState, useEffect } from "react";

import DataGrid from "react-data-grid";

export default function InfiniteScrolling({ direction, data }) {
  const [rows, setRows] = useState([]);

  // const [rows, setRows] = useState(() => createRows(50));
  // const [isLoading, setIsLoading] = useState(false);

  // async function handleScroll(event) {
  //   if (isLoading || !isAtBottom(event)) return;

  //   setIsLoading(true);

  //   const newRows = await loadMoreRows(50, rows.length);

  //   setRows([...rows, ...newRows]);
  //   setIsLoading(false);
  // }

  const columns = [
    // { key: "id", name: "ID" },
    { key: "countriesAndTerritories", name: "Country" },
    { key: "cases", name: "Cases" },
    { key: "deaths", name: "Deaths" },
    { key: "dateRep", name: "Date" },
  ];

  // const rows = [
  //   { countriesAndTerritories: "TestCountry", cases: "28", deaths: "5" },
  //   { countriesAndTerritories: "TestCountry2", cases: "21", deaths: "8" },
  //   { countriesAndTerritories: "TestCountry3", cases: "35", deaths: "1" },
  // ];

  // function rowKeyGetter(row) {
  //   return row.id;
  // }

  // function createFakeRowObjectData(index) {
  //   return {
  //     id: `${index}`,
  //     countriesAndTerritories: "Test Country",
  //     cases: 25,
  //     deaths: 35,
  //   };
  // }

  // function createRows(numberOfRows) {
  //   const rows = [];

  //   for (let i = 0; i < numberOfRows; i++) {
  //     rows[i] = createFakeRowObjectData(i);
  //   }

  //   return rows;
  // }

  function createRows() {
    const rows = data.map((item) => {
      const { cases, deaths, countriesAndTerritories, dateRep } = item;
      let dataObject = { countriesAndTerritories, cases, deaths, dateRep };
      return dataObject;
    });
    console.log(rows);
    setRows(rows);
  }

  useEffect(() => {
    createRows();
  }, [data]);

  // function isAtBottom({ currentTarget }) {
  //   return (
  //     currentTarget.scrollTop + 10 >=
  //     currentTarget.scrollHeight - currentTarget.clientHeight
  //   );
  // }

  // function loadMoreRows(newRowsCount, length) {
  //   return new Promise((resolve) => {
  //     const newRows = [];

  //     for (let i = 0; i < newRowsCount; i++) {
  //       newRows[i] = createFakeRowObjectData(i + length);
  //     }

  //     setTimeout(() => resolve(newRows), 1000);
  //   });
  // }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        // rowKeyGetter={rowKeyGetter}
        // onRowsChange={setRows}
        rowHeight={30}
        // onScroll={handleScroll}
        className="fill-grid"
        direction={direction}
      />
      {/* {isLoading && (
        <div className="loadMoreRowsClassname">Loading more rows...</div>
      )} */}
    </>
  );
}

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
