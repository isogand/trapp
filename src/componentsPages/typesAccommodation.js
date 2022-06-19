import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

class typesAccommodation extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={'fv-typesAccommodation fv-mobileProduct'}>
                <img src={this.props.image} className={'fv-productImage fv-popularVillageImage fv-typesAccommodationImage'}/>
                <MDBRow className={'fv-typesAccommodationTopicBody'}>
                    <MDBCol size={11} className={'fv-popularVillageTitle fv-typesAccommodationTopic'}>
                        <div className={'test'}>
                        <a>{this.props.topic}</a>
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>

        );
    }
}
export default typesAccommodation;