import * as React from "react";
import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

// import { useLocation } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid,
} from 'recharts';

import { getTickerPrices } from '../service/PriceServices.js';
import { useRestApiUrl } from "../metadata/Contexts.js";
import { formatDate } from '../common/utils.js';

export default function CandlestickChart({tickerno}){
  const [prices, setPrices] = useState();
  const [volume, setVolumne] = useState();

  const endurl = useRestApiUrl();

  let ticker = tickerno;

  //
  // get the ticker no. entered through the Search box
  // const location = useLocation();
  // const sticker = location.state['ticker'];
  // if (sticker != null){
  //   ticker = sticker;
  // }
  console.log("chart ticker:", ticker);

  try {
    useEffect(() => {
      let ignore = false;
      getTickerPrices(endurl, ticker).then(result => {
        
        let {status, data} = result;

        // console.log('prices: ', data);

        let tmpprice = [];
        let tmpvol = [];

        tmpprice.push(["Day", "Low", "High", "Open", "Close"]);
        tmpvol.push(["Day", "Volume"]);

        data.map(record => {
          let date = formatDate(record["Date"], 'SHORT');
          tmpprice.push([
            date, 
            record["Low"],
            record["Open"],
            record["Close"],
            record["High"]
          ]);
          tmpvol.push([
            date,
            record["Volume"]
          ]);
        });

        // console.log('converted prices: ', arr);

        /**
         * error handling in response to the erroneous status returned
         */

        if (!ignore) {
          setPrices(tmpprice);
          setVolumne(tmpvol);
        }
      });
      return () => {
        ignore = true;
      }
    }, [endurl, ticker]);
  } catch (err) {
    console.log('exception: ', err);
  }

  if (prices == null){
    return <div />
  }
  
  const options = {
    legend: "none",
    width: "100%",
    height: "100%",
    selectionMode: 'multiple',
    // chartArea: {left:20, top:0, width:'10000px', height:'75%'},
    hAxis: {
      // title: 'Date',
      titleTextStyle: {
        color: '#FF0000'
      },
      textPosition: 'Out',
    },
    orientation: 'horizontal',
    title: "Ticker " + ticker,
    // tooltip: {isHtml: true},
  };
  
  return (
    <div style={{width: "100%", height: "auto"}}>
      <Chart
        chartType="CandlestickChart"
        data={prices}
        options={options}
      />
      {/* hwo to build a composite chart having the volume in the same chart area? */}
      {/* <Chart
        chartType="Bar"
      /> */}
    </div>
  );
}


/*
:a simple candlestick chart:

:listen to events:

import { Chart } from "react-google-charts";

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
];


:Bar:
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export function App() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

  const optionstbl = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
    page: "enable",
    pageSize: 50,
    // showRowNumber: true,
    width: "100%",
    height: "100%",
    pagingButtons: "both",
  };

      <Chart
        chartType="Table"
        data={prices}
        options={optionstbl}
      />

:Scatter Chart:
const data = [
  ["age", "weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];

const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};

<Chart
  chartType="ScatterChart"
  data={data}
  options={options}
  graphID="ScatterChart"
  width="100%"
  height="400px"
  chartEvents={chartEvents}
/>


*/
