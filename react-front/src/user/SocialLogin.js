import React, { Component } from 'react';
import GoogleLogin from "react-google-login";

export default class SocialLogin extends Component {
    responseGoogle=response=>{
        console.log(response);
    };

    render() {
        return (
            <div className="container">
                <GoogleLogin
                    clientId="269380407525-2cvoah9gpsjjffc5k1p6jkdjfd2vqfl4.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        );
    }
}
