import React, { useState } from "react";

import "./Calendar/DatePicker.css";

import './style/CalendarDesktop.scss'
import {Calendar} from "./CalendarForMobile"
import {getToday} from "../componentsPages/calculationsDate";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";

const CalendarForMobilejs = (props) => {

    const defaultDay =[
        // here we add some CSS classes
        { year: 1400, month: 2, day: 12, className: 'orangeDay' },
        { year: 1400, month: 2, day: 23, className: 'orangeDay' },
        { year: 1400, month: 2, day: 18, className: 'orangeDay' },
        { year: 1400, month: 3, day: 26, className: 'orangeDay' },
    ];


    const today = getToday()   //  تاریخ امروز را روی تقویم نشان میدهد
    let todayInt = {
        year:parseInt(today.year),
        month:parseInt(today.month),
        day:parseInt(today.day)
    }
    let defaultFrom = {
        year: 1400,
        month: 2,
        day: 4,
    };

    let defaultTo = {
        year: 1400,
        month: 2,
        day: 4,
    };
    defaultFrom = todayInt
    defaultTo = todayInt


    const defaultRange = {
        from: defaultFrom,
        to: defaultTo,
    };

    const [selectedDayRange, setSelectedDayRange] = useState(
        defaultRange
    );
    const [selectedDay, setSelectedDay] = useState(null);
    const  test2 = [1,2,3,4,5]
    const testname = () =>{
        /* return ({const [theArray, setTheArray] = useState([]); })*/
    }

    const test = () =>{
        /*      console.log('hi')
              console.log(selectedDayRange)
              console.log(setSelectedDayRange)*/
    }


    let disabledDays = [
        {
            year: 1400,
            month: 2,
            day: 3,
        },
    ];

    if(props.daysReserved){
        console.log(props.daysReserved)

        let disableDaysList = []
        for (let i = 0 ; i<props.daysReserved.length ; i++){
            let newList =  { year: '', month: '', day: '', className: '' }
            newList.year = parseInt(props.daysReserved[i].year)
            newList.month = parseInt(props.daysReserved[i].month)
            newList.day = parseInt(props.daysReserved[i].day)
            disableDaysList.push(newList)
        }
        disabledDays = disableDaysList

    }


    let minimumDate = {
        year: todayInt.year,
        month: todayInt.month,
        day: todayInt.day,
    };
    let maximumDate = {
        year: todayInt.year,
        month: todayInt.month,
        day: todayInt.day,
    }
    if(props.minimumDate && props.maximumDate){    // اگر مینیموم روزز و آخرین روز که از روی قیمت های روز ها میگیریم تعیین شده باشد
        minimumDate = props.minimumDate
        maximumDate=props.maximumDate
    }

    const setData = (data) =>{
        if(data.from && data.to){
            // props.getSelectedDays(data)
            props.getSelectedDaysCalendar(data)
        }
        setSelectedDayRange(data)
        // console.log(data)
        //  console.log('props.dateToGo')
    }


    return (
        <>
            <Calendar
                locale={'fa'}
                value={selectedDayRange}
                onChange={data=>setData(data)}
                customDaysClassName={defaultDay}
                shouldHighlightWeekends
                disabledDays={disabledDays}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                priceDays={[1,2000000,3,4]}
                test = {testname}
                villaPrice={props.villaPrice}


            />


            {test()}
        </>
    );
};

export default CalendarForMobilejs;