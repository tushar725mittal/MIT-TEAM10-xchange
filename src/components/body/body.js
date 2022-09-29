import React from 'react';
import ConversionCard from './conversion_card/conversion_card';
import SplineChart from './charts/spline_chart';
import './body.css';

function Body({ type }) {
    console.log("body " + type);
    return (
        <div className='body'>
            <SplineChart type={type} />
            <div className='cc-card'>
                <ConversionCard currencies={[]} />
            </div>
        </div >
    )

}

export default Body;