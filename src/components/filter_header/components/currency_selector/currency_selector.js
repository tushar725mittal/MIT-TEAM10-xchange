import "./currency_selector.css";

function CurrencySelector() {
    return (
        <div>
            <div id="currencySelector">
                <select>
                    <option>USD</option>
                    <option>INR</option>
                    <option>LKR</option>
                </select> vs <select>
                    <option>USD</option>
                    <option>INR</option>
                    <option>LKR</option>
                </select>
            </div>
        </div>
    )
}

export default CurrencySelector;

