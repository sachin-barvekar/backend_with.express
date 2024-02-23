//import model
const Post = require('../models/postModel');

//business logic
exports.createPost= async (req, res)=>{
    try{
        //fetch data from req body
        const {title, body} = req.body;
        const post = new Post({
            title, body
        })
        const savePost = await post.save();
        
        res.json({
            post:savePost,
        });
    }
    catch(error){
        return res.status(400).json({ //400=> Bad req 
                error: "Error while creating post"
        })
    }
}

exports.getAllPosts= async (req, res)=>{
    try{
        //fetch data from req body
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        });
    }
    catch(error){
        return res.status(400).json({ //400=> Bad req 
                error: "Error while fetching posts"
        })
    }
}