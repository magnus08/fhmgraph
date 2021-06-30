import React, {useState} from 'react';
import readXlsxFile from "read-excel-file";
import {CountySelect} from "./CountySelect";
import {Grid, Input} from "semantic-ui-react";


export function ChartContainer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const read = (file) => {
    setLoading(true);
    try {
      console.log("Gogo read XlsX");
      readXlsxFile(file, {sheet: 1}).then((rows) => {
        console.log("Rows = ", rows);
        setData(rows);
      });
      setLoading(false);
    } catch(e) {
      setLoading(false);
      setError(e);
      console.log("Something went wrong when reading file: ", e);

    }
  };

  const wrap = (content) => (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Input type="file" onChange={(e) => read(e.target.files[0])}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          {content}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  if(error) {
    return wrap(
      <div>There was a problem reading the file.</div>
    );
  } else if (loading) {
    return wrap(
      <div>Loading...</div>
    );
  } else if(data) {
    return wrap(
      <CountySelect data={data}/>
    );
  } else {
    return wrap(
      <div>Select a file above</div>
    );
  }


}
