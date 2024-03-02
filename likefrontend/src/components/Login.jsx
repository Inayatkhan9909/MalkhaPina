import React, { useState } from 'react';
import '../styles/Form.css';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setformData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const response = await axios.post('http://localhost:4000/user/login', formData);
         
            if (response.data.message === "Logged In Successfully") {
                  
                toast.success("Registration successfulllllllllllllllll");
                localStorage.setItem("token",response.data.token)
                navigate('/');
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            console.log(error);

            toast.error("Something went wronggggg");
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
        <h1>Login page</h1>
    </div>

    <div className="formcontainer">
        <form onSubmit={handleSubmit}>

            <label>
                Username:  </label>
            <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Enter your Username'
            />


            <label>
                Password:  </label>

            <div className='password-input'>
                <input
                    type={"password"}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter your Password'

                />
            </div>
            <div >
            <button className="btn" type='submit'>login</button>
            </div>
        </form>
    </div>

</div>
  )
}

export default Login