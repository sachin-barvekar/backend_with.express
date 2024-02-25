//import model
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

//business logic
exports.createComment = async (req, res)=>{
    try{
        //fetch data from req body
        const {post, user, body}= req.body;
        //create comment object
        const comment = new Comment({ //Comment model
            post, user, body
        })
        //save the new comment into DB
        const saveComment = await comment.save();

        //find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: saveComment._id}},{new:true})//new: true=>returns new updated obj
                            .populate("comments") //popultate the comments array with comment documents
                            .exec();
        res.status(200).json({
            post: updatedPost
        });
    }
    catch(error)
    {
        return res.status(500).json({
            error: "Error while Creating Comment"
        })
    }
}