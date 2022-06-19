import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePage.scss"
import Footer from "../componentsPages/footer"
import {getUserStock, updateUserAvatar, userReserves} from "../services/userService";
import config from "../services/config.json"
import UserImage from "../images/user.png";
import {BrowserRouter, Link, NavLink, Route} from "react-router-dom";
import ProfilePageCommentsHandle from "../emptyAndHandlePage/ProfilePageCommentsHandle";
import ProfilePageCalendarHandle from "../emptyAndHandlePage/ProfilePageCalendarHandle";
import ProfilePage from "./ProfilePage";
import ProfileFavoritesPage from "./profileFavoritesPage";
import ProfilePageWallet3 from "./ProfilePageWallet3";
import ProfilePageCalender from "./ProfilePageCalender";
import ProfilePageWallet from "./ProfilePageWallet";
import AnotherPagesEmpty from "../emptyAndHandlePage/anotherPagesEmpty";
import ProfilePageReservation2 from "./ProfilePageReservation2";
import ProfilePageReservationEmpty from "../emptyAndHandlePage/ProfilePageReservationEmpty";
import ProfilePageTransaction2 from "./ProfilePageTransaction2";
import ProfilePageTransactionEmpty from "../emptyAndHandlePage/ProfilePageTransactionEmpty";
import MyAccommodationPage from "./MyAccommodationPage";
import ProfilePageReservationsRequested from "./ProfilePageReservationsRequested";
import ProfilePageGustComments2 from "./PrfilePageGustComments2";
import PrfilePageGustComments from "./PrfilePageGustComments";
import {CookiesProvider} from "react-cookie";
import ProfilePageCalendarEmpty from "../emptyAndHandlePage/ProfilePageCalendarEmpty";
import ProfilePageWallet2 from "./ProfilePageWallet2";
import ScrollToTop from "../componentsPages/ScrollToTop";
import MobileLogo from "../images/MobileLogo.png";
import FotterpageLogo from "../images/Logo.png"
import ProfilePageChargeWallet from "./ProfilePageChargeWallet";
import ProfilePageWalletEdit from "./ProfilePageWalletEdit";

const commaNumber = require('comma-number')


class MainProfilePages extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            ...props,
            ...this.state,
            ...this.props,
            activeClassChevron: true,
            activeClass: '',
            stock: "",
            onclickHandel: false,
            nameAndFamily: '',
            AvatarSrc: '',
            c: '',
            username: '',

            ProfilePageReservationHandlePageSwitch: '',
            clickLoaderAvatar: false,
            avatarImageData: '',

            updateAvatarEdit: false,
        }

    }

    componentDidMount() {
        const info = JSON.parse(localStorage.getItem("infoUser"))
        let nameAndFamily = ""
        let avatar = ""
        let username = ""
        if (info) {
            nameAndFamily = info.userInfo.fullname
            avatar = info.userInfo.avatar
            username = info.userInfo.trapp_id
        }
        this.setState({nameAndFamily: nameAndFamily, AvatarSrc: avatar, username: username})

        getUserStock()
            .then(res => {
                this.setState({stock: res.data.data})
            })
            .catch(err => console.log(err.response))

        if (window.location.href.match(/\bProfile\b/)) {
            this.setState({updateAvatarEdit: true})
        }
    }


    ChangeUserNameAndFamily = (nameAndFamily) => {
        this.setState({nameAndFamily: nameAndFamily})
    }
    ChangeUserAvatarSrc = (avatarSrc) => {
        this.setState({AvatarSrc: avatarSrc})
    }
    ChangeUserUsername = (usernames) => {
        this.setState({username: usernames})
    }
    ChangeAmountPrice = () => {
        getUserStock()
            .then(res => {
                this.setState({stock: res.data.data})
            })
            .catch(err => console.log(err.response))
    }


    swetchPages = (page) => {
        this.setState({ProfilePageReservationHandlePageSwitch: page})
    }

    checkPage = () => {

        userReserves()
            .then(res => {
                console.log(res)
                if (res.data.data.length > 0) {
                    this.props.history.push("/MainProfilePages/TestProfilePages2")
                } else {
                    this.props.history.push("/ProfilePageReservationEmpty")
                    return ''
                }
            })
    }
    fileSelectedHandler = (event) => {

        if ((event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/bmp" || event.target.files[0].type === "image/jpeg") && event.target.files[0].size < 3000000) {
            this.setState({clickLoaderAvatar: true})
            console.log(event)
            event.preventDefault()
            //  this.setState({clickLoader:true})
            console.log(event.target.files[0])
            console.log(event.target.name)

            let formData = new FormData();
            formData.append("avatar", event.target.files[0])
            updateUserAvatar(formData)
                .then(res => {
                    if (res.data.avatar_count !== 0) {
                        this.setState({avatarImageData: res.data.avatar}, () => {
                            const info = JSON.parse(localStorage.getItem("infoUser"))
                            let avatar = ""
                            let fullName = ""
                            if (info) {
                                fullName = info.userInfo.fullname
                                avatar = info.userInfo.avatar
                            }

                            let setAvatar = ""
                            if (this.state.avatarImageData) {
                                setAvatar = this.state.avatarImageData
                            } else {
                                setAvatar = avatar
                            }
                            const userInfo = {
                                avatar: setAvatar,
                                fullname: fullName,
                            }

                            const dataInfoUpdate = {
                                userInfo: userInfo
                            }
                            localStorage.setItem("infoUser", JSON.stringify(dataInfoUpdate))
                            this.ChangeUserAvatarSrc(res.data.avatar)
                            this.setState({clickLoaderAvatar: false})
                        })
                    }
                })

            this.setState({avatarImageData: formData})

        }
        if (event.target.files[0].size > 3000000) {
            alert("حجم فایل عکس باید حداکثر 2 مگابایت باشد")
        }
        if ((event.target.files[0].type !== "image/jpg" && event.target.files[0].type !== "image/png" && event.target.files[0].type !== "image/bmp" && event.target.files[0].type !== "image/jpeg")) {
            alert("لطفا فایل عکس انتخواب کنید")
        }
    };

    render() {

        return (
            <React.StrictMode>
                <BrowserRouter>

                    <CookiesProvider>

                        <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage"}>
                            <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>

                                {/*   <HeaderSearch {...this.props} /> */}

                                {/*             **************************** Main header *****************                     */}


                                <div
                                    className={"fv-footerMenu fv-footerDisplayPage fv-DisplayPage fv-profilePageUserInfo"}>
                                    <MDBRow className={' fv-footerDisplayPageBody'}>
                                        <MDBCol md={2}>
                                            <Link to={'/MainProfilePages/profile'}> <i className="fa fa-user-alt"/>
                                                <a style={{marginRight: '2%'}}>{this.state.nameAndFamily ? this.state.nameAndFamily : 'میهمان'}</a>
                                            </Link>
                                        </MDBCol>
                                        <MDBCol md={2} className={"fv-DisplayPageSearchIcon"}>
                                            <input type='searchBbox' placeholder=' جستجو شهر مورد نظر'
                                                   onChange={(e) => this.setState({searchResult: e.target.value})}/>
                                        </MDBCol>
                                        <MDBCol md={2} className={"fv-DisplayPageSearchIcon"}>
                                            <a onClick={() => {
                                                const mainPageSearch = {
                                                    city: `C ${this.state.searchResult}`,
                                                    numberOfPeople: '',
                                                    dateToGo: '',
                                                    dateToReturn: '',
                                                }
                                                localStorage.setItem("mainPageSearch", JSON.stringify(mainPageSearch));
                                                this.props.history.push({
                                                    pathname: "/searchHomePage/doSearch/1",
                                                    searchDatas: {
                                                        city: this.state.city,
                                                        dayToGo: mainPageSearch.dateToGo,
                                                        dateToReturn: mainPageSearch.dateToReturn,
                                                        capacity: mainPageSearch.numberOfPeople
                                                    }
                                                })

                                            }}><i className="fa fa-search"/></a>
                                        </MDBCol>

                                        <MDBCol sm={2} sm={2} className={"fv-DisplayPageLoginImageMobile"}>
                                            <img
                                                src={this.state.AvatarSrc ? `${config.webapi}/images/user//${this.state.AvatarSrc}` : MobileLogo}
                                                onClick={() => {
                                                    this.setState({onclickHandel: !this.state.onclickHandel})
                                                }}/>
                                        </MDBCol>
                                        {/*
                                        <MDBCol sm={1}
                                                className={this.state.onclickHandel ? "fv-DisplayPageLoginSignMobile" : "fv-hideMenu"}>
                                            <i className="fas fa-caret-up" onClick={() => {
                                                this.setState({onclickHandel: !this.state.onclickHandel})
                                            }}/>
                                        </MDBCol>
                                        <MDBCol sm={1}
                                                className={this.state.onclickHandel ? "fv-hideMenu" : "fv-DisplayPageLoginSignMobile"}>
                                            <i className="fas fa-caret-left" onClick={() => {
                                                this.setState({onclickHandel: !this.state.onclickHandel})
                                            }}/>
                                        </MDBCol>
                                        */}

                                        <MDBCol sm={1}
                                                className={this.state.onclickHandel ? "fv-DisplayPageLoginSignMobile" : "fv-hideMenu"}>
                                            <i className="" onClick={() => {
                                                this.setState({onclickHandel: !this.state.onclickHandel})
                                            }}/>
                                        </MDBCol>
                                        <MDBCol sm={1}
                                                className={this.state.onclickHandel ? "fv-hideMenu" : "fv-DisplayPageLoginSignMobile"}>
                                            <i className="" onClick={() => {
                                                this.setState({onclickHandel: !this.state.onclickHandel})
                                            }}/>
                                        </MDBCol>
                                        <MDBCol md={6} sm={9} className={"menuMobile"}>
                                            {/* img src={FotterpageLogo} className={"fv-DisplayPageSearchName"} */}
                                            <a onClick={() => window.location.replace("/")}> <img src={FotterpageLogo}
                                                                                                  className={"fv-DisplayPageSearchLogo"}/>
                                            </a>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage"}>


                                        <MDBRow
                                            className={this.state.onclickHandel && !localStorage.getItem("token") ? "fv-ProfilePageLeftBody fv-gustUsersMenu" : "fv-hideMenu"}> {/* profile info for mobile            if gust*/}
                                            <MDBCol md={3} className={"fv-ProfilePageUserInfoBody"}>
                                                <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                                    <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                                        <Link to={'/login'}><p
                                                            className={window.location.href.match(/\blogin\b/) ? "fv-reservationActive" : ''}>
                                                            <i className="fa fa-door-open"/>ورود</p></Link>
                                                        {/* <Link to={'/registration'}> <p className={ window.location.href.match(/\bregistration\b/) ? "fv-transaction" : ''}  ><i className="fa fa-address-card" />ثبت نام</p> </Link>  */}
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>

                                            <MDBRow className={"fv-DisplayPageRotePathMobile"}>
                                                <MDBCol>
                                                    <a onClick={() => window.location.replace("/")}><p> صفحه اصلی </p>
                                                    </a>
                                                    <i className="fas fa-chevron-left"/>
                                                    <Link to={"/MainProfilePages/Profile"}><p
                                                        className={this.props.thisPageName ? "" : "fv-DisplayPagePathNow"}> پنل
                                                        کاربری </p>
                                                    </Link> {/* اگر مقدار سوم وجود داشت کلاس رنگ سبز غیر فعال شود */}
                                                    <i className={this.props.thisPageName ? "fas fa-chevron-left" : ""}/> {/* اگر مقدار سوم وجود داشت کلاس فعال شود */}
                                                    <p className={this.props.thisPageName ? "fv-DisplayPagePathNow" : ""}> {this.props.thisPageName} </p>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    </MDBContainer>
                                </div>
                                {/*             **************************** header Mobile *****************                     */}

                            </MDBContainer>

                            <MDBRow className={"fv-ProfilePageLeftBody"}>

                                {/*           for mobile          */}
                                {/*{this.state.onclickHandel ?*/}
                                    <MDBCol md={3} className={"fv-ProfilePageUserInfoBody fv-HideDesktopForMobile"}>
                                        <img
                                            src={this.state.AvatarSrc ? `${config.webapi}/images/user/${this.state.AvatarSrc}` : UserImage}/>

                                        {this.state.updateAvatarEdit ?
                                            <MDBRow md={3} sm={12}>
                                                <MDBContainer
                                                    className={"fv-hostStep5Page3Images fv-inputProfilePageAvatar"}>
                                                    <label htmlFor="myInput">
                                                        <label style={{fontSize: '13px'}} htmlFor="files2"
                                                               className={this.state.clickLoaderAvatar ? "fv-hideLoader" : "btn"}>
                                                            <i className="fas fa-edit"/> تغییر تصویر
                                                        </label>
                                                        <input id="files2" style={{display: 'none'}}
                                                               onChange={this.fileSelectedHandler} type="file"
                                                               name={'avatar'}/>

                                                        <MDBRow>
                                                            <div
                                                                className={this.state.clickLoaderAvatar ? "loaderAvatar fv-LoadeAvatarInProfile" : "fv-hideLoader"}>
                                                                <svg className="circular" viewBox="25 25 50 50">
                                                                    <circle className="path" cx="50" cy="50" r="20"
                                                                            fill="none" stroke-width="2"
                                                                            stroke-miterlimit="10"/>
                                                                </svg>
                                                            </div>
                                                        </MDBRow>
                                                    </label>
                                                </MDBContainer>
                                            </MDBRow>
                                            : ''
                                        }


                                        <h5 style={{
                                            marginTop: '5%',
                                            marginBottom: '2%'
                                        }}>{this.state.nameAndFamily}</h5>

                                        <MDBRow style={{textAlign: 'center'}}>
                                            <MDBCol md={12}>
                                                <p style={{
                                                    fontSize: '15px',
                                                    display: 'inline-flex',
                                                    width: '100%',
                                                    placeContent: 'center'
                                                }}><p> نام کاربری </p>
                                                    <h6 style={{
                                                        marginRight: '6%',
                                                        marginTop: '1.5%',
                                                        marginLeft: '6%'
                                                    }}>{this.state.username}</h6>
                                                </p>
                                            </MDBCol>
                                        </MDBRow>


                                        <MDBRow className={"fv-ProfilePageUserHoldingInfo"}>
                                            <MDBCol md={12}>
                                                <p>موجودی حساب شما</p>
                                                <h6>{commaNumber(this.state.stock)} تومان </h6>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                            <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                                <NavLink exact to={'/MainProfilePages/ProfileMyReservation'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => this.setState({
                                                        onclickHandel: false,
                                                        updateAvatarEdit: false
                                                    })}><i
                                                    className="fas fa-book"/>رزرو های من</p></NavLink>
                                                <NavLink to={'/MainProfilePages/ProfileMyTransaction'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => this.setState({
                                                        onclickHandel: false,
                                                        updateAvatarEdit: false
                                                    })}><i
                                                    className="fas fa-chart-bar"/>تراکنش های من</p></NavLink>
                                                <MDBRow className={"fv-ProfilePageFacilitiesMobile"}>
                                                    <MDBCol md={8} sm={8}>
                                                        <a onClick={() => this.setState({activeClassChevron: !this.state.activeClassChevron})}><i
                                                            className="fa fa-file-invoice"/>امکانات میزبان</a>
                                                    </MDBCol>
                                                    <MDBCol md={4} sm={4}
                                                            className={this.state.activeClassChevron ? '' : "fv-chevronHide"}>  {/*  activeClassChevron === true    ">"   */}
                                                        <a><i className="fas fa-chevron-left"
                                                              onClick={() => this.setState({activeClassChevron: !this.state.activeClassChevron})}/></a>
                                                    </MDBCol>
                                                    <MDBCol md={4} sm={4}
                                                            className={this.state.activeClassChevron ? "fv-chevronHide" : ''}>    {/*  activeClassChevron === true    "v"   */}
                                                        <a><i className="fas fa-chevron-up"
                                                              onClick={() => this.setState({activeClassChevron: !this.state.activeClassChevron})}/></a>
                                                    </MDBCol>
                                                </MDBRow>
                                                {this.state.activeClassChevron ? '' :
                                                    <div>
                                                        <NavLink to={'/MainProfilePages/myAccommodation'}
                                                                 activeClassName={"fv-reservationActive"}><p
                                                            className={'fv-ProfilePageUserInfoDetailsOption'}
                                                            onClick={() => this.setState({
                                                                onclickHandel: false,
                                                                updateAvatarEdit: false
                                                            })}>اقامت
                                                            گاه های من</p></NavLink>
                                                        <NavLink to={'/MainProfilePages/profileReservations'}
                                                                 activeClassName={"fv-reservationActive"}><p
                                                            className='fv-ProfilePageUserInfoDetailsOption'
                                                            onClick={() => this.setState({
                                                                onclickHandel: false,
                                                                updateAvatarEdit: false
                                                            })}>رزرو
                                                            های درخواستی</p></NavLink>
                                                        <NavLink to={'/MainProfilePages/ProfilePageCommentsHandle'}
                                                                 activeClassName={"fv-reservationActive"}><p
                                                            className={'fv-ProfilePageUserInfoDetailsOption'}
                                                            onClick={() => this.setState({
                                                                onclickHandel: false,
                                                                updateAvatarEdit: false
                                                            })}> نظرات
                                                            مهمان ها</p></NavLink>
                                                        <NavLink to={'/MainProfilePages/ProfilePageCalendarHandle'}
                                                                 activeClassName={"fv-reservationActive"}><p
                                                            className={'fv-ProfilePageUserInfoDetailsOption'}
                                                            onClick={() => this.setState({
                                                                onclickHandel: false,
                                                                updateAvatarEdit: false
                                                            })}>تقویم
                                                            من</p></NavLink>
                                                    </div>
                                                }
                                                <NavLink to={'/MainProfilePages/ProfileWallet'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => this.setState({
                                                        onclickHandel: false,
                                                        updateAvatarEdit: false
                                                    })}><i
                                                    className="fas fa-wallet"/>مدیریت مالی ویلاها</p></NavLink>
                                                <NavLink to={'/MainProfilePages/ProfilePageChargeWallet'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => this.setState({
                                                        onclickHandel: false,
                                                        updateAvatarEdit: false
                                                    })}><i
                                                    className="fas fa-wallet"/>شارژ کیف پول</p></NavLink>
                                                <NavLink to={'/MainProfilePages/profileWalletRequestWithdraw'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => this.setState({
                                                        onclickHandel: false,
                                                        updateAvatarEdit: false
                                                    })}><i
                                                    className="fas fa-chart-bar"/>درخواست برداشت</p></NavLink>
                                                <NavLink to={'/MainProfilePages/Profile'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => {
                                                        this.setState({
                                                            onclickHandel: false,
                                                            updateAvatarEdit: true
                                                        })
                                                    }}><i
                                                    className="fas fa-user"/>ویرایش پروفایل</p></NavLink>
                                                <NavLink to={'/MainProfilePages/profileFavoritesPage'}
                                                         activeClassName={"fv-reservationActive"}><p
                                                    onClick={() => this.setState({
                                                        onclickHandel: false,
                                                        updateAvatarEdit: false
                                                    })}><i
                                                    className="fa fa-heart"/>علاقه مندی ها</p></NavLink>
                                                <a onClick={() => {
                                                    window.location.replace(`/`);
                                                }}><p
                                                    onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                    className="fas fa-sign-out-alt"/>خروج</p></a>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                {/*}*/}


                                {/*           for desktop          */}
                                <MDBCol md={3} className={"fv-ProfilePageUserInfoBody fv-hideMobileForDesktop"}>
                                    <img
                                        src={this.state.AvatarSrc ? `${config.webapi}/images/user/${this.state.AvatarSrc}` : UserImage}/>

                                    {this.state.updateAvatarEdit ?
                                        <MDBRow md={12} sm={12}>
                                            <MDBContainer
                                                className={"fv-hostStep5Page3Images fv-inputProfilePageAvatar"}>
                                                <label htmlFor="myInput">
                                                    <label style={{fontSize: '15px'}} htmlFor="files2"
                                                           className={this.state.clickLoaderAvatar ? "fv-hideLoader" : "btn"}>
                                                        <i className="fas fa-edit"/> تغییر تصویر
                                                    </label>
                                                    <input id="files2" style={{display: 'none'}}
                                                           onChange={this.fileSelectedHandler} type="file"
                                                           name={'avatar'}/>

                                                    <MDBRow>
                                                        <div
                                                            className={this.state.clickLoaderAvatar ? "loaderAvatar fv-LoadeAvatarInProfile" : "fv-hideLoader"}>
                                                            <svg className="circular" viewBox="25 25 50 50">
                                                                <circle className="path" cx="50" cy="50" r="20"
                                                                        fill="none" stroke-width="2"
                                                                        stroke-miterlimit="10"/>
                                                            </svg>
                                                        </div>
                                                    </MDBRow>
                                                </label>
                                            </MDBContainer>
                                        </MDBRow>
                                        : ''
                                    }


                                    <h5 style={{marginTop: '0%', marginBottom: '2%'}}>{this.state.nameAndFamily}</h5>
                                    <MDBRow style={{textAlign: 'center'}}>
                                        <MDBCol md={12}>
                                            <p style={{
                                                fontSize: '15px',
                                                display: 'inline-flex',
                                                width: '100%',
                                                placeContent: 'center'
                                            }}><p> نام کاربری </p>
                                                <h6 style={{
                                                    marginRight: '6%',
                                                    marginTop: '1.5%'
                                                }}>{this.state.username}</h6>
                                            </p>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow className={"fv-ProfilePageUserHoldingInfo"}>
                                        <MDBCol md={12}>
                                            <p>موجودی حساب شما</p>
                                            <h6>{commaNumber(this.state.stock)} تومان </h6>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                        <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                            <NavLink exact to={'/MainProfilePages/ProfileMyReservation'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fas fa-book"/>رزرو های من</p></NavLink>
                                            <NavLink to={'/MainProfilePages/ProfileMyTransaction'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fas fa-chart-bar"/>تراکنش های من</p></NavLink>
                                            <MDBRow className={"fv-ProfilePageFacilitiesMobile"}>
                                                <MDBCol md={8} sm={8}>
                                                    <a onClick={() => this.setState({activeClassChevron: !this.state.activeClassChevron})}><i
                                                        className="fa fa-file-invoice"/>امکانات میزبان</a>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}
                                                        className={this.state.activeClassChevron ? '' : "fv-chevronHide"}>  {/*  activeClassChevron === true    ">"   */}
                                                    <a><i className="fas fa-chevron-left"
                                                          onClick={() => this.setState({activeClassChevron: !this.state.activeClassChevron})}/></a>
                                                </MDBCol>
                                                <MDBCol md={4} sm={4}
                                                        className={this.state.activeClassChevron ? "fv-chevronHide" : ''}>    {/*  activeClassChevron === true    "v"   */}
                                                    <a><i className="fas fa-chevron-up"
                                                          onClick={() => this.setState({activeClassChevron: !this.state.activeClassChevron})}/></a>
                                                </MDBCol>
                                            </MDBRow>
                                            {this.state.activeClassChevron ? '' : // gar roye felesh click shode bod
                                                <div>
                                                    <NavLink to={'/MainProfilePages/myAccommodation'}
                                                             activeClassName={"fv-reservationActive"}><p
                                                        className={'fv-ProfilePageUserInfoDetailsOption'}
                                                        onClick={() => this.setState({updateAvatarEdit: false})}>اقامت
                                                        گاه های
                                                        من</p></NavLink>
                                                    <NavLink to={'/MainProfilePages/profileReservations'}
                                                             activeClassName={"fv-reservationActive"}><p
                                                        className='fv-ProfilePageUserInfoDetailsOption'
                                                        onClick={() => this.setState({updateAvatarEdit: false})}>رزرو
                                                        های
                                                        درخواستی</p></NavLink>
                                                    <NavLink to={'/MainProfilePages/ProfilePageCommentsHandle'}
                                                             activeClassName={"fv-reservationActive"}><p
                                                        className={'fv-ProfilePageUserInfoDetailsOption'}
                                                        onClick={() => this.setState({updateAvatarEdit: false})}> نظرات
                                                        مهمان
                                                        ها</p></NavLink>
                                                    <NavLink to={'/MainProfilePages/ProfilePageCalendarHandle'}
                                                             activeClassName={"fv-reservationActive"}><p
                                                        className={'fv-ProfilePageUserInfoDetailsOption'}
                                                        onClick={() => this.setState({updateAvatarEdit: false})}>تقویم
                                                        من</p>
                                                    </NavLink>
                                                </div>
                                            }
                                            <NavLink to={'/MainProfilePages/ProfileWallet'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fas fa-wallet"/>مدیریت مالی ویلاها</p></NavLink>
                                            <NavLink to={'/MainProfilePages/ProfilePageChargeWallet'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fas fa-wallet"/>شارژ کیف پول</p></NavLink>
                                            <NavLink to={'/MainProfilePages/profileWalletRequestWithdraw'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fas fa-chart-bar"/>درخواست برداشت</p></NavLink>
                                            <NavLink to={'/MainProfilePages/Profile'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: true})}><i
                                                className="fas fa-user"/>ویرایش پروفایل</p></NavLink>
                                            <NavLink to={'/MainProfilePages/profileFavoritesPage'}
                                                     activeClassName={"fv-reservationActive"}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fa fa-heart"/>علاقه مندی ها</p></NavLink>
                                            <a onClick={() => {
                                                window.location.replace(`/`);
                                            }}><p
                                                onClick={() => this.setState({updateAvatarEdit: false})}><i
                                                className="fas fa-sign-out-alt"/>خروج</p></a>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>


                                <ScrollToTop/> {/*  scroll to top page */}

                                {!this.state.onclickHandel ?
                                    <>
                                        <Route exact path={'/MainProfilePages/ProfileMyReservation'}
                                               component={ProfilePageReservation2}/>


                                        <Route exact path={'/MainProfilePages/ProfileMyTransaction'}
                                               component={ProfilePageTransaction2}/>
                                        <Route exact path={'/MainProfilePages/ProfilePageTransactionEmpty'}
                                               component={ProfilePageTransactionEmpty}/>

                                        <Route exact path={'/MainProfilePages/myAccommodation'}
                                               component={MyAccommodationPage}/>
                                        <Route exact path={'/MainProfilePages/AnotherPagesEmpty'}
                                               component={AnotherPagesEmpty}/>

                                        <Route exact path={'/MainProfilePages/profileReservations'}
                                               component={ProfilePageReservationsRequested}/>
                                        <Route exact path={'/MainProfilePages/ProfilePageReservationEmpty'}
                                               component={ProfilePageReservationEmpty}/>

                                        <Route exact path={'/MainProfilePages/ProfilePageCommentsHandle'}
                                               component={ProfilePageCommentsHandle}/>
                                        <Route path={'/MainProfilePages/profileShowGuestComments/:id'}
                                               component={ProfilePageGustComments2}/> {/* profileGustComments2 */}
                                        <Route exact path={'/MainProfilePages/profileGuestComments'}
                                               component={PrfilePageGustComments}/> {/* profileGustComments */}

                                        <Route exact path={'/MainProfilePages/ProfilePageCalendarHandle'}
                                               component={ProfilePageCalendarHandle}/>
                                        <Route exact path={'/MainProfilePages/profileCalender/:id'}
                                               component={ProfilePageCalender}/>
                                        <Route exact path={'/MainProfilePages/ProfilePageCalendarEmpty'}
                                               component={ProfilePageCalendarEmpty}/>

                                        <Route exact path={'/MainProfilePages/ProfileWallet'}
                                               component={ProfilePageWallet}/>
                                        <Route exact path={'/MainProfilePages/ProfileWalletTransactionRegistration'}
                                               component={ProfilePageWallet2}/>
                                        <Route exact path={'/MainProfilePages/ProfilePageWalletEdit/:id'}
                                               component={ProfilePageWalletEdit}/>

                                        <Route exact path={'/MainProfilePages/profileWalletRequestWithdraw'}
                                               render={(props) => (
                                                   <ProfilePageWallet3 ChangeAmountPrice={this.ChangeAmountPrice}
                                                   />
                                               )}/>

                                        <Route exact path={'/MainProfilePages/ProfilePageChargeWallet'}
                                               component={ProfilePageChargeWallet}/>

                                        <Route exact path={'/MainProfilePages/profile'} render={(props) => (
                                            <ProfilePage ChangeUserNameAndFamily={this.ChangeUserNameAndFamily}
                                                         ChangeUserAvatarSrc={this.ChangeUserAvatarSrc}
                                                         ChangeUserUsernameInfo={this.ChangeUserUsername}
                                            />
                                        )}/>

                                        <Route exact path={'/MainProfilePages/profileFavoritesPage'}
                                               component={ProfileFavoritesPage}/>


                                    </>
                                    :
                                    ''
                                }

                            </MDBRow>

                            <MDBRow>
                                <Footer/>
                            </MDBRow>

                        </MDBContainer>
                    </CookiesProvider>
                </BrowserRouter>
            </React.StrictMode>

        )
    }
}

export default MainProfilePages