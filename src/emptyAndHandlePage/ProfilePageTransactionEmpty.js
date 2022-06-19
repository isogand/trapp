import React, {Component} from "react";
import {MDBAlert, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation.scss"
import Footer from "../componentsPages/footer"
import Logo from "../images/Logo.png";
import HeaderSearch from "../componentsPages/HeaderSearch";
import ProfilePageUserInfo from "../componentsPages/ProfilePageUserInfo";
import {EmptyImagesPage} from "./emptyImages";

class ProfilePageCalendarEmpty extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageTransaction"}>
                <MDBRow className={"fv-ProfilePageLeftBody"}>

                    <EmptyImagesPage
                        title ="تراکنش های من"
                        text="شما تاکنون تراکنشی نداشته اید"
                        image={Logo}/>
                </MDBRow>


            </MDBContainer>
        )}
}
export default ProfilePageCalendarEmpty