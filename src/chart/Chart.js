import React from 'react';
import {CartesianGrid, Line, BarChart, LineChart, XAxis, YAxis, Bar, ComposedChart} from "recharts";

function calcAverage(values, index, size) {
  const overShoot = Math.floor(size / 2);
  if(index - overShoot < 0) {
    console.log("Underlimit, skipping");
    return undefined;
  }
  if(index + overShoot + 1 > values.length) {
    console.log("Overlimit, skipping");
    return undefined;
  }
  let sum = 0;
  console.log("---");
  for(let i=0; i<size; i++) {
    sum += values[i+index-overShoot];
    console.log("Adding", i+index);
  }
  return sum / size;

}

export function Chart({dates, values, movingAverage}) {
  console.log("Dates = ", dates);
  console.log("Vals = ", values);


  const data = dates.map((date, index) => ({date, cases: values[index], average: calcAverage(values, index, movingAverage)}));

  return (
      <ComposedChart width={1200} height={600} data={data}>
        <Bar dataKey="cases" fill="#8884d8" />
        <Line type="monotone" dataKey="average" stroke="#000000" strokeWidth={2} dot={false} />

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date"/>
        <YAxis dataKey="cases"/>
      </ComposedChart>
  );
}
