import './currency_selector.css';

function CurrencySelector() {
    return (
        <div className='div-selector'>
            <select className='currency-selector'>
                <option>USD</option>
                <option>INR</option>
                <option>LKR</option>
            </select> 
            <div className='text-container'> V/S</div>
            <select className='currency-selector'>
                <option>USD</option>
                <option>INR</option>
                <option>LKR</option>
            </select>
        </div>
    )
}

export default CurrencySelector;

