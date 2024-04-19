import React, { useState, useEffect } from 'react';
import { useErrorBoundary } from "react-error-boundary";

import {
  DataGrid,
} from '@mui/x-data-grid';

import { Chart } from "react-google-charts";

import { getTickerPrices } from '../service/priceservices.js';
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
export default function TickerPrice({ticker}){

  const { showBoundary } = useErrorBoundary();
  const [prices, setPrices] = useState();

  //
  // get the ticker no. entered through the Search box
  // const location = useLocation();
  // const sticker = location.state['ticker'];
  // if (sticker != null){
  //   ticker = sticker;
  // }
  console.log("price ticker:", ticker);

  useEffect(() => {
    let ignore = false;
  
    getTickerPrices(ticker).then(
      result => {
        // console.log('result: ', result);
        let {status, data} = result;

        if (!ignore) {
          setPrices(data);
        }
      },
      error => {
        showBoundary(error);
      }
    );
    return () => {
      ignore = true;
    }
  }, [ticker]);

  if (ticker == null || prices == null){
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