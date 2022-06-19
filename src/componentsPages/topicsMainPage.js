import React from "react";
import {MDBCol, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";

class topicsMainPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
                <React.Fragment>

                    <MDBCol md={1} sm={1} >
                       <a><Link to={this.props.linkToPage}><i className="fas fa-angle-left"/></Link> </a>
                    </MDBCol>
                    <MDBCol md={7}  sm={3} className={"fv-topicMainPageSeeAll"}>
                        <h8><Link to={this.props.linkToPage}>مشاهده همه</Link></h8>
                    </MDBCol>
                    <MDBCol md={4} sm={9} className={"fv-topicMainPageTopic"}>
                        <h5>{this.props.topic}</h5>
                    </MDBCol>

                </React.Fragment>
        )
    }
}
export default topicsMainPage;