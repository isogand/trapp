import React, { useState } from "react";
import "./Calendar/DatePicker.css";
import DatePicker, { Calendar2 } from '@hassanmojab/react-modern-calendar-datepicker';
import {Calendar,utils } from "./Calendar";
import moment from "moment-jalaali";


import './style/CalendarDesktop.scss'
import SetPrice from './Calendar/components/DaysList'
import {getToday} from "../componentsPages/calculationsDate";

const CalendarDesktop = (props) => {

    let defaultDay = ''
    defaultDay =[
        // here we add some CSS classes
      /*  { year: 1400, month: 1, day: 6, className: 'orangeDay' },
        { year: 1400, month: 2, day: 23, className: 'orangeDay' },
        { year: 1400, month: 2, day: 18, className: 'orangeDay' },
        { year: 1400, month: 3, day: 26, className: 'orangeDay' },
        { year: 1400, month: 3, day: 4, className: 'purpleDay' },
        { year: 1400, month: 1, day: 13, className: 'yellowDay' },
        { year: 1400, month: 3, day: 26, className: 'navyBlueDay' }, */
    ];
    // className  yellowDay for disable days

    const defaultFrom = {
        year: 1300,
        month: 2,
        day: 4,
    };

    const defaultTo = {
        year: 1300,
        month: 2,
        day: 4,
    };

    const defaultRange = {
        from: defaultFrom,
        to: defaultTo,
    };


    const [selectedDayRange, setSelectedDayRange] = useState(
        defaultRange
    );
    props.getSelectedDay(selectedDayRange)

    const testname = () =>{
        /* return ({const [theArray, setTheArray] = useState([]); })*/
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

    const today = getToday()   //  تاریخ امروز را روی تقویم نشان میدهد
    let todayInt = {
        year:parseInt(today.year),
        month:parseInt(today.month),
        day:parseInt(today.day)
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
    const dayOfMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const monthOfYear = 2
    const year = 1400

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
                priceDays={dayOfMonth}
                PriceMonth={monthOfYear}
                PriceYear={year}
                test = {testname}
                villaPrice={props.villaPrice}



            />

        </>
    );
};

export default CalendarDesktop;

