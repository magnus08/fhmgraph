import React from 'react';
import {Bar, CartesianGrid, ComposedChart, XAxis, YAxis} from "recharts";
import moment from "moment";

const formatXAxis = (tickItem) => moment(tickItem).format('MMDD');

const sum = (arr, index) => {
  let res = 0;
  for(let i=0; i<=index; i++) {
    res += arr[i];
  }
  return res;
};

export function CasesCumulativeChart({dates, values}) {

  // Pretty ugly complexity doing the same sum over and over again, but the data sets are small for now.
  const data = dates.map((date, index) => ({date: formatXAxis(date), casesCumulative: sum(values, index)}));

  console.log("Cumulative data", data);
  return (
      <ComposedChart width={1200} height={600} data={data}>
        <Bar dataKey="casesCumulative" fill="#8884d8" />

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" angle={-90} textAnchor="end" />
        <YAxis dataKey="casesCumulative"/>
      </ComposedChart>
  );
}
