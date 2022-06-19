import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Footer from "../componentsPages/footer"
import Logo from "../images/Logo.png";
import "../style/FactorPage.scss"
import {factor, requestPay} from "../services/payService";
import {getUserStock} from "../services/userService";
import config from "../services/config.json";
import {Waiting, WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";
import DisplayHeader from "../componentsPages/DisplayHeader";

const commaNumber = require('comma-number')

class FactorPage extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            factorInfo: [],
            villaInfo: [],
            statusPay: 'direct',
            statusWallet: true,
            stock: '',

            waitingLoadingPage: true,
            clickLoaderButton: false,


        }
        this.onValChange = this.onValChange.bind(this);
    }

    componentDidMount() {
        this.factor()

        getUserStock()
            .then(res => {
                this.setState({stock: res.data.data})
            })
            .catch(err => console.log(err.response))

    }

    factor = () => {
        factor(this.props.match.params.id)
            .then(res => {
                console.log(res)
                this.setState({factorInfo: res.data.data, villaInfo: res.data.data.villa, waitingLoadingPage: false})
            })
            .catch(err => console.log(err.response))
    }


    onValChange = (event) => {
        this.setState({
            statusPay: event.target.value,
            statusWallet: true
        });
    }
    walletVerify = (event) => {
        this.setState({
            statusPay: event.target.value
        });
        if (Number(this.state.stock) < Number(this.state.factorInfo.cost)) { // mojodi kamtaraz gheimate factor bod
            this.setState({
                statusWallet: false,
            });
        }
    }


    render() {
        return (
            <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-FactorPage"}>
                {/*  <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>
                    <HeaderSearch  {...this.props}
                                   thisPageName = "فاکتور" />
                </MDBContainer> */}

                <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>
                    <DisplayHeader  {...this.props}/>
                </MDBContainer>

                {this.state.waitingLoadingPage ? WaitingLoadingProfilePage(this.state.waitingLoadingPage, "fv-waitingLoadPublicFullScreen") :


                    <>
                        <MDBRow className={"fv-ProfilePageLeftBody desktop"}>

                            <MDBCol md={3} className={"fv-factorPageRightInfo"}>
                                <h5 style={{marginBottom: '5%', color: '#3EC886'}}
                                    className={"fv-factorPageRightInfoRightPaddingTitle"}>{this.state.villaInfo.title}</h5>
                                <MDBRow>
                                    <MDBCol md={6}>
                                        <h6 className={"fv-factorPageRightInfoRightPaddingTitle2"}>{this.state.villaInfo.city}</h6>
                                    </MDBCol>
                                    {this.state.villaInfo.score ?
                                        <MDBCol md={3} className={"fv-factorPageRightRate"}>
                                            <i className="fas fa-star fv-factorPageRightRateStar"/>
                                            <p>{this.state.villaInfo.score}</p> <p
                                            className={"fv-factorPageRightRateNumber"}>/۵</p>
                                        </MDBCol>
                                        :
                                        ''}
                                </MDBRow>
                                <img
                                    src={this.state.villaInfo && this.state.villaInfo.main_img ? `${config.webapi}/images/villas/main/${this.state.villaInfo.main_img}` : Logo}/>
                                <MDBRow>
                                    <MDBCol md={3}>
                                        <p className={"fv-factorPageRightInfoRightPadding"}>کد آگهی</p>
                                    </MDBCol>
                                    <MDBCol md={3}>
                                        <h6>{this.state.villaInfo.id}</h6>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                    <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                        {this.state.villaInfo.rent_type ?
                                            <p><i className="fas fa-home"/>{this.state.villaInfo.rent_type}</p>
                                            : ''}
                                        <p><i className="fa fa-user-friends"/>ظرفیت
                                            استاندارد {this.state.villaInfo.standard_capacity} نفر+{this.state.villaInfo.max_capacity ? Number(this.state.villaInfo.max_capacity - this.state.villaInfo.standard_capacity) : ''} نفر
                                            اضافه</p>
                                        <p><i className='fas fa-boxes'/>{this.state.villaInfo.bedroom} اتاق
                                            خواب+{this.state.villaInfo.shower} حمام+{this.state.villaInfo.ir_toilet} دست
                                            شویی ایرانی+{this.state.villaInfo.eu_toilet} دست شویی فرنگی</p>
                                        <p><i className="fas fa-bed"/>{this.state.villaInfo.bed_count} تخت یک
                                            نفره+{this.state.villaInfo.mattress_count} تشک معمولی</p>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>

                            <MDBCol md={8} sm={12} className={"fv-ProfilePageUserSetInfo"}>
                                <MDBRow className={"fv-factorPageRightInfoLeftTop"}>
                                    <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3}>
                                        <p style={{marginTop: '4%'}} className={"h7"}> {this.state.factorInfo.id} </p>
                                        <p> : کد رزرو</p>
                                    </MDBCol>
                                    <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3}>
                                        <p style={{marginTop: '4%'}}
                                           className={"h7"}> {this.state.factorInfo.issue_date} </p><p> : تاریخ صدور</p>
                                    </MDBCol>
                                    <MDBCol className={"fv-factorPageRightInfoLeftInnerTopButton"}>
                                        <input type="button" value={"در انتظار پرداخت"}/>
                                    </MDBCol>
                                </MDBRow>

                                <MDBContainer className={"fv-factorPageRightInfoLeftBody"}>
                                    <MDBRow className={"fv-factorPageRightInfoLeftTopInnerSecond"}>
                                        <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3}>
                                            <p style={{marginTop: '2.5%'}}
                                               className={"h7"}> {this.state.factorInfo.entry_date} </p><p>تاریخ رفت</p>
                                            <i className="fas fa-calendar-alt"/>
                                        </MDBCol>
                                        <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3}>
                                            <p style={{marginTop: '2.5%'}}
                                               className={"h7"}> {this.state.factorInfo.exit_date} </p><p>تاریخ
                                            برگشت</p><i className="fas fa-calendar-alt"/>
                                        </MDBCol>
                                        {/*   <MDBCol className={"fv-factorPageRightInfoLeftInnerTopButton fv-factorPageRightInfoLeftInnerChangeCalender"}>
                                    <p><i className="fas fa-chevron-left" />تغییر تاریخ</p>
                                </MDBCol> */}
                                    </MDBRow>
                                    <MDBRow className={"fv-factorPageRightInfoLeftBodyInner"}>
                                        <MDBCol md={6} className={"fv-rightBodyOfFactorPageInner"}>
                                            <h6>نحوه پرداخت</h6>
                                            <MDBRow className={"fv-radioButtonFactorPage"}>
                                                <MDBCol className={"fv-radioButtonForWithdraw"} md={2}>
                                                    <MDBContainer>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="wallet"
                                                                checked={this.state.statusPay === "wallet"}
                                                                onChange={this.walletVerify}/>
                                                        </label>

                                                    </MDBContainer>
                                                </MDBCol>
                                                <MDBCol className={"fv-radioButtonForWithdrawRowOne"} md={10}>
                                                    <MDBRow>
                                                        <MDBCol md={7}>
                                                            <p className={"h7"}>پرداخت از طریق کیف پول</p>
                                                        </MDBCol>
                                                        {this.state.statusWallet === false ?
                                                            <MDBCol md={5}>
                                                                <p style={{color: '#EB5757'}} className={"h7"}>موجودی
                                                                    ناکافی</p>
                                                            </MDBCol> : ''}

                                                    </MDBRow>
                                                </MDBCol>

                                                {this.state.statusPay === "wallet" ?
                                                    <MDBRow className={"fv-radioButtonForWithdrawTwoRowOne"}>
                                                        <MDBCol className={"fv-radioButtonForWithdrawTwo"} md={12}>

                                                            <a> <MDBRow className={"fv-radioButtonForWithdrawTwoRow"}>
                                                                <MDBCol md={6}>
                                                                    <p style={{fontSize: '14px'}}>موجودی کیف پول</p>
                                                                </MDBCol>
                                                                <MDBCol md={6}>
                                                                    <h6> {commaNumber(this.state.stock)}تومان</h6>
                                                                </MDBCol>
                                                            </MDBRow> </a>
                                                        </MDBCol>
                                                    </MDBRow> : ''}


                                                <MDBCol md={12}>

                                                </MDBCol>

                                                <MDBCol className={"fv-radioButtonForWithdraw"} md={2}>
                                                    <MDBContainer>

                                                        <input
                                                            type="radio"
                                                            value="direct"
                                                            checked={this.state.statusPay === "direct"}
                                                            onChange={this.onValChange}/>

                                                    </MDBContainer>
                                                </MDBCol>
                                                <MDBCol className={"fv-radioButtonForWithdrawRowOne"} md={10}>
                                                    <MDBRow>
                                                        <MDBCol md={7}>
                                                            <p className={"h7"}>پرداخت مستقیم</p>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>


                                            </MDBRow>
                                            <p>کد تخفیف</p>
                                            <MDBRow>
                                                <MDBCol md={6}>
                                                    <input type="text" value=""/>
                                                </MDBCol>
                                                <MDBCol md={6} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                                    <input type="button" value="ذخیره"/>
                                                </MDBCol>
                                            </MDBRow>

                                        </MDBCol>
                                        <MDBCol md={6} className={"fv-factorPageRightInfoLeftBodyInnerLeft"}>
                                            <p className={"h7"}>اطلاعات صورت حساب</p>
                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyInnerLeftInner"}>
                                                <MDBCol md={4} className={"fv-factorPageRightInfoLeftBodyInnerLeftP"}>
                                                    <p>مدت کل اقامت</p>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>{this.state.factorInfo.length_stay} روز </h6>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>{this.state.factorInfo.cost ? commaNumber(Number(this.state.factorInfo.cost - this.state.factorInfo.extra_cost - this.state.factorInfo.facilities_cost)) : ''}</h6>
                                                    <p className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyInnerLeftInner"}>
                                                <MDBCol md={4} className={"fv-factorPageRightInfoLeftBodyInnerLeftP"}>
                                                    <p>نفرات اضافه</p>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>{this.state.factorInfo.extra_people} نفر</h6>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>{commaNumber(this.state.factorInfo.extra_cost)}</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyOrderLastColumn"}>

                                            </MDBRow>
                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyInnerLeftInner"}>
                                                <MDBCol md={4} className={"fv-factorPageRightInfoLeftBodyInnerLeftP"}>
                                                    <p>جمع کل</p>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>{commaNumber(this.state.factorInfo.cost)}</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyInnerLeftInner"}>
                                                <MDBCol md={4} className={"fv-factorPageRightInfoLeftBodyInnerLeftP"}>
                                                    <p>تخفیف ها</p>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>----</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow
                                                className={"fv-factorPageRightInfoLeftBodyOrderThatPay fv-factorPageRightInfoLeftBodyInnerLeftInner"}>
                                                <MDBCol md={5}>
                                                    <p>مبلغ قابل پرداخت</p>
                                                </MDBCol>
                                                <MDBCol md={3}>
                                                </MDBCol>
                                                <MDBCol md={4}>
                                                    <h6>{commaNumber(this.state.factorInfo.cost)}</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md={12} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                                    {this.state.statusWallet ?
                                                        <>
                                                            {this.state.clickLoaderButton === false ?
                                                                <input type="button" value="پرداخت" onClick={() => {
                                                                    this.setState({clickLoaderButton: true})
                                                                    if (this.state.statusPay === "wallet") { // dar inja roie radio button wallet click shide va az ghabl ham chek shode ke mojodi dashte bashad
                                                                        const data = {
                                                                            amount: Number(this.state.factorInfo.cost),
                                                                            reservation_id: this.state.factorInfo.id,
                                                                            villa_id: this.state.villaInfo.id,
                                                                            wallet: true
                                                                        }
                                                                        requestPay(data)
                                                                            .then(res => {
                                                                                console.log(res)
                                                                                if (res.data.status === -1) {
                                                                                    // mojodi kafi nist
                                                                                    alert(res.data.message)
                                                                                    this.setState({clickLoaderButton: false})
                                                                                }
                                                                                if (res.data.status === 1) {
                                                                                    alert(res.data.message)
                                                                                    window.location.replace("/MainProfilePages/ProfileMyReservation");
                                                                                }
                                                                                if (res.data.status === -2) {
                                                                                    alert(res.data.message)
                                                                                    window.location.replace("/MainProfilePages/ProfileMyReservation");
                                                                                }
                                                                            })
                                                                            .catch(err => {
                                                                                if (err.response.data.errors) {
                                                                                    if (err.response.data.errors.amount) {
                                                                                        alert(err.response.data.errors.amount[0])
                                                                                    }
                                                                                }
                                                                                this.setState({clickLoaderButton: false})
                                                                                console.log(err.response)
                                                                            })

                                                                    } else { // dar sorati ke pardakht mostaghim bashad
                                                                        const data = {
                                                                            amount: Number(this.state.factorInfo.cost),
                                                                            reservation_id: this.state.factorInfo.id,
                                                                            villa_id: this.state.villaInfo.id,
                                                                        }
                                                                        console.log(data)
                                                                        requestPay(data)
                                                                            .then(res => {
                                                                                if (res.data.status === 0) {
                                                                                    alert(res.data.data)
                                                                                    this.setState({clickLoaderButton: false})
                                                                                } else {
                                                                                    console.log(res)
                                                                                    window.location.replace(res.data.payment_url);
                                                                                }
                                                                            })
                                                                            .catch(err => {
                                                                                this.setState({clickLoaderButton: false})
                                                                                console.log(err.response)
                                                                            })
                                                                    }


                                                                }}/>
                                                                :
                                                                <>{Waiting(this.state.clickLoaderButton, 'fv-waiting-pay-button')}</>
                                                            }
                                                        </>
                                                        :
                                                        <input style={{background: 'rgb(235, 87, 87)'}} type="button"
                                                               value="شارژ کیف پول" onClick={() => {
                                                            window.location.replace("/MainProfilePages/ProfilePageChargeWallet");
                                                        }}/>
                                                    }

                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>


                        {/**//**//**//*9*//**//**//**//**//**/         /* Mobile */        /**//**/ /**//**//**//**/}


                        <MDBRow className={"fv-ProfilePageLeftBody fv-FactorPageForMobile"}>


                            <MDBCol md={8} sm={12} className={"fv-ProfilePageUserSetInfo"}>
                                <MDBRow className={"fv-factorPageRightInfoLeftTop"}>
                                    <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3}>
                                        <p style={{marginTop: '3%'}} className={"h7"}> {this.state.factorInfo.id} </p>
                                        <p> : کد رزرو</p>
                                    </MDBCol>
                                    <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3}>
                                        <p style={{marginTop: '3%'}}
                                           className={"h7"}> {this.state.factorInfo.issue_date} </p><p> : تاریخ صدور</p>
                                    </MDBCol>
                                    <MDBCol className={"fv-factorPageRightInfoLeftInnerTopButton1"}>
                                        <input type="button" value={"در انتظار پذیرش میزبان"}/>
                                    </MDBCol>
                                </MDBRow>

                                <MDBContainer className={"fv-factorPageRightInfoLeftBody"}>
                                    <MDBRow className={"fv-factorPageRightInfoLeftTopInnerSecond"}>
                                        <MDBCol className={"fv-factorPageRightInfoLeftInnerTop"} md={3} sm={5}>
                                            <div><p
                                                className={"fv-factorPageRightInfoLeftInnerTopReserveCodeMobileP"}>تاریخ
                                                رفت</p>  <p className={"h7"}> {this.state.factorInfo.entry_date} </p>
                                            </div>
                                            <i style={{marginLeft: '1vw'}}
                                               className="fas fa-calendar-alt fv-factorPageRightInfoLeftInnerTopReserveCodeMobileIcon"/>
                                        </MDBCol>
                                        <MDBCol
                                            className={"fv-factorPageRightInfoLeftInnerTop fv-factorPageRightInfoLeftInnerTop2Mobile"}
                                            md={3} sm={5}>
                                            <div><p
                                                className={"fv-factorPageRightInfoLeftInnerTopReserveCodeMobileP"}>تاریخ
                                                برگشت</p>  <p className={"h7"}> {this.state.factorInfo.exit_date} </p>
                                            </div>
                                            <i style={{marginLeft: '1vw'}}
                                               className="fas fa-calendar-alt fv-factorPageRightInfoLeftInnerTopReserveCodeMobileIcon"/>
                                        </MDBCol>
                                        {/*  <MDBCol className={"fv-factorPageRightInfoLeftInnerTopButton fv-factorPageRightInfoLeftInnerChangeCalender"}>
                                    <p><i className="fa fa-chevron-left" />تغییر تاریخ</p>
                                </MDBCol> */}
                                    </MDBRow>
                                    <MDBRow>

                                        <MDBCol md={3} className={"fv-factorPageRightInfo"}>
                                            <MDBRow className={"fv-factorPageRightInfoTitleMobile"}>
                                                <MDBCol md={3} sm={2} className={"fv-factorPageRightRate"}>
                                                    <img
                                                        src={this.state.villaInfo && this.state.villaInfo.main_img ? `${config.webapi}/images/villas/main/${this.state.villaInfo.main_img}` : Logo}/>
                                                </MDBCol>
                                                <MDBCol md={6} sm={6}>
                                                    <p className={"fv-factorPageRightInfoRightPaddingTitle2 h7"}>{this.state.villaInfo.title}</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <h6 className={"fv-factorPageRightInfoRightPaddingTitle2"}>{this.state.villaInfo.city}</h6>

                                            <MDBRow className={"fv-factorPageRightInfoRightCodeTitleMobile"}>
                                                <MDBCol md={3} sm={2}>
                                                    <p className={"fv-factorPageRightInfoRightPadding"}>کد آگهی</p>
                                                </MDBCol>
                                                <MDBCol md={3} sm={3}>
                                                    <h6>{this.state.villaInfo.id}</h6>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                                <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                                    {this.state.villaInfo.rent_type ?
                                                        <p><i className="fas fa-home"/>{this.state.villaInfo.rent_type}
                                                        </p>
                                                        : ''}
                                                    <p><i className="fa fa-user-friends"/>ظرفیت
                                                        استاندارد {this.state.villaInfo.standard_capacity} نفر+{this.state.villaInfo.max_capacity ? Number(this.state.villaInfo.max_capacity - this.state.villaInfo.standard_capacity) : ''} نفر
                                                        اضافه</p>
                                                    <p><i className='fas fa-boxes'/>{this.state.villaInfo.bedroom} اتاق
                                                        خواب+{this.state.villaInfo.shower} حمام+{this.state.villaInfo.ir_toilet} دست
                                                        شویی ایرانی+{this.state.villaInfo.eu_toilet} دست شویی فرنگیی</p>
                                                    <p><i className="fas fa-bed"/>{this.state.villaInfo.bed_count} تخت
                                                        یک نفره+{this.state.villaInfo.mattress_count} تشک معمولی</p>
                                                    {/* <p className={"fv-FactorPageIconGreenColorMobile"}><i className="fas fa-chevron-left fv-FactorPageIconSeeDetailsMobile" />مشاهده مجدد جزییات</p> */}
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow
                                        className={"fv-factorPageRightInfoLeftBodyInner fv-factorPageRightInfoLeftBodyInnerMobile"}>

                                        <MDBCol md={6} className={"fv-factorPageRightInfoLeftBodyInnerLeft"}>
                                            <p className={"h7"}>اطلاعات صورت حساب</p>
                                            <MDBRow>
                                                <MDBCol md={4} sm={5}>
                                                    <p>مدت کل اقامت</p>
                                                </MDBCol>
                                                <MDBCol md={4} sm={3}>
                                                    <h6>{this.state.factorInfo.length_stay} روز </h6>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}>
                                                    <h6>{this.state.factorInfo.cost ? commaNumber(Number(this.state.factorInfo.cost - this.state.factorInfo.extra_cost - this.state.factorInfo.facilities_cost)) : ''}</h6>
                                                    <p className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow>
                                                <MDBCol md={4} sm={5}>
                                                    <p>نفرات اضافه</p>
                                                </MDBCol>
                                                <MDBCol md={4} sm={3}>
                                                    <h6>{this.state.factorInfo.extra_people} نفر</h6>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}>
                                                    <h6>{commaNumber(this.state.factorInfo.extra_cost)}</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyOrderLastColumn"}>

                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md={4} sm={5}>
                                                    <p>جمع کل</p>
                                                </MDBCol>
                                                <MDBCol md={4} sm={3}>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}>
                                                    <h6>{commaNumber(this.state.factorInfo.cost)}</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md={4} sm={5}>
                                                    <p>تخفیف ها</p>
                                                </MDBCol>
                                                <MDBCol md={4} sm={3}>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}>
                                                    <h6>----</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={"fv-factorPageRightInfoLeftBodyOrderThatPay"}>
                                                <MDBCol md={4} sm={5}
                                                        className={"fv-factorPageRightInfoLeftBodyOrderThatPayTitleMobile"}>
                                                    <p>مبلغ قابل پرداخت</p>
                                                </MDBCol>
                                                <MDBCol md={4} sm={3}>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}
                                                        className={"fv-factorPageRightInfoLeftBodyOrderThatPayPriceMobile"}>
                                                    <h6>{commaNumber(this.state.factorInfo.cost)}</h6><p
                                                    className={"fv-factorPageRightInfoLeftBodyOrderThatPayToman"}>تومان</p>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                        <MDBCol md={6}>

                                            <h6>نحوه پرداخت</h6>
                                            <MDBRow className={"fv-radioButtonFactorPage"}>
                                                <MDBCol className={"fv-radioButtonForWithdraw"} md={2} sm={2}>
                                                    <MDBContainer>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="wallet"
                                                                checked={this.state.statusPay === "wallet"}
                                                                onChange={this.walletVerify}/>
                                                        </label>

                                                    </MDBContainer>
                                                </MDBCol>
                                                <MDBCol className={"fv-radioButtonForWithdrawRowOne"} md={10} sm={10}>
                                                    <MDBRow>
                                                        <MDBCol md={7}>
                                                            <p className={"h7"}>پرداخت از طریق کیف پول</p>
                                                        </MDBCol>
                                                        {this.state.statusWallet === false ?
                                                            <MDBCol md={5}>
                                                                <p style={{
                                                                    color: '#EB5757',
                                                                    marginTop: '2%',
                                                                    paddingRight: '-6%',
                                                                    marginRight: '-10%'
                                                                }} className={"h7"}>موجودی ناکافی</p>
                                                            </MDBCol> : ''}

                                                    </MDBRow>
                                                </MDBCol>

                                                {this.state.statusPay === "wallet" ?
                                                    <MDBRow className={"fv-radioButtonForWithdrawTwoRowOne"}>
                                                        <MDBCol className={"fv-radioButtonForWithdrawTwo"} md={12}
                                                                sm={12}>

                                                            <MDBRow className={"fv-radioButtonForWithdrawTwoRow"}>
                                                                <MDBRow className={"fv-walletStockMobile"}>
                                                                    <MDBCol md={6} sm={12}>
                                                                        <p style={{fontSize: '14px'}}>موجودی کیف پول</p>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                <MDBRow>
                                                                    <MDBCol className={"fv-amountStockMobile"} md={6}
                                                                            sm={12}>
                                                                        <h6 style={{marginTop: '10%'}}>{commaNumber(this.state.stock)}تومان</h6>
                                                                    </MDBCol>
                                                                </MDBRow>

                                                            </MDBRow>
                                                        </MDBCol>
                                                    </MDBRow> : ''}


                                                <MDBCol md={12}>

                                                </MDBCol>

                                                <MDBCol className={"fv-radioButtonForWithdraw"} md={2} sm={2}>
                                                    <MDBContainer>

                                                        <input
                                                            type="radio"
                                                            value="direct"
                                                            checked={this.state.statusPay === "direct"}
                                                            onChange={this.onValChange}/>

                                                    </MDBContainer>
                                                </MDBCol>
                                                <MDBCol className={"fv-radioButtonForWithdrawRowOne"} md={10} sm={10}>
                                                    <MDBRow>
                                                        <MDBCol md={7}>
                                                            <p className={"h7"}>پرداخت مستقیم</p>
                                                        </MDBCol>
                                                    </MDBRow>
                                                </MDBCol>


                                            </MDBRow>

                                            <p>کد تخفیف</p>
                                            <MDBRow>
                                                <MDBCol md={6} sm={9}>
                                                    <input type="text" value=""/>
                                                </MDBCol>
                                                <MDBCol md={6} sm={3} className={"fv-ProfilePageUserSetInfoButton"}>
                                                    <input type="button" value="ذخیره"/>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className={"fv-FactorPageButtonMobile"}>
                                                <MDBCol md={12} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                                    {this.state.statusWallet ?
                                                        <>
                                                            {this.state.clickLoaderButton === false ? // waiting for pay
                                                                <input type="button" value="پرداخت" onClick={() => {
                                                                    this.setState({clickLoaderButton: true})
                                                                    if (this.state.statusPay === "wallet") { // dar inja roie radio button wallet click shide va az ghabl ham chek shode ke mojodi dashte bashad
                                                                        const data = {
                                                                            amount: Number(this.state.factorInfo.cost),
                                                                            reservation_id: this.state.factorInfo.id,
                                                                            villa_id: this.state.villaInfo.id,
                                                                            wallet: true
                                                                        }
                                                                        requestPay(data)
                                                                            .then(res => {
                                                                                console.log(res)
                                                                                if (res.data.status === -1) {
                                                                                    // mojodi kafi nist
                                                                                    alert(res.data.message)
                                                                                    this.setState({clickLoaderButton: false})
                                                                                }
                                                                                if (res.data.status === 1) {
                                                                                    alert(res.data.message)
                                                                                    window.location.replace("/MainProfilePages/ProfileMyReservation");
                                                                                }
                                                                                if (res.data.status === -2) {
                                                                                    alert(res.data.message)
                                                                                    window.location.replace("/MainProfilePages/ProfileMyReservation");
                                                                                }
                                                                            })
                                                                            .catch(err => {
                                                                                if (err.response.data.errors) {
                                                                                    if (err.response.data.errors.amount) {
                                                                                        alert(err.response.data.errors.amount[0])
                                                                                    }
                                                                                }
                                                                                this.setState({clickLoaderButton: false})
                                                                                console.log(err.response)
                                                                            })

                                                                    } else { // dar sorati ke pardakht mostaghim bashad
                                                                        const data = {
                                                                            amount: Number(this.state.factorInfo.cost),
                                                                            reservation_id: this.state.factorInfo.id,
                                                                            villa_id: this.state.villaInfo.id,
                                                                        }
                                                                        console.log(data)
                                                                        requestPay(data)
                                                                            .then(res => {
                                                                                if (res.data.status === 0) {
                                                                                    alert(res.data.data)
                                                                                    this.setState({clickLoaderButton: false})
                                                                                } else {
                                                                                    console.log(res)
                                                                                    window.location.replace(res.data.payment_url);
                                                                                }
                                                                            })
                                                                            .catch(err => {
                                                                                this.setState({clickLoaderButton: false})
                                                                                console.log(err.response)
                                                                            })
                                                                    }


                                                                }}/>
                                                                :
                                                                <>{Waiting(this.state.clickLoaderButton, 'fv-waiting-pay-button')}</>
                                                            }
                                                        </>
                                                        :
                                                        <input style={{background: 'rgb(235, 87, 87)'}} type="button"
                                                               value="شارژ کیف پول" onClick={() => {
                                                            window.location.replace("/MainProfilePages/ProfilePageChargeWallet");
                                                        }}/>
                                                    }
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>

                    </>
                }

                <MDBRow>
                    <Footer/>
                </MDBRow>

            </MDBContainer>
        )
    }
}

export default FactorPage