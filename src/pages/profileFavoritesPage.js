import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePage.scss"
import "../style/ProfilePageWallet2.scss"
import "../style/profileFavoritesPage.scss"
import config from "../services/config.json";
import ProductFavorites from "../componentsPages/ProductFavorites";
import {favorites} from "../services/userService";
import {WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";

const commaNumber = require('comma-number')

class ProfilePageWallet2 extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            favoriteData: [],
            sourceOfTransaction: '',
            transactionAmount: '',
            transactionDate: '',
            transactionDescription: '',

            loadingPageWaiting: true,


        }
    }

    componentDidMount() {
        favorites()
            .then(res => this.setState({favoriteData: res.data.data, loadingPageWaiting: false}))
    }

    render() {
        return (
            <>
                {this.state.loadingPageWaiting ?
                    WaitingLoadingProfilePage(true, "fv-waitingLoadPublicFullScreen")
                    :
                    <div
                        className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageTransaction fv-ProfilePageTransaction2 fv-ProfilePageWallet fv-ProfilePageWallet2 fv-profileFavoritesPage"}>

                        <div className={"fv-ProfilePageLeftBody"}>


                            <MDBCol md={8} sm={12}
                                    className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                                <h5>علاقه مندی های من</h5>


                                <MDBRow className={"fv-"}>

                                    {this.state.favoriteData.map(favoritedatas => {
                                        if (favoritedatas.details)   ///// ///// ///// ///// ///// //// /// باید حذف شود   //// //// //
                                            return <MDBCol md={4} sm={12} className={"fv-ProfilePageUserSetInfo"}>
                                                <ProductFavorites
                                                    srcImage={`${config.webapi}/images/villas/thum/${favoritedatas.main_img}`}
                                                    rate={favoritedatas.score}
                                                    topic={favoritedatas.title}
                                                    location={favoritedatas.city}
                                                    numberOfRoom={favoritedatas.details.bedroom}
                                                    capacity={favoritedatas.details.max_capacity}
                                                    price={commaNumber(favoritedatas.rules.normal_cost)}
                                                    id={favoritedatas.id}

                                                />
                                            </MDBCol>
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

export default ProfilePageWallet2