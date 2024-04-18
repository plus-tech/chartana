import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import { Chart } from "react-google-charts";

import { useRestApiUrl } from '../metadata/Contexts'
import { getTickerPrices } from '../service/PriceServices.js';
import { formatDate } from '../common/utils.js';

const columns = [
  // { field: 'id', headerName: 'id', width: 150 },
  { field: 'Date', valueGetter: (date) => { return formatDate(date.value, 'LONG'); }, 
                     headerName: 'Date',   width: 150, editable: true, },
  { field: 'Open',   headerName: 'Open',   width: 150, editable: true, },
  { field: 'High',   headerName: 'High',   width: 150, editable: true, },
  { field: 'Low',    headerName: 'Low',    width: 150, editable: true, },
  { field: 'Close',  headerName: 'Close',  width: 150, editable: true, },
  { field: 'Volume', headerName: 'Volume', width: 150, editable: true, },
];

/*
Specify a unique row id for each row
*/
function getRowId(row) {
  return row.Date;
}

//
// for test, will be updated with the real code later
export default function TickerPrice({tickerno}){
  const [prices, setPrices] = useState();
  const endurl = useRestApiUrl();

  let ticker = tickerno;

  //
  // get the ticker no. entered through the Search box
  // const location = useLocation();
  // const sticker = location.state['ticker'];
  // if (sticker != null){
  //   ticker = sticker;
  // }
  console.log("price ticker:", ticker);

  try {
    useEffect(() => {
      let ignore = false;
      getTickerPrices(endurl, ticker).then(result => {
        // console.log('result: ', result);
        let {status, data} = result;
        /**
         * error handling in response to the erroneous status returned
         */

        if (!ignore) {
          setPrices(data);
        }
      });
      return () => {
        ignore = true;
      }
    }, [endurl, ticker]);
  } catch (err) {
    console.log('exception: ', err);
  }

  if (prices == null){
    return <div />
  }

  console.log('prices: ', prices);

  return(
    <div style={{ height: '400', width: '100%' }}>
      <DataGrid
        getRowId={getRowId}
        rows={prices}
        // getRowHeight={() => 'auto'}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[50]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </div>
  );
}

/*

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