import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom'

import SymbolList from "../ui/SymbolList";
import TickerPrice from '../ui/TickerPrice';
import CandleChart from '../ui/CandleChart';
import { ShowBarChart } from '../ui/CandleChart';
import Test from '../ui/Test';

const AppRouter = () => {
  return(
    <div>
      <Routes>
          <Route path="/" element={<div />} />
          <Route path="/symbollist" element={<SymbolList />} />
          <Route path="/tickerprice" element={<TickerPrice />} />
          <Route path="/candlechart" element={<CandleChart />} />
          <Route path="/barchart" element={<ShowBarChart />} />
          <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default AppRouter;
