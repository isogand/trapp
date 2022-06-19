import React from "react"
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {removeFromFavorite} from "../services/userService";
import "../style/scroolBodyProfilePages.scss"

class ProductFavorites extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <MDBRow className={'fv-product fv-mobileProduct fv-productFavorites'}>
                <MDBRow className={"fv-trashFavorites"}>
                    <MDBCol>
                        <a><i style={{color:'#3EC886'}} className="fa fa-trash" aria-hidden="true" onClick={()=>{
                            const data ={
                                villa_id:this.props.id
                            }
                            removeFromFavorite(data)
                                .then(res =>{
                                    if(res.status===200){
                                        alert('ویلای مورد نظر از علاقه مندی ها حذف شد')
                                        window.location.reload()
                                    }
                                } )

                        }}/></a>
                    </MDBCol>
                </MDBRow>
                <img src={this.props.srcImage} className={'fv-productImage'}/>
                <MDBRow  >
                    {this.props.rate ?
                        <MDBCol md={4} sm={5} className={'fv-productRateBox'}>
                            <i className="fa fa-star" aria-hidden="true" />
                            {this.props.rate}
                        </MDBCol>
                        :
                        <MDBCol md={4} sm={5} className={'fv-productRateBox'}>
                          <p style={{color: `#FEA801` , marginTop : '0%'}}>جدید</p>
                        </MDBCol>
                    }

                </MDBRow>
                <MDBContainer>



                <MDBRow>
                    <MDBCol className={'fv-productTopic'}>
                       <h6>{this.props.topic}</h6>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={'fv-productLocation'}>
                    <MDBCol md={9} sm={10}>
                        <h6>{this.props.location} </h6>
                    </MDBCol>
                </MDBRow>

                <MDBRow className={'fv-productCapacityBoxFavorites'}>
                    <MDBCol md={2} sm={3} className={'fv-capacityBody'}>
                        <p> نفر </p><p> {this.props.capacity} </p>
                    </MDBCol>
                    <MDBCol md={5} sm={6} className={'fv-maximumNumber'}>
                        <a>حداکثر نفرات </a>
                        <i className="fa fa-user-friends" />
                    </MDBCol>

                    <MDBCol md={11} sm={4} className={''}>
                        <i className="fas fa-bed" />
                        <p>{this.props.numberOfRoom}</p><p>خوابه</p>
                    </MDBCol>
                </MDBRow>

                <MDBRow className={'fv-productPreventPrice'}>
                    <MDBCol md={10}>
                        {this.props.PreventPrice}
                    </MDBCol>
                </MDBRow>
                    <MDBRow className={'fv-productPriceBoxToman'}>
                        <MDBCol>
                            <a>تومان</a>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={'fv-productPriceBox'}>
                        <MDBCol md={10}>
                            <h6>{this.props.price}</h6>
                            <p className={'fv-productPriceBoxPriceText'}>هرشب</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBRow>
        )
    }
}
export default ProductFavorites;