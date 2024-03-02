
const mongoose = require("mongoose");
const User = require("./UserModel");

const postSchema = new mongoose.Schema({

    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 },
    likeby: [{ type: mongoose.Schema.Types.ObjectId }, 'User'],
    commentcount: { type: Number, default: 0 },
    comments: [{
        content: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username:{type:String,required:true},
        createdAt: { type: Date, default: Date.now }

    }]

})

module.exports = mongoose.model('Post', postSchema);