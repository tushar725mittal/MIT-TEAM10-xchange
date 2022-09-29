import { useState } from 'react';
import './App.css';
import Body from './components/body/body';
import FilterHeader from './components/filter_header/filter_header';
function App() {
  var ft = "";

  var filterType = (data) => {
    ft = data
    console.log("used");
    console.log(ft);
  }
  return (
    <div>
      <FilterHeader filterType={filterType} />
      <Body />
    </div>
  )
}

export default App;

