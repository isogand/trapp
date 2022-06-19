import React from 'react';
import ReactDOM from 'react-dom';


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


import './font/fonts/ttf/IRANSansWeb.ttf'
import './font/fonts/css.css';
import './Main1.css'
import './Main2.css'
import './style/Product.css'
import MainPage from './pages/MainPage';
import DisplayPage from "./pages/DisplayPage"
import SearchHomePage from './pages/SearchHomePage';
import HostStep1Page from "./pages/HostStep1Page";
import HostStep2Page from "./pages/HostStep2Page";
import HostStep2Page2 from "./pages/HostStep2Page2";
import HostStep3Page from "./pages/HostStep3Page";
import HostStep4Page from "./pages/HostStep4Page";
import HostStep5Page from "./pages/HostStep5Page";
import HostStep5Page2 from "./pages/HostStep5Page2";
import HostStep5Page3 from "./pages/HostStep5Page3";
import ProfilePage from "./pages/ProfilePage";
import ProfilePageReservation from "./pages/ProfilePageReservation";
import ProfilePageReservation2 from "./pages/ProfilePageReservation2";
import ProfilePageTransaction from "./pages/ProfilePageTransaction";
import ProfilePageTransaction2 from "./pages/ProfilePageTransaction2";
import ProfilePageTransaction3 from "./pages/ProfilePageTransaction3";
import MyAccommodationPage from "./pages/MyAccommodationPage"
import ProfilePageWallet from "./pages/ProfilePageWallet";
import ProfilePageWallet2 from "./pages/ProfilePageWallet2";
import ProfilePageWallet3 from "./pages/ProfilePageWallet3";
import PrfilePageGustComments from "./pages/PrfilePageGustComments";
import ProfilePageReservationsRequested from "./pages/ProfilePageReservationsRequested";
import FactorPage from "./pages/FactorPage";
import LoginPage from "./pages/LoginPage";
import LoginPage2 from "./pages/LoginPage2";
import LoginPage3 from "./pages/LoginPage3";
import NotFoundPage from "./emptyAndHandlePage/NotFoundPage"
import AddComments from "./pages/addComments"
import ProfileFavoritesPage from "./pages/profileFavoritesPage"
import {CookiesProvider} from 'react-cookie';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import ProfilePageCommentsHandle from "./emptyAndHandlePage/ProfilePageCommentsHandle"
import ProfilePageCalendarEmpty from "./emptyAndHandlePage/ProfilePageCalendarEmpty";
import ProfilePageCalendarHandle from "./emptyAndHandlePage/ProfilePageCalendarHandle";
import ScrollToTop from "./componentsPages/ScrollToTop"
import ProfilePageTransactionHandle from "./emptyAndHandlePage/ProfilePageTransactionHandle"
import ProfilePageCommentsEmpty from "./emptyAndHandlePage/ProfilePageCommentsEmpty";
import ProfilePageTransactionEmpty from "./emptyAndHandlePage/ProfilePageTransactionEmpty"
import ProfilePageReservationHandle from "./emptyAndHandlePage/ProfilePageReservationHandle";
import ProfilePageReservationEmpty from "./emptyAndHandlePage/ProfilePageReservationEmpty"
import ProfilePageReservationRequestedHandle from "./emptyAndHandlePage/ProfilePageReservationRequestedHandle";
import MyAccomodationProfilePageHandle from "./emptyAndHandlePage/MyAccomodationProfilePageHandle";
import AnotherPagesEmpty from "./emptyAndHandlePage/anotherPagesEmpty";
import ProfileWalletPageHandle from "./emptyAndHandlePage/ProfileWalletPageHandle";
import ProfileFavoritePageHandle from "./emptyAndHandlePage/ProfileFavoritePageHandle";
import MainProfilePages from "./pages/MainProfilePages";
import TestProfilePages2 from "./pages/TestProfilePages2";
import RulesPage from "./pages/RulesPage"


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>

            <CookiesProvider>
                <ScrollToTop/>
                <Switch>
                    <Route exact path={'/TestProfilePages2'} component={TestProfilePages2}/>
                    <Route exact path={'/MainProfilePages/:page'} component={MainProfilePages}/>
                    <Route exact path={'/MainProfilePages/:page/:id'} component={MainProfilePages}/>


                    <Route exact path={'/login'} component={LoginPage}/>
                    <Route exact path={'/loginMembership'} component={LoginPage2}/> {/* loginpage2 */}
                    <Route exact path={'/registration'} component={LoginPage3}/> {/* loginpage3 */}
                    <Route exact path={'/factor/:id'} component={FactorPage}/>
                    <Route exact path={'/profileReservations'} component={ProfilePageReservationsRequested}/>

                    {/* <Route exact path={'/profileCalender/:id'} component={ProfilePageCalender}/>
                            {/* <Route exact path={'/profileShowGuestComments/:id'} component={ProfilePageGustComments2}/> */} {/* profileGustComments2 */}
                    <Route exact path={'/profileGuestComments'}
                           component={PrfilePageGustComments}/> {/* profileGustComments */}
                    <Route exact path={'/displayPage/:id'} component={DisplayPage}/>
                    <Route exact path={'/profileWalletRequestWithdraw'}
                           component={ProfilePageWallet3}/> {/* profileWallet3 */}
                    <Route exact path={'/ProfileWalletTransactionRegistration'}
                           component={ProfilePageWallet2}/> {/* ProfileWallet2 */}
                    <Route exact path={'/ProfileWallet'} component={ProfilePageWallet}/>
                    <Route exact path={'/myAccommodation'} component={MyAccommodationPage}/>
                    <Route exact path={'/profileTransactionNotFound'}
                           component={ProfilePageTransaction3}/> {/* profileTransaction3 */}
                    <Route exact path={'/ProfileMyTransaction'}
                           component={ProfilePageTransaction2}/> {/* ProfileTransaction2 */}
                    <Route exact path={'/ProfileTransaction'} component={ProfilePageTransaction}/>
                    <Route exact path={'/ProfileMyReservation'}
                           component={ProfilePageReservation2}/>{/* ProfileReservation2 */}
                    <Route exact path={'/profileReservation'} component={ProfilePageReservation}/>
                    <Route exact path={'/hostStepSetImage/:id'} component={HostStep5Page3}/> {/* hostStep5-3  */}
                    <Route exact path={'/profile'} component={ProfilePage}/>
                    <Route exact path={'/hostStepRules'} component={HostStep5Page2}/> {/* hostStep5-2  */}
                    <Route exact path={'/hostStepSetPrice'} component={HostStep5Page}/> {/* hostStep5  */}
                    <Route exact path={'/hostStepFacilities'} component={HostStep4Page}/> {/* hostStep4  */}
                    <Route exact path={'/hostStepAccommodationDetails'} component={HostStep3Page}/> {/* hostStep3 */}
                    <Route exact path={'/hostStepSetMapLocation'}
                           component={HostStep2Page2}/> {/* hostStep2-2 */}{/* 1 */} {/*   hostStep2-2 zodtar ast safhash ta  hostStep2*/}
                    <Route exact path={'/hostStepAddress'} component={HostStep2Page}/> {/* hostStep2 */} {/* 2 */}
                    <Route exact path={'/hostStepBasicInformation'} component={HostStep1Page}/> {/* hostStep1 */}
                    <Route exact path={'/searchHomePage/:sort/:id'} component={SearchHomePage}/>
                    <Route exact path={'/'} component={MainPage}/>
                    <Route exact path={'/notFound'} component={NotFoundPage}/>
                    <Route exact path={'/addComments/:id'} component={AddComments}/>
                    <Route exact path={'/profileFavoritesPage'} component={ProfileFavoritesPage}/>
                    <Route exact path={'/ProfilePageCommentsHandle'} component={ProfilePageCommentsHandle}/>
                    <Route exact path={'/ProfilePageCommentsEmpty'} component={ProfilePageCommentsEmpty}/>
                    <Route exact path={'/ProfilePageCalendarEmpty'} component={ProfilePageCalendarEmpty}/>
                    <Route exact path={'/ProfilePageCalendarHandle'} component={ProfilePageCalendarHandle}/>
                    <Route exact path={'/ProfilePageTransactionHandle'} component={ProfilePageTransactionHandle}/>
                    <Route exact path={'/ProfilePageTransactionEmpty'} component={ProfilePageTransactionEmpty}/>
                    <Route exact path={'/ProfilePageReservationHandle'} component={ProfilePageReservationHandle}/>
                    <Route exact path={'/ProfilePageReservationEmpty'} component={ProfilePageReservationEmpty}/>
                    <Route exact path={'/ProfilePageReservationRequestedHandle'}
                           component={ProfilePageReservationRequestedHandle}/>
                    <Route exact path={'/MyAccomodationProfilePageHandle'} component={MyAccomodationProfilePageHandle}/>
                    <Route exact path={'/AnotherPagesEmpty'} component={AnotherPagesEmpty}/>
                    <Route exact path={'/ProfileWalletPageHandle'} component={ProfileWalletPageHandle}/>
                    <Route exact path={'/ProfileFavoritePageHandle'} component={ProfileFavoritePageHandle}/>
                    <Route exact path={'/RulesPage'} component={RulesPage}/>

                </Switch>

            </CookiesProvider>


        </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
