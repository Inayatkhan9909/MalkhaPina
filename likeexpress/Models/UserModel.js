const mongoose = require("mongoose");
const Post = require("./PostModel")

const userSchema = new mongoose.Schema( {


    username: { type: String, unique: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] 

})




module.exports = mongoose.model('User', userSchema);