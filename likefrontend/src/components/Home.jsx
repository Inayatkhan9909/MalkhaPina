import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import commenticon from "../assets/comment.png"
import Comment from './Comment';
import { AiOutlineLike } from "react-icons/ai";



const Home = () => {

    const [postData, setpostData] = useState([]);



    const fetechPosts = async () => {
        try {

            const response = await axios.get("http://localhost:4000/post/getPost");

            const data = response.data;
            setpostData(data);
        }
        catch (error) {
            console.log(error);

        }
    }



    function timeAgo(timestamp) {
        const currentTime = new Date();
        const postTime = new Date(timestamp);
        const elapsedMilliseconds = currentTime - postTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const elapsedDays = Math.floor(elapsedHours / 24);

        if (elapsedSeconds < 60) {
            return 'just now';
        } else if (elapsedMinutes < 60) {
            return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
        } else if (elapsedHours < 24) {
            return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
        } else if (elapsedDays === 1) {
            return 'yesterday';
        } else {
            return postTime.toLocaleDateString();
        }
    }


    const [showCommentIndex, setShowCommentIndex] = useState(null);

    const commentHandler = (index) => {
        setShowCommentIndex(prevIndex => prevIndex === index ? null : index);
    };

    useEffect(() => {
        fetechPosts();
    }, [])

    const [liked, setLiked] = useState(false);

    const handleLike = async (postId, userId) => {
        try {

            const likedata = {
                postId: postId,
                userId: userId
            };

            await axios.post(`http://localhost:4000/post/addlike`, likedata);


            const response = await axios.get('http://localhost:4000/post/getlikes', {
                params: {
                    postId: postId,
                    userId: userId

                }
            });


            const likedId = response.data;
            console.log(likedId + "  " + typeof (liked));
            if (likedId) {
                setLiked(!liked);
                console.log("!liked");
            }
            else {
                setLiked(liked);
                console.log("liked");
            }


        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };


    return (
        <div>

            <div className='news_overall'>
                {
                    postData.map((post, index) => (
                        <div className="card" key={index}>

                            <div className="details">
                                <h2 className="title">{post.title}</h2>
                                <p className="author">Author: {post.author}</p>
                                <p>Posted: {timeAgo(post.createdAt)}</p>
                                <p className="description">{post.description}</p>
                            </div>

                            <div className="reactioncount">
                                <p className="author">{post.likeby.length} likes</p>
                                <p className="author">{post.comments.length} comments</p>
                            </div>

                            <div className="reaction">


                                <div className="like"
                                    style={{ color: liked ? 'blue' : 'black', cursor: 'pointer' }}
                                    onClick={() => handleLike(post._id, post.user)}
                                >
                                    <AiOutlineLike size={24} />

                                </div>

                                <div className="comment">
                                    <button onClick={() => commentHandler(index)}>
                                        <img src={commenticon} width={30} alt="comment" />
                                    </button>
                                    {showCommentIndex === index && <Comment showCommentIndex={showCommentIndex} setShowCommentIndex={setShowCommentIndex} postId={post._id} userId={post.user} username={post.author} className="comment_container" />}

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