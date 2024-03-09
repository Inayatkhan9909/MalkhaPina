const Post = require("../Models/PostModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getPost = async (req, res) => {

    try {

        const posts = await Post.find()
        if (posts) {
            res.json(posts);
        }
        else {
            res.json({ message: "nothing to show" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }
}


const getPostbyId = async (req, res) => {

    try {

        const { postId, token } = req.query;
        if (token !== null) {

         
            const post = await Post.findById(postId)
            if (post) {
                const decoded = jwt.verify(token, "secretkey");
                const userId = decoded.userId;

                if (userId) {
                    if (post.user.toString() === userId) {

                        console.log(userId)
                        console.log(typeof (userId))
                        res.json({ message: "post found", post })
                    }
                    else {
                        res.json({ message: "post not found" })
                    }
                }
                else {
                    res.json({ message: "Invalid user login first" })
                }

            }
            else {

                res.json({ message: "post not found" })
            }

        }
        else {
            res.json({ message: "login first" })
        }


    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }
}

const getComment = async (req, res) => {

    try {

        const { postId } = req.query;
        const postIdObject = new mongoose.Types.ObjectId(postId);
        const post = await Post.findById({ _id: postIdObject });
        const comments = post.comments
        if (comments) {
            res.json(comments)
        }
        else {
            res.json({ message: "no comment avalible" })
        }

    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }
}

// const getlikes = async (req, res) => {

//     try {


//         const { postId, token } = req.query;

//         const decoded = jwt.verify(token, "secretkey");
//         const userId = decoded.userId;

//         // console.log("postId is  " + postId)
//         const ispost = await Post.findById(postId);

//         // console.log("userId is  " + userId)
//         // console.log("ispost is " + ispost)
//         const alreadyLiked = await ispost.likeby.includes(userId);

//         if (alreadyLiked) {
//             res.json(alreadyLiked);

//             // const index = ispost.likeby.indexOf(userId);

//             // if (index !== -1) {

//             //     console.log(index)
//             //     res.json({ index });
//             // } else {
//             //     res.json({ message: "User ID not found in the likeby array" });
//             // }
//         }
//         else {
//             res.json({ message: "no like avalible" });
//         }

//     }
//     catch (error) {
//         console.log(error);
//         res.json({ message: "something went wrong" });
//     }
// }

module.exports = { getPost, getComment, getPostbyId }