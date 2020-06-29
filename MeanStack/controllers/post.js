const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate('postedBy', '_id name')
        // .populate('comments.postedBy', '_id name')
        // .populate('postedBy', '_id name role')
        // .select('_id title body created likes comments photo')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            // console.log(post);
            req.post = post;
            next();
        });
};

exports.getPosts = (req,res)=>{
    const posts = Post.find()
        .populate("postedBy","_id name")
        .select("_id title body created")
        .sort({created:-1})
        .then(posts=>{
            // res.json({posts});
            res.json(posts);
        })
        .catch(err=>console.log(err));
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.postsByUser = (req,res)=>{
    Post.find({postedBy:req.profile._id})
        .populate("postedBy","_id name")
        .select("_id title body created")
        .sort("_created")
        .exec((err,posts)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            res.json(posts);
        });
};

exports.isPoster = (req,res,next)=>{
    let sameUser = req.post && req.auth && req.postedBy._id==req.auth._id;
    let adminUser = req.post && req.auth && req.auth.role==='admin';
    console.log("req.post ", req.post, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);
    let isPoster = sameUser || adminUser;
    
    if (!isPoster){
        return res.status(403).json({
            error:"User is not authorized"
        });
    }
    next();
};

exports.updatePost=(req,res,next)=>{
    let form = new formidable.IncomingForm;
    form.keepExtensions=true;
    form.parse(req,(res,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Photo could not be uploaded"
            })
        }
        let post=new Post(fields);
        post = _.extend(post,fields);
        post.updated = Date.now();
        // req.profile.hashed_password=undefined;
        // req.profile.salt=undefined;
        // post.postedBy=req.profile;

        if (files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            // res.json(result);
            res.json(post);
        });
    });
}

exports.deletePost = (req,res)=>{
    let post = req.post;
    console.log("111");
    post.remove((err,post)=>{
        console.log("first");
        if (err){
            console.log("second");
            return res.status(400).json({
                error:err
            })
        }
        console.log("3");
        res.json({
            message:'Post deleted successfully'
        });
    });
};

exports.photo = (req,res)=>{
    res.set('Content-Type',req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

exports.singlePost = (req,res)=>{
    return res.json(req.post);
};