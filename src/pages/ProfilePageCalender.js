import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageReservation.scss"
import "../style/ProfilePageWallet.scss"
import "../style/ProfilePageCalender.scss"
import CalendarForProfile from "../data/CalendarForProfile";
import CalenderProfileMobile from "../data/CalenderProfileMobile";
import {changeDatesCost, changeDatesStatus, closedReservedDates, userVillas} from "../services/userService";
import {villaPrice} from "../services/villaService";
import {priceOfPerMonth} from "../componentsPages/calculationsDate";
import config from "../services/config.json";
import {waitingForCalculate2} from "../componentsPages/WaitingLoad";

class ProfilePageCalender extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            changeStatusSelectedDays: 'title',
            price: '',
            villaPrice: [],
            selectedDays: '',
            selectedDaysMobile: '',
            villasUsertitle: this.props.match.params.id,
            clickHandlerLoading: false,
            villasUser: [],
            clickLoaderCalendar: false,

            selectedDaysAll: '',
            resultReservedDates: [],
            finallyPrice: [],

            reservedDatesUsers: [],
            closedDatesHost: [],
            waitingButtonPrice: false,

        }

    }

    componentWillReceiveProps(nextProps) {
        const currentId = this.props.id
        const nextId = nextProps.id

        if (currentId !== nextId) {
            this.props.fetchPost(nextId)
        }
    }

    componentDidMount() {

        villaPrice(this.state.villasUsertitle)
            .then(res => {
                if (res.data) {
                    this.setState({villaPrice: res.data}, () => {
                        this.villaReservedDates()
                    })
                }
            })

        userVillas()
            .then(res => {
                //  console.log(res)
                if (res.data.data)
                    this.setState({villasUser: res.data.data})
            })


    }

    villaReservedDates = async () => {


        closedReservedDates(this.state.villasUsertitle)
            .then(res => {
                // console.log(res)
                this.setState({
                    reservedDatesUsers: Object.values(res.data.data.reservedDates),
                    closedDatesHost: Object.values(res.data.data.customizedDates),
                    waitingButtonPrice: false
                }, () => {
                    this.calculatePricesWithString()

                    this.props.history.push(`/MainProfilePages/profileCalender/${this.state.villasUsertitle}`)
                })

            })
            .catch(err => this.setState({waitingButtonPrice: false}))


        /* reservedDates(this.state.villasUsertitle)
             .then(res => {
                 this.setState({resultReservedDates: Object.values(res.data.data)} , () =>{
                         this.calculatePricesWithString()
                 });
             })
             .catch(error =>{
             }) */

    }
    calculatePricesWithString = () => {
        const priceDaysUpdates = []  /// مورد نظر
        let priceArrayOneMonth = {
            daysPrice: [],
            month: '',
            year: ''
        }
        if (this.state.villaPrice[0]) {
            priceArrayOneMonth.daysPrice = priceOfPerMonth(this.state.villaPrice[0].year, this.state.villaPrice[0].month, this.state.villaPrice[0].daysPrice)
            priceArrayOneMonth.month = this.state.villaPrice[0].month
            priceArrayOneMonth.year = this.state.villaPrice[0].year
        }
        for (let i = 0; i < this.state.villaPrice.length; i++) {
            if (i === 0) {
                priceDaysUpdates.push(priceArrayOneMonth)
            } else {
                priceDaysUpdates.push(this.state.villaPrice[i])
            }
        }

        //  console.log(priceDaysUpdates) // araye gheimat ha 30 ta 30 ta ie mah
        // this.state.resultReservedDates // rozhaie gheire faal
        console.log(this.state.closedDatesHost)

        let finalCost = []
        let finalCostArrays = []
        let finalCostMonth = []
        let finalCostYear = []
        let isset = false

        for (let i = 0; i < priceDaysUpdates.length; i++) { // 2 ta
            for (let j = 0; j < priceDaysUpdates[i].daysPrice.length; j++) { // 30 ta  => dar majmo in halghe 60 bar
                for (let k = 0; k < this.state.closedDatesHost.length; k++) { // agar in halat bod gheire faal
                    let sspliteReservedDays = this.state.closedDatesHost[k].start_date.split("/")
                    if (j + 1 === Number(sspliteReservedDays[2]) && priceDaysUpdates[i].month === Number(sspliteReservedDays[1]) && priceDaysUpdates[i].year === Number(sspliteReservedDays[0])) {
                        finalCostArrays.push("غیر فعال")
                        isset = true
                    }
                }
                for (let m = 0; m < this.state.reservedDatesUsers.length; m++) { // agar in halat bod gheire faal
                    let sspliteReservedDays = this.state.reservedDatesUsers[m].start_date.split("/")
                    if (j + 1 === Number(sspliteReservedDays[2]) && priceDaysUpdates[i].month === Number(sspliteReservedDays[1]) && priceDaysUpdates[i].year === Number(sspliteReservedDays[0])) {
                        finalCostArrays.push("رزرو شده")
                        isset = true
                    }
                }
                if (isset === false) {
                    finalCostArrays.push(priceDaysUpdates[i].daysPrice[j])
                }
                if (isset === true) {
                    isset = false
                }

                if (priceDaysUpdates[i].daysPrice.length === j + 1) {
                    finalCost.push(finalCostArrays)
                    finalCostArrays = []
                    //  console.log(finalCost)
                }

            }
        }

        // console.log(finalCost)

        let finalCosts = []

        for (let i = 0; i < this.state.villaPrice.length; i++) {
            let finalCostObject = {
                daysPrice: '',
                month: '',
                year: ''
            }
            finalCostObject.daysPrice = finalCost[i]
            finalCostObject.month = priceDaysUpdates[i].month
            finalCostObject.year = priceDaysUpdates[i].year
            // console.log(finalCostObject)
            // console.log('ssssssssssssssssssss')
            finalCosts.push(finalCostObject)
        }
        console.log(finalCosts)
        this.setState({finallyPrice: finalCosts})

    }


    getSelectedDays = (selectedDay) => {
        if (selectedDay && selectedDay !== this.state.selectedDays) {
            this.setState({selectedDays: selectedDay})  // فقط برای چک کردن و تکراری نشدن
            this.setState({selectedDaysAll: selectedDay}) // روز های انتخاب شده برای دسکتاپ
        }
    }
    getSelectedDaysmobile = (selectedDay) => {
        if (selectedDay && selectedDay !== this.state.selectedDaysMobile) {
            this.setState({selectedDaysMobile: selectedDay})   // فقط برای چک کردن و تکراری نشدن
            this.setState({selectedDaysAll: selectedDay})// روز های انتخاب شده برای موبایل selectedDay جدید در خود کامپوننت مخصوص تقویم ایجاد میشود همراه با قبلی هایش
        }
    }

    render() {

        let reservedDatesUsers = []
        let closeDatesHost = []
        for (let i = 0; i < this.state.reservedDatesUsers.length; i++) {
            const result = this.state.reservedDatesUsers[i].end_date.split("/")
            let date = {
                year: result[0],
                month: result[1],
                day: result[2],
            }
            reservedDatesUsers.push(date)
        }
        for (let i = 0; i < this.state.closedDatesHost.length; i++) {
            const result = this.state.closedDatesHost[i].end_date.split("/")
            let date = {
                year: result[0],
                month: result[1],
                day: result[2],
            }
            closeDatesHost.push(date)
        }
        // console.log(reservedDatesUsers)

        /*   const priceDaysUpdates = []  /// مورد نظر
           let priceArrayOneMonth ={
               daysPrice: [] ,
               month: '',
               year: ''
           }
           if(this.state.villaPrice[0]){
                priceArrayOneMonth.daysPrice = priceOfPerMonth(this.state.villaPrice[0].year , this.state.villaPrice[0].month , this.state.villaPrice[0].daysPrice)
               priceArrayOneMonth.month=this.state.villaPrice[0].month
               priceArrayOneMonth.year=this.state.villaPrice[0].year
           }
           for(let i = 0 ; i<this.state.villaPrice.length ; i++){
               if(i===0){
                   priceDaysUpdates.push(priceArrayOneMonth)
               }
               else {
                   priceDaysUpdates.push(this.state.villaPrice[i])
               }
           }
         // console.log(priceDaysUpdates) // araye gheimat ha 30 ta 30 ta ie mah
           // this.state.resultReservedDates // rozhaie gheire faal
           let finalCost=[]
           let finalCostArrays = []
           let isset = false
           for (let i = 0 ; i < priceDaysUpdates.length ; i++){ // 2 ta
               for (let j = 0 ; j < priceDaysUpdates[i].daysPrice.length ; j++){ // 30 ta  => dar majmo in halghe 60 bar
                   for (let k = 0 ; k < this.state.resultReservedDates.length ; k ++){ // agar in halat bod gheire faal
                       let sspliteReservedDays =  this.state.resultReservedDates[k].start_date.split("/")
                       if ( j+1 === Number(sspliteReservedDays[2]) &&  priceDaysUpdates[i].month === Number(sspliteReservedDays[1]) &&  priceDaysUpdates[i].year === Number(sspliteReservedDays[0])){
                           finalCostArrays.push("غیر فعال")
                         //  console.log(1)
                           isset = true
                       }
                   }
                   if(isset === false){
                       finalCostArrays.push(priceDaysUpdates[i].daysPrice[j])
                   }
                   if(isset){
                       isset = false
                   }
                   if(priceDaysUpdates[i].daysPrice.length === j+1){
                       finalCost.push(finalCostArrays)
                       finalCostArrays=[]
                   }
               }
           }
           console.log(finalCost) */


        return (
            <div
                className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2 fv-ProfilePageTransaction2 fv-ProfilePageWallet fv-ProfilePageGustComments2 fv-ProfilePageCalender"}>
                <div className={"fv-ProfilePageLeftBody"}>

                    <MDBCol md={8} sm={12}
                            className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo fv-ProfilePageCalenderBody"}>

                        <h5 className={"fv-ProfilePageCalenderTextMobile"}>تقویم من</h5>
                        <MDBRow className={"fv-ProfilePageReservationSetInfo"}>
                            <MDBCol md={4} sm={12} className={""}>
                                <select value={this.state.villasUsertitle} onChange={(e) => {

                                    this.setState({
                                        villasUsertitle: e.target.value,
                                        clickHandlerLoading: true,
                                        clickLoaderCalendar: true
                                    }, () => {
                                        villaPrice(e.target.value)
                                            .then(res => {
                                                if (res.data) {
                                                    this.setState({
                                                        villaPrice: res.data,
                                                        clickHandlerLoading: false,
                                                        clickLoaderCalendar: false,
                                                        finallyPrice: []
                                                    }, () => {
                                                        this.villaReservedDates()
                                                    })
                                                }
                                            })
                                            .catch(err => this.setState({waitingButtonPrice: false}))
                                    })
                                }}>
                                    <option value='title' disabled>نام اقامت گاه</option>
                                    {this.state.villasUser.map(vilauser => {
                                        return <option value={vilauser.id}>{vilauser.title}</option>
                                    })}

                                </select>
                            </MDBCol>
                        </MDBRow>


                        {this.state.villasUser.map(villasUser => {
                            if (Number(villasUser.id) === Number(this.state.villasUsertitle)) {

                                return <MDBRow className={"fv-ProfilePageCalenderImageAndContent"}>
                                    <MDBCol md={2} sm={3}>
                                        <img src={`${config.webapi}/images/villas/thum/${villasUser.main_img}`}/>
                                    </MDBCol>
                                    <MDBCol md={7} sm={7}>
                                        <MDBRow>
                                            <h5>{villasUser.title}</h5>
                                        </MDBRow>
                                        <MDBRow>
                                            <p></p>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow>

                            }
                        })}


                        <MDBRow className={"fv-ProfilePageCalenderSelectContentMobile"}>
                            <MDBCol>
                                <h5 className={"fv-ProfilePageCalenderChoseCommentsText"}>با انتخاب روزهای مورد نظر
                                    تغییر مورد نظر خود را اعمال کنید</h5>
                            </MDBCol>
                        </MDBRow>
                        <MDBContainer className={"fv-profilePageCalenderInnerMobile "}>

                            <MDBRow
                                className={this.state.clickLoaderCalendar ? "fv-ProfilePageCalenderDayName fv-ProfilePageCalenderLoader" : "fv-hideLoader"}>
                                <div className={"loaderAvatar"}>
                                    <svg className="circular" viewBox="25 25 50 50">
                                        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                                stroke-miterlimit="10"/>
                                    </svg>
                                </div>
                            </MDBRow>

                            <MDBRow
                                className={this.state.clickLoaderCalendar ? "fv-hideLoader" : "fv-ProfilePageCalenderDayName"}>


                                <CalendarForProfile
                                    villaPrice={this.state.finallyPrice}
                                    closeDatesHostreserved={closeDatesHost}
                                    reservedDatesUsers={reservedDatesUsers}
                                    getSelectedDay={this.getSelectedDays}/>

                            </MDBRow>

                            <MDBRow className={"fv-ProfilePageCalenderDayReserve"}>
                                <MDBCol md={4}>
                                    <MDBRow>
                                        <p>تغییر وضعیت روزهای انتخاب شده</p>
                                    </MDBRow>
                                    <MDBRow>
                                        <select value={this.state.changeStatusSelectedDays}
                                                onChange={(event) => this.setState({changeStatusSelectedDays: event.target.value}, () => {
                                                    this.calculatePricesWithString()
                                                })}>
                                            <option value='title' disabled>وضعیت</option>
                                            <option value="0">قابل رزرو (فعال)</option>
                                            <option value="1">غیر قابل رزرو(تکمیل)</option>
                                            <option value="2">تعطیل</option>
                                        </select>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol md={7}>
                                    <MDBRow>
                                        <p>تغییر قیمت روزهای انتخاب شده</p>
                                    </MDBRow>
                                    <MDBRow>
                                        <input type="text" placeholder={"تومان"} value={this.state.price}
                                               onChange={(e) => this.setState({price: e.target.value})}/>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-ProfilePageWalletWalletButton"}>
                                <MDBCol md={3} sm={12}
                                        className={"fv-ProfilePageUserSetInfoButton fv-ProfilePageWalletWalletButtonWith"}>
                                    {waitingForCalculate2(this.state.waitingButtonPrice, "fv-waitingLoadPublicFullScreen fv-computingReservedDetails fv-ProfileCalendarWaiting")}
                                    <input
                                        className={this.state.waitingButtonPrice ? "fv-hideForWaiting" : "fv-changePriceCalendar"}
                                        type="button" value="ذخیره قیمت" onClick={() => {
                                        const setDatesArray = []
                                        let setDatesString = ''
                                        for (let i = 0; i < this.state.selectedDaysAll.length; i++) {
                                            setDatesArray.push(`${this.state.selectedDaysAll[i].year}/${this.state.selectedDaysAll[i].month}/${this.state.selectedDaysAll[i].day}`)
                                        }
                                        for (let j = 0; j < setDatesArray.length; j++) {
                                            if (j === 0) {
                                                setDatesString = `${setDatesArray[j]}`
                                            } else {
                                                setDatesString = `${setDatesString},${setDatesArray[j]}`
                                            }
                                        }
                                        const datasForPrice = {             // برای تغییر دادن قیمت میباشد
                                            dates: setDatesString,
                                            special_price: this.state.price
                                        }

                                        if (this.state.price) {                                         // برای تغییر دادن قیمت میباشد
                                            this.setState({waitingButtonPrice: true})
                                            changeDatesCost(datasForPrice, this.state.villasUsertitle)
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        villaPrice(this.state.villasUsertitle)
                                                            .then(res => {
                                                                if (res.data) {
                                                                    this.setState({
                                                                        villaPrice: res.data,
                                                                        waitingButtonPrice: false
                                                                    }, () => {
                                                                        this.villaReservedDates()
                                                                    })
                                                                }
                                                            })
                                                        // /${this.state.villasUsertitle}`
                                                    }
                                                })
                                                .catch(err => this.setState({waitingButtonPrice: false}))
                                        }


                                    }}/>
                                    <input
                                        className={this.state.waitingButtonPrice ? "fv-hideForWaiting" : "fv-changeStateCalendar"}
                                        type="button" value="ذخیره وضعیت" onClick={() => {
                                        const setDatesArray = []
                                        let setDatesString = ''
                                        for (let i = 0; i < this.state.selectedDaysAll.length; i++) {
                                            setDatesArray.push(`${this.state.selectedDaysAll[i].year}/${this.state.selectedDaysAll[i].month}/${this.state.selectedDaysAll[i].day}`)
                                        }
                                        for (let j = 0; j < setDatesArray.length; j++) {
                                            if (j === 0) {
                                                setDatesString = `${setDatesArray[j]}`
                                            } else {
                                                setDatesString = `${setDatesString},${setDatesArray[j]}`
                                            }
                                        }
                                        let datasForStatus = ""

                                        if (Number(this.state.changeStatusSelectedDays) === 0) {
                                            datasForStatus = {             // برای تغییر دادن status میباشد
                                                dates: setDatesString,
                                                special_price: "0000"
                                            }
                                            this.setState({waitingButtonPrice: true})                       // برای تغییر دادن قیمت میباشد
                                            changeDatesCost(datasForStatus, this.state.villasUsertitle)
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        villaPrice(this.state.villasUsertitle)
                                                            .then(res => {
                                                                if (res.data) {
                                                                    this.setState({
                                                                        villaPrice: res.data,
                                                                        waitingButtonPrice: false
                                                                    }, () => {
                                                                        this.villaReservedDates()
                                                                    })
                                                                }
                                                            })
                                                        // /${this.state.villasUsertitle}`
                                                    }
                                                })
                                                .catch(err => this.setState({waitingButtonPrice: false}))

                                        } else {
                                            datasForStatus = {             // برای تغییر دادن status میباشد
                                                dates: setDatesString,
                                                status: this.state.changeStatusSelectedDays
                                            }
                                            if (this.state.changeStatusSelectedDays !== 'title') {           // برای تغییر دادن status میباشد
                                                this.setState({waitingButtonPrice: true})
                                                changeDatesStatus(datasForStatus, this.state.villasUsertitle)
                                                    .then(res => {
                                                        if (res.status === 200) {
                                                            villaPrice(this.state.villasUsertitle)
                                                                .then(res => {
                                                                    if (res.data) {
                                                                        this.setState({
                                                                            villaPrice: res.data,
                                                                            waitingButtonPrice: false
                                                                        }, () => {
                                                                            this.villaReservedDates()
                                                                        })
                                                                    }
                                                                })
                                                            // /${this.state.villasUsertitle}`
                                                        }
                                                    })
                                                    .catch(err => this.setState({waitingButtonPrice: false}))
                                            }
                                        }


                                    }}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>

                        <MDBContainer className={"fv-ProfilePageCalenderMobile"}>


                            {/*
                              <MDBRow className={"fv-ProfilePageReservationSetInfo"}>
                                <MDBCol md={4} sm={12} className={""}>
                                    <select>
                                        <option>
                                            نام اقامت گاه
                                        </option>
                                    </select>
                                </MDBCol>
                                <MDBCol md={2} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                    <input type="button" value="جستجو"/>
                                </MDBCol>
                            </MDBRow>
                            */}

                            {this.state.villasUser.map(villasUser => {
                                if (Number(villasUser.id) === Number(this.state.villasUsertitle)) {

                                    return <MDBRow className={"fv-ProfilePageCalenderImageAndContentMobile"}>
                                        <MDBCol md={2} sm={3}>
                                            <img src={`${config.webapi}/images/villas/thum/${villasUser.main_img}`}/>
                                        </MDBCol>
                                        <MDBCol md={7} sm={7}>
                                            <MDBRow>
                                                <h5>{villasUser.title}</h5>
                                            </MDBRow>
                                            <MDBRow>
                                                <p></p>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>

                                }
                            })}


                            <MDBRow
                                className={this.state.clickLoaderCalendar ? "fv-ProfilePageCalenderDayName fv-ProfilePageCalenderLoader" : "fv-hideLoader"}>
                                <div className={"loaderAvatar"}>
                                    <svg className="circular" viewBox="25 25 50 50">
                                        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                                stroke-miterlimit="10"/>
                                    </svg>
                                </div>
                            </MDBRow>

                            <MDBRow
                                className={'fv-profilePageCalenderForMobile'}>                  {/*    calender-calendar     */}
                                <MDBCol>
                                    <CalenderProfileMobile
                                        villaPrice={this.state.finallyPrice}
                                        closeDatesHostreserved={closeDatesHost}
                                        reservedDatesUsers={reservedDatesUsers}
                                        getSelectedDay={this.getSelectedDaysmobile}/>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className={"fv-ProfilePageCalenderDayReserve"}>
                                <MDBCol sm={12}>
                                    <MDBRow>
                                        <MDBCol>
                                            <p>تغییر وضعیت روزهای انتخاب شده</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol>
                                            <select value={this.state.changeStatusSelectedDays}
                                                    onChange={(event) => this.setState({changeStatusSelectedDays: event.target.value}, () => {
                                                        this.calculatePricesWithString()
                                                    })}>
                                                <option value='title' disabled>وضعیت</option>
                                                <option value="0">قابل رزرو (فعال)</option>
                                                <option value="1">غیر قابل رزرو(تکمیل)</option>
                                                <option value="2">تعطیل</option>
                                            </select>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol sm={12}>
                                    <MDBRow>
                                        <MDBCol>
                                            <p>تغییر وضعیت روزهای انتخاب شده</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol>
                                            <input type="text" placeholder={"تومان"} value={this.state.price}
                                                   onChange={(e) => this.setState({price: e.target.value})}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                {/*   <MDBCol sm={12}>
                                    <MDBRow>
                                        <MDBCol>
                                            <p>تغییر وضعیت روزهای انتخاب شده</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className={"fv-profilePageCalenderTextareaMobile"}>
                                        <MDBCol>
                                            <input type="textarea" placeholder={'تغییر وضعیت روزهای انتخاب شده'}/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>  */}
                            </MDBRow>
                            <MDBRow className={"fv-ProfilePageWalletWalletButton"}>
                                <MDBCol md={3} sm={6}
                                        className={"fv-ProfilePageUserSetInfoButton fv-ProfilePageWalletWalletButtonWith"}>
                                    {waitingForCalculate2(this.state.waitingButtonPrice, "fv-waitingLoadPublicFullScreen fv-computingReservedDetails fv-ProfileCalendarWaiting")}
                                    <input
                                        className={this.state.waitingButtonPrice ? "fv-hideForWaiting" : "fv-changePriceCalendar"}
                                        type="button" value="ذخیره قیمت" onClick={() => {
                                        const setDatesArray = []
                                        let setDatesString = ''
                                        for (let i = 0; i < this.state.selectedDaysAll.length; i++) {
                                            setDatesArray.push(`${this.state.selectedDaysAll[i].year}/${this.state.selectedDaysAll[i].month}/${this.state.selectedDaysAll[i].day}`)
                                        }
                                        for (let j = 0; j < setDatesArray.length; j++) {
                                            if (j === 0) {
                                                setDatesString = `${setDatesArray[j]}`
                                            } else {
                                                setDatesString = `${setDatesString},${setDatesArray[j]}`
                                            }
                                        }
                                        const datasForPrice = {             // برای تغییر دادن قیمت میباشد
                                            dates: setDatesString,
                                            special_price: this.state.price
                                        }

                                        if (this.state.price) {                                         // برای تغییر دادن قیمت میباشد
                                            this.setState({waitingButtonPrice: true})
                                            changeDatesCost(datasForPrice, this.state.villasUsertitle)
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        villaPrice(this.state.villasUsertitle)
                                                            .then(res => {
                                                                if (res.data) {
                                                                    this.setState({
                                                                        villaPrice: res.data,
                                                                        waitingButtonPrice: false
                                                                    }, () => {
                                                                        this.villaReservedDates()
                                                                    })
                                                                }
                                                            })
                                                        // /${this.state.villasUsertitle}`
                                                    }
                                                })
                                                .catch(err => this.setState({waitingButtonPrice: false}))
                                        }


                                    }}/>
                                </MDBCol>
                                <MDBCol md={3} sm={6}
                                        className={"fv-ProfilePageUserSetInfoButton fv-ProfilePageWalletWalletButtonWith"}>
                                    <input
                                        className={this.state.waitingButtonPrice ? "fv-hideForWaiting" : "fv-changeStateCalendar"}
                                        type="button" value="ذخیره وضعیت" onClick={() => {
                                        const setDatesArray = []
                                        let setDatesString = ''
                                        for (let i = 0; i < this.state.selectedDaysAll.length; i++) {
                                            setDatesArray.push(`${this.state.selectedDaysAll[i].year}/${this.state.selectedDaysAll[i].month}/${this.state.selectedDaysAll[i].day}`)
                                        }
                                        for (let j = 0; j < setDatesArray.length; j++) {
                                            if (j === 0) {
                                                setDatesString = `${setDatesArray[j]}`
                                            } else {
                                                setDatesString = `${setDatesString},${setDatesArray[j]}`
                                            }
                                        }

                                        let datasForStatus = ""

                                        if (Number(this.state.changeStatusSelectedDays) === 0) {
                                            datasForStatus = {             // برای تغییر دادن status میباشد
                                                dates: setDatesString,
                                                special_price: "0000"
                                            }
                                            this.setState({waitingButtonPrice: true})
                                            // برای تغییر دادن قیمت میباشد
                                            changeDatesCost(datasForStatus, this.state.villasUsertitle)
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        villaPrice(this.state.villasUsertitle)
                                                            .then(res => {
                                                                if (res.data) {
                                                                    this.setState({villaPrice: res.data}, () => {
                                                                        this.villaReservedDates()
                                                                    })
                                                                }
                                                            })
                                                        // /${this.state.villasUsertitle}`
                                                    }
                                                })
                                                .catch(err => this.setState({waitingButtonPrice: false}))

                                        } else {
                                            datasForStatus = {             // برای تغییر دادن status میباشد
                                                dates: setDatesString,
                                                status: this.state.changeStatusSelectedDays
                                            }
                                            if (this.state.changeStatusSelectedDays !== 'title') {           // برای تغییر دادن status میباشد
                                                this.setState({waitingButtonPrice: true})
                                                changeDatesStatus(datasForStatus, this.state.villasUsertitle)
                                                    .then(res => {
                                                        if (res.status === 200) {
                                                            villaPrice(this.state.villasUsertitle)
                                                                .then(res => {
                                                                    if (res.data) {
                                                                        this.setState({villaPrice: res.data}, () => {
                                                                            this.villaReservedDates()
                                                                        })
                                                                    }
                                                                })
                                                            // /${this.state.villasUsertitle}`
                                                        }
                                                    })
                                                    .catch(err => this.setState({waitingButtonPrice: false}))
                                            }
                                        }


                                    }}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>

                    </MDBCol>

                </div>


            </div>
        )
    }
}

export default ProfilePageCalender