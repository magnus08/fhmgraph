import React from 'react';
import {Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis} from "recharts";
import moment from "moment";

const formatXAxis = (tickItem) => moment(tickItem).format('MMDD');

const increase = (arr, index) => {
  let sum = 0;
  for(let i=0; i<index; i++) {
    sum += arr[i];
  }
  if(index === 0 || sum === 0) {
    return 0;
  }
  console.log("*** ", arr[index], sum, arr[index]/sum);
  const res = 100*arr[index]/sum;
  if(res > 15) {
    return 15;
  } else {
    return res;
  }
};

export function CasesIncreaseChart({dates, values}) {

  // Pretty ugly complexity doing the same sum over and over again, but the data sets are small for now.
  const data = dates.map((date, index) => ({date: formatXAxis(date), casesIncrease: increase(values, index)}));

  console.log("Cumulative data", data);
  return (
      <ComposedChart width={1200} height={600} data={data}>
        <Bar dataKey="casesIncrease" fill="#8884d8" />

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" angle={-90} textAnchor="end" />
        <YAxis dataKey="casesIncrease"/>
      </ComposedChart>
  );
}
