import React, { useState , Component} from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import {tile2LatLng} from "google-map-react";

class CalendarLinear extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date:''
        }
    }
    componentDidMount() {
        if(this.props.searchData){
            if(this.props.searchData.dateToReturn){
                const space = this.props.searchData.dateToReturn.split('/');
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


        return(
            <DatePicker
                value={this.state.date}
                onChange={data => this.setData(data)}
                locale={'fa'}
                inputPlaceholder={this.props.text}
                shouldHighlightWeekends

            />
        )
    }
}

export default CalendarLinear;