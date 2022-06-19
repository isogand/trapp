import React from "react";
import ReactDOM from "react-dom";
import GetApi from "./GetApi";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";


class Api extends React.Component{
    render() {
        return(

            <Router>
                <Auth0ProviderWithHistory>
                    <GetApi />
                </Auth0ProviderWithHistory>
            </Router>

        )
    }
}
export default Api