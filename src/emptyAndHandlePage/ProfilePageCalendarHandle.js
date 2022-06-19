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
import {getUserVillaComments, replayComment, userVillas} from "../services/userService";
import {fas} from "@fortawesome/free-solid-svg-icons";
import ProfilePageGustComments2 from "../pages/PrfilePageGustComments2"
import PrfilePageGustComments from "../pages/PrfilePageGustComments";
import "../style/profilePageCommentsHandler.scss"
import {villaPrice} from "../services/villaService";
import ProfilePageCalender from "../pages/ProfilePageCalender";
import ProfilePageCalendarEmpty from "./ProfilePageCalendarEmpty";
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

class ProfilePageCalendarHandle extends Component {
    constructor(props) {
        super(props);
        this.state={
            userVillas:[],
            villaId:'',
            comment:false,
            villaPrice:[],
            villaIdFullCalendar:''

        }
    }

    componentDidMount() {




        userVillas()
            .then(result=>{
                if(result.data.data.length>0){
                    this.setState({userVillas:result.data.data} , ()=>{
                        if(this.state.userVillas){ /// agar villaeii vojod dasht
                            this.state.userVillas.map(userVilla => {
                                villaPrice(userVilla.id)
                                    .then(res=>{
                                        console.log(Object.values(res.data).length)
                                        if( Object.values(res.data)[0] !== null){
                                            this.setState({villaPrice: Object.values(res.data) , villaId:userVilla.id } , () =>{
                                                this.props.history.push(`/MainProfilePages/profileCalender/${userVilla.id}`)
                                                // this.setState({villaIdFullCalendar:userVilla.id})
                                            })
                                        }
                                    })
                                    .catch(err=>console.log(err.response))  // this.props.history.push("/ProfilePageCalendarEmpty")
                            })
                        }else {
                            this.props.history.push("/MainProfilePages/ProfilePageCalendarEmpty")
                            // empty
                            // this.setState({villaIdFullCalendar:"guest"})
                        }

                    })
                }else {
                    this.props.history.push("/MainProfilePages/ProfilePageCalendarEmpty")
                }

            })



    }

    render() {
     //   console.log(this.state.comments)
      //  console.log(this.state.villaId)


        return(
            <>
                { WaitingLoadingProfilePage(true , "fv-waitingLoadPublicFullScreen")}
            </>


        )


    }
}
export default ProfilePageCalendarHandle