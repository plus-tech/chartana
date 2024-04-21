/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import { getRestApiUrl } from '../common/constants.js';

import {
  testcandle,
  testStockdata,
} from '../metadata/testdata.js';


export function getTickerPrices (ticker, fmt='DICTIONARY') {
  /**
  * Get the prices of the specified ticker. The request is sbumitted to the backend app.
  * 
  * @param {Number} ticker : indicates the target ticker
  * @param {String} fmt : indicates the format of the prices
  * @returns : An array of the ticker's historical prices. 
  *            Each record consists of Date, Open, High, Low, Close, Volume.
  */

  const endurl = getRestApiUrl();
  const path =  endurl + '/symbolprices';

  axios.get(path, {
    params: {
      ticker: ticker,
      fmt: fmt
    }
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
    // 
    // throw error to the external layer
    throw error;
  })
  .finally(function () {
    // add if any
  });
}


