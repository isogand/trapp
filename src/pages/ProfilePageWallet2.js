import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePage.scss"
import "../style/ProfilePageWallet2.scss"
import CalendarLinear from "../data/CalenddarLinear";
import {setFinancialReports, userVillas} from "../services/userService";
import {waitingForCalculate} from "../componentsPages/WaitingLoad";
import {FormControl, InputGroup} from "react-bootstrap";

class ProfilePageWallet2 extends Component {
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

            date: {
                day: 1400,
                month: '',
                year: ''
            },

            validTransactionAmount: false,
            waitingButton: false,

        }
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
        // console.log(this.state.sourceOfTransaction)
        return (
            <div
                className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageTransaction fv-ProfilePageTransaction2 fv-ProfilePageWallet fv-ProfilePageWallet2"}>

                <div className={"fv-ProfilePageLeftBody"}>

                    <MDBCol md={8} sm={12} className={"fv-ProfilePageUserSetInfo"}>
                        <p className={"h7"}>منبع تراکنش</p>

                        <select className={"fv-accommodationOption"} value={this.state.villaId}
                                onChange={(e) => {
                                    this.setState({villaId: e.target.value}, () => {
                                        userVillas()
                                            .then(res => {
                                                if (res.data.data) {
                                                    res.data.data.map(data => {
                                                        if (data.id === Number(this.state.villaId)) {
                                                            this.setState({sourceOfTransaction: data.title})
                                                        }
                                                    })
                                                }
                                            })
                                    })
                                }}>
                            <option value='title'>نام اقامت گاه</option>
                            {this.state.villasUser.map(vilauser => {
                                return <option value={vilauser.id}>{vilauser.title}</option>
                            })}
                        </select>

                        <p className={"h7"}>مبلغ تراکنش</p>

                        <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                            <InputGroup.Text id="basic-addon1">تومان</InputGroup.Text>
                            <FormControl
                                name={'transactionAmount'}
                                style={{direction: 'initial', paddingLeft: '3%'}}
                                value={this.state.transactionAmount ? `${tomanText}${this.state.transactionAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                onChange={this.onChange}
                            />
                        </InputGroup>

                        <p className={"h7"}>تاریخ تراکنش</p>

                        <div className={"fv-calendarInProfilePageWallet2"}><CalendarLinear dayToGo={this.selectDay}
                                                                                           text={'انتخاب روز'}/></div>
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
                                <input type="button" value="ذخیره تراکنش"
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
                                    setFinancialReports(data)
                                        .then(res => {
                                            if (res.status) {
                                                alert("تراکنش شما با موفقیت ثبت گردید")
                                                this.props.history.push('/MainProfilePages/ProfileWallet')
                                                this.setState({waitingButton: false})
                                            }
                                        })
                                        .catch(err => {
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

export default ProfilePageWallet2