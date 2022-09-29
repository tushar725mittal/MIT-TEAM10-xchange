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


  return (
    <div>
      <FilterHeader FilterType={FilterType} />
      <Body type={tft} />
    </div>
  )
}

export default App;

