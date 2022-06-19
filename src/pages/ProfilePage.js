import React, {Component} from "react";
import {MDBCol, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePage.scss"
import {getUserInformation, updateUserAvatar, updateUserInfo} from "../services/userService";
import {waitingForCalculate, WaitingLoadingProfilePage} from "../componentsPages/WaitingLoad";
import {digitsFaToEn} from "@persian-tools/persian-tools";
import {FormControl, InputGroup} from 'react-bootstrap';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {
            ...props,
            ...this.state,
            ...this.props,
            nameAndFamily: '',
            username: '',
            mobileNumber: '',
            emailAddress: '',
            nationalCode: '',
            job: '',
            education: '',
            foreignTab: '',
            cardNumber: '',
            shabaNumber: '',
            errorField: '',
            allErrors: '',

            setCorrectlyInfo: false,
            clickLoaderAvatar: false,
            avatarImageData: '',

            UserInfo: '',
            loadingPageWaiting: true,
            waitingButtonClick: false,
            waitingButtonStoreClick: false,

        }

    }

    componentDidMount() {

        this.authentication()
    }

    authentication = async () => {
        getUserInformation()
            .then(res => {
                console.log(res)
                this.setState({
                    nameAndFamily: res.data.fullname,
                    mobileNumber: res.data.phone_number,
                    emailAddress: res.data.email,
                    nationalCode: res.data.national_code,
                    job: res.data.job,
                    education: res.data.education,
                    foreignTab: res.data.foreign_language,
                    cardNumber: res.data.card_number,
                    shabaNumber: res.data.shaba_number,
                    username: res.data.trapp_id,


                    UserInfo: res.data,
                    loadingPageWaiting: false,
                    waitingButtonStoreClick: false
                })
            })
            .catch(err => this.setState({waitingButtonStoreClick: false}))
    }
    handleError = (errorData) => {
        const errors = []

        if (errorData.trapp_id) {
            errors.push('trappid')
        }
        if (errorData.card_number) {
            errors.push('cardNumber')
        }
        if (errorData.card_number) {
            errors.push('cardNumber')
        }
        if (errorData.email) {
            errors.push('email')
        }
        if (errorData.fullname) {
            errors.push('fullname')
        }
        if (errorData.national_code) {
            errors.push('notionalCode')
        }
        if (errorData.phone_number) {
            errors.push('phoneNumber')
        }
        if (errorData.shaba_number) {
            errors.push('shabaNumber')
        }
        this.setState({
            errorField: errors,
            waitingButtonClick: false,
            waitingButtonStoreClick: false,
            allErrors: errorData
        })
    }

    fileSelectedHandler = (event) => {

        if ((event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/bmp" || event.target.files[0].type === "image/jpeg") && event.target.files[0].size < 3000000) {
            this.setState({clickLoaderAvatar: true})
            console.log(event)
            event.preventDefault()
            //  this.setState({clickLoader:true})
            console.log(event.target.files[0])
            console.log(event.target.name)

            let formData = new FormData();
            formData.append("avatar", event.target.files[0])
            updateUserAvatar(formData)
                .then(res => {
                    if (res.data.avatar_count !== 0) {
                        this.setState({avatarImageData: res.data.avatar}, () => {
                            const info = JSON.parse(localStorage.getItem("infoUser"))
                            let avatar = ""
                            let fullName = ""
                            if (info) {
                                fullName = info.userInfo.fullname
                                avatar = info.userInfo.avatar
                            }

                            let setAvatar = ""
                            if (this.state.avatarImageData) {
                                setAvatar = this.state.avatarImageData
                            } else {
                                setAvatar = avatar
                            }
                            const userInfo = {
                                avatar: setAvatar,
                                fullname: fullName,
                            }

                            const dataInfoUpdate = {
                                userInfo: userInfo
                            }
                            localStorage.setItem("infoUser", JSON.stringify(dataInfoUpdate))
                            this.props.ChangeUserAvatarSrc(res.data.avatar)
                            this.setState({clickLoaderAvatar: false})
                        })
                    }
                })

            this.setState({avatarImageData: formData})

        }
        if (event.target.files[0].size > 3000000) {
            alert("حجم فایل عکس باید حداکثر 2 مگابایت باشد")
        }
        if ((event.target.files[0].type !== "image/jpg" && event.target.files[0].type !== "image/png" && event.target.files[0].type !== "image/bmp" && event.target.files[0].type !== "image/jpeg")) {
            alert("لطفا فایل عکس انتخواب کنید")
        }
    };

    render() {

        let IR = "IR-"
        const info = JSON.parse(localStorage.getItem("infoUser"))
        // let fullName =  ""
        let avatar = ""
        if (info) {
            //  fullName=info.userInfo.fullname
            avatar = info.userInfo.avatar
        }
        console.log(this.state.avatarImageData)
        const {nameAndFamily, mobileNumber, emailAddress, job, nationalCode, education, foreignTab, cardNumber, shabaNumber} = this.state


        return (
            <>
                {this.state.loadingPageWaiting ?
                    WaitingLoadingProfilePage(true, "fv-waitingLoadPublicFullScreen")
                    :
                    <div  className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage"}>
                        <div   className={"fv-ProfilePageLeftBody"}>

                            <MDBCol  md={8} sm={12} className={"fv-ProfilePageUserSetInfo fv-profilePageInner"}>
                                <p className={this.state.errorField && !this.state.setCorrectlyInfo ? "fv-alertErrorText" : 'fv-alertNotErrorText'}>لطفا
                                    کادر های قرمز را به درستی پر کنید</p>
                                <p className={this.state.allErrors.trapp_id && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.trapp_id ? this.state.allErrors.trapp_id[0] : ''}
                                </p>
                                <p className={this.state.allErrors.card_number && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.card_number ? this.state.allErrors.card_number[0] : ''}
                                </p>
                                <p className={this.state.allErrors.email && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.email ? this.state.allErrors.email[0] : ''}
                                </p>
                                <p className={this.state.allErrors.fullname && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.fullname ? this.state.allErrors.fullname[0] : ''}
                                </p>
                                <p className={this.state.allErrors.national_code && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.national_code ? this.state.allErrors.national_code[0] : ''}
                                </p>
                                <p className={this.state.allErrors.phone_number && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.phone_number ? this.state.allErrors.phone_number[0] : ''}
                                </p>
                                <p className={this.state.allErrors.shaba_number && !this.state.setCorrectlyInfo ? "fv-alertErrorTextDiscussion" : 'fv-alertNotErrorText'}>
                                    <i style={{marginLeft: '2%', color: 'mediumvioletred'}}
                                       className="fas fa-exclamation-triangle"/>{this.state.allErrors.shaba_number ? this.state.allErrors.shaba_number[0] : ''}
                                </p>


                                <h6 className={"fv-userInfoText"}>اطلاعات کاربری</h6>
                                <MDBRow className={"fv-NameUserInfoBody"}>
                                    <MDBCol md={4} sm={12}>
                                        <h6>نام و نام خانوادگی</h6>
                                        <input type="text"
                                               className={this.state.errorField.includes('fullname') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError" : ''}
                                               value={this.state.nameAndFamily}
                                               onChange={(e) => this.setState({nameAndFamily: e.target.value})}/>
                                    </MDBCol>
                                    {console.log(this.state.errorField)}
                                    <MDBCol md={4} sm={12}>

                                        <h6>نام کاربری</h6>
                                        <InputGroup
                                            className={this.state.errorField.includes('trappid') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError mb-3 fv-usernameProfilePage" : 'mb-3 fv-usernameProfilePage'}>
                                            <FormControl
                                                value={this.state.username}
                                                type={'text'}
                                                onChange={(e) => this.setState({username: e.target.value})}
                                            />

                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        </InputGroup>

                                    </MDBCol>
                                </MDBRow>

                                <h6>شماره موبایل</h6>
                                <input type="number"
                                       className={this.state.errorField.includes('phoneNumber') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError" : 'fv-english-number'}
                                       value={this.state.mobileNumber}
                                       onChange={(e) => {
                                           if (e.target.value.length <= 11)
                                               this.setState({mobileNumber: digitsFaToEn(e.target.value)})
                                       }
                                       }/>
                                <h6>آدرس ایمیل</h6>
                                <input type="email"
                                       className={this.state.errorField.includes('email') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError" : ''}
                                       value={this.state.emailAddress}
                                       onChange={(e) => this.setState({emailAddress: e.target.value})}/>
                                <h6>کد ملی</h6>
                                <input type="number" value={this.state.nationalCode}
                                       className={this.state.errorField.includes('notionalCode') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError fv-english-number" : 'fv-english-number'}
                                       onChange={(e) => {
                                           if (e.target.value.length <= 10)
                                               this.setState({nationalCode: e.target.value})
                                       }
                                       }/>
                                <h6>شغل</h6>
                                <input type="text" value={this.state.job}
                                       onChange={(e) => this.setState({job: e.target.value})}/>
                                <h6>تحصیلات</h6>
                                <input type="text" value={this.state.education}
                                       onChange={(e) => this.setState({education: e.target.value})}/>
                                <h6>زبانه خارجه</h6>
                                <input type="text" value={this.state.foreignTab}
                                       onChange={(e) => this.setState({foreignTab: e.target.value})}/>
                                <h6>شماره کارت</h6>
                                <input type="number" value={this.state.cardNumber}
                                       className={this.state.errorField.includes('cardNumber') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError fv-english-number" : 'fv-english-number'}
                                       onChange={(e) => {
                                           if (e.target.value.length <= 16)
                                               this.setState({cardNumber: e.target.value})

                                       }
                                       }/>
                                <h6>شماره شبا</h6>
                                {/*
                                <input type="text" value={`${IR}${this.state.shabaNumber}`}
                                       className={this.state.errorField.includes('shabaNumber') === true && !this.state.setCorrectlyInfo ? "fv-redBorderError fv-english-number" : 'fv-english-number'}
                                       onChange={(e) => {
                                           if (e.target.value !== 'IR') {
                                               let mystring = e.target.value.replace('IR-', '');
                                               this.setState({shabaNumber: mystring})
                                           }
                                       }}/>
                                        */}
                                <InputGroup className="mb-3 fv-shabaNumberProfilePage">
                                    <FormControl
                                        placeholder="شماره شبا"
                                        aria-label="شماره شبا"
                                        value={this.state.shabaNumber}
                                        type={'number'}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 24)
                                                this.setState({shabaNumber: e.target.value})
                                        }}
                                    />

                                    <InputGroup.Text id="basic-addon1">-IR</InputGroup.Text>
                                </InputGroup>

                                {/*   <MDBRow md={3} sm={12}>
                                <MDBContainer className={"fv-hostStep5Page3Images fv-inputProfilePageAvatar"}>


                                    <label htmlFor="myInput">
                                        <label htmlFor="files2" className={this.state.clickLoaderAvatar ?  "fv-hideLoader" : "btn"}>تصویر خود را انتخاب کنید</label>
                                        <input id="files2"   style={{display:'none'}}   onChange={this.fileSelectedHandler}  type="file"   name={'avatar'} />

                                        <MDBRow>
                                            <div className={this.state.clickLoaderAvatar ? "loaderAvatar" : "fv-hideLoader"}>
                                                <svg className="circular" viewBox="25 25 50 50">
                                                    <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                                            stroke-miterlimit="10"/>
                                                </svg>
                                            </div>
                                        </MDBRow>
                                    </label>
                                </MDBContainer>
                            </MDBRow> */}


                                <MDBRow>
                                    <MDBCol md={12} sm={12}
                                            className={this.state.waitingButtonStoreClick ? "fv-hideForWaiting" : 'fv-ProfilePageUserSetInfoButton fv-profilePageEnButton'}>

                                        <input type="button" value="ذخیره"
                                               className={this.state.waitingButtonStoreClick ? "fv-hideForWaiting" : ''}
                                               onClick={() => {
                                                   this.setState({
                                                       waitingButtonClick: true,
                                                       waitingButtonStoreClick: true,
                                                       setCorrectlyInfo: false,
                                                   })

                                                   if (this.state.clickLoaderAvatar) {  // agar karbar zamani ke ax dar hale upload ast click konad
                                                       this.setState({waitingButtonStoreClick: false})
                                                       alert("لطفا منتظر بمانید تا عکس آپلود شود")
                                                   } else {

                                                       const data = {
                                                           fullname: nameAndFamily,
                                                           phone_number: mobileNumber,
                                                           email: emailAddress,
                                                           national_code: nationalCode,
                                                           job: job,
                                                           education: education,
                                                           foreign_language: foreignTab,
                                                           card_number: cardNumber,
                                                           shaba_number: shabaNumber,
                                                           avatar: this.state.avatarImageData,
                                                           trapp_id: this.state.username,
                                                       }


                                                       let setAvatar = ""
                                                       if (this.state.avatarImageData) {
                                                           setAvatar = this.state.avatarImageData
                                                       } else {
                                                           setAvatar = avatar
                                                       }
                                                       const userInfo = {
                                                           avatar: setAvatar,
                                                           fullname: data.fullname,
                                                           trapp_id: data.trapp_id,
                                                       }

                                                       const dataInfoUpdate = {
                                                           userInfo: userInfo
                                                       }


                                                       console.log(userInfo)
                                                       updateUserInfo(data)
                                                           .then(result => {
                                                               console.log(result)
                                                               if (result.status === 200) {
                                                                   localStorage.setItem("infoUser", JSON.stringify(dataInfoUpdate))
                                                                   this.setState({
                                                                       waitingButtonClick: false,
                                                                       waitingButtonStoreClick: false,
                                                                       setCorrectlyInfo: true
                                                                   })
                                                                   this.props.ChangeUserNameAndFamily(userInfo.fullname)
                                                                   this.props.ChangeUserUsernameInfo(userInfo.trapp_id)
                                                                   alert("اطلاعات شما با موفقیت به روزرسانی شد")
                                                                   this.authentication()
                                                               }
                                                           })
                                                           .catch(error => this.handleError(error.response.data.errors))


                                                   }

                                               }}/>

                                    </MDBCol>
                                    <MDBCol md={12} sm={12}
                                            className={!this.state.waitingButtonStoreClick ? "fv-hideForWaiting" : 'fv-waitingProfilePageBody'}>
                                        {waitingForCalculate(this.state.waitingButtonStoreClick, "fv-waitingProfilePage")}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </div>

                    </div>
                }


            </>
        )
    }
}

export default ProfilePage