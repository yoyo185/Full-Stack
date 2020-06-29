import React, { Component } from 'react';
import {singlePost} from './apiPost';

export default class componentName extends Component {
    constructor(){
        super()
        this.state = {
            id:'',
            title:'',
            body:'',
            redirectToProfile:false,
            error:''
        }
    }

    init = postId => {
        singlePost(postId).then(data =>{
            if(data.error){
                console.log("ERROR")
                this.setState({redirectToProfile:true});
            }else{
                // console.log(data);
                this.setState({
                    id:data._id,
                    title:data.title,
                    body:data.body,
                    error:""
                });
            }
        });
    };

    componentDidMount(){
        // console.log("user id from route params", this.props.match.params.userId);
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        // console.log(`${process.env.REACT_APP_API_URL}/user/${userId}`);
        this.init(postId);
    }

    render() {
        return (
            <div>
                <h2>Edit Post</h2>
                {JSON.stringify(this.state)}
            </div>
        )
    }
}
