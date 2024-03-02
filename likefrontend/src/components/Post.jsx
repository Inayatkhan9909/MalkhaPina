import React, { useEffect, useState } from 'react'
import IsAuthenticated from '../authorization/tokenauth'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Form.css'

const Post = () => {
    IsAuthenticated();

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        title: "",
        author: "",
        description: ""
    });
    const [token, settoken] = useState("");
    // useEffect(() => {

    //     const storedUserId = localStorage.getItem('userId');
    //     if (storedUserId) {

    //         setUserId(storedUserId);
    //     }
    // }, []);
    useEffect(() => {

        const storedtoken = localStorage.getItem('token');
        if (storedtoken) {

            settoken(storedtoken);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/post/create', {
                title: formData.title,
             
                description: formData.description,
                token: token
            });

            if (response.data.message === "Post Uploaded") {
                toast.success(response.data.message);
                navigate('/');
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }


    return (
        <div className='container'>
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

            <div className="heading">
                <h1>Post </h1>
            </div>

            <div className="formcontainer">
                <form onSubmit={handleSubmit}>

                    <label>
                        Title:  </label>
                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Title'
                    />


                    <label>
                        Description :  </label>
                    <textarea placeholder='share your thoughts'
                        name='description'
                        value={formData.description}
                        onChange={handleChange} rows="10"  >

                    </textarea>

                    <div >
                        <button className="btn" type='submit'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Post