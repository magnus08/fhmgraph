import React from 'react';
import {Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis} from "recharts";
import moment from "moment";

function calcAverage(values, index, size) {
  const overShoot = Math.floor(size / 2);
  if(index - overShoot < 0) {
    return undefined;
  }
  if(index + overShoot + 1 > values.length) {
    return undefined;
  }
  let sum = 0;
  console.log("---");
  for(let i=0; i<size; i++) {
    sum += values[i+index-overShoot];
  }
  return sum / size;

}

const formatXAxis = (tickItem) => moment(tickItem).format('MMDD');

export function CasesChart({dates, values, movingAverage}) {
  const data = dates.map((date, index) => ({date: formatXAxis(date), cases: values[index], average: calcAverage(values, index, movingAverage)}));
  return (
      <ComposedChart width={1200} height={600} data={data}>
        <Bar dataKey="cases" fill="#8884d8" />
        <Line type="monotone" dataKey="average" stroke="#000000" strokeWidth={2} dot={false} />

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" angle={-90} textAnchor="end" />
        <YAxis dataKey="cases"/>
      </ComposedChart>
  );
}
