import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageReservation.scss"
import "../style/ProfilePageWallet.scss"
import WalletPic1 from "../images/03.png"
import WalletPic2 from "../images/02.png"
import WalletPic3 from "../images/01.png"
import {
    deleteFinancialReport,
    financialReportsSearch,
    getFinancialReports,
    userVillas,
    villaIncome
} from "../services/userService";
import CalendarLinear from "../data/CalenddarLinear";
import {Waiting, WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

const commaNumber = require('comma-number')

class ProfilePageWallet extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            getFinancialReportsTopPage: [],
            getFinancialReports: [],
            villasUser: [],
            villasUsertitle: '',
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
            FinancialReportDeleteId: '',
            switchPage: '',
            waitingForLoad: true,
            waitingForSearch: false,
            onClickTrash: false,
            clickYesSureTrashButton: false,
            isEmpty: false,

        }
    }

    //villasUsertitle:'title'   bod,
    componentDidMount() {
        if (this.props.location) { // اگر از طریق صفحه اقامتگاه های من آمده بود باید سرچ شود و فقط آن هایی که با این اسم هستند را نمایش دهد
            if (this.props.location.sourceTitle) {

                const data = {
                    villa_title: this.props.location.sourceTitle.title,
                    start_date: '',
                    end_date: '',
                }
                financialReportsSearch(data)
                    .then(res => { // برای سرچ یک اقامتگاه با اسم اقامتگاه
                        if (res.data.data.length > 0) {
                            let getFinancialReportsTop = []
                            getFinancialReportsTop.push(res.data.income)
                            console.log(res)
                            this.setState({
                                getFinancialReports: res.data.data,
                                getFinancialReportsTopPage: getFinancialReportsTop,
                                waitingForLoad: false,
                                villasUsertitle: this.props.location.sourceTitle.title // نام اقامتگاه را نام این قررار بده
                            })
                        } else {
                            // this.setState({pushPage:"empty"})
                            this.props.history.push("/MainProfilePages/AnotherPagesEmpty")
                        }
                    })
                    .catch(err => {
                        this.setState({waitingForSearch: false})
                        console.log(err.response)
                    })

            } else { // اگر از صفحه اقامتگاه های من به اینجا نیامده بود (حالت عادی بدون سرچ) همه اطلاعات را نمایش بده
                this.getFinancialReports()
            }
        }

        //   this.villaIncome()
        userVillas()
            .then(res => {
                if (res.data.data)
                    this.setState({villasUser: res.data.data})
            })

    }

    getFinancialReports = () => {
        getFinancialReports()
            .then(res => {
                // if (res.data.income.otherIncome + res.data.income.totalIncome + res.data.income.trappIncome > 0 || res.data.data.length > 0) {
                let getFinancialReportsTop = []
                getFinancialReportsTop.push(res.data.income)
                console.log(res)
                this.setState({
                    getFinancialReports: res.data.data,
                    getFinancialReportsTopPage: getFinancialReportsTop,
                    waitingForLoad: false
                })
                if (res.data.data.length <= 0) {
                    this.setState({isEmpty: true})
                }
                /* } else {
                     // this.setState({pushPage:"empty"})
                     this.props.history.push("/MainProfilePages/AnotherPagesEmpty")
                 } */
            })
            .catch(err => console.log(err.response))
    }
    villaIncome = () => {
        villaIncome(24)
            .then(res => console.log(res))
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

    render() {
        return (
            <>

                {this.state.waitingForLoad ? WaitingLoadingProfilePage(this.state.waitingForLoad, "fv-waitingLoadPublicFullScreen")
                    :
                    <MDBContainer
                        className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2 fv-ProfilePageTransaction fv-ProfilePageTransaction2 fv-ProfilePageWallet fv-profileWalletInner"}>
                        <div className={"fv-ProfilePageLeftBody"}>
                            <MDBCol md={8} sm={12}
                                    className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                                <MDBRow
                                    className={this.state.onClickTrash ? 'fv-blurAllPage fv-ProfilePageReservationSetInfo' : "fv-ProfilePageReservationSetInfo"}>
                                    <MDBCol md={4} sm={12} className={""}>

                                        <select className={"fv-accommodationsSelectOptionInSearch"}
                                                value={this.state.villasUsertitle}
                                                onChange={(e) => {
                                                    this.setState({villasUsertitle: e.target.value})
                                                }}>
                                            <option value='title'>نام اقامت گاه</option>
                                            {this.state.villasUser.map(vilauser => {
                                                return <option value={vilauser.title}>{vilauser.title}</option>
                                            })}
                                        </select>


                                        {/*
                                             <select value={this.state.villasUsertitle} onChange={(e)=>{
                                                this.setState({villasUsertitle:e.target.value})
                                            }}>
                                                <option value='title' disabled>نام اقامتگاه را وارد کنید</option>
                                                {this.state.villasUser.map(vilauser=>{
                                                    return  <option value={vilauser.title}>{vilauser.title}</option>
                                                })}

                                            </select>
                                            */}
                                    </MDBCol>
                                    <MDBCol md={2} sm={5} className={"fv-ProfilePageReservationRightCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDayToGo} text={'از تاریخ'}/>
                                    </MDBCol>
                                    <MDBCol md={2} sm={5} className={"fv-ProfilePageReservationLeftCalendar"}>
                                        <CalendarLinear dayToReturn={this.selectDayToReturn} text={'تا تاریخ'}/>
                                    </MDBCol>
                                    <MDBCol md={2} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                        <input type="button" disabled={this.state.onClickTrash ? true : false}
                                               value="جستجو" onClick={() => {
                                            this.setState({waitingForSearch: true})
                                            let setTitle = ''
                                            let setDateToGo = ''
                                            let setDateToreturn = ''
                                            if (this.state.villasUsertitle === "title") {
                                                setTitle = ''
                                            } else {
                                                setTitle = this.state.villasUsertitle
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
                                                villa_title: this.state.villasUsertitle,
                                                start_date: setDateToGo,
                                                end_date: setDateToreturn,
                                            }
                                            console.log(data)
                                            financialReportsSearch(data)
                                                .then(res => {
                                                    console.log(res)
                                                    let getFinancialReportsTop = []
                                                    getFinancialReportsTop.push(res.data.income)
                                                    this.setState({
                                                        getFinancialReports: res.data.data,
                                                        getFinancialReportsTopPage: getFinancialReportsTop,
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

                                {this.state.getFinancialReportsTopPage.map(getFinancialReportsTopPages => {
                                    return <MDBRow
                                        className={this.state.onClickTrash ? 'fv-blurAllPage fv-ProfilePageWalletWalletImage' : "fv-ProfilePageWalletWalletImage"}>
                                        <MDBCol md={4} sm={4} className={"fv-ProfilePageWalletWalletImageMobile"}>
                                            <MDBRow className={"fv-ProfilePageWalletWalletImageP"}>
                                                <MDBCol md={12}>
                                                    <h6>در آمد شما از ترپ</h6>
                                                </MDBCol>
                                                <MDBCol md={12}>
                                                    <h6>{commaNumber(getFinancialReportsTopPages.trappIncome)} تومان</h6>
                                                </MDBCol>
                                            </MDBRow>
                                            <img src={WalletPic1}/>
                                        </MDBCol>
                                        <MDBCol md={4} sm={4} className={"fv-ProfilePageWalletWalletImageMobile"}>
                                            <MDBRow className={"fv-ProfilePageWalletWalletImageP"}>
                                                <MDBCol md={12}
                                                        className={"fv-ProfilePageWalletWalletImagePWhiteColor"}>
                                                    <h6>در آمد شما از سایر منابع</h6>
                                                </MDBCol>
                                                <MDBCol md={12}>
                                                    <h6>{commaNumber(getFinancialReportsTopPages.otherIncome)} تومان</h6>
                                                </MDBCol>
                                            </MDBRow>
                                            <img src={WalletPic2}/>
                                        </MDBCol>
                                        <MDBCol md={4} sm={4} className={"fv-ProfilePageWalletWalletImageMobile"}>
                                            <MDBRow
                                                className={"fv-ProfilePageWalletWalletImageP fv-ProfilePageWalletWalletImagePWhiteColor"}>
                                                <MDBCol md={12}>
                                                    <h6>کل درآمد شما از اجاره ویلا</h6>
                                                </MDBCol>
                                                <MDBCol md={12}>
                                                    <h6>{commaNumber(getFinancialReportsTopPages.totalIncome)} تومان</h6>
                                                </MDBCol>
                                            </MDBRow>
                                            <img src={WalletPic3}/>
                                        </MDBCol>
                                    </MDBRow>
                                })}

                                {this.state.waitingForSearch ? WaitingLoadingProfilePage(this.state.waitingForSearch, "fv-waitingLoadPublicFullScreen fv-waitingForSearchReservation") : ""}
                                {!this.state.waitingForSearch ?
                                    <>
                                        <MDBRow className={this.state.onClickTrash ? 'fv-blurAllPage' : ''}>
                                            <MDBCol>
                                                <h5>ریز گزارشات مالی</h5>
                                            </MDBCol>
                                        </MDBRow>


                                        <MDBContainer
                                            className={this.state.onClickTrash ? 'fv-areYouSureDeleteFinancial' : "fv-areYouSureDeleteFinancialHide"}>
                                            <MDBRow className={"fv-areYouSureDeleteFinancialTitle"}>
                                                <MDBCol>
                                                    <p className={"h7"}>حذف تراکنش</p>
                                                </MDBCol>
                                            </MDBRow>

                                            <div>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <h6>آیا از حذف تراکنش مورد نظر مطمئن هستید؟</h6>
                                                    </MDBCol>
                                                </MDBRow>

                                                <MDBRow>
                                                    {this.state.clickYesSureTrashButton ? // waiting baraie zadane yes dar hazf tarakonesh
                                                        <MDBCol style={{textAlign: 'center'}} sm={12} md={12}>
                                                            {Waiting(true, "")}
                                                        </MDBCol>
                                                        :
                                                        <>
                                                            <MDBCol className={"fv-SureButton"}>
                                                                <input type={"button"} value={"بله"} onClick={() => {
                                                                    this.setState({clickYesSureTrashButton: true})
                                                                    deleteFinancialReport(this.state.FinancialReportDeleteId)
                                                                        .then(res => {
                                                                            console.log(res)
                                                                            this.getFinancialReports()
                                                                            this.setState({
                                                                                onClickTrash: false,
                                                                                clickYesSureTrashButton: false
                                                                            })
                                                                            alert("تراکنش مورد نظر شما با موفقیت حذف شد")
                                                                        })
                                                                        .catch(err => console.log(err.response))
                                                                }}/>
                                                            </MDBCol>
                                                            <MDBCol className={"fv-notSureButton"}>
                                                                <input type={"button"} value={"خیر"} onClick={() => {
                                                                    this.setState({
                                                                        onClickTrash: false,
                                                                    })
                                                                }}/>
                                                            </MDBCol>
                                                        </>
                                                    }

                                                </MDBRow>
                                            </div>
                                        </MDBContainer>

                                        <table className={this.state.onClickTrash ? 'fv-blurAllPage' : ''}>
                                            <tr className={"fv-tableTitle"}>
                                                <th><h6>تاریخ تراکنش</h6></th>
                                                <th><h6>منبع تراکنش</h6></th>
                                                <th className={"fv-tableDiscriptions"}><h6>شرح تراکنش</h6></th>
                                                <th><h6>مبلغ</h6></th>
                                                {this.state.isEmpty ? '' : <th></th>}

                                            </tr>
                                            {this.state.getFinancialReports.map(getFinancialReport => {
                                                return <tr>
                                                    <td>{getFinancialReport.date}</td>
                                                    <td>{getFinancialReport.src}</td>
                                                    <td>{getFinancialReport.description}</td>
                                                    <td>{commaNumber(getFinancialReport.amount)}</td>
                                                    <td className={"fv-getFinancialReportsDeleteAndEditColumn"}><a
                                                        onClick={() => {
                                                            if (this.state.onClickTrash === false) {
                                                                this.props.history.push(`/MainProfilePages/ProfilePageWalletEdit/${getFinancialReport.id}`)
                                                            }
                                                        }}><i
                                                        style={{fontSize: '20px', marginRight: '-8%'}}
                                                        className="fas fa-edit"/></a>
                                                        <a onClick={() => {
                                                            if (this.state.onClickTrash === false) {
                                                                this.setState({
                                                                    onClickTrash: true,
                                                                    FinancialReportDeleteId: getFinancialReport.id
                                                                })
                                                            }
                                                        }}><i style={{fontSize: '20px', marginRight: '31%'}}
                                                              className="fa fa-trash"/></a></td>
                                                </tr>
                                            })}

                                        </table>
                                        {this.state.isEmpty ?
                                            <MDBRow style={{placeContent: 'center'}}>
                                                <p>تراکنشی ثبت نشده</p>
                                            </MDBRow>
                                            : ''
                                        }

                                        <MDBRow
                                            className={this.state.onClickTrash ? 'fv-blurAllPage fv-ProfilePageWalletWalletButton' : "fv-ProfilePageWalletWalletButton"}>
                                            <MDBCol md={3} sm={12}
                                                    className={"fv-ProfilePageUserSetInfoButton fv-ProfilePageWalletWalletButtonWith"}>
                                                <input type="button" disabled={this.state.onClickTrash ? true : false}
                                                       value="ثبت تراکنش جدید" onClick={() => {
                                                    // this.setState({switchPage:'ProfileWalletTransactionRegistration'})
                                                    this.props.history.push('/MainProfilePages/ProfileWalletTransactionRegistration')
                                                }}/>
                                            </MDBCol>
                                        </MDBRow>
                                    </>
                                    : ''}
                            </MDBCol>

                        </div>
                    </MDBContainer>

                }
            </>
        )
    }
}

export default ProfilePageWallet