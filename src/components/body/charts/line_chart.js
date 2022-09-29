import { ChartComponent } from '@syncfusion/ej2-react-charts';
import * as React from 'react';
import "./line_chart.css"

class LineChart extends React.Component {
    render() {
        return (
            <div className='lineChart'>
                <ChartComponent />
            </div>
        );
    }
}
export default LineChart;