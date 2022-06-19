import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import LogoName from "../images/LogoName.png";
import MobileLogo from "../images/MobileLogo.png";
import config from "../services/config.json";
import Logo from "../images/Logo.png";
import {Link} from "react-router-dom";
import "../style/headerSearch.scss"
import ProfilePageUserInfo from "./ProfilePageUserInfo";

class HeaderSearch extends Component {
    constructor(props) {
        super(props);
        this.state={
            ...props,
            ...this.state,
            ...this.props,
            searchResult:'',
            onclickHandel:false,

        }
    }

    render() {
        const info = JSON.parse(localStorage.getItem("infoUser"))
        let nameAndFamily =  ""
        let avatar = ""
        if(info){
            nameAndFamily=info.userInfo.fullname
            avatar=info.userInfo.avatar
        }
        return (
            <div className={"fv-footerMenu fv-footerDisplayPage fv-DisplayPage fv-profilePageUserInfo"}>
            <MDBRow className={' fv-footerDisplayPageBody'}>
                <MDBCol md={2}>
                    <Link to={'/MainProfilePages/profile'}> <i className="fa fa-user-alt" />
                        <a> حساب کاربری</a> </Link>
                </MDBCol>
                <MDBCol md={2} className={"fv-DisplayPageSearchIcon"}>
                    <input type='searchBbox' placeholder=' جستجو شهر مورد نظر' onChange={(e)=>this.setState({searchResult:e.target.value})}/>
                </MDBCol>
                <MDBCol  md={2} className={"fv-DisplayPageSearchIcon"} >
                    <a onClick={()=>{
                        const mainPageSearch = {
                            city:`C ${this.state.searchResult}`,
                            numberOfPeople: '',
                            dateToGo:'',
                            dateToReturn:'',
                        }
                        localStorage.setItem("mainPageSearch"  , JSON.stringify(mainPageSearch));
                        this.props.history.push({pathname:"/searchHomePage/doSearch/1",searchDatas: {city: this.state.city, dayToGo: mainPageSearch.dateToGo , dateToReturn:mainPageSearch.dateToReturn , capacity:mainPageSearch.numberOfPeople}})

                      }}><i className="fa fa-search" /></a>
                  </MDBCol>

                  <MDBCol sm={2}  sm={2} className={"fv-DisplayPageLoginImageMobile"} >
                      <img src={avatar ? `${config.webapi}/images/user//${avatar}` : MobileLogo} onClick={()=>{
                          this.setState({onclickHandel:!this.state.onclickHandel})
                      }}/>
                  </MDBCol>
                  <MDBCol sm={1} className={this.state.onclickHandel ? "fv-DisplayPageLoginSignMobile": "fv-hideMenu"} >
                      <i className="fas fa-caret-up" onClick={()=>{
                          this.setState({onclickHandel:!this.state.onclickHandel})
                      }}/>
                  </MDBCol>
                <MDBCol sm={1} className={this.state.onclickHandel ? "fv-hideMenu" : "fv-DisplayPageLoginSignMobile"} >
                    <i className="fas fa-caret-left" onClick={()=>{
                        this.setState({onclickHandel:!this.state.onclickHandel})
                    }}/>
                </MDBCol>
                  <MDBCol md={6} sm={9} className={"menuMobile"}>
                      <img src={LogoName} className={"fv-DisplayPageSearchName"}/>
                      <img src={MobileLogo} className={"fv-DisplayPageSearchLogo"}/>
                  </MDBCol>
              </MDBRow>


                <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage"}>

                    <MDBRow className={this.state.onclickHandel && localStorage.getItem("token") ? "fv-ProfilePageLeftBody" : "fv-hideMenu"}> {/* profile info for mobile             if user*/}
                       <ProfilePageUserInfo />
                    </MDBRow>

                    <MDBRow className={this.state.onclickHandel && !localStorage.getItem("token") ? "fv-ProfilePageLeftBody fv-gustUsersMenu"  : "fv-hideMenu"}> {/* profile info for mobile            if gust*/}
                        <MDBCol md={3} className={"fv-ProfilePageUserInfoBody"}>
                            <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                    <Link to={'/login'}><p className={ window.location.href.match(/\blogin\b/) ? "fv-reservationActive" : ''}  ><i className="fa fa-door-open" />ورود</p></Link>
                                    {/* <Link to={'/registration'}> <p className={ window.location.href.match(/\bregistration\b/) ? "fv-transaction" : ''}  ><i className="fa fa-address-card" />ثبت نام</p> </Link>  */}
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>

                    <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>

                        <MDBRow className={"fv-DisplayPageRotePathMobile"}>
                            <MDBCol>
                                <Link to={"/"}> <p> صفحه اصلی </p> </Link>
                                <i className="fas fa-chevron-left" />
                                <Link to={"/MainProfilePages/Profile"}><p className={this.props.thisPageName ? ""  : "fv-DisplayPagePathNow"}> پنل کاربری </p> </Link> {/* اگر مقدار سوم وجود داشت کلاس رنگ سبز غیر فعال شود */}
                                <i className={this.props.thisPageName ? "fas fa-chevron-left" : ""} />     {/* اگر مقدار سوم وجود داشت کلاس فعال شود */}
                                <p className={this.props.thisPageName ? "fv-DisplayPagePathNow" : ""}> {this.props.thisPageName} </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBContainer>
              </div>
          )
      }
  }
  export default HeaderSearch