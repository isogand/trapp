import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep2Page2.scss"
import "../style/HostStep1Page.scss"
import "../style/HostStep4Page.scss"
import HeaderSteps from "../componentsPages/HeaderSteps";
import HostStepImage1 from "../images/home_miz1 png.png"
import Footer from "../componentsPages/footer";
import HostStepLeftBodyContent from "../componentsPages/hostStepLeftBodyContetnt"
import HostStepCheckbox from "../componentsPages/hostStepCheckbox";
import {FormControl, InputGroup} from "react-bootstrap";

class HostStep4Page extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            generalFacilities: [],
            kitchenFacilities: [],
            coolingAndHeatingFacilities: [],
            specialFacilities: [],
            catering: [],
            chefDisableTextbox: true,
            hostDisableTextbox: true,
            tourLeaderDisableTextbox: true,
            bodyguardDisableTextbox: true,
            chef: '',
            host: '',
            tourLeader: '',
            bodyguard: '',
            value: ''
        }
    }

    componentDidMount() {

        if (JSON.parse(localStorage.getItem("step4"))) {
            const prevGeneralFacilities = []
            const prevKitchenFacilities = []
            const prevCoolingAndHeatingFacilities = []
            const prevCatering = []

            const prevData = JSON.parse(localStorage.getItem("step4"))
            if (prevData.general_fac) {
                const GeneralFacilitiess = prevData.general_fac.split(",")
                for (let i = 0; i < GeneralFacilitiess.length; i++) {
                    prevGeneralFacilities.push(GeneralFacilitiess[i])
                }
            }
            if (prevData.kitchen_fac) {
                const KitchenFacilitiess = prevData.kitchen_fac.split(",")
                for (let i = 0; i < KitchenFacilitiess.length; i++) {
                    prevKitchenFacilities.push(KitchenFacilitiess[i])
                }
            }
            if (prevData.temp_fac) {
                const CoolingAndHeatingFacilitiess = prevData.temp_fac.split(",")
                for (let i = 0; i < CoolingAndHeatingFacilitiess.length; i++) {
                    prevCoolingAndHeatingFacilities.push(CoolingAndHeatingFacilitiess[i])
                }
            }
            if (prevData.catering) {
                const catering = prevData.catering.split(",")
                for (let i = 0; i < catering.length; i++) {
                    prevCatering.push(catering[i])
                }
            }
            this.setState({
                generalFacilities: prevGeneralFacilities,
                kitchenFacilities: prevKitchenFacilities,
                coolingAndHeatingFacilities: prevCoolingAndHeatingFacilities,
                catering: prevCatering,
                chef: prevData.chef,
                host: prevData.host,
                tourLeader: prevData.tour_guide,
                bodyguard: prevData.bodyguard,
            })
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
    setCheckboxAndHandleTextBox = (event, checkboxName, handleTextBoxDisable) => {
        let repeat = false
        const setData = this.state[checkboxName]
        if (event.target.checked === false) {
            const index = setData.indexOf(event.target.name)
            if (index !== -1) {
                setData.splice(index, 1);
                this.setState({[checkboxName]: setData, [handleTextBoxDisable]: true, [event.target.name]: ''})

            }
        } else {
            setData.map(checked => {
                if (checked === event.target.name) {
                    repeat = true
                }
            })
            if (repeat === false) {
                setData.push(event.target.name)
                this.setState({[checkboxName]: setData, [handleTextBoxDisable]: false})
            }
        }
    }
    onChange = (e) => {
        const re = /^[0-9\b]+$/;
        let mystring = e.target.value.replace('??????????  ', '');
        const val = mystring.replace(/,/g, "")

        if (val === '' || re.test(val)) {
            this.setState({[e.target.name]: val})
        }
    }

    render() {
        let tomanText = "??????????  "

        let generalFacilities = ""
        for (let j = 0; j < this.state.generalFacilities.length; j++) {
            if (j === 0) {
                generalFacilities = this.state.generalFacilities[j]
            } else {
                generalFacilities = `${generalFacilities},${this.state.generalFacilities[j]}`
            }
        }

        let kitchenFacilities = ""
        for (let j = 0; j < this.state.kitchenFacilities.length; j++) {
            if (j === 0) {
                kitchenFacilities = this.state.kitchenFacilities[j]
            } else {
                kitchenFacilities = `${kitchenFacilities},${this.state.kitchenFacilities[j]}`
            }
        }
        let coolingAndHeatingFacilities = ""
        for (let j = 0; j < this.state.coolingAndHeatingFacilities.length; j++) {
            if (j === 0) {
                coolingAndHeatingFacilities = this.state.coolingAndHeatingFacilities[j]
            } else {
                coolingAndHeatingFacilities = `${coolingAndHeatingFacilities},${this.state.coolingAndHeatingFacilities[j]}`
            }
        }
        let catering = ""
        for (let j = 0; j < this.state.catering.length; j++) {
            if (j === 0) {
                catering = this.state.catering[j]
            } else {
                catering = `${catering},${this.state.catering[j]}`
            }
        }


        console.log(catering)
        const localStorageData = {
            general_fac: generalFacilities,
            kitchen_fac: kitchenFacilities,
            temp_fac: coolingAndHeatingFacilities,
            chef: this.state.chef,
            host: this.state.host,
            tour_guide: this.state.tourLeader,
            bodyguard: this.state.bodyguard,
            catering: catering,


        }
        // console.log(JSON.parse(localStorage.getItem("step3")))
        return (
            <div className={" fv-HostStep2Page fv-hostStep2Page2 fv-hostStep3Page fv-hostStep4Page"}>
                <MDBContainer className={"fv-HostStep1Page"}>
                    <MDBRow>
                        <HeaderSteps/>
                    </MDBRow>

                    <MDBRow className={"fv-HostStep1PageBody"}>


                        <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>?????????????? ??????</h6>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text=" ???????? ????????"
                                        name='???????? ????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text=" ?????????????? ????????????"
                                        name='?????????????? ????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name={'????????'}
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="???????? ?????? ?????? ??????????"
                                        name='???????? ?????? ?????? ??????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="?????? ?? ????????????"
                                        name='?????? ?? ????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="??????????????"
                                        name='??????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="??????????"
                                        name='??????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="???????? ??????"
                                        name='???????? ??????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.generalFacilities}
                                        nameOfPart={'generalFacilities'}/>
                                </MDBCol>
                            </MDBRow>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile???"}>?????????????? ????????????????</h6>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="??????????"
                                        name='??????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????-??????????"
                                        name='????????-??????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="??????????"
                                        name='??????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="??????????"
                                        name='??????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????????"
                                        name='????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????????"
                                        name='????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????????????"
                                        name='????????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.kitchenFacilities}
                                        nameOfPart={'kitchenFacilities'}/>
                                </MDBCol>
                            </MDBRow>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile???"}>?????????????? ?????????????? ?? ?????????????? ???????? ???? ????????
                                ????????</h6>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="???????? ????????"
                                        name='???????? ????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????????"
                                        name='????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={5}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="?????????? ????????"
                                        name='?????????? ????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                                <MDBCol md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.coolingAndHeatingFacilities}
                                        nameOfPart={'coolingAndHeatingFacilities'}/>
                                </MDBCol>
                            </MDBRow>
                            <h6 className={"fv-hostStep3NumberOfCapacityMobile???"}>?????????????? ????????</h6>
                            <h6 className={"h7 fv-hostStep3NumberOfCapacityMobile???"}>???? ???????? ???? ?????????????? ?????? ???? ??????????
                                ???????????? ???????????? ???????? ?? ???????? ???? ???? ?????? ????????</h6>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>

                                <MDBCol md={6} sm={7}>

                                    <MDBRow className={'fv-hostStep4PaddingTop'}>
                                        <MDBCol md={1} sm={2}>
                                            <input type="checkBox" name='chef'
                                                   onChange={(event) => this.setCheckboxAndHandleTextBox(event, 'specialFacilities', 'chefDisableTextbox')}/>
                                        </MDBCol>
                                        <MDBCol md={10} sm={9}>
                                            <p>????????</p>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>

                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">??????????</InputGroup.Text>
                                        <FormControl
                                            name={'chef'}
                                            className={this.state.chefDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                            disabled={this.state.chefDisableTextbox}
                                            value={this.state.chef ? `${this.state.chef.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                            onChange={this.onChange}
                                        />
                                    </InputGroup>

                                    {/*   <input
                                        name={'chef'}
                                        className={this.state.chefDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                        disabled={this.state.chefDisableTextbox}
                                        value={this.state.chef ? `${tomanText}${this.state.chef.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                        onChange={this.onChange} placeholder="??????????"/> */}
                                </MDBCol>

                            </MDBRow>

                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={7}>

                                    <MDBRow className={'fv-hostStep4PaddingTop'}>
                                        <MDBCol md={1} sm={2}>
                                            <input type="checkBox" name='host'
                                                   onChange={(event) => this.setCheckboxAndHandleTextBox(event, 'specialFacilities', 'hostDisableTextbox')}/>
                                        </MDBCol>
                                        <MDBCol md={10} sm={9}>
                                            <p>????????????????</p>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    {console.log(this.state.hostDisableTextbox)}

                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">??????????</InputGroup.Text>
                                        <FormControl
                                            name={'host'}
                                            className={this.state.hostDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                            disabled={this.state.hostDisableTextbox}
                                            value={this.state.host ? `${this.state.host.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                            onChange={this.onChange}
                                        />
                                    </InputGroup>

                                    {/*  <input
                                        name={'host'}
                                        className={this.state.hostDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                        disabled={this.state.hostDisableTextbox}
                                        value={this.state.host ? `${tomanText}${this.state.host.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                        onChange={this.onChange} placeholder="??????????"/>  */}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={7}>

                                    <MDBRow className={'fv-hostStep4PaddingTop'}>
                                        <MDBCol md={1} sm={2}>
                                            <input type="checkBox" name='tourLeader'
                                                   onChange={(event) => this.setCheckboxAndHandleTextBox(event, 'specialFacilities', 'tourLeaderDisableTextbox')}/>
                                        </MDBCol>
                                        <MDBCol md={10} sm={9}>
                                            <p>??????????????</p>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>

                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">??????????</InputGroup.Text>
                                        <FormControl
                                            name={'tourLeader'}
                                            className={this.state.tourLeaderDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                            disabled={this.state.tourLeaderDisableTextbox}
                                            value={this.state.tourLeader ? `${this.state.tourLeader.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                            onChange={this.onChange}
                                        />
                                    </InputGroup>

                                    {/* <input
                                        name={'tourLeader'}
                                        className={this.state.tourLeaderDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                        disabled={this.state.tourLeaderDisableTextbox}
                                        value={this.state.tourLeader ? `${tomanText}${this.state.tourLeader.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                        onChange={this.onChange} placeholder="??????????"/> */}

                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={7}>

                                    <MDBRow className={'fv-hostStep4PaddingTop'}>
                                        <MDBCol md={1} sm={2}>
                                            <input type="checkBox" name='bodyguard'
                                                   onChange={(event) => this.setCheckboxAndHandleTextBox(event, 'specialFacilities', 'bodyguardDisableTextbox')}/>
                                        </MDBCol>
                                        <MDBCol md={10} sm={9}>
                                            <p>????????????????</p>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3AddPlace"}>
                                <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                                    <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                        <InputGroup.Text id="basic-addon1">??????????</InputGroup.Text>
                                        <FormControl
                                            name={'bodyguard'}
                                            className={this.state.bodyguardDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                            disabled={this.state.bodyguardDisableTextbox}
                                            value={this.state.bodyguard ? `${this.state.bodyguard.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                            onChange={this.onChange}
                                        />
                                    </InputGroup>

                                    {/*   <input
                                        name={'bodyguard'}
                                        className={this.state.bodyguardDisableTextbox ? "fv-disableTextbox" : "fv-enabledTextbox"}
                                        disabled={this.state.bodyguardDisableTextbox}
                                        value={this.state.bodyguard ? `${tomanText}${this.state.bodyguard.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}
                                        onChange={this.onChange} placeholder="??????????"/> */}

                                </MDBCol>
                            </MDBRow>

                            <h6 className={"fv-hostStep3NumberOfCapacityMobile???"}>??????????????</h6>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={6}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????????"
                                        name='????????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.catering}
                                        nameOfPart={'catering'}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={6}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="????????"
                                        name='????????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.catering}
                                        nameOfPart={'catering'}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                                <MDBCol md={6} sm={6}>
                                    <HostStepCheckbox
                                        className="fv-hostStep4PaddingTop"
                                        mdCheckbox="1"
                                        smCheckbox="2"
                                        mdCheckboxText="10"
                                        smCheckboxText="9"
                                        text="??????"
                                        name='??????'
                                        setCheckbox={this.setCheckbox}
                                        setCheckedPrev={this.state.catering}
                                        nameOfPart={'catering'}/>
                                </MDBCol>
                            </MDBRow>


                        </MDBCol>


                        <HostStepLeftBodyContent
                            text="???????????? ???????? ?????????? ?????????? ???????? ???????? ???????????? ???? ?????? ?????????? ???? ?????? ?????????? ??
                            ?? ???????????? ???????? ?????????? ?????????? ????????. ???? ?????????? ?????? ?????? ?????? ?????????? ???? ?????? ???????? ????????????. ????
                            ?? ???????? ???????????? ?????????? ?????? ?????? ?????????? ?????????? ???????????? ???? ?????? ?????? ???????? ?????????????? ?????????? ?? ??????
                            ?????? ???????? ???? ?????????? ??????. ???????????? ???????? ???? ?????????? ?????? ?????? ???? ???? ???? ?????????? ?????? ?????? ??????????
                            ?? ???? ???? ???????? ?????????? ???????? ?????? ?? ??????????????????? ?????????? ?????? ?????? ?????? ?????????? ?????????? ????????."
                            image={HostStepImage1}
                            nextLink={'../../hostStepSetPrice'}
                            returnLink={'../../hostStepAccommodationDetails'}
                            localStorageName={"step4"}
                            localStorageData={localStorageData}/>
                    </MDBRow>
                    <MDBRow>
                        <Footer/>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default HostStep4Page