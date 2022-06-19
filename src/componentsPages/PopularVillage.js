import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

class PopularVillage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <MDBContainer className={'fv-product fv-popularVillage fv-mobileProduct'}>
                <img src={this.props.srcImage} className={'fv-productImage fv-popularVillageImage fv-popularVillageTitle'}/>

                        <h6>{this.props.location}</h6>
                        <p>{this.props.capacity} خانه </p>

            </MDBContainer>
        )
    }
}
export default PopularVillage;