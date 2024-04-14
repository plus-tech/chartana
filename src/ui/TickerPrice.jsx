import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import { GetRestApiUrl } from '../metadata/Contexts'
import { GetTickerPrices } from '../service/PriceServices.js';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'id', width: 150 },
  { field: 'Date', valueGetter: (date) => { 
                      let d = new Date(date.value);

                      let year = d.getFullYear();
                      let month = (d.getMonth() + 1).toString();
                      let day = (d.getDate()).toString();
                      if (month.length < 2) 
                        month = '0' + month;
                      if (day.length < 2) 
                        day = '0' + day;

                      return [year, month, day].join('-'); }, 
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
  return row.id;
}

//
// for test, will be updated with the real code later
export default function TickerPrice({tickerno = 2395}){
  const [prices, setPrices] = useState();
  const endurl = GetRestApiUrl();

  let ticker = tickerno;

  //
  // get the ticker no. entered through the Search box
  const location = useLocation();
  const sticker = location.state['ticker'];
  if (sticker != null){
    ticker = sticker;
  }
  // console.log("target ticker:", ticker);

  try {
    useEffect(() => {
      let ignore = false;
      GetTickerPrices(endurl, ticker).then(result => {
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
