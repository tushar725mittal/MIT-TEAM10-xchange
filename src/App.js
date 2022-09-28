import './App.css';
import ConversionCard from './components/conversion_card/conversion_card';
import FilterHeader from './components/filter_header/filter_header';
import LineChart from './components/charts/line_chart';

function App() {
  return (
    <div>
      <FilterHeader />
      <LineChart />
      <ConversionCard />
    </div>
  )
}

export default App;

