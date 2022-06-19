import React from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/hostStepIncreaseAndDecreaseButton.scss"

const HostStepIncreaseAndDecreaseButton =(props)=>{
    return(
        <MDBRow className={"hostStepIncreaseAndDecreaseBody"}>
            <MDBCol md={3} sm={3}  className={"hostStepIncreaseAndDecreaseText"}>
                <p>{props.text}</p>
            </MDBCol>
            <MDBCol md={2} sm={2} className={"hostStepIncreaseAndDecreaseButtonRight"}>
                <input type="button" name={props.nameOfSection} onClick={
                    (e)=> { props.incrementFunction(e.target.name)} } value="+"/>
            </MDBCol>
            <MDBCol md={1} sm={1}  className={"hostStepIncreaseAndDecreaseNumber"}>
                <p className={"h7"}>{props.numberValue}</p>
            </MDBCol>
            <MDBCol md={2} sm={2} className={"hostStepIncreaseAndDecreaseButtonLeft"}>
                <input type="button" name={props.nameOfSection} onClick={
                    (e)=>props.decrementFunction(e.target.name)} value="-"/>
            </MDBCol>
        </MDBRow>

    )
}
export default HostStepIncreaseAndDecreaseButton