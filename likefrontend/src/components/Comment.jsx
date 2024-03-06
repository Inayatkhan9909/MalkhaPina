import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IsAuthenticated from '../authorization/tokenauth';
import { RxCross2 } from "react-icons/rx";
import { IoSendOutline } from "react-icons/io5";

import "../styles/Comment.css";



const Comment = ({ postId, username, userId, setShowCommentIndex }) => {
    IsAuthenticated();



    const [showComment, setShowComment] = useState([]);
    const [newComment, addnewComment] = useState({
        content: "",
        user: userId,
        postId: postId,
        username: username
    });



    const fetchComments = async () => {
        try {

            const response = await axios.get("http://localhost:4000/post/getcomment", {
                params: {
                    postId: postId,

                }
            });

            setShowComment(response.data);

        }
        catch (error) {
            console.error(error);
            toast.error("somethingwent wrong");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        addnewComment({ ...newComment, [name]: value });
    };

    const submitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/post/comment", newComment);
            if (response.data.message === "comment added") {

            }
            else {
                toast.error(response.data.message);
            }

        }
        catch (error) {
            console.error(error);
            toast.error("somethingwent wrong");
        }
    }





    const toggleComment = () => {
        setShowCommentIndex(null)
    };


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

    useEffect(() => {
        fetchComments();
    }, [showComment]);


    return (
        <div className='comment_container'>


            {/* Get comments */}
            <div className="showComments">
                <div className="back">
                    <button onClick={toggleComment}><RxCross2 size={28} /></button>
                </div>

                <div className="overall_onecomment">

                    {

                        showComment.map((comment) => (
                            <div className="commentContent" key={comment._id}>
                                <div className="Onecomment">
                                    <div className="comentTitle">
                                        <span><strong>{comment.username}</strong></span>
                                        <span>{timeAgo(comment.createdAt)}</span>
                                    </div>

                                    <div className="commetContent">

                                        <p>{comment.content}</p>
                                    </div>
                                </div>

                            </div>
                        ))

                    }
                </div>
            </div>



            {/* Post a new Comment */}
            <div className="formContainer">
                <div className="line"></div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />


                <div className="form">
                    <form onSubmit={submitComment}>



                        <input
                            type='text'
                            name='content'
                            value={newComment.content}
                            onChange={handleChange}
                            placeholder='comment'
                        />


                        <button className='btn2' type='submit'><IoSendOutline /></button>

                    </form>
                </div>

            </div>



        </div>
    )
}

export default Comment