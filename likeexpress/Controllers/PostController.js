

const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const CreatePost = async (req, res) => {

    try {
        const token = req.body.token;
        const decodedToken = jwt.verify(token, 'secretkey');
        const userId = decodedToken.userId;

        const username = decodedToken.username;

        const { title, description } = req.body;

        if (title !== "" && description !== "") {

            const newPost = new Post({ title, author: username, description, user: userId });


            await newPost.save();

            if (newPost) {
                const postId = newPost._id;


                await User.findByIdAndUpdate(userId, { $push: { posts: postId } });

                const populated = await Post.findById(postId).populate('user').exec();
                if (populated) {
                    res.status(201).json({ message: "Post Uploaded", postId });
                }
                else {
                    res.status(201).json({ message: "not populated", postId });
                }

            }
            else {
                res.json({ message: "Post failed please try again" });
            }
        }
        else {
            res.json({ message: "All fields required" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Something went wrong" })
    }
}



const addlike = async (req, res) => {

    try {
        const { postId, userId } = req.body;

        const post = await Post.findById({ postId });
        if (!post.likeby.includes(userId)) {
            post.likeby.push(userId);
            const liked = post.save();
            if (liked) {
                post.likes++;
                res.json({ message: "you liked a post" });
            }
            else {
                res.json("like failed");
            }


        }
        else {
            res.json("userid not found");
        }

    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }

}

const addcomment = async (req, res) => {

    try {
        const  {postId ,userId,username} = req.body;
       

        const post = await Post.findById(postId);
        const content = req.body.content

        if (content !== "" && username !=="") {
            const newcomment = {
                content: content,
                user: userId,
                username:username
            };
                post.comments.push(newcomment);
            const com = await post.save();
            if (com) {
                res.json({ message: "comment added" });
            }
            else {
                res.json({ message: "comment failed" });
            }

        }
        else {
            res.json({message:"Can't post empty comment"});
        }



    }
    catch (error) {
        console.error(error);
        res.json({ message: "Something went wrong" });

    }
}

module.exports = { CreatePost, addlike, addcomment }