import React, { useState } from "react";

import "./Calendar/DatePicker.css";

import './style/CalendarDesktop.scss'
import {Calendar} from "./CalendarForMobile"
import {getToday} from "../componentsPages/calculationsDate";

const CalenderProfileMobile = (props) => {

    const today = getToday()    /// show today date {year , month , dday }
    const preselectedDays = [
        {
            year: parseInt(today.year),
            month:parseInt(today.month),
            day: parseInt(today.day),
        },

    ]


    const [selectedDayRange, setSelectedDayRange] = useState(
        preselectedDays
    );

    props.getSelectedDay(selectedDayRange)


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
    let closeDatesHostreserved = []
    let reservedDatesUsers = []
    if(props.closeDatesHostreserved){
        //   console.log(this.props.daysReserved)
        for (let i = 0 ; i<props.closeDatesHostreserved.length ; i++){
            let newList =  { year: '', month: '', day: '', className: 'purpleDay' }
            newList.year = parseInt(props.closeDatesHostreserved[i].year)
            newList.month = parseInt(props.closeDatesHostreserved[i].month)
            newList.day = parseInt(props.closeDatesHostreserved[i].day)
            closeDatesHostreserved.push(newList)
        }
    }

    if(props.reservedDatesUsers){
        //   console.log(this.props.daysReserved)
        for (let i = 0 ; i<props.reservedDatesUsers.length ; i++){
            let newList =  { year: '', month: '', day: '', className: 'yellowDay' }
            newList.year = parseInt(props.reservedDatesUsers[i].year)
            newList.month = parseInt(props.reservedDatesUsers[i].month)
            newList.day = parseInt(props.reservedDatesUsers[i].day)
            reservedDatesUsers.push(newList)
        }
    }
    defaultDay = closeDatesHostreserved.concat(reservedDatesUsers);

    return (
        <>
            <Calendar
                locale={'fa'}
                value={selectedDayRange}
                onChange={setSelectedDayRange}
                customDaysClassName={defaultDay}
                shouldHighlightWeekends
                villaPrice={props.villaPrice}
            />


        </>
    );
};

export default CalenderProfileMobile;