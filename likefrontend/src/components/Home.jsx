import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import '../styles/Home.css'
import commenticon from "../assets/comment.png"
import Comment from './Comment';
import { AiOutlineLike, AiFillLike, AiFillDislike, AiOutlineDislike } from "react-icons/ai";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import { jwtDecode } from 'jwt-decode';
import Modifypost from './Modifypost';



const Home = () => {

    const [postData, setpostData] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [dislikedPosts, setdisLikedPosts] = useState([]);
    const [isLikeProcessing, setIsLikeProcessing] = useState(false);


    const fetechPosts = useCallback(async () => {
        try {


            const response = await axios.get("http://localhost:4000/post/getPost");

            const data = response.data;
            setpostData(data);
            const token = localStorage.getItem('token');

            const decodedToken = jwtDecode(token);

            const userId = decodedToken.userId;


            const initialLikedStatus = await Promise.all(data.map(async (post) => {
                const alreadyLiked = post.likeby.includes(userId);
                return alreadyLiked;
            }));
            setLikedPosts(initialLikedStatus);
            const initialdisLikedStatus = await Promise.all(data.map(async (post) => {
                const alreadydisLiked = post.dislikeby.includes(userId);
                return alreadydisLiked;
            }));
            setdisLikedPosts(initialdisLikedStatus);

        }
        catch (error) {
            console.log(error);

        }
    }, [])



    function timeAgo(timestamp) {
        const currentTime = new Date();
        const postTime = new Date(timestamp);
        const elapsedMilliseconds = currentTime - postTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const elapsedDays = Math.floor(elapsedHours / 24);
        const elapsedWeeks = Math.floor(elapsedDays / 7);
        const elapsedMonths = Math.floor(elapsedDays / 30);

        if (elapsedSeconds < 60) {
            return 'just now';
        } else if (elapsedMinutes < 60) {
            return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
        } else if (elapsedHours < 24) {
            return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
        } else if (elapsedDays === 1) {
            return 'yesterday';
        } else if (elapsedDays < 7) {
            return `${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`;
        } else if (elapsedWeeks === 1) {
            return '1 week ago';
        } else if (elapsedWeeks < 4) {
            return `${elapsedWeeks} weeks ago`;
        } else if (elapsedMonths === 1) {
            return '1 month ago';
        } else if (elapsedMonths < 12) {
            return `${elapsedMonths} months ago`;
        } else {
            return postTime.toLocaleD
        }
    }


    const [showCommentIndex, setShowCommentIndex] = useState(null);

    const commentHandler = (index) => {
        setShowCommentIndex(prevIndex => prevIndex === index ? null : index);
    };

   
          const [changeDislike,setchangeDislike] = useState(false)


          
    const disLikehandle = async (postId, index) => {

        const token = localStorage.getItem('token');
        const likedata = {
            postId: postId,
            token: token
        };

        // Add Like
     const done =   await axios.post('http://localhost:4000/post/adddislike', likedata);
          if(done)
          {
            setchangeDislike(!changeDislike)
          }
        setdisLikedPosts(prevdisLikedPosts => {
            const newdisLikedPosts = [...prevdisLikedPosts];
            newdisLikedPosts[index] = !newdisLikedPosts[index];
            return newdisLikedPosts;
        });

    }
    const [changeLikedata,setchangeLikedata,] = useState(false);

    const Likehandle = async (postId, index) => {
        try {
            setIsLikeProcessing(true);

            const token = localStorage.getItem('token');
            const likedata = {
                postId: postId,
                token: token
            };

            // Add Like
          const done =  await axios.post('http://localhost:4000/post/addlike', likedata);
          if(done)
          {
            setchangeLikedata(!changeLikedata)
          }
          else
          {
            setchangeLikedata(changeLikedata)
          }
          
            // Get likes with wiht respect to index
            setLikedPosts(prevLikedPosts => {
                const newLikedPosts = [...prevLikedPosts];
                newLikedPosts[index] = !newLikedPosts[index];
                return newLikedPosts;
            });

        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
        finally {
            setIsLikeProcessing(false); // Reset like processing
        }
    };

    const [showModifyIndex, setshowModifyIndex] = useState(false)
    const handleModify = (index) => {

        setshowModifyIndex(prevIndex => prevIndex === index ? null : index);

    }
    useEffect(() => {
        fetechPosts(); 
    },[changeLikedata,changeDislike]);

    return (
        <div>

            <div className='news_overall'>
                {
                    postData.map((post, index) => (
                        <div className="card" key={index}>
                            <div className="modifypost">
                                <button onClick={() => handleModify(index)}><PiDotsThreeOutlineFill size={20} /></button>
                                {showModifyIndex === index ? <Modifypost postId={post._id} /> : null}
                            </div>

                            <div className="details">
                                <h2 className="title">{post.title}</h2>
                                <p className="author">Author: {post.author}</p>
                                <p>Posted: {timeAgo(post.createdAt)}</p>
                                <p className="description">{post.description}</p>
                            </div>


                            <div className="reactioncount">
                                <p className="author">{post.likeby.length} likes</p>
                                <p className="author">{post.dislikeby.length} dislikes</p>

                                <p className="author">{post.comments.length} comments</p>
                            </div>

                            <div className="reaction">


                                <div className="like" onClick={() => Likehandle(post._id, index)} disabled={isLikeProcessing}>

                                    {likedPosts[index] ? <AiFillLike style={{ fill: 'blue' }} size={30} /> : <AiOutlineLike size={30} />}
                                </div>
                                <div className="dislike" onClick={() => disLikehandle(post._id, index)}>

                                    {dislikedPosts[index] ? <AiFillDislike style={{ fill: 'blue' }} size={30} /> : <AiOutlineDislike size={30} />}
                                </div>

                                {/* Comment Portion */}

                                <div className="comment">
                                    <button onClick={() => commentHandler(index)}>
                                        <img src={commenticon} width={30} alt="comment" />
                                    </button>
                                    {showCommentIndex === index && <Comment showCommentIndex={showCommentIndex} setShowCommentIndex={setShowCommentIndex}
                                        postId={post._id} userId={post.user} username={post.author} className="comment_container" />}

                                    <div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))


                }

            </div>

        </div>
    )
}

export default Home