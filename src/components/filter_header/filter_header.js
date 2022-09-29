import React from 'react';
import CurrencySelector from './components/currency_selector/currency_selector';
import WMQY from './components/wmqy/wmqy';
import "./filter_header.css";
import YearSelector from './components/year_selector/year_selector';
import CustomDatePicker from './components/date_picker/date_picker';

class FilterHeader extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.filterType);
        this.filterType = props.filterType;

    }

    filterType() {
        // console.log("used");
    }

    render() {
        return (
            <div className='header-box'>
                <div className='filterHeader'>
                    <CurrencySelector />
                    <div className='filters'>
                        <WMQY type="Weekly" filterType={this.filterType} />
                        <WMQY type="Monthly" filterType={this.filterType} />
                        <WMQY type="Quarterly" filterType={this.filterType} />
                        <WMQY type="Yearly" filterType={this.filterType} />
                    </div>
                    
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

