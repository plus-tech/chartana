import { useState, useEffect } from 'react';


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

import { FetchStockData, FetchCandle } from '../service/PriceServices.js';

export default function CandleChart(){
  // const [candledata, setCandledata] = useState();
  //
  // useEffect(() => {
  //   let ignore = false;
  //   FetchCandle().then(result => {
  //     if (!ignore) {
  //       setCandledata(result);
  //     }
  //   });
  //   return () => {
  //     ignore = true;
  //   }
  // }, []);

  const candledata = FetchStockData();

  console.log('candledata: ', candledata);
  // if (candledata == null){
  //   return (<div> loading </div>)
  // }

  const Candlestick = (props: {
    x: number;
    y: number;
    width: number;
    height: number;
    low: number;
    high: number;
    openClose: [number, number];
  }) => {
    const {
      x,
      y,
      width,
      height,
      low,
      high,
      openClose: [open, close],
    } = props;
    const isGrowing = open < close;
    const color = isGrowing ? 'blue' : 'red';
    const ratio = Math.abs(height / (open - close));

    console.log('props: ', props);

    return (
      <g stroke={color} fill="none" strokeWidth="2">
        <path
          d={`
            M ${x},${y}
            L ${x},${y + height}
            L ${x + width},${y + height}
            L ${x + width},${y}
            L ${x},${y}
          `}
        />
        {/* bottom line */}
        {isGrowing ? (
          <path
            d={`
              M ${x + width / 2}, ${y + height}
              v ${(open - low) * ratio}
            `}
          />
        ) : (
          <path
            d={`
              M ${x + width / 2}, ${y}
              v ${(close - low) * ratio}
            `}
          />
        )}
        {/* top line */}
        {isGrowing ? (
          <path
            d={`
              M ${x + width / 2}, ${y}
              v ${(close - high) * ratio}
            `}
          />
        ) : (
          <path
            d={`
              M ${x + width / 2}, ${y + height}
              v ${(open - high) * ratio}
            `}
          />
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: { active: boolean; payload: Record<string, any> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff' }}>
          <p className="label">{payload[0].payload.date}</p>
          <p className="label">{`high : ${payload[0].payload.high}`}</p>
          <p className="label">{`low : ${payload[0].payload.low}`}</p>
          <p className="label">{`open : ${payload[0].payload.openClose[0]}`}</p>
          <p className="label">{`close : ${payload[0].payload.openClose[1]}`}</p>
        </div>
      );
    }
    return null;
  };

  const minValue = candledata.reduce((minValue: number, { low, openClose: [open, close] }: any) => {
    const currentMin = Math.min(low, open, close);
    return minValue === null || currentMin < minValue ? currentMin : minValue;
  }, null);
  const maxValue = candledata.reduce((maxValue: number, { high, openClose: [open, close] }: any) => {
    const currentMax = Math.max(high, open, close);
    return currentMax > maxValue ? currentMax : maxValue;
  }, minValue);

  console.log('min value: ', minValue);
  console.log('max value: ', maxValue);

  return(
        <BarChart
          width={500}
          height={300}
          data={candledata}
        >
          <XAxis dataKey="date" />
          <YAxis domain={[minValue, maxValue]} />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/*
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Bar dataKey="openClose" fill="#8884d8" shape={<Candlestick />}>
          */}

          <Bar dataKey="openClose" fill="#8884d8" shape={<Candlestick />}>
            {candledata.map(({ date }: any) => (
              <Cell key={`cell-${date}`} />
            ))}
          </Bar>
        </BarChart>
  );
}

export const ShowBarChart = () => {
  const pageData = FetchCandle();
  console.log('bar data: ', pageData);

  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    console.log(fill, x, y, width, height);

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  return (
    <BarChart
      width={500}
      height={300}
      data={pageData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Tooltip />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {pageData.map(({ name }, index) => (
          <Cell key={`cell-${name}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
    // return (
    //   <Container width="100%" height="100%">
    //     <BarChart width={150} height={400} data={pageData}>
    //       <Legend />
    //       <Bar dataKey="uv" fill="#8884d8" />
    //     </BarChart>
    //   </Container>
    // );
}

// export { CandleChart, ShowBarChart };

/*
render: (args: Record<string, any>) => {
  const { data } = args;

  const minValue = data.reduce((minValue: number, { low, openClose: [open, close] }: any) => {
    const currentMin = Math.min(low, open, close);
    return minValue === null || currentMin < minValue ? currentMin : minValue;
  }, null);
  const maxValue = data.reduce((maxValue: number, { high, openClose: [open, close] }: any) => {
    const currentMax = Math.max(high, open, close);
    return currentMax > maxValue ? currentMax : maxValue;
  }, minValue);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={[minValue, maxValue]} />

        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Bar dataKey="openClose" fill="#8884d8" shape={<Candlestick />}>
          {data.map(({ date }: any) => (
            <Cell key={`cell-${date}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
},
args: {
  data: stockData,
},


export const Tiny = {
  render: () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={pageData}>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  },
};
*/
