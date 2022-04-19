import React, { useState, useEffect } from "react";

import Table from "./Table";
import DataChart from "./DataChart";

const Tabs = ({ data, filterCountry, filteredCountry, countries }) => {
  return (
    <div className="">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="table-tab"
            data-bs-toggle="tab"
            data-bs-target="#table"
            type="button"
            role="tab"
            aria-controls="table"
            aria-selected="true"
          >
            Table
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="chart-tab"
            data-bs-toggle="tab"
            data-bs-target="#chart"
            type="button"
            role="tab"
            aria-controls="chart"
            aria-selected="false"
          >
            Chart
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active p-2"
          id="table"
          role="tabpanel"
          aria-labelledby="table-tab"
        >
          <Table data={data} />
        </div>
        <div
          className="tab-pane fade p-2"
          id="chart"
          role="tabpanel"
          aria-labelledby="chart-tab"
        >
          <DataChart
            data={data}
            filterCountry={filterCountry}
            filteredCountry={filteredCountry}
            countries={countries}
          />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
