/*
Todos:

axis: exception handling

useTransition() to improve page transition



----------- sample codes ---------------

:a simple candlestick chart:

:listen to events:

import { Chart } from "react-google-charts";

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
];


:Bar:
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export function App() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

  const optionstbl = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
    page: "enable",
    pageSize: 50,
    // showRowNumber: true,
    width: "100%",
    height: "100%",
    pagingButtons: "both",
  };

      <Chart
        chartType="Table"
        data={prices}
        options={optionstbl}
      />

:Scatter Chart:
const data = [
  ["age", "weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];

const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};

<Chart
  chartType="ScatterChart"
  data={data}
  options={options}
  graphID="ScatterChart"
  width="100%"
  height="400px"
  chartEvents={chartEvents}
/>


import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Name", "Salary", "Full time employee"],
  ["Mike", { v: 10000, f: "$10,000" }, true],
  ["Jim", { v: 8000, f: "$8,000" }, false],
  ["Alice", { v: 12500, f: "$12,500" }, true],
  ["Bob", { v: 7000, f: "$7,000" }, true],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  pageSize: 1,
};

export function App() {
  return (
    <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

*/
