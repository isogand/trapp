import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import React, {Component} from "react";
import Dribble from "../images/Dribbble.svg";
import Instagram from "../images/Instagram.svg";
import Twitter from "../images/Twitter.svg";
import Youtube from "../images/Youtube.svg";
import logo from "../images/logo 1.png";
import kasbokar from "../images/7ab277c5-bb3a-4b86-858c-1cea6360c878 1.png"

class footer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MDBContainer>
                <MDBRow className={"fv-footerMainPage fv-footerMenus"}>
                    <MDBCol md={5}>
                        <a referrerPolicy="origin" target="popup"
                           style={{display: 'contents'}}
                           href="https://trustseal.enamad.ir/?id=232007&amp;Code=YjvgJ3CnEQ0RMqBDf7xX"><img
                            className={"fv-footerMainPageBigger"}
                            referrerPolicy="origin"
                            // src="https://Trustseal.eNamad.ir/logo.aspx?id=232007&amp;Code=YjvgJ3CnEQ0RMqBDf7xX" alt=""
                            src={logo}
                            style={{cursor: 'pointer'}} id="YjvgJ3CnEQ0RMqBDf7xX"/>
                        </a>
                        {/*<a referrerPolicy="origin" target="popup"*/}
                        {/*   style={{display: 'contents'}}*/}
                        {/*   href="https://trustseal.enamad.ir/?id=232007&amp;Code=YjvgJ3CnEQ0RMqBDf7xX"><img*/}
                        {/*    className={"fv-footerMainPageBigger"}*/}
                        {/*    referrerPolicy="origin"*/}
                        {/*    // src="https://Trustseal.eNamad.ir/logo.aspx?id=232007&amp;Code=YjvgJ3CnEQ0RMqBDf7xX" alt=""*/}
                        {/*    src={kasbokar}*/}
                        {/*    style={{cursor: 'pointer'}} id="YjvgJ3CnEQ0RMqBDf7xX"/>*/}
                        {/*</a>*/}
                        {/*<img className={"fv-footerMainPageBigger"} src={Dribble} width="50" height="50"/>*/}
                        <img className={"fv-footerMainPageSmaller"} src={Twitter} width="15" height="15"/>
                        <img className={"fv-footerMainPageSmaller"} src={Instagram} width="15" height="15"/>
                        <img className={"fv-footerMainPageSmaller"} src={Dribble} width="15" height="15"/>
                        <img className={"fv-footerMainPageSmaller"} src={Youtube} width="15" height="15"/>
                    </MDBCol>
                    <MDBCol md={7}>
                        <a>حقوق کاربران</a>
                        <a>قوانین ترپ</a>
                        <a>تماس با پشتیبانی</a>
                        <a>درباره ترپ</a>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-footerMainPage fv-footerMenuMobile"}>
                    <MDBRow className={"fv-footerMenuMobileTitle"}>
                        <MDBCol sm={5}>
                            <a>حقوق کاربران</a>
                        </MDBCol>
                        <MDBCol sm={4}>
                            <a>قوانین ترپ</a>
                        </MDBCol>
                        <MDBCol sm={5}>
                            <a>تماس با پشتیبانی</a>
                        </MDBCol>
                        <MDBCol sm={4}>
                            <a>درباره ترپ</a>
                        </MDBCol>
                    </MDBRow>

                    <MDBCol sm={12}>
                        <MDBRow  className={"fv-footerMainPageBigger"}>
                            <MDBCol sm={4}>
                                <a referrerPolicy="origin" target="popup"
                                   style={{display: 'contents'}}
                                    href="https://trustseal.enamad.ir/?id=232007&amp;Code=YjvgJ3CnEQ0RMqBDf7xX"><img
                                    className={"fv-footerMainPageBigger"}
                                    referrerPolicy="origin"
                                    src={logo}
                                    alt=""
                                    style={{cursor: 'pointer'}} id="YjvgJ3CnEQ0RMqBDf7xX"/></a>
                            </MDBCol>
                            <MDBCol sm={3}>
                                <a referrerPolicy="origin" target="popup"
                                   style={{display: 'contents'}}
                                   href="https://trustseal.enamad.ir/?id=232007&amp;Code=YjvgJ3CnEQ0RMqBDf7xX"><img
                                    className={"fv-footerMainPageBigger"}
                                    referrerPolicy="origin"
                                    src={kasbokar}
                                    alt=""
                                    style={{cursor: 'pointer'}} id="YjvgJ3CnEQ0RMqBDf7xX"/></a>
                            </MDBCol>
                            {/*<MDBCol sm={2}>*/}
                            {/*    <img src={Dribble} width="50" height="50"/>*/}
                            {/*</MDBCol>*/}
                        </MDBRow>
                        <MDBRow className={"fv-footerMainPageBigger"}>
                            <MDBCol sm={1} className={"fv-footerMainPageSmaller"}>
                                <img src={Twitter} width="15" height="15"/>
                            </MDBCol>
                            <MDBCol sm={1} className={"fv-footerMainPageSmaller"}>
                                <img src={Instagram} width="15" height="15"/>
                            </MDBCol>
                            <MDBCol sm={1} className={"fv-footerMainPageSmaller"}>
                                <img src={Dribble} width="15" height="15"/>
                            </MDBCol>
                            <MDBCol sm={1} className={"fv-footerMainPageSmaller"}>
                                <img src={Youtube} width="15" height="15"/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        );
    }
}

export default footer