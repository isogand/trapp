import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import CalendarLinear from "../data/CalenddarLinear";
import {cancelReserve, cancelReservePrice, reservationsSearch, userReserves} from "../services/userService";
import config from "../services/config.json";
import {Waiting, WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

const commaNumber = require('comma-number')


class ProfilePageReservation2 extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            city: '',
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
            reservesData: [],
            waitingForLoad: true,
            waitingForSearch: false,
            areYouSure: false,

            reternudCost: '',
            userPrice: '',
            reserveIdSure: '',
            cancelReservationWaiting: false,
            areYouSureWaiting: false,
        }

    }

    componentDidMount() {
        userReserves()
            .then(res => {
                if (res.status === 200 && res.data.data.length > 0) {
                    this.setState({reservesData: res.data.data, waitingForLoad: false})
                } else {
                    this.props.history.push("/MainProfilePages/ProfilePageReservationEmpty")
                }
            })
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


    render() {


        return (
            <>

                {this.state.waitingForLoad ? WaitingLoadingProfilePage(this.state.waitingForLoad, "fv-waitingLoadPublicFullScreen")
                    :
                    <MDBContainer
                        className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2"}>

                        <div className={"fv-ProfilePageLeftBody"}>

                            <MDBCol md={8} sm={12}
                                    className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                                <h5>رزرو های من</h5>
                                <MDBRow className={"fv-ProfilePageReservationSetInfo fv-profileMyReservationSearchBox"}>
                                    <MDBCol md={4} sm={12} className={""}>
                                        <input type={"text"} placeholder={"شهر یا روستا را انتخاب کنید"}
                                               value={this.state.city}
                                               onChange={(e) => this.setState({city: e.target.value})}/>
                                    </MDBCol>

                                    <MDBCol md={2} sm={5} className={"fv-ProfilePageReservationRightCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDayToGo} text={'از تاریخ'}/>
                                    </MDBCol>
                                    <MDBCol md={2} sm={5} className={"fv-ProfilePageReservationLeftCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDayToReturn} text={'تا تاریخ'}/>
                                    </MDBCol>
                                    <MDBCol md={2} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                        <input type="button" value="جستجو " onClick={() => {
                                            this.setState({waitingForSearch: true})
                                            let setCity = ''
                                            let setDateToGo = ''
                                            let setDateToreturn = ''
                                            if (this.state.city === "") {
                                                setCity = ''
                                            } else {
                                                setCity = this.state.city
                                            }

                                            if (this.state.dateToGo.year) {
                                                setDateToGo = this.state.dateToGo.year + "/" + this.state.dateToGo.month + "/" + this.state.dateToGo.day
                                            } else {
                                                setDateToGo = ''
                                            }

                                            if (this.state.dateToReturn.year) {
                                                setDateToreturn = this.state.dateToReturn.year + "/" + this.state.dateToReturn.month + "/" + this.state.dateToReturn.day
                                            } else {
                                                setDateToreturn = ''
                                            }
                                            const data = {
                                                city: setCity,
                                                start_date: setDateToGo,
                                                end_date: setDateToreturn,
                                            }
                                            console.log(data)
                                            reservationsSearch(data)
                                                .then(res => {
                                                    console.log(res.data.data)
                                                    this.setState({
                                                        reservesData: res.data.data,
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
                                    <MDBRow>
                                        {this.state.reservesData.map(reserve => {
                                            let className = ''
                                            let md = ''
                                            let text = ""
                                            if (reserve.pay_status === "1") {   // در انتظار پرداخت
                                                className = "fv-profilePaeReservation2PayButtonSet"
                                                md = "5"
                                                text = "در انتظار پرداخت"
                                            }
                                            if (reserve.pay_status === "2") {   // پرداخت شد
                                                className = "fv-profilePaeReservation2PayButtonPayed"
                                                md = "4"
                                                text = "پرداخت شد"
                                            }
                                            if (reserve.pay_status === "0") {  // در انتظار پذیرش مشتری
                                                className = "fv-profilePaeReservation2PayButton"
                                                md = "7"
                                                text = "در انتظار پذیرش میزبان"
                                            }
                                            if (reserve.pay_status === "3") {  // laghv shodde
                                                className = "fv-profilePaeReservationFaild"
                                                md = "3"
                                                text = "لغو شده"
                                            }
                                            console.log(reserve)
                                            return (
                                                <MDBCol md={4}>
                                                    <MDBRow className={'fv-product fv-mobileProduct'}>
                                                        {/* <p>test</p> */}
                                                        <MDBRow
                                                            className={"fv-ProfilePageReservation2ImageProductContentTopOne"}>

                                                            <MDBCol md={md}>
                                                                <p style={{marginRight: '5%'}}>{text}</p>
                                                                <input type="text"/>
                                                            </MDBCol>

                                                        </MDBRow>
                                                        <img
                                                            src={`${config.webapi}/images/villas/thum/${reserve.img_src}`}
                                                            className={'fv-productImage'}/>

                                                        <MDBRow>
                                                            <MDBCol className={'fv-productTopic'}>
                                                                <h6>{reserve.villa_title}</h6>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow className={'fv-ProfilePageReservation2ProductLocaton'}>
                                                            <MDBCol md={12} sm={10}>
                                                                <p>{reserve.state}
                                                                    <i className="fa fa-map-marker-alt"/></p>
                                                            </MDBCol>
                                                        </MDBRow>

                                                        <MDBRow className={'fv-productCapacityBox'}>
                                                            <MDBCol md={12} sm={9}
                                                                    className={"fv-ProfilePageReservation2ProductDate"}>
                                                                <i className="fa fa-calendar"/>
                                                                <p> {reserve.entry_date} تا {reserve.exit_date} </p>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow className={"fv-borderButton"}>

                                                        </MDBRow>
                                                        <MDBRow className={"fv-profilePaeReservation2PriceBox"}>
                                                            <MDBCol md={2} sm={2}>
                                                                <p>تومان</p>
                                                            </MDBCol>
                                                            <MDBCol md={3} sm={3}>
                                                                <h6>{commaNumber(reserve.cost)}</h6>
                                                            </MDBCol>
                                                            <MDBCol md={7} sm={7}>
                                                                <h5>مبلغ قابل پرداخت</h5>
                                                            </MDBCol>
                                                        </MDBRow>
                                                        <MDBRow
                                                            className={className}> {/* be ezaie har class ke vojod darad iek style migirad */}
                                                            {reserve.pay_status === "1" ?    // agar taeid shode bashad
                                                                <MDBRow className={"fv-status1-reservation"}>
                                                                    <MDBCol md={6} sm={6}
                                                                            className={"fv-status1-reservation-leftButton"}>
                                                                        <input type="button" value="نمایش ویلا"
                                                                               onClick={() => {
                                                                                   window.location.replace(`/displayPage/${reserve.villa_id}`);
                                                                               }}/>
                                                                    </MDBCol>
                                                                    <MDBCol md={6} sm={6}
                                                                            className={"fv-status1-reservation-rightButton"}>
                                                                        <input type="button" value="پرداخت"
                                                                               onClick={() => {
                                                                                   window.location.replace(`/factor/${reserve.id}`);
                                                                               }}/>
                                                                    </MDBCol>
                                                                </MDBRow>

                                                                : reserve.pay_status === "2" ?    // agar pardakht shode bashad
                                                                    <>

                                                                        {this.state.areYouSure === false ?
                                                                            <MDBRow
                                                                                className={"fv-status2-reservation"}>
                                                                                {this.state.cancelReservationWaiting ? Waiting(true, "") :
                                                                                    <>
                                                                                        <MDBCol md={6} sm={6}
                                                                                                className={"fv-status1-reservation-leftButton"}>
                                                                                            <input type="button"
                                                                                                   value="لغو اجاره"
                                                                                                   onClick={() => {
                                                                                                       this.setState({cancelReservationWaiting: true})

                                                                                                       cancelReservePrice({id: reserve.id})
                                                                                                           .then(res => {
                                                                                                               console.log(res)
                                                                                                               this.setState({
                                                                                                                   areYouSure: true,
                                                                                                                   reserveIdSure: reserve.id,
                                                                                                                   reternudCost: res.data.reternud_cost,
                                                                                                                   userPrice: res.data.user_price,
                                                                                                                   cancelReservationWaiting: false,
                                                                                                               })
                                                                                                           })
                                                                                                           .catch(err => this.setState({cancelReservationWaiting: false}))
                                                                                                   }}/>
                                                                                        </MDBCol>
                                                                                        <MDBCol md={6} sm={6}
                                                                                                className={"fv-status1-reservation-rightButton"}>
                                                                                            <input type="button"
                                                                                                   value="نمایش ویلا"
                                                                                                   onClick={() => {
                                                                                                       window.location.replace(`/displayPage/${reserve.villa_id}`);
                                                                                                   }}/>
                                                                                        </MDBCol>
                                                                                    </>
                                                                                }

                                                                            </MDBRow>
                                                                            :
                                                                            <>

                                                                                {this.state.reserveIdSure === reserve.id ? // agar hamon id bod ke dar bala (ke click shode) set shode bashad

                                                                                    <MDBRow
                                                                                        className={"fv-status2-reservation"}>
                                                                                        <MDBRow
                                                                                            className={"fv-areYouSure-text"}>
                                                                                            <p className={"h7"}>بنا بر
                                                                                                قوانین
                                                                                                سایت {this.state.reternudCost} درصد
                                                                                                از
                                                                                                مبلغ معادل
                                                                                                با {this.state.userPrice} تومان
                                                                                                به
                                                                                                کیف
                                                                                                پول شما باز میگردد </p>
                                                                                            <h6>آیا اطمینان دارید؟</h6>
                                                                                        </MDBRow>

                                                                                        {this.state.areYouSureWaiting ? Waiting(true, "") :
                                                                                            <>
                                                                                                <MDBCol md={6} sm={6}
                                                                                                        className={"fv-status1-reservation-leftButton"}>
                                                                                                    <input type="button"
                                                                                                           value="خیر"
                                                                                                           onClick={() => {
                                                                                                               this.setState({areYouSure: false})
                                                                                                           }}/>
                                                                                                </MDBCol>
                                                                                                <MDBCol md={6} sm={6}
                                                                                                        className={"fv-status1-reservation-rightButton"}>
                                                                                                    <input type="button"
                                                                                                           value="بله"
                                                                                                           onClick={() => {
                                                                                                               this.setState({
                                                                                                                   areYouSure: true,
                                                                                                                   areYouSureWaiting: true
                                                                                                               })
                                                                                                               cancelReserve({id: reserve.id})
                                                                                                                   .then(res => {
                                                                                                                       console.log(res)
                                                                                                                       alert(res.data.message)

                                                                                                                       userReserves()
                                                                                                                           .then(res => {
                                                                                                                               if (res.status === 200 && res.data.data.length > 0) {
                                                                                                                                   this.setState({
                                                                                                                                       reservesData: res.data.data,
                                                                                                                                       waitingForLoad: false,
                                                                                                                                       areYouSureWaiting: false
                                                                                                                                   })
                                                                                                                               } else {
                                                                                                                                   this.setState({areYouSureWaiting: false})
                                                                                                                                   this.props.history.push("/MainProfilePages/ProfilePageReservationEmpty")
                                                                                                                               }
                                                                                                                           })
                                                                                                                   })
                                                                                                                   .catch(err => console.log(err.response))
                                                                                                           }}/>
                                                                                                </MDBCol>
                                                                                            </>
                                                                                        }


                                                                                    </MDBRow>
                                                                                    :
                                                                                    <MDBRow
                                                                                        className={"fv-status2-reservation"}>
                                                                                        <MDBCol md={6} sm={6}
                                                                                                className={"fv-status1-reservation-leftButton"}>
                                                                                            <input type="button"
                                                                                                   value="لغو اجاره"
                                                                                                   onClick={() => {
                                                                                                       this.setState({})

                                                                                                       cancelReservePrice({id: reserve.id})
                                                                                                           .then(res => {
                                                                                                               console.log(res)
                                                                                                               this.setState({
                                                                                                                   areYouSure: true,
                                                                                                                   reserveIdSure: reserve.id,
                                                                                                                   reternudCost: res.data.reternud_cost,
                                                                                                                   userPrice: res.data.user_price
                                                                                                               })
                                                                                                           })
                                                                                                           .catch(err => console.log(err.response))
                                                                                                   }}/>
                                                                                        </MDBCol>
                                                                                        <MDBCol md={6} sm={6}
                                                                                                className={"fv-status1-reservation-rightButton"}>
                                                                                            <input type="button"
                                                                                                   value="نمایش ویلا"
                                                                                                   onClick={() => {
                                                                                                       window.location.replace(`/displayPage/${reserve.villa_id}`);
                                                                                                   }}/>
                                                                                        </MDBCol>
                                                                                    </MDBRow>}

                                                                            </>

                                                                        }


                                                                    </>
                                                                    : reserve.pay_status === "0" ?

                                                                        <input type="button" value="پرداخت"/>

                                                                        : reserve.pay_status === "3" ?

                                                                            <input type="button"
                                                                                   value="نمایش ویلا"
                                                                                   onClick={() => {
                                                                                       window.location.replace(`/displayPage/${reserve.villa_id}`);
                                                                                   }}/>

                                                                            : ''}


                                                        </MDBRow>
                                                    </MDBRow>
                                                </MDBCol>
                                                /*  <ReservationProduct
                                                      md={md}
                                                      classnameButton={className}
                                                      payStatus={reserve.pay_status}
                                                      villaTitle={}
                                                      state={}
                                                      entryDay={}
                                                      exitDate={}
                                                      cost={}
                                                  />*/
                                            )
                                        })}

                                    </MDBRow>

                                    : ''}


                            </MDBCol>
                        </div>


                    </MDBContainer>
                }
            </>
        )
    }
}

export default ProfilePageReservation2