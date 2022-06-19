import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep2Page2.scss"
import "../style/HostStep1Page.scss"
import "../style/HostStep3Page.scss"
import HostStepIncreaseAndDecreaseButton from "../componentsPages/hostStepIncreaseAndDecreaseButton"
import HeaderSteps from "../componentsPages/HeaderSteps";
import HostStepImage1 from "../images/home_miz1 png.png"
import Footer from "../componentsPages/footer";
import HostStepCheckbox from "../componentsPages/hostStepCheckbox"
import {Link} from "react-router-dom";
import {FormControl, InputGroup} from "react-bootstrap";

class HostStep3Page extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            standardCapacity: 1,
            maximumCapacity: 1,
            numberOfBedroom: 1,
            numberOfBed: 0,
            numberOfMattress: 0,
            iranianToilet: 1,
            Toilet: 0,
            shower: 1,
            publicToiletCheckbox: [],
            disinfectedCheckbox: [],
            otherViewsCheckbox: [],
            accommodationViewsCheckbox: [],
            typeOfRent: 'title',
            yourSpace: '',
            yourAccommodationMeasure: '',
            setOtherSpace: [],
            validAccommodationMeasure: false,
            click: false,

        }

    }

    componentDidMount() {
        const prevData = JSON.parse(localStorage.getItem("step3"))
        if (prevData) {
            const prevsharedBathroom = []
            const prevPlaces = []
            const prevView = []
            const prevDisinfected = []
            const prevSetOtherSpace = []
            let mattressCount = 0
            let bedCount = 0
            let validAccommodationMeasure = false

            if (prevData.disinfected === 1) {
                prevDisinfected.push("خانه ضدعفونی شده میباشد")
            }
            if (prevData.shared_bathroom === 1) {
                prevsharedBathroom.push("سرویس بهداشتی مشترک است")
            }
            if (prevData.places) {
                const shareplacesSplit = prevData.places.split(",")
                for (let i = 0; i < shareplacesSplit.length; i++) {
                    prevPlaces.push(shareplacesSplit[i])
                }
            }
            if (prevData.view) {
                const View = prevData.view.split(",")
                for (let i = 0; i < View.length; i++) {
                    prevView.push(View[i])
                }
            }
            if (prevData.setOtherSpace) {
                const SetOtherSpace = prevData.setOtherSpace
                for (let i = 0; i < SetOtherSpace.length; i++) {
                    prevSetOtherSpace.push(SetOtherSpace[i])
                }
            }
            if (prevData.mattress_count) {
                mattressCount = prevData.mattress_count
            }
            if (prevData.bed_count) {
                bedCount = prevData.bed_count
            }
            if (prevData.area) {
                validAccommodationMeasure = true
            }

            this.setState({
                standardCapacity: Number(prevData.standard_capacity),
                maximumCapacity: Number(prevData.max_capacity),
                typeOfRent: prevData.rent_type,
                numberOfBedroom: Number(prevData.bedroom),
                iranianToilet: Number(prevData.ir_toilet),
                Toilet: Number(prevData.eu_toilet),
                shower: Number(prevData.shower),
                yourAccommodationMeasure: prevData.area,
                publicToiletCheckbox: prevsharedBathroom,
                disinfectedCheckbox: prevDisinfected,
                otherViewsCheckbox: prevPlaces,
                accommodationViewsCheckbox: prevView,
                setOtherSpace: prevSetOtherSpace,
                numberOfMattress: Number(mattressCount),
                numberOfBed: Number(bedCount),
                validAccommodationMeasure: validAccommodationMeasure,

            })
        }

    }

    setStandardCapacityIncrement = (nameOfSection) => {
        this.setState(prevstate => {
            return {[nameOfSection]: prevstate[nameOfSection] + 1}
        })
    }
    setStandardCapacityDecrement = (nameOfSection) => {
        if (this.state[nameOfSection] > 0) {
            this.setState(prevstate => {
                return {[nameOfSection]: prevstate[nameOfSection] - 1}
            })
        } else alert('ظرفیت زیر صفر میباشد')
    }
    setCheckbox = (event, checkboxName) => {

        let repeat = false
        const setData = this.state[checkboxName]
        if (event.target.checked === false) {
            const index = setData.indexOf(event.target.name)
            if (index !== -1) {
                setData.splice(index, 1);
                this.setState({[checkboxName]: setData})
            }
        } else {
            setData.map(checked => {
                if (checked === event.target.name) {
                    repeat = true
                }
            })
            if (repeat === false) {
                setData.push(event.target.name)
                this.setState({[checkboxName]: setData})
            }
        }
    }

    render() {

        let validationInputs = false
        if (this.state.validAccommodationMeasure) {
            validationInputs = true
        }

        let publicToilet = 0
        if (this.state.publicToiletCheckbox[0]) {
            publicToilet = 1
        }
        let disinfecte = 0
        if (this.state.disinfectedCheckbox[0]) {
            disinfecte = 1
        }

        let otherViewsCheckbox = ""
        for (let i = 0; i < this.state.otherViewsCheckbox.length; i++) {
            if (i === 0) {
                otherViewsCheckbox = this.state.otherViewsCheckbox[i]
            } else {
                otherViewsCheckbox = `${otherViewsCheckbox},${this.state.otherViewsCheckbox[i]}`
            }
        }

        let accommodationViewsCheckbox = ""
        for (let j = 0; j < this.state.accommodationViewsCheckbox.length; j++) {
            if (j === 0) {
                accommodationViewsCheckbox = this.state.accommodationViewsCheckbox[j]
            } else {
                accommodationViewsCheckbox = `${accommodationViewsCheckbox},${this.state.accommodationViewsCheckbox[j]}`
            }
        }


        console.log(accommodationViewsCheckbox)
        const localStorageData = {
            standard_capacity: this.state.standardCapacity,
            max_capacity: this.state.maximumCapacity,
            rent_type: this.state.typeOfRent,
            bedroom: this.state.numberOfBedroom,
            ir_toilet: this.state.iranianToilet,
            eu_toilet: this.state.Toilet,
            shower: this.state.shower,
            disinfected: disinfecte,
            shared_bathroom: publicToilet,
            places: otherViewsCheckbox,
            view: accommodationViewsCheckbox,
            area: this.state.yourAccommodationMeasure,
            setOtherSpace: this.state.setOtherSpace,
            mattress_count: this.state.numberOfMattress,
            bed_count: this.state.numberOfBed,
        }
        // console.log(JSON.parse(localStorage.getItem("step2-2")))
        return (
            <MDBContainer className={" fv-HostStep2Page fv-hostStep2Page2 fv-hostStep3Page"}>
                <MDBContainer className={"fv-HostStep1Page"}>
                    <MDBRow>
                        <HeaderSteps/>
                    </MDBRow>

                    <MDBRow className={"fv-HostStep1PageBody"}>

                        <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>

                            <h6 style={{paddingBottom: '3%'}}
                                className={this.state.click && validationInputs === false ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>لطفا
                                کادر های قرمز را به درستی پر کنید</h6>
                            <p style={{marginTop: '1%'}}
                               className={this.state.click && this.state.validAccommodationMeasure === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> پر کردن متراژ اقامتگاه اجباریست</p>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>ظرفیت اقامت گاه</h6>

                            <HostStepIncreaseAndDecreaseButton
                                text="ظرفیت استاندارد"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.standardCapacity}
                                nameOfSection={'standardCapacity'}
                            />
                            <HostStepIncreaseAndDecreaseButton
                                text="حداکثر ظرفیت"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.maximumCapacity}
                                nameOfSection={'maximumCapacity'}
                            />

                            <h6>نوع اجاره</h6>
                            <select value={this.state.typeOfRent}
                                    onChange={(event) => this.setState({typeOfRent: event.target.value})}>
                                <option value='title' disabled></option>
                                <option value="خانه اشتراکی">خانه اشتراکی</option>
                                <option value="خانه دربست">خانه دربست</option>
                                <option value="خانه اجاره ای">خانه اجاره ای</option>
                            </select>

                            <h6 className={"fv-hostStep3BedRoom"}>اتاق خواب</h6>

                            <div className={"fv-hostStep3CapacityOfRom"}>
                                <HostStepIncreaseAndDecreaseButton
                                    text="تعداد اتاق خواب را مشخص کنید"
                                    incrementFunction={this.setStandardCapacityIncrement}
                                    decrementFunction={this.setStandardCapacityDecrement}
                                    numberValue={this.state.numberOfBedroom}
                                    nameOfSection={'numberOfBedroom'}
                                />
                            </div>

                            <HostStepIncreaseAndDecreaseButton
                                text="تعداد تخت"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.numberOfBed}
                                nameOfSection={'numberOfBed'}
                            />
                            <HostStepIncreaseAndDecreaseButton
                                text="تعداد تشک"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.numberOfMattress}
                                nameOfSection={'numberOfMattress'}
                            />

                            <h6>حمام/سرویس بهداشتی</h6>

                            <HostStepIncreaseAndDecreaseButton
                                text="توالت ایرانی"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.iranianToilet}
                                nameOfSection={'iranianToilet'}
                            />
                            <HostStepIncreaseAndDecreaseButton
                                text="توالت فرنگی"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.Toilet}
                                nameOfSection={'Toilet'}
                            />
                            <HostStepIncreaseAndDecreaseButton
                                text="دوش آب"
                                incrementFunction={this.setStandardCapacityIncrement}
                                decrementFunction={this.setStandardCapacityDecrement}
                                numberValue={this.state.shower}
                                nameOfSection={'shower'}
                            />


                            <HostStepCheckbox
                                className="fv-hostStep3CheckBox"
                                mdCheckbox="1"
                                smCheckbox="2"
                                mdCheckboxText="5"
                                smCheckboxText="10"
                                text="سرویس بهداشتی مشترک است"
                                name='سرویس بهداشتی مشترک است'
                                setCheckbox={this.setCheckbox}
                                setCheckedPrev={this.state.publicToiletCheckbox} // آرایه ایی که اگر لوکال استوریج وجود داشت پر می باشد
                                nameOfPart={'publicToiletCheckbox'}/>

                            <HostStepCheckbox
                                className="fv-hostStep3CheckBox"
                                mdCheckbox="1"
                                smCheckbox="2"
                                mdCheckboxText="5"
                                smCheckboxText="10"
                                text="خانه ضدعفونی شده میباشد"
                                name="خانه ضدعفونی شده میباشد"
                                setCheckbox={this.setCheckbox}  // توسط این کامپوننت nameOfPart که نام آن در استیت هست را پاس میدهد به این تابع تا استیت آن عوض شود
                                setCheckedPrev={this.state.disinfectedCheckbox} // آرایه ایی که اگر لوکال استوریج وجود داشت پر می باشد
                                nameOfPart={'disinfectedCheckbox'}/>

                            <h6 className={"fv-hostStep3AnyPlace"}>سایر فضاها</h6>

                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLineTwo"}>
                                <MDBCol md={2} sm={6}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="سونا"
                                        name="سونا"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.otherViewsCheckbox}
                                        nameOfPart={'otherViewsCheckbox'}/>
                                </MDBCol>
                                <MDBCol md={2} sm={6} className={"fv-hostStep3CheckBoxGroupInLineTwo test"}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="استخر"
                                        name="استخر"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.otherViewsCheckbox}
                                        nameOfPart={'otherViewsCheckbox'}/>
                                </MDBCol>
                                <MDBCol md={2} sm={6} className={"fv-hostStep3CheckBoxGroupInLineTwo test"}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="آلاچیق"
                                        name="آلاچیق"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.otherViewsCheckbox}
                                        nameOfPart={'otherViewsCheckbox'}/>
                                </MDBCol>
                                <MDBCol md={2} sm={6} className={"fv-hostStep3CheckBoxGroupInLineTwo test"}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="باربیکیو"
                                        name="باربیکیو"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.otherViewsCheckbox}
                                        nameOfPart={'otherViewsCheckbox'}/>
                                </MDBCol>
                                <MDBCol md={2} sm={6} className={"fv-hostStep3CheckBoxGroupInLineTwo test"}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="پارکینگ"
                                        name="پارکینگ"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.otherViewsCheckbox}
                                        nameOfPart={'otherViewsCheckbox'}/>
                                </MDBCol>
                                {this.state.setOtherSpace.map(otherSpaces => {
                                    if (otherSpaces !== "")
                                        return <MDBCol md={2} sm={6}
                                                       className={"fv-hostStep3CheckBoxGroupInLineTwo test"}>
                                            <HostStepCheckbox
                                                className=""
                                                mdCheckbox="4"
                                                smCheckbox="4"
                                                mdCheckboxText="8"
                                                smCheckboxText="8"
                                                text={otherSpaces}
                                                name={otherSpaces}
                                                setCheckbox={this.setCheckbox}
                                                setCheckedPrev={this.state.otherViewsCheckbox}
                                                nameOfPart={'otherViewsCheckbox'}/>
                                        </MDBCol>
                                })}
                            </MDBRow>
                            <h6 className={"fv-marginRight fv-hostStep3AddNewPlace"}>اضافه کردن فضای جدید</h6>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <input type="text" placeholder=" فضا خود را بنویسید " value={this.state.yourSpace}
                                           onChange={(e) => this.setState({yourSpace: e.target.value})}/>
                                </MDBCol>
                                <MDBCol sm={2} className={"fv-hostStep3InputButtonMobile"}>
                                    <input type="button" value=" + " onClick={() => {
                                        const space = this.state.setOtherSpace
                                        space.push(this.state.yourSpace)
                                        if (this.state.yourSpace !== "") {
                                            this.setState({setOtherSpace: space, yourSpace: ""})
                                        }
                                    }}/>
                                </MDBCol>
                                <MDBCol md={5} sm={2} className={"fv-hostStep3InputButton"}>
                                    <input type="button" value="+ افزودن فضا " onClick={() => {
                                        const space = this.state.setOtherSpace
                                        space.push(this.state.yourSpace)
                                        if (this.state.yourSpace !== "") {
                                            this.setState({setOtherSpace: space, yourSpace: ""})
                                        }
                                    }}/>
                                </MDBCol>
                            </MDBRow>
                            <h6 className={"fv-hostStep3View"}>ویوی اقامت گاه</h6>
                            <MDBRow
                                className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine fv-hostStep3CheckBoxGroupInLineSecond"}>
                                <MDBCol md={3} sm={6} className={""}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="رو به دریا"
                                        name="رو به دریا"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.accommodationViewsCheckbox}
                                        nameOfPart={'accommodationViewsCheckbox'}/>

                                </MDBCol>
                                <MDBCol md={3} sm={6} className={"fv-hostStep3CheckBoxGroupInLineSecondTwo test"}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="روبه جنگل"
                                        name="روبه جنگل"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.accommodationViewsCheckbox}
                                        nameOfPart={'accommodationViewsCheckbox'}/>
                                </MDBCol>
                                <MDBCol md={3} sm={6} className={"fv-hostStep3CheckBoxGroupInLineSecondThree test"}>
                                    <HostStepCheckbox
                                        className=""
                                        mdCheckbox="4"
                                        smCheckbox="4"
                                        mdCheckboxText="8"
                                        smCheckboxText="8"
                                        text="روبه کوهستان"
                                        name="روبه کوهستان"
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.accommodationViewsCheckbox}
                                        nameOfPart={'accommodationViewsCheckbox'}/>
                                </MDBCol>
                            </MDBRow>
                            <h6 className={"fv-hostStep3Measure"}> متراژ اقامت گاه </h6>

                            <InputGroup
                                className={this.state.click && this.state.validAccommodationMeasure === false ? "fv-redBorderError" : ""}>
                                <InputGroup.Text id="basic-addon1">متر</InputGroup.Text>
                                <FormControl
                                    className={this.state.click && this.state.validAccommodationMeasure === false ? "fv-redBorderError fv-hostStep3PageMeter" : "fv-hostStep3PageMeter"}
                                    placeholder=""
                                    value={this.state.yourAccommodationMeasure}
                                    type={'number'}
                                    onChange={(e) => {
                                        if (Number(e.target.value)) {
                                            this.setState({validAccommodationMeasure: true})
                                        } else {
                                            this.setState({validAccommodationMeasure: false})
                                        }
                                        this.setState({yourAccommodationMeasure: e.target.value})
                                    }}
                                />
                            </InputGroup>

                        </MDBCol>


                        <MDBCol className={"fv-hostStepPage1Left"} sm={12} md={6}>
                            <MDBRow className={"fv-hostStepPage1LeftContentBody"}>
                                <p>
                                    ا این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح
                                    کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های مرتبط
                                    بگردد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بو
                                    د. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگران را
                                </p>
                                <img src={HostStepImage1} className={"fv-hostStepPage1LeftImage"}/>
                            </MDBRow>
                            <MDBRow
                                className={"fv-hostStepPage2LeftButtonBody fv-hostStepPage2LeftButtonBodySharedButton"}>
                                <a><input type="button" value="مرحله بعد"
                                          className={"fv-hostStepPage1LeftButton"}
                                          onClick={() => {
                                              if (validationInputs) {
                                                  localStorage.setItem(`${"step3"}`, JSON.stringify(localStorageData))
                                                  this.props.history.push('../../hostStepFacilities')

                                              } else {
                                                  this.setState({click: true})
                                              }
                                          }}/> </a>
                                <Link to={"../../hostStepAddress"}> <input type="button" value="مرحله قبل"
                                                                           className={"fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton"}/>
                                </Link>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <Footer/>
                    </MDBRow>
                </MDBContainer>
            </MDBContainer>
        )
    }
}

export default HostStep3Page