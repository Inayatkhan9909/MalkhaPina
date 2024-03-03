const Post = require("../Models/PostModel");
const mongoose = require("mongoose");

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

const getlikes = async (req, res) => {

    try {

        const { postId } = req.query;

        const postIdObject = new mongoose.Types.ObjectId(postId);
        const post = await Post.findById({ _id: postIdObject });
        const liker = post.likeby;

        const objectIdString = liker.toString();
        if (objectIdString) {

            res.json(objectIdString)
        }
        else {
            res.json({ message: "no like avalible" })
        }



    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }
}

module.exports = { getPost, getComment, getlikes }