import {MDBCol, MDBRow} from "mdbreact";
import React from "react";
import {editVilla} from "../services/userService";

class AccommmodationProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    render() {
        return (
            <MDBCol md={4}>
                <MDBRow className={'fv-product fv-mobileProduct fv-myAccommodationProducts'}>
                    <MDBRow className={"fv-ProfilePageReservation2ImageProductContentTopOne"}>
                        <MDBCol md={this.props.md}>
                            <p style={{marginRight: '5%'}}>{this.props.status}</p>
                            <input type="text"/>
                        </MDBCol>
                    </MDBRow>
                    <img src={this.props.mainImg} className={'fv-productImage'}/>

                    <MDBRow>
                        <MDBCol className={'fv-productTopic'}>
                            <h6> {this.props.title}</h6>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={'fv-ProfilePageReservation2ProductLocaton'}>
                        <MDBCol md={12} sm={10}>
                            <a>کد آگهی : {this.props.code}</a>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className={"fv-borderButton"}>

                    </MDBRow>

                    <MDBRow className={"fv-profilePaeReservation2PayButton fv-myAccommodationPageCol6Button"}>
                        <MDBCol md={6} sm={6} className={"fv-myAccommodationPagePaddingRightButton"}>
                            {this.props.classNameActiveTopRight ?
                                <input type="button" value="تقویم اقامت گاه"
                                       className={this.props.classNameActiveTopRight} onClick={() => {
                                    this.props.history.push(`/MainProfilePages/profileCalender/${this.props.code}`)
                                }
                                }/> :
                                <input type="button" value="تقویم اقامت گاه"
                                       className={this.props.classNameActiveTopRight}/>
                            }
                        </MDBCol>
                        <MDBCol md={6} sm={6} className={"fv-myAccommodationPagePaddingLeftButton"}>
                            {this.props.classNameActiveTopLeft ?
                                <input type="button" value="پاسخ به نظرات" className={this.props.classNameActiveTopLeft}
                                       onClick={() => {
                                           // this.setState({switchPage:"profileShowGuestComments" , id:this.props.code})
                                           this.props.history.push(`/MainProfilePages/profileShowGuestComments/${this.props.code}`)
                                       }
                                       }/> :
                                <input type="button" value="پاسخ به نظرات"
                                       className={this.props.classNameActiveTopLeft}/>
                            }
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={"fv-profilePaeReservation2PayButton fv-myAccommodationPageCol6Button"}>
                        <MDBCol md={6} sm={6} className={"fv-myAccommodationPagePaddingRightButton"}>
                            {this.props.classNameActiveBottonRight ?
                                <input type="button" value="ویرایش اقامت گاه"
                                       className={this.props.classNameActiveBottonRight} onClick={() => {
                                    if (this.props.classNameActiveBottonRight === "fv-myAccommodationPageActiveButton") {
                                        JSON.parse(localStorage.getItem("step5-2"))
                                        editVilla(this.props.code)
                                            .then(res => {
                                                const allDataVilla = res.data.data[0]
                                                /*  let mapAddresses = " "  // map address
                                                  if(allDataVilla.mapAddress){
                                                      mapAddresses=allDataVilla.mapAddress
                                                  } */
                                                const step1Data = {
                                                    phone_number: allDataVilla.phone_number,
                                                    story: allDataVilla.story,
                                                    title: allDataVilla.title,
                                                    type: allDataVilla.type,
                                                    phoneNumberDisable: true, // baraye eddit bayad phoneNumber gheire faal shavad - agar vojod dasht gheirefaal mikonim
                                                }
                                                const step2Data = {
                                                    address: allDataVilla.address,
                                                    city: allDataVilla.city,
                                                    state: allDataVilla.state,
                                                    postal_code: allDataVilla.postal_code,
                                                    village: allDataVilla.village,
                                                    postalCodeDisable: true,    // baraye eddit bayad postalCode gheire faal shavad - agar vojod dasht gheirefaal mikonim
                                                }
                                                const step22Data = {
                                                    lat: allDataVilla.lat,
                                                    long: allDataVilla.long,
                                                    // mapAddress : mapAddresses,
                                                }
                                                const step3Data = {
                                                    area: allDataVilla.detail.area,
                                                    bedroom: allDataVilla.detail.bedroom,
                                                    eu_toilet: allDataVilla.detail.eu_toilet,
                                                    ir_toilet: allDataVilla.detail.ir_toilet,
                                                    max_capacity: allDataVilla.detail.max_capacity,
                                                    places: allDataVilla.detail.places,
                                                    rent_type: allDataVilla.detail.rent_type,
                                                    shared_bathroom: allDataVilla.detail.shared_bathroom,
                                                    shower: allDataVilla.detail.shower,
                                                    standard_capacity: allDataVilla.detail.standard_capacity,
                                                    view: allDataVilla.detail.view,
                                                    disinfected: allDataVilla.disinfected,
                                                    mattress_count: allDataVilla.mattress_count,
                                                    bed_count: allDataVilla.bed_count,
                                                }
                                                const step4Data = {
                                                    bodyguard: allDataVilla.info.bodyguard,
                                                    catering: allDataVilla.info.catering,
                                                    chef: allDataVilla.info.chef,
                                                    general_fac: allDataVilla.info.general_fac,
                                                    host: allDataVilla.info.host,
                                                    kitchen_fac: allDataVilla.info.kitchen_fac,
                                                    temp_fac: allDataVilla.info.temp_fac,
                                                    tour_guide: allDataVilla.info.tour_guide,
                                                }
                                                const step5Data = {
                                                    monthly_discount: allDataVilla.rule.monthly_discount,
                                                    normal_cost: allDataVilla.rule.normal_cost,
                                                    normal_extra_cost: allDataVilla.rule.normal_extra_cost,
                                                    special_cost: allDataVilla.rule.special_cost,
                                                    special_extra_cost: allDataVilla.rule.special_extra_cost,
                                                    weekly_discount: allDataVilla.rule.weekly_discount,
                                                }
                                                const step52Data = {
                                                    arrival_time: allDataVilla.rule.arrival_time,
                                                    auth_rules: allDataVilla.rule.auth_rules,
                                                    exit_time: allDataVilla.rule.exit_time,
                                                    max_reserve: allDataVilla.rule.max_reserve,
                                                    min_reserve: allDataVilla.rule.min_reserve,
                                                    special_rules: allDataVilla.rule.special_rules,
                                                    suitable_for: allDataVilla.rule.suitable_for,
                                                }
                                                localStorage.setItem("step1", JSON.stringify(step1Data))
                                                localStorage.setItem("step2", JSON.stringify(step2Data))
                                                localStorage.setItem("step2-2", JSON.stringify(step22Data))
                                                localStorage.setItem("step3", JSON.stringify(step3Data))
                                                localStorage.setItem("step4", JSON.stringify(step4Data))
                                                localStorage.setItem("step5", JSON.stringify(step5Data))
                                                localStorage.setItem("step5-2", JSON.stringify(step52Data))
                                                localStorage.setItem("editCode", JSON.stringify({editCode: this.props.code}))
                                                window.location.replace('/hostStepBasicInformation');
                                            });

                                    }

                                }
                                }/> :
                                <input type="button" value="ویرایش اقامت گاه"
                                       className={this.props.classNameActiveBottonRight}/>
                            }
                        </MDBCol>
                        <MDBCol md={6} sm={6} className={"fv-myAccommodationPagePaddingLeftButton"}>
                            {this.props.classNameActiveBottonLeft ?
                                <input type="button" value="مشاهده رزروها"
                                       className={this.props.classNameActiveBottonLeft} onClick={() => {
                                    this.props.history.push(`/MainProfilePages/ProfileMyReservation`)
                                }
                                }/> :
                                <input type="button" value="مشاهده رزروها"
                                       className={this.props.classNameActiveBottonLeft}/>
                            }
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={"fv-profilePaeReservation2PayButton fv-myAccommodationPageFinanceButton"}>
                        <MDBCol>
                            {this.props.classNameActiveButton ?
                                <input type="button" value="گزارشات مالی ویلا"
                                       className={this.props.classNameActiveButton} onClick={() => {
                                    this.props.history.push({
                                        pathname: "/MainProfilePages/ProfileWallet",
                                        sourceTitle: {
                                            title: this.props.title,
                                        }
                                    })
                                }
                                }/> :
                                <input type="button" value="گزارشات مالی ویلا"
                                       className={this.props.classNameActiveButton}/>
                            }
                        </MDBCol>

                    </MDBRow>
                </MDBRow>
            </MDBCol>

        )
    }
}

export default AccommmodationProduct