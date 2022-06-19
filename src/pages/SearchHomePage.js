import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import Product from "../componentsPages/Product";
import Footer from "../componentsPages/footer"
import {Link, NavLink} from "react-router-dom"
import Datas from "../data/Datas";

import {doSearch} from "../services/searchService"
/* import {doSearch} from "../services/searchService" */
import config from "../services/config.json";
import CalendarLinear from "../data/CalenddarLinear";
import CalenddarLinearToReturn from "../data/CalenddarLinearToReturn";
import HeaderLoginMenu from "../componentsPages/HeaderLoginMenu";
import {Waiting} from "../componentsPages/WaitingLoad";
import {getCities, getProvinces} from "../services/userService";

const commaNumber = require('comma-number')


class SearchHomePage extends Datas {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            ...this.state,
            sortedBy: '',
            pageNumber: '',
            setVillage: '',
            dateToGo: '',
            dateToReturn: '',
            numberOfPeople: '',
            numberOfBedroom: '',
            villaCode: '',
            dateIn: '',
            dateOut: '',
            accommodationGroup: [],
            discountAccommodation: false,
            disinfectedAccommodation: false,
            doSearch: false,
            minCost: '',
            maxCost: '',
            mobileSortClass: "fv-searchMobileSearchPageHide",
            mobileSearchClass: "fv-searchMobileSearchPageHide2",
            addNumber: false,

            test: [],
            onclickHandelMobileMenu: false,
            paginationLimit: 4,     //   تعداد صفحات که نمایش داده شود را وارد میکنیم
            pagination: [],
            SearchResultWaitingHandle: true,

            provincesTitle: [],
            provincesId: 'title',
            setProvinces: false,
            provincesCitys: [],
            city: '',
            provinces: '',
            cityLoader: true,
            provincesLoader: true,
        }

    }

    setAccommodationGroup = (event) => {

        let repeat = false
        const setData = this.state.accommodationGroup
        if (event.target.checked === false) {
            const index = setData.indexOf(event.target.name)
            if (index !== -1) {
                setData.splice(index, 1);
                this.setState({accommodationGroup: setData})
            }
        } else {
            setData.map(checked => {
                if (checked === event.target.name) {
                    repeat = true
                }
            })
            if (repeat === false) {
                setData.push(event.target.name)
                this.setState({accommodationGroup: setData})
            }
        }
    }
    accommodationCheckedPool = () => { // dar halati ke az mainpage roie estakhrdar klick karde bashad
        if (localStorage.getItem("mainPageSearchAccommodationGroup") && this.props.location.searchDatasAccomomdation && this.props.location.searchDatasAccomomdation.accommodationGroup === "استخردار") {
            return true
        }
    }
    accommodationCheckedCoastal = () => { // dar halati ke az mainpage roie estakhrdar klick karde bashad
        if (localStorage.getItem("mainPageSearchAccommodationGroup") && this.props.location.searchDatasAccomomdation && this.props.location.searchDatasAccomomdation.accommodationGroup === "ساحلی") {
            return true
        }
    }
    accommodationCheckedSummer = () => { // dar halati ke az mainpage roie estakhrdar klick karde bashad
        if (localStorage.getItem("mainPageSearchAccommodationGroup") && this.props.location.searchDatasAccomomdation && this.props.location.searchDatasAccomomdation.accommodationGroup === "ییلاقی") {
            return true
        }
    }
    accommodationCheckedForest = () => { // dar halati ke az mainpage roie estakhrdar klick karde bashad
        if (localStorage.getItem("mainPageSearchAccommodationGroup") && this.props.location.searchDatasAccomomdation && this.props.location.searchDatasAccomomdation.accommodationGroup === "کلبه جنگلی") {
            return true
        }
    }


    componentDidMount() {
        super.componentDidMount();
        if (!JSON.parse(localStorage.getItem("mainPageSearch")) && !JSON.parse(localStorage.getItem("mainPageSearchAccommodationGroup"))) { // agar az safhe main tavasote serch ha nayomade bod (revale adi anjam shavad) bar asase page va sort ke hast anjam shavad (baraye avalin bar) safhe 1 search
            const data = {
                orderBy: this.props.match.params.sort,
                page: this.props.match.params.id
            }
            this.postAndPushResultSearchPageVillas(data)   //   دیتای اولیه که با جدیدترین ست میکنیم توسط تابعی که در کامپوننت دیتاس میباشد

        }


        let mainPageSearchLocal = ""
        if (localStorage.getItem("mainPageSearch")) {
            if (this.props.location && this.props.location.searchDatas) {
                let splitSearchPageCity = ""
                if (this.props.location.searchDatas.city) {
                    splitSearchPageCity = this.props.location.searchDatas.city.split(" ")
                }

                this.setState({
                    setVillage: splitSearchPageCity[1],
                    dateToGo: this.props.location.searchDatas.dayToGo,
                    dateToReturn: this.props.location.searchDatas.dateToReturn,
                    numberOfPeople: this.props.location.searchDatas.capacity,
                    cityLoader: false,
                })
            }
            mainPageSearchLocal = JSON.parse(localStorage.getItem("mainPageSearch"))

            if (mainPageSearchLocal.city) {                      /*  */
                let splitSearchPageCity = mainPageSearchLocal.city.split(" ")
                this.setState({
                    setVillage: splitSearchPageCity[1],
                    cityLoader: false,
                })
            }

            let data = ''
            data = {
                passengers_count: mainPageSearchLocal.numberOfPeople,
                area: mainPageSearchLocal.city,
                dateRange: `${mainPageSearchLocal.dateToGo},${mainPageSearchLocal.dateToReturn}`,      /* agar vared nashavad az server error migirad */
            }
            if (data.dateRange === ',') {
                delete data.dateRange
            }
            if (mainPageSearchLocal.numberOfPeople === null || mainPageSearchLocal.numberOfPeople === "" || mainPageSearchLocal.numberOfPeople === undefined) {
                delete data.passengers_count
            }
            if (mainPageSearchLocal.city === "C ") {
                delete data.area
            }
            if (mainPageSearchLocal.city === "C " && mainPageSearchLocal.numberOfPeople === "" && `${mainPageSearchLocal.dateToGo},${mainPageSearchLocal.dateToReturn}` === ',') { // اگر کاربر همه را خالی فرستاد
                this.props.history.push('/searchHomePage/Newest/1')
                localStorage.removeItem("mainPageSearch");
            } else {
                this.props.history.push('/searchHomePage/doSearch/1')
            }
            this.postAndPushResultSearchPageVillas(data)
            this.setState({doSearch: true})
            localStorage.removeItem("mainPageSearch");

        }
        if (localStorage.getItem("mainPageSearchAccommodationGroup")) { // agar az tarighe eghamatgah haie dar main estakhrdar , ..... omade bod
            this.setState({
                accommodationGroup: [this.props.location.searchDatasAccomomdation.accommodationGroup],
            })
            mainPageSearchLocal = JSON.parse(localStorage.getItem("mainPageSearchAccommodationGroup"))
            let data = ''
            data = {
                type: mainPageSearchLocal.accommodationGroup.toLocaleString()
            }
            console.log(data)
            this.postAndPushResultSearchPageVillas(data)
            this.setState({doSearch: true})
            localStorage.removeItem("mainPageSearchAccommodationGroup");
        }


        const paginationsShow = []
        for (let i = 0; i < this.state.paginationLimit; i++) {
            paginationsShow.push(i + 1)
        }
        this.setState({pagination: paginationsShow})


        getProvinces()
            .then(res => {
                this.setState({provincesTitle: res.data.data, provincesLoader: false})

            })
    }

    selectDayToGo = (date) => {                                    // set date to go
        console.log(date)
        if (date) {
            this.setState({dateToGo: `${date.year}/${date.month}/${date.day}`})
        }
    }
    selectDayToReturn = (date) => {                                    // set date to go
        console.log(date)
        if (date) {
            this.setState({dateToReturn: `${date.year}/${date.month}/${date.day}`})
        }
    }

    Loader = (clickLoader, className) => {
        return (
            <div className={clickLoader ? `${className}` : "fv-hideLoaderCityLoad"}>
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                            stroke-miterlimit="10"/>
                </svg>
            </div>
        )
    }

    render() {
        const initialPaginationNumber = []
        for (let i = 0; i < this.state.paginationLimit; i++) {
            initialPaginationNumber.push(i + 1)
        }

        const info = JSON.parse(localStorage.getItem("infoUser"))
        let nameAndFamily = ""
        let avatar = ""
        if (info) {
            nameAndFamily = info.userInfo.fullname
            avatar = info.userInfo.avatar
        }


        const discountAccommodation = this.state.discountAccommodation
        const disinfectedAccommodation = this.state.disinfectedAccommodation
        const searchPageVillas = this.state.searchPageVillas      // دیتا هایی که از کامپوننت دیتاس گرفته شده و برای همه سورت ها و کلیک جستجو آپدیت میشود


        const accommodationGroup = this.state.accommodationGroup
        const setAccommodationGroupToString = accommodationGroup.toLocaleString()
        const setAreaCity = 'C ' + this.state.setVillage
        const setAreaVillage = 'V ' + this.state.setVillage
        const setDateToGo = this.state.dateToGo
        const setDateToReturn = this.state.dateToReturn
        const setDateToGoAndDateToReturn = setDateToGo + ',' + setDateToReturn
        const setMinCost = this.state.minCost
        const setMaxCost = this.state.maxCost
        const setCostRange = `${setMinCost},${setMaxCost}`

        let setDiscountAccommodation = 0
        let setDisinfectedAccommodation = 0

        if (discountAccommodation) {
            setDiscountAccommodation = 1
        } else {
            setDiscountAccommodation = 0
        }
        if (disinfectedAccommodation) {
            setDisinfectedAccommodation = 1
        } else {
            setDisinfectedAccommodation = 0
        }

        const lastNumberPage = this.state.lastPageOfSearchPage
        const pages = []
        for (let i = 0; i < lastNumberPage; i++) {
            pages.push(i + 1)
        }


        const getDataPagination = (pageNumberChange) => {
            let data = ''
            data = {
                page: pageNumberChange,
                orderBy: this.props.match.params.sort,
            }
            return data
        }
        const getDataPaginationForewardAndBackwardForSearch = (pageNumber) => {
            let data = ''
            data = {
                passengers_count: this.state.numberOfPeople,
                area: setAreaCity,
                bedroom: this.state.numberOfBedroom,
                dateRange: setDateToGoAndDateToReturn,      /* agar vared nashavad az server error migirad */
                costRange: setCostRange,                    /* agar vared nashavad az server error migirad */
                type: setAccommodationGroupToString,
                discount: setDiscountAccommodation,
                disinfected: setDisinfectedAccommodation,
                page: pageNumber,
                orderBy: this.props.match.params.sort,
                villa_id: this.state.villaCode,
            }

            if (setCostRange === ',') {
                delete data.costRange
            }
            if (setDateToGoAndDateToReturn === ',') {
                delete data.dateRange
            }
            if (data.passengers_count === null || data.passengers_count === "" || data.passengers_count === undefined) {
                delete data.passengers_count
            }
            if (data.area === "C ") {
                delete data.area
            }
            if (data.villa_id === null || data.villa_id === "" || data.villa_id === undefined || data.villa_id === 0) {
                delete data.villa_id
            }
            if (data.bedroom === null || data.bedroom === "" || data.bedroom === undefined) {
                delete data.bedroom
            }
            if (data.type === null || data.type === "" || data.type === undefined) {
                delete data.type
            }
            if (setDiscountAccommodation === 0) {
                delete data.discount
            }
            if (setDisinfectedAccommodation === 0) {
                delete data.disinfected
            }
            return data
        }


        // for test
        const resultSearchPageVillas = this.state.resultSearchPageVillas

        return (
            <MDBContainer className={"fv-SearchHomePage"}>
                <MDBContainer
                    className={"fv-widthHeaderLoginMenuForSearchHomePage fv-footerMenu main"}>  {/* mobile menu */}
                    <HeaderLoginMenu  {...this.props}/>
                </MDBContainer>


                <MDBContainer className={'fv-footerMenu fv-footerDisplayPage fv-searchHomePagePathTop'}>

                    <MDBRow className={"fv-DisplayPageRotePathMobile "}>
                        <MDBCol>
                            <Link to={"/"}><p> صفحه اصلی </p></Link>
                            <i className="fas fa-chevron-left"/>
                            <p className={"fv-DisplayPagePathNow"}> صفحه
                                جستجو </p>  {/* اگر مقدار سوم وجود داشت کلاس رنگ سبز غیر فعال شود */}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                <MDBContainer className={'fv-SearchHomePageBodyMobile fv-footerMenu main'}>


                    <MDBRow>
                        <MDBCol>
                            <MDBRow className={'fv-searchMainPage'}>
                                <button onClick={() => {
                                    this.state.mobileSearchClass === "fv-searchMobileSearchPageHide2" ? this.setState({mobileSearchClass: ""}) : this.setState({mobileSearchClass: "fv-searchMobileSearchPageHide2"})
                                }}><i className="fas fa-exchange-alt"/> جست و جو پیشرفته
                                </button>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol>
                            <MDBRow className={'fv-searchMainPage fv-searchMainPageLeft'}>
                                <button onClick={() => {
                                    this.state.mobileSortClass === "fv-searchMobileSearchPageHide" ? this.setState({mobileSortClass: ""}) : this.setState({mobileSortClass: "fv-searchMobileSearchPageHide"})
                                }}><i className="fa fa-arrows-alt-v"/> مرتب سازی
                                </button>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>

                {/*                                   Desktop                                               */}

                <MDBContainer className={'fv-footerMenu fv-SearchHomePageBody'}>

                    <MDBRow>

                        <MDBCol md={4} className={`${this.state.mobileSearchClass} fv-searchMainPageBody`}>
                            <MDBRow>
                                <MDBRow className={'fv-searchMainPage'}>
                                    <MDBRow className={'fv-searchMainPagePrice'}>

                                        <MDBRow className={"fv-waitingCitySearchPage"}>
                                            <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={12}>
                                                {this.Loader(this.state.provincesLoader, 'fv-cityLoader')}
                                            </MDBCol>
                                        </MDBRow>

                                        {this.state.provincesLoader ? '' : // waiting select ostan(provinance)

                                            <select value={this.state.provincesId} onChange={(event) => {
                                                // console.log(event.target.value)
                                                // console.log(this.state.provincesTitle)
                                                this.state.provincesTitle.map(getTitleProvince => {
                                                    if (Number(event.target.value) === Number(getTitleProvince.id)) {
                                                        this.setState({provinces: getTitleProvince.name})
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
                                                    city: ''
                                                }, () => {
                                                    getCities(this.state.provincesId)
                                                        .then(res => {
                                                            console.log(res)
                                                            this.setState({
                                                                provincesCitys: res.data.data,
                                                                city: res.data.data[0].name,
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
                                                        disabled>{this.state.state ? `${this.state.state}` : `نام استان خود را انتخاب کنید`}</option>
                                                {this.state.provincesTitle.map(provincesTitle => {
                                                    return <option value={provincesTitle.id}
                                                                   name={provincesTitle.name}>{provincesTitle.name}</option>
                                                })}
                                            </select>
                                        }


                                        {this.state.cityLoader ? '' :
                                            <select value={this.state.setVillage} disabled={!this.state.setProvinces}
                                                    onChange={(event) => {
                                                        if (event.target.value !== "title" && this.state.setVillage) {
                                                            this.setState({validCity: true})
                                                        } else {
                                                            this.setState({validCity: false})
                                                        }
                                                        this.setState({setVillage: event.target.value})
                                                    }}
                                                    className={this.state.click && this.state.validCity === false ? "fv-hostStep2Page2Hidden fv-redBorderError" : "fv-hostStep2Page2Hidden"}>
                                                <option value={this.state.setVillage}
                                                        disabled>{this.state.setVillage ? `${this.state.setVillage}` : `نام شهر خود را انتخاب کنید`}</option>
                                                {this.state.provincesCitys.map(provincesCitys => {
                                                    //  console.log(provincesCitys)
                                                    return <option
                                                        value={provincesCitys.name}>{provincesCitys.name}</option>
                                                })}
                                            </select>
                                        }

                                        {/*     <input type='text' placeholder={'شهر یا روستا را وارد کنید'}
                                               value={this.state.setVillage} onChange={(event) => {
                                            this.setState({setVillage: event.target.value})
                                        }}/> */}

                                        <MDBCol md={5} sm={4} className={'fv-searchMainPage fv-searchMainPageDateOut'}>
                                            <div className={"fv-DisplayPageDetailsLeftBodyDateOnInput"}><CalendarLinear
                                                dayToGo={this.selectDayToGo}
                                                searchData={this.props.location.searchDatas} text={'تاریخ رفت'}/></div>
                                        </MDBCol>
                                        <MDBCol md={1} sm={1} className={'fv-searchMainPageBetweenDate'}>

                                        </MDBCol>
                                        <MDBCol md={5} sm={4}
                                                className={'fv-searchMainPage fv-searchMainPageDateReturn'}>
                                            <div className={"fv-DisplayPageDetailsLeftBodyDateOnInput"}>
                                                <CalenddarLinearToReturn dayToReturn={this.selectDayToReturn}
                                                                         searchData={this.props.location.searchDatas}
                                                                         text={'تاریخ برگشت'}/></div>
                                        </MDBCol>
                                        <input type='number' placeholder='تعداد نفرات' value={this.state.numberOfPeople}
                                               onChange={(event) => {
                                                   this.setState({numberOfPeople: event.target.value})
                                               }}/>
                                        <input type='number' placeholder='تعداد خواب' value={this.state.numberOfBedroom}
                                               onChange={(event) => {
                                                   this.setState({numberOfBedroom: event.target.value})
                                               }}/>
                                        <input type='text' placeholder='کدآگهی' value={this.state.villaCode}
                                               onChange={(event) => {
                                                   this.setState({villaCode: event.target.value})
                                               }}/>
                                    </MDBRow>
                                    <MDBRow className={'fv-searchMainPagePrice fv-searchMainPagePriceSecond'}>
                                        <p>قیمت</p>
                                        <MDBCol md={5} sm={4} className={'fv-searchMainPage fv-searchMainPageDateOut'}>
                                            <input type='number' placeholder='از' value={this.state.minCost}
                                                   onChange={(event) => {
                                                       this.setState({minCost: event.target.value})
                                                   }}/>
                                        </MDBCol>
                                        <MDBCol md={1} sm={1} className={'fv-searchMainPageBetweenDate'}>

                                        </MDBCol>
                                        <MDBCol md={5} sm={4}
                                                className={'fv-searchMainPage fv-searchMainPageDateReturn'}>
                                            <input type='number' placeholder='تا' value={this.state.maxCost}
                                                   onChange={(event) => {
                                                       this.setState({maxCost: event.target.value})
                                                   }}/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className={'fv-searchMainPagePrice fv-searchMainPagePriceSecond'}>
                                        <p>دسته بندی اقامتگاه</p>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="استخردار"
                                                   checked={this.accommodationCheckedPool()}
                                                   onChange={(event) => this.setAccommodationGroup(event)}/>
                                            <p>استخردار</p>
                                        </MDBCol>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="ساحلی"
                                                   checked={this.accommodationCheckedCoastal()}
                                                   onChange={(event) => this.setAccommodationGroup(event)}/><p>ساحلی</p>
                                        </MDBCol>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="ییلاقی"
                                                   checked={this.accommodationCheckedSummer()}
                                                   onChange={(event) => this.setAccommodationGroup(event)}/>
                                            <p>ییلاقی</p>
                                        </MDBCol>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="کلبه جنگلی"
                                                   checked={this.accommodationCheckedForest()}
                                                   onChange={(event) => this.setAccommodationGroup(event)}/>  <p> کلبه
                                            جنگلی</p>
                                        </MDBCol>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="خانه قدیمی"
                                                   onChange={(event) => this.setAccommodationGroup(event)}/>  <p>خانه
                                            قدیمی</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className={'fv-searchMainPagePrice fv-searchMainPagePriceSecond'}>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="اقامت گاه های دارای تخفیف"
                                                   onChange={() => {
                                                       this.setState({discountAccommodation: !discountAccommodation})
                                                   }}/> <p>اقامت گاه های دارای تخفیف</p>
                                        </MDBCol>
                                        <MDBCol md={12}>
                                            <input type="checkbox" name="اقامت گاه های ضدعفونی شده"
                                                   onChange={() => {
                                                       this.setState({disinfectedAccommodation: !disinfectedAccommodation})
                                                   }}/> <p>اقامت گاه های ضدعفونی شده</p>
                                        </MDBCol>
                                    </MDBRow>
                                    <input type='button' value='جستجو اقامتگاه'
                                           className={'fv-searchMainPagesSearchButton'} onClick={() => {
                                        let data = ''
                                        data = {
                                            passengers_count: this.state.numberOfPeople,
                                            area: setAreaCity,
                                            bedroom: this.state.numberOfBedroom,
                                            dateRange: setDateToGoAndDateToReturn,      /* agar vared nashavad az server error migirad */
                                            costRange: setCostRange,                    /* agar vared nashavad az server error migirad */
                                            type: setAccommodationGroupToString,
                                            discount: setDiscountAccommodation,
                                            disinfected: setDisinfectedAccommodation,
                                            villa_id: Number(this.state.villaCode),
                                        }

                                        if (setCostRange === ',') {
                                            delete data.costRange
                                        }
                                        if (setDateToGoAndDateToReturn === ',') {
                                            delete data.dateRange
                                        }
                                        if (data.passengers_count === null || data.passengers_count === "" || data.passengers_count === undefined) {
                                            delete data.passengers_count
                                        }
                                        if (data.area === "C ") {
                                            delete data.area
                                        }
                                        if (data.villa_id === null || data.villa_id === "" || data.villa_id === undefined || data.villa_id === 0) {
                                            delete data.villa_id
                                        }
                                        if (data.bedroom === null || data.bedroom === "" || data.bedroom === undefined) {
                                            delete data.bedroom
                                        }
                                        if (data.type === null || data.type === "" || data.type === undefined) {
                                            delete data.type
                                        }
                                        if (setDiscountAccommodation === 0) {
                                            delete data.discount
                                        }
                                        if (setDisinfectedAccommodation === 0) {
                                            delete data.disinfected
                                        }

                                        this.postAndPushResultSearchPageVillas(data)
                                        this.setState({
                                            doSearch: true,
                                            searchPageVillas: [],
                                            SearchResultWaitingHandle: true,
                                            pagination: initialPaginationNumber
                                        })
                                        this.props.history.push('/searchHomePage/doSearch/1')
                                    }}/>

                                </MDBRow>
                            </MDBRow>
                        </MDBCol>

                        <MDBCol md={8} className={"fv-searchMainPageBodyLeft"}>
                            {this.state.totalVillas === 0 ?
                                <p>اقامتگاه مورد نظر یافت نشد</p>
                                :
                                <p>{this.state.totalVillas} اقامتگاه یافت شد</p>}
                            <MDBRow className={`${this.state.mobileSortClass} fv-SortMenu`}>
                                <p>مرتب سازی بر اساس:</p>

                                <NavLink
                                    to={this.props.match.params.sort === 'Newest' ? `/searchHomePage/Newest/${this.props.match.params.id}` : `/searchHomePage/Newest/1`}
                                    exact
                                    name={'Newest'} className={'fv-unSelected'} activeClassName="fv-selected"
                                    onClick={(event) => {
                                        const data = {orderBy: 'Newest'}
                                        this.postAndPushResultSearchPageVillas(data)
                                        this.setState({
                                            sortedBy: event.target.name,
                                            doSearch: false,
                                            numberOfPeople: "",
                                            numberOfBedroom: "",
                                            searchPageVillas: [],
                                            SearchResultWaitingHandle: true,
                                            pagination: initialPaginationNumber,
                                            dateToGo: '',
                                            dateToReturn: '',
                                            setVillage: ''
                                        }) // agar bad az search karbar in ra zad hame pak shavad ke tasir migozarad bar search
                                    }}>
                                    جدیدترین
                                </NavLink>
                                <NavLink
                                    to={this.props.match.params.sort === 'Expensive' ? `/searchHomePage/Expensive/${this.props.match.params.id}` : `/searchHomePage/Expensive/1`}
                                    name={'Expensive'} exact className={'fv-unSelected'} activeClassName="fv-selected"
                                    onClick={(event) => {
                                        const data = {orderBy: 'Expensive'}
                                        this.postAndPushResultSearchPageVillas(data)
                                        this.setState({
                                            sortedBy: event.target.name,
                                            doSearch: false,
                                            numberOfPeople: "",
                                            numberOfBedroom: "",
                                            searchPageVillas: [],
                                            SearchResultWaitingHandle: true,
                                            pagination: initialPaginationNumber,
                                            dateToGo: '',
                                            dateToReturn: '',
                                            setVillage: ''
                                        })
                                    }}>
                                    گران‌ترین
                                </NavLink>
                                <NavLink
                                    to={this.props.match.params.sort === 'Cheapest' ? `/searchHomePage/Cheapest/${this.props.match.params.id}` : `/searchHomePage/Cheapest/1`}
                                    name={'Cheapest'} exact className={'fv-unSelected'} activeClassName="fv-selected"
                                    onClick={(event) => {
                                        const data = {orderBy: 'Cheapest'}
                                        this.postAndPushResultSearchPageVillas(data)
                                        this.setState({
                                            sortedBy: event.target.name,
                                            doSearch: false,
                                            numberOfPeople: "",
                                            numberOfBedroom: "",
                                            searchPageVillas: [],
                                            SearchResultWaitingHandle: true,
                                            pagination: initialPaginationNumber,
                                            dateToGo: '',
                                            dateToReturn: '',
                                            setVillage: ''
                                        })
                                    }}>
                                    ارزان‌ترین
                                </NavLink>
                                <NavLink
                                    to={this.props.match.params.sort === 'Popular' ? `/searchHomePage/Popular/${this.props.match.params.id}` : `/searchHomePage/Popular/1`}
                                    name={'Popular'} exact className={'fv-unSelected'} activeClassName="fv-selected"
                                    onClick={(event) => {
                                        const data = {orderBy: 'Popular'}
                                        this.postAndPushResultSearchPageVillas(data)
                                        this.setState({
                                            sortedBy: event.target.name,
                                            doSearch: false,
                                            numberOfPeople: "",
                                            numberOfBedroom: "",
                                            searchPageVillas: [],
                                            SearchResultWaitingHandle: true,
                                            pagination: initialPaginationNumber,
                                            dateToGo: '',
                                            dateToReturn: '',
                                            setVillage: ''
                                        })
                                    }}>
                                    محبوب‌ترین
                                </NavLink>
                                <NavLink
                                    to={this.props.match.params.sort === 'Discount' ? `/searchHomePage/Discount/${this.props.match.params.id}` : `/searchHomePage/Discount/1`}
                                    name={'Discount'} exact className={'fv-unSelected'} activeClassName="fv-selected"
                                    onClick={(event) => {
                                        const data = {orderBy: 'Discount'}
                                        this.postAndPushResultSearchPageVillas(data)
                                        this.setState({
                                            sortedBy: event.target.name,
                                            doSearch: false,
                                            numberOfPeople: "",
                                            numberOfBedroom: "",
                                            searchPageVillas: [],
                                            SearchResultWaitingHandle: true,
                                            pagination: initialPaginationNumber,
                                            dateToGo: '',
                                            dateToReturn: '',
                                            setVillage: ''
                                        })
                                    }}>
                                    پرتخفیف ها
                                </NavLink>
                                {/* <NavLink  to={this.props.match.params.sort === 'Nearest' ? `/searchHomePage/Nearest/${this.props.match.params.id}` : `/searchHomePage/Nearest/1`}
                                         name={'Nearest'} exact className={'fv-unSelected'} activeClassName="fv-selected"
                                         onClick={(event)=>{
                                             const data = {orderBy:'Nearest'}
                                             this.postAndPushResultSearchPageVillas(data)
                                             this.setState({sortedBy:event.target.name , doSearch:false})
                                }}>
                                    نزدیکترین
                                </NavLink>  */}

                            </MDBRow>
                            {/*<MDBRow style={{direction:'initial'}} className={"fv-mainProduct fv-mainMobile"}>*/}
                            <MDBRow  className={"fv-mainProduct fv-mainMobile"}>
                                {Waiting(this.state.SearchResultWaitingHandle, "fv-waitingPublicFullScreenSearchPage")}

                                {searchPageVillas.map(searchPageVilla => {
                                    // console.log(searchPageVilla)
                                    if (searchPageVilla.details) {
                                        return (
                                            <MDBCol md={4} sm={7}
                                                    onClick={() => this.props.history.push(`/displayPage/${searchPageVilla.id}`)}
                                            >  {/* میرستیم برای صفحه شخصی ویلا که displaypage هست با همان id */}

                                                <a>
                                                    <Product
                                                        srcImage={`${config.webapi}/images/villas/main/${searchPageVilla.main_img}`}
                                                        rate={searchPageVilla.score}
                                                        topic={searchPageVilla.title}
                                                        location={searchPageVilla.state}
                                                        numberOfRoom={searchPageVilla.details.bedroom}
                                                        capacity={searchPageVilla.details.max_capacity}
                                                        price={commaNumber(searchPageVilla.normal_cost)}
                                                    />
                                                </a>
                                            </MDBCol>
                                        )
                                    } else {
                                        return (
                                            <MDBCol md={4} sm={7}
                                                    onClick={() => this.props.history.push(`/displayPage/${searchPageVilla.id}`)}>
                                                <a>
                                                    <Product
                                                        srcImage={`${config.webapi}/images/villas/thum/${searchPageVilla.main_img}`}
                                                        rate={searchPageVilla.score}
                                                        topic={searchPageVilla.title}
                                                        location={searchPageVilla.state}
                                                        numberOfRoom="2"
                                                        capacity="2"
                                                        price={searchPageVilla.normal_cost}/>
                                                </a>
                                            </MDBCol>
                                        )
                                    }
                                })}

                            </MDBRow>
                            <MDBRow className={"fv-SearchHomePagePagination"}>


                                <button
                                    className={this.props.match.params.sort === "doSearch" ? "fv-hideforwardAndBackwardButton fv-hideMobile" : 'fv-SearchHomePagePaginationDefault fv-hideMobile'}
                                    disabled={pages.length < this.state.paginationLimit ? true : false} onClick={() => {  // agar tedad safahat kamtarz 2ta bod
                                    let newPagination = []
                                    for (let i = 0; i < this.state.pagination.length; i++) {
                                        newPagination.push(i + 1)
                                    }
                                    const datas = getDataPagination(1)
                                    this.postAndPushResultSearchPageVillas(datas)
                                    this.setState({
                                        pagination: newPagination,
                                        searchPageVillas: [],
                                        SearchResultWaitingHandle: true
                                    })

                                    this.props.history.push(`/searchHomePage/${this.props.match.params.sort}/1`)
                                }}><i className="fas fa-angle-double-right"/></button>

                                {this.state.totalVillas !== 0 ? // اگر اقامتگاه وجود داشت و تعداد اقامتگاه های یافت شده در سرچ 0 نبود
                                    <button className={'fv-SearchHomePagePaginationDefault'}
                                            disabled={pages.length < this.state.paginationLimit ? true : false}
                                            onClick={() => {  // agar tedad safahat kamtarz 2ta bod
                                                if (this.props.match.params.id > 1) {  // hadeaghal 2 bashad ke manfi nashavad

                                                    if (Number(this.props.match.params.id) === Number(this.state.pagination[0])) {
                                                        let newPagination = []
                                                        for (let i = 0; i < this.state.pagination.length; i++) {
                                                            newPagination.push(this.state.pagination[i] - 1)
                                                        }
                                                        this.setState({
                                                            pagination: newPagination,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })
                                                    }

                                                    if (this.props.match.params.sort === "doSearch") { // اگر سرچ کرده بود و بعد زد فقط یکی اضهفه شود به آن

                                                        const data = getDataPaginationForewardAndBackwardForSearch(Number(this.props.match.params.id) - 1)
                                                        console.log(data)
                                                        this.postAndPushResultSearchPageVillas(data)

                                                        this.setState({
                                                            pageNumber: this.props.match.params.id + 1,
                                                            pageNum: this.props.match.params.id - 1,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })
                                                        this.props.history.push(`/searchHomePage/doSearch/${Number(this.props.match.params.id) - 1}`)
                                                    } else {

                                                        const datas = getDataPagination(Number(this.props.match.params.id) - 1)
                                                        this.postAndPushResultSearchPageVillas(datas)
                                                        this.setState({
                                                            pageNum: Number(this.props.match.params.id) - 1,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })

                                                        this.props.history.push(`/searchHomePage/${this.props.match.params.sort}/${Number(this.props.match.params.id) - 1}`)
                                                    }


                                                }
                                            }}><i className="fas fa-caret-right"/></button>

                                    : ''
                                }

                                {pages.length < this.state.paginationLimit ? pages.map(pagenumber => {
                                        if (this.state.totalVillas !== 0) {  // اگر اقامتگاه وجود داشت و تعداد اقامتگاه های یافت شده در سرچ 0 نبود
                                            return (

                                                <NavLink
                                                    to={`/searchHomePage/${this.props.match.params.sort}/${pagenumber}`}
                                                    exact name={pagenumber}
                                                    className={'fv-SearchHomePagePaginationDefault'}
                                                    activeClassName="fv-SearchHomePagePaginationSelected"
                                                    onClick={(event) => {
                                                        const data = getDataPaginationForewardAndBackwardForSearch(pagenumber)
                                                        this.postAndPushResultSearchPageVillas(data)
                                                        this.setState({
                                                            pageNumber: event.target.name,
                                                            pageNum: pagenumber,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })
                                                    }}>
                                                    {pagenumber}
                                                </NavLink>

                                            )
                                        }

                                    })
                                    :
                                    this.state.pagination.map(paginations => {
                                        return (

                                            <NavLink
                                                to={`/searchHomePage/${this.props.match.params.sort}/${paginations}`}
                                                exact name={paginations}
                                                className={'fv-SearchHomePagePaginationDefault'}
                                                activeClassName="fv-SearchHomePagePaginationSelected"
                                                onClick={(event) => {
                                                    const data = getDataPaginationForewardAndBackwardForSearch(paginations)
                                                    this.postAndPushResultSearchPageVillas(data)
                                                    this.setState({
                                                        pageNumber: event.target.name,
                                                        pageNum: paginations,
                                                        searchPageVillas: [],
                                                        SearchResultWaitingHandle: true
                                                    })
                                                }}>
                                                {paginations}
                                            </NavLink>

                                        )
                                    })
                                }

                                {this.state.totalVillas !== 0 ? // اگر اقامتگاه وجود داشت و تعداد اقامتگاه های یافت شده در سرچ 0 نبود
                                    <button className={'fv-SearchHomePagePaginationDefault'}
                                            disabled={pages.length < this.state.paginationLimit ? true : false}
                                            onClick={() => {    // agar tedad safahat kamtarz 2ta bod
                                                if (this.props.match.params.id < pages.length) {  // kamtarz kole safahat bashad ke agar ezafe shod balataraz safahat nashavad
                                                    if (this.props.match.params.id >= this.state.pagination.length && Number(this.props.match.params.id) === Number(this.state.pagination[this.state.pagination.length - 1])) {
                                                        let newPagination = []
                                                        for (let i = 0; i < this.state.pagination.length; i++) {
                                                            newPagination.push(this.state.pagination[i] + 1)
                                                        }
                                                        this.setState({
                                                            pagination: newPagination,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })
                                                    }

                                                    if (this.props.match.params.sort === "doSearch") { // اگر سرچ کرده بود و بعد زد فقط یکی اضهفه شود به آن

                                                        const data = getDataPaginationForewardAndBackwardForSearch(Number(this.props.match.params.id) + 1)
                                                        console.log(data)
                                                        this.postAndPushResultSearchPageVillas(data)

                                                        this.setState({
                                                            pageNumber: this.props.match.params.id + 1,
                                                            pageNum: this.props.match.params.id + 1,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })
                                                        this.props.history.push(`/searchHomePage/doSearch/${Number(this.props.match.params.id) + 1}`)
                                                    } else { // به صورت عای
                                                        const datas = getDataPagination(Number(this.props.match.params.id) + 1)
                                                        this.postAndPushResultSearchPageVillas(datas)
                                                        this.setState({
                                                            pageNum: Number(this.props.match.params.id) + 1,
                                                            addNumber: true,
                                                            searchPageVillas: [],
                                                            SearchResultWaitingHandle: true
                                                        })

                                                        this.props.history.push(`/searchHomePage/${this.props.match.params.sort}/${Number(this.props.match.params.id) + 1}`)
                                                    }


                                                }
                                            }}><i className="fas fa-caret-left"/></button>
                                    : ''
                                }


                                <button
                                    className={this.props.match.params.sort === "doSearch" ? "fv-hideforwardAndBackwardButton fv-hideMobile" : 'fv-SearchHomePagePaginationDefault fv-hideMobile'}
                                    disabled={pages.length < this.state.paginationLimit ? true : false} onClick={() => {  // agar tedad safahat kamtarz 2ta bod
                                    let newPagination = []
                                    let endNumberOfPagesLimit = this.state.lastPageOfSearchPage  // akharin khane + 1
                                    let j = 1
                                    for (let i = (endNumberOfPagesLimit - this.state.pagination.length); i < endNumberOfPagesLimit; i++) {
                                        newPagination.push((endNumberOfPagesLimit - this.state.pagination.length) + j)
                                        j = j + 1
                                    }
                                    const datas = getDataPagination(endNumberOfPagesLimit)
                                    this.postAndPushResultSearchPageVillas(datas)
                                    this.setState({
                                        pagination: newPagination,
                                        searchPageVillas: [],
                                        SearchResultWaitingHandle: true
                                    })

                                    this.props.history.push(`/searchHomePage/${this.props.match.params.sort}/${endNumberOfPagesLimit}`)
                                }}><i className="fas fa-angle-double-left"/></button>

                            </MDBRow>
                        </MDBCol>


                    </MDBRow>

                </MDBContainer>

                <MDBRow>
                    <Footer/>
                </MDBRow>

            </MDBContainer>
        )
    }
}

export default SearchHomePage
