
const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

const deletePosthandler = async (req, res) => {
    try {
           
        const { postId, token } = req.body;
            
            
           if(token)
           {
            const decodedToken = await jwt.verify(token, 'secretkey');
            const userId = decodedToken.userId;
            const post = await Post.findById(postId);
    
            
            if (post ) {
                
    
            if(userId)
            {
                if (post.user.toString() === userId) {
                    const deletePost = await Post.findByIdAndDelete(postId);
                    if (deletePost) {
                        res.json({ message: "post deleted succesfully" })
                    }
                    else {
                        res.json({ message: "post cant be deleted" })
                    }
                }
                else{
                    res.json({ message: "match failed" })
                }
            }
            else{
                res.json({ message: "login first" })
            }
    
            }
            else {
                res.json({ message: "post not avaliable" })
            }
           }
           else{
            res.json({ message: "login first" })
           }

    }
    catch (error) {
        console.log(error)
    }
}


const EditPost = async (req,res) =>{
    try {
        const {postId,token,title,description} = req.body;

        if(token)
        {
         const decodedToken = await jwt.verify(token, 'secretkey');
         const userId = decodedToken.userId;
         const post = await Post.findById(postId)
            if(post)
            {

                if(post.user.toString() == userId)
                {
                        
                    const updatedPost = await Post.findByIdAndUpdate(
                        postId,
                        { title, description },
                        { new: true } // To return the updated post after the update operation
                    );
                    res.json({ message: 'Post updated successfully',});
                    
                }
                else{
                    res.json({message:"not authorized to edit"});
                }

            }
            else{
                res.json({message:"post not found"});
            }
        }
        else{
            res.json({message:"login first"});
        }

           
        
    } 
    catch (error) {
        
    }
}

module.exports = { deletePosthandler ,EditPost}