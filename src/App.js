import { useState, useEffect } from 'react';
import './App.css';
import Body from './components/body/body';
import FilterHeader from './components/filter_header/filter_header';




function App() {
  const [tft, setFilterType] = useState("");

  const FilterType = (data) => {

    var ft = data;

    console.log("used");
    console.log(ft);
    setFilterType(ft);
  }

  useEffect(() => { }, [tft]);

  const [[startDate, endDate], setDateFilter] = useState([new Date(), new Date()]);

  const DateFilter = (startDate, endDate) => {

    var startDate = startDate;
    var endDate = endDate;

    console.log("used");
    console.log(endDate);
    setDateFilter([startDate, endDate]);
  }

  useEffect(() => { }, [endDate, startDate]);


  return (
    <div>
      <FilterHeader FilterType={FilterType} DateFilter={DateFilter} />
      <Body type={tft} startDate={startDate} endDate={endDate} />
    </div>
  )
}

export default App;

