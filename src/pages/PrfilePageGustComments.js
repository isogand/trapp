import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation.scss"
import Logo from "../images/Logo.png";

class PrfilePageGustComments extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <MDBContainer
                className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageTransaction fv-ProfilePageGustComments"}>

                <MDBRow className={"fv-ProfilePageLeftBody"}>


                    <MDBCol md={8} sm={12} className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                        <h6>نظرات مهمان ها</h6>

                        <MDBRow className={"fv-ProfilePageReservationImage"}>
                            <MDBCol md={12}>
                                <p>شما نظری ندارید</p>
                                <img src={Logo}/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        )
    }
}

export default PrfilePageGustComments