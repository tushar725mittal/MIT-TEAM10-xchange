import React from 'react';
import ConversionCard from './conversion_card/conversion_card';
import SplineChart from './charts/spline_chart';
import './body.css';

function Body({ type, startDate, endDate }) {
    console.log("body " + type);
    return (
        <div className='body'>
            <SplineChart type={type} startDate={startDate} endDate={endDate} />
            <div className='cc-card'>
                <ConversionCard currencies={[]} />
            </div>
        </div >
    )

}

export default Body;