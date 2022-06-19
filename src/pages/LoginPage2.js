import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/LoginPage2.scss"
import LoginPageImage from "../images/simon-haslett-BSkXuvmSHLA-unsplash 1.png"
import {Link} from "react-router-dom";
import {sendPhoneNumber, verifySmsCode} from "../services/userService";
import {digitsFaToEn} from "@persian-tools/persian-tools";

class LoginPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationCode: '',
            minutes: 3,
            seconds: 0,
            errorsText: "کد وارد شده معتبر نمیباشد",
            validCode: true,
            clickLoader: false,
            phoneNumber: '',

        }
    }


    componentDidMount() {
        this.setTime()

        let phoneNumber = localStorage.getItem("phone_number")
        this.setState({phoneNumber: phoneNumber})
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)


    }

    setTime = () => {
        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state

            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({minutes}) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    sendRepeatSms = async () => {
        this.setState({clickLoader: true})
        const phone_number = {
            phone_number: localStorage.getItem("phone_number")
        }
        const {status, data} = (await sendPhoneNumber(phone_number))
        if (status === 200 && data.status === 2) {
            // Phone number have to save in local storage for use it, in the next step
            alert('پیامک اعتبارسنجی ارسال شد');
            this.setTime()
            this.setState({minutes: 3, seconds: 0, clickLoader: false})

        } else if (status === 200 && data.status === 1) {
            alert('پیامک برای شما ارسال شده لطفا چند دقیقه دیگر تلاش مجدد فرمایید');
            this.setState({clickLoader: false})
        } else {
            alert('شماره نامعتبر است')
            this.setState({clickLoader: false})
        }
    }
    validation = async () => {
        const phone_number = localStorage.getItem("phone_number")
        const user = {
            phone_number,
            sms_code: this.state.validationCode
        }
        await verifySmsCode(user)
            .then(result => {
                const status = result.status
                const data = result.data
                if (status === 200 && data.data.user) {


                    const info = {
                        userInfo: data.data.user
                    }
                    localStorage.setItem("infoUser", JSON.stringify(info))
                    localStorage.setItem("info", JSON.stringify(info))


                    // Redirect User
                    this.props.history.push("/");

                    // Save api token in local storage
                    localStorage.setItem("token", data.data.token);

                    // Save user data in State
                    // ...

                } else {
                    this.setState({validCode: false, clickLoader: false})
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 422) {
                        if (err.response.data.errors.sms_code) {
                            this.setState({
                                errorsText: err.response.data.errors.sms_code,
                                validCode: false,
                                clickLoader: false
                            })
                        }
                    } else {
                        alert("کد نامعتبر میباشد لطفا مجددا تلاش کنید")
                        this.setState({
                            validCode: false,
                            clickLoader: false
                        })
                    }
                } else {
                    alert("کد نامعتبر میباشد لطفا مجددا تلاش کنید")
                    // this.props.history.push("/login");
                    this.setState({
                        validCode: false,
                        clickLoader: false
                    })
                }

            })

    }

    render() {


        const {minutes, seconds, validationCode} = this.state
        return (
            <MDBContainer className={"fv-loginPagesBody"}>


                <MDBRow className={"fv-loginPage fv-loginPage2"}>
                    <MDBCol md={6} sm={12} className={"fv-loginPageBody"}>
                        <MDBRow className={"fv-LoginPageHeader"}>
                            <MDBCol>
                                <i className="fas fa-chevron-right"/><p><Link to={{
                                pathname: '/',
                                test: ''  /* use : this.props.location.test */
                            }}>صفحه اصلی</Link></p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className={"fv-loginPageBodyOne"}>
                            <p className={this.state.validCode === false ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>
                                <i style={{color: 'mediumvioletred'}}
                                   className="fas fa-exclamation-triangle"/>{this.state.errorsText}</p>
                            <MDBCol sm={12} className={"fv-loginPage2RightBody"}>
                                <h3>تایید شماره موبایل</h3>
                                <MDBRow>
                                    <MDBCol md={9} sm={12}>
                                        <p>کد تایید به شماره {this.state.phoneNumber} ارسال شد</p>
                                    </MDBCol>
                                    <MDBCol md={3} sm={12}>
                                        <p><Link to={'/login'}>ویرایش شماره</Link></p>
                                    </MDBCol>
                                </MDBRow>
                                <input type="number" placeholder={'کد تایید'} value={this.state.validationCode}
                                       className={this.state.validCode === false ? "fv-redBorderError fv-english-number" : "fv-english-number"}
                                       onChange={((e) => this.setState({validationCode: digitsFaToEn(e.target.value)}))}/>
                                <MDBRow className={"fv-loginPage2RightBodyButtonAndTime"}>
                                    <MDBCol md={8} sm={6}>
                                        <p>
                                            <div>
                                                {minutes === 0 && seconds === 0
                                                    ? <a><p onClick={() => {
                                                        this.sendRepeatSms()
                                                    }}
                                                            className={this.state.clickLoader ? "fv-hideLoader" : 'fv-reloadLink'}>ارسال
                                                        مجدد پیامک</p></a>
                                                    : <p>زمان باقیمانده : {minutes}:{seconds}</p>
                                                }
                                            </div>
                                        </p>
                                    </MDBCol>
                                    <MDBCol md={4} sm={6}>
                                        <div
                                            className={this.state.clickLoader ? "loader fv-loginMembershipWaitingButton" : "fv-hideLoader"}>
                                            <svg className="circular" viewBox="25 25 50 50">
                                                <circle className="path" cx="50" cy="50" r="20" fill="none"
                                                        stroke-width="2"
                                                        stroke-miterlimit="10"/>
                                            </svg>
                                        </div>

                                        <input
                                            className={this.state.clickLoader ? "fv-hideLoader" : "fv-loginPageButton"}
                                            type="button" onClick={() => {
                                            this.setState({clickLoader: true})
                                            {
                                                this.validation()
                                            }
                                            /*
                                            fetch('https://reqres.in/api/posts', {                     / POST
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({validationCode})
                                            })
                                                .then(response => response.json())
                                                .then(data =>{
                                                    if(data){
                                                        console.log(validationCode)
                                                        this.props.history.push('/registration')
                                                    }
                                                }) ; */
                                        }} value={"ادامه"}/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md={6} className={"fv-loginPageImageLeftBody"}>
                        <img src={LoginPageImage}/>
                    </MDBCol>
                </MDBRow>


            </MDBContainer>
        )
    }
}

export default LoginPage2