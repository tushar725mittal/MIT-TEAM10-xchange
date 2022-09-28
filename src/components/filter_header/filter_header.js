import React from 'react';
import CurrencySelector from './components/currency_selector/currency_selector';
import YearDropdown from './year_dropdown';

class FilterHeader extends React.Component {
    render() {
        return (
            <div>
                <div className="filterHeader">
                    <CurrencySelector />
                    <YearDropdown />
                </div>
            </div>
        )
    }
}

export default FilterHeader;

