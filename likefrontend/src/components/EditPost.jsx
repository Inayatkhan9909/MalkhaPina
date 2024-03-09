import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const EditPost = () => {
    const { postId } = useParams();
    console.log(postId)
    console.log(typeof (postId))
    const navigate = useNavigate()
    const [postData, setpostData] = useState({
        title: '',
        description: ''
    });
    const token = localStorage.getItem('token');
    const fetchPost = async () => {
        try {

            const response = await axios.get("http://localhost:4000/post/getpostbyid", {
                params: {
                    postId: postId,
                    token: token
                }
            });

            const data = response.data.post;
            setpostData(data);

            console.log(data);

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    // const [formData, setformData] = useState({
    //     title: "",
    //     description: ""
    // })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpostData({ ...postData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/post/Edit', {
                postId: postId,
                token: token,
                title: postData.title,
                description: postData.description,

            });

            if (response.data.message === 'Post updated successfully') {
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
        <>
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

            <div className='container'>


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
                            value={postData.title}
                            onChange={handleChange}
                            placeholder='Title'
                        />


                        <label>
                            Description :  </label>
                        <textarea placeholder='share your thoughts'
                            name='description'
                            value={postData.description}
                            onChange={handleChange} rows="10"  >

                        </textarea>

                        <div >
                            <button className="btn" type='submit'>Post</button>
                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}

export default EditPost