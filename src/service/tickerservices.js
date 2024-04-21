/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import { getRestApiUrl } from '../common/constants.js';


export function getTickerList(fmt='DICTIONARY') {
  /**
   * Get the list of symbols from Nasdaq.
   * 
   * @param {String} fmt : indicates the format of the prices
   * @returns : A list of symbols
   */
  const endurl = getRestApiUrl();

  const path = endurl + '/symbollist';

  axios.get(path, {
    params: {
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
