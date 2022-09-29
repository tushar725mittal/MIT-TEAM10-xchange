import React, { useState, useEffect } from 'react';
import {
    ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, Legend,
    DataLabel, Tooltip
} from '@syncfusion/ej2-react-charts';

function LineChart() {
    const [data, setData] = useState([]);

    useEffect(() => {

    }, [data]);
    var salseData = [
        { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
        { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
        { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
        { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
        { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
        { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }];

    return (
        <ChartComponent primaryXAxis={{ valueType: "Category", title: "Month" }} title="Sales Analysis"
            primaryYAxis={{ title: "Sales" }} legendSettings={{ visible: true }} tooltip={{ enable: true }}>
            <Inject services={[LineSeries, Category, Legend, DataLabel, Tooltip]}></Inject>
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={salseData} xName="month" yName="sales" type="Line" name="Sales"
                    marker={{ dataLabel: { visible: true }, visible: true }}></SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>
    );

}
;
export default LineChart;