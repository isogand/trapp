import React, {Component} from "react";
import "../style/calender.scss"
import {MDBContainer} from "mdbreact";
const Calender = ()=>{
    return(
        <MDBContainer className={"calenderBody"}>
            <div className="container">
                <div className="calendar">
                    <div className="front">
                        <i className="fas fa-chevron-circle-right nextPage" />
                        <i className="fas fa-chevron-circle-left previewPage" />
                        <div className="current-date ">
                            <h1>بهمن</h1>
                        </div>

                        <div className="current-month">
                            <ul className="week-days">
                                <div>شنبه</div>
                                <div>یکشنبه</div>
                                <div>دوشنبه</div>
                                <div>سه شنبه</div>
                                <div>چهار شنبه</div>
                                <div>پنج شنبه</div>
                                <div>جمعه</div>
                            </ul>

                            <div className="weeks">
                                <div className="first">
                                    <span className="last-month">28 <div className={"price"}>2000</div></span>
                                    <span className="last-month">29 <div className={"price"}>2000</div></span>
                                    <span className="last-month">30 <div className={"price"}>2000</div></span>
                                    <span className="last-month">31 <div className={"price"}>2000</div></span>
                                    <span>01 <div className={"price"}>2000</div></span>
                                    <span>02 <div className={"price"}>2000</div></span>
                                    <span className={"friday"}>03 <div className={"price"}>2000</div></span>
                                </div>

                                <div className="second">
                                    <span>04 <div className={"price"}>2000</div></span>
                                    <span>05 <div className={"price"}>2000</div></span>
                                    <span className="event">06 <div className={"price"}>2000</div></span>
                                    <span className="event">07 <div className={"price"}>2000</div></span>
                                    <span>08 <div className={"price"}>2000</div></span>
                                    <span>09 <div className={"price"}>2000</div></span>
                                    <span className={"friday"}>10 <div className={"price"}>2000</div></span>
                                </div>

                                <div className="third">
                                    <span>11 <div className={"price"}>2000</div></span>
                                    <span>12 <div className={"price"}>2000</div></span>
                                    <span>13 <div className={"price"}>2000</div></span>
                                    <span>14 <div className={"price"}>2000</div></span>
                                    <span className="active">15 <div className={"price"}>2000</div></span>
                                    <span>16 <div className={"price"}>2000</div></span>
                                    <span className={"friday"}>17 <div className={"price"}>2000</div></span>
                                </div>

                                <div className="fourth">
                                    <span className="active">18 <div className={"price"}>2000</div></span>
                                    <span>19 <div className={"price"}>2000</div></span>
                                    <span>20 <div className={"price"}>2000</div></span>
                                    <span>21 <div className={"price"}>2000</div></span>
                                    <span>22 <div className={"price"}>2000</div></span>
                                    <span>23 <div className={"price"}>2000</div></span>
                                    <span className={"friday"}>24 <div className={"price"}>2000</div></span>
                                </div>

                                <div className="fifth">
                                    <span>25 <div className={"price"}>2000</div></span>
                                    <span>26 <div className={"price"}>2000</div></span>
                                    <span>27 <div className={"price"}>2000</div></span>
                                    <span>28 <div className={"price"}>2000</div></span>
                                    <span>29 <div className={"price"}>2000</div></span>
                                    <span>30 <div className={"price"}>2000</div></span>
                                    <span className={"friday"}>31 <div className={"price"}>2000</div></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="back">
                        <input placeholder="What's the event?" />
                        <div className="info">
                            <div className="date">
                                <p className="info-date">
                                    Date: <span>Jan 15th, 2016</span>
                                </p>
                                <p className="info-time">
                                    Time: <span>6:35 PM</span>
                                </p>
                            </div>
                            <div className="address">
                                <p>
                                    Address: <span>129 W 81st St, New York, NY</span>
                                </p>
                            </div>
                            <div className="observations">
                                <p>
                                    Observations: <span>Be there 15 minutes earlier</span>
                                </p>
                            </div>
                        </div>

                        <div className="actions">
                            <button className="save">
                                Save <i className="ion-checkmark"></i>
                            </button>
                            <button className="dismiss">
                                Dismiss <i className="ion-android-close"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </MDBContainer>
    )
}
export default Calender