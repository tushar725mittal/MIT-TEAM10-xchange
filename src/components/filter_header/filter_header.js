import React from 'react';
import CurrencySelector from './components/currency_selector/currency_selector';
import WMQY from './components/wmqy/wmqy';
import "./filter_header.css";
import YearSelector from './components/year_selector/year_selector';
import CustomDatePicker from './components/date_picker/date_picker';

class FilterHeader extends React.Component {
    render() {
        return (
            <div>
                <div className="filterHeader">
                    <CurrencySelector />
                    <WMQY type="W" />
                    <WMQY type="M" />
                    <WMQY type="Q" />
                    <WMQY type="Y" />
                    <div>Year: <YearSelector /></div>

                    <div>
                        <CustomDatePicker />
                    </div>

                </div>
            </div >
        )
    }
}

export default FilterHeader;

