import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FotterpageLogo from "../images/Logo.png"
import "../style/HeaderSteps.scss"
import config from "../services/config.json";
import {Link} from "react-router-dom";
import UserImage from "../images/user.png"
import MyaccommodationsIcon from "../images/icons/Folder.svg"
import Logout from "../images/icons/Logout.svg"


class HeaderSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideButtonLogin: true,
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

        return (
            <MDBContainer  className={"hostStepPage"}>
                <MDBRow className={'footerHostStep1Page'}>
                    <MDBCol md={3} sm={6}>
                        <a onClick={() => {
                            this.setState({hideButtonLogin: !this.state.hideButtonLogin})
                        }}> <img
                            src={info.userInfo.avatar ? `${config.webapi}/images/user/${info.userInfo.avatar}` : UserImage}/>

                            <a style={{fontSize: "1rem", fontWeight: "600"}}
                               className={"name_desktop"}>  {info.userInfo.fullname}</a> </a>
                    </MDBCol>
                    <MDBCol md={9} sm={6} className={""}>
                        <img src={FotterpageLogo} className={"hide_desktop"}/>
                    </MDBCol>

                    <MDBContainer
                        className={localStorage.getItem("token") ? `fv-containerOptionMainPageRowTop ${this.state.hideButtonLogin ? "fv-displayNoneLogin" : ""}` : "fv-containerOptionMainPageRowTop fv-displayNoneLogin "}>
                        <MDBRow className={"fv-cascadeOptionMainPageRowTop"}>
                            <MDBCol md={12} sm={12}>
                                <MDBRow className={"fv-cascadeOptionMainPageRowTopInner"}>
                                    <MDBCol md={2} sm={2}>
                                        <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/>
                                    </MDBCol>
                                    <MDBCol className={"fv-textInToCascadeOptionMainPage"} md={7} sm={8}>
                                        <MDBRow>
                                            <a><h6>{nameAndFamily}</h6></a>
                                        </MDBRow>
                                        <MDBRow>
                                            <Link to={"/MainProfilePages/Profile"}><a>مشاهده حساب کاربری</a></Link>
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
                                <Link to={"/hostStepBasicInformation"}> <i className="fa fa-laptop-house"/>
                                    <a><p>میزبان شوید</p></a> </Link>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus"}>
                            <MDBCol md={12} sm={12}>
                                <a onClick={() => {
                                    localStorage.clear()
                                    window.location.replace("/login");
                                }}> <img style={{marginRight: '15px', marginLeft: '5px'}} src={Logout}/>
                                    <p>خروج از حساب کاربری</p></a>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>


                </MDBRow>
                <MDBRow>
                    <MDBCol sm={10} className={"fv-HostStep1Path"}>
                        <Link to={'/'}><p> صفحه اصلی </p></Link>
                        <i className="fas fa-chevron-left"/>
                        <Link to={'/MainProfilePages/Profile'}><p> پنل کاربری </p></Link>
                        <i className="fas fa-chevron-left"/>
                        <p className={"fv-HostStepNow"}> ثبت اقامت گاه </p>
                    </MDBCol>
                    <MDBCol sm={2} className={"fv-HostStep1Path"}>
                        {/* <i className="fa fa-question-circle" aria-hidden="true" /> */}
                    </MDBCol>
                </MDBRow>

                <MDBRow className={"fv-headerHomeImage"}>
                    <MDBCol md={1} className={"selectedIcon"}>
                        <i className="fas fa-home"/>
                        <p className={"text_mobile"}>اطلاعات اولیه</p>
                    </MDBCol>
                    <MDBCol md={1}>
                        <div className="slider_pagination">
                            <button className="btn_mobile slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="btn_mobile slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="btn_mobile slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="btn_mobile slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="btn_mobile slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="slider_pagination_btn slider_pagination_btn--sel"/>
                            <button className="slider_pagination_btn slider_pagination_btn--sel"/>
                        </div>
                    </MDBCol>
                    <MDBCol md={1} className={"unselectedIcon fv-hostStep2PageSelectIcon"}>
                        <i className="fas fa-map-marker-alt"/>
                        <p className={"text_mobile"}>آدرس</p>
                    </MDBCol>
                    <MDBCol md={1}>
                        <div className="slider_pagination">
                            <button className="btn_mobile slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep2PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep2PageSelect"/>
                        </div>
                    </MDBCol>
                    <MDBCol md={1} className={"unselectedIcon fv-hostStep3PageSelectIcon"}>
                        <i className="fa fa-align-left"/>
                        <p className={"text_mobile"}>مشخصات اقامت گاه</p>
                    </MDBCol>
                    <MDBCol md={1}>
                        <div className="slider_pagination">
                            <button className="btn_mobile slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep3PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep3PageSelect"/>
                        </div>
                    </MDBCol>
                    <MDBCol md={1} className={"unselectedIcon fv-hostStep4PageSelectIcon"}>
                        <i className="fa fa-gopuram"/>
                        <p className={"text_mobile"}>امکانات اقامت گاه</p>
                    </MDBCol>
                    <MDBCol md={1}>
                        <div className="slider_pagination">
                            <button className="btn_mobile slider_pagination_btn fv-hostStep4PageSelect "/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep4PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep4PageSelect"/>
                        </div>
                    </MDBCol>
                    <MDBCol md={1} className={"unselectedIcon  fv-hostStep5PageSelectIcon"}>
                        <i className="fas fa-dollar-sign"/>
                        <p className={"text_mobile"}>قیمت گذاری</p>
                    </MDBCol>
                    <MDBCol md={1}>
                        <div className="slider_pagination">
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep5PageSelect"/>
                            <button className="slider_pagination_btn fv-hostStep5PageSelect"/>
                        </div>
                    </MDBCol>
                    <MDBCol md={1} className={"unselectedIcon fv-hostStep5Page2SelectIcon"}>
                        <i className="fas fa-exclamation-triangle"/>
                        <p className={"text_mobile"}>قوانین</p>
                    </MDBCol>
                    <MDBCol md={1}>
                        <div className="slider_pagination">
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="btn_mobile slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="slider_pagination_btn fv-hostStep5Page2Select"/>
                            <button className="slider_pagination_btn fv-hostStep5Page2Select"/>
                        </div>
                    </MDBCol>
                    <MDBCol md={1} className={"unselectedIcon fv-hostStep5Page3SelectIcon"}>
                        <i className="fa fa-file-image"/>
                        <p className={"text_mobile"}>تصاویر</p>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        )
    }
}

export default HeaderSteps
