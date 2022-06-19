import React from "react";
import MobileLogo from "../images/MobileLogo.png";
import {MDBCol, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";

const hostStepLeftBodyContent=(props)=>{
    return(
        <MDBCol className={"fv-hostStepPage1Left"} sm={12} md={6}>
            <MDBRow className={"fv-hostStepPage1LeftContentBody"}>
                <p>{props.text}</p>
                <img src={props.image} className={"fv-hostStepPage1LeftImage"}/>
            </MDBRow>
            <MDBRow className={"fv-hostStepPage2LeftButtonBody fv-hostStepPage2LeftButtonBodySharedButton"}>
                <Link to={props.nextLink} ><input type="button" value="مرحله بعد"  className={"fv-hostStepPage1LeftButton"} onClick={()=>{
                    localStorage.setItem(`${props.localStorageName}`, JSON.stringify(props.localStorageData))
                }}/> </Link>
                <Link to={props.returnLink} > <input type="button" value="مرحله قبل"  className={"fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton"}/> </Link>
            </MDBRow>
        </MDBCol>
    )
}
export default hostStepLeftBodyContent;