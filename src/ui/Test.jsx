import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
} from '@mui/x-data-grid';
import {
  Box,
} from '@mui/material';

import { useDemoData } from '@mui/x-data-grid-generator';

import { GetRestApiUrl } from '../metadata/Contexts'
import { TestApi } from '../service/PriceServices.js';


export default function Test(){
  const [text, setText] = useState('for Test');
  const endurl = GetRestApiUrl();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });

  console.log('demo data:', data);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 350, width: '100%' }}>
        <DataGrid {...data} />
      </div>
    </div>
  );

  // return <div> {text} </div>;
}

/*

*/
