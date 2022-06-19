import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/LoginPage.scss"
import LoginPageImage from "../images/login 12.png"
import {Link} from "react-router-dom";
import {sendPhoneNumber} from "../services/userService"
import {digitsFaToEn} from "@persian-tools/persian-tools";


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            eNumber: '',
            phone_number: '',
            validNumber: true,
            clickLoader: false,

            test: '',
        }
    }

    sendSms = async () => {

        const phone_number = {
            phone_number: this.state.phone_number,
        }


        /*    axios.post(`${config.webapi}/api/v1/login`, {
                phone_number: this.state.phone_number,
            })
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });



            await sendPhoneNumber(phone_number)
                .then(res =>console.log(res))
                .catch(err => console.log(err))

                */

        await sendPhoneNumber(phone_number).then(result => {
            // console.log(result)
            if (result.data.redirection) {
                localStorage.removeItem("phone_number")
                localStorage.setItem('phone_number', (phone_number.phone_number));
                alert("به ترپ خوش آمدید لطفا ابتدا ثبت نام کنید")
                this.props.history.push("/registration");

            } else {
                const status = result.status
                const data = result.data
                if (status === 200 && data.status === 2) {
                    // Phone number have to save in local storage for use it, in the next step
                    localStorage.removeItem("phone_number")
                    localStorage.setItem('phone_number', (phone_number.phone_number));
                    alert('پیامک اعتبارسنجی ارسال شد');
                    this.props.history.push("/loginMembership");

                } else if (status === 200 && data.status === 1) {
                    alert('پیامک برای شما ارسال شده لطفا چند دقیقه دیگر تلاش مجدد فرمایید');
                    this.setState({clickLoader: false})
                } else {
                    this.setState({validNumber: false, clickLoader: false})
                }
            }

        })
            .catch(error => error.response.status === 422 ? this.setState({
                validNumber: false,
                clickLoader: false
            }) : '')


    }

    render() {
        return (
            <MDBContainer  className={"fv-loginPagesBody"}>
                <MDBRow className={"fv-loginPage"}>
                    <MDBCol md={6} sm={12} className={"fv-loginPageBody"}>
                        <MDBRow className={"fv-LoginPageHeader"}>
                            <MDBCol>
                                <i className="fas fa-chevron-right"/><p><Link to={'/'}>صفحه اصلی</Link></p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className={"fv-loginPageBodyOne"}>
                            <p className={this.state.validNumber === false ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>
                                <i style={{color: 'mediumvioletred'}} className="fas fa-exclamation-triangle"/>شماره
                                مورد نظر نامعتبر میباشد</p>

                            <MDBCol sm={12}>
                                <h3>ورود به حساب کاربری</h3>
                                {/* <p>شماره موبایل خود را وارد نمایید</p> */}
                                <MDBRow>
                                    <MDBCol md={12}>
                                        <p>شماره موبایل خود را وارد نمایید</p>
                                    </MDBCol>
                                    {/*  <MDBCol >
                                        <Link to={"/registration"} ><p>عضو شوید</p> </Link>
                                    </MDBCol>  */}
                                </MDBRow>
                                <input type="number" placeholder={'شماره موبایل'}
                                       className={this.state.validNumber === false ? "fv-redBorderError fv-english-number" : "fv-english-number"}
                                       name={'phone_number'} value={this.state.phone_number}
                                       onChange={((e) => {
                                           if (e.target.value.length <= 11)
                                               this.setState({phone_number: digitsFaToEn(e.target.value)})
                                       })}/>
                                <MDBRow className={'fv-rulesText'}>
                                    <p>با ورود و یا ثبت نام در ترپ شما
                                        <a href="/RulesPage" target="_blank"
                                           rel="noopener noreferrer"> شرایط و قوانین </a>
                                        استفاده از سرویس های سایت ترپ
                                        و قوانین حریم خصوصی آن را می‌پذیرید
                                    </p>
                                    {/*  <MDBCol >
                                        <Link to={"/registration"} ><p>عضو شوید</p> </Link>
                                    </MDBCol>  */}
                                </MDBRow>
                                <MDBRow>
                                    <div
                                        className={this.state.clickLoader ? "loader fv-loginPageLoadWaiting" : "fv-hideLoader"}>
                                        <svg className="circular" viewBox="25 25 50 50">
                                            <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                                    stroke-miterlimit="10"/>
                                        </svg>
                                    </div>

                                    <input className={this.state.clickLoader ? "fv-hideLoader" : "fv-loginPageButton"}
                                           type="button" value={"ادامه"} onClick={() => {
                                        this.setState({clickLoader: true})
                                        {
                                            this.sendSms()
                                        }


                                        /*  const { status, data } = await sendPhoneNumber(user);
                                          if (status === 200 && data.status===2) {
                                              // Phone number have to save in local storage for use it, in the next step
                                              localStorage.setItem("phone_number",phone_number);
                                              alert('پیامک اعتبارسنجی ارسال شد');
                                              history.replace("/verifySms");

                                          }else{
                                              alert('شماره نامعتبر است')
                                          } */


                                        /*  {getUserInfo((dataGet)=>{
                                            dataGet.then(response => response.json())
                                            dataGet.then(json => {
                                                    this.setState({mobileNumber:json.support.text});
                                                    console.log(this.state.mobileNumber)
                                                });
                                        }) }     */

                                        /* {sendPhoneNumber(this.state.mobileNumber)}
                                        {getUserInfo( (dataGet)=>{
                                            dataGet.then(response => response.json())
                                            dataGet.then(json => {
                                                this.setState({test:json.support.text});
                                                console.log(this.state.test)
                                            });
                                        })} */


                                        {/*
                                        fetch('https://reqres.in/api/get/1')                            // GET
                                            .then(response => response.json())
                                            .then(json => {
                                                this.setState({mobileNumber:json.support.text});
                                                this.props.history.push('/loginMembership');
                                            });

                                        fetch('https://reqres.in/api/posts', {                     //POST
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({PostData})
                                        })
                                            .then(response => response.json())
                                            .then(data =>{
                                                if(data){
                                                    console.log(PostData)
                                                    this.setState({PostData:"Successful" })
                                                    this.props.history.push('/loginMembership');
                                                } else this.setState({PostData:"UnSuccessful"})
                                            }) ;
                                        */
                                        }
                                    }}/>
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

export default LoginPage;