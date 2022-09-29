import React, { useState, useEffect } from 'react';
import {
    ChartComponent, Inject, SeriesCollectionDirective, SeriesDirective, Category, Legend,
    DataLabel, Tooltip, SplineAreaSeries, Zoom
} from '@syncfusion/ej2-react-charts';
import { get_data_range, get_data_range_wmqy } from '../../../services/data_fetch';

function SplineChart(props) {
    console.log(props);
    // console.log(props.type);
    useEffect(() => {

        if (props.type == "") {
            console.log(props.type)
            console.log(Date(props.startDate).toString())
            get_data_range({ currency_from: 'EUR', currency_to: 'INR', date_begin: '2020-01-01', date_end: '2020-12-31' }).then((newData) => {

                setData(newData['data'])
                console.log(data[0]);
            });
        }
        else {
            get_data_range_wmqy({ currency_from: 'EUR', currency_to: 'INR', date_begin: '2020-01-01', type: props.type }).then((newData) => {

                setData(newData['data'])
                console.log(newData['data'])
                console.log(data[0]);
            });
        }
    }, [props]);

    const [data, setData] = useState([
    ]);



    return (
        <ChartComponent zoomSettings={
            {
                enableMouseWheelZooming: true,
                enablePan: true,
                enableScrollbar: true,
            }}
            primaryXAxis={{ valueType: "Category", title: "Month" }} title="Sales Analysis"
            primaryYAxis={{ title: "Currency" }} legendSettings={{ visible: true }} tooltip={{ enable: true }}>
            <Inject services={[SplineAreaSeries, Category, Legend, Zoom, DataLabel, Tooltip]}></Inject>

            <SeriesCollectionDirective>
                <SeriesDirective dataSource={data} xName="date" yName="value" type="SplineArea" name="Sales"
                    marker={{ dataLabel: { visible: true }, visible: true }}></SeriesDirective>
            </SeriesCollectionDirective>
        </ChartComponent>
    );

}
;
export default SplineChart;