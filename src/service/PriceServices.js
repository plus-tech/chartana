/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import {
  testcandle,
  testStockdata,
} from '../metadata/TestData';


export function GetTickerPrices (endurl, ticker) {
  /**
  * Get the prices of the specified ticker. The request is sbumitted to the backend app.
  * 
  * @param {String} endurl : endpoint URL
  * @param {Number} ticker : target ticker
  * @returns : An array of the ticker's historical prices. 
  *            Each record consists of Date, Open, High, Low, Close, Volume.
  */

  const path =  '/symbolprices' + '?ticker=' + String(ticker);
  return axios.get(endurl+path);
}


export function FetchStockData () {
  /**
   * A test function, will be deleted later.
   */
  // console.log('Candle data: ', testStockdata);

  return(testStockdata);
}


export function FetchCandle () {
  /**
   * A test function, will be deleted later.
   */
  // console.log('Candle data: ', testStockdata);

  return(testcandle);
}

export function TestApi(endurl) {
  /**
   * A function serving various tests
   */
  return axios.get(endurl);
}
