
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const  {Registerhandler,loginhandler}= require("./Controllers/UserController")
const {CreatePost,addlike,addcomment} = require("./Controllers/PostController");
const {getPost ,getComment}= require("./Controllers/GetPostController")
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


app.get("/home", (req, res) => {
    res.send("helloworld");
});


app.post("/user/register", Registerhandler);
 app.post("/user/login", loginhandler);
 app.post("/post/create", CreatePost);
 app.post("/post/comment",addcomment)



 app.get('/post/getpost', getPost);
 app.get('/post/getcomment', getComment);

app.listen(Port, console.log(`server conected on localhost : ${Port} `));