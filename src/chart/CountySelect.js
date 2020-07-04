import React, {useState} from 'react';
import {CasesChart} from "./CasesChart";
import {CasesCumulativeChart} from "./CasesCumulativeChart";
import {CasesIncreaseChart} from "./CasesIncreaseChart";
import {Grid} from "semantic-ui-react";
import {ResponsiveContainer} from "recharts";

export function CountySelect({data}) {

  const getDates = () => dataCleaned.map(d => d[0]);
  const getValues = () => dataCleaned.map(d => d[1 + county]);

  const chartTypes = [
    {
      id: "cases", name: "Cases per day", Component: CasesChart,
    },
    {
      id: "casesCumulative", name: "Cases cumulative", Component: CasesCumulativeChart,
    },
    {
      id: "casesIncrease", name: "Cases increase per day", Component: CasesIncreaseChart,
    },
  ];


  console.log("Data is now: ", data);
  const counties = data[0].slice(1);

  const [county, setCounty] = useState(counties.findIndex(c => c === "Stockholm"));
  const [chartType, setChartType] = useState(chartTypes[0]);
  const [avg, setAvg] = useState(7);

  const dataCleaned = data.slice(1);

  return (
    <>
      <Grid.Row columns="3">
        <Grid.Column>
          Chart: <select value={chartType.id} onChange={(e) => {console.log("What???", e.target.value); setChartType(chartTypes.find(c => c.id === e.target.value))}}>
          {chartTypes.map((t) =>
            <option key={t.id} value={t.id}>{t.name}</option>
          )}
        </select>
        </Grid.Column>
        <Grid.Column>
          County: <select value={county} onChange={(e) => setCounty(parseInt(e.target.value))}>
          {counties.map((c,i) =>
            <option key={i} value={i}>{c}</option>
          )}
        </select>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="1">
        <Grid.Column>
          Moving average: <input type="number" value={avg} onChange={e => setAvg(e.target.value)}/>
            <chartType.Component dates={getDates()} values={getValues()} movingAverage={avg}/>
        </Grid.Column>
      </Grid.Row>
    </>
  );
}
