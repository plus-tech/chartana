/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';


export function getTickerList(endurl) {
  /**
   * Get the list of symbols from Nasdaq.
   * 
   * @param {String} endurl : endpoint URL
   * @returns : A list of symbols
   */
  const path = '/symbollist';
  return axios.get(endurl+path);
}

