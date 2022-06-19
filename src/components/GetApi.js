// src/views/external-api.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

class ExternalApi extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            setMessage:"",
            title:"",
            PostData:"2"
        }
    }
    render() {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        const { getAccessTokenSilently } = useAuth0;
        const callApi = async () => {
            try {
                const response = await fetch('https://reqres.in/api/get/1')
                    .then(response => response.json())
                    .then(json => this.setState({title:json.support.text}))
                console.log(this.state.title)


                const responseData = await response.json();

                this.setState({setMessage:responseData.message});
            } catch (error) {
                this.setState({setMessage:error.message});
            }
        };

        const callSecureApi = async () => {
            try {
                const token = await getAccessTokenSilently();

                const response = await fetch(
                    `${serverUrl}/api/messages/protected-message`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseData = await response.json();
                this.setState({setMessage:responseData.message});
            } catch (error) {
                this.setState({setMessage:error.message});
            }
        };

        const PostApi= async () => {
            // Simple POST request with a JSON body using fetch
            const PostData = this.state.PostData
            fetch('https://reqres.in/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({PostData})
            })
                .then(response => response.json())
                .then(data =>{
                    if(data){
                        console.log(data)
                        this.setState({PostData:"Successful" })
                    } else this.setState({PostData:"UnSuccessful"})
                }) ;
        }


        return(
            <div className="container">
                <h1>External API</h1>
                <p>
                    Use these buttons to call an external API. The protected API call has an
                    access token in its authorization header. The API server will validate
                    the access token using the Auth0 Audience value.
                </p>
                <div
                    className="btn-group mt-5"
                    role="group"
                    aria-label="External API Requests Examples"
                >
                    <button type="button" className="btn btn-primary" onClick={callApi}>
                        Get Public Message
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={callSecureApi}
                    >
                        Get Protected Message
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={PostApi}
                    >
                        Get Protected Message
                    </button>
                </div>
                {this.state.setMessage && (
                    <div className="mt-5">
                        <h6 className="muted">Result</h6>
                        <div className="container-fluid">
                            <div className="row">
                                <code className="col-12 text-light bg-dark p-4">{this.state.setMessage}{this.state.PostData}</code>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

}


export default ExternalApi;