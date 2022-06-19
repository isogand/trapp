import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep2Page2.scss"
import "../style/HostStep1Page.scss"
import "../style/HostStep5Page2.scss"
import HeaderSteps from "../componentsPages/HeaderSteps";
import Footer from "../componentsPages/footer";
import HostStepCheckbox from "../componentsPages/hostStepCheckbox"
import {storeVilla, updateVilla} from "../services/userService";
import HostStepImage1 from "../images/home_miz1 png.png"
import TimeKeeper from "../componentsPages/TimeKeeper";


class HostStep5Page2 extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            rules: [],
            specialLaw: '',
            minimumNumberOfNights: '',
            maximumNumberOfNights: '',
            groupOfGuests: [],
            arriveTime: 'title',
            exitTime: 'title',
            clickLoader: false,
            validMinimumDays: false,
            validMaximumDays: false,
            validArriveTime: false,
            validExitTime: false,


        }

    }

    componentDidMount() {


        if (JSON.parse(localStorage.getItem("step5-2"))) {
            const prevrules = []
            const prevgroupOfGuests = []
            let validMinimumDays = false
            let validMaximumDays = false

            const prevData = JSON.parse(localStorage.getItem("step5-2"))
            if (prevData.auth_rules) {
                const rules = prevData.auth_rules.split(",")
                for (let i = 0; i < rules.length; i++) {
                    prevrules.push(rules[i])
                }
            }
            if (prevData.suitable_for) {
                const groupOfGuests = prevData.suitable_for.split(",")
                for (let i = 0; i < groupOfGuests.length; i++) {
                    prevgroupOfGuests.push(groupOfGuests[i])
                }
            }
            if (prevData.min_reserve) {
                validMinimumDays = true
            }
            if (prevData.max_reserve) {
                validMaximumDays = true
            }

            this.setState({
                rules: prevrules,
                groupOfGuests: prevgroupOfGuests,
                specialLaw: prevData.special_rules,
                minimumNumberOfNights: prevData.min_reserve,
                maximumNumberOfNights: prevData.max_reserve,
                arriveTime: prevData.arrival_time,
                exitTime: prevData.exit_time,
                validMinimumDays: validMinimumDays,
                validMaximumDays: validMaximumDays,


            })
        } else {
            if (this.state.arriveTime === "title") {
                this.setState({validArriveTime: true})
            }
            if (this.state.exitTime === "title") {
                this.setState({validExitTime: true})
            }
        }
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
    getTimeArrive = (timeHour, timeMinute) => {
        const setTime = `${timeHour}.${timeMinute}`
        this.setState({arriveTime: setTime, validArriveTime: false})
    }
    exitTimeArrive = (timeHour, timeMinute) => {
        const setTime = `${timeHour}.${timeMinute}`
        this.setState({exitTime: setTime, validExitTime: false})
    }

    render() {


        let validationInputs = false
        if (this.state.validMinimumDays && this.state.validMaximumDays && !this.state.validArriveTime && !this.state.validExitTime) {
            validationInputs = true
        }

        let rules = ""
        for (let j = 0; j < this.state.rules.length; j++) {
            if (j === 0) {
                rules = this.state.rules[j]
            } else {
                rules = `${rules},${this.state.rules[j]}`
            }
        }
        let groupOfGuests = ""
        for (let j = 0; j < this.state.groupOfGuests.length; j++) {
            if (j === 0) {
                groupOfGuests = this.state.groupOfGuests[j]
            } else {
                groupOfGuests = `${groupOfGuests},${this.state.groupOfGuests[j]}`
            }
        }

        const step52Info = {
            auth_rules: rules,
            special_rules: this.state.specialLaw,
            min_reserve: this.state.minimumNumberOfNights,
            max_reserve: this.state.maximumNumberOfNights,
            suitable_for: groupOfGuests,
            arrival_time: this.state.arriveTime,
            exit_time: this.state.exitTime,
        }


        const step1Info = JSON.parse(localStorage.getItem("step1"));
        const step2Info = JSON.parse(localStorage.getItem("step2"));
        const step22Info = JSON.parse(localStorage.getItem("step2-2"));
        const step3Info = JSON.parse(localStorage.getItem("step3"));
        const step4Info = JSON.parse(localStorage.getItem("step4"));
        const step5Info = JSON.parse(localStorage.getItem("step5"));


        let allData = ""

        if (step1Info && step2Info && step3Info && step4Info && step5Info) {
            allData = {

                phone_number: step1Info.phone_number,
                story: step1Info.story,
                title: step1Info.title,
                type: step1Info.type,

                address: step2Info.address,
                city: step2Info.city,
                state: step2Info.state,
                postal_code: step2Info.postal_code,
                village: step2Info.village,


                lat: step22Info.lat,
                long: step22Info.long,
                mapAddress: step22Info.mapAddress,

                area: step3Info.area,
                bedroom: step3Info.bedroom,
                eu_toilet: step3Info.eu_toilet,
                ir_toilet: step3Info.ir_toilet,
                max_capacity: step3Info.max_capacity,
                places: step3Info.places,
                rent_type: step3Info.rent_type,
                shared_bathroom: step3Info.shared_bathroom,
                shower: step3Info.shower,
                standard_capacity: step3Info.standard_capacity,
                view: step3Info.view,
                disinfected: step3Info.disinfected,
                mattress_count: step3Info.mattress_count,
                bed_count: step3Info.bed_count,

                bodyguard: step4Info.bodyguard,
                catering: step4Info.catering,
                chef: step4Info.chef,
                general_fac: step4Info.general_fac,
                host: step4Info.host,
                kitchen_fac: step4Info.kitchen_fac,
                temp_fac: step4Info.temp_fac,
                tour_guide: step4Info.tour_guide,


                monthly_discount: step5Info.monthly_discount,
                normal_cost: step5Info.normal_cost,
                normal_extra_cost: step5Info.normal_extra_cost,
                special_cost: step5Info.special_cost,
                special_extra_cost: step5Info.special_extra_cost,
                weekly_discount: step5Info.weekly_discount,


                arrival_time: step52Info.arrival_time,
                auth_rules: step52Info.auth_rules,
                exit_time: step52Info.exit_time,
                max_reserve: step52Info.max_reserve,
                min_reserve: step52Info.min_reserve,
                special_rules: step52Info.special_rules,
                suitable_for: step52Info.suitable_for,
            }

            if (allData.address === "" || allData.address === null) {
                delete allData.address
            }
            if (allData.area === "" || allData.area === null) {
                delete allData.area
            }
            if (allData.arrival_time === "title" || allData.arrival_time === null) {
                delete allData.arrival_time
            }
            if (allData.city === "" || allData.city === null) {
                delete allData.city
            }
            if (allData.state === "title" || allData.state === null || allData.state === "") {
                delete allData.state
            }
            if (allData.exit_time === "title" || allData.exit_time === null) {
                delete allData.exit_time
            }
            if (allData.max_reserve === "" || allData.max_reserve === null) {
                delete allData.max_reserve
            }
            if (allData.min_reserve === "" || allData.min_reserve === null) {
                delete allData.min_reserve
            }
            if (allData.monthly_discount === "" || allData.monthly_discount === null) {
                delete allData.monthly_discount
            }
            if (allData.normal_cost === "" || allData.normal_cost === null) {
                delete allData.normal_cost
            }
            if (allData.normal_extra_cost === "" || allData.normal_extra_cost === null) {
                delete allData.normal_extra_cost
            }
            if (allData.phone_number === "" || allData.phone_number === null) {
                delete allData.phone_number
            }
            if (allData.postal_code === "" || allData.postal_code === null) {
                delete allData.postal_code
            }
            if (allData.rent_type === "title" || allData.rent_type === null) {
                delete allData.rent_type
            }
            if (allData.special_cost === "" || allData.special_cost === null) {
                delete allData.special_cost
            }
            if (allData.special_extra_cost === "" || allData.special_extra_cost === null) {
                delete allData.special_extra_cost
            }
            if (allData.title === "" || allData.title === null) {
                delete allData.title
            }
            if (allData.village === "" || allData.village === null) {
                delete allData.village
            }
            if (allData.weekly_discount === "" || allData.weekly_discount === null) {
                delete allData.weekly_discount
            }
            console.log(allData)

        } else {
            this.props.history.push(`/hostStepBasicInformation`)
            alert("لطفا اطلاعات را به درستی وارد نمایید")
        }

        //console.log(JSON.parse(localStorage.getItem("step5")))
        // console.log(JSON.parse(localStorage.getItem("info")))


        //console.log(JSON.parse(localStorage.getItem("step5")))
        return (
            <div
                className={" fv-HostStep2Page fv-hostStep2Page2 fv-hostStep3Page fv-hostStep4Page fv-hostStep5Page fv-hostStep5Page2"}>
                <MDBContainer className={"fv-HostStep1Page"}>
                    <MDBRow>
                        <HeaderSteps/>
                    </MDBRow>

                    <MDBRow className={"fv-HostStep1PageBody"}>
                        <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                            <h6 style={{paddingBottom: '3%'}}
                                className={this.state.click && validationInputs === false ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>لطفا
                                کادر های قرمز را به درستی پر کنید</h6>
                            <p className={this.state.click && this.state.validMinimumDays === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> پر کردن حداقل تعداد شب رزرو اجباریست</p>

                            <p className={this.state.click && this.state.validMaximumDays === false ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> پر کردن حداکثر تعداد شب رزرو اجباریست</p>


                            <p className={this.state.click && this.state.validArriveTime ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> پر کردن ساعت ورود اجباریست</p>

                            <p className={this.state.click && this.state.validExitTime ? "fv-alertErrorTextWithoutBorder" : 'fv-alertNotErrorText'}>
                                <i className="fas fa-exclamation-triangle"/> پر کردن ساعت خروج اجباریست</p>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>قوانین</h6>
                            <p className={"fv-hostStep5P"}>هرکدام از موارد که مهمان مجاز میباشد را انتخاب کنید</p>

                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={12} sm={12} className={""}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="استعمال دخانیات"
                                        name='استعمال دخانیات'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.rules}
                                        nameOfPart={'rules'}/>
                                </MDBCol>
                                <MDBCol md={12} sm={12} className={""}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="امکان برگزرای جشن"
                                        name='امکان برگزرای جشن'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.rules}
                                        nameOfPart={'rules'}/>
                                </MDBCol>

                                <MDBCol md={12} sm={12} className={""}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="ورود حیوانات"
                                        name='ورود حیوانات'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.rules}
                                        nameOfPart={'rules'}/>
                                </MDBCol>
                                <MDBCol md={12} sm={12} className={""}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="اقامت به افراد مجرد"
                                        name='اقامت به افراد مجرد'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.rules}
                                        nameOfPart={'rules'}/>
                                </MDBCol>
                            </MDBRow>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>قوانین خاص</h6>
                            <p className={"fv-hostStep5P"}>اگر قانون خاص دیگری دارید در کادر پایین بنویسید</p>
                            <MDBRow className={"fv-hostStep3AddPlace fv-hostStep5Page2SpaceRow"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <textarea value={this.state.specialLaw}
                                              onChange={(e) => this.setState({specialLaw: e.target.value})}>

                                    </textarea>
                                </MDBCol>
                            </MDBRow>

                            <p className={"fv-hostStep5P"}>حداقل تعداد شب رزرو</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10}
                                        className={"fv-marginRight fv-hostStep3InputText fv-hostStep5Page2MobileInputText"}
                                        md={6}>
                                    <input type="number" value={this.state.minimumNumberOfNights}
                                           onChange={(e) => {
                                               this.setState({minimumNumberOfNights: e.target.value})

                                               if (Number(e.target.value)) {
                                                   this.setState({validMinimumDays: true})
                                               } else {
                                                   this.setState({validMinimumDays: false})
                                               }

                                           }}
                                           className={this.state.click && this.state.validMinimumDays === false ? "fv-redBorderError" : ""}/>
                                </MDBCol>
                            </MDBRow>
                            <p className={"fv-hostStep5P"}>حداکثر تعداد شب رزرو</p>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10}
                                        className={"fv-marginRight fv-hostStep3InputText fv-hostStep5Page2MobileInputText"}
                                        md={6}>
                                    <input type="number" value={this.state.maximumNumberOfNights}
                                           onChange={(e) => {
                                               this.setState({maximumNumberOfNights: e.target.value})

                                               if (Number(e.target.value)) {
                                                   this.setState({validMaximumDays: true})
                                               } else {
                                                   this.setState({validMaximumDays: false})
                                               }

                                           }}
                                           className={this.state.click && this.state.validMaximumDays === false ? "fv-redBorderError" : ""}/>
                                </MDBCol>
                            </MDBRow>

                            <p className={"fv-hostStep5P"}>باتوجه به معماری ساختمان ,تعداد پله و راحتی دسترسی مشخص کنید
                                مناسب برای کدام گروه از مهمانان میباشد</p>

                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={12} sm={12}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="اقامت معلولین"
                                        name='اقامت معلولین'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.groupOfGuests}
                                        nameOfPart={'groupOfGuests'}/>

                                </MDBCol>
                                <MDBCol md={12} sm={12} className={""}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="اقامت سالمندان"
                                        name='اقامت سالمندان'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.groupOfGuests}
                                        nameOfPart={'groupOfGuests'}/>
                                </MDBCol>
                                <MDBCol md={12} sm={12}>
                                    <HostStepCheckbox
                                        className="fv-hostStep5Page2PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="ورود حیوانات (مثل سگ,گربه,پرنده و ...)"
                                        name='ورود حیوانات (مثل سگ,گربه,پرنده و ...'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.groupOfGuests}
                                        nameOfPart={'groupOfGuests'}/>
                                </MDBCol>
                            </MDBRow>
                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>زمان ورود و خروج</h6>
                            <p className={"fv-hostStep5P"}>لطفا زمان تحویل ملک به مهمان و تخلیه ملک را مشخص کنید</p>

                            <MDBRow className={"fv-timeOutAndTimeIn"}>
                                <MDBCol md={6} sm={12}>
                                    <MDBRow className={"fv-hostStep5Page2TimeIn"}>

                                        <MDBCol md={5} sm={5}>
                                            <p>ساعت ورود</p>
                                        </MDBCol>
                                        <MDBCol md={7} sm={7}
                                                className={this.state.click && this.state.validArriveTime ? "fv-redBorderError" : ""}>
                                            {JSON.parse(localStorage.getItem("step5-2")) ?
                                                <TimeKeeper SetGetTimeArrive={this.getTimeArrive}
                                                            prevHour={JSON.parse(localStorage.getItem("step5-2")).arrival_time.split(".")[0]}
                                                            prevMinute={JSON.parse(localStorage.getItem("step5-2")).arrival_time.split(".")[1]}/>
                                                :
                                                <TimeKeeper SetGetTimeArrive={this.getTimeArrive}
                                                            prevHour={"00"}
                                                            prevMinute={"00"}/>
                                            }


                                            {/*    <select value={this.state.arriveTime}
                                                    onChange={(event) => this.setState({arriveTime: event.target.value})}>
                                                <option value='title' disabled></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                            </select> */}
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol className={"fv-hostStep5Page2MobileTimeOut"} md={6} sm={12}>
                                    <MDBRow>
                                        <MDBCol md={5} sm={5}>
                                            <p>ساعت خروج</p>
                                        </MDBCol>
                                        <MDBCol md={7} sm={7}
                                                className={this.state.click && this.state.validExitTime ? "fv-redBorderError" : ""}>
                                            {JSON.parse(localStorage.getItem("step5-2")) ?
                                                <TimeKeeper SetGetTimeArrive={this.exitTimeArrive}
                                                            prevHour={JSON.parse(localStorage.getItem("step5-2")).exit_time.split(".")[0]}
                                                            prevMinute={JSON.parse(localStorage.getItem("step5-2")).exit_time.split(".")[1]}/>
                                                :
                                                <TimeKeeper SetGetTimeArrive={this.exitTimeArrive}
                                                            prevHour={"00"}
                                                            prevMinute={"00"}/>
                                            }

                                            {/*  <select value={this.state.exitTime}
                                                    onChange={(event) => this.setState({exitTime: event.target.value})}>
                                                <option value='title' disabled></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                            </select>*/}
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>


                        </MDBCol>

                        <MDBCol className={"fv-hostStepPage1Left fv-hostStepPageSpace"} sm={12} md={6}>
                            <MDBRow className={"fv-hostStepPage1LeftContentBody"}>
                                <p>طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند ک
                                    ه محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگ
                                    ر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته میشود و این
                                    کار زمان بر خواهد بود. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگرا
                                    ن را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند.</p>
                                <img src={HostStepImage1} className={"fv-hostStepPage1LeftImage"}/>
                            </MDBRow>
                            <MDBRow className={"fv-hostStepPage2LeftButtonBody"}>

                                {/*  <div className={this.state.clickLoader ? "loader" : "fv-hideLoader"}> */}

                                <div className={this.state.clickLoader ? "loader" : "fv-hideLoader"}>
                                    <svg className="circular" viewBox="25 25 50 50">
                                        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                                stroke-miterlimit="10"/>
                                    </svg>
                                </div>
                                <input type="button" value="ثبت اقامتگاه"
                                       className={this.state.clickLoader ? "fv-hideLoader" : "fv-hostStepPage1LeftButton"}
                                       onClick={() => {
                                           if (validationInputs) { // validation items

                                               this.setState({clickLoader: true})

                                               const editOrUpdateStatus = JSON.parse(localStorage.getItem("editCode"))
                                               if (editOrUpdateStatus) {
                                                   console.log(allData)
                                                   console.log(editOrUpdateStatus.editCode)
                                                   updateVilla(allData, editOrUpdateStatus.editCode)
                                                       .then(res => {
                                                           if (res.status === 200) {
                                                               /* localStorage.removeItem("step1")
                                                               localStorage.removeItem("step2")
                                                               localStorage.removeItem("step2-2")
                                                               localStorage.removeItem("step3")
                                                               localStorage.removeItem("step4")
                                                               localStorage.removeItem("step5") */
                                                               localStorage.setItem("step5-2", JSON.stringify(step52Info))
                                                               this.props.history.push(`/hostStepSetImage/${res.data.villa_id}`)
                                                           } else {
                                                               alert("لطفا مجددا اطلاعات خود را بررسی کنید - اطلاعات شما نادرست وارد شده")
                                                               this.props.history.push('/hostStepBasicInformation')
                                                           }
                                                       })
                                                       .catch(err => {
                                                           const getErrors = Object.values(err.response.data.errors)
                                                           let showErrors = ""
                                                           for (let i = 0; i < getErrors.length; i++) {
                                                               if (i === 0) {
                                                                   showErrors = `${getErrors[i]}`;
                                                               } else {
                                                                   showErrors = `${showErrors} \n ${getErrors[i]}`
                                                               }
                                                           }
                                                           alert(showErrors)
                                                           if (err.response.data.errors.title || err.response.data.errors.type || err.response.data.errors.phone_number || err.response.data.errors.story) {
                                                               this.props.history.push('/hostStepBasicInformation')
                                                           }
                                                           if (err.response.data.errors.city || err.response.data.errors.state || err.response.data.errors.postal_code || err.response.data.errors.address) {
                                                               this.props.history.push('/hostStepAddress')
                                                           }
                                                           if (err.response.data.errors.area || err.response.data.errors.places || err.response.data.errors.view) {
                                                               this.props.history.push('/hostStepAccommodationDetails')
                                                           }
                                                           if (err.response.data.errors.general_fac || err.response.data.errors.kitchen_fac || err.response.data.errors.temp_fac) {
                                                               this.props.history.push('/hostStepFacilities')
                                                           }
                                                           if (err.response.data.errors.normal_extra_cost || err.response.data.errors.normal_cost || err.response.data.errors.special_cost || err.response.data.errors.special_extra_cost || err.response.data.errors.weekly_discount || err.response.data.errors.monthly_discount) {
                                                               this.props.history.push('/hostStepSetPrice')
                                                           }
                                                           if (err.response.data.errors.arrival_time || err.response.data.errors.auth_rules || err.response.data.errors.exit_time || err.response.data.errors.max_reserve || err.response.data.errors.max_reserve || err.response.data.errors.suitable_for) {
                                                               window.location.reload();
                                                           }
                                                       })
                                                       .catch(err => console.log(err.response))
                                               } else {
                                                   storeVilla(allData)
                                                       .then(res => {
                                                           if (res.status === 200) {
                                                               /* localStorage.removeItem("step1")
                                                               localStorage.removeItem("step2")
                                                               localStorage.removeItem("step2-2")
                                                               localStorage.removeItem("step3")
                                                               localStorage.removeItem("step4")
                                                               localStorage.removeItem("step5") */
                                                               localStorage.setItem("step5-2", JSON.stringify(step52Info))
                                                               this.props.history.push(`/hostStepSetImage/${res.data.villa_id}`)
                                                           } else {
                                                               alert("لطفا مجددا اطلاعات خود را بررسی کنید - اطلاعات شما نادرست وارد شده")
                                                               this.props.history.push('/hostStepBasicInformation')
                                                           }
                                                       })
                                                       .catch(err => {
                                                           const getErrors = Object.values(err.response.data.errors)
                                                           let showErrors = ""
                                                           for (let i = 0; i < getErrors.length; i++) {
                                                               if (i === 0) {
                                                                   showErrors = `${getErrors[i]}`;
                                                               } else {
                                                                   showErrors = `${showErrors} \n ${getErrors[i]}`
                                                               }
                                                           }
                                                           alert(showErrors)
                                                           if (err.response.data.errors.title || err.response.data.errors.type || err.response.data.errors.phone_number || err.response.data.errors.story) {
                                                               this.props.history.push('/hostStepBasicInformation')
                                                           }
                                                           if (err.response.data.errors.city || err.response.data.errors.state || err.response.data.errors.postal_code || err.response.data.errors.address) {
                                                               this.props.history.push('/hostStepAddress')
                                                           }
                                                           if (err.response.data.errors.area || err.response.data.errors.places || err.response.data.errors.view) {
                                                               this.props.history.push('/hostStepAccommodationDetails')
                                                           }
                                                           if (err.response.data.errors.general_fac || err.response.data.errors.kitchen_fac || err.response.data.errors.temp_fac) {
                                                               this.props.history.push('/hostStepFacilities')
                                                           }
                                                           if (err.response.data.errors.normal_extra_cost || err.response.data.errors.normal_cost || err.response.data.errors.special_cost || err.response.data.errors.special_extra_cost || err.response.data.errors.weekly_discount || err.response.data.errors.monthly_discount) {
                                                               this.props.history.push('/hostStepSetPrice')
                                                           }
                                                           if (err.response.data.errors.arrival_time || err.response.data.errors.auth_rules || err.response.data.errors.exit_time || err.response.data.errors.max_reserve || err.response.data.errors.max_reserve || err.response.data.errors.suitable_for) {
                                                               window.location.reload();
                                                           }
                                                       })

                                               }

                                           } else {
                                               this.setState({click: true})
                                           }


                                           /////////////////////////////////////// err.response.data.errors.title
                                           /////////////////////////////////////// err.response.data.errors.type
                                           /////////////////////////////////////// err.response.data.errors.phone_number
                                           /////////////////////////////////////// err.response.data.errors.story

                                           /////////////////////////////////////// err.response.data.errors.city
                                           /////////////////////////////////////// err.response.data.errors.state
                                           /////////////////////////////////////// err.response.data.errors.postal_code
                                           /////////////////////////////////////// err.response.data.errors.address

                                           /////////////////////////////////////// err.response.data.errors.area
                                           /////////////////////////////////////// err.response.data.errors.places
                                           /////////////////////////////////////// err.response.data.errors.view

                                           /////////////////////////////////////// err.response.data.errors.general_fac
                                           /////////////////////////////////////// err.response.data.errors.kitchen_fac
                                           /////////////////////////////////////// err.response.data.errors.temp_fac

                                           /////////////////////////////////////// err.response.data.errors.arrival_time
                                           /////////////////////////////////////// err.response.data.errors.auth_rules
                                           /////////////////////////////////////// err.response.data.errors.exit_time
                                           /////////////////////////////////////// err.response.data.errors.max_reserve
                                           /////////////////////////////////////// err.response.data.errors.min_reserve
                                           /////////////////////////////////////// err.response.data.errors.normal_extra_cost
                                           /////////////////////////////////////// err.response.data.errors.suitable_for

                                           //if status === 500    server Error


                                           /* let fd = new FormData()
                                           fd.append("images", this.state.fileTest);
                                              const images={
                                                  img_src:"test.png",
                                                  img_title:"test"
                                              }
                                             SetImages(this.state.test,30)
                                                  .then(res => console.log(res))
                                                  .catch(err=>console.log(err.response)) */
                                       }}/>
                                <input type="button" value="مرحله قبل"
                                       className={this.state.clickLoader ? "fv-hideLoader" : "fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton"}
                                       onClick={() => {
                                           this.props.history.push('../../hostStepSetPrice')
                                       }}/>
                            </MDBRow>
                        </MDBCol>

                        {/*   <HostStepLeftBodyContent
                            text="طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند ک
                            ه محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگ
                            ر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته میشود و این
                            کار زمان بر خواهد بود. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگرا
                            ن را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند."
                            image={Logo}
                            nextLink={"../../hostStepSetImage"}
                            returnLink={"../../hostStep5"}
                            localStorageName={"step5-2"}
                            localStorageData={step52Info}/> */}

                    </MDBRow>
                    <MDBRow>
                        <Footer/>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default HostStep5Page2