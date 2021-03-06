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
                <h5 className={"fv-hostStep3NumberOfCapacityMobile"}>?????????????? ??????</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text=" ???????? ????????"
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
                            text=" ?????????????? ????????????"
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
                            text="????????"
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
                            text="???????? ?????? ?????? ??????????"
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
                            text="?????? ?? ????????????"
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
                            text="??????????????"
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
                            text="??????????"
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
                            text="???????? ??????"
                            name='oven'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'generalFacilities'}/>
                    </MDBCol>
                </MDBRow>

                <h5 className={"fv-hostStep3NumberOfCapacityMobile???"}>?????????????? ????????????????</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="??????????"
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
                            text="????????-??????????"
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
                            text="??????????"
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
                            text="??????????"
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
                            text="????????"
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
                            text="????????????"
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
                            text="????????????"
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
                            text="????????"
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
                            text="????????????????"
                            name='fryingPan'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'kitchenFacilities'}/>
                    </MDBCol>
                </MDBRow>

                <h5 className={"fv-hostStep3NumberOfCapacityMobile???"}>?????????????? ?????????????? ?? ?????????????? ???????? ???? ???????? ????????</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={5}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="????????"
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
                            text="????????"
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
                            text="???????? ????????"
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
                            text="????????"
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
                            text="????????"
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
                            text="????????????"
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
                            text="?????????? ????????"
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
                            text="????????"
                            name='heater'
                            setCheckbox = {this.setCheckbox}
                            nameOfPart={'coolingAndHeatingFacilities'}/>
                    </MDBCol>
                </MDBRow>
                <h5 className={"fv-hostStep3NumberOfCapacityMobile???"}>?????????????? ????????</h5>
                <h5 className={"fv-hostStep3NumberOfCapacityMobile???"}>???? ???????? ???? ?????????????? ?????? ???? ?????????? ???????????? ???????????? ???????? ?? ???????? ???? ???? ?????? ????????</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>

                    <MDBCol md={6} sm={7}>

                        <MDBRow className={'fv-hostStep4PaddingTop'}>
                            <MDBCol md={1} sm={2}>
                                <input type="checkBox" name='chef'
                                       onChange={(event)=>this.setCheckboxAndHandleTextBox(event,'specialFacilities','chefDisableTextbox')}/>
                            </MDBCol>
                            <MDBCol md={10} sm={9}>
                                <p>????????</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" name={'chef'} placeholder="??????????" disabled={this.state.chefDisableTextbox} value={this.state.chef}
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
                                <p>????????????????</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" placeholder="??????????" name={'host'} disabled={this.state.hostDisableTextbox} value={this.state.host}
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
                                <p>??????????????</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" placeholder="??????????" name={'tourLeader'} disabled={this.state.tourLeaderDisableTextbox} value={this.state.tourLeader}
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
                                <p>????????????????</p>
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-hostStep3AddPlace"}>
                    <MDBCol sm={10} className={"fv-marginRight fv-hostStep3InputText"} md={6}>
                        <input type="text" placeholder="??????????" name={'bodyguard'} disabled={this.state.bodyguardDisableTextbox} value={this.state.bodyguard}
                               onChange={(e)=>this.setState({bodyguard:e.target.value})}/>
                    </MDBCol>
                </MDBRow>

                <h5 className={"fv-hostStep3NumberOfCapacityMobile???"}>??????????????</h5>
                <MDBRow className={"fv-hostStep3CheckBox fv-hostStep3CheckBoxGroupInLine"}>
                    <MDBCol md={6} sm={6}>
                        <HostStepCheckbox
                            className="fv-hostStep4PaddingTop"
                            mdCheckbox = "1"
                            smCheckbox="2"
                            mdCheckboxText="10"
                            smCheckboxText="9"
                            text="????????????"
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
                            text="????????"
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
                            text="??????"
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