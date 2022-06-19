import {MDBCol, MDBRow} from "mdbreact";
import React from "react";

const ReservationProduct =(props) =>{
    return(
        <MDBCol md={4}>
            <MDBRow className={'fv-product fv-mobileProduct'}>
                <MDBRow className={"fv-ProfilePageReservation2ImageProductContentTopOne"}>
                    <MDBCol md={props.md}>
                        <p>{props.payStatus}</p>
                        <input type="text"/>
                    </MDBCol>
                </MDBRow>
                <img src={"https://www.w3schools.com/html/pic_trulli.jpg"} className={'fv-productImage'}/>

                <MDBRow>
                    <MDBCol className={'fv-productTopic'}>
                        {props.villaTitle}
                    </MDBCol>
                </MDBRow>
                <MDBRow className={'fv-ProfilePageReservation2ProductLocaton'}>
                    <MDBCol md={12} sm={10}>
                        <a>{props.state}</a>
                        <i className="fa fa-map-marker-alt" />
                    </MDBCol>
                </MDBRow>

                <MDBRow className={'fv-productCapacityBox'}>
                    <MDBCol md={12} sm={9} className={"fv-ProfilePageReservation2ProductDate"}>
                        <i className="fa fa-calendar" />
                        <a> {props.entryDay}  تا {props.exitDate} </a>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-borderButton"}>

                </MDBRow>
                <MDBRow className={"fv-profilePaeReservation2PriceBox"}>
                    <MDBCol md={2} sm={2}>
                        <p>تومان</p>
                    </MDBCol>
                    <MDBCol md={3} sm={3}>
                        <h5>{props.cost}</h5>
                    </MDBCol>
                    <MDBCol md={7} sm={7}>
                        <h5>مبلغ قابل پرداخت</h5>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={props.classnameButton}>
                    {props.classnameButton === "fv-profilePaeReservation2PayButton" ?
                         <input type="button" value="پرداخت"/> :

                         <input type="button" value="پرداخت2" onClick={()=> {
                             props.history.push("/ProfileMyTransaction");
                         }}/>
                    }

                </MDBRow>
            </MDBRow>
        </MDBCol>
    )
}
export default ReservationProduct