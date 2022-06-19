import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageTransaction2.scss"
import "../style/MyAccommodationPage.scss"
import AccommmodationProduct from "../componentsPages/AccomodationProduct";
import {userVillas} from "../services/userService";
import config from "../services/config.json";
import "../style/scroolBodyProfilePages.scss"
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

class MyAccommodationPage extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            userVillas: [],


            villaId: '',
            waitingForLoad: true,
        }
    }

    componentDidMount() {
        userVillas()
            .then(res => {
                if (res.data && res.data.data.length > 0) {
                    this.setState({userVillas: res.data.data, waitingForLoad: false})
                } else {
                    this.props.history.push("/MainProfilePages/AnotherPagesEmpty")
                }
            })
    }

    render() {
        return (
            <>

                {this.state.waitingForLoad ? WaitingLoadingProfilePage(this.state.waitingForLoad, "fv-waitingLoadPublicFullScreen")
                    :
                    <div
                        className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2 fv-ProfilePageTransaction fv-ProfilePageTransaction2 fv-MyAccommodationPage"}>

                        <div className={"fv-ProfilePageLeftBody"}>

                            <MDBCol md={8} sm={12}
                                    className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>

                                <MDBRow className={"fv-addMyAccommodation"}>
                                    <MDBCol md={9} sm={6}>
                                        <h5 className={"fv-ProfilePageCalenderTextMobile"}>اقامتگاه های من</h5>
                                    </MDBCol>
                                    <MDBCol md={1} sm={6}>
                                        <MDBCol md={2} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                            <input type="button" value="ایجاد اقامتگاه جدید" onClick={() => {
                                                localStorage.removeItem("step1")
                                                localStorage.removeItem("step2")
                                                localStorage.removeItem("step2-2")
                                                localStorage.removeItem("step3")
                                                localStorage.removeItem("step4")
                                                localStorage.removeItem("step5")
                                                localStorage.removeItem("step5-2")
                                                localStorage.removeItem("editCode")
                                                window.location.replace('/hostStepBasicInformation')
                                            }}/>
                                        </MDBCol>

                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>

                                    {this.state.userVillas.map(userVilla => {
                                        // console.log(userVilla)
                                        let md = ''
                                        let classNameActiveTopRightIn = ""
                                        let classNameActiveTopLeftIn = ""
                                        let classNameActiveBottonRightIn = ""
                                        let classNameActiveBottonLeftIn = ""
                                        let classNameActiveButtonIn = ""
                                        if (userVilla.status === "در انتظار تایید") {
                                            md = 7
                                        }
                                        if (userVilla.status === "غیر فعال") {
                                            md = 5
                                            classNameActiveTopRightIn = "fv-myAccommodationPageActiveButton"

                                        }
                                        if (userVilla.status === "تایید شد") {
                                            md = 4
                                            classNameActiveTopRightIn = "fv-myAccommodationPageActiveButton"
                                            classNameActiveTopLeftIn = "fv-myAccommodationPageActiveButton"
                                            classNameActiveBottonRightIn = "fv-myAccommodationPageActiveButton"
                                            classNameActiveBottonLeftIn = "fv-myAccommodationPageActiveButton"
                                            classNameActiveButtonIn = "fv-myAccommodationPageActiveButton"
                                        }
                                        return (
                                            <AccommmodationProduct
                                                md={md}
                                                status={userVilla.status}
                                                title={userVilla.title}
                                                code={userVilla.id}
                                                mainImg={`${config.webapi}/images/villas/thum/${userVilla.main_img}`}
                                                classNameActiveTopRight={classNameActiveTopRightIn}
                                                classNameActiveTopLeft={classNameActiveTopLeftIn}
                                                classNameActiveBottonRight={classNameActiveBottonRightIn}
                                                classNameActiveBottonLeft={classNameActiveBottonLeftIn}
                                                classNameActiveButton={classNameActiveButtonIn}
                                                pageSwitch={this.pageThatSwitch}
                                                {...this.props}/>
                                        )
                                    })}


                                </MDBRow>

                            </MDBCol>
                        </div>

                    </div>
                }
            </>

        )
    }
}

export default MyAccommodationPage