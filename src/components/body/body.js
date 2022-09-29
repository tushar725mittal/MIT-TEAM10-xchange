import React from 'react';
import ConversionCard from './conversion_card/conversion_card';
import LineChart from './charts/line_chart';
import './body.css';

class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <div className='div1'>
                    <LineChart />
                </div>
                <div  className='div1'>
                    <ConversionCard />
                </div>
            </div>
        )
    }
}

export default Body;