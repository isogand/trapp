import React, {Component} from "react";
import {MDBAlert, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageReservation.scss"
import "../style/ProfilePageWallet.scss"
import "../style/ProfilePageGustComments2.scss"
import Footer from "../componentsPages/footer"
import MobileLogo from "../images/MobileLogo.png"
import HeaderSearch from "../componentsPages/HeaderSearch";
import ProfilePageUserInfo from "../componentsPages/ProfilePageUserInfo";
import {
    allReservationsRequested,
    getUserVillaComments,
    replayComment,
    userReserves,
    userTransactions,
    userVillas
} from "../services/userService";
import {fas} from "@fortawesome/free-solid-svg-icons";
import ProfilePageGustComments2 from "../pages/PrfilePageGustComments2"
import PrfilePageGustComments from "../pages/PrfilePageGustComments";
import "../style/profilePageCommentsHandler.scss"
import {villaPrice} from "../services/villaService";
import ProfilePageReservation2 from "../pages/ProfilePageReservation2";
import ProfilePageReservationEmpty from "./ProfilePageReservationEmpty";
import ProfilePageReservationsRequested from "../pages/ProfilePageReservationsRequested";
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";
import MyAccommodationPage from "../pages/MyAccommodationPage";

class ProfilePageReservationRequestedHandle extends Component {
    constructor(props) {
        super(props);
        this.state={
            userVillas:[],
            villaId:'',
            comment:false,
            villaPrice:[],
            pushPage:'',

        }
    }

    componentDidMount() {

        allReservationsRequested()
            .then(res=>{
                if (res.data.data.length>0){
                   // this.setState({pushPage:"full"})
                     this.props.history.push(`/MainProfilePages/profileReservations`)
                }else {
                    // this.setState({pushPage:"empty"})
                     this.props.history.push("/MainProfilePages/ProfilePageReservationEmpty")
                }
            })
            .catch(err=>console.log(err.response))

    }

    render() {


        return(
            <>
                {WaitingLoadingProfilePage(true , "fv-waitingLoadPublicFullScreen")}
            </>
        )


    }
}
export default ProfilePageReservationRequestedHandle