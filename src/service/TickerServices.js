/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import { testtickers } from '../metadata/TestData';

export function GetTickerList(endurl) {
  /**
   * Get the list of symbols from Nasdaq.
   * 
   * @param {String} endurl : endpoint URL
   * @returns : A list of symbols
   */
  const path = '/symbollist';
  return axios.get(endurl+path);
}

export async function TestGetTickerList () {
  /**
   * A test function, will be deleted later.
   */
  console.log('Test tickers: ', testtickers);

  return(testtickers);
}
