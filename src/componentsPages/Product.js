import React from "react"
import {MDBCol, MDBRow} from "mdbreact";
import '../style/felx.css'

class Product extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <MDBRow className={'fv-product fv-mobileProduct'}>
                <img src={this.props.srcImage} className={'fv-productImage'}/>
                <MDBRow className={'fv-productRateBoxBody'}>
                    {this.props.rate ?
                        <MDBCol md={4} sm={5} className={'fv-productRateBox'}>
                            <i className="fa fa-star" aria-hidden="true"/>
                            {this.props.rate}
                        </MDBCol>
                        : <MDBCol md={4} sm={5} className={'fv-productRateBox fv-productRateBoxNewScore'}>
                            جدید
                        </MDBCol>
                    }
                </MDBRow>
                <MDBRow>
                    <MDBCol className={'fv-productTopic'}>
                        <h6>{this.props.topic}</h6>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={'fv-productLocation'}>
                    <MDBCol md={9} sm={10}>
                        <a>{this.props.location} </a>
                        <i className="fa fa-map-marker-alt"/>
                    </MDBCol>
                </MDBRow>

                <MDBRow className={'fv-productCapacityBox'}>
                    <MDBCol md={2} sm={2} className={'fv-capacityBody'}>
                        <p> نفر </p><p> {this.props.capacity} </p>
                    </MDBCol>
                    <MDBCol md={5} sm={9} className={'fv-maximumNumber'}>
                        <a>حداکثر نفرات </a>
                        <i className="fa fa-user-friends"/>
                    </MDBCol>
                    <MDBCol md={5} sm={11} className={'fv-numberOfBedBody'}>
                        <p>خوابه</p><p>{this.props.numberOfRoom}</p>

                        <i className="fas fa-bed"/>
                    </MDBCol>
                </MDBRow>

                <article style={{direction: 'initial'}}>

                    <a style={{direction: 'rtl'}} id="warm" href="#"><p>{this.props.price}تومان</p></a>
                    <a id="hot" href="#"><p> قیمت از شبی</p></a>
                </article>
                {/*<MDBRow className={'fv-productPreventPrice'}>*/}
                {/*    <MDBCol md={10}>*/}
                {/*        {this.props.PreventPrice}*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow className={'fv-productPriceBoxToman'}>*/}
                {/*    <MDBCol>*/}
                {/*        <a>تومان</a>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                {/*<MDBRow className={'fv-productPriceBox'}>*/}
                {/*    <MDBCol md={10}>*/}
                {/*        <a className={'h8'}>{this.props.price}</a>*/}
                {/*        <a className={'fv-productPriceBoxPriceText'} style={{marginLeft: '6%', fontFamily: 'auto'}}>قیمت*/}
                {/*            از شبی</a>*/}

                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
            </MDBRow>
        )
    }
}

export default Product;