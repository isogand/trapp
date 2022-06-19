import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageTransaction2.scss"
import "../style/ProfilePageReservationsRequested.scss"

import {
    allReservationsRequested,
    changeReserveStatus,
    requestedReservationsSearch,
    userVillas
} from "../services/userService";
import "../style/scroolBodyProfilePages.scss"
import CalendarLinear from "../data/CalenddarLinear";
import {waitingForCalculate2, WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

class ProfilePageReservationsRequested extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            allReservationsRequested: [],
            villasUser: [],
            villasUsertitle: 'title',
            dateToGo: {
                day: '',
                month: '',
                year: ''
            },
            dateToReturn: {
                day: '',
                month: '',
                year: ''
            },
            reservationsIdSelected: [],
            waitingForLoad: true,
            waitingUpdateButton: false,
            waitingForSearch: false,
        }
    }

    componentDidMount() {
        this.allReservationsRequested()

        userVillas()
            .then(res => {
                if (res.data.data && res.data.data.length > 0) {
                    this.setState({villasUser: res.data.data, waitingForLoad: false})
                } else {
                    this.props.history.push("/MainProfilePages/ProfilePageReservationEmpty")
                }
            })
    }

    allReservationsRequested = () => {
        allReservationsRequested()
            .then(res => {
                console.log(res)
                if (res.data && res.data.data.length > 0) {
                    this.setState({allReservationsRequested: res.data.data})
                } else {
                    this.props.history.push("/MainProfilePages/ProfilePageReservationEmpty")
                }

            })
            .catch(err => console.log(err.response))
    }

    selectDayToGo = (date) => {                                    // set date to go
        if (date) {
            this.setState(prevstate => ({
                dateToGo: {
                    ...prevstate.day,
                    ...prevstate.month,
                    ...prevstate.year,
                    day: date.day,
                    month: date.month,
                    year: date.year
                }
            }))
        }
    }
    selectDayToReturn = (date) => {                               // set date to return
        if (date) {
            this.setState(prevState => ({
                dateToReturn: {
                    ...prevState.day,
                    ...prevState.month,
                    ...prevState.year,
                    day: date.day,
                    month: date.month,
                    year: date.year
                }
            }))
        }
    }
    selectedRow = (reservationsId) => {

        const prevId = this.state.reservationsIdSelected
        let add = ""
        if (this.state.reservationsIdSelected.indexOf(reservationsId) === -1) {
            add = true
        } else {
            add = false
        }

        if (add && this.state.reservationsIdSelected.indexOf(reservationsId) === -1) {   // یعنی انتخاب کرده است
            prevId.push(reservationsId)
            this.setState({reservationsIdSelected: prevId})
        }
        if (add === false && this.state.reservationsIdSelected.indexOf(reservationsId) !== -1) {  // nnot selected this part
            const index = prevId.indexOf(reservationsId)
            if (index !== -1) {
                prevId.splice(index, 1);
                this.setState({reservationsIdSelected: prevId})
            }

        }
    }

    render() {
        return (
            <>

                {this.state.waitingForLoad ? WaitingLoadingProfilePage(this.state.waitingForLoad, "fv-waitingLoadPublicFullScreen")
                    :
                    <div
                        className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2 fv-ProfilePageTransaction fv-ProfilePageTransaction2 fv-ProfilePageReservationsRequested"}>

                        <div className={"fv-ProfilePageLeftBody"}>

                            <MDBCol md={8} sm={12}
                                    className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                                <h6>رزروهای درخواستی</h6>
                                <p className={"fv-ProfilePageReservationsRequestedPTitle"}>جهت تایید یا عدم تایید رزرو
                                    مهمان هر سطر را انتخاب کنید و تایید یا عدم تایید کنید</p>
                                <MDBRow className={"fv-ProfilePageReservationSetInfo"}>


                                    <MDBCol md={3} sm={12}
                                            className={"fv-ProfilePageReservationRequestedAccommodation"}>
                                        <select value={this.state.villasUsertitle} onChange={(e) => {  // villasUsertitle == همان آی دی ویلا میباشد
                                            this.setState({villasUsertitle: e.target.value})
                                        }}>
                                            <option value='title' disabled>نام اقامت گاه</option>
                                            {this.state.villasUser.map(vilauser => {
                                                return <option value={vilauser.id}>{vilauser.title}</option>
                                            })}

                                        </select>
                                    </MDBCol>
                                    <MDBCol md={2} sm={5} className={"fv-ProfilePageReservationRightCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDayToGo} text={'از تاریخ'}/>
                                    </MDBCol>
                                    <MDBCol md={2} sm={5} className={"fv-ProfilePageReservationLeftCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDayToReturn} text={'تا تاریخ'}/>
                                    </MDBCol>

                                    <MDBCol md={3} sm={10} className={"fv-ProfilePageUserSetInfoButton"}>
                                        <input type="button" value="جستجو" onClick={() => {
                                            this.setState({waitingForSearch: true})
                                            let villaId = ""
                                            let setDateToGo = ''
                                            let setDateToreturn = ''

                                            if (this.state.villasUsertitle === "title") {
                                                villaId = ""
                                            } else {
                                                villaId = this.state.villasUsertitle
                                            }

                                            if (this.state.dateToGo.year) {
                                                setDateToGo = this.state.dateToGo.year + "/" + this.state.dateToGo.month + "/" + this.state.dateToGo.day
                                            } else {
                                                setDateToGo = ""
                                            }

                                            if (this.state.dateToReturn.year) {
                                                setDateToreturn = this.state.dateToReturn.year + "/" + this.state.dateToReturn.month + "/" + this.state.dateToReturn.day
                                            } else {
                                                setDateToreturn = ""
                                            }
                                            let datas = {
                                                villa_id: villaId,
                                                start_date: setDateToGo,
                                                end_date: setDateToreturn,
                                            }


                                            console.log(datas)
                                            requestedReservationsSearch(datas)
                                                .then(res => {
                                                    console.log(res)
                                                    this.setState({
                                                        allReservationsRequested: res.data.data,
                                                        waitingForSearch: false
                                                    })
                                                })
                                                .catch(err => {
                                                    this.setState({waitingForSearch: false})
                                                    console.log(err.response)
                                                })
                                        }}/>
                                    </MDBCol>
                                </MDBRow>


                                {this.state.waitingForSearch ? WaitingLoadingProfilePage(this.state.waitingForSearch, "fv-waitingLoadPublicFullScreen fv-waitingForSearchReservation") : ""}
                                {!this.state.waitingForSearch ?
                                    <>

                                        <table>
                                            <tr className={"fv-tableTitle"}>
                                                <th className={"fv-tableTitleRightOne"}><h6>نام اقامت گاه</h6></th>
                                                <th className={"fv-tableTitleRightSecond"}><h6>نام مهمان</h6></th>
                                                <th><h6>تعداد نفرات</h6></th>
                                                <th><h6>از تاریخ</h6></th>
                                                <th className={"fv-tableTitleContents"}><h6>تا تاریخ</h6></th>
                                                <th className={"fv-tableTitleLeftOne"}><h6>وضعیت</h6></th>
                                            </tr>
                                            {this.state.allReservationsRequested.map(allReservationsRequest => {
                                                let state = ""
                                                if (allReservationsRequest.satus === "0") {
                                                    state = "در انتظار تایید توسط مالک ویلا"
                                                }
                                                if (allReservationsRequest.satus === "1") {
                                                    state = "در انتظار پرداخت"
                                                }
                                                if (allReservationsRequest.satus === "2") {
                                                    state = "پرداخت شده"
                                                }
                                                return <tr onClick={() => this.selectedRow(allReservationsRequest.id)}
                                                           className={this.state.reservationsIdSelected.indexOf(allReservationsRequest.id) !== -1 ? "fv-selected" : ""}>
                                                    <td><a>{allReservationsRequest.title}</a></td>
                                                    <td><a>{allReservationsRequest.guest_name}</a></td>
                                                    <td><a>{allReservationsRequest.passengers_number}</a></td>
                                                    <td><a>{allReservationsRequest.start_date}</a></td>
                                                    <td><a>{allReservationsRequest.end_date}</a></td>
                                                    <td className={allReservationsRequest.satus === "2" ? "fv-reservedColor" : ""}>
                                                        <a>{state}</a></td>
                                                </tr>
                                            })}
                                        </table>


                                        <MDBRow
                                            className={this.state.waitingUpdateButton ? "fv-waitingReservationRequestClass" : "fv-hideForWaiting"}>

                                            <MDBCol sm={12} md={6}
                                                    className={this.state.waitingUpdateButton ? "" : "fv-hideForWaiting"}>

                                                {waitingForCalculate2(this.state.waitingUpdateButton, "fv-waitingLoadPublicFullScreen fv-computingReservedDetails fv-ProfileCalendarWaiting")}
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow
                                            className={this.state.waitingUpdateButton ? "fv-hideForWaiting" : "fv-ProfilePageReservationSetInfo fv-ProfilePageReservationsRequestedButton"}>
                                            <MDBCol md={3} sm={6}
                                                    className={this.state.waitingUpdateButton ? "fv-hideForWaiting" : "fv-ProfilePageUserSetInfoButton fv-ProfilePageUserSetInfoButtonRight"}>
                                                <a> <input type="button" value="عدم تایید رزرو" onClick={() => {
                                                    this.setState({waitingUpdateButton: true})
                                                    if (this.state.reservationsIdSelected.length === 0) {
                                                        alert("لطفا سطر مورد نظر خود را انتخاب کنید")
                                                        this.setState({waitingUpdateButton: false})
                                                    } else {
                                                        const data = {
                                                            ids: this.state.reservationsIdSelected,
                                                            status: 0,
                                                        }

                                                        console.log(data)
                                                        changeReserveStatus(data)
                                                            .then(res => {
                                                                // window.location.reload()
                                                                allReservationsRequested()
                                                                    .then(res => {
                                                                        this.setState({
                                                                            allReservationsRequested: res.data.data,
                                                                            waitingUpdateButton: false
                                                                        })
                                                                    })
                                                                    .catch(err => this.setState({waitingUpdateButton: false}))
                                                            })
                                                            .catch(err => {
                                                                alert("لطفا سطر مورد نظر خود را انتخاب کنید")
                                                                this.setState({waitingUpdateButton: false})
                                                            })
                                                    }

                                                }}/></a>
                                            </MDBCol>
                                            <MDBCol md={3} sm={6}
                                                    className={this.state.waitingUpdateButton ? "fv-hideForWaiting" : "fv-ProfilePageUserSetInfoButton "}>

                                                <a> <input type="button" value="تایید رزرو" onClick={() => {
                                                    this.setState({waitingUpdateButton: true})
                                                    if (this.state.reservationsIdSelected.length === 0) {
                                                        alert("لطفا سطر مورد نظر خود را انتخاب کنید")
                                                        this.setState({waitingUpdateButton: false})
                                                    } else {
                                                        const data = {
                                                            ids: this.state.reservationsIdSelected,
                                                            status: 1,
                                                        }

                                                        console.log(data)
                                                        changeReserveStatus(data)
                                                            .then(res => {
                                                                console.log(res)
                                                                if (res.data.data === "Status updated") {
                                                                    // window.location.reload()
                                                                    allReservationsRequested()
                                                                        .then(res => {
                                                                            this.setState({
                                                                                allReservationsRequested: res.data.data,
                                                                                waitingUpdateButton: false
                                                                            })
                                                                        })
                                                                        .catch(err => this.setState({waitingUpdateButton: false}))

                                                                } else if (res.data.status) {
                                                                    if (res.data.status === -1) {
                                                                        alert(res.data.data)
                                                                        this.setState({waitingUpdateButton: false})
                                                                    }
                                                                } else {
                                                                    alert(res.data.message)
                                                                    this.setState({waitingUpdateButton: false})
                                                                }
                                                            })
                                                            .catch(err => {
                                                                alert("لطفا سطر مورد نظر خود را انتخاب کنید")
                                                                this.setState({waitingUpdateButton: false})
                                                            })
                                                    }
                                                }}/></a>
                                            </MDBCol>
                                        </MDBRow>
                                    </>
                                    : ''}

                            </MDBCol>
                        </div>


                    </div>
                }
            </>
        )
    }
}

export default ProfilePageReservationsRequested