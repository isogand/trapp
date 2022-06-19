import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep1Page.scss"
import "../style/HostStep2Page.scss"
import HeaderSteps from "../componentsPages/HeaderSteps";
import HostStepImage1 from "../images/home_miz1 png.png"
import Footer from "../componentsPages/footer";
import {getCities, getProvinces} from "../services/userService";

class HostStep2Page extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            city: '',
            provinces: '',
            village: '',
            postCode: '',
            address: '',

            provincesTitle: [],
            provincesId: 'title',
            setProvinces: false,
            provincesCitys: [],

            validCity: false,
            validAddress: false,
            validPostCode: true,
            click: false,
            hideUniq: false,
            cityLoader: false,
            provincesLoader: true,
        }

    }

    componentDidMount() {

        const PrevAddressMap = JSON.parse(localStorage.getItem("step2-2"))
        if (PrevAddressMap) {
            if (PrevAddressMap.mapAddress) {
                if (PrevAddressMap.mapAddress.length > 5) {
                    this.setState({address: PrevAddressMap.mapAddress, validAddress: true})
                }
            }
        }

        let prevData = ''

        if (JSON.parse(localStorage.getItem("step2"))) {
            prevData = JSON.parse(localStorage.getItem("step2"))


            console.log(prevData)

            let validCity = false
            let validAddress = false
            let hideUniq = false
            if (prevData.city !== "") {
                validCity = true
            }
            if (prevData.address) {
                validAddress = true
            }
            if (prevData.postalCodeDisable) { // agar az safhe eddit rafte bashad bayad gheire faal bashad
                hideUniq = true
            }


            this.setState({
                city: prevData.city,
                village: prevData.village,
                postCode: prevData.postal_code,
                address: prevData.address,
                provinces: prevData.state,

                validCity: validCity,
                validAddress: validAddress,
                hideUniq: hideUniq,
                setProvinces: true,
            })
        }


        getProvinces()
            .then(res => {
                if (prevData) {
                    this.setState({provincesTitle: res.data.data}, () => {


                        this.state.provincesTitle.map(provincesTitle => {
                            if (provincesTitle.name === prevData.state) {

                                //  this.setState({provincesId:provincesTitle.id  , provincesLoader:false})

                                getCities(provincesTitle.id)
                                    .then(res => {
                                        console.log(res)
                                        this.setState({
                                            provincesCitys: res.data.data,
                                            provincesId: provincesTitle.id,
                                            cityLoader: false,
                                            provincesLoader: false
                                        })
                                    })
                                    .catch(err => console.log(err.response))

                            }
                        })
                    })
                } else {

                    this.setState({provincesTitle: res.data.data, provincesLoader: false})
                }
            })
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
        // console.log(this.state.provincesId)
        let validationInputs = false
        if (this.state.validCity && this.state.validAddress && this.state.validPostCode) {
            validationInputs = true
        }

        // console.log(JSON.parse(localStorage.getItem("step1")))
        const localStorageData = {
            city: this.state.city,
            village: this.state.village,
            postal_code: this.state.postCode,
            address: this.state.address,
            postalCodeDisable: true,
            state: this.state.provinces,
        }

        if (this.state.hideUniq === false) {           // yani dar halate eddit nistim
            delete localStorageData.postalCodeDisable
        }


        return (
            <MDBContainer className={"fv-HostStep2Page fv-HostStep2PageOnly"}>
                <MDBRow>
                    <MDBContainer className={"fv-HostStep1Page"}>
                        <HeaderSteps/>

                        <MDBRow className={"fv-HostStep1PageBody"}>
                            <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                                <h6 style={{paddingBottom: '3%'}}
                                    className={this.state.click && validationInputs === false ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>لطفا
                                    کادر های قرمز را به درستی پر کنید</h6>
                                <p className={this.state.click && this.state.validCity === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                    <i className="fas fa-exclamation-triangle"/> پر کردن شهر و استان اجباریست</p>
                                <p className={this.state.click && this.state.validPostCode === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                    <i className="fas fa-exclamation-triangle"/>کد پستی معتبر نمی باشد</p>
                                <p className={this.state.click && this.state.validAddress === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                    <i className="fas fa-exclamation-triangle"/>نوشتن آدرس اجباریست - آدرس باید بیشتر از
                                    ۵ کاراکتر داشته باشد</p>
                                <h6 style={{marginBottom: '0%'}} className={"fv-hostStep2Page2Hidden"}>استان</h6>

                                <MDBRow>
                                    <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={7}>
                                        {this.Loader(this.state.provincesLoader, 'fv-cityLoader')}
                                    </MDBCol>
                                </MDBRow>

                                {this.state.provincesLoader ? '' :
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


                                <h6 style={{marginBottom: '0%'}} className={"fv-hostStep2Page2Hidden"}>شهر</h6>

                                <MDBRow>
                                    <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={7}>
                                        {this.Loader(this.state.cityLoader, 'fv-cityLoader')}
                                    </MDBCol>
                                </MDBRow>

                                {this.state.cityLoader ? '' :

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
                                        <option value={this.state.city} disabled>{this.state.city}</option>
                                        {this.state.provincesCitys.map(provincesCitys => {
                                            //  console.log(provincesCitys)
                                            return <option value={provincesCitys.name}>{provincesCitys.name}</option>
                                        })}
                                    </select>
                                }


                                {/*    <input type="text" placeholder={"شهر یا استان خود را وارد نماییید"} value={this.state.city} onChange={(event)=>{
                                    if(event.target.value){
                                        this.setState({validCity:true})
                                    }else {
                                        this.setState({validCity:false})
                                    }
                                    this.setState({city:event.target.value})
                                }} className={this.state.click && this.state.validCity===false ?  "fv-hostStep2Page2Hidden fv-redBorderError" : "fv-hostStep2Page2Hidden"} />

                                <h6 className={"fv-hostStep2Page2Hidden"}>روستا/محله</h6>
                                <input type="text" value={this.state.village} onChange={(event)=>{ this.setState({village:event.target.value})} } className={"fv-hostStep2Page2Hidden"}/>
                               */}
                                <h6 className={"fv-hostStep2Page2Hidden"}>کدپستی</h6>
                                <input type="number" value={this.state.postCode} onChange={(event) => {
                                    if (event.target.value.length <= 10) {
                                        this.setState({postCode: event.target.value})
                                    }
                                    if (event.target.value.length === 10 && Number(event.target.value) || event.target.value.length > 10) {
                                        this.setState({validPostCode: true})
                                    } else {
                                        this.setState({validPostCode: false})
                                    }
                                }}
                                       className={this.state.click && this.state.validPostCode === false ? "fv-hostStep2Page2Hidden fv-redBorderError" : "fv-hostStep2Page2Hidden"}/>
                                <h6 className={"fv-hostStep2Page2Hidden"}>آدرس دقیق</h6>
                                <textarea value={this.state.address} onChange={(event) => {
                                    if (event.target.value.length > 5) {
                                        this.setState({validAddress: true})
                                    } else {
                                        this.setState({validAddress: false})
                                    }
                                    this.setState({address: event.target.value})
                                }}
                                          className={this.state.click && this.state.validAddress === false ? "fv-hostStep2Page2Hidden fv-redBorderError" : "fv-hostStep2Page2Hidden"}/>
                            </MDBCol>


                            <MDBCol className={"fv-hostStepPage1Left fv-hostStepPageSpace"} sm={12} md={6}>
                                <MDBRow className={"fv-hostStepPage1LeftContentBody"}>
                                    <p>
                                        ا این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح
                                        کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های مرتبط
                                        بگردد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بو
                                        د. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگران را
                                    </p>
                                    <img src={HostStepImage1} className={"fv-hostStepPage1LeftImage"}/>
                                </MDBRow>
                                <MDBRow className={"fv-hostStepPage2LeftButtonBody"}>

                                    {this.state.cityLoader || this.state.provincesLoader ?
                                        this.Loader(true, 'fv-hostStepPage1LeftButton fv-NextBottomWaitingHostStep2Page')
                                        :
                                        <input type="button" value="مرحله بعد" className={"fv-hostStepPage1LeftButton"}
                                               onClick={() => {
                                                   if (validationInputs) {
                                                       localStorage.setItem(`${"step2"}`, JSON.stringify(localStorageData))
                                                       this.props.history.push('../../hostStepAccommodationDetails')
                                                   } else {
                                                       this.setState({click: true})
                                                   }
                                               }}/>
                                    }
                                    <input type="button" value="مرحله قبل"
                                           className={"fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton"}
                                           onClick={() => {
                                               this.props.history.push('../../hostStepSetMapLocation')
                                           }}/>
                                </MDBRow>
                            </MDBCol>

                            {/*    <HostStepLeftBodyContent
                                text=" طراحان سایت هنگام طراحی قالب سایت معمولا ب
                                    ا این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح
                                    کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های مرتبط
                                    بگردد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بو
                                    د. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگران را
                                    در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند"
                                image={MobileLogo}
                                nextLink={'../../hostStepSetMapLocation'}
                                returnLink={'../../hostStep1'}
                                localStorageName={"step2"}
                                localStorageData={localStorageData}/>  */}
                        </MDBRow>

                        <MDBRow>
                            <Footer/>
                        </MDBRow>
                    </MDBContainer>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default HostStep2Page