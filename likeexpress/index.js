
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const  {Registerhandler,loginhandler}= require("./Controllers/UserController")
const {CreatePost,addlike,addcomment,adddislike} = require("./Controllers/PostController");
const {getPost ,getComment,getPostbyId}= require("./Controllers/GetPostController")
const {deletePosthandler,EditPost} = require("./Controllers/ModifypostController");
const cors = require("cors");


const url = "mongodb://localhost:27017/likewala";

if (mongoose.connect(url)) {
    console.log(`Database connected on ${url}`);
} else {
    console.log(`Error connecting ${url}`);
}


const app = express();

const Port = 4000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.post("/user/register", Registerhandler);
 app.post("/user/login", loginhandler);
 app.post("/post/create", CreatePost);
 app.post("/post/comment",addcomment);
 app.post("/post/addlike",addlike);
 app.post("/post/adddislike",adddislike);
 app.post("/post/delete",deletePosthandler);
 app.post("/post/Edit",EditPost);


 app.get('/post/getpost', getPost);
 app.get('/post/getcomment', getComment);
 app.get('/post/getpostbyid', getPostbyId);

app.listen(Port, console.log(`server conected on localhost : ${Port} `));