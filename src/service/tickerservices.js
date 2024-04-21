/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import { getRestApiUrl } from '../common/constants.js';


export function getTickerList(fmt='DICTIONARY') {
  /**
   * Get the list of symbols from Nasdaq.
   * 
   * @param {String} fmt : indicates the format of the symbols
   * @returns : A list of symbols
   */
  const endurl = getRestApiUrl();

  const path = endurl + '/symbollist';

  return axios.get(path, {
    params: {
      fmt: fmt
    }
  });
}
