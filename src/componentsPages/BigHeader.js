import React from "react"
import {MDBCol, MDBRow} from "mdbreact";

class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBRow className={'fv-product fv-mobileProduct'}>
                <img src={this.props.srcImage} className={'fv-productImage'}/>
            </MDBRow>
        )
    }
}

export default Product;