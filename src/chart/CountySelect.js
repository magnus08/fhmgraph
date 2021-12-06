import React, {useState} from 'react';
import {CasesChart} from "./CasesChart";
import {CasesCumulativeChart} from "./CasesCumulativeChart";
import {CasesIncreaseChart} from "./CasesIncreaseChart";
import {Grid, Input, Select} from "semantic-ui-react";
import {ResponsiveContainer} from "recharts";
import {population_map} from "../utils/population";

export function CountySelect({data}) {

  const chartTypes = [
    {
      id: "cases_normalized", name: "Cases per day normalized", Component: CasesChart, normalize: true,
    },
    {
      id: "cases", name: "Cases per day", Component: CasesChart, normalize: false,
    },
    {
      id: "casesCumulative", name: "Cases cumulative", Component: CasesCumulativeChart, normalize: false,
    },
    {
      id: "casesIncrease", name: "Cases increase per day", Component: CasesIncreaseChart, normalize: false,
    },
  ];


  console.log("Data is now: ", data);
  const counties = data[0].slice(1);

  const [county, setCounty] = useState(counties.findIndex(c => c === "Stockholm"));
  const [chartType, setChartType] = useState(chartTypes[0]);
  const [avg, setAvg] = useState(7);
  const [days, setDays] = useState(180);

  const dataCleaned = data.slice(1);
  const len = dataCleaned.length;
  const getDates = () => dataCleaned.map(d => d[0]).slice(days ? len-days : 0); 
  const getValues = () => dataCleaned.map(d => d[1 + county]).slice(days ? len-days : 0);
  const county_name = counties[county];
  const getTotal = () => {
    console.log("map = ", population_map);
    console.log("county_name = ", county_name);
    return population_map[county_name];
  }

  console.log("Total = ", getTotal());

  return (
    <Grid>
      <Grid.Row columns={6}>
        <Grid.Column>
          <Select label="Type" value={chartType.id}  options={chartTypes.map((t, i) => ({key: t.id, value: t.id, text: t.name}))} onChange={(e, data) => setChartType(chartTypes.find(c => c.id === data.value))}/>
        </Grid.Column>
        <Grid.Column>
          <Select value={county}  options={counties.map((c, i) => ({key: i, value: i, text: c}))} onChange={(e, data) => setCounty(parseInt(data.value))}/>
        </Grid.Column>
        <Grid.Column>
          <Input label="Days" type="number" value={days} onChange={e => setDays(e.target.value)}/>
        </Grid.Column>
        <Grid.Column>
          <Input label="Moving Avg" type="number" value={avg} onChange={e => setAvg(e.target.value)}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <ResponsiveContainer>
            <chartType.Component dates={getDates()} values={getValues()} total={getTotal()} movingAverage={avg} normalize={chartType.normalize}/>
          </ResponsiveContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
