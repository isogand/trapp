import {MDBCol, MDBRow} from "mdbreact";
import HostStepCheckbox from "./hostStepCheckbox";
import React from "react";

class hostStep4PageRightBody extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            generalFacilities:[],
            kitchenFacilities:[],
            coolingAndHeatingFacilities:[],
            specialFacilities:[],
            catering:[],
            chefDisableTextbox:true ,
            hostDisableTextbox:true ,
            tourLeaderDisableTextbox:true ,
            bodyguardDisableTextbox:true ,
            chef:'',
            host:'',
            tourLeader:'',
            bodyguard:'',


        }
    }
    setCheckbox =(event,checkboxName) =>{
        let repeat = false
        const setData= this.state[checkboxName]
        if(event.target.checked === false){
            const index = setData.indexOf(event.target.name)
            if (index !== -1) {
                setData.splice(index, 1);
                this.setState({[checkboxName]:setData})
            }
        } else {
            setData.map(checked=>{
                if(checked === event.target.name){
                    repeat=true
                }
            })
            if(repeat === false){
                setData.push(event.target.name)
                this.setState({[checkboxName]:setData})
            }
        }
    }
    setCheckboxAndHandleTextBox =(event,checkboxName,handleTextBoxDisable) =>{
        let repeat = false
        const setData= this.state[checkboxName]
        if(event.target.checked === false){
            const index = setData.indexOf(event.target.name)
            if (index !== -1) {
                setData.splice(index, 1);
                this.setState({[checkboxName]:setData , [handleTextBoxDisable]:true , [event.target.name]:''})

            }
        } else {
            setData.map(checked=>{
                if(checked === event.target.name){
                    repeat=true
                }
            })
            if(repeat === false){
                setData.push(event.target.name)
                this.setState({[checkboxName]:setData , [handleTextBoxDisable]:false})
            }
        }
    }

    render(){
        return(
            <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                <h5 className={"fv-hostStep3NumberOfCapacityMobile"}>امکانات کلی</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text=" جارو برقی"
                            name='vacuumCleaner'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text=" اینترنت رایگان"
                            name='freeWifi'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="تلفن"
                            name={'telephone'}
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="جعبه کمک های اولیه"
                            name='firstAidBox'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="مهر و جانماز"
                            name='prayerMat'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="تلوزیون"
                            name='tv'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="یخچال"
                            name='refrigerator'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="اجاق گاز"
                            name='oven'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                </MDBRow>

                <h5 className={"fv-hostStep3NumberOfCapacityMobile‌"}>امکانات آشپرخانه</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="بشقاب"
                            name='plate'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="قاشق-چنگال"
                            name='spoonFork'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="لیوان"
                            name='glass'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="سماور"
                            name='samovar'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="کتری"
                            name='kettle'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="استکان"
                            name='glass'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="قابلمه"
                            name='pot'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="قوری"
                            name='teapot'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="ماهیتابه"
                            name='fryingPan'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                </MDBRow>

                <h5 className={"fv-hostStep3NumberOfCapacityMobile‌"}>امکانات سرمایشی و گرمایشی اتاق را مشخص کنید</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="کولر"
                            name='airConditioner'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="پنکه"
                            name='fan'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="کولر گازی"
                            name='gasCooler'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="پکیج"
                            name='package'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="کرسی"
                            name='chair'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="شومینه"
                            name='fireplace'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="بخاری گازی"
                            name='gasHeaters'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                    <MDBCol  md={6} sm={7} className={"fv-hostStep4CheckBoxGroupInColumnOne"}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="هیتر"
                            name='heater'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                </MDBRow>
                <h5 className={"fv-hostStep3NumberOfCapacityMobile‌"}>امکانات ویژه</h5>
                <h5 className={"fv-hostStep3NumberOfCapacityMobile‌"}>هر کدام از امکانات زیر را ارائه میدهید انتخاب کنید و مبلغ آن را ذکر کنید</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>

                    <MDBCol md={6} sm={7}>

                        <MDBRow className={'fv-hostStep4PaddingTop'}>
                            <MDBCol md={1} sm={2}>
                                <input type="checkBox" name='chef'
                                       onChange={(event)=>this.setCheckboxAndHandleTextBox(event,'specialFacilities','chefDisableTextbox')}/>
                            </MDBCol>
                            <MDBCol md={10} sm={9}>
                                <p>آشپز</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" name={'chef'} placeholder="تومان" disabled={this.state.chefDisableTextbox} value={this.state.chef}
                        onChange={(e)=>this.setState({chef:e.target.value})}/>
                    </MDBCol>

                </MDBRow>

                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={7}>

                        <MDBRow className={'fv-hostStep4PaddingTop'}>
                            <MDBCol md={1} sm={2}>
                                <input type="checkBox" name='host'
                                       onChange={(event)=>this.setCheckboxAndHandleTextBox(event,'specialFacilities','hostDisableTextbox')}/>
                            </MDBCol>
                            <MDBCol md={10} sm={9}>
                                <p>مهماندار</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" placeholder="تومان" name={'host'} disabled={this.state.hostDisableTextbox} value={this.state.host}
                               onChange={(e)=>this.setState({host:e.target.value})}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={7}>

                        <MDBRow className={'fv-hostStep4PaddingTop'}>
                            <MDBCol md={1} sm={2}>
                                <input type="checkBox" name='tourLeader'
                                       onChange={(event)=>this.setCheckboxAndHandleTextBox(event,'specialFacilities','tourLeaderDisableTextbox')}/>
                            </MDBCol>
                            <MDBCol md={10} sm={9}>
                                <p>راهنمای</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" placeholder="تومان" name={'tourLeader'} disabled={this.state.tourLeaderDisableTextbox} value={this.state.tourLeader}
                               onChange={(e)=>this.setState({tourLeader:e.target.value})}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={7}>

                        <MDBRow className={'fv-hostStep4PaddingTop'}>
                            <MDBCol md={1} sm={2}>
                                <input type="checkBox" name='bodyguard'
                                       onChange={(event)=>this.setCheckboxAndHandleTextBox(event,'specialFacilities','bodyguardDisableTextbox')}/>
                            </MDBCol>
                            <MDBCol md={10} sm={9}>
                                <p>بادیگارد</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" placeholder="تومان" name={'bodyguard'} disabled={this.state.bodyguardDisableTextbox} value={this.state.bodyguard}
                               onChange={(e)=>this.setState({bodyguard:e.target.value})}/>
                    </MDBCol>
                </MDBRow>

                <h5 className={"fv-hostStep3NumberOfCapacityMobile‌"}>پذیرایی</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={6}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="صبحانه"
                            name='breakfast'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'catering'}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={6}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="نهار"
                            name='dinner'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'catering'}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={6}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="شام"
                            name='Lunch'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'catering'}/>
                    </MDBCol>
                </MDBRow>


            </MDBCol>
        )
    }

}

export default hostStep4PageRightBody