import React from 'react';
import logo from './logo.svg';
import './App.css';
import readXlsxFile from "read-excel-file";

const read = (file) => {
  readXlsxFile(file, {sheet: 1}).then((rows) => {
    const titles = rows[0].slice(1);
    const index = titles.findIndex(t => t === "Stockholm") + 1;
    rows.map(r => {
      console.log(`Date: ${r[0]}, Num: ${r[index]}`);
    });
    console.log("Index: ", index);
    // `rows` is an array of rows
    // each row being an array of cells.
  })
};


// input.addEventListener('change', () => {
//   readXlsxFile(input.files[0]).then((rows) => {
//     // `rows` is an array of rows
//     // each row being an array of cells.
//   })
// })
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input type="file" onChange={(e) => read(e.target.files[0])}/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
