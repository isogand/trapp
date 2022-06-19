import React from "react";
import {MDBCol, MDBRow} from "mdbreact";
import Product from "./Product";

class discountedProduct extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <MDBRow className={'fv-product fv-popularVillage fv-discountedProduct fv-mobileProduct'}>

                    <MDBCol md={2} sm={3} className={'fv-discountedProductAmount'}>
                        <h1>{this.props.discountedAmount}</h1>
                    </MDBCol>
                    <MDBCol md={10}>
                    </MDBCol>

                    <MDBCol className={'fv-discountedProductBody'}>
                        <Product srcImage={this.props.srcImage}
                                 rate={this.props.rate}
                                 topic={this.props.topic}
                                 location={this.props.location}
                                 numberOfRoom={this.props.numberOfRoom}
                                 capacity={this.props.capacity}
                                 price={this.props.price}
                                 PreventPrice={this.props.PreventPrice}/>
                    </MDBCol>

            </MDBRow>
        )
    }
}
export default discountedProduct;