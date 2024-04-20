import * as React from 'react';
import { useState } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import {
  Route,
  Routes,
} from 'react-router-dom'


import AppToolBar from './AppToolBar';
import SymbolList from "../ui/SymbolList";
import TickerPrice from '../ui/TickerPrice';
import ShowCandlestick from '../ui/ShowCandlestick';
import ErrorPage from '../ui/ErrorPage';
import Test from '../ui/Test';


const AppRouter = () => {

  /*
  ticker entered in the Search box on AppToolBar
  a default ticker is used during test, whereas an alert message shall be displayed 
  in case of the ticker being not specifed.
  */
  const [ticker, setTicker] = useState(2395);

  const params = {
    ticker: ticker,
    onTickerChange: setTicker,
  }

  //
  // Error handling
  const [errdetail, setErrdetail] = useState({
    error: '',
    info: '',
  });

  const showError = (error, info) => {
    setErrdetail({
      error: error.toString(),
      info: info.componentStack,
    });
  }

  return(
    <div>
      <AppToolBar onTickerChange={setTicker}/>
      <ErrorBoundary fallback={<ErrorPage errdetail={errdetail}/>} onError={showError}>
        <Routes>
            <Route path="/"            element={<div />} />
            <Route path="/symbollist"  element={<SymbolList />} />
            <Route path="/tickerprice" element={<TickerPrice      ticker={ticker} />} />
            <Route path="/candlestick" element={<ShowCandlestick  ticker={ticker} />} />
            <Route path="/error"       element={<ErrorPage        {...errdetail} />} />
            <Route path="/test"        element={<Test             {...params} />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}
export default AppRouter;

