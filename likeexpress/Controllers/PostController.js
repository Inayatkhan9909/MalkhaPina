

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
        const { postId, token } = req.body;

        const decoded = await jwt.verify(token, "secretkey");
        const userId = decoded.userId;

        const isValidObjectId = await new mongoose.Types.ObjectId(postId);

        const post = await Post.findById({ _id: isValidObjectId });

        if (userId) {


            const alreadydisLiked = await post.dislikeby.includes(userId);

            if (alreadydisLiked) {

                const index = await post.dislikeby.indexOf(userId);

                // If the user ID is found, remove it
                if (index !== -1) {
                    await post.dislikeby.splice(index, 1);
                    await post.save();
                }


            }

            const alreadyLiked = await post.likeby.includes(userId);

            if (!alreadyLiked) {
                await post.likeby.push(userId);
                const liked = await post.save();
                if (liked) {

                    res.json({ message: "like done" })
                }
                else {
                    res.json({ message: "like failed" });
                }

            }
            else {
                const index = await post.likeby.indexOf(userId);

                // If the user ID is found, remove it
                if (index !== -1) {
                    await post.likeby.splice(index, 1);
                    await post.save();
                    res.json({ message: "like removed" });
                }
                else {
                    res.json({ message: "like remove failed" });
                }

            }


        }
        else {
            res.json({ message: "login first" });
        }


    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }

}


const adddislike = async (req, res) => {

    try {
        const { postId, token } = req.body;
        if (token) {


            const decoded = await jwt.verify(token, "secretkey");
            const userId = decoded.userId;


            const post = await Post.findById(postId);



            const alreadyLiked = await post.likeby.includes(userId);
            if (alreadyLiked) {
                const index = await post.likeby.indexOf(userId);

                // If the user ID is found, remove it
                if (index !== -1) {
                    await post.likeby.splice(index, 1);
                    await post.save();
                   
                }

            }
            const alreadydisLiked = await post.dislikeby.includes(userId);

            if (!alreadydisLiked) {

                await post.dislikeby.push(userId);
                const disliked = await post.save();
                if (disliked) {

                    res.json({ message: "you disliked a post" });
                }
                else {
                    res.json("dislike failed");
                }
            }
            else {
                const index = await post.dislikeby.indexOf(userId);

                // If the user ID is found, remove it
                if (index !== -1) {
                    await post.dislikeby.splice(index, 1);
                    await post.save();
                    res.json({ message: "disliked removed" });
                }
            }
        }
        else {
            res.json({ message: "login first" });
        }

    }
    catch (error) {
        console.log(error);
        res.json({ message: "something went wrong" });
    }

}




const addcomment = async (req, res) => {

    try {
        const { postId, userId, username } = req.body;

        const post = await Post.findById(postId);
        const content = req.body.content

        if (content !== "" && username !== "") {
            const newcomment = {
                content: content,
                user: userId,
                username: username
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
            res.json({ message: "Can't post empty comment" });
        }



    }
    catch (error) {
        console.error(error);
        res.json({ message: "Something went wrong" });

    }
}

module.exports = { CreatePost, addlike, addcomment, adddislike }