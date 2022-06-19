import {MDBCol, MDBRow} from "mdbreact";
import React from "react";

const hostStepCheckbox = (props) =>{
    let checkedPrev = false      /// اگر از قبل دیتایی در لوکال استوریج بود از طریقprops.setCheckedPrev فرستاده می شود
    if(props.setCheckedPrev){     // اگر آن دیتایی که در لوکال استوریج هست با name ایین چک باکس یکی بود باید تیک بخورد
        props.setCheckedPrev.map(prev => {
            if(prev===props.name){
                checkedPrev = true
            }
        })
    }
    return(


    <MDBRow className={props.className}>
        <MDBCol md={parseInt(props.mdCheckbox)} sm={parseInt(props.smCheckbox)}>
            {
                props.setCheckedPrev ?      // اگر لوکال استوریج پر بود و از طرریق کامپوننت قبلی به اینجا پاس داده شد
                    <input type="checkBox" name={props.name} checked={checkedPrev}
                           onChange={(event)=>props.setCheckbox(event,props.nameOfPart)}/>
                           :
                    <input type="checkBox" name={props.name}
                           onChange={(event)=>props.setCheckbox(event,props.nameOfPart)}/>
            }


            {/* <input type="checkBox" name={props.name}
                   onChange={(event)=>props.setCheckbox(event,props.nameOfPart)}/> */}
        </MDBCol>
        <MDBCol md={parseInt(props.mdCheckboxText)} sm={parseInt(props.smCheckboxText)}>
            <p>{props.text}</p>
        </MDBCol>
    </MDBRow>
    )
}

export default hostStepCheckbox
