import * as React from "react";
import { useState, useEffect } from 'react';
import { useErrorBoundary } from "react-error-boundary";
// import { useLocation } from "react-router-dom";

import { Chart } from "react-google-charts";

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

import { getTickerPrices } from '../service/priceservices.js';
import { formatDate } from '../common/utils.js';


export default function CandlestickChart({ticker}){

  const { showBoundary } = useErrorBoundary();
  const [prices, setPrices] = useState();
  const [volume, setVolumne] = useState();

  //
  // get the ticker no. entered through the Search box
  // const location = useLocation();
  // const sticker = location.state['ticker'];
  // if (sticker != null){
  //   ticker = sticker;
  // }
  console.log("chart ticker:", ticker);

  useEffect(() => {
    let ignore = false;
    getTickerPrices(ticker).then(
      result => {        
        let {status, data} = result;

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
        if (!ignore) {
          setPrices(tmpprice);
          setVolumne(tmpvol);
        }
      },
      error => {
        showBoundary(error);
      }
    );

    return () => {
      ignore = true;
    }
  }, [ticker]);

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