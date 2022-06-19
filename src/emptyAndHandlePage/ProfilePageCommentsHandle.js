import React, {Component} from "react";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageReservation.scss"
import "../style/ProfilePageWallet.scss"
import "../style/ProfilePageGustComments2.scss"
import {getUserVillaComments, userVillas} from "../services/userService";
import "../style/profilePageCommentsHandler.scss"
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

class ProfilePageCommentsHandle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userVillas: [],
            villaId: '',
            comment: false,
            pushPage: '',
            villaIdFullComments: ''

        }
    }

    componentDidMount() {

        let existComment = false


        userVillas()
            .then(result => {
                if (result.data.data.length > 0) {
                    console.log(result)
                    this.setState({userVillas: result.data.data}, () => {
                        if (this.state.userVillas) { /// agar villaeii vojod dasht
                            this.state.userVillas.map(userVilla => {
                                getUserVillaComments(userVilla.id)    // برای هر ویلا که طرف دارد چک کن
                                    .then(res => {    // اگر ویلایی کامنت داشت برو داخل
                                        console.log(res)  // آی دی ویلایی که کامنت دارد را باید پاس بدهیم به مرحله بعد
                                        if (res.data.data.length > 0 && res.data.data !== "Something went wrong!") {
                                            existComment = true
                                            this.props.history.push(`/MainProfilePages/profileShowGuestComments/${userVilla.id}`)

                                        }
                                    })
                                    .catch(err => {
                                        console.log(err.response)
                                        //  this.props.history.push("/MainProfilePages/profileGuestComments")
                                    }) //.catch(err=>this.props.history.push("/profileGuestComments"))

                            })
                        } else {
                            if (existComment === false) {
                                // this.props.history.push("/ProfilePageCommentsEmpty")
                                // empty
                                this.props.history.push("/MainProfilePages/profileGuestComments")
                                // this.setState({villaIdFullComments:"guest"})
                            }

                        }

                    })

                } else {
                    this.props.history.push("/MainProfilePages/profileGuestComments")
                }

            })
            .catch(err => {
                console.log(err.response)
                //  this.props.history.push("/MainProfilePages/profileGuestComments")
            })


    }

    render() {
        console.log(this.state.comments)
        console.log(this.state.villaId)


        return (
            <>
                {WaitingLoadingProfilePage(true, "fv-waitingLoadPublicFullScreen")}
            </>


        )


    }
}

export default ProfilePageCommentsHandle