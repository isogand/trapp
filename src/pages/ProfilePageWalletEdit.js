import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePage.scss"
import "../style/ProfilePageWallet2.scss"
import CalendarLinear from "../data/CalenddarLinear";
import {getFinancialReport, updateFinancialReport, userVillas} from "../services/userService";
import {waitingForCalculate} from "../componentsPages/WaitingLoad";

class ProfilePageWalletEdit extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            sourceOfTransaction: 'title',
            villaId: '',
            transactionAmount: '',
            transactionDescription: '',
            villasUser: [],
            financialDate: '',

            date: {
                day: 1400,
                month: '',
                year: ''
            },

            validTransactionAmount: false,
            waitingButton: false,

        }
    }

    componentDidMount() {
        getFinancialReport(this.props.match.params.id)
            .then(res => {
                console.log(res)
                let date = res.data.data.date.split("/")
                this.setState({
                    transactionAmount: res.data.data.amount,
                    financialDate: {dayToGo: res.data.data.date},
                    sourceOfTransaction: res.data.data.src,
                    transactionDescription: res.data.data.description,
                    villaId: Number(res.data.data.villa_id),
                    date: {
                        day: date[2],
                        month: date[1],
                        year: date[0],
                    },
                })

            })
    }

    componentWillMount() {

        userVillas()
            .then(res => {
                if (res.data.data)
                    this.setState({villasUser: res.data.data})
            })
    }

    selectDay = (date) => {                                    // set date to go
        if (date) {
            this.setState(prevstate => ({
                date: {
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

    selectDay = (date) => {                                    // set date to go
        console.log(date)
        if (date) {
            this.setState({
                financialDate: `${date.year}/${date.month}/${date.day}`,
                date: {
                    day: date.day,
                    month: date.month,
                    year: date.year,
                },
            })
        }
    }
    onChange = (e) => {
        const re = /^[0-9\b]+$/;
        let mystring = e.target.value.replace('تومان  ', '');
        const val = mystring.replace(/,/g, "")

        if (val === '' || re.test(val)) {
            this.setState({[e.target.name]: val})
        }
    }

    render() {
        let tomanText = "تومان  "
        return (
            <div
                className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageTransaction fv-ProfilePageTransaction2 fv-ProfilePageWallet fv-ProfilePageWallet2"}>

                <div className={"fv-ProfilePageLeftBody"}>

                    <MDBCol md={8} sm={12} className={"fv-ProfilePageUserSetInfo"}>
                        <p className={"h7"}>منبع تراکنش</p>

                        <select className={"fv-accommodationOption"} value={this.state.villaId}
                                onChange={(e) => {
                                    this.setState({villaId: e.target.value, waitingButton: true}, () => {
                                        userVillas()
                                            .then(res => {
                                                if (res.data.data) {
                                                    res.data.data.map(data => {
                                                        if (data.id === Number(this.state.villaId)) {
                                                            this.setState({
                                                                sourceOfTransaction: data.title,
                                                                waitingButton: false
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                            .catch(err => {
                                                this.setState({waitingButton: false})
                                            })
                                    })
                                }}>
                            <option
                                value={this.state.villaId}>{this.state.sourceOfTransaction !== "title" ? this.state.sourceOfTransaction : ''}</option>
                            {this.state.villasUser.map(vilauser => {
                                return <option value={vilauser.id}>{vilauser.title}</option>
                            })}
                        </select>


                        <p className={"h7"}>مبلغ تراکنش</p>
                        <input
                            name={'transactionAmount'}
                            style={{direction: 'initial', paddingLeft: '3%'}}
                            value={this.state.transactionAmount ? `${tomanText}${this.state.transactionAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                            onChange={this.onChange} placeholder="تومان"/>

                        <p className={"h7"}>تاریخ تراکنش</p>

                        {this.state.financialDate ?
                            <div className={"fv-calendarInProfilePageWallet2"}><CalendarLinear dayToGo={this.selectDay}
                                                                                               searchData={this.state.financialDate}
                                                                                               text={'انتخاب روز'}/>
                            </div>
                            : ''
                        }

                        <p className={"h7"}>شرح تراکنش</p>
                        <MDBRow className={"fv-ProfilePageWallet2TextArea"}>
                            <MDBCol>
                                <textarea value={this.state.transactionDescription}
                                          onChange={(event) => {
                                              this.setState({transactionDescription: event.target.value})
                                          }}>
                                </textarea>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md={12} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                {waitingForCalculate(this.state.waitingButton, "fv-waitingButtonWalletPage")}
                                <input type="button" value="بروزرسانی تراکنش"
                                       className={this.state.waitingButton ? "fv-hideForWaiting" : ""} onClick={() => {
                                    this.setState({waitingButton: true})
                                    const setDate = this.state.date.year + "/" + this.state.date.month + "/" + this.state.date.day
                                    let src = ""
                                    let villaId = ""
                                    if (this.state.sourceOfTransaction !== "title") {
                                        src = this.state.sourceOfTransaction
                                        villaId = this.state.villaId
                                    }
                                    const data = {
                                        date: setDate,
                                        src: src,
                                        villa_id: villaId,
                                        description: this.state.transactionDescription,
                                        amount: this.state.transactionAmount,
                                    }
                                    console.log(data)
                                    updateFinancialReport(data, this.props.match.params.id)
                                        .then(res => {
                                            console.log(res)
                                            if (res.status) {
                                                alert("تراکنش شما با موفقیت بروزرسانی شد")
                                                this.props.history.push('/MainProfilePages/ProfileWallet')
                                                this.setState({waitingButton: false})
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err.response)
                                            this.setState({waitingButton: false})
                                            if (err.response.data) {
                                                if (err.response.data.errors)
                                                    if (err.response.data.errors.amount)
                                                        alert(err.response.data.errors.amount[0])
                                            }
                                            if (err.response.data) {
                                                if (err.response.data.errors)
                                                    if (err.response.data.errors.src)
                                                        alert(err.response.data.errors.src[0])
                                            }
                                            if (err.response.data) {
                                                if (err.response.data.errors)
                                                    if (err.response.data.errors.date)
                                                        alert(err.response.data.errors.date[0])
                                            }
                                            // console.log(err.response)
                                        })
                                }}/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </div>


            </div>
        )
    }
}

export default ProfilePageWalletEdit