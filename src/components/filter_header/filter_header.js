import React from 'react';
import CurrencySelector from './components/currency_selector/currency_selector';

class FilterHeader extends React.Component {
    render() {
        return (
            <div>
                <div className="filterHeader">
                    <CurrencySelector />
                    <CurrencySelector />
                </div>
            </div>
        )
    }
}

export default FilterHeader;

