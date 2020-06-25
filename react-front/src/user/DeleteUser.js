import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { isAuthenticated } from '../auth';
import { remove } from './apiUser';
import { signout } from "../auth";

export default class DeleteUser extends Component {
    state = {
        redirect:false
    };
    deleteAccount=()=>{
        // console.log("delete account");
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                //signout
                signout(()=>console.log("User is deleted"));
                //redirect
                this.setState({redirect:true});
            }
        })
    };
    deleteConfirmed = ()=>{
        let answer = window.confirm("Are you sure you want to delete your account?")
        if (answer){
            this.deleteAccount()
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                Delete Profile
            </button>
        );
    }
}
