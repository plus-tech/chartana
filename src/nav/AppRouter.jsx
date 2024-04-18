import * as React from 'react';
import { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom'


import AppToolBar from './AppToolBar';
import SymbolList from "../ui/SymbolList";
import TickerPrice from '../ui/TickerPrice';
import CandlestickChart from '../ui/CandlestickChart';
import Test from '../ui/Test';

const AppRouter = () => {
  /*
  ticker entered in the Search box on AppToolBar
  a default ticker is used during test, whereas an alert message shall be displayed 
  in case of the ticker being not specifed.
  */
  const [ticker, setTicker] = useState(2395);

  const params = {
    tickerno: ticker,
    onTickerChange: setTicker,
  }

  return(
    <div>
      <AppToolBar onTickerChange={setTicker}/>
      <Routes>
          <Route path="/" element={<div />} />
          <Route path="/symbollist" element={<SymbolList />} />
          <Route path="/tickerprice" element={<TickerPrice      tickerno={ticker} />} />
          <Route path="/candlestick" element={<CandlestickChart tickerno={ticker} />} />
          <Route path="/test"        element={<Test             {...params} />} />
      </Routes>
    </div>
  )
}
export default AppRouter;

