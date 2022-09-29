import React from 'react';
import ConversionCard from './conversion_card/conversion_card';
import LineChart from './charts/spline_chart';
import './body.css';

class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <LineChart />
                <div className='cc-card'>
                    <ConversionCard />
                </div>

            </div >
        )
    }
}

export default Body;