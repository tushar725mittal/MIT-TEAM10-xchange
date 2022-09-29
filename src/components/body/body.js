import React from 'react';
import ConversionCard from './conversion_card/conversion_card';
import LineChart from './charts/line_chart';

class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <div>
                    <LineChart />
                </div>
                <div>
                    <ConversionCard />
                </div>
            </div>
        )
    }
}

export default Body;