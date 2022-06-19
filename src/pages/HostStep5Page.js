import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep2Page2.scss"
import "../style/HostStep1Page.scss"
import "../style/HostStep5Page.scss"
import HeaderSteps from "../componentsPages/HeaderSteps";
import Footer from "../componentsPages/footer";
import HostStepImage1 from "../images/home_miz1 png.png"
import {FormControl, InputGroup} from "react-bootstrap";

const commaNumber = require('comma-number')

class HostStep5Page extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            pricesFromSaturdayToWednesday: '',
            priceFridayAndHoliday: '',
            extraPersonPricesOnNormalDays: '',
            extraPersonPricesOnHolidays: '',
            weeklyDiscount: '',
            monthlyDiscount: '',

            validNormalCost: false,
            validExtraCost: false,
            validNormalCostExtraPerson: false,
            validExtraCostExtraPerson: false,
            click: false,
        }
    }

    componentDidMount() {

        if (JSON.parse(localStorage.getItem("step5"))) {
            const prevData = JSON.parse(localStorage.getItem("step5"))
            let NormalCost = false    /// اگر وجود داشت true میباشد و اگر کلیک next  را بزند باید بتواند به مرحله بعدی برود
            if (prevData.normal_cost) {
                NormalCost = true   /// اگر وجود داشت true میباشد و اگر کلیک next  را بزند باید بتواند به مرحله بعدی برود
            }
            let ExtraCost = false    /// اگر وجود داشت true میباشد و اگر کلیک next  را بزند باید بتواند به مرحله بعدی برود
            if (prevData.special_cost) {
                ExtraCost = true   /// اگر وجود داشت true میباشد و اگر کلیک next  را بزند باید بتواند به مرحله بعدی برود
            }
            let validNormalCostExtraPerson = false
            if (prevData.normal_extra_cost) {
                validNormalCostExtraPerson = true
            }
            let validExtraCostExtraPerson = false
            if (prevData.special_extra_cost) {
                validExtraCostExtraPerson = true
            }
            this.setState({
                pricesFromSaturdayToWednesday: prevData.normal_cost,
                priceFridayAndHoliday: prevData.special_cost,
                extraPersonPricesOnNormalDays: prevData.normal_extra_cost,
                extraPersonPricesOnHolidays: prevData.special_extra_cost,
                weeklyDiscount: prevData.weekly_discount,
                monthlyDiscount: prevData.monthly_discount,

                validNormalCost: NormalCost,
                validExtraCost: ExtraCost,
                validNormalCostExtraPerson: validNormalCostExtraPerson,
                validExtraCostExtraPerson: validExtraCostExtraPerson,
            })
        }
    }

    onChange = (e) => {
        const re = /^[0-9\b]+$/;
        let mystring = e.target.value.replace('تومان  ', '');
        const val = mystring.replace(/,/g, "")

        if (val === '' || re.test(val)) {
            this.setState({[e.target.name]: val})
        }
    }

    render() {
        let tomanText = "تومان  "

        let validationInputs = false
        if (this.state.validNormalCost && this.state.validExtraCost && this.state.validNormalCostExtraPerson && this.state.validExtraCostExtraPerson) {    //چک میکند اگر همه شرایط خاص که باید درنظر گرفته بشود تا از سرور اررور نگیرد اگر true بود آنوقت اجازه بدهد که کلیک بعدی انجام شود
            validationInputs = true    // اجازه برای کلیک به صفحه بعد
        }

        const localStorageData = {
            normal_cost: this.state.pricesFromSaturdayToWednesday,
            special_cost: this.state.priceFridayAndHoliday,
            normal_extra_cost: this.state.extraPersonPricesOnNormalDays,
            special_extra_cost: this.state.extraPersonPricesOnHolidays,
            weekly_discount: Number(this.state.weeklyDiscount),
            monthly_discount: Number(this.state.monthlyDiscount),
        }
        //console.log(JSON.parse(localStorage.getItem("step4")))

        return (
            <div className={" fv-HostStep2Page fv-hostStep2Page2 fv-hostStep3Page fv-hostStep4Page fv-hostStep5Page"}>
                <MDBContainer className={"fv-HostStep1Page"}>
                    <MDBRow>
                        <HeaderSteps/>
                    </MDBRow>


                    <MDBRow className={"fv-HostStep1PageBody"}>
                        <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                            <p className={this.state.click && validationInputs === false ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>لطفا
                                کادر های قرمز را به درستی پر کنید</p>
                            <p className={this.state.click && this.state.validNormalCost === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> قیمت را به درستی وارد فرمایید - وارد کردن
                                قیمت از شنبه تا چهارشنبه اجباریست</p>
                            <p className={this.state.click && this.state.validExtraCost === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> قیمت را به درستی وارد فرمایید - وارد کردن
                                قیمت پنجشنبه و جمعه و تعطیل اجباریست</p>

                            <p className={this.state.click && this.state.validNormalCostExtraPerson === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/>قیمت را به درستی وارد فرمایید - وارد کردن
                                قیمت نفر اضافه در روز های عادی اجباریست</p>
                            <p className={this.state.click && this.state.validExtraCostExtraPerson === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/>قیمت را به درستی وارد فرمایید - قیمت نفر
                                اضافه در روز های پیک اجباریست</p>
                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>قیمت گذاری کلی</h6>
                            <p className={"fv-hostStep5P"}>قیمت از شنبه تا چهارشنبه</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>


                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">تومان</InputGroup.Text>
                                        <FormControl
                                            type="text"
                                            name={'pricesFromSaturdayToWednesday'}
                                            value={`${this.state.pricesFromSaturdayToWednesday.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                            onChange={(e) => {
                                                if (e.target.value !== 'تومان ') {
                                                    if (e.target.value.length > 0 && this.state.pricesFromSaturdayToWednesday.length > 2 && Number(this.state.pricesFromSaturdayToWednesday)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود
                                                        this.setState({validNormalCost: true})
                                                    } else {
                                                        this.setState({validNormalCost: false})
                                                    }
                                                    this.onChange(e)
                                                }

                                            }}
                                            className={this.state.click && this.state.validNormalCost === false ? "fv-redBorderError" : ""}
                                        />
                                    </InputGroup>

                                    {/*  <input type="text"
                                           name={'pricesFromSaturdayToWednesday'}
                                           value={`${tomanText}${this.state.pricesFromSaturdayToWednesday.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                           onChange={(e) => {
                                               if (e.target.value !== 'تومان ') {
                                                   if (e.target.value.length > 0 && this.state.pricesFromSaturdayToWednesday.length > 2 && Number(this.state.pricesFromSaturdayToWednesday)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود
                                                       this.setState({validNormalCost: true})
                                                   } else {
                                                       this.setState({validNormalCost: false})
                                                   }
                                                   this.onChange(e)
                                               }

                                           }}
                                           className={this.state.click && this.state.validNormalCost === false ? "fv-redBorderError" : ""}/>*/}
                                </MDBCol>
                            </MDBRow>
                            <p className={"fv-hostStep5P"}>قیمت پنجشنبه و جمعه و تعطیل (ایام پیک)</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">تومان</InputGroup.Text>
                                        <FormControl
                                            type="text"
                                            name={'priceFridayAndHoliday'}
                                            value={`${this.state.priceFridayAndHoliday.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                            onChange={(e) => {
                                                if (e.target.value !== 'تومان ') {
                                                    if (e.target.value.length > 0 && this.state.priceFridayAndHoliday.length > 2 && Number(this.state.priceFridayAndHoliday)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود (اگر وجود داشت و عدد بود)
                                                        this.setState({validExtraCost: true})
                                                    } else {
                                                        this.setState({validExtraCost: false})
                                                    }
                                                    this.onChange(e)
                                                }
                                            }}
                                            className={this.state.click && this.state.validExtraCost === false ? "fv-redBorderError" : ""}/>
                                    </InputGroup>

                                    {/*   <input type="text"
                                           name={'priceFridayAndHoliday'}
                                           value={`${tomanText}${this.state.priceFridayAndHoliday.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                           onChange={(e) => {
                                               if (e.target.value !== 'تومان ') {
                                                   if (e.target.value.length > 0 && this.state.priceFridayAndHoliday.length > 2 && Number(this.state.priceFridayAndHoliday)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود (اگر وجود داشت و عدد بود)
                                                       this.setState({validExtraCost: true})
                                                   } else {
                                                       this.setState({validExtraCost: false})
                                                   }
                                                   this.onChange(e)
                                               }
                                           }}
                                           className={this.state.click && this.state.validExtraCost === false ? "fv-redBorderError" : ""}/> */}

                                </MDBCol>
                            </MDBRow>
                            <p className={"fv-hostStep5P"}>قیمت نفر اضافه در روز های عادی</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>

                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">تومان</InputGroup.Text>
                                        <FormControl
                                            type="text"
                                            name={'extraPersonPricesOnNormalDays'}
                                            value={`${this.state.extraPersonPricesOnNormalDays.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                            onChange={(e) => {
                                                if (e.target.value !== 'تومان ') {
                                                    if (e.target.value.length > 0 && this.state.extraPersonPricesOnNormalDays.length > 2 && Number(this.state.extraPersonPricesOnNormalDays)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود
                                                        this.setState({validNormalCostExtraPerson: true})
                                                    } else {
                                                        this.setState({validNormalCostExtraPerson: false})
                                                    }
                                                    this.onChange(e)
                                                }
                                            }}
                                            className={this.state.click && this.state.validNormalCostExtraPerson === false ? "fv-redBorderError" : ""}/>
                                    </InputGroup>

                                    {/*  <input type="text"
                                           name={'extraPersonPricesOnNormalDays'}
                                           value={`${tomanText}${this.state.extraPersonPricesOnNormalDays.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                           onChange={(e) => {
                                               if (e.target.value !== 'تومان ') {
                                                   if (e.target.value.length > 0 && this.state.extraPersonPricesOnNormalDays.length > 2 && Number(this.state.extraPersonPricesOnNormalDays)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود
                                                       this.setState({validNormalCostExtraPerson: true})
                                                   } else {
                                                       this.setState({validNormalCostExtraPerson: false})
                                                   }
                                                   this.onChange(e)
                                               }
                                           }}
                                           className={this.state.click && this.state.validNormalCostExtraPerson === false ? "fv-redBorderError" : ""}/> */}
                                </MDBCol>
                            </MDBRow>
                            <p className={"fv-hostStep5P"}>قیمت نفر اضافه در روز های پیک</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">تومان</InputGroup.Text>
                                        <FormControl
                                            type="text"
                                            name={'extraPersonPricesOnHolidays'}
                                            value={`${this.state.extraPersonPricesOnHolidays.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                            onChange={(e) => {
                                                if (e.target.value !== 'تومان ') {
                                                    if (e.target.value.length > 0 && this.state.extraPersonPricesOnHolidays.length > 2 && Number(this.state.extraPersonPricesOnHolidays)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود
                                                        this.setState({validExtraCostExtraPerson: true})
                                                    } else {
                                                        this.setState({validExtraCostExtraPerson: false})
                                                    }
                                                    this.onChange(e)
                                                }
                                            }}
                                            className={this.state.click && this.state.validExtraCostExtraPerson === false ? "fv-redBorderError" : ""}/>
                                    </InputGroup>

                                    {/*  <input type="text"
                                           name={'extraPersonPricesOnHolidays'}
                                           value={`${tomanText}${this.state.extraPersonPricesOnHolidays.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                           onChange={(e) => {
                                               if (e.target.value !== 'تومان ') {
                                                   if (e.target.value.length > 0 && this.state.extraPersonPricesOnHolidays.length > 2 && Number(this.state.extraPersonPricesOnHolidays)) {   // اگر این شرایط بود آنگاه معتبر میباشد و true میشود
                                                       this.setState({validExtraCostExtraPerson: true})
                                                   } else {
                                                       this.setState({validExtraCostExtraPerson: false})
                                                   }
                                                   this.onChange(e)
                                               }
                                           }}
                                           className={this.state.click && this.state.validExtraCostExtraPerson === false ? "fv-redBorderError" : ""}/>  */}
                                </MDBCol>
                            </MDBRow>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>تخفیف</h6>
                            <p style={{marginTop: '1%', marginBottom: '1%', fontSize: '13px'}}
                               className={"fv-hostStep5P"}>میتوانید جهت تشویق مهمانان به رزرو بیشتر تخفیف قرار دهید</p>
                            <p className={"fv-hostStep5P fv-discountWeekly"}>تخفیف هفتگی</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <input type="number" placeholder={"%"} value={this.state.weeklyDiscount}
                                           onChange={(e) => this.setState({weeklyDiscount: e.target.value})}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <p className={"fv-hostStep5P"}>تخفیف ماهانه</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <input type="number" placeholder={"%"} value={this.state.monthlyDiscount}
                                           onChange={(e) => this.setState({monthlyDiscount: e.target.value})}
                                    />
                                </MDBCol>
                            </MDBRow>


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
                                <input type="button" value="مرحله بعد" className={"fv-hostStepPage1LeftButton"}
                                       onClick={() => {
                                           if (validationInputs) {
                                               localStorage.setItem(`${"step5"}`, JSON.stringify(localStorageData))
                                               this.props.history.push('../../hostStepRules')
                                           } else {
                                               this.setState({click: true})
                                           }
                                       }}/>
                                <input type="button" value="مرحله قبل"
                                       className={"fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton"}
                                       onClick={() => {
                                           this.props.history.push('../../hostStepFacilities')
                                       }}/>
                            </MDBRow>
                        </MDBCol>

                        {/* <HostStepLeftBodyContent
                            text="طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند ک
                            ه محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگ
                            ر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته میشود و این
                            کار زمان بر خواهد بود. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگرا
                            ن را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند."
                            image={Logo}
                            nextLink={"../../hostStepRules"}
                            returnLink={"../../hostStepFacilities"}
                            localStorageName={"step5"}
                            localStorageData={localStorageData}/> */}
                    </MDBRow>
                    <MDBRow>
                        <Footer/>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default HostStep5Page
