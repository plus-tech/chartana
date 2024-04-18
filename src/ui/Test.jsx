import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { Chart } from "react-google-charts";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
} from '@mui/x-data-grid';
import {
  Box,
} from '@mui/material';

import { useDemoData } from '@mui/x-data-grid-generator';

import { useRestApiUrl } from '../metadata/Contexts'
import axios from 'axios';

export function testApi(endurl) {
  /**
   * A function serving various tests
   */
  return axios.get(endurl);
}


export const datatbl = [
  ["Name", "Salary", "Full time employee"],
  ["Mike", { v: 10000, f: "$10,000" }, true],
  ["Jim", { v: 8000, f: "$8,000" }, false],
  ["Alice", { v: 12500, f: "$12,500" }, true],
  ["Bob", { v: 7000, f: "$7,000" }, true],
];

export const optionstbl = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
  pageSize: 1,
};


export default function Test(props){

  let {tickerno} = props;
  console.log('[Test] ticker: ', tickerno);

  const [text, setText] = useState('for Test');
  const endurl = useRestApiUrl();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });

  const datacandle = useMemo( () => {
    return ([
      ["day", "a", "b", "c", "d"],
      ["Mon", 20, 28, 38, 45],
      ["Tue", 31, 38, 55, 66],
      ["Wed", 50, 55, 77, 80],
      ["Thu", 50, 77, 66, 77],
      ["Fri", 15, 66, 22, 68],
    ]);
  });
  
  const options = {
    legend: "none",
  };

  console.log('datacandle:', datacandle);

  return (
    <React.Fragment>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={datacandle}
        options={options}
      />
      {/* <Chart
      chartType="Table"
      width="100%"
      height="400px"
      data={datatbl}
      options={optionstbl}
    /> */}
    </React.Fragment>
  );

  // return <div> {text} </div>;
}

/*
    <div style={{ width: '100%' }}>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid {...data} />
      </div>
    </div>


export function App() {
  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

*/
