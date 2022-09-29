import './App.css';
import ConversionCard from './components/conversion_card/conversion_card';
import FilterHeader from './components/filter_header/filter_header';
import LineChart from './components/charts/line_chart';

function App() {
  return (
    <div>
      <FilterHeader />
      <div align='horizontal'>
        <div className='div1'>
          <LineChart />
        </div>
        <div className='div2'>
          <ConversionCard />
        </div>
      </div>
    </div>
  )
}

export default App;

