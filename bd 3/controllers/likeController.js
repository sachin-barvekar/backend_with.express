//import model
const Like = require('../models/likeModel');
const Post = require('../models/postModel');

//business logic
exports.likePost= async (req, res)=>{
    try{
        //fetch data from req body
        const {post, user} = req.body;
        const like = new Like({
            post, user
        })
        const saveLike = await like.save();

        //update post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: saveLike._id}},{new:true}).populate("likes").exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(error){
        return res.status(400).json({ //400=> Bad req 
                error: "Error while like post"
        })
    }
}

exports.unlikePost= async (req, res)=>{
    try{
        //fetch data from req body
        const {post , like} = req.body;
        //find and delete the like from like collection
       // const deletedLike = await Like.findByIdAndDelete(like);
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
        //update post collection
;        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}},{new:true}).populate("likes").exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(error){
        return res.status(400).json({ //400=> Bad req 
                error: "Error while unlike post"
        })
    }
}