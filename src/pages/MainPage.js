import React from "react";
// import './Main1.css'
// import './Main2.css'
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Product from "../componentsPages/Product";
import PopularVillage from "../componentsPages/PopularVillage";
import TypesAccommodation from "../componentsPages/typesAccommodation";
import DiscountedProduct from "../componentsPages/DiscountedProduct";
import TrapMagazine from "../componentsPages/trapMagazine"
import TopicsMainPage from "../componentsPages/topicsMainPage";
import FotterpageImage from "../images/footerMainImage.png"
import FotterpageLogo from "../images/mainpageLogo.png"
import MobileMenu from "../images/MobileMenu.png"
import UserImage from "../images/user.png"
import Image1 from "../images/image1.png"
import Image2 from "../images/image2.png"
import Image3 from "../images/image3.png"
import Image4 from "../images/image4.png"
import {Link} from "react-router-dom";
import Datas from "../data/Datas";
import config from "../services/config.json"
import CalendarLinear from "../data/CalenddarLinear";
import Footer from "../componentsPages/footer";

import {Waiting} from "../componentsPages/WaitingLoad";
import {getCities, getProvinces} from "../services/userService";
import MyaccommodationsIcon from "../images/icons/Folder.svg";
import Logout from "../images/icons/Logout.svg";
import {extendMoment} from "moment-range";
import Moment from "moment";
import RssReader from "../services/RssReader";
import {popularVillas} from "../services/homeService";


const commaNumber = require('comma-number')


class MainPage extends Datas {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            ...this.state,
            buttonCommentActiveName: 'btn1',
            city: '',
            dateToGo: '',
            dateToReturn: '',
            numberOfPeople: '',
            onclickButtonHandle: true,
            totalOfComments: 20,


            provincesTitle: [],
            provincesId: 'title',
            setProvinces: false,
            provincesCitys: [],
            provinces: '',
            cityLoader: true,
            provincesLoader: true,
            trappMagItems:[],

            commentsRight: [' قالب سایت معمولا با این موضوع رو برو هستند که م',
                ' قالب سایت معمولا با این موضوع رو برو هستند که م',
                ' قالب سایت معمولا با این موضوع رو برو هستند که م'],
            commentsLeft: [' \n' +
            '                                        در نتیجه طرح کلی دید درستی\n' +
            '                                        به کار فرما نمیدهد. اگر طراح بخواهد\n' +
            '                                        دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته',
                ' قالب سایت معمولا با این موضوع رو برو هستند که م',
                ' قالب سایت معمولا با این موضوع رو برو هستند که م'],

            userRightPic: [Image1, Image2],
            userLeftPic: [Image3, Image4],


        }
    }


    componentDidMount() {
        super.componentDidMount();
        getProvinces()
            .then(res => {
                this.setState({provincesTitle: res.data.data, provincesLoader: false})

            });
        this.load();
    }

    selectDayToGo = (date) => {                                    // set date to go
        if (date) {
            this.setState({dateToGo: `${date.year}/${date.month}/${date.day}`})
        }
    };
    selectDayToReturn = (date) => {                                    // set date to go
        if (date) {
            this.setState({dateToReturn: `${date.year}/${date.month}/${date.day}`})
        }
    };
    onclickButtonHandleMenu = () => {
        this.setState({onclickButtonHandle: !this.state.onclickButtonHandle})
    };
    onclickButtonCloseMenu = () => {
        this.setState({onclickButtonHandle: true})
    };
    load(){
        let rss = new RssReader();
        rss.read((items) => {
            let Articles=[];
            for(let i=0;i<items.length && i<4;i++){
                let itm=<MDBCol md={3} sm={6}><TrapMagazine title={items[i].title}  topic={items[i].title} srcimmage={(items[i].image?.$?.url) || 'http://magazine.trapp.ir/wp-content/uploads/2020/07/%D9%87%D8%B2%DB%8C%D9%86%D9%87-%D8%A7%D8%AC%D8%A7%D8%B1%D9%87-%D9%88%DB%8C%D9%84%D8%A7-%D8%B1%D9%88%D8%A8%D9%87%E2%80%8C%D8%AF%D8%B1%DB%8C%D8%A7-%DA%A9%DB%8C%D8%B4-300x188.png'} link={items[i].link}/></MDBCol>;
                Articles.push(itm);
            }

            this.setState({trappMagItems: Articles})
        });
    }

    render() {
        let popularVillaswaitingHandle = true
        let bannersvillageswaitingHandle = true
        let bannersvillaswaitingHandle = true
        let discountedVillaswaitingHandle = true
        let economicVillaswaitingHandle = true
        if (this.state.popularVillas.length > 0) {
            popularVillaswaitingHandle = false
        }
        if (this.state.bannersVillage.length > 0) {
            bannersvillageswaitingHandle = false
        }
        if (this.state.bannersvillas.length > 0) {
            bannersvillaswaitingHandle = false
        }
        if (this.state.discountedVillas.length > 0) {
            discountedVillaswaitingHandle = false
        }
        if (this.state.economicVillas.length > 0) {
            economicVillaswaitingHandle = false
        }
        const info = JSON.parse(localStorage.getItem("infoUser"))
        let nameAndFamily = ""
        let avatar = ""
        let username
        if (info) {
            nameAndFamily = info.userInfo.fullname
            avatar = info.userInfo.avatar
            username = info.userInfo.trapp_id
        }

        // console.log(avatar)
        const popularVillage = this.state.popularVillas

        const bannersvillages = this.state.bannersVillage

        const bannersvillas = this.state.bannersvillas

        const bannersbigBanners = this.state.bannersbigBanners

        const discountedVillas = this.state.discountedVillas

        const economicVillas = this.state.economicVillas


        /* const a =this.getData('https://reqres.in/api/get/1')
         console.log(a.text)  */

        const pagination = []
        const numberOfComments = this.state.totalOfComments
        let NumberOfButtonComment = numberOfComments / 2
        if ((NumberOfButtonComment % 2) > 0)
            NumberOfButtonComment++
        for (let i = 0; i < NumberOfButtonComment - 1; i++) {
            pagination.push(i + 1)
        }

        // const setdata = this.state.data.url

        // const data = this.state.productData;

        const {city,provincesId, dateToGo, dateToReturn, numberOfPeople} = this.state

        let range = 0
        const moment = extendMoment(Moment);
        const startDate = this.state.dateToGo.split("/")
        const endDate = this.state.dateToReturn.split("/")
        const start = new Date(startDate[0], startDate[1], startDate[2]);
        const end = new Date(endDate[0], endDate[1], endDate[2]);
        range = moment.range(start, end).diff('days'); // روز انتخابی از و تا چند روز هست (مثبت - نفی و 0)


        return (
            <div className={"main fv-mainpage"}>
                <div  className={'fv-footerMenu MainPage fv-mainPageBodyOnly'}>
                    <MDBRow className={'fv-footerMenuImage'}>
                        <img src={FotterpageImage} alt="Trulli"/>
                    </MDBRow>

                    <MDBRow style={{backgroundColor: 'rgba(121,121,121,0.31)',position: 'fixed',zIndex: 2,width: '-webkit-fill-available',marginBottom:'20px'}} className={'fv-footerMenuRibbon'}>

                        <MDBCol md={1}>
                            <i style={{marginLeft: '6%', color: 'white'}}
                               className={localStorage.getItem("token") ? "" : "fa fa-user-alt"}/>
                            <a className={localStorage.getItem("token") ? "fv-hideButtonRegister" : "fv-interTextMainPage"}>
                                <Link to={'/login'}>ورود</Link>
                            </a>
                        </MDBCol>
                        <MDBCol md={2} className={"fv-footerMenuRibbonButton"}>

                            {/*   <MainPageCascadeMenu avatar={avatar} nameAndFamily={nameAndFamily}
                                                 onclickButtonHandleMenu={this.onclickButtonHandleMenu}
                                                 onclickButtonCloseMenu={this.onclickButtonCloseMenu}/> */}

                            <a className={localStorage.getItem("token") ? "fv-userInfoButtonCascade" : "fv-hideButtonRegister"}
                               onClick={() => { // agar login bod ba click roie dokme in karo kon
                                   this.setState({onclickButtonHandle: !this.state.onclickButtonHandle})
                               }}><h6><img
                                src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/>{nameAndFamily}
                            </h6></a>
                            <Link to={"/hostStepBasicInformation"}><input type='button' value=' میزبان شوید'
                                                                          onClick={() => {
                                                                              localStorage.removeItem("step1")
                                                                              localStorage.removeItem("step2")
                                                                              localStorage.removeItem("step2-2")
                                                                              localStorage.removeItem("step3")
                                                                              localStorage.removeItem("step4")
                                                                              localStorage.removeItem("step5")
                                                                              localStorage.removeItem("step5-2")
                                                                              localStorage.removeItem("editCode")
                                                                              // this.props.history.push('/hostStepBasicInformation')

                                                                          }}
                                                                          className={localStorage.getItem("token") ? "fv-getHostButtonMainPage" : "fv-hideButtonRegister"}/>
                            </Link>
                        </MDBCol>
                        <MDBCol md={9}>
                            <img src={FotterpageLogo}/>
                        </MDBCol>
                    </MDBRow>


                    <MDBRow className={'fv-footerMenuRibbonMobile'}>
                        <MDBCol sm={8}
                                className={localStorage.getItem("token") ? "fv-hideButtonRegister" : "fv-userInfoButtonCascade"}>  {/* agar login nabod ino neshon bede */}
                            <img src={MobileMenu} onClick={() => {                                           // agar login nabod ba klick ro ax in kar ro bokon
                                this.setState({onclickButtonHandle: !this.state.onclickButtonHandle})
                            }}/>
                        </MDBCol>
                        <MDBCol sm={8}
                                className={localStorage.getItem("token") ? "fv-userInfoButtonCascade" : " fv-hideButtonRegister"}>   {/* agar login bod ino neshon bede */}
                            <a className={localStorage.getItem("token") ? "fv-userInfoButtonCascade" : "fv-hideButtonRegister"}
                               onClick={() => {   // agar login bod ba klick ro ax in kar ro bokon
                                   this.setState({onclickButtonHandle: !this.state.onclickButtonHandle})
                               }}> <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/></a>
                        </MDBCol>
                        <MDBCol sm={2}>
                            <img src={FotterpageLogo}/>
                        </MDBCol>
                    </MDBRow>

                    <MDBContainer style={{marginTop: '120px'}}
                        className={localStorage.getItem("token") && this.state.onclickButtonHandle === false ? `fv-containerOptionMainPageRowTop ` : "fv-containerOptionMainPageRowTop fv-displayNoneLogin "}>
                        <MDBRow className={"fv-cascadeOptionMainPageRowTop fv-cascadeOptionMainPageRowTopMainPage"}>
                            <MDBCol md={12} sm={12}>
                                <MDBRow>
                                    <MDBCol md={2} sm={2}>
                                        <img src={avatar ? `${config.webapi}/images/user/${avatar}` : UserImage}/>
                                    </MDBCol>
                                    <MDBCol className={"fv-textInToCascadeOptionMainPage"} md={8} sm={8}>
                                        <MDBRow>


                                            <MDBCol md={12}>
                                                <a><h6>{nameAndFamily}</h6></a>
                                            </MDBCol>

                                        </MDBRow>
                                        <MDBRow className={"fv-visitProfile"}>
                                            <MDBCol md={12}>
                                                <Link><a>{username} @ </a></Link>
                                            </MDBCol>

                                        </MDBRow>

                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className={"fv-cascadeOptionMainPage"}>
                            <MDBCol md={12} sm={12}>
                                <Link to={"/MainProfilePages/Profile"}><i className="fas fa-user" style={{
                                    marginRight: '20px',
                                    marginLeft: '7px'
                                }}/>
                                    <a><p>مشاهده حساب کاربری</p></a> </Link>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className={"fv-cascadeOptionMainPage"}>
                            <MDBCol md={12} sm={12}>
                                <Link to={"/MainProfilePages/myAccommodation"}> <img
                                    style={{marginRight: '15px', marginLeft: '5px'}} src={MyaccommodationsIcon}/>
                                    <a><p>اقامت گاه های من</p></a> </Link>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className={"fv-cascadeOptionMainPage"}>
                            <MDBCol md={12} sm={12}>
                                <Link to={"/MainProfilePages/ProfileMyReservation"}> <img
                                    style={{marginRight: '15px', marginLeft: '5px'}} src={MyaccommodationsIcon}/>
                                    <a><p>رزور های من</p></a> </Link>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow
                            className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus fv-userInfoButtonCascadeMobile"}>
                            <MDBCol md={12} sm={12}>
                                <Link to={"/hostStepBasicInformation"}>
                                    <a onClick={() => {
                                        localStorage.removeItem("step1")
                                        localStorage.removeItem("step2")
                                        localStorage.removeItem("step2-2")
                                        localStorage.removeItem("step3")
                                        localStorage.removeItem("step4")
                                        localStorage.removeItem("step5")
                                        localStorage.removeItem("step5-2")
                                        localStorage.removeItem("editCode")
                                    }}><i className="fa fa-laptop-house"/>   <p>میزبان شوید</p></a> </Link>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className={"fv-cascadeOptionMainPage fv-cascadeOptionMainPageEndRadus"}>
                            <MDBCol md={12} sm={12}>
                                <a onClick={() => {
                                    localStorage.clear()
                                    this.props.history.push("/")
                                }}> <img style={{marginRight: '15px', marginLeft: '5px'}} src={Logout}/>
                                    <p>خروج از حساب کاربری</p></a>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                    <MDBContainer className={"fv-mobileMenuGustMainPage"}>
                        <MDBRow
                            className={!localStorage.getItem("token") && this.state.onclickButtonHandle === false ? "fv-ProfilePageLeftBody fv-gustUsersMenu" : "fv-displayNoneLogin"}> {/* profile info for mobile            if gust*/}
                            <MDBCol md={3} className={"fv-ProfilePageUserInfoBody"}>
                                <MDBRow className={"fv-ProfilePageUserInfoDetailsBody"}>
                                    <MDBCol className={"fv-ProfilePageUserInfoDetailsBodyColumn"}>
                                        <Link to={'/login'}><p
                                            className={window.location.href.match(/\blogin\b/) ? "fv-reservationActive" : ''}>
                                            <i className="fa fa-door-open"/>ورود</p></Link>
                                        {/* <Link to={'/registration'}> <p className={ window.location.href.match(/\bregistration\b/) ? "fv-transaction" : ''}  ><i className="fa fa-address-card" />ثبت نام</p> </Link>  */}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>


                    <MDBRow style={{marginTop: '80px'}} className={'fv-searchMainPageTopic'}>
                        <MDBCol md={12}>
                            <h2>اجاره خانه های روستایی</h2>
                        </MDBCol>
                        <MDBCol md={12}>
                            <h2>خانه های روستایی در رویایی ترین مناطق</h2>
                        </MDBCol>
                    </MDBRow>


                    <MDBRow>
                        <MDBRow className={'fv-searchMainPage'}>
                            <p>اقامتگاه رویایی خود را جست و جو کنید</p>

                            {/*{this.state.provincesLoader ? (this.state.cityLoader ? Waiting(true, "fv-textInToCascadeOptionMainPage") : '') : // waiting select ostan(provinance)*/}

                                <select value={this.state.provincesId} onChange={(event) => {
                                    // console.log(event.target.value)
                                    // console.log("this.state.provincesTitle",this.state.provincesTitle)
                                    this.state.provincesTitle.map(getTitleProvince => {
                                        if (Number(event.target.value) === Number(getTitleProvince.id)) {
                                            this.setState({provinces: getTitleProvince.name, provincesLoader: true})
                                        }
                                    })
                                    // console.log(event.target.name)
                                    this.setState({cityLoader: true})
                                    if (event.target.value !== "title") {
                                        this.setState({validCity: true})
                                    } else {
                                        this.setState({validCity: false})
                                    }
                                    this.setState({
                                        provincesId: event.target.value,
                                        setProvinces: true,
                                        setVillage: ''
                                    }, () => {
                                        getCities(this.state.provincesId)
                                            .then(res => {
                                                // console.log(res)
                                                this.setState({
                                                    provincesCitys: res.data.data,
                                                    setVillage: res.data.data[0].name,
                                                    cityLoader: false
                                                })
                                            })
                                            .catch(err => {
                                                this.setState({cityLoader: false})
                                            })
                                    })

                                }}
                                        className={this.state.click && this.state.validCity === false ? "fv-hostStep2Page2Hidden fv-redBorderError" : "fv-hostStep2Page2Hidden"}>
                                    <option value={this.state.state ? this.state.state : 'title'}
                                            disabled>{this.state.state ? `${this.state.state}` : `نام استان خود را انتخاب کنید`}
                                    </option>
                                    {this.state.provincesTitle.map(provincesTitle => {
                                        console.log("provincesTitle",provincesTitle)
                                        return (
                                            <option value={provincesTitle.id}
                                                    name={provincesTitle.name}>{provincesTitle.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            {/*}*/}


                            {/*{this.state.cityLoader ? '' :*/}
                                <select value={this.state.city} disabled={!this.state.setProvinces}
                                        onChange={(event) => {
                                            if (event.target.value !== "title" && this.state.city) {
                                                this.setState({validCity: true})
                                            } else {
                                                this.setState({validCity: false})
                                            }
                                            this.setState({city: event.target.value})
                                        }}
                                        className={this.state.click && this.state.validCity === false ? "fv-hostStep2Page2Hidden fv-redBorderError" : "fv-hostStep2Page2Hidden"}>
                                    <option value={this.state.city} disabled>
                                        {this.state.city ? `${this.state.city}` : `نام شهر خود را انتخاب کنید`}
                                    </option>
                                    {this.state.provincesCitys.map(provincesCitys => {
                                          console.log("provincesCitys",provincesCitys)
                                        return (
                                            <option value={provincesCitys.name}>
                                                {provincesCitys.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            {/*}*/}
                            {range < 0 ?
                                <MDBCol md={12} sm={12}>
                                    <p style={{
                                        marginBottom: '1%',
                                        textAlign: 'initial',
                                        color: 'mediumvioletred'
                                    }}>تاریخ وارد شده اشتباه میباشد</p>
                                </MDBCol>
                                : ''}

                             {/*    <input type='text' placeholder={'شهر یا روستا را وارد کنید'} value={city}
                                   onChange={(event) => this.setState({city: event.target.value})}/> */}
                             <MDBCol md={5} sm={4} className={'fv-searchMainPage fv-searchMainPageDateOut'}>
                                <div className={"fv-DisplayPageDetailsLeftBodyDateOnInput"}>
                                    <CalendarLinear dayToGo={this.selectDayToGo} text={'تاریخ رفت'}/>
                                </div>
                             </MDBCol>
                             <MDBCol md={1} sm={1} className={'fv-searchMainPageBetweenDate'}>

                             </MDBCol>
                             <MDBCol md={5} sm={4} className={'fv-searchMainPage fv-searchMainPageDateReturn'}>
                                <div className={"fv-DisplayPageDetailsLeftBodyDateOnInput"}><CalendarLinear
                                    dayToGo={this.selectDayToReturn} text={'تاریخ برگشت'}/></div>
                             </MDBCol>
                             <input type='text' placeholder={'تعداد نفرات'} value={numberOfPeople}
                                   onChange={(event) => this.setState({numberOfPeople: event.target.value})}/>
                             {/*{this.state.provincesLoader && this.state.cityLoader ? Waiting(true, "fv-textInToCascadeOptionMainPage fv-searchMainPageSearchButton fv-searchButtonWaiting") : // اگر شهر سا استان را انتخاب کرد waiting اجرا شود*/}
                                <input type='button' value='جستجو اقامتگاه' className={'fv-searchMainPageSearchButton'}
                                       onClick={() => {
                                           if (range < 0) { // اگر تارییخ رفت بزرگتر از تاریخ بررگشت بود
                                               alert("لطفا تاریخ را به درستی وارد نمایید")
                                           } else {
                                               // if ((this.state.provincesId !== 'title' && this.state.city) || (this.state.provincesId === 'title')) { // اگر استان را انتخاب کرد و بعد از آن شهر را هم انتخاب کرد اجرا شود
                                               //     const mainPageSearch = {
                                               //         city: `C ${this.state.city}`,
                                               //         numberOfPeople: this.state.numberOfPeople,
                                               //         dateToGo: this.state.dateToGo,
                                               //         dateToReturn: this.state.dateToReturn,
                                               //     }
                                               //     localStorage.setItem("mainPageSearch", JSON.stringify(mainPageSearch));
                                               //     this.props.history.push({
                                               //         pathname: "/searchHomePage/doSearch/1",
                                               //         searchDatas: {
                                               //             city: this.state.city,
                                               //             dayToGo: mainPageSearch.dateToGo,
                                               //             dateToReturn: mainPageSearch.dateToReturn,
                                               //             capacity: mainPageSearch.numberOfPeople
                                               //         }
                                               //     })
                                               // } else {
                                               //     alert("لطفا شهر مورد نظر را انتخاب کنید")
                                               // }

                                               const mainPageSearch = {
                                                   city: `C ${this.state.city}`,
                                                   numberOfPeople: this.state.numberOfPeople,
                                                   dateToGo: this.state.dateToGo,
                                                   dateToReturn: this.state.dateToReturn,
                                               }
                                               localStorage.setItem("mainPageSearch", JSON.stringify(mainPageSearch));
                                               this.props.history.push({
                                                   pathname: "/searchHomePage/doSearch/1",
                                                   searchDatas: {
                                                       city: this.state.city,
                                                       dayToGo: mainPageSearch.dateToGo,
                                                       dateToReturn: mainPageSearch.dateToReturn,
                                                       capacity: mainPageSearch.numberOfPeople
                                                   }
                                               })

                                           }

                                            // fetch('https://reqres.in/api/posts', {                     // POST
                                            //      method: 'POST',
                                            //      headers: { 'Content-Type': 'application/json' },
                                            //      body: JSON.stringify({city,dateToGo,dateToReturn,numberOfPeople})
                                            //  })
                                            //      .then(response => response.json())
                                            //      .then(data =>{
                                            //          if(data){
                                            //              console.log(city,dateToGo)
                                            //              this.props.history.push('/searchHomePage/cheapest/1')
                                            //          }
                                            //      }) ;

                                       }}
                                />
                            {/*// }*/}

                        </MDBRow>
                    </MDBRow>
                </div>

                <MDBContainer className={"fv-MainBody fv-mainProductsSimilar"}>
                    <MDBRow className={"fv-topicFirstMainPage"}>
                        <TopicsMainPage topic="اقامتگاه های پر بازدید" linkToPage={"/searchHomePage/Popular/1"}/>
                    </MDBRow>
                    <MDBRow className={"fv-mainProduct fv-mainMobile"}>
                        {Waiting(popularVillaswaitingHandle, "fv-waitingLoadPublicFullScreen")}


                        {popularVillage.map(productDetails => {
                            // console.log("productDetails",productDetails);
                            //  console.log(productDetails)
                            //     if(productDetails.details){
                            return (
                                <MDBCol md={3} sm={7} onClick={() => {
                                    this.props.history.push(`/displayPage/${productDetails.id}`)
                                }}>
                                    <a>
                                        <Product
                                            srcImage={`${config.webapi}/images/villas/main/${productDetails.main_img}`}
                                            rate={productDetails.score}
                                            topic={productDetails.title}
                                            location={productDetails.city}
                                            numberOfRoom={productDetails.details.bedroom}
                                            capacity={productDetails.details.max_capacity}
                                            price={commaNumber(productDetails.rules.normal_cost)}
                                        />
                                    </a>
                                </MDBCol>
                            )
                            /*   }else {
                                   return(
                                       <MDBCol md={3} sm={7} onClick={()=>{
                                           this.props.history.push(`/displayPage/${productDetails.id}`)
                                       }}>
                                           <a> <Product srcImage={`${config.webapi}/images/villas/main/${productDetails.main_img }`}
                                                    rate={productDetails.score}
                                                    topic={productDetails.title}
                                                    location={productDetails.city}
                                                    numberOfRoom={''}
                                                    capacity={''}
                                                        price={''}/> </a>

                                       </MDBCol>
                                   )
                           }  */


                        })}

                    </MDBRow>
                    <MDBRow className={"fv-topicMainPage"}>
                        <React.Fragment>

                            <MDBCol md={1} sm={1}>
                                <a><Link to={"/searchHomePage/Popular/1"}></Link>
                                </a>
                            </MDBCol>
                            <MDBCol md={7} sm={3} className={"fv-topicMainPageSeeAll"}>
                            </MDBCol>
                            <MDBCol md={4} sm={9} className={"fv-topicMainPageTopic"}>
                                <h5>{"شهرهای پر بازدید"}</h5>
                            </MDBCol>

                        </React.Fragment>

                    </MDBRow>
                    <a> <MDBRow className={"fv-mainMobileVillage"}>
                        {Waiting(bannersvillageswaitingHandle, "fv-waitingLoadPublicFullScreen")}

                        {bannersvillages.map(banners => {
                            // console.log("banners",banners)
                            return (
                                <MDBCol md={3} sm={7} onClick={() => {
                                    const mainPageSearch = {
                                        city: `C ${banners.title}`,
                                        dateToGo: '',
                                        dateToReturn: '',
                                    }
                                    localStorage.setItem("mainPageSearch", JSON.stringify(mainPageSearch));
                                    this.props.history.push({
                                        pathname: "/searchHomePage/doSearch/1",
                                        searchDatas: {
                                            city: banners.title,
                                            dayToGo: '',
                                            dateToReturn: '',
                                        }
                                    })
                                }}>
                                    <PopularVillage
                                        //srcImage={banners.link}
                                        srcImage={`${config.webapi}/images/banners/${banners.img_src }`}
                                        //srcImage={`${config.webapi}/images/banners/${banners.link }`}
                                        location={banners.title}
                                        capacity={banners.count}
                                    />
                                </MDBCol>
                            )
                        })}
                    </MDBRow></a>

                    <MDBRow className={"fv-topicMainPage"}>
                        <TopicsMainPage topic="انواع اقامتگاه ها"
                                        linkToPage={"/searchHomePage/cheapest/1"}/>
                    </MDBRow>
                    <MDBRow className={'fv-mainMobileAccommodation'}>
                        {Waiting(bannersvillaswaitingHandle, "fv-waitingLoadPublicFullScreen")}

                        {bannersvillas.map(bannersvila => {
                            //console.log("bannersvila",bannersvila);
                            return (
                                <MDBCol md={3} sm={7} onClick={() => {
                                    const mainPageSearchAccommodationGroup = {
                                        accommodationGroup: bannersvila.title
                                    }
                                    localStorage.setItem("mainPageSearchAccommodationGroup", JSON.stringify(mainPageSearchAccommodationGroup));
                                    this.props.history.push({
                                        pathname: "/searchHomePage/doSearch/1",
                                        searchDatasAccomomdation: {accommodationGroup: bannersvila.title}
                                    })

                                }}
                                >
                                    <a>
                                        <TypesAccommodation
                                            topic={bannersvila.title}
                                            //image={bannersvila.link}
                                            image={`${config.webapi}/images/banners/${bannersvila.img_src }`}
                                        />
                                    </a>
                                </MDBCol>
                            )
                        })}
                    </MDBRow>

                    <MDBRow className={"fv-topicMainPage"}>
                        <TopicsMainPage
                            topic="اقامت گاه های تخفیف دار"
                            linkToPage={"./searchHomePage/Discount/1"}
                        />
                    </MDBRow>

                    <MDBRow  style={{direction: 'rtl'}}  className={'fv-mainMobile fv-mainMobileDiscountedVillas'}>
                        {Waiting(discountedVillaswaitingHandle, "fv-waitingLoadPublicFullScreen")}
                        {/*{console.log("discountedVillas", discountedVillas)}*/}
                        {discountedVillas.map(discountedVilla => {
                            // console.log("discountedVilla",discountedVilla);
                            // console.log("discountedVilla.villa.id",discountedVilla.villa.id)
                            let discountPrice = ''
                            discountPrice = (discountedVilla.normal_cost * discountedVilla.weekly_discount) / 100
                            if (discountedVilla.details) {
                                return (
                                    <MDBCol style={{direction: 'initial'}} md={3} sm={7} onClick={() => {
                                        this.props.history.push(`/displayPage/${discountedVilla.villa.id}`)
                                    }}>
                                        <a>
                                            <DiscountedProduct
                                                discountedAmount={discountedVilla.weekly_discount + "%"}
                                                srcImage={`${config.webapi}/images/villas/thum/${discountedVilla.villa.main_img}`}
                                                //srcImage={`${config.webapi}/images/banners/${bannersvila.img_src }`}
                                                rate={discountedVilla.villa.score}
                                                topic={discountedVilla.villa.title}
                                                location={discountedVilla.villa.city}
                                                numberOfRoom={discountedVilla.details.bedroom}
                                                capacity={discountedVilla.details.max_capacity}
                                                price={commaNumber(discountedVilla.normal_cost - discountPrice)}
                                                PreventPrice={commaNumber(discountedVilla.normal_cost)}
                                            />
                                        </a>

                                    </MDBCol>
                                )
                            } else {
                                return (
                                    <MDBCol  md={3} sm={7} onClick={() => {
                                        this.props.history.push(`/displayPage/${discountedVilla.villa.id}`)
                                    }}>
                                        <a>
                                            <DiscountedProduct
                                                discountedAmount={discountedVilla.weekly_discount + "%"}
                                                srcImage={`${config.webapi}/images/villas/thum/${discountedVilla.main_img}`}
                                                rate={discountedVilla.villa.score}
                                                topic={discountedVilla.villa.title}
                                                location={discountedVilla.villa.city}
                                                numberOfRoom={''}
                                                capacity={''}
                                                price={commaNumber(discountedVilla.normal_cost - discountPrice)}
                                                PreventPrice={commaNumber(discountedVilla.normal_cost)}
                                            />
                                        </a>

                                    </MDBCol>
                                )
                            }
                        })}
                    </MDBRow>
                    <MDBRow  className={'fv-centerImage'}>
                        {bannersbigBanners.map(bigBanners => {
                            // console.log("bigBanners",bigBanners)
                            return (
                                <MDBCol md={6} sm={12}>
                                    <img src={bigBanners.link}/>
                                    {/*<img src={bigBanners.img_src}/>*/}
                                    {/*<img src={bigBanners.img_src}/>*/}
                                    {/*<src src={`${config.webapi}/images/banners/${bigBanners.link}`}/>*/}
                                </MDBCol>
                            )
                        })}
                    </MDBRow>
                    <MDBRow className={"fv-topicMainPage"}>
                        <TopicsMainPage topic="اقامتگاه های اقتصادی"
                                        linkToPage={"/searchHomePage/Cheapest/1"}/>
                    </MDBRow>
                    <MDBRow style={{direction: 'rtl'}}  className={'fv-mainMobile'}>
                        {Waiting(economicVillaswaitingHandle, "fv-waitingLoadPublicFullScreen")}

                        {economicVillas.map(economicVilla => {
                            // console.log("**economicVilla",economicVilla)
                            return (
                                <MDBCol style={{direction: 'initial'}}  md={3} sm={6} onClick={() => {
                                    this.props.history.push(`/displayPage/${economicVilla.id}`)
                                }}>
                                    <a>
                                        <Product
                                            srcImage={`${config.webapi}/images/villas/thum/${economicVilla.main_img}`}
                                            rate={economicVilla.score}
                                            topic={economicVilla.title}
                                            location={economicVilla.state}
                                            numberOfRoom={economicVilla.details.bedroom}
                                            capacity={economicVilla.details.max_capacity}
                                            price={commaNumber(economicVilla.normal_cost)}
                                        />
                                    </a>
                                </MDBCol>
                            )
                        })}
                    </MDBRow>
                    <MDBRow className={"fv-aboutUs"}>
                        <MDBCol md={6}>
                            <MDBRow className={'fv-aboutUsImage'}>
                                <MDBCol md={6} sm={1}>
                                    <img className={"fv-aboutUsFirstImage"} src={Image1}/>
                                </MDBCol>
                                <MDBCol md={6} sm={1}>
                                    <img className={"fv-aboutUsSecondImage"} src={Image2}/>
                                </MDBCol>
                                <MDBCol md={6} sm={1}>
                                    <img className={"fv-aboutUsThirdImage"} src={Image3}/>
                                </MDBCol>
                                <MDBCol md={6} sm={1}>
                                    <img className={"fv-aboutUsFourthImage"} src={Image4}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md={6} sm={4}>
                            <h3>درباره ما</h3>
                            <p>
                                طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلی صفحات
                                آماد
                                ه نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های
                                مرتبط بگر
                                دد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بود. همچنین طراح به دنبال
                                این است ک
                                ه پس از ارایه کار نظر دیگران را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های
                                موجود تمرکز کنند.
                            </p>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className={"fv-aboutUsMobile"}>
                        <MDBCol sm={3} className={'fv-aboutUsImage'}>
                            <img className={"fv-aboutUsFirstImage"} src={Image1}/>
                            <MDBRow>
                                <MDBCol>
                                    <img className={"fv-aboutUsSecondImage"} src={Image2}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <img className={"fv-aboutUsThirdImage"} src={Image3}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol sm={9}>
                            <h3>درباره ما</h3>
                            <p>
                                طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند که محتوای اصلی صفحات
                                آماد
                                ه نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های
                                مرتبط بگر
                                دد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بود. همچنین طراح به دنبال
                                این است ک
                                ه پس از ارایه کار نظر دیگران را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های
                                موجود تمرکز کنند.
                            </p>
                            <MDBRow>
                                <MDBCol sm={8} className={"fv-aboutUsFourthImage"}>
                                    <img className={"fv-aboutUsFourthImage"} src={Image4}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>

                    {/*<div className={"fv-commentsInMainPageAllBody"}>*/}
                    {/*    <MDBContainer>*/}
                    {/*        <MDBRow className={"fv-commentsTitle"}>*/}
                    {/*            <MDBCol>*/}
                    {/*                <h4>نظرات مهمان ها</h4>*/}
                    {/*            </MDBCol>*/}
                    {/*        </MDBRow>*/}
                    {/*        <MDBRow className={"fv-comment"}>*/}

                    {/*            {pagination.map(pagination => {*/}
                    {/*                if (this.state.buttonCommentActiveName.includes(pagination)) {*/}
                    {/*                    return <>*/}
                    {/*                        <MDBCol md={5} className={"fv-commentLeft"}>*/}
                    {/*                            <p>{this.state.commentsLeft[pagination - 1]}</p>*/}
                    {/*                        </MDBCol>*/}
                    {/*                        <MDBCol md={5}>*/}
                    {/*                            <p>{this.state.commentsRight[pagination - 1]}</p>*/}
                    {/*                        </MDBCol>*/}
                    {/*                    </>*/}
                    {/*                }*/}

                    {/*            })}*/}
                    {/*            /!*  <MDBCol md={5} className={"fv-commentLeft"}>*/}
                    {/*                <p> قالب سایت معمولا با این موضوع رو برو هستند که م</p>*/}
                    {/*            </MDBCol>*/}
                    {/*            <MDBCol md={5}>*/}
                    {/*                <p> با این موضوع رو برو هستند که محتوای اصلی صفحات آم*/}
                    {/*                    اده نیست. در نتیجه طرح کلی دید درستی*/}
                    {/*                    به کار فرما نمیدهد. اگر طراح بخواهد*/}
                    {/*                    دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته*/}
                    {/*                    میشود و اینکار زمان بر خواهد بود. همچنین طراح به دنبال این است</p>*/}
                    {/*            </MDBCol> *!/*/}

                    {/*        </MDBRow>*/}
                    {/*        <div className={"fv-commentSvgLeft"}>*/}
                    {/*        </div>*/}
                    {/*        <div className={"fv-commentSvgRight"}>*/}
                    {/*        </div>*/}
                    {/*        <MDBRow className={"fv-gustComment"}>*/}
                    {/*            {pagination.slice(1, 1)}*/}
                    {/*            {pagination.map(pagination => {*/}
                    {/*                if (this.state.buttonCommentActiveName.includes(pagination)) { // فقط برای آن کلیک که شده برود داخل*/}
                    {/*                    return <>*/}
                    {/*                        <MDBCol md={6} className={"fv-gustNameAndInfoLeft"}>*/}
                    {/*                            <img src={this.state.userLeftPic[pagination - 1]} width="50"*/}
                    {/*                                 height="50"/>*/}
                    {/*                            نظرات مهمان ها*/}
                    {/*                        </MDBCol>*/}
                    {/*                        <MDBCol md={6} className={"fv-gustNameAndInfoRight"}>*/}
                    {/*                            <img src={this.state.userRightPic[pagination - 1]} width="50"*/}
                    {/*                                 height="50"/>*/}
                    {/*                            نظرات مهمان ها*/}
                    {/*                        </MDBCol>*/}
                    {/*                    </>*/}
                    {/*                }*/}
                    {/*            })}*/}
                    {/*            /!*<MDBCol md={6} className={"fv-gustNameAndInfoLeft"}>*/}
                    {/*                <img src={UserImage} width="50" height="50"/>*/}
                    {/*                نظرات مهمان ها*/}
                    {/*            </MDBCol>*/}
                    {/*            <MDBCol md={6} className={"fv-gustNameAndInfoRight"}>*/}
                    {/*                <img src={UserImage} width="50" height="50"/>*/}
                    {/*                نظرات مهمان ها*/}
                    {/*            </MDBCol> *!/*/}
                    {/*        </MDBRow>*/}
                    {/*        <MDBRow className={"fv-svgPagination"}>*/}
                    {/*            <MDBCol md={12}>*/}
                    {/*                <div className="slider_pagination"> /!* ButtonComments *!/*/}
                    {/*                    {pagination.map(pagination => {*/}
                    {/*                        return <button name={`btn${pagination}`}*/}
                    {/*                                       className={this.state.buttonCommentActiveName === `btn${pagination}` ? 'slider_pagination_btn active' : 'slider_pagination_btn'}*/}
                    {/*                                       onClick={(event) => this.setState({buttonCommentActiveName: event.target.name})}/>*/}
                    {/*                    })}*/}
                    {/*                </div>*/}
                    {/*            </MDBCol>*/}
                    {/*        </MDBRow>*/}
                    {/*    </MDBContainer>*/}
                    {/*</div>*/}

                    {/*<MDBRow className={"fv-topicMainPage"}>*/}
                    {/*    <TopicsMainPage topic="مجله ترپ"*/}
                    {/*                     linkToPage={"http://magazine.trapp.ir/"}*/}
                    {/*                    //linkToPage={"/magazine.trapp.ir/"}*/}
                    {/*    />*/}
                    {/*</MDBRow>*/}
                    <MDBRow className={'fv-mainMobile fv-trapMagazine'}>
                        {this.state.trappMagItems}
                    </MDBRow>
                </MDBContainer>

                <MDBContainer>
                    <Footer/>
                </MDBContainer>


            </div>
        )
    }

}

export default MainPage
