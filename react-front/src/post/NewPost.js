import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { create } from "./apiPost";
import { Redirect } from 'react-router-dom';
import DefaultProfile from "../images/sample.jpg";


export default class NewPost extends Component {

    constructor(){
        super()
        this.state={
            title:'',
            body:'',
            photo:'',
            error:'',
            user:{},
            fileSize:0,
            loading:false
        };
    }


    componentDidMount(){
        // console.log("user id from route params", this.props.match.params.userId);
        this.postData = new FormData();
        this.setState({
            user:isAuthenticated().user
        })
    }

    isValid=()=>{
        const { title, body, fileSize}=this.state;
        if (fileSize>100000){
            this.setState({error:"File size should be less than 1MB"});
            return false;
        }
        if (title.length===0 || body.length===0){
            this.setState({error:"All fields are require",loading:false});
            return false;
        }
        return true;
    };

    handleChange = (name) => (event) =>{
        this.setState({error:""});
        const value = name ==='photo' ? event.target.files[0] : event.target.value;
        const fileSize = name ==='photo' ? event.target.files[0].size : 0; 
        this.postData.set(name,value)
        this.setState({[name]:value,fileSize});
    };
    
    clickSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true})
        if(this.isValid()){

            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData)
            .then(data=>{
                if (data.error) this.setState({error:data.error});
                else 
                    console.log("New Post: ",data);
                    // this.setState({
                    //     loading:false,
                    //     title:"",
                    //     body:"",
                    //     photo:""
                    // })
            });
        }
    };

    newPostForm = (title,body)=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input 
                    onChange={this.handleChange("photo")} 
                    type="file"
                    accept ="image/*"
                    className="form-control"

                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input 
                    onChange={this.handleChange("title")} 
                    type="text" 
                    className="form-control"
                    value={title}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea 
                    onChange={this.handleChange("body")} 
                    type="text" 
                    className="form-control"
                    value={body}
                />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Create Post
            </button> 
        </form>
     );

    render() {
        const { title, body, photo,user,error,loading}=this.state;

        // if (redirectToProfile){
        //     return <Redirect to={`/user/${id}`}/>;
        // }

        // const photoUrl = id 
        //     ? `${
        //         process.env.REACT_APP_API_URL
        //         }/user/photo/${id}?${new Date().getTime()}`
        //     : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div className="alert alert-danger" style={{display: error? "":"none"}}>
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ):(
                    ""
                )}

                {/* <img 
                    style={{height:"200px",width:'auto'}} 
                    className = "img-thumbnail"
                    src={photoUrl} 
                    onError={i=>(i.target.src=`${DefaultProfile}`)}
                    alt={name}
                /> */}

                {this.newPostForm(title,body)}
            </div>
        );
    }
}
