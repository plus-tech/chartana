/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import { getRestApiUrl } from '../common/constants.js';

import {
  testcandle,
  testStockdata,
} from '../metadata/testdata.js';


export function getTickerPrices (ticker) {
  /**
  * Get the prices of the specified ticker. The request is sbumitted to the backend app.
  * 
  * @param {Number} ticker : target ticker
  * @returns : An array of the ticker's historical prices. 
  *            Each record consists of Date, Open, High, Low, Close, Volume.
  */

  const endurl = getRestApiUrl();
  const path =  endurl + '/symbolprices?ticker=' + String(ticker);

  try{
    let res = axios.get(path);

    return res;
  } catch (err){
    throw err;
  }
}

