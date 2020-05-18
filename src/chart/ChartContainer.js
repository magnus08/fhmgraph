import React, {useState} from 'react';
import readXlsxFile from "read-excel-file";
import {CountySelect} from "./CountySelect";


export function ChartContainer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const read = (file) => {
    setLoading(true);
    try {
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
    <div className="App">
      <header className="App-header">
        <div>
          <input type="file" onChange={(e) => read(e.target.files[0])}/>
        </div>
        <div>
          {content}
        </div>
      </header>
    </div>
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
