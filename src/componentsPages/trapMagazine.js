import React from "react";
import {MDBCol, MDBRow} from "mdbreact";
import Product from "./Product";

class trapMagazine extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={'fv-product fv-popularVillage fv-trapMagazine fv-mobileProduct'}>
                <img src={this.props.srcimmage} className={'fv-productImage fv-popularVillageImage fv-trapMagazineImage'}/>
                <MDBRow>
                    <MDBCol md={12} className={'fv-trapMagazineImageTitle'}>
                        <h6>{this.props.title}</h6>
                        <p>{this.props.comment}</p>
                    </MDBCol>
                    <MDBCol md={12} className={'fv-trapMagazineImageReadMore'}>
                        <a href={this.props.link}>مطالعه بیشتر</a>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}
export default trapMagazine;
