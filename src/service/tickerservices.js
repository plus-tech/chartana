/*
Services that the frontend use to communicate with the backend

*/
import axios from 'axios';

import { getRestApiUrl } from '../common/constants.js';


export function getTickerList() {
  /**
   * Get the list of symbols from Nasdaq.
   * 
   * @param : None
   * @returns : A list of symbols
   */
  const endurl = getRestApiUrl();

  const path = endurl + '/symbollist';

  try{
    let res = axios.get(path);

    return res;
  } catch (err){
    throw err;
  }
}

