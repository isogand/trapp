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
import {getUserVillaComments, replayComment, userTransactions, userVillas} from "../services/userService";
import {fas} from "@fortawesome/free-solid-svg-icons";
import ProfilePageGustComments2 from "../pages/PrfilePageGustComments2"
import PrfilePageGustComments from "../pages/PrfilePageGustComments";
import "../style/profilePageCommentsHandler.scss"
import {villaPrice} from "../services/villaService";
import ProfilePageReservation2 from "../pages/ProfilePageReservation2";
import ProfilePageReservationEmpty from "./ProfilePageReservationEmpty";
import ProfilePageTransaction2 from "../pages/ProfilePageTransaction2";
import ProfilePageTransactionEmpty from "./ProfilePageTransactionEmpty";
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";
import MyAccomodationProfilePageHandle from "./MyAccomodationProfilePageHandle";

class ProfilePageTransactionHandle extends Component {
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



        userTransactions()
            .then(res=>{
                if (res.data.data.length>0){
                   // this.setState({pushPage:"full"})
                    this.props.history.push(`/MainProfilePages/ProfileMyTransaction`)
                }else {
                   // this.setState({pushPage:"empty"})
                    this.props.history.push("/MainProfilePages/ProfilePageTransactionEmpty")
                }
            })
            .catch(err=>console.log(err.response))
    }

    render() {


        return(
            <>
                    { WaitingLoadingProfilePage(true , "fv-waitingLoadPublicFullScreen")}
            </>
        )


    }
}
export default ProfilePageTransactionHandle