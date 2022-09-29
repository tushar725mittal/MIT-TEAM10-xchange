import './App.css';
import Body from './components/body/body';
import FilterHeader from './components/filter_header/filter_header';
function App() {
  return (
    <div className='main-app'>
      <FilterHeader />
      <Body />
    </div>
  )
}

export default App;

