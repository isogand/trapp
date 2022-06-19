import React, { useState , Component} from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import {tile2LatLng} from "google-map-react";
import {Calendar} from "./Calendar";

class CalendarLinear extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date:''
        }
    }
    componentDidMount() {
        if(this.props.searchData){
            if(this.props.searchData.dayToGo){
                const space = this.props.searchData.dayToGo.split('/');
                this.setState({date: {
                        year:parseInt(space[0]),
                        month:parseInt(space[1]),
                        day:parseInt(space[2]),
                    }})
            }
        }
    }

    setData = (data) =>{
        if(data){
            this.setState({date:data})
            if(this.props.dayToGo){
                this.props.dayToGo(data)
            }
            if( this.props.dayToReturn){
                this.props.dayToReturn(data)
            }
            return data
        }
    }



    render(){

        let disabledDays = [
            {
                year: 1400,
                month: 2,
                day: 3,
            },
        ];

        if(this.props.daysReserved){
         //   console.log(this.props.daysReserved)

            let disableDaysList = []
            for (let i = 0 ; i<this.props.daysReserved.length ; i++){
                let newList =  { year: '', month: '', day: '', className: '' }
                newList.year = parseInt(this.props.daysReserved[i].year)
                newList.month = parseInt(this.props.daysReserved[i].month)
                newList.day = parseInt(this.props.daysReserved[i].day)
                disableDaysList.push(newList)
            }
            disabledDays = disableDaysList

        }


        return(
            <DatePicker
                value={this.state.date}
                onChange={data => this.setData(data)}
                locale={'fa'}
                disabledDays={disabledDays}
                inputPlaceholder={this.props.text}
                shouldHighlightWeekends

            />
        )
    }
}

export default CalendarLinear;