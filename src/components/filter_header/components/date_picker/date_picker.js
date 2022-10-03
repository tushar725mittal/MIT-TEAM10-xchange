import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        // console.log(startDate);
        // console.log(endDate);
        props.DateFilter(startDate, endDate);
    }, [startDate, endDate]);
    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
            />
        </>
    );
}

export default CustomDatePicker;