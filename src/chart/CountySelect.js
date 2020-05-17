import React, {useState} from 'react';
import readXlsxFile from "read-excel-file";
import {Chart} from "./Chart";

export function CountySelect({data}) {
  const counties = data[0].slice(1);

  const [county, setCounty] = useState(counties.findIndex(c => c === "Stockholm"));

  const dataCleaned = data.slice(1);
  const getDates = () => dataCleaned.map(d => d[0]);
  console.log("County = ", county, county+1);
  const getValues = () => dataCleaned.map(d => d[county+1]);

  return (
    <div>
      <select value={county} onChange={(e) => setCounty(e.target.value)}>
        {counties.map((c,i) =>
          <option key={i} value={i}>{c}</option>
        )}
      </select>
      <Chart dates={getDates()} values={getValues()}/>
    </div>
  );
}
