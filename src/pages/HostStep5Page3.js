import React, {Component} from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/HeaderSteps.scss"
import "../style/HostStep2Page2.scss"
import "../style/HostStep1Page.scss"
import "../style/HostStep5Page3.scss"
import HeaderSteps from "../componentsPages/HeaderSteps";
import Logo from "../images/Logo.png";
import Footer from "../componentsPages/footer";
import {editVilla, SetImages} from "../services/userService";
import config from "../services/config.json";
import HostStepImage1 from "../images/home_miz1 png.png"


class HostStep5Page3 extends Component {
    constructor(props) {
        super(props);
        if (!JSON.parse(localStorage.getItem("info"))) {
            this.props.history.push('/login');
        }
        this.state = {

            clickLoader: false,
            clickLoaderMainImage: false,
            clickLoaderImage1: false,
            clickLoaderImage2: false,
            clickLoaderImage3: false,
            clickLoaderImage4: false,

            setImage: false,

            imagesDatas: [],


            img_title0: '',
            img_title1: '',
            img_title2: '',
            img_title3: '',
            img_title4: '',
        }

    }

    componentDidMount() {
        this.loadImages();
    }

    fileSelectedHandler = async (event) => {
        if ((event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/bmp" || event.target.files[0].type === "image/jpeg") && event.target.files[0].size < 3000000) { // && event.target.files[0].size > 1000000

            if (event.target.name === "mainImage") {  //////// be ezaie har name ke click shod an neveshte mahv shavad va iek charkhe neshan ddade shavad
                this.setState({clickLoaderMainImage: true, setImage: true}) // bayad chek shavad ke iek ax hadeaghal save shavad (setMainImage)
            }
            if (event.target.name === "firstImage") {
                this.setState({clickLoaderImage1: true, setImage: true})
            }
            if (event.target.name === "secondImage") {
                this.setState({clickLoaderImage2: true, setImage: true})
            }
            if (event.target.name === "thirdImage") {
                this.setState({clickLoaderImage3: true, setImage: true})
            }
            if (event.target.name === "forthImage") {
                this.setState({clickLoaderImage4: true, setImage: true})       ///////////////////
            }


            //  this.setState({clickLoader:true})


            console.log(this.state.imagesDatas)

            let setNewImage = true

            if (this.state.imagesDatas) {                                  // upload قبلا وجود داشته image
                this.state.imagesDatas.map(imagesDataPrev => {

                    console.log(imagesDataPrev.input_name)
                    console.log(event.target.name)
                    if (imagesDataPrev.input_name === event.target.name) {
                        setNewImage = false
                        event.preventDefault()
                        let formData = new FormData();
                        formData.append("image", event.target.files[0])
                        formData.append("img_title", this.state.img_title0)
                        formData.append("input_name", event.target.name)
                        // formData.append("img_src" , this.state.img_title0)
                        formData.append("old_image_src", imagesDataPrev.img_src) // for update


                        SetImages(formData, this.props.match.params.id)
                            .then(res => {
                                console.log(res)
                                console.log(event.target.name)
                                console.log(res.data.data)
                                this.setState({img_title0: ""}, () => {
                                    this.loadImages();
                                })


                                if (event.target.name === "mainImage") {  // dobare mahv shavad ///////////////////
                                    this.setState({clickLoaderMainImage: false})
                                }
                                if (event.target.name === "firstImage") {
                                    this.setState({clickLoaderImage1: false})
                                }
                                if (event.target.name === "secondImage") {
                                    this.setState({clickLoaderImage2: false})
                                }
                                if (event.target.name === "thirdImage") {
                                    this.setState({clickLoaderImage3: false})
                                }
                                if (event.target.name === "forthImage") {
                                    this.setState({clickLoaderImage4: false}) /////////////////
                                }
                            })
                            .catch(err => console.log(err.response))
                    }
                })

            }
            if (this.state.imagesDatas && setNewImage === true) {
                event.preventDefault()
                let formData = new FormData();
                formData.append("image", event.target.files[0])
                formData.append("img_title", this.state.img_title0)
                formData.append("input_name", event.target.name)
                // formData.append("img_src" , this.state.img_title0)


                SetImages(formData, this.props.match.params.id)
                    .then(res => {
                        console.log(res)
                        console.log(event.target.name)
                        console.log(res.data.data)
                        this.setState({img_title0: ""}, () => {
                            this.loadImages();
                        })


                        if (event.target.name === "mainImage") {  // dobare mahv shavad ///////////////////
                            this.setState({clickLoaderMainImage: false})
                        }
                        if (event.target.name === "firstImage") {
                            this.setState({clickLoaderImage1: false})
                        }
                        if (event.target.name === "secondImage") {
                            this.setState({clickLoaderImage2: false})
                        }
                        if (event.target.name === "thirdImage") {
                            this.setState({clickLoaderImage3: false})
                        }
                        if (event.target.name === "forthImage") {
                            this.setState({clickLoaderImage4: false}) ///////////////////
                        }
                    })
                    .catch(err => console.log(err.response))
            }
        }
        if (event.target.files[0].size > 3000000) {
            alert("حجم فایل عکس باید حداکثر 3 مگابایت باشد")
        }
        {/*   if (event.target.files[0].size < 1000000) {
            alert("حجم فایل عکس باید حداقل 1 مگابایت باشد")
        }  */
        }
        if ((event.target.files[0].type !== "image/jpg" && event.target.files[0].type !== "image/png" && event.target.files[0].type !== "image/bmp" && event.target.files[0].type !== "image/jpeg")) {
            alert("لطفا فایل عکس انتخواب کنید")
        }


        /*  if(this.state.imagesDatas===[]){
             alert(3)
             let formData = new FormData() ;
             formData.append("image" , event.target.files[0])
             formData.append("img_title" , this.state.img_title0)
             formData.append("input_name" , event.target.name)
             // formData.append("img_src" , this.state.img_title0)


             SetImages(formData,this.props.match.params.id)
                 .then(res =>{
                     alert(2)
                     console.log(event.target.name)
                     console.log(res.data.data )
                 } )
                 .catch(err=>console.log(err.response))
         } */


        //console.log(this.state.valueMainPic)
        /* this.setState({fileTest: event.target.files})

         console.log(event.target.value)
         let files = event.target.files;
         let result = new FileReader()
         result.readAsDataURL(files[0]);
         result.onload=(e)=>{
             console.log(e.target.result)
             this.setState({test:e.target.result})
         }
         if((event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/png" || event.target.files[0].type ===  "image/bmp" || event.target.files[0].type ===  "image/jpeg") && event.target.files[0].size < 2000005 ){
             console.log(event.target.files[0]);
             this.setState({
                 [event.target.name]: event.target.files[0]
             }, () => this.fileUploadHandler());
         }
         if(event.target.files[0].size > 2000005){
             alert("حجم فایل عکس باید حداکثر 2 مگابایت باشد")
         }
         if((event.target.files[0].type !== "image/jpg" && event.target.files[0].type !== "image/png" && event.target.files[0].type !==  "image/bmp" && event.target.files[0].type !==  "image/jpeg") ) {
             alert("لطفا فایل عکس انتخواب کنید")
         } */
    };

    loadImages() {
        editVilla(this.props.match.params.id)
            .then(res => {
                //  console.log(res.data.data[0].images)
                this.setState({imagesDatas: res.data.data[0].images});
            });
    }

    render() {
        const pushsrc = []
        const pushinputNames = []
        if (this.state.imagesDatas) {
            // console.log(this.state.imagesDatas)
            this.state.imagesDatas.map(srcAndInputNames => {
                pushsrc.push(srcAndInputNames.img_src)
                pushinputNames.push(srcAndInputNames.input_name)

                //console.log(pushsrc)
                // if(this.state.imagesDatas.img_src && this.state.imagesDatas.input_name)
                // this.setState({srcs:pushsrc , inputNames:pushinputNames})
            })
        }


        const sendToServerDatas = {}


        /* const step1Info = JSON.parse(localStorage.getItem("step1"));
         const step2Info = JSON.parse(localStorage.getItem("step2"));
         const step22Info = JSON.parse(localStorage.getItem("step2-2"));
         const step3Info = JSON.parse(localStorage.getItem("step3"));
         const step4Info = JSON.parse(localStorage.getItem("step4"));
         const step5Info = JSON.parse(localStorage.getItem("step5"));
         const step52Info = JSON.parse(localStorage.getItem("step5-2"));


         const allData={

             phone_number: step1Info.phone_number,
             story: step1Info.story,
             title: step1Info.title,
             type: step1Info.type,

             address: step2Info.address,
             city: step2Info.city,
             state: step2Info.city,
             postal_code: step2Info.postal_code,
             village: step2Info.village,


             lat: step22Info.lat,
             long:  step22Info.long,

             area: step3Info.area,
             bedroom:  step3Info.bedroom,
             eu_toilet:  step3Info.eu_toilet,
             ir_toilet:  step3Info.ir_toilet,
             max_capacity:  step3Info.max_capacity,
             places:  step3Info.places,
             rent_type:  step3Info.rent_type,
             shared_bathroom:  step3Info.shared_bathroom,
             shower:  step3Info.shower,
             standard_capacity: step3Info.standard_capacity,
             view:  step3Info.view,
             disinfected:step3Info.disinfected,

             bodyguard: step4Info.bodyguard,
             catering: step4Info.catering,
             chef: step4Info.chef,
             general_fac: step4Info.general_fac,
             host: step4Info.host,
             kitchen_fac: step4Info.kitchen_fac,
             temp_fac: step4Info.temp_fac,
             tour_guide: step4Info.tour_guide,


             monthly_discount: step5Info.monthly_discount,
             normal_cost: step5Info.normal_cost,
             normal_extra_cost:  step5Info.normal_extra_cost,
             special_cost:  step5Info.special_cost,
             special_extra_cost: step5Info.special_extra_cost,
             weekly_discount:  step5Info.weekly_discount,


             arrival_time: step52Info.arrival_time,
             auth_rules: step52Info.auth_rules,
             exit_time: step52Info.exit_time,
             max_reserve: step52Info.max_reserve,
             min_reserve: step52Info.min_reserve,
             special_rules: step52Info.special_rules,
             suitable_for: step52Info.suitable_for,
         }

         if(allData.address === ""){
             delete allData.address
         }
         if(allData.area === ""){
             delete allData.area
         }
         if(allData.arrival_time === "title"){
             delete allData.arrival_time
         }
         if(allData.auth_rules === ""){
             delete allData.auth_rules
         }
         if(allData.bodyguard === ""){
             delete allData.bodyguard
         }
         if(allData.catering === ""){
             delete allData.catering
         }
         if(allData.chef === ""){
             delete allData.chef
         }
         if(allData.city === "title"){
             delete allData.city
         }
         if(allData.state === "title"){
             delete allData.city
         }
         if(allData.exit_time === "title"){
             delete allData.exit_time
         }
         if(allData.general_fac === ""){
             delete allData.general_fac
         }
         if(allData.host === ""){
             delete allData.host
         }
         if(allData.kitchen_fac === ""){
             delete allData.kitchen_fac
         }
         if(allData.max_reserve === ""){
             delete allData.max_reserve
         }
         if(allData.min_reserve === ""){
             delete allData.min_reserve
         }
         if(allData.monthly_discount === ""){
             delete allData.monthly_discount
         }
         if(allData.normal_cost === ""){
             delete allData.normal_cost
         }
         if(allData.normal_extra_cost === ""){
             delete allData.normal_extra_cost
         }
         if(allData.phone_number === ""){
             delete allData.phone_number
         }
         if(allData.places === ""){
             delete allData.places
         }
         if(allData.postal_code === ""){
             delete allData.postal_code
         }
         if(allData.rent_type === "title"){
             delete allData.rent_type
         }
         if(allData.special_cost === ""){
             delete allData.special_cost
         }
         if(allData.special_extra_cost === ""){
             delete allData.special_extra_cost
         }
         if(allData.special_rules === ""){
             delete allData.special_rules
         }
         if(allData.story === ""){
             delete allData.story
         }
         if(allData.suitable_for === ""){
             delete allData.suitable_for
         }
         if(allData.temp_fac === ""){
             delete allData.temp_fac
         }
         if(allData.title === ""){
             delete allData.title
         }
         if(allData.tour_guide === ""){
             delete allData.tour_guide
         }
         if(allData.type === "title"){
             delete allData.type
         }
         if(allData.view === ""){
             delete allData.view
         }
         if(allData.village === ""){
             delete allData.village
         }
         if(allData.weekly_discount === ""){
             delete allData.weekly_discount
         }
         console.log(allData)

         //console.log(JSON.parse(localStorage.getItem("step5")))
         // console.log(JSON.parse(localStorage.getItem("info")))





         const setDatas =  () =>{
             this.setState({clickLoader:true})



             storeVilla(allData)
                 .then(res=>{
                     if(res.status===200){

                                     localStorage.removeItem("step1")
                                     localStorage.removeItem("step2")
                                     localStorage.removeItem("step2-2")
                                     localStorage.removeItem("step3")
                                     localStorage.removeItem("step4")
                                     localStorage.removeItem("step5")
                                     localStorage.removeItem("step5-2")
                                     this.props.history.push('/myAccommodation')

                     }else {
                         alert("لطفا مجددا اطلاعات خود را بررسی کنید - اطلاعات شما نادرست وارد شده")
                         this.props.history.push('../../hostStep1')
                     }

                 })
                 .catch(err=>{
                     let getErrors = ""
                     if(err.response.data.errors) {
                         getErrors = Object.values(err.response.data.errors)
                         let showErrors = ""
                         for (let i = 0; i < getErrors.length; i++) {
                             if (i === 0) {
                                 showErrors = `${getErrors[i]}`;
                             } else {
                                 showErrors = `${showErrors} \n ${getErrors[i]}`
                             }
                         }


                         alert(showErrors)
                         if (err.response.data.errors.title || err.response.data.errors.type || err.response.data.errors.phone_number || err.response.data.errors.story) {
                             this.props.history.push('../../hostStep1')
                         }lo
                         if (err.response.data.errors.city || err.response.data.errors.state || err.response.data.errors.postal_code || err.response.data.errors.address) {
                             this.props.history.push('../../hostStepAddress')
                         }
                         if (err.response.data.errors.area || err.response.data.errors.places || err.response.data.errors.view) {
                             this.props.history.push('../../hostStepAccommodationDetails')
                         }
                         if (err.response.data.errors.general_fac || err.response.data.errors.kitchen_fac || err.response.data.errors.temp_fac) {
                             this.props.history.push('../../hostStepFacilities')
                         }
                         if (err.response.data.errors.normal_extra_cost || err.response.data.errors.normal_cost || err.response.data.errors.special_cost || err.response.data.errors.special_extra_cost || err.response.data.errors.weekly_discount || err.response.data.errors.monthly_discount) {
                             this.props.history.push('../../hostStepSetPrice')
                         }
                         if (err.response.data.errors.arrival_time || err.response.data.errors.auth_rules || err.response.data.errors.exit_time || err.response.data.errors.max_reserve || err.response.data.errors.max_reserve || err.response.data.errors.suitable_for) {
                             this.props.history.push('../../hostStepRules')
                         }
                     }
                     else {
                         alert('errors')
                     }
                 })
         }
                                     */


        return (
            <MDBContainer
                className={" fv-HostStep2Page fv-hostStep2Page2 fv-hostStep3Page fv-hostStep4Page fv-hostStep5Page fv-hostStep5Page2 fv-hostStep5Page3"}>
                <MDBContainer className={"fv-HostStep1Page"}>
                    <MDBRow>
                        <HeaderSteps/>
                    </MDBRow>


                    <MDBRow className={"fv-HostStep1PageBody"}>
                        <MDBCol className={"fv-hostStepPage1Right"} sm={12} md={6}>
                            <h6 className={"fv-hostStep3NumberOfCapacityMobile"}>تصویر اصلی</h6>
                            <p className={"fv-hostStep5P"}>مهمانان ابتدا این تصویر را میبینند،این تصویر معرف اقامت گاه
                                شماست،پس تصویر با کیفیت و زیبا انتخاب کنید</p>

                            <MDBRow className={"fv-hostStep5Page3TopPicImage"}>
                                <MDBCol>
                                    <div>
                                        <label htmlFor="myInput">
                                            <img
                                                src={pushinputNames.indexOf("mainImage") === -1 ? Logo : `${config.webapi}/images/villas/thum/${pushsrc[pushinputNames.indexOf("mainImage")]}`}/>

                                            <div
                                                className={this.state.clickLoaderMainImage ? "loaderImage" : "fv-hideLoader"}>
                                                <svg className="circular" viewBox="25 25 50 50">
                                                    <circle className="path" cx="50" cy="50" r="20" fill="none"
                                                            stroke-width="2"
                                                            stroke-miterlimit="10"/>
                                                </svg>
                                            </div>

                                            <label htmlFor="files0"
                                                   className={this.state.clickLoaderMainImage ? "fv-hideLoader" : "btn"}>تصویر
                                                خود را انتخاب کنید</label>
                                            <input id="files0" style={{display: 'none'}}
                                                   onChange={this.fileSelectedHandler} type="file" name={'mainImage'}/>
                                        </label>

                                    </div>
                                </MDBCol>
                            </MDBRow>

                        </MDBCol>


                        <MDBCol className={"fv-hostStepPage1Left fv-hostStepPageSpace"} sm={12} md={6}>
                            <MDBRow className={"fv-hostStepPage1LeftContentBody"}>
                                <p>طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند ک
                                    ه محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگ
                                    ر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته میشود و این
                                    کار زمان بر خواهد بود. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگرا
                                    ن را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند.</p>
                                <img src={HostStepImage1} className={"fv-hostStepPage1LeftImage"}/>
                            </MDBRow>
                            <MDBRow className={"fv-hostStepPage2LeftButtonBody"}>

                                {/*  <div className={this.state.clickLoader ? "loader" : "fv-hideLoader"}> */}
                                <div
                                    className={this.state.clickLoader || this.state.clickLoaderMainImage || this.state.clickLoaderImage1 || this.state.clickLoaderImage2 || this.state.clickLoaderImage3 || this.state.clickLoaderImage4 ? "loader fv-hostStepPage1LeftButton" : "fv-hideLoader"}>
                                    <svg className="circular" viewBox="25 25 50 50">
                                        <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                                stroke-miterlimit="10"/>
                                    </svg>
                                </div>


                                <input type="button" value="ثبت اقامتگاه"
                                       className={this.state.clickLoader || this.state.clickLoaderMainImage || this.state.clickLoaderImage1 || this.state.clickLoaderImage2 || this.state.clickLoaderImage3 || this.state.clickLoaderImage4 ? "fv-hideLoader fv-hostStepPage1LeftButton" : "fv-hostStepPage1LeftButton"}
                                       onClick={() => {
                                           if (pushsrc.length > 0 || this.state.setImage) {
                                               this.setState({clickLoader: true})

                                               localStorage.removeItem("step1")
                                               localStorage.removeItem("step2")
                                               localStorage.removeItem("step2-2")
                                               localStorage.removeItem("step3")
                                               localStorage.removeItem("step4")
                                               localStorage.removeItem("step5")
                                               localStorage.removeItem("step5-2")
                                               localStorage.removeItem("editCode")
                                               this.props.history.push('/MainProfilePages/myAccommodation')
                                           } else {
                                               alert("ویلای شما باید حداقل یک عکس داشته باشد")
                                           }


                                           /* storeVilla(allData)
                                               .then(res=>{
                                                   if(res.status===200){
                                                       localStorage.removeItem("step1")
                                                       localStorage.removeItem("step2")
                                                       localStorage.removeItem("step2-2")
                                                       localStorage.removeItem("step3")
                                                       localStorage.removeItem("step4")
                                                       localStorage.removeItem("step5")
                                                       localStorage.removeItem("step5-2")
                                                       this.props.history.push('/myAccommodation')
                                                   }else {
                                                       alert("لطفا مجددا اطلاعات خود را بررسی کنید - اطلاعات شما نادرست وارد شده")
                                                       this.props.history.push('../../hostStep1')
                                                   }
                                               })
                                               .catch(err=>{
                                                   const getErrors = Object.values(err.response.data.errors)
                                                   let showErrors = ""
                                                   for (let i = 0 ; i < getErrors.length ; i++){
                                                       if(i===0){
                                                           showErrors=`${getErrors[i]}`;
                                                       }else {
                                                           showErrors=`${showErrors} \n ${getErrors[i]}`
                                                       }
                                                   }
                                                   alert(showErrors)
                                                   if(err.response.data.errors.title || err.response.data.errors.type || err.response.data.errors.phone_number || err.response.data.errors.story){
                                                       this.props.history.push('../../hostStep1')
                                                   }
                                                   if(err.response.data.errors.city || err.response.data.errors.state || err.response.data.errors.postal_code || err.response.data.errors.address){
                                                       this.props.history.push('../../hostStepAddress')
                                                   }
                                                   if(err.response.data.errors.area || err.response.data.errors.places || err.response.data.errors.view){
                                                       this.props.history.push('../../hostStepAccommodationDetails')
                                                   }
                                                   if(err.response.data.errors.general_fac || err.response.data.errors.kitchen_fac || err.response.data.errors.temp_fac){
                                                       this.props.history.push('../../hostStepFacilities')
                                                   }
                                                   if(err.response.data.errors.normal_extra_cost || err.response.data.errors.normal_cost ||  err.response.data.errors.special_cost ||  err.response.data.errors.special_extra_cost ||  err.response.data.errors.weekly_discount ||  err.response.data.errors.monthly_discount){
                                                       this.props.history.push('../../hostStepSetPrice')
                                                   }
                                                   if(err.response.data.errors.arrival_time || err.response.data.errors.auth_rules || err.response.data.errors.exit_time || err.response.data.errors.max_reserve || err.response.data.errors.max_reserve  || err.response.data.errors.suitable_for){
                                                       this.props.history.push('../../hostStepRules')
                                                   }
                                               })



                                           /////////////////////////////////////// err.response.data.errors.title
                                           /////////////////////////////////////// err.response.data.errors.type
                                           /////////////////////////////////////// err.response.data.errors.phone_number
                                           /////////////////////////////////////// err.response.data.errors.story

                                           /////////////////////////////////////// err.response.data.errors.city
                                           /////////////////////////////////////// err.response.data.errors.state
                                           /////////////////////////////////////// err.response.data.errors.postal_code
                                           /////////////////////////////////////// err.response.data.errors.address

                                           /////////////////////////////////////// err.response.data.errors.area
                                           /////////////////////////////////////// err.response.data.errors.places
                                           /////////////////////////////////////// err.response.data.errors.view

                                           /////////////////////////////////////// err.response.data.errors.general_fac
                                           /////////////////////////////////////// err.response.data.errors.kitchen_fac
                                           /////////////////////////////////////// err.response.data.errors.temp_fac

                                           /////////////////////////////////////// err.response.data.errors.arrival_time
                                           /////////////////////////////////////// err.response.data.errors.auth_rules
                                           /////////////////////////////////////// err.response.data.errors.exit_time
                                           /////////////////////////////////////// err.response.data.errors.max_reserve
                                           /////////////////////////////////////// err.response.data.errors.min_reserve
                                           /////////////////////////////////////// err.response.data.errors.normal_extra_cost
                                           /////////////////////////////////////// err.response.data.errors.suitable_for

                                           //if status === 500    server Error


                                           /* let fd = new FormData()
                                           fd.append("images", this.state.fileTest);
                                              const images={
                                                  img_src:"test.png",
                                                  img_title:"test"
                                              }
                                             SetImages(this.state.test,30)
                                                  .then(res => console.log(res))
                                                  .catch(err=>console.log(err.response)) */
                                       }}/>
                                <input type="button" value="مرحله قبل"
                                       className={this.state.clickLoader || this.state.clickLoaderMainImage || this.state.clickLoaderImage1 || this.state.clickLoaderImage2 || this.state.clickLoaderImage3 || this.state.clickLoaderImage4 ? "fv-hideLoader fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton  fv-ButtonSetImageReturn" : "fv-hostStepPage2LeftButton fv-hostStepPage1LeftButton "}
                                       onClick={() => {
                                           localStorage.setItem("editCode", JSON.stringify({editCode: this.props.match.params.id}))
                                           this.props.history.push('../../hostStepRules')
                                       }}/>
                            </MDBRow>
                        </MDBCol>

                        {/*    <HostStepLeftBodyContent
                            text="طراحان سایت هنگام طراحی قالب سایت معمولا با این موضوع رو برو هستند ک
                            ه محتوای اصلی صفحات آماده نیست. در نتیجه طرح کلی دید درستی به کار فرما نمیدهد. اگ
                            ر طراح بخواهد دنبال متن های مرتبط بگردد تمرکزش از روی کار اصلی برداشته میشود و این
                            کار زمان بر خواهد بود. همچنین طراح به دنبال این است که پس از ارایه کار نظر دیگرا
                            ن را در مورد طراحی جویا شود و نمی‌خواهد افراد روی متن های موجود تمرکز کنند."
                            image={Logo}/> */}
                    </MDBRow>

                    <MDBContainer className={"fv-hostStep5Page3MultiImages"}>
                        <MDBRow className={"fv-hostStep5Page3MultiImagesMobileAnotherPicP"}>
                            <p>تصاویر قسمت های دیگر اقامت گاه خود را انتخاب کنید</p>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3} sm={12}>
                                <MDBRow className={"fv-hostStep5Page3Images"}>
                                    <MDBCol>
                                        <div>
                                            <label htmlFor="myInput">
                                                <img
                                                    src={pushinputNames.indexOf("firstImage") === -1 ? Logo : `${config.webapi}/images/villas/thum/${pushsrc[pushinputNames.indexOf("firstImage")]}`}/>
                                                <div
                                                    className={this.state.clickLoaderImage1 ? "loaderImage" : "fv-hideLoader"}>
                                                    <svg className="circular" viewBox="25 25 50 50">
                                                        <circle className="path" cx="50" cy="50" r="20" fill="none"
                                                                stroke-width="2"
                                                                stroke-miterlimit="10"/>
                                                    </svg>
                                                </div>

                                                <label htmlFor="files1"
                                                       className={this.state.clickLoaderImage1 ? "fv-hideLoader" : "btn"}>تصویر
                                                    خود را انتخاب کنید</label>
                                                <input id="files1" style={{display: 'none'}}
                                                       onChange={this.fileSelectedHandler} type="file"
                                                       name={'firstImage'}/>
                                            </label>

                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md={12} sm={12} className={"fv-hostStep5Page3ImagesComment"}>
                                        <p>عنوان تصویر یا شرح کوتاه</p>
                                        <input type="text" name="img_title1" value={this.state.img_title1}
                                               onChange={(e => this.setState({img_title1: e.target.value}))}/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md={3} sm={12}>
                                <MDBRow className={"fv-hostStep5Page3Images"}>
                                    <MDBCol>
                                        <div>
                                            <label htmlFor="myInput">
                                                <img
                                                    src={pushinputNames.indexOf("secondImage") === -1 ? Logo : `${config.webapi}/images/villas/thum/${pushsrc[pushinputNames.indexOf("secondImage")]}`}/>

                                                <div
                                                    className={this.state.clickLoaderImage2 ? "loaderImage" : "fv-hideLoader"}>
                                                    <svg className="circular" viewBox="25 25 50 50">
                                                        <circle className="path" cx="50" cy="50" r="20" fill="none"
                                                                stroke-width="2"
                                                                stroke-miterlimit="10"/>
                                                    </svg>
                                                </div>

                                                <label htmlFor="files2"
                                                       className={this.state.clickLoaderImage2 ? "fv-hideLoader" : "btn"}>تصویر
                                                    خود را انتخاب کنید</label>
                                                <input id="files2" style={{display: 'none'}}
                                                       onChange={this.fileSelectedHandler} type="file"
                                                       name={'secondImage'}/>
                                            </label>

                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md={12} sm={12} className={"fv-hostStep5Page3ImagesComment"}>
                                        <p>عنوان تصویر یا شرح کوتاه</p>
                                        <input type="text" name="img_title2" value={this.state.img_title2}
                                               onChange={(e => this.setState({img_title2: e.target.value}))}/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md={3} sm={12}>
                                <MDBRow className={"fv-hostStep5Page3Images"}>
                                    <MDBCol>
                                        <div>
                                            <label htmlFor="myInput">
                                                <img
                                                    src={pushinputNames.indexOf("thirdImage") === -1 ? Logo : `${config.webapi}/images/villas/thum/${pushsrc[pushinputNames.indexOf("thirdImage")]}`}/>

                                                <div
                                                    className={this.state.clickLoaderImage3 ? "loaderImage" : "fv-hideLoader"}>
                                                    <svg className="circular" viewBox="25 25 50 50">
                                                        <circle className="path" cx="50" cy="50" r="20" fill="none"
                                                                stroke-width="2"
                                                                stroke-miterlimit="10"/>
                                                    </svg>
                                                </div>

                                                <label htmlFor="files3"
                                                       className={this.state.clickLoaderImage3 ? "fv-hideLoader" : "btn"}>تصویر
                                                    خود را انتخاب کنید</label>
                                                <input id="files3" style={{display: 'none'}}
                                                       onChange={this.fileSelectedHandler} type="file"
                                                       name={'thirdImage'}/>
                                            </label>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md={12} sm={12} className={"fv-hostStep5Page3ImagesComment"}>
                                        <p>عنوان تصویر یا شرح کوتاه</p>
                                        <input type="text" name="img_title3" value={this.state.img_title3}
                                               onChange={(e => this.setState({img_title3: e.target.value}))}/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md={3} sm={12}>
                                <MDBRow className={"fv-hostStep5Page3Images"}>
                                    <MDBCol>
                                        <div>
                                            <label htmlFor="myInput">
                                                <img
                                                    src={pushinputNames.indexOf("forthImage") === -1 ? Logo : `${config.webapi}/images/villas/thum/${pushsrc[pushinputNames.indexOf("forthImage")]}`}/>
                                                <div
                                                    className={this.state.clickLoaderImage4 ? "loaderImage" : "fv-hideLoader"}>
                                                    <svg className="circular" viewBox="25 25 50 50">
                                                        <circle className="path" cx="50" cy="50" r="20" fill="none"
                                                                stroke-width="2"
                                                                stroke-miterlimit="10"/>
                                                    </svg>
                                                </div>

                                                <label htmlFor="files4"
                                                       className={this.state.clickLoaderImage4 ? "fv-hideLoader" : "btn"}>تصویر
                                                    خود را انتخاب کنید</label>
                                                <input id="files4" style={{display: 'none'}}
                                                       onChange={this.fileSelectedHandler} type="file"
                                                       name={'forthImage'}/>
                                            </label>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md={12} sm={12} className={"fv-hostStep5Page3ImagesComment"}>
                                        <p>عنوان تصویر یا شرح کوتاه</p>
                                        <input type="text" name="img_title4" value={this.state.img_title4}
                                               onChange={(e => this.setState({img_title4: e.target.value}))}/>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>


                    </MDBContainer>

                    <MDBRow>
                        <Footer/>
                    </MDBRow>
                </MDBContainer>
            </MDBContainer>
        )
    }
}

export default HostStep5Page3