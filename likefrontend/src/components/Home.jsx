import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import likeicon from "../assets/like.png"
import likedicon from "../assets/liked.png"
import commenticon from "../assets/comment.png"
import Comment from './Comment';



const Home = () => {

    const [postData, setpostData] = useState([]);
    
    const fetechPosts = async () => {
        try {

            const response = await axios.get("http://localhost:4000/post/getPost")
            const data = await response.data;
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
                                <p className="author">{post.likes} likes</p>
                                <p className="author">{post.comments.length} comments</p>
                            </div>

                            <div className="reaction">

                                <div className="like">
                                    <img src={likeicon} width={25} alt="no" />
                                </div>

                                <div className="comment">
                                    <button onClick={() => commentHandler(index)}>
                                        <img src={commenticon} width={30} alt="comment" />
                                    </button>
                                    {showCommentIndex === index && <Comment postId={post._id} userId={post.user}   username={post.author} className="comment_container" />}
                                   
                                     
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