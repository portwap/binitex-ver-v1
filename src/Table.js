import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

// Для фильтра дат
var dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

export default function Tabs({ data }) {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "country",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      minWidth: 200,
      unSortIcon: true,
    },
    {
      field: "cases",
      filter: "agNumberColumnFilter",
      minWidth: 120,
      unSortIcon: true,
    },
    {
      field: "deaths",
      filter: "agNumberColumnFilter",
      minWidth: 120,
      unSortIcon: true,
    },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      minWidth: 150,
      unSortIcon: true,
    },
  ]);

  //Заполняем строки данными
  const createRows = () => {
    const rows = data.map((item) => {
      const { cases, deaths, countriesAndTerritories, dateRep } = item;
      let dataObject = {
        country: countriesAndTerritories,
        cases: cases,
        deaths: deaths,
        date: dateRep,
      };
      return dataObject;
    });
    console.log(rows);
    setRowData(rows);
  };

  useEffect(() => {
    createRows();
  }, [data]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/row-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  //Выбор количества строк на странице
  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  return (
    <div className="">
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      Page Size:
      <select onChange={onPageSizeChanged} id="page-size">
        <option value="10" defaultValue>
          10
        </option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
      <div
        className="ag-theme-alpine test"
        style={{ width: "100%", height: 500 }}
      >
        <AgGridReact
          // style={{ width: "100%", height: "100%;" }}
          // paginationAutoPageSize={true}
          pagination={true}
          paginationPageSize={30}
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
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
