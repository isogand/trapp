import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageTransaction2.scss"
import {transactionsSearch, userTransactions} from "../services/userService";
import "../style/scroolBodyProfilePages.scss"
import CalendarLinear from "../data/CalenddarLinear";
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

const commaNumber = require('comma-number')

class ProfilePageTransaction2 extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            transactionDatas: [],
            transactionPrice: '',
            date: {
                day: '',
                month: '',
                year: ''
            },
            waitingForLoad: true,
            waitingForSearch: false,
        }

    }

    componentDidMount() {
        this.transactionDatas()
    }

    transactionDatas = () => {

        userTransactions()
            .then(res => {
                console.log(res)
                if (res.status === 200 && res.data.data.length > 0) {
                    this.setState({transactionDatas: res.data.data, waitingForLoad: false})
                } else {
                    this.props.history.push("/MainProfilePages/ProfilePageTransactionEmpty")
                }
            })
            .catch(err => console.log(err.response))
    }

    selectDay = (date) => {                               // set date to return
        if (date) {
            this.setState(prevState => ({
                date: {
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
    onChange = (e) => {
        const re = /^[0-9\b]+$/;
        const val = e.target.value.replace(/,/g, "")
        if (val === '' || re.test(val)) {
            this.setState({[e.target.name]: val})
        }
    }

    render() {
        console.log(this.state.transactionDatas)
        return (
            <>

                {this.state.waitingForLoad ? WaitingLoadingProfilePage(this.state.waitingForLoad, "fv-waitingLoadPublicFullScreen")
                    :
                    <MDBContainer
                        className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2 fv-ProfilePageTransaction fv-ProfilePageTransaction2"}>

                        <div className={"fv-ProfilePageLeftBody"}>


                            <MDBCol md={8} sm={12}
                                    className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                                <h6>تراکنش های من</h6>
                                <MDBRow
                                    className={"fv-ProfilePageReservationSetInfo fv-ProfilePageTransaction2HeaderForMobile"}>


                                    <MDBCol md={3} sm={12} className={""}>
                                        <input type="text" placeholder="مبلغ تراکنش" name={'transactionPrice'}
                                               value={this.state.transactionPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                               onChange={(e) => this.onChange(e)}/>
                                    </MDBCol>
                                    <MDBCol md={2} sm={12} className={"fv-ProfilePageReservationRightCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDay} text={'تاریخ تراکنش'}/>
                                    </MDBCol>
                                    <MDBCol md={3} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                        <input type="button" value="جستجو" onClick={() => {
                                            this.setState({waitingForSearch: true})
                                            let date = ''
                                            if (this.state.date.year) {
                                                date = this.state.date.year + "/" + this.state.date.month + "/" + this.state.date.day
                                            } else {
                                                date = ''
                                            }
                                            const data = {
                                                transaction_date: date,
                                                transaction_cost: this.state.transactionPrice,
                                            }
                                            console.log(data)
                                            transactionsSearch(data)
                                                .then(res => {
                                                    console.log(res.data.data)
                                                    this.setState({
                                                        transactionDatas: res.data.data,
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

                                    <table>
                                        <tr className={"fv-tableTitle"}>
                                            <th className={"fv-tableTitleRightOne"}><h6>نوع تراکنش</h6></th>
                                            <th><h6>تاریخ تراکنش</h6></th>
                                            <th><h6>مبلغ</h6></th>
                                            <th className={"fv-tableTitleContents"}><h6>شرح تراکنش</h6></th>
                                            <th className={"fv-tableTitleLeftOne"}><h6>وضعیت</h6></th>
                                        </tr>
                                        {this.state.transactionDatas.map(transactionData => {
                                            return (
                                                <tr>
                                                    <td>{transactionData.type}</td>
                                                    <td>{transactionData.date}</td>
                                                    <td>{commaNumber(transactionData.amount)}</td>
                                                    <td>{transactionData.description}</td>
                                                    <td className={transactionData.status === "پرداخت شد" ? "fv-test" : ''}>{transactionData.status}</td>
                                                </tr>
                                            )
                                        })}

                                    </table>

                                    : ''}


                            </MDBCol>
                        </div>

                    </MDBContainer>
                }
            </>
        )
    }
}

export default ProfilePageTransaction2