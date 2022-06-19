import React, {Component} from "react";
import {MDBAlert, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../style/SearchHomePage.css"
import "../style/DisplayPage.css"
import "../style/ProfilePageReservation2.scss"
import "../style/ProfilePageReservation.scss"
import "../style/ProfilePageWallet.scss"
import "../style/ProfilePageGustComments2.scss"
import Footer from "../componentsPages/footer"
import MobileLogo from "../images/MobileLogo.png"
import HeaderSearch from "../componentsPages/HeaderSearch";
import ProfilePageUserInfo from "../componentsPages/ProfilePageUserInfo";
import {getUserVillaComments, replayComment, userVillas} from "../services/userService";
import "../style/scroolBodyProfilePages.scss"
import {waitingForCalculate2} from "../componentsPages/WaitingLoad";
import UserImage from "../images/user.png"

class PrfilePageGustComments2 extends Component {
    constructor(props) {
        super(props);
        if(!JSON.parse(localStorage.getItem("info"))){
            this.props.history.push('/login');
        }
        this.state={
            comments:[],
            answerCommentId:'',
            textAreaComment:'',
            villasUser:[],
            villasUsertitle:this.props.match.params.id,
            clickHandlerLoading:false,
            clickAnswerLoader:false,

        }
    }

    componentDidMount() {
        getUserVillaComments(this.state.villasUsertitle)
            .then(res=>{
                if(res.data.data && res.data.data !== "Something went wrong!")
                this.setState({comments: Object.values(res.data.data)})
                console.log(res.data.data)
            })

        userVillas()
            .then(res=>{
                if(res.data.data)
                    this.setState({villasUser:res.data.data})
            })
    }

    render() {
        return(
            <div className={"fv-SearchHomePage fv-DisplayPage fv-ProfilePage fv-ProfilePageReservation fv-ProfilePageReservation2 fv-ProfilePageTransaction2 fv-ProfilePageWallet fv-ProfilePageGustComments2"}>

                {/*display: table; width:100%*/}
                {/*phone: flex-direction:column;*/}
                <div className={"fv-ProfilePageLeftBody"}>

                    {/*display: table-cell; */}
                    {/*  <ProfilePageUserInfo /> */}
                    {/*display: table-cell; */}
                    <MDBCol md={8} sm={12} className={"fv-ProfilePageUserSetInfo fv-ProfilePageReservationUserInfo"}>
                        <MDBRow className={"fv-ProfilePageReservationSetInfo"}>
                            <MDBCol md={4} sm={12} className={""}>
                                <select value={this.state.villasUsertitle} onChange={(e)=>{
                                    this.setState({villasUsertitle:e.target.value ,clickHandlerLoading:true} , ()=>{
                                        getUserVillaComments(e.target.value)
                                            .then(res=>{
                                                if(res.data.data && res.data.data !== "Something went wrong!")
                                                    this.setState({comments: Object.values(res.data.data) , clickHandlerLoading:false})
                                                this.props.history.push(`/MainProfilePages/profileShowGuestComments/${e.target.value}`)
                                                console.log(res.data.data)
                                            })
                                    })
                                }}>
                                    <option value='title' disabled>نام اقامت گاه</option>
                                    {this.state.villasUser.map(vilauser=>{
                                        return  <option value={vilauser.id}>{vilauser.title}</option>
                                    })}

                                </select>
                            </MDBCol>
                            {/*  <MDBCol md={2} sm={12} className={"fv-ProfilePageUserSetInfoButton"}>
                                <input type="button" value="جستجو"/>
                            </MDBCol>  */}
                        </MDBRow>

                        <div className={this.state.clickHandlerLoading ?  "fv-commentsLoaderHide" : ""}>
                        {console.log(this.state.comments)}
                        {this.state.comments.map(comment => {
                            console.log(comment)
                            if(comment.answer){
                                return  <MDBContainer className={"fv-ProfilePageGustComments2CommentOne"}>
                                            <MDBRow className={"fv-ProfilePageGustComments2CommentOneLogo"}>
                                                <MDBCol md={2} sm={3}>
                                                    <img src={UserImage}/>
                                                </MDBCol>
                                                <MDBCol md={7} sm={7}>
                                                    <MDBRow>
                                                        <h6>{comment.user_name}</h6>
                                                    </MDBRow>
                                                    <MDBRow>
                                                        <p style={{color : '#919191'}}>{comment.created_at}</p>
                                                    </MDBRow>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol>
                                                    <p className={"h7"}>{comment.text}</p>
                                                </MDBCol>
                                            </MDBRow>


                                            <MDBContainer className={"fv-ProfilePageGustComments2CommentOneAnswer"}>
                                                <MDBRow className={"fv-ProfilePageGustComments2CommentOneAnswerCommentDate"}>
                                                    <MDBCol>
                                                        <p className={"h8"}>{comment.answer.created_at}</p>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow>
                                                    <MDBCol>
                                                        <h6>میزبان کلبه سبز</h6>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className={"fv-ProfilePageGustComments2CommentOneAnswerComment"}>
                                                    <MDBCol>
                                                        <p>{comment.answer.text}</p>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBContainer>
                                </MDBContainer>
                            }else {
                             return   <MDBContainer className={"fv-ProfilePageGustComments2CommentOne"}>
                                             <MDBRow className={"fv-ProfilePageGustComments2CommentOneLogo"}>
                                                 <MDBCol md={2} sm={3}>
                                                     <img src={UserImage}/>
                                                 </MDBCol>
                                                 <MDBCol md={7} sm={7}>
                                                     <MDBRow>
                                                         <h6>{comment.user_name}</h6>
                                                     </MDBRow>
                                                     <MDBRow>
                                                         <p>{comment.created_at}</p>
                                                     </MDBRow>
                                                 </MDBCol>
                                             </MDBRow>
                                             <MDBRow>
                                                 <MDBCol>
                                                     <p className={"h7"}>{comment.text}</p>
                                                 </MDBCol>
                                             </MDBRow>
                                             <MDBRow className={comment.id === this.state.answerCommentId ? "fv-hideAnswerComments" : "fv-ProfilePageGustComments2CommentOneAnswerButton"}>
                                                 <MDBCol>
                                                     <a onClick={()=>{
                                                         this.setState({textareaClassName:"fv-ProfilePageGustComments2SetComment"
                                                             ,buttonClassname:"fv-ProfilePageWalletWalletButton" , answerATag:"fv-hideAnswerComments"
                                                             , answerCommentId:comment.id})
                                                         console.log(comment.id)
                                                     }}><h6>جواب دادن به نظر</h6></a>
                                                 </MDBCol>
                                             </MDBRow>

                                             <MDBRow className={comment.id === this.state.answerCommentId ? "fv-ProfilePageWalletWalletButton" : "fv-hideAnswerComments" } >
                                                 <MDBRow className={"fv-ProfilePageGustComments2SetComment"}>
                                                     <form onSubmit={(event)=>{
                                                         this.setState({clickAnswerLoader:true})
                                                         event.preventDefault()
                                                         const data = {
                                                                 text:this.state.textAreaComment
                                                             }
                                                         replayComment(data,this.state.villasUsertitle,this.state.answerCommentId)
                                                             .then(res=>{
                                                                 if(res.status===200){
                                                                     getUserVillaComments(this.props.match.params.id)
                                                                         .then(res=>{
                                                                             if(res.data.data && res.data.data !== "Something went wrong!")
                                                                                 this.setState({comments: Object.values(res.data.data) , clickAnswerLoader:false})
                                                                             console.log(res.data.data)
                                                                         })
                                                                 }
                                                             } )
                                                             .then(err=>this.setState({clickAnswerLoader:false}))

                                                     }}>
                                                         <label>
                                                             <textarea value={this.state.textAreaComment} onChange={(e)=>this.setState({textAreaComment:e.target.value})} />
                                                         </label>
                                                         {waitingForCalculate2(this.state.clickAnswerLoader , "fv-waitingLoadPublicFullScreen fv-computingReservedDetails fv-ProfileCalendarWaiting")}
                                                         <MDBRow className={this.state.clickAnswerLoader?"fv-hideForWaiting" :"fv-ProfilePageWalletWalletButton"}>
                                                             <MDBCol md={3} sm={12} className={this.state.clickAnswerLoader?"fv-hideForWaiting" :"fv-ProfilePageUserSetInfoButton fv-ProfilePageWalletWalletButtonWith"}>
                                                                 <input type="submit" value="ذخیره پیام"/>
                                                             </MDBCol>
                                                         </MDBRow>
                                                     </form>
                                                 </MDBRow>
                                             </MDBRow>
                                        </MDBContainer>

                            }

                        })}
                        </div>
                        <div  className={this.state.clickHandlerLoading ?  ""  : "fv-commentsLoaderHide"}>
                                <MDBRow className={"fv-loaderComments"}>
                                    <div className={ "cssload-wave" }>
                                        <span></span><span></span><span></span><span></span><span></span>
                                    </div>
                                </MDBRow>
                        </div>

                    </MDBCol>

                </div>



            </div>
        )}
}
export default PrfilePageGustComments2