import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import config from "../services/config.json";
import FotterpageLogo from "../images/Logo.png";
import React from "react";
import "../style/SearchHomePage.css"
import "../style/headerLoginMenu.scss"
import UserImage from "../images/user.png"
import MyaccommodationsIcon from "../images/icons/Folder.svg";
import Logout from "../images/icons/Logout.svg";

class HeaderLoginMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            onclickButtonHandle: true,
        }

    }

    render() {
        const info = JSON.parse(localStorage.getItem("infoUser"))
        let nameAndFamily = ""
        let avatar = ""
        if (info) {
            nameAndFamily = info.userInfo.fullname
            avatar = info.userInfo.avatar
        }

        return <MDBContainer className={"fv-SearchHomePage headerLoginMenu"}>
            <MDBContainer className={'fv-SearchHomePageBodyMobile fv-footerMenu main'}>
                <MDBRow className={'fv-footerMenuRibbonMobile'}>   {/* mobile menu */}
                    <MDBCol sm={8} className={'fv-footerMenuImageMobile'}>
                        <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage} onClick={() => {
                            this.setState({onclickHandelMobileMenu: !this.state.onclickHandelMobileMenu})
                        }}/>
                    </MDBCol>
                    <MDBCol md={6} sm={9} className={"menuMobile"}>
                        {/* img src={FotterpageLogo} className={"fv-DisplayPageSearchName"} */}
                        <a onClick={() => window.location.replace("/")}> <img src={FotterpageLogo}
                                                                              className={"fv-DisplayPageSearchLogo"}/>
                        </a>
                    </MDBCol>
                </MDBRow>

                <MDBContainer
                    className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage"}>     {/* mobile menu  gust or host  display menu*/}

                    <MDBRow
                        className={this.state.onclickHandelMobileMenu && localStorage.getItem("token") ? "fv-ProfilePageLeftBody fv-hostUsersMenuSearchPage" : "fv-hideMenuSearchPageMobile"}> {/* profile info for mobile             if user*/}

                        <MDBContainer className={`fv-containerOptionMainPageRowTop `}>
                            <MDBRow className={"fv-cascadeOptionMainPageRowTop"}>
                                <MDBCol md={12} sm={12}>
                                    <MDBRow>
                                        <MDBCol md={2} sm={2}>
                                            <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/>
                                        </MDBCol>
                                        <MDBCol className={"fv-textInToCascadeOptionMainPage"} md={12} sm={12}>
                                            <MDBRow className={"fv-textInToCascadeOptionHeaderLoginNameAnFamily"}>
                                                <MDBCol>
                                                    <a><h6>{nameAndFamily}</h6></a>
                                                </MDBCol>

                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol>
                                                    <Link to={"/MainProfilePages/Profile"}><a>مشاهده حساب
                                                        کاربری</a></Link>
                                                </MDBCol>

                                            </MDBRow>

                                        </MDBCol>
                                    </MDBRow>
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
                                        }}> <i className="fa fa-laptop-house"/>  <p>میزبان شوید</p></a> </Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus"}>
                                <MDBCol md={12} sm={12}>
                                    <a onClick={() => {
                                        localStorage.clear()
                                        window.location.reload();
                                    }}> <img style={{marginRight: '15px', marginLeft: '5px'}} src={Logout}/>
                                        <p>خروج از حساب کاربری</p></a>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>

                    </MDBRow>

                    <MDBRow
                        className={this.state.onclickHandelMobileMenu && !localStorage.getItem("token") ? "fv-ProfilePageLeftBody fv-gustUsersMenuSearchPage fv-ProfilePageUserInfoBodySearchPage" : "fv-hideMenuSearchPageMobile"}> {/* profile info for mobile            if gust*/}
                        <MDBCol md={3} className={""}>
                            <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                    <Link to={'/login'}><p
                                        className={window.location.href.match(/\blogin\b/) ? "fv-reservationActive" : ''}>
                                        <i className="fa fa-door-open"/>ورود</p></Link>
                                    {/* <Link to={'/registration'}> <p className={ window.location.href.match(/\bregistration\b/) ? "fv-transaction" : ''}  ><i className="fa fa-address-card" />ثبت نام</p> </Link> */}
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>


            </MDBContainer>

            <MDBRow className={'fv-footerMenuRibbon'}>
                <MDBCol md={1}>
                    <i className={localStorage.getItem("token") ? "" : "fa fa-user-alt"}/>
                    <a className={localStorage.getItem("token") ? "fv-hideButtonRegister" : ""}> <Link
                        to={'/login'}>ورود</Link></a>
                </MDBCol>
                <MDBCol md={2} className={"fv-footerMenuRibbonButton"}>
                    <input className={localStorage.getItem("token") ? "" : "fv-hideButtonRegister"} type='button'
                           value=' میزبان شوید' onClick={() => {
                        localStorage.removeItem("step1")
                        localStorage.removeItem("step2")
                        localStorage.removeItem("step2-2")
                        localStorage.removeItem("step3")
                        localStorage.removeItem("step4")
                        localStorage.removeItem("step5")
                        localStorage.removeItem("step5-2")
                        localStorage.removeItem("editCode")
                        this.props.history.push('/hostStepBasicInformation')
                    }}/>
                </MDBCol>
                <MDBCol md={9}>
                    <img src={FotterpageLogo}/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    }
}

export default HeaderLoginMenu