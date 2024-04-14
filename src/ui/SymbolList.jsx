import React from 'react';
import { useState, useEffect } from 'react';


import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';

import { GetRestApiUrl } from '../metadata/Contexts';
import {
  GetTickerList,
} from '../service/TickerServices';

const columns: GridColDef[] = [
  { field: 'id',   headerName: 'Id',   editable: false, },
  { field: 'Symbol',   headerName: 'Symbol',   editable: false, },
  { field: 'SecurityName',   headerName: 'Security Name',   editable: false, },
  { field: 'NasdaqTraded',   headerName: 'Nasdaq Traded',  editable: false, },
  { field: 'ListingExchange',    headerName: 'Listing Exchange',   editable: false, },
  { field: 'MarketCategory',  headerName: 'Market Category',  editable: false, },
  { field: 'ETF', headerName: 'ETF', editable: false, },
  { field: 'RoundLotSize', headerName: 'Round Lot Size', editable: false, },
  { field: 'TestIssue', headerName: 'Test Issue', editable: false, },
  { field: 'FinancialStatus', headerName: 'Financial Status', editable: false, },
  { field: 'CQSSymbol', headerName: 'CQS Symbol', editable: false, },
  { field: 'NASDAQSymbol', headerName: 'NASDAQ Symbol', editable: false, },
  { field: 'NextShares', headerName: 'NextShares', editable: false, },
  // { field: 'id',   headerName: 'Id',   width: 150, editable: false, },
  // { field: 'Symbol',   headerName: 'Symbol',   width: 150, editable: false, },
  // { field: 'NasdaqTraded',   headerName: 'Nasdaq Traded',   width: 150, editable: false, },
  // { field: 'SecurityName',   headerName: 'Security Name',   width: 150, editable: false, },
  // { field: 'ListingExchange',    headerName: 'Listing Exchange',    width: 150, editable: false, },
  // { field: 'MarketCategory',  headerName: 'Market Category',  width: 150, editable: false, },
  // { field: 'ETF', headerName: 'ETF', width: 150, editable: false, },
  // { field: 'RoundLotSize', headerName: 'Round Lot Size', width: 150, editable: false, },
  // { field: 'TestIssue', headerName: 'Test Issue', width: 150, editable: false, },
  // { field: 'FinancialStatus', headerName: 'Financial Status', width: 150, editable: false, },
  // { field: 'CQSSymbol', headerName: 'CQS Symbol', width: 150, editable: false, },
  // { field: 'NASDAQSymbol', headerName: 'NASDAQ Symbol', width: 150, editable: false, },
  // { field: 'NextShares', headerName: 'NextShares', width: 150, editable: false, },
];

/*
Specify a unique row id for each row
*/
function getRowId(row) {
  return row.id;
}

export default function SymbolList(){
  const [tickers, setTickers] = useState();

  const endurl = GetRestApiUrl();
  console.log("Endpoint URL: ", endurl);

  useEffect(() => {
    let ignore = false;

    GetTickerList(endurl).then(result => {
      let {status, data } = result;
      /**
       * exception handling according to the returned status
       */
      console.log('symbols: ', data);
      // data = JSON.parse(data);
      if (!ignore) {
        setTickers(data);
      }
    });
    //
    // cleanup function
    return () => {
      ignore = true;
    }
  }, [endurl]);

  if (tickers == null) {
    return <div> </div>;
  }

  return (
    <div style={{ height: '400', width: '100%' }}>
      <DataGrid
        rows={tickers}
        getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[50]}
      />
    </div>
  )
}
