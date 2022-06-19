import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep2Page2.scss"
import "../style/HostStep1Page.scss"
import HeaderSteps from "../componentsPages/HeaderSteps";
import Footer from "../componentsPages/footer";
import HostStepLeftBodyContent from "../componentsPages/hostStepLeftBodyContetnt"
import Mapir from "mapir-react-component";
import HostStepImage1 from "../images/home_miz1 png.png"
import {Waiting} from "../componentsPages/WaitingLoad";

class HostStep2Page2 extends Component {
    constructor(props) {
        super(props);

        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            markerArray: [],
            lat: 35.72,
            lon: 51.42,
            mapAddress: '',
            waitingMapLoad: true,
            showMapDelay: false,
        }
        this.reverseFunction = this.reverseFunction.bind(this);
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({showMapDelay: true});
        }, 1000);

        const prevData = JSON.parse(localStorage.getItem("step2-2"))
        if (prevData) {
            if (prevData.long > 0) {
                const previousLocation = [<Mapir.Marker
                    coordinates={[prevData.long, prevData.lat]}
                    anchor="bottom">
                </Mapir.Marker>]
                this.setState({
                    markerArray: previousLocation,
                    lon: prevData.long,
                    lat: prevData.lat,
                    mapAddress: prevData.mapAddress
                });
            }
        }
    }

    reverseFunction(map, e) {
        const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
        fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key':
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1ZDU3NTg4MDA3MjQ1MGM2ZjJkMWYyNWYzNjZlMDJhMGVmNGEzYWE5NjZlYjc3YzI4MTkwZWE3Y2RjYmU2MWYzYjQ3NjdmZjNkNDAxNDU0In0.eyJhdWQiOiIxMzk2MiIsImp0aSI6ImY1ZDU3NTg4MDA3MjQ1MGM2ZjJkMWYyNWYzNjZlMDJhMGVmNGEzYWE5NjZlYjc3YzI4MTkwZWE3Y2RjYmU2MWYzYjQ3NjdmZjNkNDAxNDU0IiwiaWF0IjoxNjIwOTEwNDA2LCJuYmYiOjE2MjA5MTA0MDYsImV4cCI6MTYyMzUwMjQwNiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.JURJHCjC_7gcpLXnXJaNjp1l9O6z4t4rqais2S8FE9GApwpdo1amHqdMMlk87m_08GLnxG8E_ADOavM9sZjJMikekrTOzc7IDBn1DN7RC75IF-lA5x8uyZs7EdSzEB7fTdVtgs0z6frjO4KYciznkPP0eSHyueV84Scsi-M1q95vQ7DU_2w216yH2sdc3aXUs_emNqNyGOuQ4q9qFmjR5nMOIGy1AP9Bb5NqFTnvFZzJ022bX7_atlxysLPQ5h1r1LwzRpHBlIT2KG3bJo1SjSiOVNxK-cUSF1yG8YKvZAwfzZHFFJ1wnViH6KnR_yPSczGi14xUUA7wCKCwqKkcVQ'
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({mapAddress: data.address})
            })
        const array = [];
        array.push(<Mapir.Marker
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            anchor="bottom">
        </Mapir.Marker>);
        this.setState({markerArray: array, lat: e.lngLat.lat, lon: e.lngLat.lng});
    }

    render() {
        // console.log(this.state.markerArray);
        const Map = Mapir.setToken({
            //factory parameters
            // hash:true,
            // logoPosition:"top-left",
            maxZoom: [16],
            transformRequest: (url) => {
                return {
                    url: url,
                    headers: {
                        'x-api-key':
                            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1ZDU3NTg4MDA3MjQ1MGM2ZjJkMWYyNWYzNjZlMDJhMGVmNGEzYWE5NjZlYjc3YzI4MTkwZWE3Y2RjYmU2MWYzYjQ3NjdmZjNkNDAxNDU0In0.eyJhdWQiOiIxMzk2MiIsImp0aSI6ImY1ZDU3NTg4MDA3MjQ1MGM2ZjJkMWYyNWYzNjZlMDJhMGVmNGEzYWE5NjZlYjc3YzI4MTkwZWE3Y2RjYmU2MWYzYjQ3NjdmZjNkNDAxNDU0IiwiaWF0IjoxNjIwOTEwNDA2LCJuYmYiOjE2MjA5MTA0MDYsImV4cCI6MTYyMzUwMjQwNiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.JURJHCjC_7gcpLXnXJaNjp1l9O6z4t4rqais2S8FE9GApwpdo1amHqdMMlk87m_08GLnxG8E_ADOavM9sZjJMikekrTOzc7IDBn1DN7RC75IF-lA5x8uyZs7EdSzEB7fTdVtgs0z6frjO4KYciznkPP0eSHyueV84Scsi-M1q95vQ7DU_2w216yH2sdc3aXUs_emNqNyGOuQ4q9qFmjR5nMOIGy1AP9Bb5NqFTnvFZzJ022bX7_atlxysLPQ5h1r1LwzRpHBlIT2KG3bJo1SjSiOVNxK-cUSF1yG8YKvZAwfzZHFFJ1wnViH6KnR_yPSczGi14xUUA7wCKCwqKkcVQ', //Mapir api key
                        'Mapir-SDK': 'reactjs'
                    },
                }
            }
        });

        const localStorageData = {
            long: this.state.lon,
            lat: this.state.lat,
            mapAddress: this.state.mapAddress,
        }
        // console.log(JSON.parse(localStorage.getItem("step2")))
        return (
            <div className={" fv-HostStep2Page fv-hostStep2Page2"}>
                <MDBContainer className={"fv-HostStep1Page"}>
                    <MDBRow>
                        <HeaderSteps/>
                    </MDBRow>

                    <MDBRow className={"fv-HostStep1PageBody"}>
                        <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                            <h6 className={"fv-hostStep2Page2P"}> لطفا از روی نقشه آدرس دقیق خود را پیدا کنید</h6>
                            <textarea className={"fv-hostStep2Page2Textarea"} value={this.state.mapAddress}
                                      disabled={true}/>


                            {this.state.showMapDelay ?
                                <MDBRow>
                                    <Mapir
                                        center={[this.state.lon, this.state.lat]}
                                        Map={Map}
                                        onClick={this.reverseFunction}
                                    >
                                        {this.state.markerArray}
                                    </Mapir>

                                </MDBRow>
                                : <>  {Waiting(true, "fv-waitingLoadPublicFullScreen fv-waitingMapHostStepsPage")}</>
                            }


                        </MDBCol>

                        <HostStepLeftBodyContent
                            text=" طراحان سایت هنگام طراحی قالب سایت معمولا ب
                    ا این موضوع رو برو هستند که محتوای اصلی صفحات آماده نیست. در نتیجه طرح
                    کلی دید درستی به کار فرما نمیدهد. اگر طراح بخواهد دنبال متن های مرتبط
                    بگردد تمرکزش از روی کار اصلی برداشته میشود و اینکار زمان بر خواهد بو
                    د. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگران را
                    در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند"
                            image={HostStepImage1}
                            nextLink={"../../hostStepAddress"}
                            returnLink={"../../hostStepBasicInformation"}
                            localStorageName={"step2-2"}
                            localStorageData={localStorageData}/>
                    </MDBRow>
                    <MDBRow>
                        <Footer/>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default HostStep2Page2