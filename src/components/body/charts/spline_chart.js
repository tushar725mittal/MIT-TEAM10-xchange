import React, { useState, useEffect } from 'react';
import {
    ChartComponent, Inject, SeriesCollectionDirective, SeriesDirective, Category, Legend,
    DataLabel, Tooltip, SplineAreaSeries, Zoom
} from '@syncfusion/ej2-react-charts';
import { get_data_range, get_data_range_wmqy } from '../../../services/data_fetch';


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function SplineChart(props) {
    const [data, setData] = useState([
    ]);

    // console.log(props.type);
    useEffect(() => {

        if (props.type == "") {
            // console.log(props.type)

            get_data_range({ currency_from: 'EUR', currency_to: 'INR', date_begin: formatDate(props.startDate), date_end: formatDate(props.endDate) }).then((newData) => {

                setData(newData['data'])
                console.log(newData['data'])
                console.log(data)

            });
        }
        else {
            get_data_range_wmqy({ currency_from: 'EUR', currency_to: 'INR', date_begin: '2020-01-01', type: props.type }).then((newData) => {

                setData(newData['data'])
                console.log(newData['data'])

                // console.log(data[0]);
            });
        }
    }, [props]);




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