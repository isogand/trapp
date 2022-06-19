import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import config from "../services/config.json";
import {Link} from "react-router-dom";
import "../style/headerSearch.scss"
import UserImage from "../images/user.png";
import MyaccommodationsIcon from "../images/icons/Folder.svg";
import Logout from "../images/icons/Logout.svg";
import FotterpageLogo from "../images/Logo.png"
import "../style/HeaderDisplay.scss"

class DisplayHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            ...this.state,
            ...this.props,
            searchResult: '',
            onclickHandel: false,
            onclickButtonHandle: true,

        }
    }

    render() {
        const info = JSON.parse(localStorage.getItem("infoUser"))
        let nameAndFamily = ""
        let avatar = ""
        let username
        if (info) {
            nameAndFamily = info.userInfo.fullname
            avatar = info.userInfo.avatar
            username = info.userInfo.trapp_id
        }
        return (
            <div
                className={"fv-footerMenu fv-footerDisplayPage fv-DisplayPage fv-profilePageUserInfo fv-DisplayHeader"}>
                <MDBRow className={' fv-footerDisplayPageBody'}>
                    <MDBCol md={2} className={"fv-homeIconDisplayPageBody"}>

                        {nameAndFamily ?
                            <a onClick={() => {
                                this.setState({onclickButtonHandle: !this.state.onclickButtonHandle})
                            }}>
                                <i className="fa fa-user-alt"/>
                                <a style={{marginRight: '2%'}}>{nameAndFamily}</a>
                            </a>
                            :
                            <a><Link style={{marginBottom: '0%'}} to={'/login'}><p><i
                                style={{marginLeft: '4%'}} className="fa fa-user-alt"/>ورود
                            </p></Link> </a>
                        }

                        <MDBContainer
                            className={localStorage.getItem("token") && this.state.onclickButtonHandle === false ? `fv-containerOptionMainPageRowTop fv-displayHeaderCascadeDesktop` : "fv-containerOptionMainPageRowTop fv-displayNoneLogin "}>
                            <MDBRow className={"fv-cascadeOptionMainPageRowTop fv-cascadeOptionMainPageRowTopMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <MDBRow>
                                        <MDBCol md={2} sm={2}>
                                            <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/>
                                        </MDBCol>
                                        <MDBCol className={"fv-textInToCascadeOptionMainPage"} md={8} sm={8}>
                                            <MDBRow>
                                                <MDBCol md={12}>
                                                    <a><h6>{nameAndFamily}</h6></a>
                                                </MDBCol>

                                            </MDBRow>
                                            <MDBRow className={"fv-visitProfile"}>
                                                <MDBCol md={12}>
                                                    <Link><a>{username} @ </a></Link>
                                                </MDBCol>

                                            </MDBRow>

                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/MainProfilePages/Profile"}><i className="fas fa-user" style={{
                                        marginRight: '20px',
                                        marginLeft: '7px'
                                    }}/>
                                        <a><p>مشاهده حساب کاربری</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/MainProfilePages/myAccommodation"}> <img
                                        style={{marginRight: '15px', marginLeft: '5px'}} src={MyaccommodationsIcon}/>
                                        <a><p>اقامت گاه های من</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/MainProfilePages/ProfileMyReservation"}> <img
                                        style={{marginRight: '15px', marginLeft: '5px'}} src={MyaccommodationsIcon}/>
                                        <a><p>رزور های من</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/hostStepBasicInformation"}>
                                        <i style={{marginRight: '15px', marginLeft: '5px'}}
                                           className="fa fa-laptop-house"/>
                                        <a onClick={() => {
                                            localStorage.removeItem("step1")
                                            localStorage.removeItem("step2")
                                            localStorage.removeItem("step2-2")
                                            localStorage.removeItem("step3")
                                            localStorage.removeItem("step4")
                                            localStorage.removeItem("step5")
                                            localStorage.removeItem("step5-2")
                                            localStorage.removeItem("editCode")
                                        }}><p>میزبان شوید</p></a> </Link>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus"}>
                                <MDBCol md={12} sm={12}>
                                    <a onClick={() => {
                                        localStorage.clear()
                                        this.props.history.push("/")
                                    }}> <img style={{marginRight: '15px', marginLeft: '5px'}} src={Logout}/>
                                        <p>خروج از حساب کاربری</p></a>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>

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
                        <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}
                             onClick={() => {
                                 this.setState({onclickHandel: !this.state.onclickHandel})
                             }}/>
                    </MDBCol>
                    {/*  <MDBCol sm={1} className={this.state.onclickHandel ? "fv-DisplayPageLoginSignMobile": "fv-hideMenu"} >
                        <i className="fas fa-caret-up" onClick={()=>{
                            this.setState({onclickHandel:!this.state.onclickHandel})
                        }}/>
                    </MDBCol>
                    <MDBCol sm={1} className={this.state.onclickHandel ? "fv-hideMenu" : "fv-DisplayPageLoginSignMobile"} >
                        <i className="fas fa-caret-left" onClick={()=>{
                            this.setState({onclickHandel:!this.state.onclickHandel})
                        }}/>
                    </MDBCol> */}
                    <MDBCol md={6} sm={9} className={"menuMobile"}>
                        {/* img src={FotterpageLogo} className={"fv-DisplayPageSearchName"} */}
                        <a onClick={() => window.location.replace("/")}> <img src={FotterpageLogo}
                                                                              className={"fv-DisplayPageSearchLogo"}/>
                        </a>
                    </MDBCol>
                </MDBRow>


                <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage"}>
                    <MDBRow
                        className={this.state.onclickHandel && localStorage.getItem("token") ? "fv-ProfilePageLeftBody" : "fv-hideMenuDisplayMobile"}> {/* profile info for mobile             if user*/}
                        <MDBContainer className={`fv-containerOptionMainPageRowTop `}>
                            <MDBRow
                                className={"fv-cascadeOptionMainPageRowTop fv-cascadeOptionMainPageRowTopMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <MDBRow>
                                        <MDBCol md={2} sm={2}>
                                            <img
                                                src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/>
                                        </MDBCol>
                                        <MDBCol className={"fv-textInToCascadeOptionMainPage"} md={8}
                                                sm={8}>
                                            <MDBRow>
                                                <MDBCol md={12}>
                                                    <a><h6>{nameAndFamily}</h6></a>
                                                </MDBCol>

                                            </MDBRow>
                                            <MDBRow className={"fv-visitProfile"}>
                                                <MDBCol md={12}>
                                                    <Link><a>{username} @ </a></Link>
                                                </MDBCol>

                                            </MDBRow>

                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/MainProfilePages/Profile"}><i className="fas fa-user" style={{
                                        marginRight: '20px',
                                        marginLeft: '7px'
                                    }}/>
                                        <a><p>مشاهده حساب کاربری</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/MainProfilePages/myAccommodation"}> <img
                                        style={{marginRight: '15px', marginLeft: '5px'}}
                                        src={MyaccommodationsIcon}/>
                                        <a><p>اقامت گاه های من</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/MainProfilePages/ProfileMyReservation"}> <img
                                        style={{marginRight: '15px', marginLeft: '5px'}}
                                        src={MyaccommodationsIcon}/>
                                        <a><p>رزور های من</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow
                                className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus fv-userInfoButtonCascadeMobile"}>
                                <MDBCol md={12} sm={12}>
                                    <Link to={"/hostStepBasicInformation"}>
                                        <a onClick={() => {
                                            localStorage.removeItem("step1")
                                            localStorage.removeItem("step2")
                                            localStorage.removeItem("step2-2")
                                            localStorage.removeItem("step3")
                                            localStorage.removeItem("step4")
                                            localStorage.removeItem("step5")
                                            localStorage.removeItem("step5-2")
                                            localStorage.removeItem("editCode")
                                        }}><i className="fa fa-laptop-house"/>   <p>میزبان شوید</p></a>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow
                                className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus"}>
                                <MDBCol md={12} sm={12}>
                                    <a onClick={() => {
                                        localStorage.clear()
                                        this.props.history.push("/")
                                    }}> <img style={{marginRight: '15px', marginLeft: '5px'}}
                                             src={Logout}/>
                                        <p>خروج از حساب کاربری</p></a>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>

                    </MDBRow>

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

                    {/*   <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>

                        <MDBRow className={"fv-DisplayPageRotePathMobile"}>
                            <MDBCol>
                                <Link to={"/"}> <p> صفحه اصلی </p> </Link>
                                <i className="fas fa-chevron-left" />
                                <Link to={"/MainProfilePages/Profile"}><p className={this.props.thisPageName ? ""  : "fv-DisplayPagePathNow"}> پنل کاربری </p> </Link>
                                <i className={this.props.thisPageName ? "fas fa-chevron-left" : ""} />
                                <p className={this.props.thisPageName ? "fv-DisplayPagePathNow" : ""}> {this.props.thisPageName} </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>  */}
                </MDBContainer>
            </div>
        )
    }
}

export default DisplayHeader